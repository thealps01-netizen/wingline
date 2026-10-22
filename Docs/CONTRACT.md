# Wingline — build contract (v0.2.0)

Wingline is a Hermes Desktop plugin: a human-side view of Hermes Kanban boards. Board, List and
Inbox views of every board, a drawer that tells each task's story in plain sentences, and a small
set of actions that go through Hermes' own Kanban API. Hermes core is never edited.

Owner: Muhammed Enes Alpler (MIT). Plugin id/name: `wingline`. Route: `/wingline`.
Package layout follows the sibling plugin `agent-station` (installed at
`<hermes home>/plugins/agent-station/`): `plugin.yaml`, `__init__.py`, `dashboard/manifest.json`,
`dashboard/plugin_api.py`, `desktop/plugin.js`, `tests/`, `Docs/wingline-notes.md`, `README.md`,
`CHANGELOG.md`, `LICENSE`, `AGENTS.md`.

`<hermes home>` = `%LOCALAPPDATA%\hermes` on this machine; discover it (HERMES_HOME env, then the
platform default) — never hard-code it.

## 1. Backend — `GET /api/plugins/wingline/overview?board=<slug>`

Read-only. Opens `<home>/kanban/boards/<slug>/kanban.db` and every `state.db`
(`<home>/state.db` and `<home>/profiles/*/state.db`) with `file:...?mode=ro` URIs. Board omitted →
the current board (same resolution as Hermes' kanban plugin: read how `_board_conn` resolves it and
reuse the core helper if importable, fail-open to `default`).

```jsonc
{
  "board": "hermes-approvals-ui",
  "boards": [{"slug": "...", "name": "..."}],
  "now": 1792446113.1,                     // server epoch seconds
  "tasks": [{
    "id": "t_95000f55", "title": "...", "status": "blocked",   // raw Hermes status
    "assignee": "default", "role": "builder|review|gate|detective",
    "created_at": 0, "started_at": 0, "completed_at": 0,        // epoch or null
    "max_runtime_seconds": 18000, "max_retries": 1, "consecutive_failures": 1,
    "block_kind": "...", "block_reason_plain": "Stopped by the time limit after 5h 0m",
    "error_raw": "...",                     // last_failure_error as stored (may hold ANSI)
    "error_plain": "...",                   // ANSI/control chars stripped, whitespace folded
    "parents": ["t_..."], "children": ["t_..."],
    "runs": [{"id": 1, "profile": "default", "status": "...", "outcome": "...",
              "started_at": 0, "ended_at": 0, "max_runtime_seconds": 0,
              "error_plain": "...", "summary": "..."}],
    "cost": {"usd": 6.13, "status": "estimated|actual|mixed|none", "sessions": 2},
    "activity": {"text": "...", "at": 0} | null,   // latest session's last_activity_* while running
    "comments": 3
  }],
  "totals": {"needs_you": 1, "working": 0, "queued": 0, "done": 16, "spend_usd": 43.40},
  "errors": [{"source": "state.db", "message": "..."}]   // every failed read, never swallowed
}
```

Rules:
- **Role** (one rule, backend only): `flake` in title → detective; `gate` → gate;
  regex `\b(review|security|ux|ui|code)\b(?!-)` → review; else builder. (The `(?!-)` stops
  `ui-polish-1140` counting as review.)
- **Cost link**: a Kanban worker session's FIRST user message is exactly
  `work kanban task <task_id>` (verified in state.db). Sum `actual_cost_usd` when present else
  `estimated_cost_usd` over those sessions AND their descendants (`parent_session_id` chain).
  `status`: actual / estimated / mixed / none. Never guess by title. Cache by
  `(db path, max(sessions.started_at), count(*))`.
- **needs_you** = status `blocked`. **working** = `running`. **queued** = `todo`/`ready`/`triage`.
  **done** = `done`. Archived tasks are returned (status `archived`) but excluded from totals except
  `spend_usd`, which sums every task's cost.
- `block_reason_plain`: built from data, e.g. timed-out run (outcome/error mentions max runtime) →
  "Stopped by the time limit after <dur>; retries used <n>/<max>". Unknown → error_plain first line.
- `GET /api/plugins/wingline/health` → `{"ok": true, "version": "0.2.0"}`.
- `python dashboard/plugin_api.py --selftest` builds a temp HERMES_HOME with a fake board +
  state.db (incl. an ANSI error, a `ui-polish-1140 build` title, a child session) and asserts
  every rule above and in section 1b.

## 1b. Backend — `GET /api/plugins/wingline/app` (what the page reads)

Every board at once, read-only like `/overview`; boards without tasks are left out.

```jsonc
{
  "now": 1792446113.1,
  "boards": [{"slug": "...", "name": "...", "last": 1792440000}],   // most recent activity first
  "tasks": [{
    "id": "t_...", "board": "<slug>", "title": "...", "status": "blocked",
    "pipe": "app-layout r2",            // first title word (+ " rN" when the second word is a round)
    "step": "build", "lens": "build|security|ux|ui|code|gate|flake|null",
    "label": "...", "labelKind": "review|continued|null", "idx": 1, "of": 6,
    "role": "builder|review|gate|detective", "assignee": "...", "created": 0, "done": 0,
    "maxrt": 18000, "retries": 1, "reason": "<block_reason_plain>",
    "parents": [], "children": [],
    "runs": [{"s": 0, "e": 0, "o": "<outcome>", "sum": "<summary, agent's words>", "err": "..."}],
    "usd": 6.13, "usdKind": "estimated|actual|mixed|none", "act": {"text": "...", "at": 0} | null,
    "comments": 3, "outcome": "<first sentence of the last summary>",
    "story": {                         // only for blocked / review tasks
      "cause": "usage_limit|silent|time_limit|missing_skill|error|asks_you|review",
      "facts": {"kids": 1, ...},       // numbers the sentences are built from
      "asked": "<first sentence of the task body>", "question": "<the agent's question>",
      "tl": [{"ts": 0, "tone": "plain|work|warn|bad|good|you", "k": "<event key>", "a": [], "q": "<quote>"}]
    }
  }],
  "stats": {"builder": {"n": 43, "p25": 0, "p50": 0, "p75": 0, "p90": 0, "usd": 0}},
  "errors": [{"source": "...", "message": "..."}]
}
```

- **cause** comes from what Hermes recorded: `timed_out` run → time_limit; "Limit resets at" in a
  crash → usage_limit; a gave-up task whose last heartbeat is more than 15 min before the end →
  silent; "Unknown skill(s)" → missing_skill; other gave-up / timed-out → error; any other block →
  asks_you; status `review` → review. A crashed run that ran past its limit is not a time-out.
- The page turns `cause` + `facts` + `tl[].k` into English sentences; agent text is only quoted.

## 2. Desktop — `desktop/plugin.js`

Plain ESM, `@hermes/plugin-sdk` + `react/jsx-runtime` + `react` imports exactly like
agent-station's `desktop/plugin.js` (read its `register(ctx)` and how it fetches its backend).
Registers a `routes` page `/wingline` and a `sidebar.nav` row (no `panes`). One nested `en` i18n
bundle, prefix `wingline.`.

Polls `/app` every 5 s while the page is visible (pause when hidden); a changed answer re-renders,
an unchanged one only refreshes live text (activity line, cost, clocks). While the user types, drags,
replays or has a dialog open, the re-render waits. Plain DOM inside one React mount (`el()` helper,
no `innerHTML`); styles under `.wl-app` use only the app's `--ui-*` variables.

**Layout** (port of the approved prototype): sidebar (decision count, boards with a status strip,
live agents), header (board name, Board | List | Inbox, filter, clock, Replay), four columns.
Review siblings with the same parents stack into one card; finished pipelines fold into one card with
`pipeResult` (merged / sent back and why / N of M steps). Cards show one badge or one result
sentence; a round > 1 shows why the previous round went back. Hover draws dependency arrows.

**Drawer**: headline + why + what follows (from `story`), timeline dots with the event sentence and
a quoted agent line, "The loop" for `<name> rN` pipelines (one row per round: Build → four checks →
your approval, with the reason a round went back), otherwise a step strip. Technical details (task
id, agent, limits, cost status, typical time, every attempt, worker log) stay folded.

**Actions** — all via Hermes' Kanban REST (`/api/plugins/kanban/...`, `?board=<slug>`):
1. **Run again** (blocked, not a question): optional note → `POST /tasks/{id}/comments`
   `{body, author:"wingline"}` first, then `PATCH /tasks/{id}` `{status:"ready"}`. A refused change
   (status unchanged) reverts the card and says so.
2. **Reply** (the agent asked): same two calls; an empty answer is not sent.
3. **Tell the agent** (running): one comment, no status change; warns when the agent has been silent
   for 15 min.
4. **Check** (running): no call; answers from the last activity and the role's typical time.
5. **Run with more time** (time_limit): the 0.1.0 retry — input for the new limit (default 2× the
   old one, rounded to 30 min), every step listed; `GET /tasks/{id}` → `POST /tasks` → for each
   child `POST /links` then `DELETE /links?parent_id=old&child_id=c` → `POST /tasks/{old}/comments`
   → `PATCH /tasks/{old}` `{status:"archived"}`; stop at the first failure and show what happened.
6. **Remove**: second click arms it, the card leaves, Undo (button or Ctrl+Z) for 8 s; only then
   `PATCH /tasks/{id}` `{status:"archived"}`. Leaving the page sends a pending removal at once.
7. Drag a blocked card to Queued = Run again; every other drop explains why it is not allowed.
8. Read-only: **Open log** (`GET /tasks/{id}/log`, ANSI stripped), **Open in Kanban** (review cards).

Every failed request is shown in a toast; every failed read in the sidebar.

## 3. Tests and gates
- `tests/render_check.mjs` (jsdom, recipe: hermes-desktop-plugin-authoring skill
  `references/jsdom-plugin-test-harness.md`): renders the page from `fixtures/app-real.json` plus
  edge tasks built in the test, asserts no raw i18n keys, no `panes` registration, the story and
  loop, the exact Kanban calls of every button, the Undo window, XSS titles stay text.
- `tests/preview.mjs` + `tests/shot.cjs`: the real plugin in the app's Electron, one scenario per
  page, screenshots in `tests/shots/`.
- `tests/audit_static.py`: undefined identifiers, exactly one `en` bundle, every `t()` key present.
- Production `plugin.js` / `plugin_api.py` carry no comments/docstrings; the why lives in
  `Docs/wingline-notes.md`.
