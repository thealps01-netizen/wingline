# Wingline — notes

Rationale for `dashboard/plugin_api.py` (the production file carries no comments or docstrings).
The binding spec is `Docs/CONTRACT.md`; this file says why the code reads the data the way it does.

## Backend (`GET /api/plugins/wingline/overview?board=<slug>`, `GET /health`)

### Where things live
- **Hermes root** — core `hermes_constants.get_default_hermes_root()`; without the core:
  `HERMES_HOME` (a `<root>/profiles/<name>` value folds to `<root>`), else the platform default
  (`%LOCALAPPDATA%\hermes`, `~/.hermes`). Never hard-coded.
- **Kanban root** — core `kanban_db.kanban_home()` (`HERMES_KANBAN_HOME`, else the root). Boards are
  shared across profiles by design, so the profile's own home is the wrong place.
- **Board DB** — core `kanban_db.kanban_db_path(board=slug)`. Note: the `default` board's DB is
  `<root>/kanban.db` (back-compat), not `<root>/kanban/boards/default/kanban.db`; the contract's
  path is right for every other board. Without the core the same two rules are applied by hand.
- **Board resolution** mirrors the Kanban plugin's `_resolve_board` / `_board_conn`: a given slug is
  normalised by the core (`400` when malformed), must exist and not be archived (`404`). Omitted →
  core `get_current_board()`; if the core is unavailable, `<kanban root>/kanban/current` when it names
  a live board, else `default` (fail-open).
- **state.db files** — `<root>/state.db` and every `<root>/profiles/*/state.db`.
- All core imports sit behind `_kanban_core()` / `_root()`; `hermes plugins validate` warns once
  about the private `hermes_cli.kanban_db` import — expected, the contract asks for the core helper.

### Read-only
Every DB is opened with a `file:<path>?mode=ro` URI (path percent-quoted). Measured on the real
board: `kanban.db` and `kanban.db-wal` are byte- and mtime-identical after a read; only the
`kanban.db-shm` mtime moves, and it moves just the same with no reader (the dispatcher's ticks) —
its content hash is unchanged. The selftest snapshots every file of its temp home before the read
and asserts nothing was created or changed.

### Cost link (never by title)
- A Kanban worker session is one whose FIRST `role='user'` message (lowest `messages.id`) is exactly
  `work kanban task <task_id>` — no suffix, no whitespace. `tasks.session_id` is NULL on real boards,
  so it cannot be used.
- The task's sessions are those roots plus every descendant through `parent_session_id` (delegated
  workers, compression continuations) within the same state.db. A descendant that is itself the root
  of another task is not counted twice.
- Per session: `actual_cost_usd` when it is a number, else `estimated_cost_usd`, else nothing.
  `status` = `actual` / `estimated` (all priced sessions agree), `mixed`, or `none` (nothing priced).
  `sessions` counts every linked session, priced or not.
- Cache: the first-message scan (the only expensive query) is cached per state.db on
  `(path, max(sessions.started_at), count(*))`. Cost and activity columns are read fresh on every
  request, because a running session's cost changes without a new session.

### Text
- `error_plain` strips real ESC/CSI/OSC sequences, the escaped text forms Hermes stores
  (`\x1b[…m`, `\u001b[…`, `\033[`, any number of leading backslashes), orphan SGR fragments whose ESC
  was lost (`[0m`, `[38;2;…m`), and control characters, then folds whitespace. `error_raw` is the
  stored text untouched.
- `block_reason_plain` (built for blocked tasks and any task with a stored failure):
  1. blocked, and the newest of its `blocked` / `gave_up` / `timed_out` events is `blocked` with a
     reason → that reason (the worker's own words to the human);
  2. last run `outcome = timed_out`, or its error says `elapsed Ns > limit Ns` / max runtime →
     "Stopped by the time limit after <dur>; retries used <n>/<max>";
  3. last run lasted longer than its limit but ended some other way → "Ran <dur>, past its <limit>
     time limit, then ended as <outcome>; retries used <n>/<max>" (the real blocked task is this
     case: Hermes recorded `crashed` after a TTL reclaim, not `timed_out`, so it is not called a
     time-limit stop);
  4. else the first line of the stripped error; else "Blocked; no reason recorded".
  `retries used` = `consecutive_failures` / `max_retries` (the breaker's trip count); with no
  per-task value it says "(board limit)".
- Backend sentences come from one English `_TEXT` table behind `_tx()`.

### Role
`flake` anywhere in the title → detective; the WORD `gate` → gate (a bare substring would make
"investigate", "navigate", "aggregate" gates); `\b(review|security|ux|ui|code)\b(?!-)` → review
(`ui-polish-1140` stays a builder); else builder. Case-insensitive.

### Totals
`needs_you` = blocked, `working` = running, `queued` = todo/ready/triage, `done` = done. Archived
tasks are returned but not counted, except in `spend_usd`, which sums every task's cost.

### Errors
Every failed read (a state.db, the board DB, any of its tables, the board list) adds
`{source, message}` with `source` relative to the root (`profiles/x/state.db`,
`kanban/boards/<slug>/kanban.db tasks`); the rest of the answer is still built.

## Real data check (board `hermes-approvals-ui`, read-only)
18 tasks: 16 done, 1 blocked (`t_95000f55`), 1 archived (`t_47d70ed9`). Exact link: 17 tasks linked,
18 sessions, all `estimated`, spend **$46.16**. Hermes' own title-matched estimate was $43.40; a
title match over the current state.db gives $48.72 because the archived original and its retry share
a title prefix, so the retry's $2.56 session is counted twice. The exact link gives the archived
original $0 (its worker crashed at start-up on an unknown skill, before any session was written).
The remaining $2.76 gap to $43.40 could not be reproduced from current data (likely an earlier
snapshot while the blocked task was still accruing — unverified).

## Known gaps
- Two runs can share one session (`t_8b60342b`, `t_834367bc` have 2 runs, 1 session): cost is per
  task, not per run.
- Task ids are matched across every state.db without the board: two boards holding the same task id
  would share sessions (ids are random 8-hex; not seen in practice).
- Descendants are followed only inside the state.db that holds the root.
- `cost_status = included` (subscription) sessions are summed by the contract's number rule, not
  shown as $0 the way Agent Station does.
- `activity` is filled only while the task is `running`, from the linked session with the newest
  `last_activity_at`.

## Desktop (`desktop/plugin.js`)

- **Stop reasons follow the recorded outcome.** Hermes writes `timed_out` when its dispatcher kills
  a worker at the limit and `crashed` when the worker vanished. A run can be `crashed` after running
  past its limit (the real `deck flake` retry: 4h 58m against 1h 30m). The page then says "ran past
  its time limit; Hermes recorded the end as crashed", never "stopped by the time limit". An earlier
  draft inferred a time-out from `took >= 0.95 × limit`; that claimed a cause the data does not
  show, and `render_check.mjs` now fails on it.
- **Dates use `en-GB`**, matching the single English bundle (no Turkish desktop locale exists).
- **Factory "Shipped" sum** is the cost of done tasks only; the header Spend also counts blocked and
  archived tasks, so the sign is labelled "their cost".
- **Kanban calls go through `window.hermesDesktop.api`** because the SDK only exposes REST for a
  plugin's own backend; they use the app's default connection, not a per-profile one. Kanban boards
  are shared across profiles, so this reaches the same board data.
- **Ask in chat** inserts into the focused chat's composer (`host.composer.insertText`); if that
  fails it copies the prompt and says so.
- **The Factory keeps the prototype's own light palette** (owner's decision after v0.1.0, whose
  theme-tinted dark scene was rejected). `const INK`, `RC`, `RC_LIGHT` hold the scene colours and
  are the only colour literals `audit_static.py` accepts; the chrome around the scene still uses the
  app's `--ui-*` variables.
- **No bundled font.** Desktop plugins are read as one source text over IPC
  (`hermes:readPluginSource`); there is no static-file door for a `.woff2`, and inlining a base64
  font into plugin.js was judged not worth the size. The scene uses the app font; scene type is
  sized so the smallest label is 11 px at 1440 wide (`FS`, checked in `render_check.mjs`).
- **The detail sheet is measured, not guessed.** It is `position: fixed` and, when open, takes the
  top/height/right of the nearest scrolling ancestor of the page, so it never covers the app's
  title bar and its footer buttons stay on screen. Without a measurable ancestor it falls back to
  the full window height.
- **Board pick.** The user's last pick (`ctx.storage` `board`) wins. With no pick and an empty
  current board (Hermes' `kanban/current` often points at `default`), the board with the newest
  activity opens; that automatic jump is not stored, so it never overrides a later real pick.
- **Pipeline groups**: dependency chains first, then same-name pairs (`deck T1: …` + `deck T1
  review`, `… (retry)`), then families sharing a first word, then "Other tasks". The timeline uses
  the same groups so a task sits under the same heading in both places.
