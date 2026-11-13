"""Static audit of Wingline's desktop page: the rules no render test can see, checked on the source.

Run: python tests/audit_static.py        (exit 0 = clean, 1 = problems named, one per line)

Rules
  undefined    no undefined or unused identifier in desktop/plugin.js (ESLint `no-undef` and
               `no-unused-vars`, run with the Hermes core's own eslint through node)
  comments     production plugin.js carries no comments (the why lives in Docs/wingline-notes.md)
  bundle       exactly one `const BUNDLES`, holding exactly one locale `en`, whose only top key is
               `wingline` (the i18n prefix)
  i18n         every literal `t('wingline.…')` key resolves to a leaf of the English bundle, and every
               template key `t(`wingline.x.${…}`)` has a leaf for each value the page can hand it
  panes        no `panes` area is registered; the page is a `routes` page plus a `sidebar.nav` row
  html         no innerHTML / outerHTML / insertAdjacentHTML / dangerouslySetInnerHTML anywhere
  colors       no hex / rgb() / hsl() literal; every `var(--…)` is an app theme `--ui-*` variable
  kanban       every Kanban call goes through the `/api/plugins/kanban` prefix
  silentCatch  every `catch` logs or surfaces the error
  dashboard    the web dashboard (`hermes dashboard`) loads dashboard/<entry> (default dist/index.js)
               for every manifest and lists a tab for it unless `tab.hidden` is true; the page is
               drawn by the desktop app only, so while no such script ships the manifest hides the
               tab (a listed tab opens on "Could not load this plugin's script")
  privacy      no shipped file names the author's account or a `<drive>:/Users/<name>` path other
               than the fixture name `someone`
"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
JS = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "desktop" / "plugin.js"
ACCOUNT = re.compile("ene" + "sa", re.I)
USER_PATH = re.compile(r"[A-Za-z]:(?:[/\\]|\\\\)+Users(?:[/\\]|\\\\)+([A-Za-z0-9._-]+)", re.I)
FIXTURE_USERS = {"someone"}
TEMPLATES = {
    "wingline.status": {"blocked", "running", "todo", "ready", "triage", "scheduled", "review", "done", "archived", "other"},
    "wingline.role": {"builder", "review", "gate", "detective"},
    "wingline.run": {"ok", "stopped", "paused", "running"},
    "wingline.cost": {"estimated", "actual", "mixed", "none"},
    "wingline.count": {"needs", "working", "queued", "done"},
    "wingline.view": {"board", "factory"},
    "wingline.dlg.state": {"pending", "running", "done", "failed"},
}
problems: list[str] = []


def report(message: str) -> None:
    problems.append(message)


def hermes_core() -> Path | None:
    if os.environ.get("HERMES_AGENT_DIR"):
        return Path(os.environ["HERMES_AGENT_DIR"]).resolve()
    if os.environ.get("HERMES_HOME"):
        home = Path(os.environ["HERMES_HOME"])
    elif os.environ.get("LOCALAPPDATA"):
        home = Path(os.environ["LOCALAPPDATA"]) / "hermes"
    else:
        home = Path.home() / ".hermes"
    core = home / "hermes-agent"
    return core if core.exists() else None


LINT = r"""
const { createRequire } = require('node:module')
const fs = require('node:fs')
const [core, file] = process.argv.slice(1)
const req = createRequire(core + '/package.json')
const { Linter } = req('eslint')
const globals = req('globals')
const acorn = createRequire(req.resolve('eslint'))('acorn')
const code = fs.readFileSync(file, 'utf8')
const comments = []
acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module', locations: true, onComment: (block, text, s, e, loc) => comments.push({ line: loc.line, text: text.slice(0, 60) }) })
const linter = new Linter({ configType: 'flat' })
const messages = linter.verify(code, [{
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.browser } },
  rules: { 'no-undef': 'error', 'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }] }
}])
process.stdout.write(JSON.stringify({ comments, messages: messages.map(m => ({ line: m.line, rule: m.ruleId, message: m.message })) }))
"""


def check_lint(js_path: Path) -> None:
    core = hermes_core()
    node = shutil.which("node")
    if not core or not (core / "node_modules" / "eslint").exists() or not node:
        report("undefined: cannot run ESLint — set HERMES_AGENT_DIR to a Hermes core with node_modules, and have node on PATH")
        return
    run = subprocess.run([node, "-e", LINT, str(core).replace("\\", "/"), str(js_path)], capture_output=True, text=True, encoding="utf-8")
    if run.returncode != 0:
        report(f"undefined: ESLint did not run: {run.stderr.strip()[:300]}")
        return
    out = json.loads(run.stdout)
    for c in out["comments"]:
        report(f"comments: line {c['line']} carries a comment ({c['text']!r}) — production plugin.js has none")
    for m in out["messages"]:
        report(f"undefined: line {m['line']} {m['rule'] or 'parse'}: {m['message']}")


def _block(js: str, start: int) -> str:
    depth = 0
    for i in range(js.index("{", start), len(js)):
        if js[i] == "{":
            depth += 1
        elif js[i] == "}":
            depth -= 1
            if depth == 0:
                return js[js.index("{", start):i + 1]
    return ""


def _tree(body: str) -> dict:
    tree: dict = {}
    stack = [tree]
    flat = re.sub(r"'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"|`(?:[^`\\]|\\.)*`", "''", body)
    flat = re.sub(r"=>\s*\(", "=> (", flat)
    depth_paren = 0
    clean = []
    for ch in flat:
        if ch == "(":
            depth_paren += 1
        elif ch == ")":
            depth_paren -= 1
        elif depth_paren == 0:
            clean.append(ch)
    flat = "".join(clean)
    for token in re.finditer(r"([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(\{)?|(\{)|(\})", flat[1:-1]):
        if token.group(4):
            if len(stack) > 1:
                stack.pop()
            continue
        if token.group(3):
            stack.append({})
            continue
        if token.group(2):
            stack[-1][token.group(1)] = {}
            stack.append(stack[-1][token.group(1)])
        else:
            stack[-1][token.group(1)] = True
    return tree


def _has(tree: dict, key: str) -> bool:
    node = tree
    for part in key.split("."):
        if not isinstance(node, dict) or part not in node:
            return False
        node = node[part]
    return node is True


def check_bundle_and_i18n(js: str) -> None:
    starts = [m.start() for m in re.finditer(r"\bconst BUNDLES\s*=", js)]
    if len(starts) != 1:
        report(f"bundle: expected exactly one `const BUNDLES`, found {len(starts)}")
        return
    tree = _tree(_block(js, starts[0]))
    if list(tree) != ["en"]:
        report(f"bundle: BUNDLES must hold exactly one locale `en`, found {list(tree)}")
    en = tree.get("en", {})
    if list(en) != ["wingline"]:
        report(f"bundle: the en bundle's only top key must be `wingline`, found {list(en)}")
    keys = set(re.findall(r"\bt\(\s*'(wingline\.[A-Za-z0-9_.]+)'", js))
    keys |= set(re.findall(r"\bt\([^()'`]*\?\s*'(wingline\.[A-Za-z0-9_.]+)'", js))
    keys |= set(re.findall(r"\?\s*'wingline\.[A-Za-z0-9_.]+'\s*:\s*'(wingline\.[A-Za-z0-9_.]+)'", js))
    keys |= set(re.findall(r"\?\s*t\('(wingline\.[A-Za-z0-9_.]+)'", js))
    if not keys:
        report("i18n: no t('wingline.…') call found — the audit's patterns are stale")
    for key in sorted(keys):
        if not _has(tree, f"en.{key}"):
            report(f"i18n: key '{key}' is not in the English bundle — the page would print the raw key")
    used = set(re.findall(r"\bt\(\s*`(wingline\.[A-Za-z0-9_.]+)\.\$\{", js))
    for prefix in sorted(used - set(TEMPLATES)):
        report(f"i18n: template key `{prefix}.${{…}}` has no value table in this audit — add one")
    for prefix, values in TEMPLATES.items():
        if prefix not in used:
            report(f"i18n: template key `{prefix}.${{…}}` is no longer used — update this audit's table")
            continue
        for value in sorted(values):
            if not _has(tree, f"en.{prefix}.{value}"):
                report(f"i18n: '{prefix}.{value}' is missing — `t(`{prefix}.${{…}}`)` can ask for it")


def check_registration(js: str) -> None:
    if re.search(r"area:\s*['\"`][^'\"`]*pane", js, re.I):
        report("panes: plugin.js registers a pane — Wingline is a routes page only")
    if not re.search(r"area:\s*'routes'", js):
        report("panes: no `routes` registration found")
    if not re.search(r"area:\s*'sidebar\.nav'", js):
        report("panes: no `sidebar.nav` registration found")


def check_html(js: str) -> None:
    for match in re.finditer(r"innerHTML|outerHTML|insertAdjacentHTML|dangerouslySetInnerHTML|document\.write", js):
        report(f"html: line {js[:match.start()].count(chr(10)) + 1} uses {match.group(0)} — render data as text")


def check_colors(js: str) -> None:
    for line_no, line in enumerate(js.splitlines(), 1):
        for hex_value in re.findall(r"(?<![&\w])#[0-9a-fA-F]{3,8}\b", line):
            if re.search(r"url\(#|#wl-", line) and not re.fullmatch(r"#[0-9a-fA-F]+", hex_value):
                continue
            report(f"colors: line {line_no} hard-codes {hex_value} — use a --ui-* token")
        for literal in re.findall(r"\b(?:rgba?|hsla?)\([^)]*\)", line):
            report(f"colors: line {line_no} hard-codes {literal} — use a --ui-* token")
    for match in re.finditer(r"var\(--([A-Za-z0-9-]+)", js):
        if not match.group(1).startswith("ui-"):
            line_no = js[:match.start()].count("\n") + 1
            report(f"colors: line {line_no} reads --{match.group(1)} — only the app theme's --ui-* variables")


def check_kanban(js: str) -> None:
    if "const KANBAN = '/api/plugins/kanban'" not in js:
        report("kanban: the Kanban REST prefix constant is gone")
    for match in re.finditer(r"['\"`]/api/plugins/([a-z-]+)", js):
        if match.group(1) != "kanban":
            report(f"kanban: line {js[:match.start()].count(chr(10)) + 1} calls /api/plugins/{match.group(1)} directly — use ctx.rest for Wingline's own backend")


def check_catches(js: str) -> None:
    for match in re.finditer(r"catch\s*\(\s*(\w*)\s*\)\s*\{(.*?)\n\s*\}", js, re.S):
        if not re.search(r"console\.(warn|error)|set[A-Z]\w*\(|throw\b|fail\(|mark\(", match.group(2)):
            report(f"silentCatch: the catch at line {js[:match.start()].count(chr(10)) + 1} neither logs nor shows the error")
    for match in re.finditer(r"\.catch\(\s*\(?\s*\w*\s*\)?\s*=>\s*(\{.*?\n\s*\}\)|[^\n]*)", js, re.S):
        if not re.search(r"console\.(warn|error)|set[A-Z]\w*\(|fail\(", match.group(1)):
            report(f"silentCatch: the .catch at line {js[:match.start()].count(chr(10)) + 1} neither logs nor shows the error")


def check_dashboard() -> None:
    dashboard = ROOT / "dashboard"
    manifest = json.loads((dashboard / "manifest.json").read_text(encoding="utf-8"))
    entry = manifest.get("entry", "dist/index.js")
    tab = manifest.get("tab") if isinstance(manifest.get("tab"), dict) else {}
    if not (isinstance(entry, str) and (dashboard / entry).is_file()) and not tab.get("hidden"):
        report(f"dashboard: manifest.json shows a web dashboard tab but dashboard/{entry} does not exist — "
               'the tab would fail to load; set "tab": {"hidden": true} or ship the script')


def check_privacy() -> None:
    files = [JS, *sorted((HERE / "fixtures").glob("*.json")), *sorted(p for p in HERE.glob("*.*") if p.suffix in {".mjs", ".cjs", ".py", ".json"})]
    for path in files:
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = path.relative_to(ROOT).as_posix() if path.is_relative_to(ROOT) else path.name
        if ACCOUNT.search(text):
            report(f"privacy: {rel} names the author's account")
        for user in set(USER_PATH.findall(text)):
            if user.lower() not in FIXTURE_USERS:
                report(f"privacy: {rel} holds a Users/{user} path")


def main() -> int:
    js = JS.read_text(encoding="utf-8")
    check_lint(JS)
    check_bundle_and_i18n(js)
    check_registration(js)
    check_html(js)
    check_colors(js)
    check_kanban(js)
    check_catches(js)
    check_dashboard()
    check_privacy()
    for problem in problems:
        print(f"PROBLEM  {problem}")
    print(f"static audit: {'clean' if not problems else f'{len(problems)} problem(s)'}")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
