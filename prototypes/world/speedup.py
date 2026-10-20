"""Load-time speed-ups for the world view that keep the geometry the same (checked by rendering frames before/after).
1) solid(): outline edges are computed once per shape and reused. A shape and a uniformly scaled copy of it (cone,
   icosahedron, sphere, cylinder) or a per-axis scaled box (its faces stay at 90 deg) have the same edges, scaled, so
   the cache stores edges divided by that scale (D) and each instance multiplies its own D back in, then applies its
   rigid transform (fr / mul: rotation + translation, which keeps face angles).
2) the region height field is memoised per exact (x, z): terrain rows, columns and contours ask for the same points.
3) the river distance is only used below 32 units (`dr < 32`): dPolyLim skips 8-segment chunks whose bounding box is
   that far or farther than the best distance so far, so values below the limit are the same as dPoly's.
Usage: python speedup.py (edits planet.js in place; every match must be unique)."""
p = 'planet.js'; s = open(p, encoding='utf-8').read()
def R(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:90]); s = s.replace(a, b)

HELPERS = r"""const EDGE_CACHE = new Map();
const SIM = { ConeGeometry: ['radius', 'height'], IcosahedronGeometry: ['radius'], SphereGeometry: ['radius'], CylinderGeometry: ['radiusTop', 'radiusBottom', 'height'], OctahedronGeometry: ['radius'], DodecahedronGeometry: ['radius'] };
function edgeKey(g, o) {
  const P = g.parameters; if (!P) return [null, [1, 1, 1]]; const q = { ...P }; let D = [1, 1, 1];
  if (g.type === 'BoxGeometry') { D = [P.width, P.height, P.depth]; q.width = q.height = q.depth = 1; }
  else if (SIM[g.type]) { const u = SIM[g.type].map(k => P[k]).find(v => v > 0) || 1; D = [u, u, u]; for (const k of SIM[g.type]) q[k] = +(P[k] / u).toFixed(9); }
  const sc = o.sc ? (Array.isArray(o.sc) ? o.sc : [o.sc, o.sc, o.sc]) : null, box = g.type === 'BoxGeometry';
  if (sc) D = D.map((v, i) => v * sc[i]);
  const shape = sc && !box && !(sc[0] === sc[1] && sc[1] === sc[2]) ? sc.map(v => +(v / sc[0]).toFixed(9)).join(',') : '';
  return [g.type + JSON.stringify(q) + '|' + shape + '|' + (o.thr ?? 25), D];
}
function memoHF(f) { const M = new Map(); return (x, z) => { let r = M.get(x); if (!r) M.set(x, r = new Map()); let h = r.get(z); if (h === undefined) r.set(z, h = f(x, z)); return h; }; }
const POLY_CHUNKS = new WeakMap();
function dPolyLim(x, z, P, lim) {
  let C = POLY_CHUNKS.get(P);
  if (!C) { C = []; for (let i = 0; i < P.length - 1; i += 8) { const Q = P.slice(i, Math.min(P.length, i + 9)), xs = Q.map(p => p[0]), zs = Q.map(p => p[1]); C.push({ Q, x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) }); } POLY_CHUNKS.set(P, C); }
  let m = 1e9;
  for (const c of C) { const bd = Math.hypot(Math.max(0, c.x0 - x, x - c.x1), Math.max(0, c.z0 - z, z - c.z1)); if (bd >= lim || bd >= m) continue; for (let i = 0; i < c.Q.length - 1; i++) { const a = c.Q[i], b = c.Q[i + 1]; m = Math.min(m, dSeg(x, z, a[0], a[1], b[0], b[1])); } }
  return m;
}
"""
R("function solid(g, o = {}) {\n  if (o.sc) g.scale(...(Array.isArray(o.sc) ? o.sc : [o.sc, o.sc, o.sc]));\n  const p = o.pos || [0, 0, 0], r = o.rot || [0, 0, 0]; let m = fr(p[0], p[1], p[2], r[1], r[0], r[2]); if (o.m) m = mul(o.m, m); g.applyMatrix4(m);\n  const e = new THREE.EdgesGeometry(g, o.thr ?? 25).attributes.position.array,",
  HELPERS +
  "function solid(g, o = {}) {\n  if (o.sc) g.scale(...(Array.isArray(o.sc) ? o.sc : [o.sc, o.sc, o.sc]));\n"
  "  const [ek, D] = edgeKey(g, o); let e0 = ek && EDGE_CACHE.get(ek);\n"
  "  if (ek && !e0) { e0 = Float64Array.from(new THREE.EdgesGeometry(g, o.thr ?? 25).attributes.position.array, (v, i) => v / D[i % 3]); EDGE_CACHE.set(ek, e0); }\n"
  "  const p = o.pos || [0, 0, 0], r = o.rot || [0, 0, 0]; let m = fr(p[0], p[1], p[2], r[1], r[0], r[2]); if (o.m) m = mul(o.m, m); g.applyMatrix4(m);\n"
  "  const e = e0 ? (() => { const q = new Float32Array(e0.length), v = new THREE.Vector3(); for (let i = 0; i < q.length; i += 3) { v.set(e0[i] * D[0], e0[i + 1] * D[1], e0[i + 2] * D[2]).applyMatrix4(m); q[i] = v.x; q[i + 1] = v.y; q[i + 2] = v.z; } return q; })() : new THREE.EdgesGeometry(g, o.thr ?? 25).attributes.position.array,")
R("HF = WORLD ? WORLD.blendH(WORLD.portHF(f, S)) : f;", "HF = WORLD ? memoHF(WORLD.blendH(WORLD.portHF(f, S))) : f;")
R("const dr = dPoly(x, z, RIV); if (dr < 32)", "const dr = dPolyLim(x, z, RIV, 32); if (dr < 32)")
open(p, 'w', encoding='utf-8').write(s); print('speed-patched')
