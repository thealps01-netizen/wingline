from __future__ import annotations

import json
import logging
import os
import re
import sqlite3
import sys
import time
from contextlib import closing
from pathlib import Path
from typing import Optional
from urllib.parse import quote

from fastapi import APIRouter, HTTPException

router = APIRouter()
log = logging.getLogger(__name__)

VERSION = "0.1.0"
DEFAULT_BOARD = "default"
WORK_PREFIX = "work kanban task "
_SLUG = re.compile(r"^[a-z0-9][a-z0-9\-_]{0,63}$")
_REVIEW = re.compile(r"\b(review|security|ux|ui|code)\b(?!-)")
_GATE = re.compile(r"\bgate\b")
_TIMEOUT_ERROR = re.compile(r"elapsed \d+s > limit \d+s|max[ _]runtime", re.I)
_ANSI = [
    re.compile(r"\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)"),
    re.compile(r"\x1b\[[0-?]*[ -/]*[@-~]"),
    re.compile(r"\x1b[@-_]"),
    re.compile(r"\x9b[0-?]*[ -/]*[@-~]"),
    re.compile(r"\\+(?:x1b|u001b|033|e)\[[0-?]*[ -/]*[@-~]", re.I),
    re.compile(r"\\+(?:x1b|u001b|033)", re.I),
    re.compile(r"\[[0-9;]*m"),
]
_CONTROL = re.compile(r"[\x00-\x08\x0b-\x1f\x7f-\x9f]")
_QUEUED = ("todo", "ready", "triage")
_REASON_MAX = 160
_DUMP = re.compile(r"worker's last output", re.I)
_DUMP_ERROR = re.compile(r"\b(?:Error|Exception):\s*(.+?)['\"]*\s*$")
_SESSION_COLUMNS = ("id", "parent_session_id", "started_at", "estimated_cost_usd", "actual_cost_usd",
                    "cost_status", "last_activity_at", "last_activity_description")
_LINKS: dict[str, tuple[tuple, dict[str, list[str]]]] = {}

_TEXT = {
    "time_limit": "Stopped by the time limit after {dur}; retries used {retries}",
    "past_limit": "Ran {dur}, past its {limit} time limit, then ended as {outcome}; retries used {retries}",
    "no_reason": "Blocked; no reason recorded",
    "ended_as": "Ended as {outcome} after {dur}; retries used {retries}",
    "ended_err": "Ended as {outcome} after {dur} ({error}); retries used {retries}",
    "retries_of": "{used}/{max}",
    "retries_board": "{used} (board limit)",
}


def _tx(key: str, **kw) -> str:
    return _TEXT[key].format(**kw)


def _platform_home() -> Path:
    if sys.platform == "win32":
        base = os.environ.get("LOCALAPPDATA", "").strip()
        return (Path(base) if base else Path.home() / "AppData" / "Local") / "hermes"
    return Path.home() / ".hermes"


def _root() -> Path:
    try:
        from hermes_constants import get_default_hermes_root

        return Path(get_default_hermes_root())
    except Exception as exc:
        log.debug("wingline: core home resolver unavailable (%s)", exc)
    env = os.environ.get("HERMES_HOME", "").strip()
    if env:
        path = Path(os.path.expanduser(os.path.expandvars(env)))
        return path.parent.parent if path.parent.name == "profiles" else path
    return _platform_home()


def _kanban_core():
    from hermes_cli import kanban_db

    return kanban_db


def _kanban_root() -> Path:
    try:
        return Path(_kanban_core().kanban_home())
    except Exception as exc:
        log.debug("wingline: core kanban home unavailable (%s)", exc)
    env = os.environ.get("HERMES_KANBAN_HOME", "").strip()
    return Path(env).expanduser() if env else _root()


def _err(errors: list, source: str, exc: Exception) -> None:
    log.warning("wingline: %s unreadable: %s", source, exc)
    errors.append({"source": source, "message": f"{type(exc).__name__}: {exc}"})


def _label(path: Path, base: Path) -> str:
    try:
        return path.relative_to(base).as_posix()
    except ValueError:
        return path.name


def _ro(path: Path) -> sqlite3.Connection:
    if not path.is_file():
        raise FileNotFoundError(f"{path.name} not found")
    conn = sqlite3.connect(f"file:{quote(path.as_posix(), safe='/:')}?mode=ro", uri=True, timeout=5)
    conn.row_factory = sqlite3.Row
    return conn


def _normalize(slug) -> Optional[str]:
    try:
        return _kanban_core()._normalize_board_slug(slug)
    except ValueError:
        raise
    except Exception:
        text = str(slug).strip().lower() if slug is not None else ""
        if not text:
            return None
        if not _SLUG.match(text):
            raise ValueError(f"invalid board slug {slug!r}")
        return text


def _board_meta(slug: str) -> dict:
    try:
        return dict(_kanban_core().read_board_metadata(slug))
    except Exception:
        path = _kanban_root() / "kanban" / "boards" / slug / "board.json"
        try:
            data = json.loads(path.read_text(encoding="utf-8-sig"))
            return data if isinstance(data, dict) else {}
        except (OSError, ValueError):
            return {}


def _board_exists(slug: str) -> bool:
    try:
        return bool(_kanban_core().board_exists(slug))
    except Exception:
        return slug == DEFAULT_BOARD or (_kanban_root() / "kanban" / "boards" / slug / "board.json").is_file()


def _resolve_board(board: Optional[str], errors: list) -> str:
    if board is not None and str(board).strip():
        try:
            slug = _normalize(board)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        if slug != DEFAULT_BOARD:
            if not _board_exists(slug):
                raise HTTPException(status_code=404, detail=f"board {slug!r} does not exist")
            if _board_meta(slug).get("archived"):
                raise HTTPException(status_code=404, detail=f"board {slug!r} is archived")
        return slug
    try:
        return _kanban_core().get_current_board() or DEFAULT_BOARD
    except Exception as exc:
        log.debug("wingline: core get_current_board unavailable (%s)", exc)
    try:
        path = _kanban_root() / "kanban" / "current"
        text = path.read_text(encoding="utf-8-sig").strip() if path.is_file() else ""
        slug = _normalize(text) if text else None
        if slug and _board_exists(slug) and not _board_meta(slug).get("archived"):
            return slug
    except Exception as exc:
        _err(errors, "kanban/current", exc)
    return DEFAULT_BOARD


def _board_stats(slug: str, errors: list) -> tuple[int, Optional[float], dict, list[str]]:
    path = _board_db(slug)
    by_status: dict[str, int] = {}
    ids: list[str] = []
    if not path.is_file():
        return 0, None, by_status, ids
    try:
        with closing(_ro(path)) as conn:
            count = conn.execute("select count(*) from tasks where status != 'archived'").fetchone()[0]
            for r in conn.execute("select status, count(*) n from tasks group by status"):
                by_status[r["status"]] = r["n"]
            ids = [r["id"] for r in conn.execute("select id from tasks")]
            stamps = [conn.execute("select max(max(coalesce(created_at, 0), coalesce(started_at, 0), "
                                   "coalesce(completed_at, 0))) from tasks").fetchone()[0]]
            for sql in ("select max(max(coalesce(started_at, 0), coalesce(ended_at, 0))) from task_runs",
                        "select max(created_at) from task_events"):
                try:
                    stamps.append(conn.execute(sql).fetchone()[0])
                except sqlite3.Error:
                    pass
    except Exception as exc:
        _err(errors, _label(path, _kanban_root()), exc)
        return 0, None, {}, []
    found = [s for s in stamps if isinstance(s, (int, float)) and s > 0]
    return int(count), (max(found) if found else None), by_status, ids


def _counts(by_status: dict) -> dict:
    return {"needs_you": by_status.get("blocked", 0), "working": by_status.get("running", 0),
            "queued": sum(by_status.get(s, 0) for s in _QUEUED), "done": by_status.get("done", 0)}


def _list_boards(errors: list) -> tuple[list[dict], dict[str, list[str]]]:
    rows = None
    try:
        rows = [{"slug": b.get("slug"), "name": b.get("name") or b.get("slug")}
                for b in _kanban_core().list_boards(include_archived=False)]
    except Exception as exc:
        log.debug("wingline: core list_boards unavailable (%s)", exc)
    if rows is None:
        rows = [{"slug": DEFAULT_BOARD, "name": "Default"}]
        root = _kanban_root() / "kanban" / "boards"
        try:
            children = sorted(root.iterdir(), key=lambda p: p.name.lower()) if root.is_dir() else []
        except OSError as exc:
            _err(errors, "kanban/boards", exc)
            children = []
        for child in children:
            if child.name == DEFAULT_BOARD or not _SLUG.match(child.name) or not (child / "board.json").is_file():
                continue
            meta = _board_meta(child.name)
            if not meta.get("archived"):
                rows.append({"slug": child.name, "name": meta.get("name") or child.name})
    out, ids = [], {}
    for row in rows:
        slug = row["slug"]
        tasks, last, by_status, ids[slug] = _board_stats(slug, errors)
        out.append({"slug": slug, "name": row["name"], "tasks": tasks, "last_activity": last, **_counts(by_status)})
    return out, ids


def _board_db(slug: str) -> Path:
    try:
        return Path(_kanban_core().kanban_db_path(board=slug))
    except Exception as exc:
        log.debug("wingline: core kanban_db_path unavailable (%s)", exc)
    root = _kanban_root()
    return root / "kanban.db" if slug == DEFAULT_BOARD else root / "kanban" / "boards" / slug / "kanban.db"


def _state_dbs(root: Path) -> list[Path]:
    paths = [root / "state.db"]
    profiles = root / "profiles"
    if profiles.is_dir():
        paths += sorted(p / "state.db" for p in profiles.iterdir() if (p / "state.db").is_file())
    return paths


def plain(text) -> str:
    if text is None:
        return ""
    out = str(text)
    for pattern in _ANSI:
        out = pattern.sub("", out)
    return " ".join(_CONTROL.sub(" ", out).split())


def _first_line(text) -> str:
    if not text:
        return ""
    stripped = str(text)
    for pattern in _ANSI:
        stripped = pattern.sub("", stripped)
    for line in stripped.splitlines():
        folded = plain(line)
        if folded:
            return folded
    return ""


def role(title) -> str:
    text = str(title or "").lower()
    if "flake" in text:
        return "detective"
    if _GATE.search(text):
        return "gate"
    if _REVIEW.search(text):
        return "review"
    return "builder"


def duration(seconds) -> str:
    total = max(0, int(round(seconds or 0)))
    if total < 60:
        return f"{total}s"
    if total < 3600:
        return f"{total // 60}m {total % 60}s"
    return f"{total // 3600}h {total % 3600 // 60}m"


def _number(value):
    return value if isinstance(value, (int, float)) and not isinstance(value, bool) else None


def _retries(task: dict) -> str:
    used = task.get("consecutive_failures") or 0
    limit = task.get("max_retries")
    return _tx("retries_of", used=used, max=limit) if limit is not None else _tx("retries_board", used=used)


def _cap(text: str) -> str:
    return text if len(text) <= _REASON_MAX else text[:_REASON_MAX - 1].rstrip() + "\u2026"


def block_reason(task: dict, runs: list[dict], event: Optional[dict]) -> Optional[str]:
    error = task.get("last_failure_error")
    if task.get("status") != "blocked" and not error:
        return None
    if task.get("status") == "blocked" and event and event.get("event") == "blocked":
        reason = plain(event.get("reason"))
        if reason:
            return _cap(reason)
    last = runs[-1] if runs else None
    took = None
    if last:
        started, ended = _number(last.get("started_at")), _number(last.get("ended_at"))
        took = ended - started if started is not None and ended is not None else None
        limit = _number(last.get("max_runtime_seconds")) or _number(task.get("max_runtime_seconds"))
        if last.get("outcome") == "timed_out" or _TIMEOUT_ERROR.search(str(last.get("error") or "")):
            return _tx("time_limit", dur=duration(took if took is not None else limit), retries=_retries(task))
        if took is not None and limit and took > limit and last.get("outcome"):
            return _tx("past_limit", dur=duration(took), limit=duration(limit),
                       outcome=str(last.get("outcome")), retries=_retries(task))
    line = _first_line(error) or _first_line(last.get("error") if last else None)
    if (len(line) > _REASON_MAX or _DUMP.search(line)) and last and last.get("outcome") and took is not None:
        found = _DUMP_ERROR.search(line)
        if found and len(found.group(1)) <= 80:
            return _cap(_tx("ended_err", outcome=str(last.get("outcome")), dur=duration(took),
                            error=found.group(1).strip(), retries=_retries(task)))
        return _tx("ended_as", outcome=str(last.get("outcome")), dur=duration(took), retries=_retries(task))
    return _cap(line) or _tx("no_reason")


def _columns(conn: sqlite3.Connection, table: str) -> set[str]:
    return {r[1] for r in conn.execute(f"pragma table_info({table})")}


def _links(conn: sqlite3.Connection, path: Path) -> dict[str, list[str]]:
    stamp = conn.execute("select max(started_at), count(*) from sessions").fetchone()
    key = (str(path), stamp[0], stamp[1])
    cached = _LINKS.get(str(path))
    if cached and cached[0] == key:
        return cached[1]
    found: dict[str, list[str]] = {}
    rows = conn.execute(
        "select s.id sid, (select m.content from messages m where m.session_id = s.id and m.role = 'user' "
        "order by m.id limit 1) first from sessions s order by s.started_at")
    for r in rows:
        first = r["first"]
        if isinstance(first, str) and first.startswith(WORK_PREFIX):
            task_id = first[len(WORK_PREFIX):]
            if task_id and task_id == task_id.strip() and " " not in task_id and "\n" not in task_id:
                found.setdefault(task_id, []).append(r["sid"])
    _LINKS[str(path)] = (key, found)
    return found


def _session_rows(conn: sqlite3.Connection) -> dict[str, dict]:
    have = _columns(conn, "sessions")
    picked = ", ".join(c if c in have else f"null as {c}" for c in _SESSION_COLUMNS)
    return {r["id"]: dict(r) for r in conn.execute(f"select {picked} from sessions")}


def _read_sessions(root: Path, errors: list) -> list[tuple[dict[str, list[str]], dict[str, dict]]]:
    out = []
    for path in _state_dbs(root):
        try:
            with closing(_ro(path)) as conn:
                out.append((_links(conn, path), _session_rows(conn)))
        except Exception as exc:
            _err(errors, _label(path, root), exc)
    return out


def _task_sessions(task_id: str, stores) -> list[dict]:
    found = []
    for links, rows in stores:
        roots = links.get(task_id) or []
        if not roots:
            continue
        others = {sid for tid, ids in links.items() if tid != task_id for sid in ids}
        children: dict[str, list[str]] = {}
        for sid, r in rows.items():
            if r["parent_session_id"]:
                children.setdefault(r["parent_session_id"], []).append(sid)
        seen: set[str] = set()
        stack = list(roots)
        while stack:
            sid = stack.pop()
            if sid in seen or sid not in rows or (sid in others and sid not in roots):
                continue
            seen.add(sid)
            found.append(rows[sid])
            stack += children.get(sid, [])
    return found


def cost(sessions: list[dict]) -> dict:
    total, kinds = 0.0, []
    for s in sessions:
        actual, estimate = _number(s.get("actual_cost_usd")), _number(s.get("estimated_cost_usd"))
        if actual is not None:
            total += actual
            kinds.append("actual")
        elif estimate is not None:
            total += estimate
            kinds.append("estimated")
    if not kinds:
        status = "none"
    elif all(k == "actual" for k in kinds):
        status = "actual"
    elif all(k == "estimated" for k in kinds):
        status = "estimated"
    else:
        status = "mixed"
    return {"usd": round(total, 6), "status": status, "sessions": len(sessions)}


def _activity(sessions: list[dict]) -> Optional[dict]:
    live = [s for s in sessions if s.get("last_activity_description") and _number(s.get("last_activity_at")) is not None]
    if not live:
        return None
    latest = max(live, key=lambda s: (s["last_activity_at"], s.get("started_at") or 0))
    return {"text": plain(latest["last_activity_description"]), "at": latest["last_activity_at"]}


def _read_board(path: Path, label: str, errors: list) -> tuple[list[dict], dict, dict, dict, dict]:
    tasks: list[dict] = []
    links: dict[str, dict[str, list[str]]] = {"parents": {}, "children": {}}
    runs: dict[str, list[dict]] = {}
    comments: dict[str, int] = {}
    events: dict[str, dict] = {}
    try:
        conn = _ro(path)
    except Exception as exc:
        _err(errors, label, exc)
        return tasks, links, runs, comments, events
    with closing(conn):
        try:
            tasks = [dict(r) for r in conn.execute("select * from tasks order by created_at, id")]
        except Exception as exc:
            _err(errors, f"{label} tasks", exc)
            return tasks, links, runs, comments, events
        try:
            for r in conn.execute("select parent_id, child_id from task_links"):
                links["children"].setdefault(r["parent_id"], []).append(r["child_id"])
                links["parents"].setdefault(r["child_id"], []).append(r["parent_id"])
        except Exception as exc:
            _err(errors, f"{label} task_links", exc)
        try:
            for r in conn.execute("select * from task_runs order by id"):
                runs.setdefault(r["task_id"], []).append(dict(r))
        except Exception as exc:
            _err(errors, f"{label} task_runs", exc)
        try:
            for r in conn.execute("select task_id, count(*) n from task_comments group by task_id"):
                comments[r["task_id"]] = r["n"]
        except Exception as exc:
            _err(errors, f"{label} task_comments", exc)
        try:
            for r in conn.execute("select task_id, kind, payload from task_events "
                                  "where kind in ('blocked', 'gave_up', 'timed_out') order by id"):
                try:
                    payload = json.loads(r["payload"]) if r["payload"] else {}
                except ValueError:
                    payload = {}
                events[r["task_id"]] = {**(payload if isinstance(payload, dict) else {}), "event": r["kind"]}
        except Exception as exc:
            _err(errors, f"{label} task_events", exc)
    return tasks, links, runs, comments, events


def _run(r: dict) -> dict:
    return {
        "id": r.get("id"), "profile": r.get("profile"), "status": r.get("status"), "outcome": r.get("outcome"),
        "started_at": r.get("started_at"), "ended_at": r.get("ended_at"),
        "max_runtime_seconds": r.get("max_runtime_seconds"),
        "error_plain": plain(r.get("error")), "summary": r.get("summary") or "",
    }


def build_overview(board: Optional[str] = None, now: Optional[float] = None) -> dict:
    errors: list[dict] = []
    now = time.time() if now is None else now
    slug = _resolve_board(board, errors)
    boards, board_ids = _list_boards(errors)
    kroot, root = _kanban_root(), _root()
    db = _board_db(slug)
    tasks, links, runs, comments, events = _read_board(db, _label(db, kroot), errors)
    stores = _read_sessions(root, errors) if tasks or any(board_ids.values()) else []
    out_tasks = []
    totals = {"needs_you": 0, "working": 0, "queued": 0, "done": 0, "spend_usd": 0.0}
    for t in tasks:
        tid = t["id"]
        task_runs = runs.get(tid, [])
        sessions = _task_sessions(tid, stores)
        spent = cost(sessions)
        status = t.get("status")
        out_tasks.append({
            "id": tid, "title": t.get("title") or "", "status": status, "assignee": t.get("assignee"),
            "role": role(t.get("title")),
            "created_at": t.get("created_at"), "started_at": t.get("started_at"), "completed_at": t.get("completed_at"),
            "max_runtime_seconds": t.get("max_runtime_seconds"), "max_retries": t.get("max_retries"),
            "consecutive_failures": t.get("consecutive_failures") or 0,
            "block_kind": t.get("block_kind"),
            "block_reason_plain": block_reason(t, task_runs, events.get(tid)),
            "error_raw": t.get("last_failure_error"),
            "error_plain": plain(t.get("last_failure_error")),
            "parents": links["parents"].get(tid, []), "children": links["children"].get(tid, []),
            "runs": [_run(r) for r in task_runs],
            "cost": spent,
            "activity": _activity(sessions) if status == "running" else None,
            "comments": comments.get(tid, 0),
        })
        totals["spend_usd"] += spent["usd"]
        if status == "blocked":
            totals["needs_you"] += 1
        elif status == "running":
            totals["working"] += 1
        elif status in _QUEUED:
            totals["queued"] += 1
        elif status == "done":
            totals["done"] += 1
    totals["spend_usd"] = round(totals["spend_usd"], 6)
    for b in boards:
        b["spend_usd"] = totals["spend_usd"] if b["slug"] == slug else round(
            sum(cost(_task_sessions(tid, stores))["usd"] for tid in board_ids.get(b["slug"], [])), 6)
    return {"board": slug, "boards": boards, "now": now, "tasks": out_tasks, "totals": totals, "errors": errors}


@router.get("/health")
def health() -> dict:
    return {"ok": True, "version": VERSION}


@router.get("/overview")
def overview(board: Optional[str] = None) -> dict:
    return build_overview(board)


def _selftest() -> int:
    import shutil
    import tempfile

    def outside_home(base: str) -> bool:
        try:
            Path(base).resolve().relative_to(_platform_home().resolve())
            return False
        except ValueError:
            return True

    bases = [os.environ.get("TEMP"), os.environ.get("TMP"), tempfile.gettempdir(),
             str(Path.home() / "AppData" / "Local" / "Temp")]
    base = next((b for b in bases if b and Path(b).is_dir() and outside_home(b)), None)
    assert base, "no temp directory outside the real Hermes home"
    home = Path(tempfile.mkdtemp(prefix="wingline-selftest-", dir=base))
    for key in ("HERMES_KANBAN_HOME", "HERMES_KANBAN_BOARD", "HERMES_KANBAN_DB"):
        os.environ.pop(key, None)
    os.environ["HERMES_HOME"] = str(home)
    checks = 0

    def ok(cond, what):
        nonlocal checks
        if not cond:
            raise AssertionError(what)
        checks += 1

    try:
        ok(_root().resolve() == home.resolve(), f"root resolves to temp home: {_root()}")
        ok(_kanban_root().resolve() == home.resolve(), f"kanban root resolves to temp home: {_kanban_root()}")
        slug = "wing-test"
        bdir = home / "kanban" / "boards" / slug
        bdir.mkdir(parents=True)
        (bdir / "board.json").write_text(json.dumps({"slug": slug, "name": "Wing Test"}), encoding="utf-8")
        named = home / "kanban" / "boards" / "named-board"
        named.mkdir(parents=True)
        (named / "board.json").write_text(json.dumps({"slug": "named-board", "name": "Approvals UI"}), encoding="utf-8")
        (home / "kanban" / "current").write_text(slug + "\n", encoding="utf-8")
        kdb = bdir / "kanban.db"
        try:
            _kanban_core().init_db(db_path=kdb)
            schema = "core"
        except Exception as exc:
            print(f"core init_db unavailable ({type(exc).__name__}: {exc}); using a minimal schema")
            schema = "minimal"
        with closing(sqlite3.connect(kdb)) as c:
            if schema == "minimal":
                c.executescript(
                    "create table tasks (id text primary key, title text not null, assignee text, status text not null,"
                    " created_at integer not null, started_at integer, completed_at integer, consecutive_failures integer"
                    " not null default 0, last_failure_error text, max_runtime_seconds integer, max_retries integer,"
                    " block_kind text);"
                    "create table task_links (parent_id text, child_id text);"
                    "create table task_comments (id integer primary key, task_id text, author text, body text,"
                    " created_at integer);"
                    "create table task_events (id integer primary key, task_id text, run_id integer, kind text,"
                    " payload text, created_at integer);"
                    "create table task_runs (id integer primary key, task_id text, profile text, status text,"
                    " max_runtime_seconds integer, started_at integer, ended_at integer, outcome text, summary text,"
                    " error text);")
            c.execute("pragma journal_mode=delete")
            ansi = "pid 1 not alive Worker's last output: \"\\x1b[38;2;63;168;102m const x\\x1b[0m\" \x1b[31mred\x1b[0m [0m\nsecond"
            rows = [
                ("t_build", "ui-polish-1140 build", "done", 100, 110, 200, 0, None, None, 2, None),
                ("t_ui", "ui-polish-1140 r1 ui", "done", 101, 210, 260, 0, None, None, 2, None),
                ("t_gate", "ui-polish-1140 r1 gate", "blocked", 102, 270, None, 0, None, None, 2, "needs_input"),
                ("t_flake", "deck flake: root cause", "blocked", 103, 300, None, 1, ansi, 5400, 1, None),
                ("t_time", "deck T5 build", "blocked", 104, 400, None, 1, "elapsed 18000s > limit 18000s", 18000, 1, None),
                ("t_run", "deck T6 code review", "running", 105, 500, None, 0, None, 3600, None, None),
                ("t_todo", "deck T7", "todo", 106, None, None, 0, None, None, None, None),
                ("t_ready", "investigate cache", "ready", 107, None, None, 0, None, None, None, None),
                ("t_arch", "<img src=x onerror=alert(1)>", "archived", 108, 120, None, 1, "boom\nmore", None, 1, None),
                ("t_crash", "deck T8", "blocked", 109, 600, None, 2, "pid 9 exited with code 1", 60, None, None),
            ]
            c.executemany(
                "insert into tasks (id, title, status, created_at, started_at, completed_at, consecutive_failures,"
                " last_failure_error, max_runtime_seconds, max_retries, block_kind, assignee)"
                " values (?,?,?,?,?,?,?,?,?,?,?,'default')", rows)
            c.executemany("insert into task_links (parent_id, child_id) values (?,?)",
                          [("t_build", "t_ui"), ("t_build", "t_gate"), ("t_ui", "t_gate")])
            c.executemany("insert into task_comments (task_id, author, body, created_at) values (?,?,?,?)",
                          [("t_gate", "a", "x", 1), ("t_gate", "b", "y", 2), ("t_build", "a", "z", 3)])
            c.executemany(
                "insert into task_runs (task_id, profile, status, max_runtime_seconds, started_at, ended_at, outcome,"
                " summary, error) values (?,?,?,?,?,?,?,?,?)",
                [("t_build", "default", "done", None, 110, 200, "completed", "built it", None),
                 ("t_flake", "default", "crashed", 5400, 300, 300 + 17891, "crashed", None, ansi),
                 ("t_time", "default", "timed_out", 18000, 400, 400 + 18000, "timed_out", None,
                  "elapsed 18000s > limit 18000s"),
                 ("t_run", "default", "running", 3600, 500, None, None, None, None),
                 ("t_crash", "default", "crashed", 60, 600, 610, "crashed", None, "pid 9 exited with code 1")])
            c.executemany("insert into task_events (task_id, kind, payload, created_at) values (?,?,?,?)",
                          [("t_gate", "blocked", json.dumps({"reason": "merge-ready:\n  say yes", "kind": "needs_input"}), 5),
                           ("t_flake", "gave_up", json.dumps({"failures": 1}), 6),
                           ("t_crash", "blocked", json.dumps({"reason": "old block"}), 7),
                           ("t_crash", "gave_up", json.dumps({"failures": 2}), 8)])
            c.commit()
        sdb = home / "state.db"
        with closing(sqlite3.connect(sdb)) as c:
            c.executescript(
                "create table sessions (id text primary key, source text, parent_session_id text, started_at real,"
                " estimated_cost_usd real, actual_cost_usd real, cost_status text, last_activity_at real,"
                " last_activity_description text, title text);"
                "create table messages (id integer primary key autoincrement, session_id text, role text,"
                " content text, timestamp real);")
            sessions = [
                ("s_build", "kanban", None, 110, 6.0, None, "estimated", 190, "done building"),
                ("s_build_child", "tool", "s_build", 120, 0.5, None, "estimated", 130, None),
                ("s_build_grand", "tool", "s_build_child", 125, 0.25, None, "estimated", None, None),
                ("s_ui", "kanban", None, 210, 1.0, 0.75, "actual", 250, None),
                ("s_gate1", "kanban", None, 270, 1.0, None, "estimated", None, None),
                ("s_gate2", "kanban", None, 280, 2.0, 1.5, "actual", None, None),
                ("s_run", "kanban", None, 500, 0.1, None, "estimated", 900, "\x1b[1mrunning\x1b[0m   tests"),
                ("s_run_old", "kanban", None, 450, None, None, "unknown", 460, "older"),
                ("s_arch", "kanban", None, 120, 3.0, None, "estimated", None, None),
                ("s_title", "desktop", None, 130, 50.0, None, "estimated", None, None),
                ("s_second", "kanban", None, 140, 70.0, None, "estimated", None, None),
                ("s_suffix", "kanban", None, 150, 80.0, None, "estimated", None, None),
            ]
            c.executemany("insert into sessions (id, source, parent_session_id, started_at, estimated_cost_usd,"
                          " actual_cost_usd, cost_status, last_activity_at, last_activity_description)"
                          " values (?,?,?,?,?,?,?,?,?)", sessions)
            c.execute("update sessions set title = 'ui-polish-1140 build' where id = 's_title'")
            msgs = [("s_build", "user", "work kanban task t_build"), ("s_build", "user", "work kanban task t_todo"),
                    ("s_build_child", "user", "check the build output"),
                    ("s_ui", "assistant", "hi"), ("s_ui", "user", "work kanban task t_ui"),
                    ("s_gate1", "user", "work kanban task t_gate"), ("s_gate2", "user", "work kanban task t_gate"),
                    ("s_run", "user", "work kanban task t_run"), ("s_run_old", "user", "work kanban task t_run"),
                    ("s_arch", "user", "work kanban task t_arch"),
                    ("s_title", "user", "please do ui-polish-1140 build"),
                    ("s_second", "user", "hello"), ("s_second", "user", "work kanban task t_ready"),
                    ("s_suffix", "user", "work kanban task t_ready please")]
            c.executemany("insert into messages (session_id, role, content, timestamp) values (?,?,?,0)", msgs)
            c.commit()
        bad = home / "profiles" / "broken"
        bad.mkdir(parents=True)
        (bad / "state.db").write_bytes(b"this is not a sqlite database at all" * 20)
        good = home / "profiles" / "other"
        good.mkdir(parents=True)
        with closing(sqlite3.connect(good / "state.db")) as c:
            c.executescript(
                "create table sessions (id text primary key, parent_session_id text, started_at real,"
                " estimated_cost_usd real);"
                "create table messages (id integer primary key, session_id text, role text, content text);"
                "insert into sessions values ('p_todo', null, 10, 0.4);"
                "insert into messages (session_id, role, content) values ('p_todo', 'user', 'work kanban task t_todo');")
            c.commit()

        def snapshot():
            return {p.relative_to(home).as_posix(): p.read_bytes() for p in home.rglob("*") if p.is_file()}

        before = snapshot()
        data = build_overview(None, now=1000.0)
        ok(snapshot() == before, "no file in the home was created or changed by the read")
        ok(data["board"] == slug, f"board omitted resolves to kanban/current: {data['board']}")
        ok(data["now"] == 1000.0, "now echoed")
        ok({b["slug"] for b in data["boards"]} >= {"default", slug}, f"boards listed: {data['boards']}")
        bl = {b["slug"]: b for b in data["boards"]}
        ok(bl[slug]["tasks"] == 9 and bl[slug]["last_activity"] == 18400,
           f"board row counts non-archived tasks and the newest activity: {bl[slug]}")
        ok(bl[slug]["name"] == "Wing Test", f"the board name is Hermes' stored name, as written: {bl[slug]}")
        ok(bl["named-board"]["name"] == "Approvals UI" and bl["named-board"]["tasks"] == 0
           and bl["named-board"]["last_activity"] is None, f"a chosen board name is shown as written: {bl['named-board']}")
        ok({k: bl[slug][k] for k in ("needs_you", "working", "queued", "done")}
           == {"needs_you": 4, "working": 1, "queued": 2, "done": 2}, f"board row counts tasks by status: {bl[slug]}")
        ok(bl[slug]["spend_usd"] == data["totals"]["spend_usd"] and bl["named-board"]["spend_usd"] == 0,
           f"board row spend of the open board is its total: {bl[slug]}")
        other = {b["slug"]: b for b in build_overview("default", now=1000.0)["boards"]}
        ok(other[slug]["spend_usd"] == data["totals"]["spend_usd"] and other[slug]["needs_you"] == 4,
           f"a board that is not open gets the same spend and counts: {other[slug]}")
        by = {t["id"]: t for t in data["tasks"]}
        ok(len(by) == 10, "every task returned, archived included")
        roles = {k: by[k]["role"] for k in by}
        ok(roles["t_build"] == "builder", "ui-polish-1140 build is a builder, not a review")
        ok(roles["t_ui"] == "review", "trailing ui is a review")
        ok(roles["t_gate"] == "gate", "gate")
        ok(roles["t_flake"] == "detective", "flake is a detective")
        ok(roles["t_run"] == "review", "code review")
        ok(roles["t_ready"] == "builder", "investigate is not a gate")
        ok(role("code-review pass") == "review" and role("Security audit") == "review", "review words")
        ok(role("ux-polish") == "builder" and role("flaky gate") == "gate", "hyphen guard and flake substring")
        cb = by["t_build"]["cost"]
        ok(cb == {"usd": 6.75, "status": "estimated", "sessions": 3}, f"child and grandchild counted: {cb}")
        ok(by["t_ui"]["cost"] == {"usd": 0.75, "status": "actual", "sessions": 1},
           f"actual preferred, first USER message counts: {by['t_ui']['cost']}")
        ok(by["t_gate"]["cost"] == {"usd": 2.5, "status": "mixed", "sessions": 2}, f"mixed: {by['t_gate']['cost']}")
        ok(by["t_todo"]["cost"] == {"usd": 0.4, "status": "estimated", "sessions": 1},
           f"only a FIRST user message links; other profile's state.db read: {by['t_todo']['cost']}")
        ok(by["t_ready"]["cost"] == {"usd": 0.0, "status": "none", "sessions": 0},
           f"second message and suffixed text do not link: {by['t_ready']['cost']}")
        ok(by["t_run"]["cost"]["status"] == "estimated" and by["t_run"]["cost"]["sessions"] == 2, "unpriced session")
        ok(by["t_time"]["cost"]["status"] == "none", "no session -> none")
        ok(all(t["cost"]["usd"] < 50 for t in data["tasks"]), "title-matched session never counted")
        ok(by["t_run"]["activity"] == {"text": "running tests", "at": 900}, f"activity: {by['t_run']['activity']}")
        ok(by["t_build"]["activity"] is None, "no activity unless running")
        ok(by["t_flake"]["error_raw"] == ansi, "error_raw stored as is")
        ep = by["t_flake"]["error_plain"]
        ok("\x1b" not in ep and "\\x1b" not in ep and "[0m" not in ep and "[38;" not in ep and "\n" not in ep,
           f"ANSI stripped: {ep!r}")
        ok(ep == "pid 1 not alive Worker's last output: \" const x\" red second", f"plain text kept: {ep!r}")
        ok(by["t_flake"]["block_reason_plain"] ==
           "Ran 4h 58m, past its 1h 30m time limit, then ended as crashed; retries used 1/1",
           f"past-limit reason: {by['t_flake']['block_reason_plain']}")
        ok(by["t_time"]["block_reason_plain"] == "Stopped by the time limit after 5h 0m; retries used 1/1",
           f"time-limit reason: {by['t_time']['block_reason_plain']}")
        ok(by["t_gate"]["block_reason_plain"] == "merge-ready: say yes", f"explicit block reason: {by['t_gate']['block_reason_plain']!r}")
        ok(by["t_crash"]["block_reason_plain"] == "pid 9 exited with code 1",
           f"unknown -> first line, newer gave_up wins over older block: {by['t_crash']['block_reason_plain']}")
        ok(by["t_arch"]["block_reason_plain"] == "boom", "first line for a non-blocked failed task")
        ok(by["t_build"]["block_reason_plain"] is None, "no reason for a healthy task")
        ok(by["t_flake"]["runs"][0]["error_plain"] == ep, "run error stripped")
        ok(by["t_build"]["runs"][0]["summary"] == "built it", "run summary")
        ok(sorted(by["t_gate"]["parents"]) == ["t_build", "t_ui"], "parents")
        ok(sorted(by["t_build"]["children"]) == ["t_gate", "t_ui"], "children")
        ok(by["t_gate"]["comments"] == 2 and by["t_todo"]["comments"] == 0, "comment counts")
        ok(by["t_arch"]["title"] == "<img src=x onerror=alert(1)>", "title kept verbatim (escaping is the page's job)")
        tot = data["totals"]
        ok((tot["needs_you"], tot["working"], tot["queued"], tot["done"]) == (4, 1, 2, 2), f"totals: {tot}")
        expect = round(sum(t["cost"]["usd"] for t in data["tasks"]), 6)
        ok(tot["spend_usd"] == expect and by["t_arch"]["cost"]["usd"] == 3.0, "spend sums every task incl. archived")
        sources = [e["source"] for e in data["errors"]]
        ok(sources == ["profiles/broken/state.db"], f"broken state.db reported, nothing else: {data['errors']}")
        ok(len(_LINKS) == 2, "link cache filled per readable state.db")
        with closing(sqlite3.connect(sdb)) as c:
            c.execute("insert into sessions (id, started_at, estimated_cost_usd) values ('s_new', 2000, 1.0)")
            c.execute("insert into messages (session_id, role, content, timestamp) "
                      "values ('s_new', 'user', 'work kanban task t_time', 0)")
            c.commit()
        again = build_overview(slug, now=1001.0)
        ok({t["id"]: t for t in again["tasks"]}["t_time"]["cost"]["usd"] == 1.0, "cache refreshes on a new session")
        with closing(sqlite3.connect(sdb)) as c:
            c.execute("update sessions set estimated_cost_usd = 9.0 where id = 's_new'")
            c.commit()
        third = build_overview(slug, now=1002.0)
        ok({t["id"]: t for t in third["tasks"]}["t_time"]["cost"]["usd"] == 9.0, "costs are read fresh")
        for bad_slug, code in (("../x", 400), ("nope", 404)):
            try:
                build_overview(bad_slug)
                ok(False, f"{bad_slug} must fail")
            except HTTPException as exc:
                ok(exc.status_code == code, f"{bad_slug} -> {exc.status_code}")
        empty = build_overview("default")
        ok(empty["tasks"] == [] and empty["errors"] and empty["errors"][0]["source"] == "kanban.db",
           f"missing default board db reported: {empty['errors']}")
        ok(health() == {"ok": True, "version": VERSION}, "health")
        ok(duration(59) == "59s" and duration(61) == "1m 1s" and duration(74) == "1m 14s"
           and duration(18000) == "5h 0m", "duration format: one style, seconds kept under an hour")
        dump = "pid 1 not alive Worker's last output: " + "x" * 400
        ok(block_reason({"status": "blocked", "last_failure_error": dump},
                        [{"outcome": "crashed", "started_at": 0, "ended_at": 74}], None)
           == "Ended as crashed after 1m 14s; retries used 0 (board limit)",
           "a raw dump never becomes the reason; the recorded outcome does")
        skill = "pid 7 exited with code 1 Worker's last output: 'Initializing agent... Error: Unknown skill(s): x:y'"
        ok(block_reason({"status": "archived", "last_failure_error": skill},
                        [{"outcome": "crashed", "started_at": 0, "ended_at": 61}], None)
           == "Ended as crashed after 1m 1s (Unknown skill(s): x:y); retries used 0 (board limit)",
           "a short worker dump keeps only the error it names")
        capped = block_reason({"status": "blocked", "last_failure_error": dump}, [], None)
        ok(len(capped) == _REASON_MAX and capped.endswith("\u2026"), f"a long first line is capped: {len(capped)}")
        ok(len(block_reason({"status": "blocked"}, [], {"event": "blocked", "reason": "y " * 200})) == _REASON_MAX,
           "a long block reason is capped")
        ok(json.loads(json.dumps(data)) == data, "JSON serialisable")
    finally:
        shutil.rmtree(home, ignore_errors=True)
    print(f"wingline selftest: {checks} checks passed")
    return 0


if __name__ == "__main__" and "--selftest" in sys.argv:
    sys.exit(_selftest())
