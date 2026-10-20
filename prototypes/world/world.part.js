
// =====================================================================================
// WORLD (view=world): one continuous world instead of separate scenes. The board region is draped onto the planet at
// the board's own spot (the planet's coastline there IS the region's coastline, its lights ARE the settlements), and one
// camera draws everything in one pass: no scene switch, no crossfade. Finer detail fades in where it stands, as soon
// as it is big enough on screen (lineMat / pointMat), the way a map gains detail while you zoom.
// =====================================================================================
const FOCAL = H / 2 / Math.tan(20 * D2R); // px per unit at distance 1 for the 40 deg camera
function makeWorld() {
  // BAND: region units from the board centre over which planet linework hands over to region linework
  const K = 1 / 80, RP = 100, RR = RP / K, BAND = [1250, 1600], TH = .52;
  const N = new THREE.Vector3(...sph(18, 2, 1)), NO = new THREE.Vector3(0, 1, 0).sub(N.clone().multiplyScalar(N.y)).normalize(), E = NO.clone().cross(N).normalize();
  // region (x east, y up, z south) -> planet: the tangent-plane point is pushed radially onto the sphere, height along the radius
  const xyz = (x, y, z) => { const dx = N.x * RR + E.x * x - NO.x * z, dy = N.y * RR + E.y * x - NO.y * z, dz = N.z * RR + E.z * x - NO.z * z, s = (RP + y * K) / Math.hypot(dx, dy, dz); return [dx * s, dy * s, dz * s]; };
  const xf = v => new THREE.Vector3(...xyz(v[0], v[1], v[2]));
  const toRegion = p => { const c = p.dot(N); return [RR * p.dot(E) / c, -RR * p.dot(NO) / c, c]; };
  const dist = (lat, lon) => { const p = new THREE.Vector3(...sph(lat, lon, 1)); return Math.acos(Math.min(1, p.dot(N))) * RR; };
  const shader = (head, body, frag) => ({ vertexShader: `${head}\n#include <fog_pars_vertex>\nvoid main(){\n${body}\n#include <fog_vertex>\n}`, fragmentShader: `uniform vec3 color; uniform float opacity; varying float vL;\n#include <fog_pars_fragment>\nvoid main(){ float a = opacity * vL${frag}; if (a < .002) discard; gl_FragColor = vec4(color, a);\n#include <colorspace_fragment>\n#include <fog_fragment>\n}` });
  // feat = feature size in region units; it is drawn once it spans px0..px1 pixels at its own distance (negative feat: the
  // reverse, used for the planet lights that give way to the buildings standing in the same place)
  const lod = `float dd = max(-mvPosition.z, 1e-4), fp = abs(feat) * focal / dd; vL = feat == 0. ? 1. : smoothstep(px0, px1, fp); if (feat < 0.) vL = 1. - vL;
  if (zone != 0.) { float r = acos(clamp(dot(normalize(position), cen), -1., 1.)) * 100., q = zb.y - zb.x; vL *= zone > 0. ? smoothstep(zb.x, zb.x + .6 * q, r) : 1. - smoothstep(zb.x + .4 * q, zb.y, r); }`; // the two fades overlap: a complementary pair left a darker ring
  // zone -2 = fine port detail: fades out around the port (W_.port) instead of around the board
  const uni = (color, op, feat, zone, extra = {}) => { const pz = zone === -2, zc = pz ? W_.port.cen : N, zbv = pz ? W_.port.band : [BAND[0] * K, BAND[1] * K];
    return THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { color: { value: new THREE.Color(color) }, opacity: { value: op }, feat: { value: feat * K }, focal: { value: FOCAL }, px0: { value: 2.5 }, px1: { value: 14 }, zone: { value: zone }, cen: { value: zc.clone() }, zb: { value: new THREE.Vector2(zbv[0], zbv[1]) }, ...extra }]); };
  const lineMat = (color, op, feat, zone) => new THREE.ShaderMaterial({ transparent: true, fog: true, uniforms: uni(color, op, feat, zone),
    ...shader('uniform float feat, focal, px0, px1, zone; uniform vec3 cen; uniform vec2 zb; varying float vL;', `vec4 mvPosition = modelViewMatrix * vec4(position, 1.); ${lod} gl_Position = projectionMatrix * mvPosition;`, '') });
  const pointMat = (color, size, op, feat, zone) => new THREE.ShaderMaterial({ transparent: true, fog: true, uniforms: uni(color, op, feat, zone, { size: { value: size * renderer.getPixelRatio() } }),
    ...shader('uniform float feat, focal, px0, px1, size, zone; uniform vec3 cen; uniform vec2 zb; varying float vL;', `vec4 mvPosition = modelViewMatrix * vec4(position, 1.); ${lod} gl_PointSize = size; gl_Position = projectionMatrix * mvPosition;`, '') });
  // outside its core the region's ground is the planet's own land, so coastlines and relief run on without a seam
  // coast(): the region's shoreline (land west of coastX) carried on across the planet and fading out far away, so the
  // planet around the board is the same coast instead of a circle where two unrelated maps meet
  const coast = (x, z, r) => Math.max(-110, Math.min(110, (coastX(z) - x) * .6)) * (1 - sm(1500, 3200, r));
  const planetH = (x, z) => { const p = new THREE.Vector3(...xyz(x, 0, z)); return (landF0(Math.asin(p.y / RP) / D2R, Math.atan2(p.x, p.z) / D2R) - TH) / .004 + coast(x, z, Math.hypot(x, z)); };
  const blendH = f => (x, z) => { const r = Math.hypot(x, z); return r < 950 ? f(x, z) : lerp(f(x, z), planetH(x, z), sm(950, 1250, r)); };
  // the working pipeline's port: the site model (site units, quay along x, sea at -z) scaled by k into the region at its
  // harbour (quay along the coast, sea to the east); inside its footprint the region's ground IS the site's ground
  const portHF = (f, S) => {
    const i = YSK.findIndex(r => r[0] === 'note-actions r1'), s = S[i], k = .25, Ox = s.x + 16, Oz = s.z;
    const s2r = ([x, y, z]) => [Ox - k * z, k * (y + .4), Oz + k * x];
    W_.port = { i, k, Ox, Oz, s2r, cen: xf([Ox + 10, 0, Oz]).normalize(), band: [45 * K, 75 * K] };
    return (x, z) => { const xs = (z - Oz) / k, zs = (Ox - x) / k, d = k * Math.hypot(Math.max(0, Math.abs(xs) - 240), Math.max(0, Math.abs(zs) - 200)); if (d >= 30) return f(x, z);
      const hs = harborHF(xs, zs), ys = hs >= -.4 ? k * (hs + .4) : lerp(0, -8, Math.min(1, (-.4 - hs) / 5.6)); return lerp(ys, f(x, z), sm(0, 30, d)); };
  };
  const W_ = { K, RP, RR, N, NO, E, TH, BAND, xyz, xf, toRegion, lineMat, pointMat, blendH, portHF, port: null, mapProj: false, locals: [],
    hole: (lat, lon, f = 1) => dist(lat, lon) < BAND[0] * f,
    // planet land value at the board comes from the region's own height field, blended to the planet's noise further out
    landF: (lat, lon, f0) => { const p = new THREE.Vector3(...sph(lat, lon, 1)), d = Math.acos(Math.min(1, p.dot(N))) * RR; if (d > 3300) return f0(lat, lon); const [x, z] = toRegion(p); return d > 1250 ? f0(lat, lon) + coast(x, z, d) * .004 : TH + W_.HF(x, z) * .004; } };
  return W_;
}
function mapToPlanet(o) { // in place: region-unit vertices -> planet coordinates
  const p = o.geometry.attributes.position, a = p.array;
  for (let i = 0; i < a.length; i += 3) { const v = WORLD.xyz(a[i], a[i + 1], a[i + 2]); a[i] = v[0]; a[i + 1] = v[1]; a[i + 2] = v[2]; }
  p.needsUpdate = true; o.geometry.computeBoundingSphere();
}
const WC = new THREE.PerspectiveCamera(40, W / H, 1, 9000);
// Camera: zoom 1 goes straight down from orbit onto the board, one log-distance glide (speed rises and falls smoothly),
// tilting to the region's oblique view in the lower part; look point and heading stay fixed. Zoom 2 (after the click) glides
// on down to the port while the look point pans and the heading turns, both spread over the first part of the zoom.
const ZW = { a: .8, b: 11.6, r1: 1.4, r2: 3.0 }, Z2W = { a: ZW.b + 2.2, b: ZW.b + 11.7, r1: 1.4, r2: 2.6, pan: 6.5 }, LD0 = Math.log(260), LDT = Math.log(60);
let RL1, RL2, LD1, LD2, WP1, WH1, WP2, WH2, TW = null;
const SW1 = t => glide(t, ZW.a, ZW.b, ZW.r1, ZW.r2) * (LD0 - LD1), SW2 = t => glide(t, Z2W.a, Z2W.b, Z2W.r1, Z2W.r2) * (LD1 - LD2);
function camPose(lookR, h, p, dist) { // look point in region units, heading / pitch in the local frame there, distance in planet units
  const L = WORLD.xf(lookR), U = L.clone().normalize(), E = WORLD.E.clone().addScaledVector(U, -WORLD.E.dot(U)).normalize(), S = E.clone().cross(U);
  const dir = E.clone().multiplyScalar(Math.cos(p) * Math.sin(h)).addScaledVector(U, Math.sin(p)).addScaledVector(S, Math.cos(p) * Math.cos(h));
  const up = E.clone().multiplyScalar(-Math.sin(p) * Math.sin(h)).addScaledVector(U, Math.cos(p)).addScaledVector(S, -Math.sin(p) * Math.cos(h));
  WC.position.copy(L).addScaledVector(dir, dist); WC.up.copy(up); WC.lookAt(L);
}
function worldCam(t) {
  let dist;
  if (t < Z2W.a) { const ld = LD0 - SW1(t); dist = Math.exp(ld); camPose(RL1, WH1, lerp(Math.PI / 2, WP1, se((LDT - ld) / (LDT - LD1))), dist); }
  else { dist = Math.exp(LD1 - SW2(t)); const u = se((t - Z2W.a) / Z2W.pan); camPose(RL1.map((v, i) => lerp(v, RL2[i], u)), lerp(WH1, WH2, u), lerp(WP1, WP2, u), dist); }
  // (low down the far plane follows the distance, which keeps depth precision for the port)
  // tight near / far planes: lines lie exactly on their fills, and with a far-to-near ratio in the thousands the depth test
  // hid parts of them (dim, shimmering rows); nothing comes closer than that fraction of the altitude
  // low down the near plane moves in (0.08 x altitude): hills near the port rise toward the camera and their trees were
  // cut by the plane at the bottom edge of the frame (measured as pops at 20 s)
  const alt = WC.position.length() - 100; WC.near = Math.max(.002, alt * lerp(.08, .3, sm(5, 20, alt))); WC.far = alt > 20 ? WC.position.length() + 3100 : dist * 4 + 40; WC.updateProjectionMatrix(); WC.updateMatrixWorld();
  return { dist, alt };
}
function frameW(t) {
  const { dist, alt } = worldCam(t); for (const m of ANIM.movers) m(t);
  // movers (carts in region units, cranes / trucks of the port in site units): position + heading -> planet frame at that
  // spot; a site mover is first taken into the region (scale k, turned a quarter to the left)
  for (const g of WORLD.locals) {
    const site = g.userData.site, pr = site ? WORLD.port.s2r([g.position.x, g.position.y, g.position.z]) : [g.position.x, g.position.y, g.position.z], sc = WORLD.K * (site ? WORLD.port.k : 1);
    const P = WORLD.xf(pr), U = P.clone().normalize(), e = WORLD.E.clone().addScaledVector(U, -WORLD.E.dot(U)).normalize(), s = e.clone().cross(U);
    g.matrix.makeBasis(e, U, s).multiply(new THREE.Matrix4().makeRotationY(g.rotation.y - (site ? Math.PI / 2 : 0))).scale(new THREE.Vector3(sc * g.scale.x, sc * g.scale.y, sc * g.scale.z)).setPosition(P); g.matrixWorldNeedsUpdate = true;
  }
  scene.fog.near = dist * .9 + 150 * WORLD.K; scene.fog.far = scene.fog.near + Math.max(1700 * WORLD.K, dist * 1.5);
  const d = WC.position.length(), n = WC.position.clone().normalize();
  for (const l of rimRings) { const r = l.userData.r; if (d <= r * 1.001) { l.visible = false; continue; } l.visible = true; l.position.copy(n).multiplyScalar(r * r / d); l.scale.setScalar(r * Math.sqrt(1 - (r / d) ** 2)); l.lookAt(WC.position); l.material.opacity = l.userData.o * sm(6, 40, alt); }
  renderer.setRenderTarget(null); renderer.render(scene, WC);
  const ph = t < TW.rIn0 - .3 ? 'planet' : t < TW.sIn0 - .3 ? 'region' : 'site';
  // SNAP holds markup produced by chrome()/placeLabels(); every data string in it already went through esc().
  if (ph !== curPh) { hud.innerHTML = SNAP[ph].hud; ov.innerHTML = SNAP[ph].ov; curPh = ph; }
  hud.style.opacity = ov.style.opacity = ph === 'planet' ? 1 - sm(TW.pOut0, TW.pOut1, t) : ph === 'region' ? sm(TW.rIn0, TW.rIn1, t) * (1 - sm(TW.rOut0, TW.rOut1, t)) : sm(TW.sIn0, TW.sIn1, t);
  // click: ring and chip glow ramp in (0.15 s / 0.3 s) instead of switching on in one frame
  const q = (t - TW.click) / .7; pickEl.style.display = ph === 'region' && q > 0 && q < 1 ? 'block' : 'none';
  if (pickEl.style.display === 'block') { const s = 12 + 60 * q; Object.assign(pickEl.style, { left: PICK[0] - s / 2 + 'px', top: PICK[1] - s / 2 + 'px', width: s + 'px', height: s + 'px', opacity: sm(0, .2, q) * (1 - q) }); }
  if (ph === 'region') { const tg = [...ov.querySelectorAll('.tg')].find(e => e.textContent.includes('note-actions r1')); if (tg) { const g = sm(TW.click, TW.click + .3, t); tg.querySelector('.chip').style.boxShadow = g > 0 ? `0 0 0 1px rgba(224,169,68,${g.toFixed(3)}), 0 0 16px rgba(224,169,68,${(.55 * g).toFixed(3)})` : ''; } }
}
function runWorld() {
  const t0 = performance.now(); ANIM = { movers: [] }; window.__measures = {}; WORLD = makeWorld();
  const reset = () => { LB = new Map(); PB = new Map(); FILLS = []; OBS.clear(); };
  // 1) region first, in its own units: its height field also shapes the planet's coastline at the board
  reset(); const rs = scene = new THREE.Scene(); buildRegion('mixed'); WORLD.HF = HF;
  SNAP.region = { hud: hud.innerHTML, ov: '' };
  // 2) drape it onto the planet, then build the planet around it in the same scene
  const ws = new THREE.Scene(); window.__worldScene = ws;
  for (const o of [...rs.children]) { if (o.userData.local) { o.matrixAutoUpdate = false; WORLD.locals.push(o); } else mapToPlanet(o); ws.add(o); }
  reset(); scene = ws; const pItems = buildPlanet(); scene.fog = new THREE.Fog(BG, 1, 2);
  // 3) the board's lights on the planet are its settlements: dots on each site, giving way to the buildings up close
  // reset first: flush() does not empty the batches, so without it the planet's lines were added a second time
  reset(); { FEAT = -6; const S = WORLD.S; seed = 41; S.forEach((s, i) => { const st = WORLD.items[i].st, dI = dots(INK, 2, .9), dC = dots(COLOR[st], 2.4, 1); for (let k = 0; k < 45; k++) { const a = rnd() * 6.283, r = s.r * 1.5 * Math.sqrt(rnd()), x = s.x + Math.cos(a) * r, z = s.z + Math.sin(a) * r; (k % 4 === 0 ? dC : dI).push(...WORLD.xyz(x, Math.max(1, HF(x, z)) + 2, z)); } }); flush(ws); FEAT = 0; }
  // region view: look point, distance, pitch, heading. Port view: from the sea side, 37.6 deg up, look point just inland
  // of the quay, so the four berths fill the frame and open sea takes only the bottom third (from the land side the
  // camera skimmed a hill that filled the bottom of the frame; looking at the quay across the water left half the frame empty)
  RL1 = [100, 0, -50]; const rd = new THREE.Vector3(10, 430, 660); LD1 = Math.log(rd.length() * WORLD.K); WP1 = Math.asin(rd.y / rd.length()); WH1 = Math.atan2(rd.x, rd.z);
  RL2 = WORLD.port.s2r([0, 0, 35]); LD2 = Math.log(320 * WORLD.port.k * WORLD.K); WP2 = Math.atan2(200, 260); WH2 = 70 * D2R;
  TW = { pOut0: .8, pOut1: 1.3, rIn0: ZW.b, rIn1: ZW.b + .5, click: ZW.b + 1.5, rOut0: Z2W.a, rOut1: Z2W.a + .4, sIn0: Z2W.b, sIn1: Z2W.b + .5, end: Z2W.b + 3.2 };
  const tAt = d => solveT(SW1, LD0 - Math.log(d), ZW.a, ZW.b); // time at which the camera is d units from the look point
  window.__phases = [['orbit', 0, tAt(60)], ['descent', tAt(60), tAt(20)], ['region settles', tAt(20), ZW.b], ['region hold+click', ZW.b, Z2W.a], ['fly to port', Z2W.a, Z2W.a + Z2W.pan], ['port descent', Z2W.a + Z2W.pan, Z2W.b], ['port hold', Z2W.b, TW.end]].map(([n, a, b]) => [n, +a.toFixed(3), +b.toFixed(3)]);
  // HUD snapshots: planet labels with the opening camera, region labels with the closing camera (positions mapped)
  worldCam(0); CAM = WC; placeLabels(pItems, []);
  chrome({ tab: 'All boards · 3 need you', tabCol: '#ec6a84', ticks: { label: '4/7 boards clear', list: BOARDS.map(b => b.st) }, tl: [['Boards', '7'], ['Tasks', '137'], ['Spent', '$218.66']], tr: [['Working', '02'], ['Needs you', '03'], ['Done', '129']], hint: 'Each <b>light is a board</b> · click one to fly down to it' });
  SNAP.planet = { hud: hud.innerHTML, ov: ov.innerHTML }; window.__measures.planet = measureHUD();
  worldCam(TW.click); WORLD.mapProj = true; hud.innerHTML = SNAP.region.hud; placeLabels(WORLD.items, WORLD.S.map(siteBox)); SNAP.region.ov = ov.innerHTML; window.__measures.region = measureHUD();
  window.__regionLabels = window.__labels;
  PICK = proj(WORLD.items.find(q => q.name === 'note-actions r1').at);
  worldCam(TW.end); chrome({ ...NA_CHROME, hint: 'Each <b>berth is a task</b> · cranes and trucks are the agents · click one for its log' }); columnLabels(WORLD.portItems, { top: 130 });
  SNAP.site = { hud: hud.innerHTML, ov: ov.innerHTML }; window.__measures.site = measureHUD(); WORLD.mapProj = false;
  // SNAP.region.hud is markup from chrome(); its data strings were escaped there. Fail loudly if a HUD snapshot is missing
  // (a stray comment once cut the region labels off without any error).
  window.__dbgCam = [WC.position.toArray().map(v => +v.toFixed(3)), RL1, LD1, WH1, WP1];
  if (!window.__measures.planet || !window.__measures.region || !window.__measures.site || !SNAP.region.ov.includes('class="tg') || !SNAP.site.ov.includes('class="tg')) throw new Error('world view: HUD snapshot missing ' + JSON.stringify({ p: !!window.__measures.planet, r: !!window.__measures.region, s: !!window.__measures.site, rov: SNAP.region.ov.includes('class="tg'), sov: SNAP.site.ov.includes('class="tg'), sovLen: SNAP.site.ov.length, ports: (WORLD.portItems || []).length }));
  pickEl = document.createElement('div'); Object.assign(pickEl.style, { position: 'absolute', border: '1.5px solid #e0a944', borderRadius: '50%', pointerEvents: 'none', display: 'none', zIndex: 5 }); document.getElementById('stage').appendChild(pickEl);
  window.__seek = t => frameW(t); window.__T = TW;
  // debug handle for the measuring harnesses (camera state at any time t)
  window.__wdbg = { worldCam, WC, THREE };
  // Motion probe (same output shape as the descent one; the world has one camera, reported as "p").
  window.__motion = (a, b, dt = .01) => {
    const grid = []; for (let gy = 1; gy < 30; gy++) for (let gx = 1; gx < 40; gx++) grid.push(new THREE.Vector2(gx / 20 - 1, gy / 15 - 1));
    const rc = new THREE.Raycaster(), med = x => { const y = [...x].sort((u, v) => u - v); return y[y.length >> 1]; };
    const hit = ndc => { rc.setFromCamera(ndc, WC); const o = rc.ray.origin, d = rc.ray.direction, B = o.dot(d), c = o.lengthSq() - 1e4, q = B * B - c; if (q < 0) return null; const k = -B - Math.sqrt(q); return k > 0 ? o.clone().addScaledVector(d, k) : null; };
    const out = []; for (let t = a; t < b - 1e-9; t += dt) { worldCam(t); const pts = grid.map(g => [g, hit(g)]).filter(x => x[1]); let f = null;
      if (pts.length >= 6) { worldCam(t + dt); const v = pts.map(([g, p]) => { const q = p.clone().project(WC); return [(q.x - g.x) * W / 2, (g.y - q.y) * H / 2]; }); f = [+med(v.map(x => Math.hypot(...x))).toFixed(3), +med(v.map(x => x[0])).toFixed(2), +med(v.map(x => x[1])).toFixed(2), pts.length]; }
      out.push({ t: +t.toFixed(3), p: f, r: null, s: null, k1: 0, k2: 0 }); }
    return JSON.stringify(out);
  };
  window.__bench = () => { const gl = renderer.getContext(), out = {}; for (const [nm, a, b] of window.__phases) { const tt = (a + b) / 2; frameW(tt); gl.finish(); const s = performance.now(); for (let i = 0; i < 20; i++) frameW(tt + i * .002); gl.finish(); out[nm] = +((performance.now() - s) / 20).toFixed(1); } return out; };
  window.__ok = { view, ms: Math.round(performance.now() - t0), movers: ANIM.movers.length, locals: WORLD.locals.length };
  frameW(0); window.__ready = true;
  if (!new URLSearchParams(location.search).get('rec')) { const s0 = performance.now(); const loop = () => { frameW(((performance.now() - s0) / 1000) % TW.end); requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
}


// The working pipeline's port: the site model built in site units (same parts as buildHarborSite, clipped to the
// footprint the region gives it), then moved into the region with WORLD.port.s2r. Seen from the region it is the port
// on the coast; flying down, its berths, trucks and bollards come into view in place.
function buildPort() {
  const items = [];
  FEAT = 4; { const r = lines(INK, .9); r.push(-240, 2.25, 0, 240, 2.25, 0); }
  FEAT = .5; for (let x = -234; x < 240; x += 8) solid(CYL(.35, .45, .8, 8), { pos: [x, 2.6, 1] });
  { const t = lines(INK, .45); for (const z of [3, 4.4, 15, 16.4]) t.push(-240, 2.25, z, 240, 2.25, z); FEAT = .4; const u = lines(INK, .45); for (let x = -240; x < 240; x += 1.5) u.push(x, 2.25, 2.8, x, 2.25, 4.6, x, 2.25, 14.8, x, 2.25, 16.6); }
  FEAT = 3; { const m = fr(-118, 2.2, 52, 0); solid(BOX(60, 12, 22), { m, pos: [0, 6, 0], op: 1 }); for (let x = -27; x <= 27; x += 6) seg(m, [x, 0, 11.02], [x, 12, 11.02], INK, .4); solid(prism(61, 4, 23), { m, pos: [0, 12, 0] }); for (const x of [-18, 0, 18]) pl(m, [[x - 3.5, 0, 11.03], [x - 3.5, 7, 11.03], [x + 3.5, 7, 11.03], [x + 3.5, 0, 11.03]], INK, .9); items.push({ name: 'build', st: 'done', chip: 'done · builder', at: tp(m, [0, 17, 0]) }); }
  FEAT = 1.5; for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) { const hgt = 1 + Math.floor(rnd() * 3); for (let k = 0; k < hgt; k++) solid(BOX(12, 2.6, 2.5), { pos: [-80 + i * 13.5, 2.2 + 1.3 + k * 2.6, 30 + j * 3.2], op: .7 }); }
  const REV = [['security', 'done', -105], ['ux', 'work', -35], ['ui', 'work', 35], ['code', 'done', 105]];
  for (const [n, st, x] of REV) { const c = COLOR[st], work = st === 'work'; FEAT = 6; const at = stsCrane(x, 0, c, work); ship(fr(x, -.4, -18, 0), 62, 13, work ? .55 : 1, work ? GOLD : INK, .95); FEAT = 1; if (work) sparks(tp(fr(x, 0, -24, 0), [0, 12, 0]), 26, 2.2); items.push({ name: n, st, chip: `${WORD[st]} · review`, at }); }
  FEAT = 1; for (const [x0, x1, lane, ph, cg] of [[-78, -35, 6.5, 0, GOLD], [-70, 35, 12.5, .45, GOLD], [-60, 60, 9.5, .7, null]]) { const g = capture(() => truck(0, 0, 0, cg)); ANIM.movers.push(t => { const c = (t / 11 + ph) % 1, u = c < .5 ? sm(0, .45, c) : 1 - sm(.5, .95, c); g.position.set(lerp(x0, x1, u), 0, lane); g.rotation.y = c < .5 ? 0 : Math.PI; }); }
  truck(-140, 22, .1, INK); truck(100, 25, Math.PI, INK);
  FEAT = 4; { const bw = [[[-200, -10], [-120, -120], [-26, -175]], [[200, -10], [150, -120], [26, -175]]]; for (const P of bw) { for (let i = 0; i < P.length - 1; i++) { const [ax, az] = P[i], [bx, bz] = P[i + 1], L = Math.hypot(bx - ax, bz - az); solid(BOX(L, 4, 6), { pos: [(ax + bx) / 2, 0, (az + bz) / 2], rot: [0, -Math.atan2(bz - az, bx - ax), 0], op: .85 }); } }
    FEAT = 2; for (const k of [-1, 1]) { const x = k * 26, z = -175; solid(CYL(1.6, 2.6, 16, 10), { pos: [x, 10, z], color: LAB }); solid(CYL(2.6, 2.6, .6, 12), { pos: [x, 18.2, z], color: LAB }); solid(CYL(1.3, 1.3, 2.4, 8), { pos: [x, 19.7, z], color: LAB, fill: false }); solid(new THREE.ConeGeometry(1.7, 2, 8), { pos: [x, 21.9, z], color: LAB });
      solid(BOX(1.4, 9, 27), { pos: [k * 12.5, 2.5, z - 6], rot: [0, k * 1.2, 0], color: LAB }); }
    items.push({ name: 'gate', st: 'wait', chip: 'waiting · all 4 reviews', at: [0, 9, -180] }); }
  FEAT = 4; ship(fr(-20, -.4, -250, .3), 70, 13, 1, INK, .6); ship(fr(70, -.4, -80, -.4), 16, 5, 0, INK, .9);
  FEAT = 2; let n = 0; for (let i = 0; i < 800 && n < 90; i++) { const x = R(-230, 230), z = R(70, 170); if (HF(x, z) > 60) continue; house(x, z, R(-.2, .2) + (rnd() < .5 ? 0 : Math.PI / 2), { w: R(5, 9), d: R(5, 8), h: R(3.5, 8), rh: R(1.2, 2.8), op: .7 }); n++; }
  let nt = 0; for (let i = 0; i < 6000 && nt < 600; i++) { const x = R(-235, 235), z = R(-195, 195), h = HF(x, z); if (h < 4 || h > 300 || obsHit(x, z, 3)) continue; if (fbm(x / 50, z / 50, 3, 41) < .47) continue; tree(x, z, R(2, 3), 'c', .7); nt++; }
  ZONE = -2; FEAT = 1.5; waterHatch(2600, -240, 240, -200, 0, -.4, .28); ZONE = 0;
  return items;
}
function portR(s, st) {
  const P = WORLD.port, keep = [LB, PB, FILLS, HF, FEAT, ZONE], keepObs = new Map(OBS), n0 = scene.children.length;
  LB = new Map(); PB = new Map(); FILLS = []; HF = harborHF; OBS.clear(); FEAT = 0; ZONE = 0;
  const items = buildPort(), g = new THREE.Group(); flush(g);
  for (const o of [...g.children]) { const a = o.geometry.attributes.position.array; for (let i = 0; i < a.length; i += 3) { const v = P.s2r([a[i], a[i + 1], a[i + 2]]); a[i] = v[0]; a[i + 1] = v[1]; a[i + 2] = v[2]; } o.geometry.attributes.position.needsUpdate = true; scene.add(o); }
  for (const o of scene.children.slice(n0)) if (o.isGroup && o.userData.local) o.userData.site = true;
  [LB, PB, FILLS, HF, FEAT, ZONE] = keep; OBS.clear(); keepObs.forEach((v, k) => OBS.set(k, v));
  for (let xs = -240; xs <= 240; xs += 40) for (let zs = 10; zs <= 200; zs += 40) { const [x, , z] = P.s2r([xs, 0, zs]); obsAdd(x, z, 14); }
  WORLD.portItems = items.map(q => ({ ...q, at: P.s2r(q.at) }));
  return P.s2r([0, 47, 9]);
}
