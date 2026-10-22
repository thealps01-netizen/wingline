# Changelog

## 0.2.0

- New page: Board (Needs you / Working / Queued / Done), List and Inbox views, a task drawer with a
  plain story (what happened, why, what you can do), a timeline, and "The loop" for review rounds.
  Replay, command palette (/) and keyboard shortcuts. The Factory view is gone.
- Buttons write through Hermes' Kanban API: Run again (optional note → comment, then `ready`),
  Reply, Tell the agent (comment), Check (read-only), Run with more time (kept from 0.1.0), Remove
  (archive after an 8-second Undo window). Open log stays under Technical details.
- Backend: `GET /api/plugins/wingline/app` returns every board at once with stories, rounds and
  typical times per role; `/overview` is unchanged. Restart the app after updating.

## 0.1.0

- First release: Board and Factory views of a Hermes Kanban board; per-task cost tied to worker
  sessions by their first message; Retry with more time (new task + archive), Add note, Archive,
  Open log, Open in Kanban, Ask in chat.
