"""Adds the continuous-world view (view=world) to planet.js: feature-size tags on line/dot batches (FEAT), level-of-detail
terrain rows, an island option for the region, a planet that leaves room for the draped region, and world.part.js before
the dispatcher. Static views are unchanged (FEAT is ignored unless WORLD is set). Every replacement must match once."""
p = 'planet.js'; s = open(p, encoding='utf-8').read()
def R(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:100]); s = s.replace(a, b)

R("let scene = new THREE.Scene(), ANIM = null;", "let scene = new THREE.Scene(), ANIM = null, WORLD = null, FEAT = 0, ZONE = 0; // world view: FEAT = feature size of what is drawn (LOD), ZONE = planet (+1) / region (-1) side of the hand-over band")
R("const k = color + '|' + op; if (!LB.has(k)) LB.set(k, { color, op, a: [] });", "const k = color + '|' + op + '|' + FEAT + '|' + ZONE; if (!LB.has(k)) LB.set(k, { color, op, feat: FEAT, zone: ZONE, a: [] });")
R("const k = color + '|' + size + '|' + op; if (!PB.has(k)) PB.set(k, { color, size, op, a: [] });", "const k = color + '|' + size + '|' + op + '|' + FEAT + '|' + ZONE; if (!PB.has(k)) PB.set(k, { color, size, op, feat: FEAT, zone: ZONE, a: [] });")
R("for (const { color, op, a } of LB.values()) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); target.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color, transparent: op < 1, opacity: op })));",
  "for (const { color, op, feat, zone, a } of LB.values()) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); target.add(new THREE.LineSegments(g, WORLD && (feat || zone) ? WORLD.lineMat(color, op, feat, zone) : new THREE.LineBasicMaterial({ color, transparent: op < 1, opacity: op })));")
R("for (const { color, size, op, a } of PB.values()) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); target.add(new THREE.Points(g, new THREE.PointsMaterial({ color, size, sizeAttenuation: false, transparent: true, opacity: op }))); }",
  "for (const { color, size, op, feat, zone, a } of PB.values()) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); target.add(new THREE.Points(g, WORLD && (feat || zone) ? WORLD.pointMat(color, size, op, feat, zone) : new THREE.PointsMaterial({ color, size, sizeAttenuation: false, transparent: true, opacity: op }))); }")
# terrain: in the world view every row / column goes to a batch tagged with the spacing of its level (rows on multiples of
# 5*2^l), so coarse rows show from orbit and finer ones fade in as they get far enough apart on screen
R("  const L1 = lines(INK, op), L2 = lines(INK, colOp), P = (arr, k) => arr.push(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]);",
  "  const L1 = lines(INK, op), L2 = lines(INK, colOp), P = (arr, k) => arr.push(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]);\n  const lv = (v, o, dflt) => { if (!WORLD) return dflt; let q = Math.round((v + 4000) / 5), l = 0; while (l < 6 && q % 2 === 0) { q /= 2; l++; } const keep = FEAT; FEAT = l >= 4 ? 0 : 5 * 2 ** l; const a = lines(INK, o); FEAT = keep; return a; }; // rows 80+ apart always show, like the planet's own rows")
R("  for (let j = 0; j <= nz; j += rowK) for (let i = 0; i < nx; i++) { const a = j * (nx + 1) + i; if (hh[a] < water && hh[a + 1] < water) continue; if (Math.abs(hh[a + 1] - hh[a]) > step * rowSteep) continue; if (inHole(x0 + (i + .5) * step, z0 + j * step)) continue; P(L1, a); P(L1, a + 1); }",
  "  for (let j = 0; j <= nz; j += rowK) { const A = lv(z0 + j * step, op, L1); for (let i = 0; i < nx; i++) { const a = j * (nx + 1) + i; if (hh[a] < water && hh[a + 1] < water) continue; if (Math.abs(hh[a + 1] - hh[a]) > step * rowSteep) continue; if (inHole(x0 + (i + .5) * step, z0 + j * step)) continue; P(A, a); P(A, a + 1); } }")
R("  for (let i = 0; i <= nx; i += colK) for (let j = 0; j < nz; j++) { const a = j * (nx + 1) + i, b = a + nx + 1; if (hh[a] < water && hh[b] < water) continue; if (Math.abs(hh[b] - hh[a]) > step * colSteep) continue; if (inHole(x0 + i * step, z0 + (j + .5) * step)) continue; P(L2, a); P(L2, b); }",
  "  for (let i = 0; i <= nx; i += colK) { const A = lv(x0 + i * step, colOp, L2); for (let j = 0; j < nz; j++) { const a = j * (nx + 1) + i, b = a + nx + 1; if (hh[a] < water && hh[b] < water) continue; if (Math.abs(hh[b] - hh[a]) > step * colSteep) continue; if (inHole(x0 + i * step, z0 + (j + .5) * step)) continue; P(A, a); P(A, b); } }")
R("function contour(lvs, { x0, x1, z0, z1, step, color = INK, op = .8, dy = .06, f = HF }) {", "function contour(lvs, { x0, x1, z0, z1, step, color = INK, op = .8, dy = .06, f = HF, hole = null }) {")
R("    const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => [x0 + a * step, z0 + b * step, raw[b * (nx + 1) + a] - lv]), p = [];",
  "    if (hole) { const cx = x0 + (i + .5) * step, cz = z0 + (j + .5) * step; if (cx > hole[0] && cx < hole[1] && cz > hole[2] && cz < hole[3]) continue; }\n    const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => [x0 + a * step, z0 + b * step, raw[b * (nx + 1) + a] - lv]), p = [];")
R("const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0); g.rotateX", "const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0, WORLD ? 80 : 1, WORLD ? 80 : 1); g.rotateX") # tessellated so it can bend onto the sphere
R("const proj = v => { const p = new THREE.Vector3(...v).project(CAM);", "const proj = v => { const p = new THREE.Vector3(...(WORLD && WORLD.mapProj ? WORLD.xyz(...v) : v)).project(CAM);")
# region
R("const { f, S } = regionHF(kind); HF = f;", "const { f, S } = regionHF(kind); HF = WORLD ? WORLD.blendH(f) : f; ZONE = WORLD ? -1 : 0;")
R("  contour([40, 70, 100,", "  if (WORLD) contour(0, { x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 10, op: .9, hole: [-760, 700, -700, 560] }); // shore out to the hand-over band\n  FEAT = WORLD ? 40 : 0; contour([40, 70, 100,")
R("  waterHatch(9000,", "  FEAT = WORLD ? 6 : 0; waterHatch(9000,")
R("  { const d = dots(INK, 1.3, .5); for (let i = 0; i < 700; i++)", "  if (!WORLD) { const d = dots(INK, 1.3, .5); for (let i = 0; i < 700; i++)")
R("  const RD = [];", "  FEAT = 0; const RD = [];")
R("  const items = S.map((s, i) =>", "  FEAT = WORLD ? 6 : 0; const items = S.map((s, i) =>")
R("  for (let i = 0; i < (kind === 'farm' ? 320 : 240); i++)", "  FEAT = WORLD ? 15 : 0; for (let i = 0; i < (kind === 'farm' ? 320 : 240); i++)")
R("  let nt = 0; for (let i = 0; i < 110000", "  FEAT = WORLD ? 8 : 0; let nt = 0; for (let i = 0; i < 110000")
R("  const wi = LIST.findIndex(", "  FEAT = WORLD ? 6 : 0; const wi = LIST.findIndex(")
R("  const segs = flush();\n  renderer.render(scene, CAM);\n  placeLabels(items, S.map(siteBox)); window.__regionItems = items;",
  "  FEAT = 0; ZONE = 0; const segs = flush();\n  if (WORLD) { WORLD.items = items; WORLD.S = S; } else { renderer.render(scene, CAM); placeLabels(items, S.map(siteBox)); } window.__regionItems = items;")
R("const g = new THREE.Group(); flush(g); [LB, PB, FILLS, HF] = keep;", "const g = new THREE.Group(); g.userData.local = true; flush(g); [LB, PB, FILLS, HF] = keep;")
# planet: room for the draped region (no own detail inside its circle), land value there taken from the region
R("function landF(lat, lon) { let v = ", "function landF(lat, lon) { return WORLD ? WORLD.landF(lat, lon, landF0) : landF0(lat, lon); }\nfunction landF0(lat, lon) { let v = ")
R("    if (skip && inDetail(box[0] + (j + .5) * s, box[2] + (i + .5) * s)) continue;", "    if (skip && inDetail(box[0] + (j + .5) * s, box[2] + (i + .5) * s)) continue;\n    if (WORLD && WORLD.hole(box[0] + (j + .5) * s, box[2] + (i + .5) * s)) continue;")
R("for (let lat = -75; lat <= 75; lat += 15) for (let lon = -180; lon < 180; lon += 2) g.push(", "for (let lat = -75; lat <= 75; lat += 15) for (let lon = -180; lon < 180; lon += 2) if (!WORLD || !WORLD.hole(lat, lon + 1)) g.push(")
R("for (let lat = -88; lat < 88; lat += 2) g.push(", "for (let lat = -88; lat < 88; lat += 2) if (!WORLD || !WORLD.hole(lat + 1, lon)) g.push(")
R("if (landF(lat, lon + st / 2) > TH) Lh.push(", "if (landF(lat, lon + st / 2) > TH) (WORLD && WORLD.hole(lat, lon + st / 2) ? [] : Lh).push(")
R("  DETAIL_G = capture(() => {", "  if (!WORLD) DETAIL_G = capture(() => {")
R("  DETAIL_G.children.forEach(c =>", "  if (DETAIL_G) DETAIL_G.children.forEach(c =>")
R("    const c = COLOR[b.st], rr = 1.2 + Math.sqrt(b.n) * .45, pts = [],", "    if (WORLD && b.name === 'You Should Know') { items.push({ name: b.name, st: b.st, chip: b.chip, at: sph(b.lat, b.lon, 100.3) }); continue; } // its lights are the draped settlements\n    const c = COLOR[b.st], rr = 1.2 + Math.sqrt(b.n) * .45, pts = [],")
R("cp.push(...sph(la, lo, 103.6 + R(-.7, .7))); }", "if (!WORLD || !WORLD.hole(la, lo, 1.25)) cp.push(...sph(la, lo, 103.6 + R(-.7, .7))); }")

# world view: the far terrain reaches the hand-over band on every side, its solid fill stops in the band's middle (beyond
# it the planet's linework must stay visible), near and far grids share one column lattice and line strength
R("  terrain({ x0: -760, x1: 520, z0: -700, z1: 560, step: 2.5, rowK: 2, colK: 6, op: .3, colOp: .1, water: -.3, colSteep: .7, rowSteep: 3 });\n  terrain({ x0: -1600, x1: 1600, z0: -1900, z1: 1400, step: 10, rowK: 1, colK: 4, op: .36, colOp: .07, hole: [-760, 520, -700, 560], water: -.3, colSteep: .5, rowSteep: 2.2 });",
  "  terrain({ x0: -760, x1: 520, z0: -700, z1: 560, step: 2.5, rowK: 2, colK: WORLD ? 8 : 6, op: WORLD ? .5 : .3, colOp: .1, water: -.3, colSteep: .7, rowSteep: 3 });\n  if (WORLD) terrain({ x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 5, rowK: 1, colK: 4, op: .5, colOp: .1, hole: [-760, 520, -700, 560], water: -.3, colSteep: .7, rowSteep: 3, fillR: 1430 });\n  else terrain({ x0: -1600, x1: 1600, z0: -1900, z1: 1400, step: 10, rowK: 1, colK: 4, op: .36, colOp: .07, hole: [-760, 520, -700, 560], water: -.3, colSteep: .5, rowSteep: 2.2 });")
R("function terrain({ x0, x1, z0, z1, step, rowK = 1, colK = 2, op = .42, colOp = .2, hole = null, water = -1e9, colSteep = 1e9, rowSteep = 1e9 }) {", "function terrain({ x0, x1, z0, z1, step, rowK = 1, colK = 2, op = .42, colOp = .2, hole = null, water = -1e9, colSteep = 1e9, rowSteep = 1e9, fillR = 1e9 }) {")
R("if (inHole(x0 + (i + .5) * step, z0 + (j + .5) * step)) continue; const a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1; idx.push(a, c, b, b, c, d); }",
  "if (inHole(x0 + (i + .5) * step, z0 + (j + .5) * step) || Math.hypot(x0 + (i + .5) * step, z0 + (j + .5) * step) > fillR) continue; const a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1; idx.push(a, c, b, b, c, d); }")
R("  waterPlane(-1600, 1600, -1900, 1500, 0);", "  if (WORLD) { const g = new THREE.RingGeometry(0, 1430, 160, 60); g.rotateX(-Math.PI / 2); scene.add(new THREE.Mesh(g, fillMat)); } else waterPlane(-1600, 1600, -1900, 1500, 0);")
R("  seed = 23; scene.fog = null; const TH = .52;", "  seed = 23; scene.fog = null; const TH = .52; ZONE = WORLD ? 1 : 0;")
R("  { const d = dots(INK, 1.3, .55); for (let i = 0; i < 1500; i++) d.push(...sph(R(-85, 85), R(-180, 180), 3000)); }", "  ZONE = 0; { const d = dots(INK, 1.3, .55); for (let i = 0; i < 1500; i++) d.push(...sph(R(-85, 85), R(-180, 180), 3000)); }")

R("for (let i = 0; i < (kind === 'farm' ? 320 : 240); i++) { const x = R(-700, 300), z = R(-200, 540), h = HF(x, z);",
  "for (let i = 0; i < (WORLD ? 900 : kind === 'farm' ? 320 : 240); i++) { const x = WORLD ? R(-1250, 1250) : R(-700, 300), z = WORLD ? R(-1250, 1250) : R(-200, 540), h = HF(x, z); if (WORLD && rnd() < sm(950, 1250, Math.hypot(x, z))) continue;")
R("for (let i = 0; i < 110000 && nt < 6500; i++) { const x = R(-740, 500), z = R(-680, 540), h = HF(x, z);",
  "for (let i = 0; i < (WORLD ? 420000 : 110000) && nt < (WORLD ? 24000 : 6500); i++) { const x = WORLD ? R(-1250, 1250) : R(-740, 500), z = WORLD ? R(-1250, 1250) : R(-680, 540), h = HF(x, z); if (WORLD && rnd() < sm(950, 1250, Math.hypot(x, z))) continue;")
R("contour([40, 70, 100, 130, 160, 190, 220, 250, 280], { x0: -760, x1: 520, z0: -700, z1: 560, step: 4, op: .42, dy: .3 });",
  "contour([40, 70, 100, 130, 160, 190, 220, 250, 280], { x0: -760, x1: 520, z0: -700, z1: 560, step: 4, op: .42, dy: .3 });\n  if (WORLD) { contour([40, 70, 100, 130, 160, 190, 220, 250, 280], { x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 8, op: .42, dy: .3, hole: [-760, 520, -700, 560] }); FEAT = 0; contour(-1.6, { x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 10, op: .28, hole: [-760, 700, -700, 560] }); }")
R("  FEAT = WORLD ? 6 : 0; waterHatch(9000, -760, 900, -700, 560, 0, .26, (x, z) => .15 + .85 * sm(-560, 300, z));",
  "  FEAT = WORLD ? 6 : 0; if (WORLD) waterHatch(30000, -1600, 1600, -1600, 1600, 0, .26, (x, z) => .5 * (1 - sm(1250, 1600, Math.hypot(x, z)))); else waterHatch(9000, -760, 900, -700, 560, 0, .26, (x, z) => .15 + .85 * sm(-560, 300, z));")

# world view: the planet carries the same relief contours as the region (every 30 height units from 40), so the board's
# surroundings are as detailed as the board and no brighter disc shows around it from orbit
R("sphContour([TH], INK, .95, 100.08); sphContour([TH + .06, TH + .12, TH + .18, TH + .24], INK, .42, 100.07);",
  "sphContour([TH], INK, .95, 100.08); sphContour([TH + .06, TH + .12, TH + .18, TH + .24], INK, .42, 100.07);\n  if (WORLD) sphContour([40, 70, 100, 130, 160, 190, 220, 250, 280].map(h => TH + h * .004), INK, .42, 100.09, [-80, 80, -150, 150], .3);")

# world view: planet land rows get finer in-between rows (half and quarter of the 0.7 deg spacing) that fade in with zoom,
# following the same on-screen spacing rule as the region's rows, so the board area is not denser than its surroundings
R("  sphContour([TH], INK, .95, 100.08);", "  if (WORLD) for (const [off, f] of [[.5, 49], [.25, 24.5], [.75, 24.5]]) { FEAT = f; const L = lines(INK, .34); for (let j = 0; j * st < 156; j++) { const lat = -78 + (j + off) * st; for (let lon = -150; lon < 150; lon += st) if (landF(lat, lon + st / 2) > TH && !WORLD.hole(lat, lon + st / 2)) L.push(...sph(lat, lon, 100.05), ...sph(lat, lon + st, 100.05)); } FEAT = 0; }\n  sphContour([TH], INK, .95, 100.08);")

# stage 2: harbour height field as one shared function (site view and the port inside the world view)
_i = s.index("  HF = (x, z) => { let h; if (z > 0)"); _j = s.index("\n", _i); _line = s[_i:_j]
R(_line, "  HF = harborHF;")
R("function buildHarborSite() {", "function harborHF(x, z) " + _line[len("  HF = (x, z) => "):-1] + "\nfunction buildHarborSite() {")
# terrain(): optional fill / columns, skipped rows, level-of-detail unit for the rows
R("rowSteep = 1e9, fillR = 1e9 }) {", "rowSteep = 1e9, fillR = 1e9, fill = true, cols = true, rowSkip = null, lodUnit = 5 }) {")
R("g.setIndex(idx); scene.add(new THREE.Mesh(g, fillMat));", "g.setIndex(idx); if (fill) scene.add(new THREE.Mesh(g, fillMat));")
R("let q = Math.round((v + 4000) / 5), l = 0; while (l < 6 && q % 2 === 0) { q /= 2; l++; } const keep = FEAT; FEAT = l >= 4 ? 0 : 5 * 2 ** l;",
  "let q = Math.round((v + 4000) / lodUnit), l = 0; while (l < 8 && q % 2 === 0) { q /= 2; l++; } const keep = FEAT; FEAT = lodUnit * 2 ** l >= 80 ? 0 : lodUnit * 2 ** l;")
R("  for (let j = 0; j <= nz; j += rowK) { const A = lv(z0 + j * step, op, L1);", "  for (let j = 0; j <= nz; j += rowK) { if (rowSkip && rowSkip(z0 + j * step)) continue; const A = lv(z0 + j * step, op, L1);")
R("  for (let i = 0; i <= nx; i += colK) { const A = lv(x0 + i * step, colOp, L2);", "  for (let i = 0; cols && i <= nx; i += colK) { const A = lv(x0 + i * step, colOp, L2);")
# movers (captured groups) are positioned by matrix: the board / port zone fade must not use their local coordinates
R("HF = () => 0; fn(); const g = new THREE.Group(); g.userData.local = true; flush(g); [LB, PB, FILLS, HF] = keep;",
  "HF = () => 0; const keepZ = ZONE; ZONE = 0; fn(); const g = new THREE.Group(); g.userData.local = true; flush(g); [LB, PB, FILLS, HF] = keep; ZONE = keepZ;")
# region: port ground inside the region's height field, the port model in place of the generic harbour, finer rows there
R("HF = WORLD ? WORLD.blendH(f) : f;", "HF = WORLD ? WORLD.blendH(WORLD.portHF(f, S)) : f;")
R("const at = s.t === 'village' ? villageR(s, st) :", "const at = WORLD && i === WORLD.port.i ? portR(s, st) : s.t === 'village' ? villageR(s, st) :")
R("  if (WORLD) { const g = new THREE.RingGeometry(0, 1430", "  if (WORLD) { const P = WORLD.port, x0 = Math.round((P.Ox - 80) / 5) * 5, z0 = Math.round((P.Oz - 80) / 5) * 5; ZONE = -2; terrain({ x0, x1: x0 + 160, z0, z1: z0 + 160, step: 1.25, rowK: 1, op: .5, colOp: .1, water: -.3, rowSteep: 3, fill: false, cols: false, rowSkip: v => Math.abs(v / 5 - Math.round(v / 5)) < 1e-6, lodUnit: 1.25 }); ZONE = -1; }\n  if (WORLD) { const g = new THREE.RingGeometry(0, 1430")

# world view: cloud sprites smaller than a few pixels fade out instead of shimmering (sub-pixel points flickered in the
# 100 fps test while the camera descended through the banks)
R("vA = smoothstep(f0, f1, d); gl_PointSize = min(size * scale / max(d, .001), maxPx);",
  "float px = size * scale / max(d, .001); vA = smoothstep(f0, f1, d) * smoothstep(minPx, minPx * 2.5 + 1e-4, px); gl_PointSize = min(px, maxPx);")
R("vertexShader: `uniform float size, scale, f0, f1, maxPx;", "vertexShader: `uniform float size, scale, f0, f1, maxPx, minPx;")
R("maxPx: { value: MAXPX * pr } },", "maxPx: { value: MAXPX * pr }, minPx: { value: WORLD ? 2 * pr : 0 } },")

# world view has no clouds (the user dropped them: the camera's pass through the banks read as a sudden change)
R("  { const cp = []; for (let i = 0; i < 260000; i++) { const la = R(-70, 70), lo = R(-120, 120)", "  if (!WORLD) { const cp = []; for (let i = 0; i < 260000; i++) { const la = R(-70, 70), lo = R(-120, 120)")

# labels whose object lies outside the frame (or under the bottom legend): the leader ends at the frame edge (dashed) with an arrow toward the object,
# instead of running off into empty space
R("  const pts = items.map(it => ({ ...it, p: proj(it.at) })), svg = []; let html = '';",
  "  const M = 14, pts = items.map(it => { const p0 = proj(it.at), off = p0[0] < M || p0[0] > W - M || p0[1] < M || p0[1] > H - 40; return { ...it, off, a0: p0, p: off ? [Math.min(W - M, Math.max(M, p0[0])), Math.min(H - 40, Math.max(M, p0[1]))] : p0 }; }), svg = []; let html = '';")
R("stroke=\"${HEX[s]}\" stroke-opacity=\".55\"/>`, `<rect x=\"${(q.p[0] - 3).toFixed(1)}\" y=\"${(q.p[1] - 3).toFixed(1)}\" width=\"6\" height=\"6\" fill=\"${HEX[s]}\"/>`);",
  "stroke=\"${HEX[s]}\" stroke-opacity=\".55\"${q.off ? ' stroke-dasharray=\"4 4\"' : ''}/>`, q.off ? `<path d=\"M0 -6 L5 3 L-5 3 Z\" fill=\"${HEX[s]}\" transform=\"translate(${q.p[0].toFixed(1)} ${q.p[1].toFixed(1)}) rotate(${(Math.atan2(q.a0[1] - q.p[1], q.a0[0] - q.p[0]) * 180 / Math.PI + 90).toFixed(1)})\"/>` : `<rect x=\"${(q.p[0] - 3).toFixed(1)}\" y=\"${(q.p[1] - 3).toFixed(1)}\" width=\"6\" height=\"6\" fill=\"${HEX[s]}\"/>`);")
R("if (KIND === 'descent') runDescent();", open('world.part.js', encoding='utf-8').read() + "if (KIND === 'world') runWorld();\nelse if (KIND === 'descent') runDescent();")
open(p, 'w', encoding='utf-8').write(s); print('patched', len(s))
