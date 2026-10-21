# Changelog

## Unreleased

- Board: the world view (planet of boards → region of pipelines → site of tasks) above the lists,
  with live updates, click-to-fly navigation and a fallback to the lists without hardware WebGL2.
- `desktop/plugin.js` is now built from `desktop/src/` with three.js bundled in.
- Fix: the Factory's play button announced "Paused — needs input" while playing (duplicate
  i18n key); the build now fails on any such warning.

## 0.1.0

- First release: Board and Factory views of a Hermes Kanban board; per-task cost tied to worker
  sessions by their first message; Retry with more time (new task + archive), Add note, Archive,
  Open log, Open in Kanban, Ask in chat.
