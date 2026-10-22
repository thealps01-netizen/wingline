# Wingline

A Hermes Desktop page for people who run Hermes Kanban boards. Every card says in a plain sentence
what happened, why, and what you can do about it; the agent's own words stay one click away, under
"Technical details".

- **Board**: four columns — Needs you, Working, Queued, Done — for the board picked in the sidebar.
  Finished pipelines fold into one card with a one-line result ("Merged into the main code in
  round 3", "Sent back: visual found a problem → round 2"). Hover a card to see what it waits for.
- **List**: the same tasks grouped by pipeline, one row each.
- **Inbox**: every decision waiting for you across all boards, plus what shipped since you looked.
- **Drawer**: click a card for its story (headline, why, what follows), a timeline of what Hermes
  recorded, and for review pipelines **The loop** — Build → four checks → your approval, one row per
  round, with the reason each round went back.
- **Replay** (R): play the board's history at 10 min/s, 30 min/s or 2 h/s. **Command palette** (/)
  and keyboard shortcuts (?).

Hermes core is never edited. Wingline reads Kanban and session data read-only. Every change goes
through Hermes' own Kanban API:

| Button | What happens |
|---|---|
| Run again (optional note) | The note becomes a Kanban comment signed `wingline`, then Hermes sets the task `ready` |
| Reply (agent asked a question) | Your answer becomes a comment, then the task is set `ready` |
| Tell the agent (running task) | Adds a comment; Hermes hands new comments to the worker at its next step |
| Check (running task) | Sends nothing; answers from the record (last sign of life, usual duration) |
| Run with more time (out of time) | Hermes cannot change a task's time limit, so a new task with the same settings and the new limit is created, children are re-linked, the old task gets a comment and is archived — every step listed first |
| Remove | Two clicks, then 8 seconds to Undo before anything is sent; then the task is archived |

## Cost

A worker session is tied to its task by the first message Hermes sends it
(`work kanban task <id>`), never by the title. The cost shown is the one Hermes recorded for that
session and its child sessions: `estimated`, `billed` or `none`. Wingline never computes or guesses
a price.

## Install

Hermes Desktop: **Capabilities → Plugins**, install `thealps01-netizen/wingline`, then **Rescan**.
CLI equivalent: `hermes plugins install thealps01-netizen/wingline --enable`. The backend route
changed in 0.2.0, so restart the app once after updating.

Requires Hermes 0.22.2 or later (the version it is tested against).

## Development

See `AGENTS.md` for the gates. Design notes: `Docs/wingline-notes.md`. Build contract:
`Docs/CONTRACT.md`.

MIT licence.
