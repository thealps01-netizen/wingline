"""Feeds real Kanban data into the world view (view=world&data=<file>): the file is worldOf()'s output (desktop/plugin.js,
made by world-data.mjs). Without data= the page shows the built-in sample exactly as before (checked by canvas hashes).
With data:
  - planet: one area per board at worldOf's spot (lat / lon); only boards worldOf marks `labeled` get a label;
    header and counters are worldOf's planet chrome.
  - region: the open board (`current`) is the one the camera flies down to; its settlements are the board's pipelines
    (name, spend -> farm / village / port, state, chip); header is worldOf's region chrome.
  - port: the first pipeline that is a port (worldOf lists the ones that need you first). Its warehouse is the builder,
    one crane per review (up to 6, spread along the quay), the gate; trucks move only while a task of it is working.
    A board with no port pipeline stops with a note (village and farm sites in the world view are the next step).
Runs after world_patch.py and before speedup.py. Every replacement must match once."""
p = 'planet.js'; s = open(p, encoding='utf-8').read()
def R(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:100]); s = s.replace(a, b)
def RIN(fn, a, b):  # inside one function only (the stand-alone views have the same lines)
    global s
    i = s.index('function ' + fn + '('); j = s.index('\nfunction ', i + 1); body = s[i:j]
    assert body.count(a) == 1, (fn, body.count(a), a[:100]); s = s[:i] + body.replace(a, b) + s[j:]
RP = lambda a, b: RIN('buildPort', a, b)

R("const [KIND, LEVEL] = view.split('-');",
  "const [KIND, LEVEL] = view.split('-');\n"
  "// worldOf() output (desktop/plugin.js) when the page is opened with data=<file>; null = the built-in sample\n"
  "const DATA_URL = new URLSearchParams(location.search).get('data');\n"
  "const WL = DATA_URL ? await fetch(DATA_URL).then(r => { if (!r.ok) throw new Error('world data: ' + r.status + ' ' + DATA_URL); return r.json(); }) : null;\n"
  "const TONE = { fail: '#ec6a84', work: '#e0a944' };")

# planet: boards from the data, labels only where worldOf put one
R("const BOARDS = [\n", "const BOARDS = WL ? WL.boards.map(b => ({ ...b })) : [\n")
R("    items.push({ name: b.name, st: b.st, chip: b.chip, at: sph(b.lat, b.lon, 100.3) });\n  }",
  "    if (b.labeled !== false) items.push({ name: b.name, st: b.st, chip: b.chip, at: sph(b.lat, b.lon, 100.3) });\n  }")
R("if (WORLD && b.name === 'You Should Know') {", "if (WORLD && isHome(b)) {")
R("const DETAIL = [4, 32, -12, 16];",
  "const isHome = b => (WL ? b.current : b.name === 'You Should Know');\n"
  "const HOME = (() => { const b = BOARDS.find(isHome); if (!b) throw new Error('world data: no open board'); return [b.lat, b.lon]; })();\n"
  "const DETAIL = [4, 32, -12, 16];")
R("const N = new THREE.Vector3(...sph(18, 2, 1)),", "const N = new THREE.Vector3(...sph(HOME[0], HOME[1], 1)),")

# region: pipelines from the data
R("const placeType = usd =>",
  "if (WL) YSK.splice(0, YSK.length, ...WL.region.pipelines.map(p => [p.name, p.usd, p.st]));\n"
  "// the pipeline whose port the camera flies down to\n"
  "const PORT_I = WL ? WL.region.pipelines.findIndex(p => p.place === 'harbor') : YSK.findIndex(r => r[0] === 'note-actions r1');\n"
  "const PORT_P = WL ? WL.region.pipelines[PORT_I] : null;\n"
  "if (WL && PORT_I < 0) throw new Error('world data: this board has no port pipeline yet (village and farm sites come next)');\n"
  "const placeType = usd =>")
R("const LIST = kind === 'mixed' ? YSK.map(", "const LIST = kind === 'mixed' && WL ? WL.region.pipelines.map(p => [p.name, p.st, p.chip]) : kind === 'mixed' ? YSK.map(")
R("chrome(kind === 'mixed' ? { tab: 'You Should Know · 1 needs you',",
  "chrome(kind === 'mixed' && WL ? { ...WL.region.chrome, tabCol: TONE[WL.region.chrome.tabTone], hint } : kind === 'mixed' ? { tab: 'You Should Know · 1 needs you',")

# port: the chosen pipeline
R("const i = YSK.findIndex(r => r[0] === 'note-actions r1'), s = S[i],", "const i = PORT_I, s = S[i],")
RP("items.push({ name: 'build', st: 'done', chip: 'done · builder', at: tp(m, [0, 17, 0]) }); }",
  "for (const u of WL ? PORT_P.roles.builder.slice(0, 1) : [{ short: 'build', st: 'done' }]) items.push({ name: u.short, st: u.st, chip: `${WORD[u.st]} · builder`, at: tp(m, [0, 17, 0]) }); }")
RP("const REV = [['security', 'done', -105], ['ux', 'work', -35], ['ui', 'work', 35], ['code', 'done', 105]];",
  "const REV = WL ? PORT_P.roles.review.map((u, k, a) => [u.short, u.st, (k - (a.length - 1) / 2) * 70]) : [['security', 'done', -105], ['ux', 'work', -35], ['ui', 'work', 35], ['code', 'done', 105]];\n"
  "  const IDLE = !!WL && !PORT_P.counts.work;")
RP("const g = capture(() => truck(0, 0, 0, cg)); ANIM.movers.push(t => { const c = (t / 11 + ph) % 1,",
  "const g = capture(() => truck(0, 0, 0, IDLE ? INK : cg)); ANIM.movers.push(t => { const c = IDLE ? 0 : (t / 11 + ph) % 1,")
RP("items.push({ name: 'gate', st: 'wait', chip: 'waiting · all 4 reviews', at: [0, 9, -180] }); }",
  "for (const u of WL ? PORT_P.roles.gate : [{ short: 'gate', st: 'wait', chip: 'waiting · all 4 reviews' }]) items.push({ name: u.short, st: u.st, chip: u.chip || `${WORD[u.st]} · gate`, at: [0, 9, -180] }); }")

# HUD: planet, click and port from the data
RIN('runWorld', "chrome({ tab: 'All boards · 3 need you', tabCol: '#ec6a84', ticks: { label: '4/7 boards clear', list: BOARDS.map(b => b.st) }, tl: [['Boards', '7'], ['Tasks', '137'], ['Spent', '$218.66']], tr: [['Working', '02'], ['Needs you', '03'], ['Done', '129']], hint: 'Each <b>light is a board</b> · click one to fly down to it' });\n  SNAP.planet",
  "chrome(WL ? { ...WL.planet, tabCol: TONE[WL.planet.tabTone], hint: 'Each <b>light is a board</b> · click one to fly down to it' } : { tab: 'All boards · 3 need you', tabCol: '#ec6a84', ticks: { label: '4/7 boards clear', list: BOARDS.map(b => b.st) }, tl: [['Boards', '7'], ['Tasks', '137'], ['Spent', '$218.66']], tr: [['Working', '02'], ['Needs you', '03'], ['Done', '129']], hint: 'Each <b>light is a board</b> · click one to fly down to it' });\n  SNAP.planet")
R("PICK = proj(WORLD.items.find(q => q.name === 'note-actions r1').at);", "PICK = proj(WORLD.items[PORT_I].at);")
R("chrome({ ...NA_CHROME, hint: 'Each <b>berth is a task</b>", "chrome({ ...(WL ? { ...PORT_P.chrome, tabCol: TONE[PORT_P.chrome.tabTone] } : NA_CHROME), hint: 'Each <b>berth is a task</b>")
RIN('frameW', "if (ph === 'region') { const tg = [...ov.querySelectorAll('.tg')].find(e => e.textContent.includes('note-actions r1'));",
  "if (ph === 'region') { const tg = [...ov.querySelectorAll('.tg')].find(e => e.textContent.includes(YSK[PORT_I][0]));")
open(p, 'w', encoding='utf-8', newline='\n').write(s); print('data patched', len(s))
