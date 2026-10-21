"""Feeds real Kanban data into the world view (view=world&data=<file>): the file is worldOf()'s output (desktop/plugin.js,
made by world-data.mjs). Without data= the page shows the built-in sample exactly as before (checked by canvas hashes).
With data:
  - planet: one area per board at worldOf's spot (lat / lon); only boards worldOf marks `labeled` get a label;
    header and counters are worldOf's planet chrome.
  - region: the open board (`current`) is the one the camera flies down to; its settlements are the board's pipelines
    (name, spend -> farm / village / port, state, chip); header is worldOf's region chrome.
  - site: the camera flies on down to the pipeline worldOf ranks first (needs you, then working, then newest), built
    up close in its own kind (FOCUS_T):
      port    each task a berth (crane and ship, up to 6 within the quay's 4-berth width, closer together and with
              shorter ships beyond 4), the gate on the breakwater; trucks move only while a task of it is working.
      village each task a workshop on the main street (porch toward the street), the gate a town gate in front;
              carts run along the street only while a task works.
      farm    each task a field (up to 3 per row, a tractor on a working one, bales on the others), the gate a
              grain elevator behind.
    Labels say the task's role. The site keeps the port's frame (site x along the region's z, site -z toward the
    region's east); a port sits on the coast at scale .25, a village or farm on its flat ground at scale .5.
Runs after world_patch.py and before speedup.py. Every replacement must match once."""
p = 'planet.js'; s = open(p, encoding='utf-8').read()
def R(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:100]); s = s.replace(a, b)
def RIN(fn, a, b):  # inside one function only (the stand-alone views have the same lines)
    global s
    i = s.index('function ' + fn + '('); j = s.find('\nfunction ', i + 1); j = len(s) if j < 0 else j; body = s[i:j]
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
  "if (WL) YSK.splice(0, YSK.length, ...WL.region.pipelines.map(p => [p.label, p.usd, p.st]));\n"
  "// the pipeline whose site the camera flies down to: the one worldOf ranks first (FOCUS_T = its kind)\n"
  "if (WL && !WL.region.pipelines.length) throw new Error('world data: the open board has no pipelines');\n"
  "const PORT_I = WL ? 0 : YSK.findIndex(r => r[0] === 'note-actions r1');\n"
  "const PORT_P = WL ? WL.region.pipelines[PORT_I] : null;\n"
  "const FOCUS_T = WL ? PORT_P.place : 'harbor';\n"
  "const SITE_HINT = { harbor: 'Each <b>berth is a task</b> · cranes and trucks are the agents · click one for its log', village: 'Each <b>workshop is a task</b> · workers and carts are the agents · click one for its log', farm: 'Each <b>field is a task</b> · tractors are the agents · click one for its log' };\n"
  "const placeType = usd =>")
R("const LIST = kind === 'mixed' ? YSK.map(", "const LIST = kind === 'mixed' && WL ? WL.region.pipelines.map(p => [p.label, p.st, p.chip]) : kind === 'mixed' ? YSK.map(")
R("chrome(kind === 'mixed' ? { tab: 'You Should Know · 1 needs you',",
  "chrome(kind === 'mixed' && WL ? { ...WL.region.chrome, tabCol: TONE[WL.region.chrome.tabTone], hint } : kind === 'mixed' ? { tab: 'You Should Know · 1 needs you',")

# port: the chosen pipeline
R("const i = YSK.findIndex(r => r[0] === 'note-actions r1'), s = S[i],", "const i = PORT_I, s = S[i],")
RP("items.push({ name: 'build', st: 'done', chip: 'done · builder', at: tp(m, [0, 17, 0]) }); }",
  "for (const u of WL ? [] : [{ short: 'build', st: 'done' }]) items.push({ name: u.short, st: u.st, chip: `${WORD[u.st]} · builder`, at: tp(m, [0, 17, 0]) }); }")
RP("const REV = [['security', 'done', -105], ['ux', 'work', -35], ['ui', 'work', 35], ['code', 'done', 105]];",
  "const BERTH = WL ? Math.min(70, 210 / Math.max(1, PORT_P.units.length - 1)) : 70;\n  const REV = WL ? PORT_P.units.map((u, k, a) => [u.label, u.st, (k - (a.length - 1) / 2) * BERTH, u.role]) : [['security', 'done', -105], ['ux', 'work', -35], ['ui', 'work', 35], ['code', 'done', 105]];\n"
  "  const IDLE = !!WL && !PORT_P.counts.work;")
RP("ship(fr(x, -.4, -18, 0), 62, 13,", "ship(fr(x, -.4, -18, 0), WL ? Math.min(62, BERTH * .88) : 62, 13,")
RP("for (const [n, st, x] of REV) {", "for (const [n, st, x, role = 'review'] of REV) {")
RP("items.push({ name: n, st, chip: `${WORD[st]} · review`, at }); }", "items.push({ name: n, st, chip: `${WORD[st]} · ${role}`, at }); }")
RP("const g = capture(() => truck(0, 0, 0, cg)); ANIM.movers.push(t => { const c = (t / 11 + ph) % 1,",
  "const g = capture(() => truck(0, 0, 0, IDLE ? INK : cg)); ANIM.movers.push(t => { const c = IDLE ? 0 : (t / 11 + ph) % 1,")
RP("items.push({ name: 'gate', st: 'wait', chip: 'waiting · all 4 reviews', at: [0, 9, -180] }); }",
  "for (const u of WL ? (PORT_P.gate ? [PORT_P.gate] : []) : [{ label: 'gate', st: 'wait', chip: 'waiting · all 4 reviews' }]) items.push({ name: u.label, st: u.st, chip: u.chip || `${WORD[u.st]} · gate`, at: [0, 9, -180] }); }")

# HUD: planet, click and port from the data
RIN('runWorld', "chrome({ tab: 'All boards · 3 need you', tabCol: '#ec6a84', ticks: { label: '4/7 boards clear', list: BOARDS.map(b => b.st) }, tl: [['Boards', '7'], ['Tasks', '137'], ['Spent', '$218.66']], tr: [['Working', '02'], ['Needs you', '03'], ['Done', '129']], hint: 'Each <b>light is a board</b> · click one to fly down to it' });\n  SNAP.planet",
  "chrome(WL ? { ...WL.planet, tabCol: TONE[WL.planet.tabTone], hint: 'Each <b>light is a board</b> · click one to fly down to it' } : { tab: 'All boards · 3 need you', tabCol: '#ec6a84', ticks: { label: '4/7 boards clear', list: BOARDS.map(b => b.st) }, tl: [['Boards', '7'], ['Tasks', '137'], ['Spent', '$218.66']], tr: [['Working', '02'], ['Needs you', '03'], ['Done', '129']], hint: 'Each <b>light is a board</b> · click one to fly down to it' });\n  SNAP.planet")
R("PICK = proj(WORLD.items.find(q => q.name === 'note-actions r1').at);", "PICK = proj(WORLD.items[PORT_I].at);")
R("chrome({ ...NA_CHROME, hint: 'Each <b>berth is a task</b>", "chrome({ ...(WL ? { ...PORT_P.chrome, tabCol: TONE[PORT_P.chrome.tabTone] } : NA_CHROME), hint: 'Each <b>berth is a task</b>")
RIN('frameW', "if (ph === 'region') { const tg = [...ov.querySelectorAll('.tg')].find(e => e.textContent.includes('note-actions r1'));",
  "if (ph === 'region') { const tg = [...ov.querySelectorAll('.tg')].find(e => e.textContent.includes(YSK[PORT_I][0]));")
R("hint: 'Each <b>berth is a task</b> · cranes and trucks are the agents · click one for its log' }); columnLabels(WORLD.portItems",
  "hint: SITE_HINT[FOCUS_T] }); columnLabels(WORLD.portItems")

# site of any kind: frame, ground, build, camera
R("    const i = PORT_I, s = S[i], k = .25, Ox = s.x + 16, Oz = s.z;\n    const s2r = ([x, y, z]) => [Ox - k * z, k * (y + .4), Oz + k * x];\n    W_.port = { i, k, Ox, Oz, s2r, cen: xf([Ox + 10, 0, Oz]).normalize(), band: [45 * K, 75 * K] };\n",
  "    const i = PORT_I, s = S[i], sea = FOCUS_T === 'harbor', k = sea ? .25 : .5, Ox = sea ? s.x + 16 : s.x, Oz = s.z;\n"
  "    if (s.t !== FOCUS_T) throw new Error(`world data: site ${i} is a ${s.t}, the pipeline a ${FOCUS_T}`);\n"
  "    const s2r = sea ? ([x, y, z]) => [Ox - k * z, k * (y + .4), Oz + k * x] : ([x, y, z]) => [Ox - k * z, s.lv + k * y, Oz + k * x];\n"
  "    W_.port = { i, k, Ox, Oz, s2r, cen: xf([sea ? Ox + 10 : Ox, 0, Oz]).normalize(), band: sea ? [45 * K, 75 * K] : [70 * K, 100 * K] };\n"
  "    // a village or farm stands on flat ground: inside its footprint (site x -150..150, z -100..150) the ground is the site's\n"
  "    if (!sea) return (x, z) => { const xs = (z - Oz) / k, zs = (Ox - x) / k, d = k * Math.hypot(Math.max(0, Math.abs(xs) - 150), Math.max(0, Math.abs(zs - 25) - 125)); return d >= 24 ? f(x, z) : lerp(s.lv, f(x, z), sm(0, 24, d)); };\n")
RIN('portR', "HF = harborHF; OBS.clear(); FEAT = 0; ZONE = 0;\n  const items = buildPort(), g",
  "HF = FOCUS_T === 'harbor' ? harborHF : () => 0; OBS.clear(); FEAT = 0; ZONE = 0;\n  const items = FOCUS_T === 'village' ? buildVillageW() : FOCUS_T === 'farm' ? buildFarmW() : buildPort(), g")
RIN('portR', "for (let xs = -240; xs <= 240; xs += 40) for (let zs = 10; zs <= 200; zs += 40)",
  "const FP = FOCUS_T === 'harbor' ? [-240, 240, 10, 200] : [-160, 160, -100, 160]; for (let xs = FP[0]; xs <= FP[1]; xs += 40) for (let zs = FP[2]; zs <= FP[3]; zs += 40)")
RIN('portR', "return P.s2r([0, 47, 9]);", "return P.s2r(FOCUS_T === 'harbor' ? [0, 47, 9] : [0, 24, 20]);")
R("RL2 = WORLD.port.s2r([0, 0, 35]); LD2 = Math.log(320 * WORLD.port.k * WORLD.K);",
  "RL2 = WORLD.port.s2r([0, 0, { harbor: 35, village: 10, farm: 30 }[FOCUS_T]]); LD2 = Math.log({ harbor: 320, village: 230, farm: 280 }[FOCUS_T] * WORLD.port.k * WORLD.K);")
R("function portR(s, st) {", r'''// A village pipeline up close (site units; the camera looks from -z): each task a workshop on the main street with its
// porch toward the street, the gate a town gate across the road in front, the forge and the rest of the village behind.
function buildVillageW() {
  const items = [], U = PORT_P.units, n = U.length, SP = Math.min(26, 130 / Math.max(1, n - 1)), G = PORT_P.gate;
  FEAT = 3; road([[-120, -16], [120, -16]], 5, { op: .7, center: true }); road([[0, -16], [0, -100]], 4, { op: .6 }); road([[0, -16], [0, 40], [-12, 90]], 3.2, { op: .55, n: 8 });
  U.forEach((u, k) => {
    const x = (k - (n - 1) / 2) * SP, c = COLOR[u.st], work = u.st === 'work';
    FEAT = 3; const m = house(x, 4, Math.PI, { w: Math.min(13, SP - 5), d: 8, h: 5, rh: 3.6, color: c, op: 1, chim: true });
    solid(BOX(8, .3, 4), { m, pos: [0, 4.2, 6], rot: [-.25, 0, 0], color: c, op: .9 }); for (const px of [-3.6, 3.6]) seg(m, [px, 0, 7.8], [px, 3.7, 7.8], c, .9);
    solid(BOX(4, .9, 1.4), { m, pos: [-1, .45, 6], color: c });
    FEAT = 1; if (work) { sparks(tp(m, [-1, 1.4, 6]), 40, 1.6); const w1 = tp(m, [-1, 0, 7.6]), w2 = tp(m, [1.8, 0, 6.6]); worker(w1[0], w1[2], 0, GOLD, 'work'); worker(w2[0], w2[2], 2, GOLD, 'work'); smoke(tp(m, [3.6, 9, 1]), 18, INK, 200, .4); crate(m, [2.8, .9, 6], [1.3, 1, 1], GOLD); }
    else crate(m, [2.5, 0, 6.5], [1.6, 1.2, 1.3], u.st === 'fail' ? c : INK);
    items.push({ name: u.label, st: u.st, chip: `${WORD[u.st]} · ${u.role}`, at: tp(m, [0, 10, 0]) });
  });
  FEAT = 3; { const z = -66; for (const [a, b] of [[-130, -9], [9, 130]]) solid(BOX(b - a, 6, 2.6), { pos: [(a + b) / 2, 3, z], op: .85 });
    for (const k of [-1, 1]) { solid(BOX(7, 14, 7), { pos: [k * 9.5, 7, z], color: LAB }); solid(new THREE.ConeGeometry(5.6, 6, 4), { pos: [k * 9.5, 17, z], rot: [0, Math.PI / 4, 0], color: LAB }); }
    solid(BOX(12, 4, 4), { pos: [0, 9, z], color: LAB }); if (G) items.push({ name: G.label, st: G.st, chip: `${WORD[G.st]} · gate`, at: [0, 13, z] }); }
  { const m = house(-44, 46, 0, { w: 22, d: 11, h: 7, rh: 5, chim: true, op: 1 }); for (let k = 0; k < 3; k++) crate(m, [6 + k * 2.2, 0, 7.5], [1.8, 1.4, 1.4], INK); }
  FEAT = 1; if (U.some(u => u.st === 'work')) for (const ph of [0, .5]) { const g = capture(() => { cart(0, 0, 0, GOLD, 1.3); worker(1.6, 2.2, 0); }); ANIM.movers.push(t => { const c = (t / 14 + ph) % 1, q = c < .5 ? sm(0, .45, c) : 1 - sm(.5, .95, c); g.position.set(lerp(-100, 100, ph ? 1 - q : q), 0, ph ? -14 : -18); g.rotation.y = (c < .5) === !ph ? 0 : Math.PI; }); }
  FEAT = 2; let nh = 0; for (let i = 0; i < 900 && nh < 44; i++) { const x = R(-140, 140), z = R(26, 130); if (Math.hypot(x, z - 50) > 110 || obsHit(x, z, 5)) continue; house(x, z, (rnd() < .5 ? 0 : Math.PI / 2) + R(-.15, .15), { w: R(6, 10), d: R(5, 7), h: R(3.5, 5.5), rh: R(2.4, 3.4), op: .78, chim: rnd() < .4 }); nh++; }
  let nt = 0; for (let i = 0; i < 4000 && nt < 160; i++) { const x = R(-150, 150), z = R(-100, 150); if (z < -72 ? Math.abs(x) < 12 : Math.hypot(x, z - 40) < 118 || z < 0) continue; if (obsHit(x, z, 3) || fbm(x / 40, z / 40, 3, 61) < .45) continue; tree(x, z, R(1.8, 2.6), rnd() < .5 ? 'c' : 'd', .7); nt++; }
  return items;
}
// A farm pipeline up close: each task a field (up to 3 per row) with a tractor on a working one and bales on the others,
// the farm track in front and a lane along their left edge, barn, farmhouse and the gate's grain elevator behind.
function buildFarmW() {
  const items = [], U = PORT_P.units, n = U.length, cols = Math.min(3, n), rows = Math.ceil(n / cols), w = 60, d = 34, G = PORT_P.gate, zb = rows * 46 + 22;
  FEAT = 3; const lane = -cols * 35 - 6; road([[-130, -32], [130, -32]], 4, { op: .65 }); road([[0, -32], [0, -100]], 3.4, { op: .55 }); road([[lane, -32], [lane, zb + 20]], 3, { op: .5 });
  U.forEach((u, k) => {
    const col = k % cols, row = Math.floor(k / cols), x = (col - (cols - 1) / 2) * 70, z = row * 46, work = u.st === 'work', c = COLOR[u.st];
    FEAT = 2; field(x, z, 0, w, d, c, work ? .6 : .38, work ? .55 : 1, INK);
    FEAT = 1; if (!work) for (let i = 0; i < 8; i++) solid(CYL(.85, .85, 1.5, 12), { pos: [x - 21 + (i % 4) * 14 + R(-2, 2), .9, z - 8 + Math.floor(i / 4) * 16 + R(-2, 2)], rot: [Math.PI / 2, R(0, 3), 0], op: .9, color: u.st === 'fail' ? c : INK });
    else { const tx = x - w / 2 + w * .55 + 2; tractor(tx, z, Math.PI / 2, GOLD, 1.5); smoke([tx + 1.8, 6, z], 8, INK, 80, .35); const dust = dots(GOLD, 1.6, .6); for (let i = 0; i < 120; i++) dust.push(tx - R(3, 8), R(0, 2.5), z + R(-8, 8)); }
    items.push({ name: u.label, st: u.st, chip: `${WORD[u.st]} · ${u.role}`, at: [x, 3, z] });
  });
  FEAT = 1; for (let r = 0; r < rows - 1; r++) for (let x = -104; x <= 104; x += 5) if (Math.abs(x) > 5) tree(x + R(-1, 1), r * 46 + 23 + R(-1, 1), R(1.1, 1.5), 'd', .7);
  FEAT = 3; { const m = house(-60, zb, 0, { w: 22, d: 13, h: 7, rh: 6, op: 1 }); pl(m, [[-4, 0, 6.52], [-4, 6, 6.52], [4, 6, 6.52], [4, 0, 6.52]], INK, .9); house(-88, zb + 6, .1, { w: 10, d: 7, h: 4.5, rh: 3, chim: true, op: .9 }); }
  { const x0 = 44; solid(BOX(8, 34, 8), { pos: [x0, 17, zb], color: LAB }); solid(BOX(10, 5, 10), { pos: [x0, 36.5, zb], color: LAB }); solid(prism(10.5, 2.5, 10.5), { pos: [x0, 39, zb], color: LAB });
    for (const k of [-1, 1]) { const sx = x0 + k * 11; solid(CYL(4, 4, 22, 16), { pos: [sx, 11, zb + 2], color: LAB }); solid(new THREE.ConeGeometry(4.2, 3, 16), { pos: [sx, 23.5, zb + 2], color: LAB }); seg(null, [x0, 34, zb], [sx, 24.5, zb + 2], LAB, .8); obsAdd(sx, zb + 2, 6); }
    obsAdd(x0, zb, 8); if (G) items.push({ name: G.label, st: G.st, chip: `${WORD[G.st]} · gate`, at: [x0, 40, zb] }); }
  FEAT = 2; let nt = 0; for (let i = 0; i < 4000 && nt < 160; i++) { const x = R(-150, 150), z = R(-100, 150); if (Math.abs(x) < 112 && z > -40 && z < zb + 16) continue; if (obsHit(x, z, 3) || fbm(x / 40, z / 40, 3, 71) < .45) continue; tree(x, z, R(1.8, 2.6), rnd() < .6 ? 'd' : 'c', .7); nt++; }
  return items;
}
function portR(s, st) {''')
open(p, 'w', encoding='utf-8', newline='\n').write(s); print('data patched', len(s))
