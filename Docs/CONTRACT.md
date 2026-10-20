# Wingline — build contract (v0.1.0)

Wingline is a Hermes Desktop plugin: a human-side view of Hermes Kanban boards. Two views of the
same data — **Board** (default) and **Factory** (a production-line picture) — and a small set of
actions that go through Hermes' own Kanban API. Hermes core is never edited.

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
  "boards": [{"slug": "...", "name": "...",   // name: Hermes' stored board name, shown as written
              "tasks": 17,                    // non-archived tasks on that board
              "last_activity": 1792438796}],  // newest task/run/event stamp, or null
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
- `block_reason_plain`: one plain line built from data, never a raw dump, at most 160 characters:
  timed-out run (outcome/error mentions max runtime) → "Stopped by the time limit after <dur>; retries
  used <n>/<max>"; a run past its limit that ended otherwise → "Ran <dur>, past its <limit> time limit,
  then ended as <outcome>; …"; a worker dump ("Worker's last output: …") or a first line over 160
  characters → "Ended as <outcome> after <dur> (<the `Error:` it names, if short>); …"; else the
  error's first line, capped. The raw text stays in `error_raw` / `error_plain`.
- Durations use one format everywhere: `59s`, `1m 14s`, `5h 0m` (backend `duration()`, panel
  `fmtDur()`).
- `GET /api/plugins/wingline/health` → `{"ok": true, "version": "0.1.0"}`.
- `python dashboard/plugin_api.py --selftest` builds a temp HERMES_HOME with a fake board +
  state.db (incl. an ANSI error, a `ui-polish-1140 build` title, a child session) and asserts
  every rule above.

## 2. Desktop — `desktop/plugin.js`

Plain ESM, `@hermes/plugin-sdk` + `react/jsx-runtime` + `react` imports exactly like
agent-station's `desktop/plugin.js` (read its `register(ctx)` and how it fetches its backend).
Registers a `routes` page `/wingline` and a `sidebar.nav` row (no `panes`). One nested `en` i18n
bundle, prefix `wingline.`.

Polls `/overview` every 5 s while the page is visible (pause when hidden). Board switcher.
Header counters: Needs you / Working / Queued / Done / Spend. A **Board | Factory** segmented
switch (persist choice in `ctx.storage`).

**Board** (port of the approved prototype `hub/template.html`):
- "Needs you" strip first: each blocked task with plain reason, retries, time spent, actions.
- Working now: live activity line per running task.
- Pipeline map (parents → children) and timeline where only IDLE gaps are compressed
  (`GAP` 6 min); run bars keep real length.
- Task detail drawer: fields, runs, cost (with its status word), comments count, actions.

**Factory** (port of `games/factory/template.html`): belts between machines (queue → build →
review → gate → shipped), packages = tasks, jammed machine + smoke + red "Needs you" bin for blocked,
Now + Replay (1×/4×/16×), click package/machine → same detail drawer. Colours from the app theme's
`--ui-*` variables (agent-station shows which exist) — never the chat-widget `--foreground` etc.
Respect `prefers-reduced-motion`.

**Actions** — all via Hermes' Kanban REST (`/api/plugins/kanban/...`, `?board=<slug>`), each
behind a confirm step that states exactly what will change:
1. **Retry with more time** (blocked tasks): input for the new limit (default 2× the old one,
   rounded to 30 min). Confirm text lists: new task created with the same title, body, assignee,
   priority, parents, skills, goal mode, model/provider/reasoning overrides and workspace, limit X;
   children re-linked to the new task; a comment on the old task naming the new id; the old task
   archived. Steps: `GET /tasks/{id}` → `POST /tasks` → for each child `POST /links` (new→child) then
   `DELETE /links?parent_id=old&child_id=c` → `POST /tasks/{old}/comments` → `PATCH /tasks/{old}`
   `{status:"archived"}`. Stop at the first failure and show which steps already happened.
   Note in the dialog: Hermes cannot change an existing task's time limit, so a new task is used.
   `max_retries` is not accepted by `POST /tasks`; say the new task uses the board default.
2. **Add note**: `POST /tasks/{id}/comments` `{body, author:"wingline"}`.
3. **Archive**: two-step; says the task stays readable under archived and can be found again.
4. Read-only: **Open log** (`GET /tasks/{id}/log`, shown in the drawer, ANSI stripped),
   **Open in Kanban** (navigate to `/kanban`), **Ask in chat** (prefill composer if the SDK offers
   it; otherwise copy a prompt to clipboard and say so).

Every failed request is shown in the page. Escape all task text (no innerHTML with data).

## 3. Tests and gates
- `tests/render_check.mjs` (jsdom, recipe: hermes-desktop-plugin-authoring skill
  `references/jsdom-plugin-test-harness.md`): renders the page from a fixture of the overview JSON,
  asserts no raw i18n keys, no `panes` registration, both views render, the retry confirm lists all
  steps, XSS fixture title stays text.
- `tests/audit_static.py`: undefined identifiers, exactly one `en` bundle, every `t()` key present.
- Production `plugin.js` / `plugin_api.py` carry no comments/docstrings; the why lives in
  `Docs/wingline-notes.md`.
