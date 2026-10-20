// Descent-to-the-planet sketches (three.js, dense hidden-line wireframe).
// Three options, two views each:  ?view=<village|harbor|farm>-<region|site>
//   region = one board seen from low orbit / high altitude; site = one pipeline seen from the ground.
// Board/pipeline names, counts and spend come from the real fixture; which pipeline/task is "working" is staged.
import * as THREE from 'three';
import { mergeGeometries } from './node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';

const W = 1180, H = 900, BG = 0x0b0b0c, INK = 0xece8de, GOLD = 0xe0a944, RED = 0xec6a84, LAB = 0xa3a096;
const view = new URLSearchParams(location.search).get('view') || 'village-region';
const [KIND, LEVEL] = view.split('-');
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(+(new URLSearchParams(location.search).get('pr') || 2)); renderer.setSize(W, H); renderer.setClearColor(BG);
document.getElementById('stage').appendChild(renderer.domElement);
let scene = new THREE.Scene(), ANIM = null;

// ---------- random + noise ----------
let seed = 17; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const R = (a, b) => a + (b - a) * rnd();
const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
function hash2(x, y, s) { let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 1442695041)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
function vn(x, y, s = 0) { const xi = Math.floor(x), yi = Math.floor(y), u = x - xi, v = y - yi, a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s), U = u * u * (3 - 2 * u), V = v * v * (3 - 2 * v); return a + (b - a) * U + (c - a) * V + (a - b - c + d) * U * V; }
function fbm(x, y, o = 4, s = 0) { let t = 0, a = .5, f = 1, n = 0; for (let i = 0; i < o; i++) { t += a * vn(x * f, y * f, s + i * 7); n += a; a *= .5; f *= 2.03; } return t / n; }
function ridged(x, y, o = 5, s = 9) { let t = 0, a = .5, f = 1, n = 0; for (let i = 0; i < o; i++) { t += a * (1 - Math.abs(2 * vn(x * f, y * f, s + i * 7) - 1)); n += a; a *= .5; f *= 2.1; } return t / n; }
function dSeg(px, pz, ax, az, bx, bz) { const dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / (dx * dx + dz * dz || 1))); return Math.hypot(px - ax - t * dx, pz - az - t * dz); }
function dPoly(x, z, P) { let m = 1e9; for (let i = 0; i < P.length - 1; i++) { const a = P[i], b = P[i + 1]; if (x < Math.min(a[0], b[0]) - m || x > Math.max(a[0], b[0]) + m || z < Math.min(a[1], b[1]) - m || z > Math.max(a[1], b[1]) + m) continue; m = Math.min(m, dSeg(x, z, a[0], a[1], b[0], b[1])); } return m; }
function catmull(P, n = 8) { const out = []; for (let i = 0; i < P.length - 1; i++) { const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)]; for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(c => .5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3))); } } out.push(P.at(-1)); return out; }

// ---------- batched hidden-line drawing ----------
const fillMat = new THREE.MeshBasicMaterial({ color: BG, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
let LB = new Map(), PB = new Map(), FILLS = [];
function lines(color = INK, op = .85) { op = Math.round(op * 100) / 100; const k = color + '|' + op; if (!LB.has(k)) LB.set(k, { color, op, a: [] }); return LB.get(k).a; }
function dots(color, size, op) { const k = color + '|' + size + '|' + op; if (!PB.has(k)) PB.set(k, { color, size, op, a: [] }); return PB.get(k).a; }
function fr(x, y, z, ry = 0, rx = 0, rz = 0) { return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(1, 1, 1)); }
const mul = (a, b) => a.clone().multiply(b);
const tp = (m, p) => { const v = new THREE.Vector3(p[0], p[1], p[2]); if (m) v.applyMatrix4(m); return [v.x, v.y, v.z]; };
function seg(m, a, b, color = INK, op = .85) { lines(color, op).push(...tp(m, a), ...tp(m, b)); }
function pl(m, pts, color = INK, op = .85) { const r = lines(color, op); for (let i = 0; i < pts.length - 1; i++) r.push(...tp(m, pts[i]), ...tp(m, pts[i + 1])); }
function solid(g, o = {}) {
  if (o.sc) g.scale(...(Array.isArray(o.sc) ? o.sc : [o.sc, o.sc, o.sc]));
  const p = o.pos || [0, 0, 0], r = o.rot || [0, 0, 0]; let m = fr(p[0], p[1], p[2], r[1], r[0], r[2]); if (o.m) m = mul(o.m, m); g.applyMatrix4(m);
  const e = new THREE.EdgesGeometry(g, o.thr ?? 25).attributes.position.array, arr = lines(o.color ?? INK, o.op ?? .9); for (let i = 0; i < e.length; i++) arr.push(e[i]);
  if (o.fill !== false) { const f = g.index ? g.toNonIndexed() : g, n = new THREE.BufferGeometry(); n.setAttribute('position', f.attributes.position); FILLS.push(n); }
  return g;
}
const BOX = (w, h, d) => new THREE.BoxGeometry(w, h, d), CYL = (a, b, h, s = 12, open = false) => new THREE.CylinderGeometry(a, b, h, s, 1, open);
function prism(L, h, Wd) { // gable roof: ridge along x, base at y=0
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute([-L / 2, 0, -Wd / 2, -L / 2, 0, Wd / 2, -L / 2, h, 0, L / 2, 0, -Wd / 2, L / 2, 0, Wd / 2, L / 2, h, 0], 3));
  g.setIndex([0, 1, 2, 3, 5, 4, 0, 2, 5, 0, 5, 3, 1, 4, 5, 1, 5, 2, 0, 3, 4, 0, 4, 1]); return g;
}
function flush(target = scene) {
  let n = 0;
  for (const { color, op, a } of LB.values()) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); target.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color, transparent: op < 1, opacity: op }))); n += a.length / 6; }
  for (const { color, size, op, a } of PB.values()) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(a, 3)); target.add(new THREE.Points(g, new THREE.PointsMaterial({ color, size, sizeAttenuation: false, transparent: true, opacity: op }))); }
  if (FILLS.length) target.add(new THREE.Mesh(mergeGeometries(FILLS, false), fillMat));
  return Math.round(n);
}

// ---------- terrain ----------
let HF = () => 0;
const OBS = new Map(), CELL = 12;
function obsAdd(x, z, r) { for (let i = Math.floor((x - r) / CELL); i <= Math.floor((x + r) / CELL); i++) for (let j = Math.floor((z - r) / CELL); j <= Math.floor((z + r) / CELL); j++) { const k = i + ',' + j; if (!OBS.has(k)) OBS.set(k, []); OBS.get(k).push([x, z, r]); } }
function obsHit(x, z, pad = 0) { const a = OBS.get(Math.floor(x / CELL) + ',' + Math.floor(z / CELL)); return !!a && a.some(([ox, oz, r]) => Math.hypot(x - ox, z - oz) < r + pad); }
function terrain({ x0, x1, z0, z1, step, rowK = 1, colK = 2, op = .42, colOp = .2, hole = null, water = -1e9, colSteep = 1e9, rowSteep = 1e9 }) {
  const nx = Math.round((x1 - x0) / step), nz = Math.round((z1 - z0) / step), pos = new Float32Array((nx + 1) * (nz + 1) * 3), hh = new Float32Array((nx + 1) * (nz + 1));
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) { const x = x0 + i * step, z = z0 + j * step, y = HF(x, z), k = j * (nx + 1) + i; hh[k] = y; pos[k * 3] = x; pos[k * 3 + 1] = y; pos[k * 3 + 2] = z; }
  const inHole = (x, z) => hole && x > hole[0] && x < hole[1] && z > hole[2] && z < hole[3], idx = [];
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) { if (inHole(x0 + (i + .5) * step, z0 + (j + .5) * step)) continue; const a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setIndex(idx); scene.add(new THREE.Mesh(g, fillMat));
  const L1 = lines(INK, op), L2 = lines(INK, colOp), P = (arr, k) => arr.push(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]);
  for (let j = 0; j <= nz; j += rowK) for (let i = 0; i < nx; i++) { const a = j * (nx + 1) + i; if (hh[a] < water && hh[a + 1] < water) continue; if (Math.abs(hh[a + 1] - hh[a]) > step * rowSteep) continue; if (inHole(x0 + (i + .5) * step, z0 + j * step)) continue; P(L1, a); P(L1, a + 1); }
  for (let i = 0; i <= nx; i += colK) for (let j = 0; j < nz; j++) { const a = j * (nx + 1) + i, b = a + nx + 1; if (hh[a] < water && hh[b] < water) continue; if (Math.abs(hh[b] - hh[a]) > step * colSteep) continue; if (inHole(x0 + i * step, z0 + (j + .5) * step)) continue; P(L2, a); P(L2, b); }
}
function contour(lvs, { x0, x1, z0, z1, step, color = INK, op = .8, dy = .06, f = HF }) {
  const nx = Math.round((x1 - x0) / step), nz = Math.round((z1 - z0) / step), raw = new Float32Array((nx + 1) * (nz + 1)), arr = lines(color, op);
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) raw[j * (nx + 1) + i] = f(x0 + i * step, z0 + j * step);
  for (const lv of [].concat(lvs)) for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => [x0 + a * step, z0 + b * step, raw[b * (nx + 1) + a] - lv]), p = [];
    for (let e = 0; e < 4; e++) { const A = c[e], B = c[(e + 1) % 4]; if ((A[2] < 0) !== (B[2] < 0)) { const t = A[2] / (A[2] - B[2]); p.push([A[0] + (B[0] - A[0]) * t, lv + dy, A[1] + (B[1] - A[1]) * t]); } }
    if (p.length >= 2) arr.push(...p[0], ...p[1]); if (p.length === 4) arr.push(...p[2], ...p[3]);
  }
}
function waterHatch(n, x0, x1, z0, z1, lv = 0, op = .3, fade = null) { const r = lines(INK, op); for (let i = 0; i < n; i++) { const x = R(x0, x1), z = R(z0, z1); if (fade && rnd() > fade(x, z)) continue; if (HF(x, z) > lv - 1) continue; const l = R(2, 9); r.push(x, lv + .02, z, x + l, lv + .02, z); } }
function waterPlane(x0, x1, z0, z1, lv = 0) { const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0); g.rotateX(-Math.PI / 2); g.translate((x0 + x1) / 2, lv, (z0 + z1) / 2); scene.add(new THREE.Mesh(g, fillMat)); }
function drape(P, { color = INK, op = .7, dy = .25, step = 2, minY = -1e9 } = {}) {
  const out = []; for (let i = 0; i < P.length - 1; i++) { const [ax, az] = P[i], [bx, bz] = P[i + 1], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / step)); for (let k = 0; k < n; k++) { const t = k / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t; out.push([x, Math.max(minY, HF(x, z)) + dy, z]); } }
  const l = P.at(-1); out.push([l[0], Math.max(minY, HF(l[0], l[1])) + dy, l[1]]); pl(null, out, color, op); return out;
}
function offsetPath(P, d) { return P.map((p, i) => { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1; return [p[0] - dz / l * d, p[1] + dx / l * d]; }); }
function road(P, w, o = {}) { const C = catmull(P, o.n ?? 10); for (const q of C) obsAdd(q[0], q[1], w / 2 + 2.5); drape(offsetPath(C, w / 2), o); drape(offsetPath(C, -w / 2), o); if (o.center) drape(C, { ...o, op: (o.op ?? .7) * .45 }); return C; }
function pathPoint(C, t) { let L = 0; const d = []; for (let i = 0; i < C.length - 1; i++) { d.push(Math.hypot(C[i + 1][0] - C[i][0], C[i + 1][1] - C[i][1])); L += d.at(-1); } let s = t * L; for (let i = 0; i < d.length; i++) { if (s <= d[i]) { const u = s / d[i]; return [C[i][0] + (C[i + 1][0] - C[i][0]) * u, C[i][1] + (C[i + 1][1] - C[i][1]) * u, Math.atan2(-(C[i + 1][1] - C[i][1]), C[i + 1][0] - C[i][0])]; } s -= d[i]; } const l = C.at(-1); return [l[0], l[1], 0]; }

// ---------- props ----------
function tree(x, z, s = 1, kind = 'c', op = .72) {
  const y = HF(x, z); if (kind === 'c') { solid(new THREE.ConeGeometry(1.5 * s, 3.4 * s, 6), { pos: [x, y + 2.5 * s, z], op, rot: [0, rnd() * 3, 0] }); solid(new THREE.ConeGeometry(1.05 * s, 2.6 * s, 6), { pos: [x, y + 4.2 * s, z], op, rot: [0, rnd() * 3, 0] }); seg(null, [x, y, z], [x, y + .9 * s, z], INK, op); }
  else { solid(new THREE.IcosahedronGeometry(1.8 * s, 0), { pos: [x, y + 3 * s, z], sc: [1, .85, 1], rot: [rnd() * 3, rnd() * 3, 0], op }); seg(null, [x, y, z], [x, y + 1.5 * s, z], INK, op); }
}
function house(x, z, ry, { w = 5, d = 4, h = 3, rh = 2, color = INK, op = .85, chim = false, win = true, y = null } = {}) {
  obsAdd(x, z, Math.hypot(w, d) / 2 + 1.5);
  const Y = y ?? HF(x, z) - .15, m = fr(x, Y, z, ry);
  solid(BOX(w, h, d), { m, pos: [0, h / 2, 0], color, op }); solid(prism(w + .5, rh, d + .6), { m, pos: [0, h, 0], color, op });
  if (win) { const fz = d / 2 + .02, ww = Math.min(.9, w * .12); for (let k = 0; k < Math.max(1, Math.floor(w / 2.4)); k++) { const cx = -w / 2 + 1.2 + k * 2.4; if (cx + ww > w / 2) break; const r = [[cx - ww / 2, h * .45, fz], [cx + ww / 2, h * .45, fz], [cx + ww / 2, h * .45 + ww * 1.1, fz], [cx - ww / 2, h * .45 + ww * 1.1, fz], [cx - ww / 2, h * .45, fz]]; pl(m, r, color, op * .7); } }
  if (chim) solid(BOX(w * .08 + .4, rh * .9, w * .08 + .4), { m, pos: [w * .28, h + rh * .7, d * .12], color, op });
  return m;
}
function crate(m, p, [w, h, d], c = INK, op = .9) { solid(BOX(w, h, d), { m, pos: [p[0], p[1] + h / 2, p[2]], color: c, op }); const z = p[2] + d / 2 + .02; seg(m, [p[0] - w / 2, p[1], z], [p[0] + w / 2, p[1] + h, z], c, op * .5); seg(m, [p[0] + w / 2, p[1], z], [p[0] - w / 2, p[1] + h, z], c, op * .5); }
function sparks(c, n = 34, s = 1.3) { const d = dots(GOLD, 2.2, 1); for (let i = 0; i < n; i++) { const v = new THREE.Vector3(R(-1, 1), R(-.1, 1), R(-1, 1)).normalize().multiplyScalar(R(.2, s)); d.push(c[0] + v.x, c[1] + v.y, c[2] + v.z); } for (let i = 0; i < 9; i++) { const v = new THREE.Vector3(R(-1, 1), R(0, 1), R(-1, 1)).normalize().multiplyScalar(s * 1.4); seg(null, c, [c[0] + v.x, c[1] + v.y, c[2] + v.z], GOLD, .9); } }
function smoke(c, hgt = 14, col = INK, n = 180, op = .4) { const d = dots(col, 1.8, op); for (let i = 0; i < n; i++) { const t = Math.pow(rnd(), .8), r = .3 + t * hgt * .16; d.push(c[0] + R(-r, r) + t * t * hgt * .5, c[1] + t * hgt, c[2] + R(-r, r)); } }
function truss(a, b, w, color = INK, op = .7) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), d = B.clone().sub(A), L = d.length(), m = new THREE.Matrix4().compose(A, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), d.normalize()), new THREE.Vector3(1, 1, 1));
  const c = [[-w / 2, -w / 2], [w / 2, -w / 2], [w / 2, w / 2], [-w / 2, w / 2]]; for (const [y, z] of c) seg(m, [0, y, z], [L, y, z], color, op);
  const n = Math.max(2, Math.round(L / w)); for (let i = 0; i < n; i++) { const x0 = i / n * L, x1 = (i + 1) / n * L; for (let k = 0; k < 4; k++) { const [y0, z0] = c[k], [y1, z1] = c[(k + 1) % 4]; seg(m, [x0, y0, z0], [x0, y1, z1], color, op * .8); seg(m, i % 2 ? [x0, y0, z0] : [x0, y1, z1], i % 2 ? [x1, y1, z1] : [x1, y0, z0], color, op * .6); } }
}
function worker(x, z, ry, color = INK, pose = 'stand') {
  const m = fr(x, HF(x, z), z, ry); solid(CYL(.3, .38, 1.05, 8), { m, pos: [0, 1.32, 0], color }); solid(new THREE.SphereGeometry(.25, 8, 5), { m, pos: [0, 2.1, 0], color });
  seg(m, [0, .8, -.14], [-.1, 0, -.2], color); seg(m, [0, .8, .14], [.15, 0, .2], color);
  if (pose === 'work') { seg(m, [0, 1.7, .25], [.55, 1.35, .3], color); seg(m, [.55, 1.35, .3], [.9, 1.75, .25], color); seg(m, [.9, 1.75, .25], [1.0, 1.25, .25], color); seg(m, [0, 1.7, -.25], [.6, 1.2, -.2], color); }
  else { seg(m, [0, 1.7, .32], [.05, .95, .38], color); seg(m, [0, 1.7, -.32], [.05, .95, -.38], color); }
}
function cart(x, z, ry, cargo = GOLD, s = 1) {
  const m = fr(x, HF(x, z), z, ry); solid(BOX(2.6 * s, .45 * s, 1.5 * s), { m, pos: [0, 1.05 * s, 0] }); for (const k of [-1, 1]) solid(CYL(.6 * s, .6 * s, .2 * s, 12), { m, pos: [-.3 * s, .6 * s, k * .85 * s], rot: [Math.PI / 2, 0, 0] });
  seg(m, [1.3 * s, 1.1 * s, .45 * s], [2.9 * s, .8 * s, .45 * s]); seg(m, [1.3 * s, 1.1 * s, -.45 * s], [2.9 * s, .8 * s, -.45 * s]); if (cargo) crate(m, [-.1 * s, 1.28 * s, 0], [1.5 * s, 1 * s, 1.05 * s], cargo); return m;
}

// ---------- HUD (DOM): every data string goes through esc(); hint strings are fixed literals ----------
const ov = document.getElementById('ov'), hud = document.getElementById('hud');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const WORD = { done: 'done', work: 'working', fail: 'needs you', wait: 'waiting' }, HEX = { done: '#ece8de', work: '#e0a944', fail: '#ec6a84', wait: '#a3a096' }, COLOR = { done: INK, work: GOLD, fail: RED, wait: LAB };
let CAM;
const proj = v => { const p = new THREE.Vector3(...v).project(CAM); return [(p.x + 1) / 2 * W, (1 - p.y) / 2 * H, p.z]; };
function chrome({ tab, back, ticks, tl, tr, hint, tabCol }) {
  let h = '';
  h += `<div class="tel l" style="left:20px;top:16px">${tl.map(([k, v]) => `<div><span class="k">${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>`;
  h += `<div class="tel r" style="right:20px;top:16px">${tr.map(([k, v]) => `<div><span class="k">${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</div>`;
  h += `<div class="tab" id="tab">${back ? `<span class="back">◂ ${esc(back)}</span>` : ''}<span>★ ${esc(tab)}</span></div>`;
  h += `<div class="ticks" id="ticks"><span class="n">${esc(ticks.label)}</span><span class="bar">${ticks.list.map(s => `<i class="${s === 'done' ? '' : s}"></i>`).join('')}</span></div>`;
  h += `<div class="legend"><span><i class="work"></i>Working</span><span><i></i>Done</span><span><i class="fail"></i>Needs you</span><span><i class="wait"></i>Waiting</span></div><div class="hint">${hint}</div>`;
  hud.innerHTML = h;
  const tb = document.getElementById('tab'), w = tb.offsetWidth;
  tb.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 ${w} 30" preserveAspectRatio="none"><path d="M.5 .5H${w - 16}L${w - .5} 15L${w - 16} 29.5H.5Z" fill="rgba(11,11,12,.9)" stroke="${tabCol}"/></svg>`);
  tb.style.left = (W / 2 - w / 2) + 'px'; document.getElementById('ticks').style.left = (W / 2 - w / 2) + 'px';
}
function columnLabels(items, { top = 120, bottom = H - 60, gap = 50, inset = 28 } = {}) {
  const pts = items.map(it => ({ ...it, p: proj(it.at) })), svg = []; let html = '';
  for (const side of ['l', 'r']) {
    const col = pts.filter(q => (q.side || (q.p[0] < W / 2 ? 'l' : 'r')) === side).sort((a, b) => a.p[1] - b.p[1]);
    let y = top; const ys = col.map(q => { const t = Math.max(y, Math.min(bottom - 44, q.p[1] - 30)); y = t + gap; return t; });
    for (let i = ys.length - 1; i >= 0; i--) { const lim = (i === ys.length - 1 ? bottom : ys[i + 1] - gap + 44) - 44; if (ys[i] > lim) ys[i] = lim; }
    col.forEach((q, i) => {
      const ly = ys[i], s = q.st, edge = side === 'l' ? inset : W - inset, ex = side === 'l' ? edge + 175 : edge - 175, yy = ly + 9;
      html += `<div class="tg ${side === 'r' ? 'r' : ''}" style="${side === 'l' ? `left:${edge}px` : `right:${inset}px`};top:${ly}px"><div class="n">${esc(q.name)}</div><span class="chip ${s === 'done' ? '' : s}"><i></i>${esc(q.chip)}</span></div>`;
      svg.push(`<path d="M${q.p[0].toFixed(1)} ${q.p[1].toFixed(1)} L${ex} ${yy} L${side === 'l' ? edge + 168 : edge - 168} ${yy}" fill="none" stroke="${HEX[s]}" stroke-opacity=".55"/>`, `<rect x="${(q.p[0] - 3).toFixed(1)}" y="${(q.p[1] - 3).toFixed(1)}" width="6" height="6" fill="${HEX[s]}"/>`);
      if (s === 'fail') html += `<div class="beacon" style="left:${q.p[0]}px;top:${q.p[1]}px"><i></i></div>`;
    });
  }
  ov.innerHTML = `<svg class="lead" width="${W}" height="${H}">${svg.join('')}</svg>` + html;
}

// ---------- data ----------
const PIPES = [['ui-polish-1140 r1', 'done', 'Done · 6/6'], ['deck T1', 'done', 'Done · 2/2'], ['needs-you T2+3', 'work', 'Working · 1'], ['deck T3', 'done', 'Done · 2/2'], ['deck flake', 'fail', 'Needs you · crashed'], ['deck T4', 'done', 'Done · 2/2']];
const TASKS = [['build', 'done', 'builder'], ['security', 'done', 'review'], ['ux', 'work', 'review'], ['ui', 'work', 'review'], ['code', 'done', 'review'], ['gate', 'wait', 'gate']];
const BOARD_CHROME = { tab: 'Hermes Approvals Ui · 1 needs you', tabCol: '#ec6a84', ticks: { label: '16/17 done', list: [...Array(16).fill('done'), 'fail'] }, tl: [['Pipelines', '6'], ['Tasks', '18'], ['Spent', '$46.16']], tr: [['Working', '01'], ['Needs you', '01'], ['Done', '16']] };
const NA_CHROME = { tab: 'note-actions r1', back: 'You Should Know', tabCol: '#e0a944', ticks: { label: '3/6 done', list: ['done', 'done', 'work', 'work', 'done', 'wait'] }, tl: [['Tasks', '6'], ['Runs', '7'], ['Spent', '$13.67']], tr: [['Working', '02'], ['Waiting', '01'], ['Done', '03']] };
const PIPE_CHROME = { tab: 'ui-polish-1140 r1', back: 'Hermes Approvals Ui', tabCol: '#e0a944', ticks: { label: '3/6 done', list: ['done', 'done', 'work', 'work', 'done', 'wait'] }, tl: [['Tasks', '6'], ['Runs', '6'], ['Spent', '$9.37']], tr: [['Working', '02'], ['Waiting', '01'], ['Done', '03']] };

// =====================================================================================
// REGION (one board): mountains at the back, river down the middle, sea on the right
// =====================================================================================
const RIV = catmull([[-170, -1000], [-140, -600], [-170, -420], [-95, -270], [-130, -150], [-45, -45], [40, 35], [140, 85], [270, 115], [420, 140]], 10);
const coastX = z => 235 + 60 * Math.sin(z / 130) + 50 * (fbm(z / 90, 3.3, 3, 5) - .5);
const land = (x, z) => { let h = 3 + fbm(x / 160, z / 160, 4, 1) * 14; const hl = fbm(x / 90 + 7, z / 90 - 3, 4, 2); h += Math.max(0, hl - .5) * 130; const mt = sm(-140, -520, z) + sm(-330, -520, x) * .6; if (mt > 0) { const r = ridged(x / 150, z / 150, 5, 9); h += Math.min(1, mt) * (r * r * 300 + 30); } return h; };
// You Should Know board (real names + spend; the working / needs-you states are staged)
const YSK = [['turn-aware-signal r1', 6.12, 'done'], ['turn-aware-signal r2', 2.62, 'done'], ['turn-aware-signal r3', 6.04, 'done'], ['headline-notice r1', 12.14, 'done'], ['rename-and-install r1', 7.81, 'done'], ['aux-model r1', 8.04, 'done'], ['check-scope r1', 12.17, 'fail'], ['note-actions r1', 13.67, 'work'], ['not-right r1', 8.89, 'done'], ['not-right r2', 5.34, 'done']];
const placeType = usd => usd < 4 ? 'farm' : usd <= 10 ? 'village' : 'harbor';
const SLOTS = { harbor: [180, 15, -165], village: [[-60, 125], [-195, -95], [80, -125], [-185, 60], [-10, -300], [-90, 20]], farm: [[95, 215], [-270, 230]] };
const SITES = {
  village: [[-60, 125], [-225, -95], [80, -125], [-235, 75], [95, 215], [-10, -300]],
  harbor: [[0, 300], [0, 205], [0, 25], [0, -70], [0, -175], [0, -265]],
  farm: [[-70, 150], [-270, 40], [70, -110], [-160, -60], [90, 230], [-250, 210]],
};
// Picks each site by farthest-point sampling: ports on the coast away from the river mouth, villages and farms on
// flat dry land away from river and coast; every candidate must project inside the frame (CAM is set before this runs).
function autoSites() {
  const types = YSK.map(([, usd]) => placeType(usd)), S = [];
  const inFrame = (x, z) => { const p = proj([x, Math.max(0, land(x, z)), z]); return p[0] > W * .12 && p[0] < W * .84 && p[1] > H * .2 && p[1] < H * .84; };
  const gap = (x, z, r) => S.length ? Math.min(...S.map(s => Math.hypot(s.x - x, s.z - z) - (s.foot || s.r) - r)) : 1e9;
  types.forEach((t, i) => { if (t !== 'harbor') return; let best = null; for (let z = -320; z <= 320; z += 10) { const x = coastX(z) - 16; if (Math.abs(z - 118) < 60 || !inFrame(x + 20, z)) continue; const d = gap(x, z, 40); if (!best || d > best.d) best = { x, z, d }; } S.push({ x: best.x, z: best.z, r: 40, coast: true, lv: 2.2, i, t }); });
  types.forEach((t, i) => { if (t === 'harbor') return; const r = t === 'farm' ? 54 : 40; let best = null; for (let k = 0; k < 3000; k++) { const x = R(-460, 240), z = t === 'farm' ? R(-20, 330) : R(-420, 330), h = land(x, z); if (h < 4 || h > 45) continue; if (Math.abs(land(x + 14, z) - land(x - 14, z)) + Math.abs(land(x, z + 14) - land(x, z - 14)) > 9) continue; if (dPoly(x, z, RIV) < r + 40 || coastX(z) - x < r + 60 || !inFrame(x, z)) continue; const d = gap(x, z, r); if (!best || d > best.d) best = { x, z, d }; } (window.__gaps = window.__gaps || []).push(Math.round(best.d)); S.push({ x: best.x, z: best.z, r: t === 'farm' ? 62 : 32, foot: r, i, t }); });
  return S.sort((a, b) => a.i - b.i);
}
function regionHF(kind) {
  let S;
  if (kind === 'mixed') S = autoSites();
  else S = SITES[kind].map(([x, z], i) => kind === 'harbor' ? { x: coastX(z) - 16, z, r: 24, coast: true, lv: 2.2, i, t: kind } : { x, z, r: kind === 'farm' ? 26 : 32, i, t: kind });
  S.forEach(s => { if (!s.coast) s.lv = Math.max(4, land(s.x, s.z)); });
  window.__sites = S.map(s => ({ t: s.t, x: Math.round(s.x), z: Math.round(s.z) }));
  const f = (x, z) => {
    let h = land(x, z);
    for (const s of S) if (!s.coast) { const d = Math.hypot(x - s.x, z - s.z); if (d < s.r * 2.2) h = lerp(s.lv, h, sm(s.r, s.r * 2.2, d)); }
    h = lerp(-8, h, sm(-12, 50, coastX(z) - x));
    const dr = dPoly(x, z, RIV); if (dr < 32) h = lerp(-2.5, h, sm(5, 30, dr));
    for (const s of S) if (s.coast && h > -1) { const d = Math.hypot(x - s.x, z - s.z), rr = Math.min(s.r, 26); if (d < rr * 2.2) h = lerp(s.lv, h, sm(rr, rr * 2.2, d)); }
    return h;
  };
  return { f, S };
}
function villageR(s, st) {
  const c = COLOR[st], a = R(0, 6.28), m = fr(s.x, s.lv, s.z, a);
  house(s.x, s.z, a, { w: 22, d: 12, h: 8, rh: 6, color: c, op: 1, chim: true, y: s.lv - .1 });
  const placed = [[0, 0, 15]]; let tries = 0;
  while (placed.length < 20 && tries++ < 800) { const b = rnd() * 6.283, r = R(15, s.r * 1.15), x = Math.cos(b) * r, z = Math.sin(b) * r; if (placed.some(([px, pz, pr]) => Math.hypot(px - x, pz - z) < pr + 6)) continue; placed.push([x, z, 6]); const w = tp(m, [x, 0, z]); house(w[0], w[2], a - b + (rnd() < .5 ? 0 : Math.PI / 2), { w: R(6, 9), d: R(4.8, 6.4), h: R(3.4, 4.6), rh: R(2.4, 3.2), op: .95, chim: rnd() < .3 }); }
  const tw = tp(m, [-8, 0, -16]); solid(BOX(5, 18, 5), { pos: [tw[0], s.lv + 9, tw[2]], rot: [0, a, 0], op: .95 }); solid(new THREE.ConeGeometry(4.2, 8, 4), { pos: [tw[0], s.lv + 22, tw[2]], rot: [0, a + Math.PI / 4, 0], op: .95 });
  for (let k = 0; k < 5; k++) { const b = rnd() * 6.283, r = s.r * R(1.5, 2), cx = s.x + Math.cos(b) * r, cz = s.z + Math.sin(b) * r; field(cx, cz, b + R(-.3, .3), R(14, 24), R(10, 18), INK, .3, 1, INK, 2.5); }
  if (st === 'work') { const ch = tp(m, [22 * .28, 8 + 6 * .7 + 2, 12 * .12]); smoke(ch, 30, INK, 300, .45); sparks(tp(m, [5, 1, 8]), 30, 3); }
  return [s.x, s.lv + 22, s.z];
}
function harborR(s, st) {
  const c = COLOR[st], m = fr(s.x, s.lv, s.z, 0); // local +x points to the sea
  for (const [z, L] of [[-14, 46], [2, 54], [18, 40]]) { solid(BOX(L, 2.4, 6), { m, pos: [10 + L / 2, -.8, z], op: .9 }); }
  for (const z of [-14, 18]) { const cm = mul(m, fr(30, .4, z, 0)); for (const [x, zz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) solid(BOX(.6, 12, .6), { m: cm, pos: [x, 6, zz], color: c }); solid(BOX(7, 1, 7), { m: cm, pos: [0, 12, 0], color: c }); truss(tp(cm, [-8, 13, 0]), tp(cm, [22, 13, 0]), 1.4, c, .9); }
  ship(mul(m, fr(48, 0, -5, 0)), 34, 7, st === 'work' ? .5 : 1, c); if (st !== 'fail') ship(mul(m, fr(44, 0, 26, 0)), 28, 6, 1, INK, .7);
  for (let k = 0; k < 6; k++) solid(BOX(16, 4.5, 7), { m, pos: [-12 - (k % 2) * 19, 2.25, -22 + Math.floor(k / 2) * 11], op: .85 });
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const hgt = 1 + Math.floor(rnd() * 3); solid(BOX(5.5, 1.3 * hgt, 2.2), { m, pos: [2 + i * 6.2 - 9, .65 * hgt, -20 + j * 2.8 + 26], color: st === 'work' && i === 3 ? GOLD : INK, op: .75 }); }
  // town behind the port
  for (let k = 0; k < 26; k++) { const x = s.x - R(32, 70), z = s.z + R(-38, 38); if (HF(x, z) < 1.5) continue; house(x, z, R(-.2, .2) + (rnd() < .5 ? 0 : Math.PI / 2), { w: R(4, 7), d: R(4, 6), h: R(3, 7), rh: R(1, 2), op: .75 }); }
  if (st === 'work') { sparks(tp(m, [46, 8, -5]), 30, 2.4); }
  return tp(m, [30, 16, -14]);
}
function ship(m, L, Wd, load, col, op = .9) {
  const sh = new THREE.Shape([new THREE.Vector2(-L / 2, -Wd / 2), new THREE.Vector2(L / 2 - Wd, -Wd / 2), new THREE.Vector2(L / 2, 0), new THREE.Vector2(L / 2 - Wd, Wd / 2), new THREE.Vector2(-L / 2, Wd / 2)]);
  const g = new THREE.ExtrudeGeometry(sh, { depth: Wd * .5, bevelEnabled: false }); g.rotateX(-Math.PI / 2); solid(g, { m, pos: [0, -Wd * .2, 0], op });
  solid(BOX(Wd * .7, Wd * .7, Wd * .9), { m, pos: [-L / 2 + Wd * .5, Wd * .3 + Wd * .35, 0], op }); solid(BOX(Wd * .35, Wd * .35, Wd * 1.1), { m, pos: [-L / 2 + Wd * .5, Wd * .3 + Wd * .87, 0], op });
  const nx = Math.floor((L - Wd * 2.2) / (Wd * .62)); for (let i = 0; i < nx; i++) for (let j = 0; j < 3; j++) { if (i / nx > load) continue; const hgt = 1 + ((i + j) % 2); solid(BOX(Wd * .55, Wd * .18 * hgt, Wd * .28), { m, pos: [-L / 2 + Wd * 1.25 + i * Wd * .62, Wd * .3 + Wd * .09 * hgt, (j - 1) * Wd * .3], color: col === INK ? INK : (i / nx > load - .2 ? col : INK), op: op * .85 }); }
}
function field(cx, cz, ang, w, d, col = INK, op = .3, frac = 1, colB = INK, tol = 1e9) {
  const c = Math.cos(ang), s = Math.sin(ang), P = (u, v) => [cx + u * c - v * s, cz + u * s + v * c];
  if (tol < 1e9) { const hs = [[-.5, -.5], [.5, -.5], [.5, .5], [-.5, .5], [0, 0], [0, -.5], [0, .5], [-.5, 0], [.5, 0]].map(([u, v]) => HF(...P(u * w, v * d))); if (Math.max(...hs) - Math.min(...hs) > tol || Math.min(...hs) < 1.5) return false; }
  for (let u = -w / 2 + 4; u < w / 2; u += 8) for (let v = -d / 2 + 4; v < d / 2; v += 8) obsAdd(...P(u, v), 6);
  drape([P(-w / 2, -d / 2), P(w / 2, -d / 2), P(w / 2, d / 2), P(-w / 2, d / 2), P(-w / 2, -d / 2)], { color: col, op: Math.min(1, op * 1.8), dy: .3 });
  for (let u = -w / 2 + 1.6; u < w / 2; u += 1.6) { const plowed = (u + w / 2) / w <= frac; drape([P(u, -d / 2), P(u, d / 2)], { color: plowed ? col : colB, op: plowed ? op : op * .45, dy: .2, step: 3 }); }
  return true;
}
function farmR(s, st) {
  const c = COLOR[st], a = R(0, 6.28), m = fr(s.x, s.lv, s.z, a);
  house(s.x, s.z, a, { w: 17, d: 11, h: 7, rh: 5.5, color: c, op: 1, y: s.lv - .1 });
  for (const [x, z] of [[13, -5], [18, -5]]) { const w = tp(m, [x, 0, z]); solid(CYL(2.3, 2.3, 15, 12), { pos: [w[0], s.lv + 7.5, w[2]], color: c }); solid(new THREE.SphereGeometry(2.3, 12, 4, 0, 6.29, 0, 1.57), { pos: [w[0], s.lv + 15, w[2]], color: c }); }
  { const w = tp(m, [-12, 0, 6]); house(w[0], w[2], a, { w: 6, d: 5, h: 3.4, rh: 2.4, op: .85, chim: true, y: s.lv - .1 }); }
  const lay = [[-30, -24, 28, 20], [2, -30, 30, 18], [34, -18, 26, 30], [-34, 14, 24, 28], [26, 26, 34, 22], [-6, 34, 28, 18]].map(q => q.map(v => v * 1.2));
  let placedF = 0;
  lay.forEach(([u, v, w, d], k) => { const p = tp(m, [u, 0, v]); const working = st === 'work' && k === 2; if (field(p[0], p[2], a, w, d, working ? GOLD : INK, .42, working ? .55 : 1, INK, 4.5)) placedF++; if (working) { tractor(...(() => { const q = tp(m, [u - w / 2 + w * .55, 0, v]); return [q[0], q[2]]; })(), a + Math.PI / 2, GOLD, 1.3); } });
  if (st === 'work') smoke(tp(m, [3, 9, 2]), 14, INK, 120, .35);
  (window.__farmFields = window.__farmFields || []).push(placedF);
  return [s.x, s.lv + 17, s.z];
}
function tractor(x, z, ry, col = GOLD, s = 1) {
  const m = fr(x, HF(x, z), z, ry);
  solid(BOX(3.2 * s, 1.3 * s, 1.5 * s), { m, pos: [.4 * s, 1.5 * s, 0], color: col }); solid(BOX(1.8 * s, 1.9 * s, 1.7 * s), { m, pos: [-.7 * s, 3.1 * s, 0], color: col, fill: false });
  for (const k of [-1, 1]) { solid(CYL(1.1 * s, 1.1 * s, .55 * s, 14), { m, pos: [-.9 * s, 1.1 * s, k * 1.05 * s], rot: [Math.PI / 2, 0, 0], color: col }); solid(CYL(.6 * s, .6 * s, .4 * s, 12), { m, pos: [1.5 * s, .6 * s, k * .9 * s], rot: [Math.PI / 2, 0, 0], color: col }); }
  seg(m, [1.2 * s, 2.15 * s, .4 * s], [1.2 * s, 3.4 * s, .4 * s], col); for (const k of [-1, 0, 1]) seg(m, [-2.2 * s, 1 * s, k * .9 * s], [-3.6 * s, 0, k * .9 * s], col);
  seg(m, [-2.2 * s, 1 * s, -1 * s], [-2.2 * s, 1 * s, 1 * s], col); return m;
}
function siteBox(s) { const pts = [], cx = s.coast ? s.x + 22 : s.x, r0 = s.coast ? 46 : (s.t === 'farm' ? 50 : s.r * 1.4); for (let k = 0; k < 16; k++) { const a = k / 16 * 6.283; for (const y of [0, s.coast ? 18 : 24]) pts.push(proj([cx + Math.cos(a) * r0, s.lv + y, s.z + Math.sin(a) * r0])); } const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; }
// Labels sit next to their own settlement: candidate spots ring the anchor at growing distance; a spot is taken only if
// it stays inside the frame, clear of the HUD, of every settlement footprint and of labels already placed.
function placeLabels(items, boxes) {
  const EXCL = [[0, 0, 215, 94], [W - 215, 0, W, 94], [W / 2 - 240, 0, W / 2 + 240, 86], [0, H - 40, W, H]], placed = [...EXCL], html = [], svg = [], miss = [];
  const probe = document.createElement('div'); probe.className = 'tg'; probe.style.visibility = 'hidden'; ov.appendChild(probe);
  const label = q => `<div class="n">${esc(q.name)}</div><span class="chip ${q.st === 'done' ? '' : q.st}"><i></i>${esc(q.chip)}</span>`;
  const sizes = items.map(q => { probe.innerHTML = label(q); return [probe.offsetWidth + 2, probe.offsetHeight]; }); probe.remove();
  const hit = (r, list) => list.some(b => r[0] < b[2] && r[2] > b[0] && r[1] < b[3] && r[3] > b[1]);
  const order = items.map((q, i) => i).sort((a, b) => proj(items[a].at)[1] - proj(items[b].at)[1]);
  for (const i of order) {
    const q = items[i], p = proj(q.at), [w, h] = sizes[i]; let best = null;
    for (const strict of [true, false]) { for (const d of [14, 28, 46, 70, 100, 140]) { for (const [dx, dy] of [[1, -1], [-1, -1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, 1], [0, 1]]) {
      const x = dx > 0 ? p[0] + d : dx < 0 ? p[0] - d - w : p[0] - w / 2, y = dy < 0 ? p[1] - d - h : dy > 0 ? p[1] + d : p[1] - h / 2, r = [x, y, x + w, y + h];
      if (x < 14 || y < 14 || x + w > W - 14 || y + h > H - 14 || hit(r, placed) || (strict && hit(r, boxes))) continue; best = { x, y, r, right: dx < 0 }; break; } if (best) break; } if (best) break; }
    if (!best) { miss.push(q.name); continue; }
    placed.push([best.r[0] - 8, best.r[1] - 8, best.r[2] + 8, best.r[3] + 8]);
    html.push(`<div class="tg ${best.right ? 'r' : ''}" style="left:${best.x}px;top:${best.y}px;width:${w}px">${label(q)}</div>`);
    const ex = Math.min(Math.max(p[0], best.r[0]), best.r[2]), ey = Math.min(Math.max(p[1], best.r[1] + 9), best.r[3]);
    const dpath = `M${p[0].toFixed(1)} ${p[1].toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}`; // halo keeps the leader readable over dense wireframe
    svg.push(`<path d="${dpath}" fill="none" stroke="#0b0b0c" stroke-width="4" stroke-opacity=".85"/>`, `<path d="${dpath}" fill="none" stroke="${HEX[q.st]}" stroke-width="1.2" stroke-opacity=".9"/>`, `<rect x="${(p[0] - 3).toFixed(1)}" y="${(p[1] - 3).toFixed(1)}" width="6" height="6" fill="${HEX[q.st]}"/>`);
    if (q.st === 'fail') html.push(`<div class="beacon" style="left:${p[0]}px;top:${p[1]}px"><i></i></div>`);
  }
  ov.innerHTML = `<svg class="lead" width="${W}" height="${H}">${svg.join('')}</svg>` + html.join('');
  window.__labels = { miss, anchors: items.map(q => [q.name, ...proj(q.at).slice(0, 2).map(Math.round)]) };
}
function buildRegion(kind) {
  seed = 17;
  const cams = { mixed: [[110, 430, 610], [100, 0, -50]], village: [[-40, 250, 420], [-50, 0, -60]], harbor: [[-120, 240, 400], [150, 0, -40]], farm: [[-90, 230, 420], [-70, 0, -40]] }[kind];
  CAM = new THREE.PerspectiveCamera(40, W / H, 1, 8000); CAM.position.set(...cams[0]); CAM.lookAt(...cams[1]); CAM.updateMatrixWorld(); CAM.updateProjectionMatrix();
  const { f, S } = regionHF(kind); HF = f;
  scene.fog = new THREE.Fog(BG, 700, 2300);
  // ground: rows + sparse columns, none on steep faces; relief contours where the grid is skipped
  terrain({ x0: -760, x1: 520, z0: -700, z1: 560, step: 2.5, rowK: 2, colK: 6, op: .3, colOp: .1, water: -.3, colSteep: .7, rowSteep: 3 });
  terrain({ x0: -1600, x1: 1600, z0: -1900, z1: 1400, step: 10, rowK: 1, colK: 4, op: .36, colOp: .07, hole: [-760, 520, -700, 560], water: -.3, colSteep: .5, rowSteep: 2.2 });
  waterPlane(-1600, 1600, -1900, 1500, 0);
  contour(0, { x0: -760, x1: 700, z0: -700, z1: 560, step: 2.5, op: .9 }); contour(-1.6, { x0: -760, x1: 700, z0: -700, z1: 560, step: 5, op: .28 });
  contour([40, 70, 100, 130, 160, 190, 220, 250, 280], { x0: -760, x1: 520, z0: -700, z1: 560, step: 4, op: .42, dy: .3 });
  waterHatch(9000, -760, 900, -700, 560, 0, .26, (x, z) => .15 + .85 * sm(-560, 300, z));
  { const d = dots(INK, 1.3, .5); for (let i = 0; i < 700; i++) { const a = R(-1.4, 1.4), e = R(.02, .5); d.push(Math.sin(a) * 3000, 300 + Math.sin(e) * 3000, -Math.cos(a) * 3000); } }
  // roads: nearest-neighbour links (mixed) or fixed edges
  let E = { village: [[0, 3], [0, 4], [0, 2], [3, 1], [1, 5], [2, 5]], harbor: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]], farm: [[0, 4], [0, 3], [3, 1], [3, 2], [1, 5], [0, 5]] }[kind];
  if (kind === 'mixed') { E = []; const inT = new Set([0]); while (inT.size < S.length) { let bst = null; for (const a of inT) S.forEach((s, b) => { if (inT.has(b)) return; const d = Math.hypot(S[a].x - s.x, S[a].z - s.z); if (!bst || d < bst[2]) bst = [a, b, d]; }); E.push([bst[0], bst[1]]); inT.add(bst[1]); } }
  const RD = [];
  for (const [a, b] of E) { const A = S[a], B = S[b], mx = (A.x + B.x) / 2 + R(-20, 20), mz = (A.z + B.z) / 2 + R(-20, 20); RD.push(road([[A.x, A.z], [mx, mz], [B.x, B.z]], 2.4, { op: .7, minY: 1.4 })); }
  // settlements first, so trees and fields keep clear of them
  const LIST = kind === 'mixed' ? YSK.map(([n, usd, st]) => [n, st, `${st === 'done' ? 'Done' : st === 'work' ? 'Working' : 'Needs you'} · $${usd.toFixed(2)}`]) : PIPES;
  const items = S.map((s, i) => { const [name, st, chip] = LIST[i]; const at = s.t === 'village' ? villageR(s, st) : s.t === 'harbor' ? harborR(s, st) : farmR(s, st); return { name, st, chip, at }; });
  // patchwork fields only on flat ground
  for (let i = 0; i < (kind === 'farm' ? 320 : 240); i++) { const x = R(-700, 300), z = R(-200, 540), h = HF(x, z); if (h < 2 || h > 30 || dPoly(x, z, RIV) < 16 || obsHit(x, z, 10)) continue; field(x, z, R(-.5, .5) + (rnd() < .5 ? 0 : 1.57), R(12, 26), R(10, 18), INK, .2, 1, INK, 2.2); }
  // forests in clumps, clear of everything built
  let nt = 0; for (let i = 0; i < 110000 && nt < 6500; i++) { const x = R(-740, 500), z = R(-680, 540), h = HF(x, z); if (h < 2.5 || h > 150) continue; const fm = fbm(x / 70 + 11, z / 70, 3, 21); if (fm < .55) continue; if (Math.abs(HF(x + 3, z) - h) > 4.5) continue; if (dPoly(x, z, RIV) < 10 || obsHit(x, z, 2.5)) continue; tree(x, z, R(1.1, 1.7), h > 26 || rnd() < .35 ? 'c' : 'd', .5); nt++; }
  // carts on the roads next to the working pipeline
  const wi = LIST.findIndex(p => p[1] === 'work');
  RD.forEach((C, k) => { const [a, b] = E[k]; if (a !== wi && b !== wi) return; const fwd = a === wi;
    if (ANIM) { const H0 = HF; for (const ph of [0, .5]) { const g = capture(() => cart(0, 0, 0, GOLD, 2.2)); ANIM.movers.push(t => { const c = (t / 14 + ph) % 1, out = c < .5, u = out ? sm(0, .5, c) : 1 - sm(.5, 1, c), [x, z, ry] = pathPoint(C, fwd ? u : 1 - u); g.position.set(x, Math.max(1.4, H0(x, z)), z); g.rotation.y = ry + (out === fwd ? 0 : Math.PI); }); } return; }
    for (const t of [.22, .5]) { const [x, z, ry] = pathPoint(C, a === wi ? t : 1 - t); cart(x, z, ry, GOLD, 2.2); } });
  const segs = flush();
  renderer.render(scene, CAM);
  placeLabels(items, S.map(siteBox)); window.__regionItems = items;
  const hint = { mixed: 'Place shows spend: <b>farm</b> under $4 · <b>village</b> $4–10 · <b>port</b> over $10', village: 'Each <b>village is a pipeline</b> · click one to fly down to it', harbor: 'Each <b>port is a pipeline</b> · click one to fly down to it', farm: 'Each <b>farm is a pipeline</b> · click one to fly down to it' }[kind];
  chrome(kind === 'mixed' ? { tab: 'You Should Know · 1 needs you', tabCol: '#ec6a84', ticks: { label: '58/60 done', list: [...Array(58).fill('done'), 'work', 'fail'] }, tl: [['Pipelines', '10'], ['Tasks', '60'], ['Spent', '$' + YSK.reduce((a, r) => a + r[1], 0).toFixed(2)]], tr: [['Working', '01'], ['Needs you', '01'], ['Done', '58']], hint } : { ...BOARD_CHROME, hint });
  return segs;
}

// =====================================================================================
// SITE (one pipeline) — ground level
// =====================================================================================
function buildVillageSite() {
  seed = 5; scene.fog = new THREE.Fog(BG, 90, 760);
  HF = (x, z) => { const d = Math.hypot(x, z + 30); let h = (fbm(x / 50, z / 50, 3, 3) * 3 - 1.5) * sm(70, 120, d); h += sm(105, 240, d) * Math.pow(fbm(x / 110 + 2, z / 110, 4, 4), 1.5) * 150; h += sm(320, 700, Math.hypot(x, z)) * Math.pow(ridged(x / 220, z / 220, 5, 7), 2) * 520; return h; };
  terrain({ x0: -260, x1: 260, z0: -300, z1: 160, step: 2, rowK: 2, colK: 6, op: .26, colOp: .08 });
  terrain({ x0: -1500, x1: 1500, z0: -1700, z1: 300, step: 10, rowK: 1, colK: 3, op: .38, colOp: .14, hole: [-260, 260, -300, 160] });
  // streets
  const main = road([[0, 140], [0, 60], [0, 0], [0, -40], [0, -92], [5, -160], [-30, -240], [-20, -320]], 5, { op: .7, center: true });
  for (const P of [[[-30, 26], [-12, 10], [-22, -18]], [[-30, 26], [8, 8], [22, -18]], [[0, -30], [-22, -52]], [[0, -30], [22, -52]], [[-22, -52], [-6, -80]], [[22, -52], [6, -80]], [[0, 10], [-60, 20], [-110, 60]], [[0, 10], [60, 6], [120, 30]]]) road(P, 3.2, { op: .55, n: 8 });
  // square paving + well
  { const r = lines(INK, .25); for (let x = -14; x <= 14; x += 2) r.push(x, .1, -46, x, .1, -22); for (let z = -46; z <= -22; z += 2) r.push(-14, .1, z, 14, .1, z); solid(CYL(1.6, 1.6, 1.2, 14), { pos: [0, .6, -34] }); for (const k of [-1, 1]) seg(null, [k * 1.4, 1.2, -34], [k * 1.4, 3.6, -34]); solid(prism(3.8, 1.2, 2.4), { pos: [0, 3.6, -34], rot: [0, Math.PI / 2, 0] }); }
  const items = [];
  // build = forge hall
  { const [x, z] = [-34, 28]; house(x, z, .12, { w: 24, d: 11, h: 7, rh: 5, chim: true, op: 1 }); const m = fr(x, HF(x, z), z, .12); solid(BOX(1.4, 5, 1.4), { m, pos: [-7, 11, 1], op: 1 });
    for (let k = 0; k < 3; k++) crate(m, [6 + k * 2.2, 0, 7.5], [1.8, 1.4, 1.4], INK); pl(m, [[-3, 0, 5.52], [-3, 4.5, 5.52], [3, 4.5, 5.52], [3, 0, 5.52]], INK, .9);
    worker(x + 13, z + 9, .5); items.push({ name: 'build', st: 'done', chip: 'done · builder', at: tp(m, [0, 12.5, 0]) }); }
  // reviews = four workshops round the square
  const REV = [['security', 'done', -24, -20, .3], ['ux', 'work', 24, -20, -.3], ['ui', 'work', -24, -54, -.25], ['code', 'done', 24, -54, .25]];
  for (const [n, st, x, z, ry] of REV) {
    const c = COLOR[st], m = house(x, z, ry + (x < 0 ? Math.PI / 2 : -Math.PI / 2), { w: 14, d: 8, h: 5, rh: 3.6, color: c, op: 1, chim: true });
    // lean-to porch toward the square with a workbench
    solid(BOX(9, .3, 4), { m, pos: [0, 4.2, 6], rot: [-.25, 0, 0], color: c, op: .9 }); for (const px of [-4.2, 4.2]) seg(m, [px, 0, 7.8], [px, 3.7, 7.8], c, .9);
    solid(BOX(4, .9, 1.4), { m, pos: [-1, .45, 6], color: c });
    if (st === 'work') { const a = tp(m, [-1, 1.1, 6]); sparks([a[0], a[1] + .3, a[2]], 40, 1.6); const w1 = tp(m, [-1, 0, 7.6]), w2 = tp(m, [1.8, 0, 6.6]); worker(w1[0], w1[2], -ry, GOLD, 'work'); worker(w2[0], w2[2], -ry + 2, GOLD, 'work'); smoke(tp(m, [14 * .28, 5 + 3.6 * .7 + 1.8, 8 * .12]), 18, INK, 200, .4); crate(m, [2.8, .9, 6], [1.3, 1, 1], GOLD); }
    else { crate(m, [2.5, 0, 6.5], [1.6, 1.2, 1.3], INK); const k = tp(m, [2.5, 1.9, 7.2]); }
    items.push({ name: n, st, chip: `${WORD[st]} · review`, at: tp(m, [0, 10, 0]) });
  }
  // gate = town wall + gatehouse (closed)
  { const z = -96; for (const [a, b] of [[-150, -9], [9, 150]]) { const L = b - a, cx = (a + b) / 2; solid(BOX(L, 7, 3), { pos: [cx, HF(cx, z) + 3, z], color: INK, op: .85 }); for (let x = a + 1; x < b; x += 2.6) solid(BOX(1.3, 1.2, 3), { pos: [x, HF(cx, z) + 7.1, z], op: .8 }); }
    for (const k of [-1, 1]) { solid(BOX(7, 16, 7), { pos: [k * 9.5, 8, z], color: LAB }); solid(new THREE.ConeGeometry(5.6, 6.5, 4), { pos: [k * 9.5, 19.2, z], rot: [0, Math.PI / 4, 0], color: LAB }); for (const y of [6, 10.5]) pl(null, [[k * 9.5 - .7, y, z + 3.52], [k * 9.5 + .7, y, z + 3.52], [k * 9.5 + .7, y + 1.8, z + 3.52], [k * 9.5 - .7, y + 1.8, z + 3.52], [k * 9.5 - .7, y, z + 3.52]], LAB, .9); }
    solid(BOX(12, 4, 4), { pos: [0, 10, z], color: LAB }); for (const k of [-1, 1]) { solid(BOX(5.9, 8, .5), { pos: [k * 3, 4, z + 1], color: LAB }); for (let y = 1; y < 8; y += 1.6) seg(null, [k * .1, y, z + 1.27], [k * 5.9, y, z + 1.27], LAB, .5); }
    items.push({ name: 'gate', st: 'wait', chip: 'waiting · all 4 reviews', at: [0, 13, z + 2] }); }
  // agents on the streets: carts carrying finished parts from the forge to the working workshops
  cart(-10, 4, .9, GOLD, 1.3); worker(-8.5, 7.5, .9); cart(10, -2, -2.4, GOLD, 1.3); worker(12, -.5, -2.4); cart(-14, -42, 2.6, GOLD, 1.2); worker(-16, -40, 2.6);
  for (const [x, z, ry] of [[3, 40, 1.5], [-2, -70, 1.6], [40, 12, 3]]) worker(x, z, ry);
  // the rest of the village
  let n = 0; for (let i = 0; i < 500 && n < 46; i++) { const x = R(-140, 140), z = R(-90, 90); if (Math.abs(x) < 44 && z > -80 && z < 50) continue; if (Math.abs(x) < 8) continue; if (Math.hypot(x, z + 30) > 125) continue; house(x, z, (rnd() < .5 ? 0 : Math.PI / 2) + R(-.15, .15), { w: R(6, 10), d: R(5, 7), h: R(3.5, 5.5), rh: R(2.4, 3.4), op: .78, chim: rnd() < .4 }); n++; }
  for (let i = 0; i < 9; i++) { const x = R(-160, 160), z = R(-260, -120); if (Math.abs(x) < 14) continue; field(x, z, R(-.3, .3), R(30, 50), R(20, 32), INK, .3); }
  let nt = 0; for (let i = 0; i < 20000 && nt < 2600; i++) { const x = R(-420, 420), z = R(-600, 130), d = Math.hypot(x, z + 30); if (d < 100 && !(z < -110)) continue; const h = HF(x, z); if (h > 260) continue; if (fbm(x / 60, z / 60, 3, 31) < .48) continue; if (Math.abs(x) < 16 && z < -90) continue; tree(x, z, R(1.8, 2.8), h > 40 || rnd() < .5 ? 'c' : 'd', .7); nt++; }
  { const d = dots(INK, 1.3, .5); for (let i = 0; i < 500; i++) { const a = R(-1.2, 1.2), e = R(.12, .5); d.push(Math.sin(a) * 3000, Math.sin(e) * 3000, -Math.cos(a) * 3000); } }
  const segs = flush();
  CAM = new THREE.PerspectiveCamera(44, W / H, .5, 6000); CAM.position.set(8, 62, 128); CAM.lookAt(0, 0, -36);
  renderer.render(scene, CAM); columnLabels(items, { top: 130 });
  chrome({ ...PIPE_CHROME, hint: 'Each <b>workshop is a task</b> · workers and carts are the agents · click one for its log' });
  return segs;
}

function stsCrane(x, z, col, load) {
  const m = fr(x, 2.2, z, 0); // quay edge at local z=0, water toward -z
  for (const lx of [-6, 6]) for (const lz of [2, 16]) solid(BOX(.9, 26, .9), { m, pos: [lx, 13, lz], color: col });
  for (const lz of [2, 16]) { solid(BOX(13, 1.2, 1.2), { m, pos: [0, 26, lz], color: col }); solid(BOX(13, .8, .8), { m, pos: [0, 9, lz], color: col }); }
  for (const lx of [-6, 6]) { solid(BOX(1, 1, 15), { m, pos: [lx, 26, 9], color: col }); seg(m, [lx, 9, 2], [lx, 26, 16], col, .6); seg(m, [lx, 9, 16], [lx, 26, 2], col, .6); }
  const up = !load; const tipZ = up ? 2 : -40, tipY = up ? 70 : 29;
  truss(tp(m, [0, 29, 26]), tp(m, [0, 29, 2]), 2, col, .9); truss(tp(m, [0, 29, 2]), tp(m, [0, tipY, tipZ]), 2, col, .9);
  for (const lx of [-1, 1]) { seg(m, [lx, 26, 2], [0, 44, 9], col); seg(m, [lx, 26, 16], [0, 44, 9], col); } seg(m, [0, 44, 9], [0, tipY + 1, tipZ], col, .8); seg(m, [0, 44, 9], [0, 30, 26], col, .8);
  solid(BOX(5, 4, 6), { m, pos: [0, 32, 20], color: col });
  for (const lx of [-6, 6]) for (const lz of [2, 16]) { solid(BOX(2.2, .9, 2.2), { m, pos: [lx, .45, lz], color: col }); }
  if (load && ANIM) { const X = x, Z = z, ph = X > 0 ? .37 : 0;
    const tro = capture(() => solid(BOX(2.6, 1.6, 3), { color: col })), cab = capture(() => { for (const lx of [-.8, .8]) seg(null, [lx, 0, 0], [lx, -1, 0], col, .9); });
    const spr = capture(() => solid(BOX(12, .5, 2.8), { pos: [0, .25, 0], color: col })), ctr = capture(() => solid(BOX(12, 2.6, 2.6), { pos: [0, -1.3, 0], color: GOLD }));
    ANIM.movers.push(t => { const c = (t / 9 + ph) % 1, zq = 9.5, zs = -24, yUp = 18, yQ = 2.6, yS = 3.9; let zz = zq, yy = yUp, has = false;
      if (c < .15) yy = lerp(yUp, yQ, sm(0, .15, c)); else if (c < .3) { yy = lerp(yQ, yUp, sm(.15, .3, c)); has = true; } else if (c < .45) { zz = lerp(zq, zs, sm(.3, .45, c)); has = true; }
      else if (c < .6) { zz = zs; yy = lerp(yUp, yS, sm(.45, .6, c)); has = true; } else if (c < .7) { zz = zs; yy = lerp(yS, yUp, sm(.6, .7, c)); } else if (c < .85) zz = lerp(zs, zq, sm(.7, .85, c));
      tro.position.set(X, 2.2 + 27.4, Z + zz); spr.position.set(X, 2.2 + yy, Z + zz); ctr.position.set(X, 2.2 + yy, Z + zz); ctr.visible = has; cab.position.set(X, 2.2 + 26.6, Z + zz); cab.scale.y = 26.6 - yy - .5; }); }
  else if (load) { solid(BOX(2.6, 1.6, 3), { m, pos: [0, 27.4, -24], color: col }); for (const lx of [-.8, .8]) seg(m, [lx, 26.6, -24], [lx, 15, -24], col, .9); solid(BOX(12, 2.6, 2.6), { m, pos: [0, 13.6, -24], color: GOLD }); }
  return tp(m, [0, 47, 9]);
}
function truck(x, z, ry, cargo = INK) { const m = fr(x, 2.2, z, ry); solid(BOX(2.6, 2.6, 2.5), { m, pos: [5.3, 2.1, 0] }); solid(BOX(12, .5, 2.4), { m, pos: [0, 1.1, 0] }); for (const lx of [-4.5, -3.2, 3.5, 5.3]) for (const k of [-1, 1]) solid(CYL(.55, .55, .35, 10), { m, pos: [lx, .55, k * 1.1], rot: [Math.PI / 2, 0, 0] }); if (cargo) solid(BOX(9.5, 2.6, 2.4), { m, pos: [-1.2, 2.65, 0], color: cargo }); }
function buildHarborSite() {
  seed = 9; scene.fog = new THREE.Fog(BG, 110, 900);
  HF = (x, z) => { let h; if (z > 0) h = 2.2 + sm(70, 170, z) * fbm(x / 80, z / 80, 4, 2) * 80; else h = -6; const head = sm(-150, -200, x) * sm(70, 20, z); if (head > 0) h = lerp(h, 6 + fbm(x / 50, z / 50, 4, 3) * 60, head); const far = sm(-480, -700, z); if (far > 0) h = lerp(h, 10 + Math.pow(ridged(x / 220, z / 220, 5, 8), 2) * 520, far); return h; };
  terrain({ x0: -300, x1: 300, z0: -320, z1: 240, step: 2, rowK: 2, colK: 6, op: .26, colOp: .08, water: -1 });
  terrain({ x0: -1600, x1: 1600, z0: -1900, z1: 300, step: 10, rowK: 1, colK: 3, op: .38, colOp: .14, hole: [-300, 300, -320, 240], water: -1 });
  waterPlane(-1600, 1600, -1900, 0, -.4); contour(-.4, { x0: -300, x1: 300, z0: -720, z1: 180, step: 2.5, op: .9 });
  waterHatch(14000, -300, 600, -720, 0, -.4, .28);
  // quay edge, bollards, rail tracks, yard markings
  { const r = lines(INK, .9); r.push(-300, 2.25, 0, 300, 2.25, 0); for (let x = -290; x < 300; x += 8) solid(CYL(.35, .45, .8, 8), { pos: [x, 2.6, 1] }); const t = lines(INK, .45); for (const z of [3, 4.4, 15, 16.4]) t.push(-300, 2.25, z, 300, 2.25, z); for (let x = -300; x < 300; x += 1.5) t.push(x, 2.25, 2.8, x, 2.25, 4.6, x, 2.25, 14.8, x, 2.25, 16.6); }
  const items = [];
  // build = warehouse + container yard
  { const m = fr(-118, 2.2, 52, 0); solid(BOX(60, 12, 22), { m, pos: [0, 6, 0], op: 1 }); for (let x = -27; x <= 27; x += 6) seg(m, [x, 0, 11.02], [x, 12, 11.02], INK, .4); solid(prism(61, 4, 23), { m, pos: [0, 12, 0] }); for (const x of [-18, 0, 18]) pl(m, [[x - 3.5, 0, 11.03], [x - 3.5, 7, 11.03], [x + 3.5, 7, 11.03], [x + 3.5, 0, 11.03]], INK, .9); items.push({ name: 'build', st: 'done', chip: 'done · builder', at: tp(m, [0, 17, 0]) }); }
  for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) { const hgt = 1 + Math.floor(rnd() * 3); for (let k = 0; k < hgt; k++) solid(BOX(12, 2.6, 2.5), { pos: [-80 + i * 13.5, 2.2 + 1.3 + k * 2.6, 30 + j * 3.2], op: .7 }); }
  // reviews = four berths, each with a ship-to-shore crane
  const REV = [['security', 'done', -105], ['ux', 'work', -35], ['ui', 'work', 35], ['code', 'done', 105]];
  for (const [n, st, x] of REV) { const c = COLOR[st], work = st === 'work'; const at = stsCrane(x, 0, c, work); ship(fr(x, -.4, -18, 0), 62, 13, work ? .55 : 1, work ? GOLD : INK, .95); if (work) sparks(tp(fr(x, 0, -24, 0), [0, 12, 0]), 26, 2.2); items.push({ name: n, st, chip: `${WORD[st]} · review`, at }); }
  // trucks carrying containers from the yard to the working berths; straddle carrier parked at the done ones
  if (ANIM) { for (const [x0, x1, lane, ph, cg] of [[-78, -35, 6.5, 0, GOLD], [-70, 35, 12.5, .45, GOLD], [-60, 60, 9.5, .7, null]]) { const g = capture(() => truck(0, 0, 0, cg)); ANIM.movers.push(t => { const c = (t / 11 + ph) % 1, u = c < .5 ? sm(0, .45, c) : 1 - sm(.5, .95, c); g.position.set(lerp(x0, x1, u), 0, lane); g.rotation.y = c < .5 ? 0 : Math.PI; }); } truck(-140, 22, .1, INK); truck(100, 25, Math.PI, INK); }
  else { truck(-50, 9.5, 0, GOLD); truck(22, 9.5, Math.PI, GOLD); truck(55, 9.5, 0, null); truck(-140, 22, .1, INK); truck(100, 25, Math.PI, INK); }
  // gate = harbour mouth with lock gates (closed) and two lighthouses
  { const bw = [[[-200, -10], [-120, -120], [-26, -175]], [[200, -10], [150, -120], [26, -175]]]; for (const P of bw) { for (let i = 0; i < P.length - 1; i++) { const [ax, az] = P[i], [bx, bz] = P[i + 1], L = Math.hypot(bx - ax, bz - az); solid(BOX(L, 4, 6), { pos: [(ax + bx) / 2, 0, (az + bz) / 2], rot: [0, -Math.atan2(bz - az, bx - ax), 0], op: .85 }); } }
    for (const k of [-1, 1]) { const x = k * 26, z = -175; solid(CYL(1.6, 2.6, 16, 10), { pos: [x, 10, z], color: LAB }); solid(CYL(2.6, 2.6, .6, 12), { pos: [x, 18.2, z], color: LAB }); solid(CYL(1.3, 1.3, 2.4, 8), { pos: [x, 19.7, z], color: LAB, fill: false }); solid(new THREE.ConeGeometry(1.7, 2, 8), { pos: [x, 21.9, z], color: LAB });
      solid(BOX(1.4, 9, 27), { pos: [k * 12.5, 2.5, z - 6], rot: [0, k * 1.2, 0], color: LAB }); }
    items.push({ name: 'gate', st: 'wait', chip: 'waiting · all 4 reviews', at: [0, 9, -180] }); }
  // tug + a ship waiting outside
  ship(fr(-20, -.4, -250, .3), 70, 13, 1, INK, .6); ship(fr(70, -.4, -80, -.4), 16, 5, 0, INK, .9);
  // town on the hill behind
  let n = 0; for (let i = 0; i < 800 && n < 90; i++) { const x = R(-260, 260), z = R(70, 170); if (HF(x, z) > 60) continue; house(x, z, R(-.2, .2) + (rnd() < .5 ? 0 : Math.PI / 2), { w: R(5, 9), d: R(5, 8), h: R(3.5, 8), rh: R(1.2, 2.8), op: .7 }); n++; }
  let nt = 0; for (let i = 0; i < 12000 && nt < 1500; i++) { const x = R(-700, 400), z = R(-1000, 170); const h = HF(x, z); if (h < 4 || h > 300) continue; if (fbm(x / 50, z / 50, 3, 41) < .47) continue; tree(x, z, R(2, 3), 'c', .7); nt++; }
  { const d = dots(INK, 1.3, .5); for (let i = 0; i < 500; i++) { const a = R(-1.2, 1.2), e = R(.1, .5); d.push(Math.sin(a) * 3000, Math.sin(e) * 3000, -Math.cos(a) * 3000); } }
  const segs = flush();
  CAM = new THREE.PerspectiveCamera(46, W / H, .5, 6000); CAM.position.set(0, 120, 215); CAM.lookAt(0, -10, -70);
  renderer.render(scene, CAM); columnLabels(items, { top: 130 });
  chrome({ ...(ANIM ? NA_CHROME : PIPE_CHROME), hint: 'Each <b>berth is a task</b> · cranes and trucks are the agents · click one for its log' });
  return segs;
}

function buildFarmSite() {
  seed = 13; scene.fog = new THREE.Fog(BG, 100, 820);
  const base = (x, z) => { const d = Math.hypot(x, z + 40); let h = (fbm(x / 70, z / 70, 4, 5) * 8 - 4) * sm(60, 120, d); let hill = sm(115, 260, d) * Math.pow(fbm(x / 120 + 4, z / 120, 4, 6), 1.3) * 170; if (hill > 2) hill = 7 * (Math.floor(hill / 7) + sm(.75, 1, hill / 7 % 1)); h += hill; h += sm(360, 750, Math.hypot(x, z)) * Math.pow(ridged(x / 230, z / 230, 5, 9), 2) * 520; return h; };
  HF = base;
  terrain({ x0: -280, x1: 280, z0: -320, z1: 160, step: 2, rowK: 2, colK: 6, op: .24, colOp: .08 });
  terrain({ x0: -1500, x1: 1500, z0: -1700, z1: 300, step: 10, rowK: 1, colK: 3, op: .38, colOp: .14, hole: [-280, 280, -320, 160] });
  for (let lv = 7; lv < 160; lv += 7) contour(lv - .2, { x0: -280, x1: 280, z0: -320, z1: 140, step: 2.5, op: .55, dy: .3 });
  const items = [];
  // farm tracks
  road([[0, 140], [0, 60], [0, 0], [0, -40], [0, -88], [0, -150], [-40, -260]], 4, { op: .65 }); road([[-75, -38], [75, -38]], 3.4, { op: .55, n: 6 }); road([[-30, 40], [-75, 20], [-75, -90]], 3, { op: .5 }); road([[0, 20], [75, 20], [75, -90]], 3, { op: .5 });
  // build = barn + farmhouse
  { const [x, z] = [-36, 40]; const m = house(x, z, 0, { w: 22, d: 13, h: 7, rh: 6, op: 1 }); pl(m, [[-4, 0, 6.52], [-4, 6, 6.52], [4, 6, 6.52], [4, 0, 6.52]], INK, .9); seg(m, [-4, 0, 6.53], [4, 6, 6.53], INK, .5); seg(m, [4, 0, 6.53], [-4, 6, 6.53], INK, .5); house(x - 26, z + 6, .1, { w: 10, d: 7, h: 4.5, rh: 3, chim: true, op: .9 });
    for (let k = 0; k < 4; k++) solid(CYL(.8, .8, 1.5, 12), { pos: [x + 14 + k * 1.8, .8, z + 9], rot: [0, 0, Math.PI / 2] });
    items.push({ name: 'build', st: 'done', chip: 'done · builder', at: tp(m, [0, 15, 0]) }); }
  // reviews = four fields
  const FLD = [['security', 'done', -40, -62], ['ux', 'work', 40, -62], ['ui', 'work', -40, -16], ['code', 'done', 40, -16]];
  for (const [n, st, x, z] of FLD) {
    const work = st === 'work', c = COLOR[st], w = 64, d = 38, frac = work ? (n === 'ux' ? .45 : .7) : 1;
    field(x, z, 0, w, d, c, work ? .6 : .38, frac, INK);
    if (!work) { for (let i = 0; i < 9; i++) solid(CYL(.85, .85, 1.5, 12), { pos: [x - 26 + (i % 5) * 12 + R(-2, 2), HF(x, z) + .9, z - 10 + Math.floor(i / 5) * 18 + R(-2, 2)], rot: [Math.PI / 2, R(0, 3), 0], op: .9 }); }
    else { const tx = x - w / 2 + w * frac + 2; tractor(tx, z + R(-6, 6), Math.PI / 2, GOLD, 1.5); smoke([tx + 1.8, HF(tx, z) + 6, z], 8, INK, 80, .35); const dust = dots(GOLD, 1.6, .6); for (let i = 0; i < 120; i++) dust.push(tx - R(3, 8), HF(tx, z) + R(0, 2.5), z + R(-8, 8)); }
    for (let u = -w / 2; u <= w / 2; u += 4) { seg(null, [x + u, HF(x + u, z - d / 2) + 0, z - d / 2 - 1.2], [x + u, HF(x + u, z - d / 2) + 1.3, z - d / 2 - 1.2], INK, .45); } { const r = []; for (let u = -w / 2; u <= w / 2; u += 4) r.push([x + u, HF(x + u, z - d / 2) + 1.1, z - d / 2 - 1.2]); pl(null, r, INK, .45); }
    items.push({ name: n, st, chip: `${WORD[st]} · review`, at: [x, HF(x, z) + 3, z] });
  }
  // gate = grain elevator with silos, trucks waiting
  { const z = -112; solid(BOX(8, 34, 8), { pos: [0, 17, z], color: LAB }); solid(BOX(10, 5, 10), { pos: [0, 36.5, z], color: LAB }); solid(prism(10.5, 2.5, 10.5), { pos: [0, 39, z], color: LAB }); for (let y = 4; y < 34; y += 4) seg(null, [-4, y, z + 4.02], [4, y, z + 4.02], LAB, .45);
    for (const k of [-1, 1]) for (const j of [0, 1]) { const sx = k * (11 + j * 9); solid(CYL(4, 4, 22, 16), { pos: [sx, 11, z - 2], color: LAB }); solid(new THREE.ConeGeometry(4.2, 3, 16), { pos: [sx, 23.5, z - 2], color: LAB }); for (let y = 3; y < 22; y += 3) { const r = []; for (let a = 0; a <= 16; a++) r.push([sx + Math.cos(a / 16 * 6.283) * 4.02, y, z - 2 + Math.sin(a / 16 * 6.283) * 4.02]); pl(null, r, LAB, .3); } seg(null, [0, 34, z], [sx, 24.5, z - 2], LAB, .8); }
    items.push({ name: 'gate', st: 'wait', chip: 'waiting · all 4 reviews', at: [0, 40, z] });
    for (const [x, zz] of [[-10, -98], [10, -96]]) { const m = fr(x, HF(x, zz), zz, Math.PI / 2); solid(BOX(2.4, 2.4, 2.4), { m, pos: [3.2, 1.9, 0] }); solid(BOX(6, 2, 2.4), { m, pos: [-1.4, 2.1, 0], color: LAB }); for (const lx of [-3, 3]) for (const k of [-1, 1]) solid(CYL(.55, .55, .3, 10), { m, pos: [lx, .55, k * 1.1], rot: [Math.PI / 2, 0, 0] }); } }
  // hedgerows, orchard, fields on the slopes
  for (const z of [-84, -40, 6]) for (let x = -76; x <= 76; x += 5) if (Math.abs(x) > 6) tree(x + R(-1, 1), z + R(-1, 1), R(1.1, 1.5), 'd', .7);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 7; j++) tree(52 + i * 7, 42 + j * 6, 1.3, 'd', .75);
  for (let i = 0; i < 14; i++) { const x = R(-200, 200), z = R(-260, -130); if (Math.abs(x) < 30) continue; field(x, z, R(-.3, .3), R(30, 50), R(20, 30), INK, .26); }
  let nt = 0; for (let i = 0; i < 20000 && nt < 2200; i++) { const x = R(-500, 500), z = R(-700, 140), d = Math.hypot(x, z + 40); if (d < 120) continue; const h = HF(x, z); if (h > 300) continue; if (fbm(x / 55, z / 55, 3, 51) < .52) continue; tree(x, z, R(1.8, 2.8), h > 50 ? 'c' : (rnd() < .6 ? 'd' : 'c'), .7); nt++; }
  { const d = dots(INK, 1.3, .5); for (let i = 0; i < 500; i++) { const a = R(-1.2, 1.2), e = R(.12, .5); d.push(Math.sin(a) * 3000, Math.sin(e) * 3000, -Math.cos(a) * 3000); } }
  const segs = flush();
  CAM = new THREE.PerspectiveCamera(44, W / H, .5, 6000); CAM.position.set(6, 74, 140); CAM.lookAt(0, -2, -48);
  renderer.render(scene, CAM); columnLabels(items, { top: 130 });
  chrome({ ...PIPE_CHROME, hint: 'Each <b>field is a task</b> · tractors are the agents · click one for its log' });
  return segs;
}

// ---------- HUD measurements: smallest text, text contrast on the page background, overlapping text boxes, boxes outside the frame ----------
function measureHUD() {
  const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  const bgL = lum('rgb(11,11,12)'), texts = [...document.querySelectorAll('#hud *, #ov *')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
  const boxes = texts.map(e => ({ t: e.textContent.trim().slice(0, 24), fs: parseFloat(getComputedStyle(e).fontSize), cr: (() => { const L = lum(getComputedStyle(e).color), op = +getComputedStyle(e).opacity; const l = L * op + bgL * (1 - op); return +((Math.max(l, bgL) + .05) / (Math.min(l, bgL) + .05)).toFixed(2); })() }));
  const tags = [...document.querySelectorAll('#ov .tg, #hud .tel, #hud .tab, #hud .ticks, #hud .legend, #hud .hint')].map(e => ({ c: e.className, r: e.getBoundingClientRect() }));
  const ovl = []; for (let i = 0; i < tags.length; i++) for (let j = i + 1; j < tags.length; j++) { const a = tags[i].r, b = tags[j].r; if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) ovl.push(tags[i].c + ' x ' + tags[j].c); }
  return { minFont: Math.min(...boxes.map(b => b.fs)), minContrast: boxes.reduce((m, b) => b.cr < m.cr ? b : m, { cr: 99 }), overlaps: ovl, outside: tags.filter(t => t.r.left < 0 || t.r.top < 0 || t.r.right > W || t.r.bottom > H).map(t => t.c) };
}

// =====================================================================================
// DESCENT: planet (one light per board) -> through the clouds -> board region -> fly to a port -> pipeline site
// One continuous timeline; every frame is a pure function of t, so recordings are frame-exact and repeatable.
// =====================================================================================
const D2R = Math.PI / 180, clamp01 = x => Math.min(1, Math.max(0, x)), ease = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
function sph(lat, lon, r = 100) { const a = lat * D2R, b = lon * D2R; return [r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b)]; }
function slerpV(a, b, k) { const q = new THREE.Quaternion().setFromUnitVectors(a, b); return a.clone().applyQuaternion(new THREE.Quaternion().slerp(q, k)); }
function capture(fn) { const keep = [LB, PB, FILLS, HF]; LB = new Map(); PB = new Map(); FILLS = []; HF = () => 0; fn(); const g = new THREE.Group(); flush(g); [LB, PB, FILLS, HF] = keep; scene.add(g); return g; }
let DOT_TEX = null;
function dotTex() { if (DOT_TEX) return DOT_TEX; const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.45, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return (DOT_TEX = new THREE.CanvasTexture(c)); }
// Cloud sprites fade out as they approach the camera and never exceed MAXPX on screen; without both, sprites crossing
// the near plane popped in and out as huge blobs (measured as flicker in the 100 fps test).
function cloudPoints(arr, size, op, f0, f1, MAXPX = 26) {
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
  const pr = renderer.getPixelRatio(), m = new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
    uniforms: { map: { value: dotTex() }, color: { value: new THREE.Color(INK) }, opacity: { value: op }, size: { value: size }, scale: { value: H * pr / 2 }, f0: { value: f0 }, f1: { value: f1 }, maxPx: { value: MAXPX * pr } },
    vertexShader: `uniform float size, scale, f0, f1, maxPx; varying float vA;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); float d = -mv.z; vA = smoothstep(f0, f1, d); gl_PointSize = min(size * scale / max(d, .001), maxPx); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform sampler2D map; uniform vec3 color; uniform float opacity; varying float vA;
void main(){ float a = texture2D(map, gl_PointCoord).a * opacity * vA; if (a < .003) discard; gl_FragColor = vec4(color, a);
#include <colorspace_fragment>
}` });
  const p = new THREE.Points(g, m); scene.add(p); return p;
}

// Board figures are real (task count, spend, blocked tasks); the You Should Know working / needs-you states are staged.
const BOARDS = [
  { name: 'Hermes Approvals Ui', n: 21, st: 'fail', chip: 'Needs you · 21 tasks', lat: 36, lon: -30 },
  { name: 'Hermes Wiki Automation', n: 6, st: 'done', chip: 'Done · 6 tasks', lat: 2, lon: -40 },
  { name: 'Sap Systems', n: 26, st: 'fail', chip: 'Needs you · 26 tasks', lat: -12, lon: 30 },
  { name: 'Starlights Pilot', n: 6, st: 'done', chip: 'Done · 6 tasks', lat: 44, lon: 28 },
  { name: 'Subagent Watch', n: 12, st: 'done', chip: 'Done · 12 tasks', lat: -22, lon: -14 },
  { name: 'Wiki Recall', n: 6, st: 'done', chip: 'Done · 6 tasks', lat: 14, lon: 46 },
  { name: 'You Should Know', n: 60, st: 'work', chip: 'Working · 60 tasks', lat: 18, lon: 2 },
];
function landF(lat, lon) { let v = fbm(lon / 24 + 40, lat / 24 + 40, 5, 61) * 1.05; for (const b of BOARDS) { const dl = (lon - b.lon) * Math.cos(lat * D2R), d2 = dl * dl + (lat - b.lat) ** 2; v += .2 * Math.exp(-d2 / 70); } return v; }
const DETAIL = [4, 32, -12, 16]; // lat0, lat1, lon0, lon1 around the target board
const inDetail = (la, lo) => la >= DETAIL[0] && la < DETAIL[1] && lo >= DETAIL[2] && lo < DETAIL[3];
function sphContour(levels, color, op, r, box = [-80, 80, -150, 150], s = .6, skip = false) {
  const nx = Math.round((box[3] - box[2]) / s), nz = Math.round((box[1] - box[0]) / s), v = new Float32Array((nx + 1) * (nz + 1)), arr = lines(color, op);
  for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) v[j * (nx + 1) + i] = landF(box[0] + j * s, box[2] + i * s);
  for (const lv of levels) for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    if (skip && inDetail(box[0] + (j + .5) * s, box[2] + (i + .5) * s)) continue;
    const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => [box[2] + a * s, box[0] + b * s, v[b * (nx + 1) + a] - lv]), p = [];
    for (let e = 0; e < 4; e++) { const A = c[e], B = c[(e + 1) % 4]; if ((A[2] < 0) !== (B[2] < 0)) { const t = A[2] / (A[2] - B[2]); p.push(sph(A[1] + (B[1] - A[1]) * t, A[0] + (B[0] - A[0]) * t, r)); } }
    if (p.length >= 2) arr.push(...p[0], ...p[1]); if (p.length === 4) arr.push(...p[2], ...p[3]);
  }
}
let rimRings = [], DETAIL_G = null;
function buildPlanet() {
  seed = 23; scene.fog = null; const TH = .52;
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(99.7, 160, 120), fillMat));
  const g = lines(INK, .1); for (let lat = -75; lat <= 75; lat += 15) for (let lon = -180; lon < 180; lon += 2) g.push(...sph(lat, lon, 100.02), ...sph(lat, lon + 2, 100.02));
  for (let lon = -180; lon < 180; lon += 15) for (let lat = -88; lat < 88; lat += 2) g.push(...sph(lat, lon, 100.02), ...sph(lat + 2, lon, 100.02));
  const Lh = lines(INK, .34), Oc = lines(INK, .09), st = .7;
  for (let j = 0; j * st <= 156; j++) { const lat = -78 + j * st; for (let lon = -150; lon < 150; lon += st) { if (landF(lat, lon + st / 2) > TH) Lh.push(...sph(lat, lon, 100.05), ...sph(lat, lon + st, 100.05)); else if (j % 5 === 0) Oc.push(...sph(lat, lon, 100.02), ...sph(lat, lon + st, 100.02)); } }
  sphContour([TH], INK, .95, 100.08); sphContour([TH + .06, TH + .12, TH + .18, TH + .24], INK, .42, 100.07);
  // close-range detail around the target board: its own layer, faded in by altitude in planetCam (drawn at full strength
  // from orbit it showed as a brighter square on the globe)
  DETAIL_G = capture(() => { const Lf = lines(INK, .3), s2 = .22; for (let j = 0; j * s2 < DETAIL[1] - DETAIL[0]; j++) { const lat = DETAIL[0] + j * s2; for (let lon = DETAIL[2]; lon < DETAIL[3] - 1e-6; lon += s2) if (landF(lat, lon + s2 / 2) > TH) Lf.push(...sph(lat, lon, 100.06), ...sph(lat, lon + s2, 100.06)); }
    sphContour([TH + .03, TH + .09, TH + .15, TH + .21], INK, .38, 100.07, DETAIL, .15); });
  DETAIL_G.children.forEach(c => { c.userData.base = c.material.opacity; c.material.transparent = true; });
  const items = [];
  // city dots sit at r=100.35, high enough to clear the fill sphere at the limb (at 100.12 they blinked there)
  for (const b of BOARDS) {
    const c = COLOR[b.st], rr = 1.2 + Math.sqrt(b.n) * .45, pts = [], dI = dots(INK, 2, .9), dC = dots(c, 2.4, 1);
    for (let i = 0; i < 30 + b.n * 7; i++) { const a = rnd() * 6.283, r = rr * Math.sqrt(rnd()) * (rnd() < .2 ? 1.8 : 1), p = sph(b.lat + Math.sin(a) * r, b.lon + Math.cos(a) * r / Math.cos(b.lat * D2R), 100.35); pts.push(p); (i % 4 === 0 ? dC : dI).push(...p); }
    const L = lines(c, .45); for (let i = 0; i < pts.length; i++) { let best = -1, bd = 1e9; for (let j = 0; j < pts.length; j++) { if (j === i) continue; const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1], pts[i][2] - pts[j][2]); if (d < bd) { bd = d; best = j; } } if (bd < rr * .7) L.push(...pts[i], ...pts[best]); }
    items.push({ name: b.name, st: b.st, chip: b.chip, at: sph(b.lat, b.lon, 100.3) });
  }
  { const d = dots(INK, 1.3, .55); for (let i = 0; i < 1500; i++) d.push(...sph(R(-85, 85), R(-180, 180), 3000)); }
  // cloud shell (dots); one bank sits on the descent path so the camera passes through it
  { const cp = []; for (let i = 0; i < 260000; i++) { const la = R(-70, 70), lo = R(-120, 120), dl = (lo - 2.4) * Math.cos(la * D2R), d2 = dl * dl + (la - 18.6) ** 2; const v = fbm(lo / 9 + 7, la / 9 + 3, 4, 71); if (v < .62) continue; cp.push(...sph(la, lo, 103.6 + R(-.7, .7))); } cloudPoints(cp, .5, .32, 1.5, 6); }
  flush();
  const rim = new THREE.Group(); rimRings = [[100, .55], [101.6, .25], [104.5, .1]].map(([r, o]) => { const pts = []; for (let i = 0; i <= 256; i++) { const a = i / 256 * 6.283; pts.push(Math.cos(a), Math.sin(a), 0); } const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3)); const l = new THREE.Line(gg, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: o, depthTest: false })); l.userData = { r, o }; rim.add(l); return l; }); scene.add(rim);
  return items;
}

// Camera choreography. Two continuous zooms: (1) planet -> region, (2) region -> port site. Each zoom is one log-distance
// curve whose speed rises as sin^2, cruises, and falls as sin^2 (glide), so speed never kinks. The scene crossfade sits
// inside the cruise where both cameras descend at the same log rate, so the two blended images move together.
function glide(t, a, b, r1, r2) {
  const L = b - a, x = Math.min(Math.max(t - a, 0), L), area = r1 / 2 + (L - r1 - r2) + r2 / 2, ramp = (s, r) => s / 2 - r / (2 * Math.PI) * Math.sin(Math.PI * s / r);
  return (x <= r1 ? ramp(x, r1) : x <= L - r2 ? r1 / 2 + x - r1 : area - ramp(L - x, r2)) / area;
}
const se = u => .5 - .5 * Math.cos(Math.PI * clamp01(u)); // sine ease: zero speed at both ends, continuous acceleration
const solveT = (f, target, a, b) => { for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (f(m) < target) a = m; else b = m; } return (a + b) / 2; };
const dirHP = (h, p) => new THREE.Vector3(Math.cos(p) * Math.sin(h), Math.sin(p), Math.cos(p) * Math.cos(h));
// zoom 1: planet altitude 260 -> 40 hands over to the region camera at 1500 from its look point, which then descends to 788
const Z1 = { a: .8, b: 8.3, r1: 1.2, r2: 2.6 }, LP0 = Math.log(260), LPX = Math.log(40), LRX = Math.log(1500), LR1 = Math.log(788), LT1 = (LP0 - LPX) + (LRX - LR1);
const S1 = t => glide(t, Z1.a, Z1.b, Z1.r1, Z1.r2) * LT1;
// zoom 2: region camera 788 -> 150 from the port (pans and turns on the way), hands over to the site camera at 716 -> 313
// zoom 2 starts after the 2.2 s region hold with the click
const Z2 = { a: Z1.b + 2.2, b: Z1.b + 12.7, r1: 1.4, r2: 2.6 }, LF1 = Math.log(150), LSX = Math.log(716), LS1 = Math.log(313), LT2 = (LR1 - LF1) + (LSX - LS1);
const S2 = t => glide(t, Z2.a, Z2.b, Z2.r1, Z2.r2) * LT2;
const tx1 = solveT(S1, LP0 - LPX, Z1.a, Z1.b), tx2 = solveT(S2, LR1 - LF1, Z2.a, Z2.b);
const T = { pOut0: .8, pOut1: 1.3, x1a: tx1 - .45, x1b: tx1 + .45, rIn0: Z1.b, rIn1: Z1.b + .5, click: Z1.b + 1.5, rOut0: Z2.a, rOut1: Z2.a + .4, x2a: tx2 - .45, x2b: tx2 + .45, sIn0: Z2.b, sIn1: Z2.b + .5, end: Z2.b + 3.4 };
window.__phases = [['planet', 0, T.x1a], ['cross planet>region', T.x1a, T.x1b], ['region descent', T.x1b, Z1.b], ['region hold+click', Z1.b, Z2.a], ['fly to port', Z2.a, T.x2a], ['cross region>site', T.x2a, T.x2b], ['site descent', T.x2b, Z2.b], ['site hold', Z2.b, T.end]].map(([n, a, b]) => [n, +a.toFixed(3), +b.toFixed(3)]);
const PC = new THREE.PerspectiveCamera(40, W / H, .05, 9000), RC = new THREE.PerspectiveCamera(40, W / H, 1, 9000), SC = new THREE.PerspectiveCamera(46, W / H, .5, 7000);
const P0dir = new THREE.Vector3(...sph(24, 5, 1)), Pn = new THREE.Vector3(...sph(18, 2, 1)), tN = new THREE.Vector3(0, 1, 0).sub(Pn.clone().multiplyScalar(Pn.y)).normalize();
const PEndDir = Pn.clone().multiplyScalar(112).add(tN.clone().multiplyScalar(-.6)).normalize(), PLook = Pn.clone().multiplyScalar(100);
function planetCam(t) {
  const S = S1(t), alt = Math.exp(LP0 - S);
  // sideways travel happens while still high (S < 1.2, altitude > 78) so it barely moves on screen
  PC.position.copy(slerpV(P0dir, PEndDir, se(S / 1.2))).multiplyScalar(100 + alt); PC.up.copy(new THREE.Vector3(0, 1, 0).lerp(tN, se((S - .5) / 2)).normalize());
  PC.lookAt(new THREE.Vector3().lerp(PLook, se((S - .5) / 2))); PC.near = Math.max(.02, alt * .05); PC.updateProjectionMatrix(); PC.updateMatrixWorld();
  if (DETAIL_G) DETAIL_G.children.forEach(c => { c.material.opacity = c.userData.base * sm(90, 50, alt); c.visible = alt < 90; });
  const d = PC.position.length(), n = PC.position.clone().normalize();
  for (const l of rimRings) { const r = l.userData.r; if (d <= r * 1.001) { l.visible = false; continue; } l.visible = true; l.position.copy(n).multiplyScalar(r * r / d); l.scale.setScalar(r * Math.sqrt(1 - (r / d) ** 2)); l.lookAt(PC.position); l.material.opacity = l.userData.o * sm(6, 40, alt); }
}
const RLook = new THREE.Vector3(100, 0, -50), REnd = new THREE.Vector3(110, 430, 610), RStart = new THREE.Vector3(100, 1500, 10); let FlyLook, regionScene, siteScene, planetScene;
const RTop = RStart.clone().sub(RLook).normalize(), RDir = REnd.clone().sub(RLook).normalize(), RH0 = Math.atan2(RDir.x, RDir.z), RP0 = Math.asin(RDir.y);
// pan and turn are spread evenly over time (not over zoom progress, which is slow at first and bunched the turn up)
// the port is approached from 40 deg west of the overview heading (sea ends up 50 deg right of straight ahead); the site camera
// starts 40 deg the other way round and turns back to straight. The turn is shared so neither camera moves too fast; the
// two views still differ by 10 deg at the crossfade (a full match pushed the fly above the speed limit)
const FH = RH0 - 40 * D2R, FP = 28 * D2R, SH0 = 40 * D2R;
function regionCam(t) {
  const Lr = LR1 + (LT1 - S1(t)), q = clamp01((LRX - Lr) / (LRX - LR1)), s2 = S2(t), p = se((t - Z2.a) / (T.x2a - .1 - Z2.a));
  const look = RLook.clone().lerp(FlyLook, p), dir = s2 > 0 ? dirHP(lerp(RH0, FH, p), lerp(RP0, FP, p)) : slerpV(RTop, RDir, se(q));
  RC.position.copy(look).addScaledVector(dir, Math.exp(Lr - s2)); RC.up.set(0, 1, 0); RC.lookAt(look); RC.updateMatrixWorld();
  const d = RC.position.distanceTo(look); regionScene.fog.near = d * .9 + 150; regionScene.fog.far = regionScene.fog.near + 1700;
}
const SLook = new THREE.Vector3(0, -10, -70), SEnd = new THREE.Vector3(0, 120, 215), SStart = new THREE.Vector3(-20, 330, 560), SP0 = Math.atan2(340, 630), SP1 = Math.atan2(130, 285);
function siteCam(t) {
  const Ls = LS1 + (LT2 - S2(t)), q = se((LSX - Ls) / (LSX - LS1)), turn = se((t - T.x2a) / (Z2.b - .4 - T.x2a));
  SC.position.copy(SLook).addScaledVector(dirHP(lerp(SH0, 0, turn), lerp(SP0, SP1, q)), Math.exp(Ls)); SC.lookAt(SLook); SC.updateMatrixWorld();
  const k = SC.position.distanceTo(SLook) / 313; siteScene.fog.near = 110 * k; siteScene.fog.far = 900 * k;
}
let fbA, fbB, blendMat, quadScene, quadCam, SNAP = {}, curPh = '', PICK = null, pickEl;
function draw(s, c) { renderer.setRenderTarget(null); renderer.render(s, c); }
// Crossfade: both scenes are drawn straight to the canvas exactly as outside a crossfade, each finished frame is copied
// into a texture, and the two copies are mixed. At k=0 / k=1 the output equals the plain frame, so nothing jumps when a
// crossfade starts or ends (rendering into a separate linear render target made the crossfade ~40% brighter and popped).
function blend(sa, ca, sb, cb, k) { renderer.setRenderTarget(null); renderer.render(sb, cb); renderer.copyFramebufferToTexture(fbB); renderer.render(sa, ca); renderer.copyFramebufferToTexture(fbA); blendMat.uniforms.k.value = k; renderer.render(quadScene, quadCam); }
function frame(t) {
  planetCam(t); regionCam(t); siteCam(t); for (const m of ANIM.movers) m(t);
  const k1 = sm(T.x1a, T.x1b, t), k2 = sm(T.x2a, T.x2b, t);
  if (k1 <= 0) draw(planetScene, PC); else if (k1 < 1) blend(planetScene, PC, regionScene, RC, k1); else if (k2 <= 0) draw(regionScene, RC); else if (k2 < 1) blend(regionScene, RC, siteScene, SC, k2); else draw(siteScene, SC);
  const ph = t < T.x1a ? 'planet' : t < T.x2a ? 'region' : 'site';
  // SNAP holds markup produced by chrome()/placeLabels(); every data string in it already went through esc().
  if (ph !== curPh) { hud.innerHTML = SNAP[ph].hud; ov.innerHTML = SNAP[ph].ov; curPh = ph; }
  const o = ph === 'planet' ? 1 - sm(T.pOut0, T.pOut1, t) : ph === 'region' ? sm(T.rIn0, T.rIn1, t) * (1 - sm(T.rOut0, T.rOut1, t)) : sm(T.sIn0, T.sIn1, t);
  hud.style.opacity = ov.style.opacity = o;
  const p = (t - T.click) / .7; pickEl.style.display = ph === 'region' && p > 0 && p < 1 ? 'block' : 'none';
  if (pickEl.style.display === 'block') { const s = 12 + 60 * p; Object.assign(pickEl.style, { left: PICK[0] - s / 2 + 'px', top: PICK[1] - s / 2 + 'px', width: s + 'px', height: s + 'px', opacity: 1 - p }); }
  if (ph === 'region') { const tg = [...ov.querySelectorAll('.tg')].find(e => e.textContent.includes('note-actions r1')); if (tg) tg.querySelector('.chip').style.boxShadow = t > T.click ? '0 0 0 1px #e0a944, 0 0 16px rgba(224,169,68,.55)' : ''; }
}
function runDescent() {
  const t0 = performance.now(); ANIM = { movers: [] }; window.__measures = {};
  const reset = () => { LB = new Map(); PB = new Map(); FILLS = []; OBS.clear(); };
  // planet
  reset(); planetScene = scene = new THREE.Scene(); const pItems = buildPlanet(); planetCam(0); CAM = PC; renderer.render(scene, PC);
  placeLabels(pItems, []); chrome({ tab: 'All boards · 3 need you', tabCol: '#ec6a84', ticks: { label: '4/7 boards clear', list: BOARDS.map(b => b.st) }, tl: [['Boards', '7'], ['Tasks', '137'], ['Spent', '$218.66']], tr: [['Working', '02'], ['Needs you', '03'], ['Done', '129']], hint: 'Each <b>light is a board</b> · click one to fly down to it' });
  SNAP.planet = { hud: hud.innerHTML, ov: ov.innerHTML }; window.__measures.planet = measureHUD();
  // region (You Should Know) + cloud banks above it
  reset(); regionScene = scene = new THREE.Scene(); buildRegion('mixed');
  { const cp = []; for (let k = 0; k < 8; k++) { const cx = R(-250, 450), cy = R(800, 1250), cz = R(-400, 300), rx = R(220, 400); for (let i = 0; i < 6000; i++) { const u = R(-1, 1), v = R(-1, 1), q = u * u + v * v; if (q > 1 || fbm(u * 2 + k, v * 2, 3, 81) < .45 + q * .2) continue; cp.push(cx + u * rx, cy + R(-40, 40) * (1 - q), cz + v * rx * .7); } } cloudPoints(cp, 6, .22, 350, 800); } // clouds closer than ~350 sweep across the screen too fast while the camera passes the layer (measured as flicker)
  const it = window.__regionItems.find(q => q.name === 'note-actions r1'); FlyLook = new THREE.Vector3(...it.at).add(new THREE.Vector3(30, -14, 0)); PICK = proj(it.at);
  SNAP.region = { hud: hud.innerHTML, ov: ov.innerHTML }; window.__measures.region = measureHUD();
  // site (note-actions r1 port)
  reset(); siteScene = scene = new THREE.Scene(); buildHarborSite(); SNAP.site = { hud: hud.innerHTML, ov: ov.innerHTML }; window.__measures.site = measureHUD();
  // crossfade copies of the finished canvas frames (already display-encoded, so the mix needs no colour conversion)
  const dbs = renderer.getDrawingBufferSize(new THREE.Vector2()), mk = () => { const t = new THREE.FramebufferTexture(dbs.x, dbs.y); t.minFilter = t.magFilter = THREE.NearestFilter; return t; }; fbA = mk(); fbB = mk();
  blendMat = new THREE.ShaderMaterial({ uniforms: { a: { value: fbA }, b: { value: fbB }, k: { value: 0 } }, depthTest: false, depthWrite: false,
    vertexShader: `varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader: `uniform sampler2D a, b; uniform float k; varying vec2 vUv;
void main(){ gl_FragColor = mix(texture2D(a, vUv), texture2D(b, vUv), k); }` });
  quadScene = new THREE.Scene(); quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blendMat)); quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  pickEl = document.createElement('div'); Object.assign(pickEl.style, { position: 'absolute', border: '1.5px solid #e0a944', borderRadius: '50%', pointerEvents: 'none', display: 'none', zIndex: 5 }); document.getElementById('stage').appendChild(pickEl);
  window.__seek = t => frame(t); window.__T = T;
  // Motion probe: screen flow of each camera. A 39x29 grid of screen points is cast onto the ground (planet: the sphere,
  // region/site: the y=0 plane); after dt seconds the same world points are re-projected. Returns per time step the
  // median displacement (px per dt) and the median displacement vector, so speed jumps and direction reversals show up.
  window.__motion = (t0, t1, dt = .01) => {
    const grid = []; for (let gy = 1; gy < 30; gy++) for (let gx = 1; gx < 40; gx++) grid.push(new THREE.Vector2(gx / 20 - 1, gy / 15 - 1));
    const rc = new THREE.Raycaster(), med = a => { const b = [...a].sort((x, y) => x - y); return b[b.length >> 1]; };
    const hit = (cam, ndc, sphere) => { rc.setFromCamera(ndc, cam); const o = rc.ray.origin, d = rc.ray.direction;
      if (sphere) { const b = o.dot(d), c = o.lengthSq() - 1e4, q = b * b - c; if (q < 0) return null; const k = -b - Math.sqrt(q); return k > 0 ? o.clone().addScaledVector(d, k) : null; }
      const k = -o.y / d.y; return k > 0 ? o.clone().addScaledVector(d, k) : null; };
    const flow = (fn, cam, sphere, t) => { fn(t); const pts = grid.map(g => [g, hit(cam, g, sphere)]).filter(x => x[1]); if (pts.length < 6) return null; fn(t + dt);
      const v = pts.map(([g, p]) => { const q = p.clone().project(cam); return [(q.x - g.x) * W / 2, (g.y - q.y) * H / 2]; });
      return [+med(v.map(x => Math.hypot(...x))).toFixed(3), +med(v.map(x => x[0])).toFixed(2), +med(v.map(x => x[1])).toFixed(2), pts.length]; };
    const out = []; for (let t = t0; t < t1 - 1e-9; t += dt) out.push({ t: +t.toFixed(3), p: flow(planetCam, PC, true, t), r: flow(regionCam, RC, false, t), s: flow(siteCam, SC, false, t), k1: +sm(T.x1a, T.x1b, t).toFixed(3), k2: +sm(T.x2a, T.x2b, t).toFixed(3) });
    return JSON.stringify(out);
  };
  window.__bench = () => { const gl = renderer.getContext(), out = {}; for (const [nm, tt] of window.__phases.map(([n, a, b]) => [n, (a + b) / 2])) { frame(tt); gl.finish(); const a = performance.now(); for (let i = 0; i < 20; i++) frame(tt + i * .002); gl.finish(); out[nm] = +((performance.now() - a) / 20).toFixed(1); } return out; };
  window.__ok = { view, ms: Math.round(performance.now() - t0), movers: ANIM.movers.length };
  frame(0); window.__ready = true;
  if (!new URLSearchParams(location.search).get('rec')) { const s0 = performance.now(); const loop = () => { frame(((performance.now() - s0) / 1000) % T.end); requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
}

if (KIND === 'descent') runDescent();
else {
  const t0 = performance.now();
  const segs = LEVEL === 'region' ? buildRegion(KIND) : KIND === 'village' ? buildVillageSite() : KIND === 'harbor' ? buildHarborSite() : buildFarmSite();
  window.__ok = { view, segs, ms: Math.round(performance.now() - t0) };
  window.__measure = measureHUD();
}
