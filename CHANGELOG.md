# Changelog

## Unreleased

- The web dashboard (`hermes dashboard`, `hermes serve`) no longer lists a "Wingline" tab. That
  tab opened on "Could not load this plugin's script": the page is drawn by the desktop app only,
  and the dashboard has no script to load for it. The manifest now hides the tab (`tab.hidden`).
  The desktop page and the backend routes are unchanged. Opening `/wingline` in the dashboard by
  typing the address still shows that message, because Hermes keeps the address of a hidden tab.
  `tests/audit_static.py` fails a manifest that shows a dashboard tab without shipping the tab's
  script.

## 0.1.0

- First release: Board and Factory views of a Hermes Kanban board; per-task cost tied to worker
  sessions by their first message; Retry with more time (new task + archive), Add note, Archive,
  Open log, Open in Kanban, Ask in chat.
