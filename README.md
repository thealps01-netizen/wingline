# Wingline

A Hermes Desktop page for people who run Hermes Kanban boards. It shows what needs you first,
what is running now, what is queued and done, and what each task cost. You can look at the same
data two ways:

- **Board**: a world you zoom through, drawn as a black-and-white atlas: a planet whose lights are
  your boards, a region whose farms, villages and ports are a board's pipelines (the place grows with
  what it cost), and a site where every task is a field, workshop or berth and the agents at work
  move. Click to fly down, "◂ back" to rise; a task opens its details and log. Below it: the "Needs
  you" strip, work in progress, a pipeline map (parents → children) and a timeline that shortens idle
  gaps but draws working time at its true length. On a computer without hardware WebGL2 the Board
  shows the lists only and says why.
- **Factory**: a production line where tasks move as packages between machines (build → review →
  gate → shipped). A stopped task jams its machine and drops into a red "Needs you" bin. You can
  watch it live or replay the board's history at 1×, 4× or 16×.

Hermes core is never edited. Wingline reads Kanban and session data read-only. Every change goes
through Hermes' own Kanban API, and each one waits for a confirmation that states exactly what will
change:

| Action | What happens |
|---|---|
| Retry with more time | Hermes cannot change an existing task's time limit, so Wingline creates a new task with the same settings and the new limit, re-links its children, leaves a comment on the old task and archives it |
| Add note | Adds a comment to the task |
| Archive | Archives the task (two-step) |
| Open log / Open in Kanban / Ask in chat | Read-only |

## Cost

A worker session is tied to its task by the first message Hermes sends it
(`work kanban task <id>`), never by the title. The cost shown is the one Hermes recorded for that
session and its child sessions: `estimated`, `billed` or `none`. Wingline never computes or guesses
a price.

## Install

Hermes Desktop: **Capabilities → Plugins**, install `thealps01-netizen/wingline`, then **Rescan**.
CLI equivalent: `hermes plugins install thealps01-netizen/wingline --enable`.

Requires Hermes 0.22.2 or later (the version it is tested against). `desktop/plugin.js` is about
750 KB because three.js is bundled in; Hermes 0.22.2 reads plugin sources in full up to 16 MiB.

## Development

The page lives in `desktop/src/` (`page.js`, `world.js`); `desktop/plugin.js` is generated from it
(`cd desktop && npm ci && node build/build.mjs`) and committed, so installing from Git needs no
build step. See `AGENTS.md` for the gates. Design notes: `Docs/wingline-notes.md`. Build contract:
`Docs/CONTRACT.md`.

MIT licence.
