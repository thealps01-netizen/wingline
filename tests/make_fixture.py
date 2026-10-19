"""Regenerate tests/fixtures/overview-real.json from a live Hermes home, read-only.

Usage (core venv python, HERMES_HOME unset or pointing at the home to read):
    python tests/make_fixture.py hermes-approvals-ui
Home-directory paths are replaced by <home> so the fixture carries no account name.
"""
import json
import re
import runpy
import sys
from pathlib import Path

here = Path(__file__).resolve().parent
api = runpy.run_path(str(here.parent / "dashboard" / "plugin_api.py"))
data = api["build_overview"](sys.argv[1] if len(sys.argv) > 1 else None)
text = json.dumps(data, indent=1, ensure_ascii=False)
text = re.sub(r"(?i)([A-Z]:)?[\\/]+Users[\\/]+[^\\/\"\s]+", "<home>", text)
text = re.sub(r"(?i)/c/Users/[^/\"\s]+", "<home>", text)
(here / "fixtures" / "overview-real.json").write_text(text + "\n", encoding="utf-8")
print("tasks", len(data["tasks"]), "totals", data["totals"])
