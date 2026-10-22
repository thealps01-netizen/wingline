"""Regenerate tests/fixtures/app-real.json from a live Hermes home, read-only.

Usage (core venv python, HERMES_HOME unset or pointing at the home to read):
    python tests/make_fixture.py hermes-approvals-ui
Runs build_app() and keeps only the named board. Home-directory paths are replaced by <home>
so the fixture carries no account name.
"""
import json
import re
import runpy
import sys
from pathlib import Path

here = Path(__file__).resolve().parent
api = runpy.run_path(str(here.parent / "dashboard" / "plugin_api.py"))
board = sys.argv[1] if len(sys.argv) > 1 else "hermes-approvals-ui"
data = api["build_app"]()
data["boards"] = [b for b in data["boards"] if b["slug"] == board]
data["tasks"] = [t for t in data["tasks"] if t["board"] == board]
text = json.dumps(data, indent=1, ensure_ascii=False)
text = re.sub(r"(?i)([A-Z]:)?[\\/]+Users[\\/]+[^\\/\"\s]+", "<home>", text)
text = re.sub(r"(?i)/c/Users/[^/\"\s]+", "<home>", text)
(here / "fixtures" / "app-real.json").write_text(text + "\n", encoding="utf-8")
print("tasks", len(data["tasks"]), "stories", sum("story" in t for t in data["tasks"]))
