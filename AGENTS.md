# AGENTS.md — wingline

Rules for anyone (person or coding agent) changing this repository.

## Gates (run all, in this order, before every commit)

```bash
H="<hermes home>"   # %LOCALAPPDATA%\hermes on Windows, ~/.hermes elsewhere
unset HERMES_HOME
HERMES_DISABLE_LAZY_INSTALLS=1 PYTHONPATH="$H/hermes-agent" "$H/hermes-agent/venv/Scripts/python.exe" dashboard/plugin_api.py --selftest
python tests/audit_static.py
(cd desktop && npm ci && node build/build.mjs --check)
(cd tests && npm ci && node render_check.mjs && node world_check.mjs)
"<electron>" tests/world_render.cjs   # Electron of a Hermes desktop install; see the file's header
hermes plugins validate .
```

Expected: `selftest: N checks passed`, `static audit: clean`, `plugin.js is up to date`,
`all checks passed`, `all world checks passed`, `all world render checks passed`, and from
`validate` only the warning about the private `hermes_cli.kanban_db` import.

## Rules

- Hermes data is opened read-only (`mode=ro`). Writes go only through Hermes' Kanban REST API.
- A stop reason comes from what Hermes recorded (run `outcome`), never from timing guesses: a
  `crashed` run that ran past its limit is reported as crashed past its limit, not as a time-out.
  `render_check.mjs` asserts this.
- `desktop/plugin.js` is generated: edit `desktop/src/page.js` and `desktop/src/world.js`, run
  `node build/build.mjs` in `desktop/`, commit both. The sources and `dashboard/plugin_api.py` carry
  no comments; the reasoning lives in `Docs/wingline-notes.md`.
- Fixtures carry no account names: regenerate `tests/fixtures/overview-real.json` with
  `tests/make_fixture.py`, which scrubs home paths. The audit fails on a leaked path.
