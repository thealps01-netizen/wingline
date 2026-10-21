import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const WORLD_PALETTE = {
  bg: '#0b0b0c',
  ink: '#ece8de',
  gold: '#e0a944',
  red: '#ec6a84',
  lab: '#a3a096'
}
const PAL = WORLD_PALETTE
const W = 1180
const H = 900
const RATE = 4
const MIN_FPS = 30
const num = c => parseInt(c.slice(1), 16)
const BG = num(PAL.bg)
const INK = num(PAL.ink)
const GOLD = num(PAL.gold)
const RED = num(PAL.red)
const LAB = num(PAL.lab)
const HEX = { done: PAL.ink, work: PAL.gold, fail: PAL.red, wait: PAL.lab }
const COLOR = { done: INK, work: GOLD, fail: RED, wait: LAB }
const TONE = { fail: PAL.red, work: PAL.gold }
const SLICE = { end: Infinity, n: 0, ms: 12 }
const PHASES = ['planet', 'region', 'site']
const KIND_OF = { planet: 'board', region: 'pipe', site: 'task' }

const CSS = `
.wlw{position:relative;width:100%;height:100%;overflow:hidden;background:${PAL.bg};user-select:none}
.wlw-stage{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;color:${PAL.ink};font:12px/1.45 "Cascadia Mono","Cascadia Code",Consolas,monospace;-webkit-font-smoothing:antialiased}
.wlw-stage canvas{display:block;width:${W}px!important;height:${H}px!important}
.wlw .vig{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 200px ${PAL.bg}bf;background:linear-gradient(${PAL.bg}cc 0,transparent 11%,transparent 91%,${PAL.bg}d9 100%)}
.wlw .layer{position:absolute;inset:0;pointer-events:none;visibility:hidden}
.wlw .layer.on{visibility:visible}
.wlw svg.lead{position:absolute;inset:0;overflow:visible}
.wlw .tg{position:absolute;white-space:nowrap;pointer-events:auto;cursor:pointer;outline:none}
.wlw .layer.dim .tg,.wlw .layer.dim .back{pointer-events:none}
.wlw .tg:hover .n,.wlw .tg:focus-visible .n{text-decoration:underline;text-underline-offset:3px}
.wlw .tg .n{font-size:12.5px;color:${PAL.ink};text-shadow:0 0 4px ${PAL.bg},0 0 10px ${PAL.bg}}
.wlw .tg.r{text-align:right}
.wlw .chip{display:inline-flex;align-items:center;gap:7px;height:21px;padding:0 8px;margin-top:3px;border:1px solid ${PAL.ink}52;font-size:11.5px;letter-spacing:.07em;text-transform:uppercase;background:${PAL.bg}e6}
.wlw .chip i{width:7px;height:7px;background:${PAL.lab}}
.wlw .chip.work{border-color:${PAL.gold};color:${PAL.gold}}.wlw .chip.work i{background:${PAL.gold}}
.wlw .chip.fail{border-color:${PAL.red};color:${PAL.red}}.wlw .chip.fail i{background:${PAL.red}}
.wlw .chip.wait{color:${PAL.lab}}.wlw .chip.wait i{background:none;border:1px dashed ${PAL.lab}}
.wlw .tel{position:absolute;top:16px;font-size:12px;line-height:1.75;white-space:nowrap}
.wlw .tel.l{left:20px}.wlw .tel.r{right:20px;text-align:right}
.wlw .tel .k{color:${PAL.lab};text-transform:uppercase;letter-spacing:.08em}
.wlw .tel b{font-weight:600;margin-left:8px}
.wlw .tel.l .k::before{content:"▸  ";color:${PAL.lab}99}
.wlw .tel.r b::after{content:"  ◂";color:${PAL.lab}99;font-weight:400}
.wlw .tab{position:absolute;top:18px;height:30px;display:flex;align-items:center;gap:10px;padding:0 30px 0 12px;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
.wlw .tab svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.wlw .tab span{position:relative}
.wlw .tab .back{color:${PAL.gold};border-right:1px solid ${PAL.gold}73;padding-right:10px;text-transform:none;letter-spacing:.02em;pointer-events:auto;cursor:pointer}
.wlw .tab .back:hover{text-decoration:underline;text-underline-offset:3px}
.wlw .ticks{position:absolute;top:54px;display:flex;align-items:center;gap:8px;font-size:11.5px;white-space:nowrap}
.wlw .ticks .n{border:1px solid ${PAL.ink}52;padding:0 5px;line-height:18px;background:${PAL.bg}cc}
.wlw .ticks .bar{display:flex;gap:2px}.wlw .ticks .bar i{width:3px;height:12px;background:${PAL.lab}}
.wlw .ticks .bar i.work{background:${PAL.gold}}.wlw .ticks .bar i.fail{background:${PAL.red}}
.wlw .legend{position:absolute;right:20px;bottom:14px;display:flex;gap:16px;font-size:11.5px;color:${PAL.lab};text-transform:uppercase;letter-spacing:.08em}
.wlw .legend span{display:flex;align-items:center;gap:7px}.wlw .legend i{width:9px;height:9px;background:${PAL.ink}}
.wlw .legend i.work{background:${PAL.gold}}.wlw .legend i.fail{background:${PAL.red}}.wlw .legend i.wait{background:none;border:1px dashed ${PAL.ink}}
.wlw .hint{position:absolute;left:20px;bottom:14px;font-size:11.5px;color:${PAL.lab}}
.wlw .beacon{position:absolute;width:0;height:0}
.wlw .beacon::before,.wlw .beacon::after{content:"";position:absolute;border:1.5px solid ${PAL.red};border-radius:50%;left:-7px;top:-7px;width:14px;height:14px}
.wlw .beacon::after{left:-14px;top:-14px;width:28px;height:28px;opacity:.4}
.wlw .beacon i{position:absolute;left:-3px;top:-3px;width:6px;height:6px;border-radius:50%;background:${PAL.red}}
.wlw .wlw-note{position:absolute;left:50%;bottom:44px;transform:translateX(-50%);padding:4px 10px;font:11.5px/1.45 "Cascadia Mono","Cascadia Code",Consolas,monospace;letter-spacing:.12em;text-transform:uppercase;color:${PAL.lab};background:${PAL.bg}cc;border:1px solid ${PAL.ink}52;pointer-events:none}
.wlw .wlw-note:empty{display:none}
`

const el = (tag, cls, text) => {
  const e = document.createElement(tag)
  if (cls) e.className = cls
  if (text !== undefined && text !== null) e.textContent = String(text)
  return e
}
const SVGNS = 'http://www.w3.org/2000/svg'
const sv = (tag, attrs) => {
  const e = document.createElementNS(SVGNS, tag)
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v))
  return e
}
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function labelEl(q, side) {
  const t = el('div', side ? `tg ${side}` : 'tg')
  if (q.id) t.dataset.id = q.id
  t.tabIndex = 0
  t.setAttribute('role', 'button')
  const chip = el('span', q.st === 'done' ? 'chip' : `chip ${q.st}`)
  chip.append(el('i'), String(q.chip))
  t.append(el('div', 'n', q.name), chip)
  return t
}

function beacon(p) {
  const b = el('div', 'beacon')
  b.style.left = `${p[0]}px`
  b.style.top = `${p[1]}px`
  b.append(el('i'))
  return b
}

function sigOf(d) {
  const u = x => x && [x.id, x.st, x.label, x.chip]
  return JSON.stringify([
    d.region?.slug,
    d.boards.map(b => [b.slug, b.st, b.chip, b.labeled, b.lat, b.lon]),
    (d.region?.pipelines || []).map(p => [p.key, p.place, p.st, p.label, p.chip, p.units.map(u), u(p.gate)])
  ])
}

function gpuProblem() {
  if (typeof WebGL2RenderingContext === 'undefined') return 'no WebGL2'
  const gl = document.createElement('canvas').getContext('webgl2')
  if (!gl) return 'no WebGL2'
  const d = gl.getExtension('WEBGL_debug_renderer_info')
  const r = d ? String(gl.getParameter(d.UNMASKED_RENDERER_WEBGL)) : ''
  gl.getExtension('WEBGL_lose_context')?.loseContext()
  return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(r) ? `software renderer: ${r}` : null
}

function disposeScene(scene) {
  scene.traverse(o => {
    o.geometry?.dispose?.()
    const m = o.material
    for (const x of Array.isArray(m) ? m : m ? [m] : []) {
      x.uniforms?.map?.value?.dispose?.()
      x.dispose()
    }
  })
}

function chromeInto(L, words, { tab, back, ticks, tl, tr, hint, tabCol }) {
  L.textContent = ''
  const tel = (side, rows) => {
    const d = el('div', `tel ${side}`)
    for (const [k, v] of rows) {
      const r = el('div')
      r.append(el('span', 'k', k), el('b', null, v))
      d.append(r)
    }
    return d
  }
  const tb = el('div', 'tab')
  if (back) {
    const b = el('span', 'back', `◂ ${back}`)
    b.dataset.nav = 'up'
    b.setAttribute('role', 'button')
    b.tabIndex = 0
    tb.append(b)
  }
  tb.append(el('span', null, `★ ${tab}`))
  const tk = el('div', 'ticks')
  const bar = el('span', 'bar')
  for (const s of ticks.list) bar.append(el('i', s === 'done' ? null : s))
  tk.append(el('span', 'n', ticks.label), bar)
  const lg = el('div', 'legend')
  for (const k of ['work', 'done', 'fail', 'wait']) {
    const s = el('span')
    s.append(el('i', k === 'done' ? null : k), words.legend[k])
    lg.append(s)
  }
  L.append(tel('l', tl), tel('r', tr), tb, tk, lg, el('div', 'hint', hint))
  const w = tb.offsetWidth
  const svg = sv('svg', { viewBox: `0 0 ${w} 30`, preserveAspectRatio: 'none' })
  svg.append(sv('path', { d: `M.5 .5H${w - 16}L${w - 0.5} 15L${w - 16} 29.5H.5Z`, fill: `${PAL.bg}e6`, stroke: tabCol }))
  tb.prepend(svg)
  tb.style.left = `${W / 2 - w / 2}px`
  tk.style.left = `${W / 2 - w / 2}px`
}

function buildWorld(env, WL) {
  const WORDS = env.words
  const LAYERS = env.layers()
  const chrome = (L, o) => chromeInto(L, WORDS, o)
  var renderer = env.renderer;
  var scene = new THREE.Scene();
  var ANIM = null;
  var WORLD = null;
  var FEAT = 0;
  var ZONE = 0;
  var seed = 17;
  var rnd = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  var R = (a, b) => a + (b - a) * rnd();
  var sm = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  var lerp = (a, b, t) => a + (b - a) * t;
  function hash2(x, y, s) {
    let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 1442695041) | 0;
    h = Math.imul(h ^ h >>> 13, 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function vn(x, y, s = 0) {
    const xi = Math.floor(x), yi = Math.floor(y), u = x - xi, v = y - yi, a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s), U = u * u * (3 - 2 * u), V = v * v * (3 - 2 * v);
    return a + (b - a) * U + (c - a) * V + (a - b - c + d) * U * V;
  }
  function fbm(x, y, o = 4, s = 0) {
    let t = 0, a = 0.5, f = 1, n = 0;
    for (let i = 0; i < o; i++) {
      t += a * vn(x * f, y * f, s + i * 7);
      n += a;
      a *= 0.5;
      f *= 2.03;
    }
    return t / n;
  }
  function ridged(x, y, o = 5, s = 9) {
    let t = 0, a = 0.5, f = 1, n = 0;
    for (let i = 0; i < o; i++) {
      t += a * (1 - Math.abs(2 * vn(x * f, y * f, s + i * 7) - 1));
      n += a;
      a *= 0.5;
      f *= 2.1;
    }
    return t / n;
  }
  function dSeg(px, pz, ax, az, bx, bz) {
    const dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / (dx * dx + dz * dz || 1)));
    return Math.hypot(px - ax - t * dx, pz - az - t * dz);
  }
  function dPoly(x, z, P) {
    let m = 1e9;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1];
      if (x < Math.min(a[0], b[0]) - m || x > Math.max(a[0], b[0]) + m || z < Math.min(a[1], b[1]) - m || z > Math.max(a[1], b[1]) + m) continue;
      m = Math.min(m, dSeg(x, z, a[0], a[1], b[0], b[1]));
    }
    return m;
  }
  function catmull(P, n = 8) {
    const out = [];
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1].map((c) => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
      }
    }
    out.push(P.at(-1));
    return out;
  }
  var fillMat = new THREE.MeshBasicMaterial({ color: BG, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  var LB = new Map();
  var PB = new Map();
  var FILLS = [];
  function lines(color = INK, op = 0.85) {
    op = Math.round(op * 100) / 100;
    const k = color + "|" + op + "|" + FEAT + "|" + ZONE;
    if (!LB.has(k)) LB.set(k, { color, op, feat: FEAT, zone: ZONE, a: [] });
    return LB.get(k).a;
  }
  function dots(color, size, op) {
    const k = color + "|" + size + "|" + op + "|" + FEAT + "|" + ZONE;
    if (!PB.has(k)) PB.set(k, { color, size, op, feat: FEAT, zone: ZONE, a: [] });
    return PB.get(k).a;
  }
  function fr(x, y, z, ry = 0, rx = 0, rz = 0) {
    return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(1, 1, 1));
  }
  var mul = (a, b) => a.clone().multiply(b);
  var tp = (m, p) => {
    const v = new THREE.Vector3(p[0], p[1], p[2]);
    if (m) v.applyMatrix4(m);
    return [v.x, v.y, v.z];
  };
  function seg(m, a, b, color = INK, op = 0.85) {
    lines(color, op).push(...tp(m, a), ...tp(m, b));
  }
  function pl(m, pts, color = INK, op = 0.85) {
    const r = lines(color, op);
    for (let i = 0; i < pts.length - 1; i++) r.push(...tp(m, pts[i]), ...tp(m, pts[i + 1]));
  }
  var EDGE_CACHE = new Map();
  var SIM = { ConeGeometry: ["radius", "height"], IcosahedronGeometry: ["radius"], SphereGeometry: ["radius"], CylinderGeometry: ["radiusTop", "radiusBottom", "height"], OctahedronGeometry: ["radius"], DodecahedronGeometry: ["radius"] };
  function edgeKey(g, o) {
    const P = g.parameters;
    if (!P) return [null, [1, 1, 1]];
    const q = { ...P };
    let D = [1, 1, 1];
    if (g.type === "BoxGeometry") {
      D = [P.width, P.height, P.depth];
      q.width = q.height = q.depth = 1;
    } else if (SIM[g.type]) {
      const u = SIM[g.type].map((k) => P[k]).find((v) => v > 0) || 1;
      D = [u, u, u];
      for (const k of SIM[g.type]) q[k] = +(P[k] / u).toFixed(9);
    }
    const sc = o.sc ? Array.isArray(o.sc) ? o.sc : [o.sc, o.sc, o.sc] : null, box = g.type === "BoxGeometry";
    if (sc) D = D.map((v, i) => v * sc[i]);
    const shape = sc && !box && !(sc[0] === sc[1] && sc[1] === sc[2]) ? sc.map((v) => +(v / sc[0]).toFixed(9)).join(",") : "";
    return [g.type + JSON.stringify(q) + "|" + shape + "|" + (o.thr ?? 25), D];
  }
  function memoHF(f) {
    const M = new Map();
    return (x, z) => {
      let r = M.get(x);
      if (!r) M.set(x, r = new Map());
      let h = r.get(z);
      if (h === void 0) r.set(z, h = f(x, z));
      return h;
    };
  }
  var POLY_CHUNKS = new WeakMap();
  function dPolyLim(x, z, P, lim) {
    let C = POLY_CHUNKS.get(P);
    if (!C) {
      C = [];
      for (let i = 0; i < P.length - 1; i += 8) {
        const Q = P.slice(i, Math.min(P.length, i + 9)), xs = Q.map((p) => p[0]), zs = Q.map((p) => p[1]);
        C.push({ Q, x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) });
      }
      POLY_CHUNKS.set(P, C);
    }
    let m = 1e9;
    for (const c of C) {
      const bd = Math.hypot(Math.max(0, c.x0 - x, x - c.x1), Math.max(0, c.z0 - z, z - c.z1));
      if (bd >= lim || bd >= m) continue;
      for (let i = 0; i < c.Q.length - 1; i++) {
        const a = c.Q[i], b = c.Q[i + 1];
        m = Math.min(m, dSeg(x, z, a[0], a[1], b[0], b[1]));
      }
    }
    return m;
  }
  function solid(g, o = {}) {
    if (o.sc) g.scale(...Array.isArray(o.sc) ? o.sc : [o.sc, o.sc, o.sc]);
    const [ek, D] = edgeKey(g, o);
    let e0 = ek && EDGE_CACHE.get(ek);
    if (ek && !e0) {
      e0 = Float64Array.from(new THREE.EdgesGeometry(g, o.thr ?? 25).attributes.position.array, (v, i) => v / D[i % 3]);
      EDGE_CACHE.set(ek, e0);
    }
    const p = o.pos || [0, 0, 0], r = o.rot || [0, 0, 0];
    let m = fr(p[0], p[1], p[2], r[1], r[0], r[2]);
    if (o.m) m = mul(o.m, m);
    g.applyMatrix4(m);
    const e = e0 ? (() => {
      const q = new Float32Array(e0.length), v = new THREE.Vector3();
      for (let i = 0; i < q.length; i += 3) {
        v.set(e0[i] * D[0], e0[i + 1] * D[1], e0[i + 2] * D[2]).applyMatrix4(m);
        q[i] = v.x;
        q[i + 1] = v.y;
        q[i + 2] = v.z;
      }
      return q;
    })() : new THREE.EdgesGeometry(g, o.thr ?? 25).attributes.position.array, arr = lines(o.color ?? INK, o.op ?? 0.9);
    for (let i = 0; i < e.length; i++) arr.push(e[i]);
    if (o.fill !== false) {
      const f = g.index ? g.toNonIndexed() : g, n = new THREE.BufferGeometry();
      n.setAttribute("position", f.attributes.position);
      FILLS.push(n);
    }
    return g;
  }
  var BOX = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  var CYL = (a, b, h, s = 12, open = false) => new THREE.CylinderGeometry(a, b, h, s, 1, open);
  function prism(L, h, Wd) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([-L / 2, 0, -Wd / 2, -L / 2, 0, Wd / 2, -L / 2, h, 0, L / 2, 0, -Wd / 2, L / 2, 0, Wd / 2, L / 2, h, 0], 3));
    g.setIndex([0, 1, 2, 3, 5, 4, 0, 2, 5, 0, 5, 3, 1, 4, 5, 1, 5, 2, 0, 3, 4, 0, 4, 1]);
    return g;
  }
  function flush(target = scene) {
    let n = 0;
    for (const { color, op, feat, zone, a } of LB.values()) {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(a, 3));
      target.add(new THREE.LineSegments(g, WORLD && (feat || zone) ? WORLD.lineMat(color, op, feat, zone) : new THREE.LineBasicMaterial({ color, transparent: op < 1, opacity: op })));
      n += a.length / 6;
    }
    for (const { color, size, op, feat, zone, a } of PB.values()) {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(a, 3));
      target.add(new THREE.Points(g, WORLD && (feat || zone) ? WORLD.pointMat(color, size, op, feat, zone) : new THREE.PointsMaterial({ color, size, sizeAttenuation: false, transparent: true, opacity: op })));
    }
    if (FILLS.length) target.add(new THREE.Mesh(mergeGeometries(FILLS, false), fillMat));
    return Math.round(n);
  }
  var HF = () => 0;
  var OBS = new Map();
  var CELL = 12;
  function obsAdd(x, z, r) {
    for (let i = Math.floor((x - r) / CELL); i <= Math.floor((x + r) / CELL); i++) for (let j = Math.floor((z - r) / CELL); j <= Math.floor((z + r) / CELL); j++) {
      const k = i + "," + j;
      if (!OBS.has(k)) OBS.set(k, []);
      OBS.get(k).push([x, z, r]);
    }
  }
  function obsHit(x, z, pad = 0) {
    const a = OBS.get(Math.floor(x / CELL) + "," + Math.floor(z / CELL));
    return !!a && a.some(([ox, oz, r]) => Math.hypot(x - ox, z - oz) < r + pad);
  }
  function terrain({ x0, x1, z0, z1, step, rowK = 1, colK = 2, op = 0.42, colOp = 0.2, hole = null, water = -1e9, colSteep = 1e9, rowSteep = 1e9, fillR = 1e9, fill = true, cols = true, rowSkip = null, lodUnit = 5 }) {
    const nx = Math.round((x1 - x0) / step), nz = Math.round((z1 - z0) / step), pos = new Float32Array((nx + 1) * (nz + 1) * 3), hh = new Float32Array((nx + 1) * (nz + 1));
    for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) {
      const x = x0 + i * step, z = z0 + j * step, y = HF(x, z), k = j * (nx + 1) + i;
      hh[k] = y;
      pos[k * 3] = x;
      pos[k * 3 + 1] = y;
      pos[k * 3 + 2] = z;
    }
    const inHole = (x, z) => hole && x > hole[0] && x < hole[1] && z > hole[2] && z < hole[3], idx = [];
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      if (inHole(x0 + (i + 0.5) * step, z0 + (j + 0.5) * step) || Math.hypot(x0 + (i + 0.5) * step, z0 + (j + 0.5) * step) > fillR) continue;
      const a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setIndex(idx);
    if (fill) scene.add(new THREE.Mesh(g, fillMat));
    const L1 = lines(INK, op), L2 = lines(INK, colOp), P = (arr, k) => arr.push(pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]);
    const lv = (v, o, dflt) => {
      if (!WORLD) return dflt;
      let q = Math.round((v + 4e3) / lodUnit), l = 0;
      while (l < 8 && q % 2 === 0) {
        q /= 2;
        l++;
      }
      const keep = FEAT;
      FEAT = lodUnit * 2 ** l >= 80 ? 0 : lodUnit * 2 ** l;
      const a = lines(INK, o);
      FEAT = keep;
      return a;
    };
    for (let j = 0; j <= nz; j += rowK) {
      if (rowSkip && rowSkip(z0 + j * step)) continue;
      const A = lv(z0 + j * step, op, L1);
      for (let i = 0; i < nx; i++) {
        const a = j * (nx + 1) + i;
        if (hh[a] < water && hh[a + 1] < water) continue;
        if (Math.abs(hh[a + 1] - hh[a]) > step * rowSteep) continue;
        if (inHole(x0 + (i + 0.5) * step, z0 + j * step)) continue;
        P(A, a);
        P(A, a + 1);
      }
    }
    for (let i = 0; cols && i <= nx; i += colK) {
      const A = lv(x0 + i * step, colOp, L2);
      for (let j = 0; j < nz; j++) {
        const a = j * (nx + 1) + i, b = a + nx + 1;
        if (hh[a] < water && hh[b] < water) continue;
        if (Math.abs(hh[b] - hh[a]) > step * colSteep) continue;
        if (inHole(x0 + i * step, z0 + (j + 0.5) * step)) continue;
        P(A, a);
        P(A, b);
      }
    }
  }
  function contour(lvs, { x0, x1, z0, z1, step, color = INK, op = 0.8, dy = 0.06, f = HF, hole = null }) {
    const nx = Math.round((x1 - x0) / step), nz = Math.round((z1 - z0) / step), raw = new Float32Array((nx + 1) * (nz + 1)), arr = lines(color, op);
    for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) raw[j * (nx + 1) + i] = f(x0 + i * step, z0 + j * step);
    for (const lv of [].concat(lvs)) for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      if (hole) {
        const cx = x0 + (i + 0.5) * step, cz = z0 + (j + 0.5) * step;
        if (cx > hole[0] && cx < hole[1] && cz > hole[2] && cz < hole[3]) continue;
      }
      const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => [x0 + a * step, z0 + b * step, raw[b * (nx + 1) + a] - lv]), p = [];
      for (let e = 0; e < 4; e++) {
        const A = c[e], B = c[(e + 1) % 4];
        if (A[2] < 0 !== B[2] < 0) {
          const t = A[2] / (A[2] - B[2]);
          p.push([A[0] + (B[0] - A[0]) * t, lv + dy, A[1] + (B[1] - A[1]) * t]);
        }
      }
      if (p.length >= 2) arr.push(...p[0], ...p[1]);
      if (p.length === 4) arr.push(...p[2], ...p[3]);
    }
  }
  function waterHatch(n, x0, x1, z0, z1, lv = 0, op = 0.3, fade = null) {
    const r = lines(INK, op);
    for (let i = 0; i < n; i++) {
      const x = R(x0, x1), z = R(z0, z1);
      if (fade && rnd() > fade(x, z)) continue;
      if (HF(x, z) > lv - 1) continue;
      const l = R(2, 9);
      r.push(x, lv + 0.02, z, x + l, lv + 0.02, z);
    }
  }
  function waterPlane(x0, x1, z0, z1, lv = 0) {
    const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0, WORLD ? 80 : 1, WORLD ? 80 : 1);
    g.rotateX(-Math.PI / 2);
    g.translate((x0 + x1) / 2, lv, (z0 + z1) / 2);
    scene.add(new THREE.Mesh(g, fillMat));
  }
  function drape(P, { color = INK, op = 0.7, dy = 0.25, step = 2, minY = -1e9 } = {}) {
    const out = [];
    for (let i = 0; i < P.length - 1; i++) {
      const [ax, az] = P[i], [bx, bz] = P[i + 1], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / step));
      for (let k = 0; k < n; k++) {
        const t = k / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t;
        out.push([x, Math.max(minY, HF(x, z)) + dy, z]);
      }
    }
    const l = P.at(-1);
    out.push([l[0], Math.max(minY, HF(l[0], l[1])) + dy, l[1]]);
    pl(null, out, color, op);
    return out;
  }
  function offsetPath(P, d) {
    return P.map((p, i) => {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1;
      return [p[0] - dz / l * d, p[1] + dx / l * d];
    });
  }
  function road(P, w, o = {}) {
    const C = catmull(P, o.n ?? 10);
    for (const q of C) obsAdd(q[0], q[1], w / 2 + 2.5);
    drape(offsetPath(C, w / 2), o);
    drape(offsetPath(C, -w / 2), o);
    if (o.center) drape(C, { ...o, op: (o.op ?? 0.7) * 0.45 });
    return C;
  }
  function pathPoint(C, t) {
    let L = 0;
    const d = [];
    for (let i = 0; i < C.length - 1; i++) {
      d.push(Math.hypot(C[i + 1][0] - C[i][0], C[i + 1][1] - C[i][1]));
      L += d.at(-1);
    }
    let s = t * L;
    for (let i = 0; i < d.length; i++) {
      if (s <= d[i]) {
        const u = s / d[i];
        return [C[i][0] + (C[i + 1][0] - C[i][0]) * u, C[i][1] + (C[i + 1][1] - C[i][1]) * u, Math.atan2(-(C[i + 1][1] - C[i][1]), C[i + 1][0] - C[i][0])];
      }
      s -= d[i];
    }
    const l = C.at(-1);
    return [l[0], l[1], 0];
  }
  function tree(x, z, s = 1, kind = "c", op = 0.72) {
    const y = HF(x, z);
    if (kind === "c") {
      solid(new THREE.ConeGeometry(1.5 * s, 3.4 * s, 6), { pos: [x, y + 2.5 * s, z], op, rot: [0, rnd() * 3, 0] });
      solid(new THREE.ConeGeometry(1.05 * s, 2.6 * s, 6), { pos: [x, y + 4.2 * s, z], op, rot: [0, rnd() * 3, 0] });
      seg(null, [x, y, z], [x, y + 0.9 * s, z], INK, op);
    } else {
      solid(new THREE.IcosahedronGeometry(1.8 * s, 0), { pos: [x, y + 3 * s, z], sc: [1, 0.85, 1], rot: [rnd() * 3, rnd() * 3, 0], op });
      seg(null, [x, y, z], [x, y + 1.5 * s, z], INK, op);
    }
  }
  function house(x, z, ry, { w = 5, d = 4, h = 3, rh = 2, color = INK, op = 0.85, chim = false, win = true, y = null } = {}) {
    obsAdd(x, z, Math.hypot(w, d) / 2 + 1.5);
    const Y = y ?? HF(x, z) - 0.15, m = fr(x, Y, z, ry);
    solid(BOX(w, h, d), { m, pos: [0, h / 2, 0], color, op });
    solid(prism(w + 0.5, rh, d + 0.6), { m, pos: [0, h, 0], color, op });
    if (win) {
      const fz = d / 2 + 0.02, ww = Math.min(0.9, w * 0.12);
      for (let k = 0; k < Math.max(1, Math.floor(w / 2.4)); k++) {
        const cx = -w / 2 + 1.2 + k * 2.4;
        if (cx + ww > w / 2) break;
        const r = [[cx - ww / 2, h * 0.45, fz], [cx + ww / 2, h * 0.45, fz], [cx + ww / 2, h * 0.45 + ww * 1.1, fz], [cx - ww / 2, h * 0.45 + ww * 1.1, fz], [cx - ww / 2, h * 0.45, fz]];
        pl(m, r, color, op * 0.7);
      }
    }
    if (chim) solid(BOX(w * 0.08 + 0.4, rh * 0.9, w * 0.08 + 0.4), { m, pos: [w * 0.28, h + rh * 0.7, d * 0.12], color, op });
    return m;
  }
  function crate(m, p, [w, h, d], c = INK, op = 0.9) {
    solid(BOX(w, h, d), { m, pos: [p[0], p[1] + h / 2, p[2]], color: c, op });
    const z = p[2] + d / 2 + 0.02;
    seg(m, [p[0] - w / 2, p[1], z], [p[0] + w / 2, p[1] + h, z], c, op * 0.5);
    seg(m, [p[0] + w / 2, p[1], z], [p[0] - w / 2, p[1] + h, z], c, op * 0.5);
  }
  function sparks(c, n = 34, s = 1.3) {
    const d = dots(GOLD, 2.2, 1);
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3(R(-1, 1), R(-0.1, 1), R(-1, 1)).normalize().multiplyScalar(R(0.2, s));
      d.push(c[0] + v.x, c[1] + v.y, c[2] + v.z);
    }
    for (let i = 0; i < 9; i++) {
      const v = new THREE.Vector3(R(-1, 1), R(0, 1), R(-1, 1)).normalize().multiplyScalar(s * 1.4);
      seg(null, c, [c[0] + v.x, c[1] + v.y, c[2] + v.z], GOLD, 0.9);
    }
  }
  function smoke(c, hgt = 14, col = INK, n = 180, op = 0.4) {
    const d = dots(col, 1.8, op);
    for (let i = 0; i < n; i++) {
      const t = Math.pow(rnd(), 0.8), r = 0.3 + t * hgt * 0.16;
      d.push(c[0] + R(-r, r) + t * t * hgt * 0.5, c[1] + t * hgt, c[2] + R(-r, r));
    }
  }
  function truss(a, b, w, color = INK, op = 0.7) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), d = B.clone().sub(A), L = d.length(), m = new THREE.Matrix4().compose(A, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), d.normalize()), new THREE.Vector3(1, 1, 1));
    const c = [[-w / 2, -w / 2], [w / 2, -w / 2], [w / 2, w / 2], [-w / 2, w / 2]];
    for (const [y, z] of c) seg(m, [0, y, z], [L, y, z], color, op);
    const n = Math.max(2, Math.round(L / w));
    for (let i = 0; i < n; i++) {
      const x0 = i / n * L, x1 = (i + 1) / n * L;
      for (let k = 0; k < 4; k++) {
        const [y0, z0] = c[k], [y1, z1] = c[(k + 1) % 4];
        seg(m, [x0, y0, z0], [x0, y1, z1], color, op * 0.8);
        seg(m, i % 2 ? [x0, y0, z0] : [x0, y1, z1], i % 2 ? [x1, y1, z1] : [x1, y0, z0], color, op * 0.6);
      }
    }
  }
  function worker(x, z, ry, color = INK, pose = "stand") {
    const m = fr(x, HF(x, z), z, ry);
    solid(CYL(0.3, 0.38, 1.05, 8), { m, pos: [0, 1.32, 0], color });
    solid(new THREE.SphereGeometry(0.25, 8, 5), { m, pos: [0, 2.1, 0], color });
    seg(m, [0, 0.8, -0.14], [-0.1, 0, -0.2], color);
    seg(m, [0, 0.8, 0.14], [0.15, 0, 0.2], color);
    if (pose === "work") {
      seg(m, [0, 1.7, 0.25], [0.55, 1.35, 0.3], color);
      seg(m, [0.55, 1.35, 0.3], [0.9, 1.75, 0.25], color);
      seg(m, [0.9, 1.75, 0.25], [1, 1.25, 0.25], color);
      seg(m, [0, 1.7, -0.25], [0.6, 1.2, -0.2], color);
    } else {
      seg(m, [0, 1.7, 0.32], [0.05, 0.95, 0.38], color);
      seg(m, [0, 1.7, -0.32], [0.05, 0.95, -0.38], color);
    }
  }
  function cart(x, z, ry, cargo = GOLD, s = 1) {
    const m = fr(x, HF(x, z), z, ry);
    solid(BOX(2.6 * s, 0.45 * s, 1.5 * s), { m, pos: [0, 1.05 * s, 0] });
    for (const k of [-1, 1]) solid(CYL(0.6 * s, 0.6 * s, 0.2 * s, 12), { m, pos: [-0.3 * s, 0.6 * s, k * 0.85 * s], rot: [Math.PI / 2, 0, 0] });
    seg(m, [1.3 * s, 1.1 * s, 0.45 * s], [2.9 * s, 0.8 * s, 0.45 * s]);
    seg(m, [1.3 * s, 1.1 * s, -0.45 * s], [2.9 * s, 0.8 * s, -0.45 * s]);
    if (cargo) crate(m, [-0.1 * s, 1.28 * s, 0], [1.5 * s, 1 * s, 1.05 * s], cargo);
    return m;
  }
  var CAM;
  var proj = (v) => {
    const p = new THREE.Vector3(...WORLD && WORLD.mapProj ? WORLD.xyz(...v) : v).project(CAM);
    return [(p.x + 1) / 2 * W, (1 - p.y) / 2 * H, p.z];
  };
  function columnLabels(L, items, { top = 120, bottom = H - 60, gap = 50, inset = 28 } = {}) {
    const M = 14, pts = items.map((it) => {
      const p0 = proj(it.at), off = p0[0] < M || p0[0] > W - M || p0[1] < M || p0[1] > H - 40;
      return { ...it, off, a0: p0, p: off ? [Math.min(W - M, Math.max(M, p0[0])), Math.min(H - 40, Math.max(M, p0[1]))] : p0 };
    });
    L.textContent = "";
    const svg = sv("svg", { class: "lead", width: W, height: H });
    L.append(svg);
    for (const side of ["l", "r"]) {
      const col = pts.filter((q) => (q.side || (q.p[0] < W / 2 ? "l" : "r")) === side).sort((a, b) => a.p[1] - b.p[1]);
      let y = top;
      const ys = col.map((q) => {
        const t = Math.max(y, Math.min(bottom - 44, q.p[1] - 30));
        y = t + gap;
        return t;
      });
      for (let i = ys.length - 1; i >= 0; i--) {
        const lim = (i === ys.length - 1 ? bottom : ys[i + 1] - gap + 44) - 44;
        if (ys[i] > lim) ys[i] = lim;
      }
      col.forEach((q, i) => {
        const ly = ys[i], s = q.st, edge = side === "l" ? inset : W - inset, ex = side === "l" ? edge + 175 : edge - 175, yy = ly + 9;
        const t = labelEl(q, side === "r" ? "r" : "");
        if (side === "l") t.style.left = `${edge}px`;
        else t.style.right = `${inset}px`;
        t.style.top = `${ly}px`;
        L.append(t);
        const path = sv("path", { d: `M${q.p[0].toFixed(1)} ${q.p[1].toFixed(1)} L${ex} ${yy} L${side === "l" ? edge + 168 : edge - 168} ${yy}`, fill: "none", stroke: HEX[s], "stroke-opacity": 0.55 });
        if (q.off) path.setAttribute("stroke-dasharray", "4 4");
        svg.append(path, q.off ? sv("path", { d: "M0 -6 L5 3 L-5 3 Z", fill: HEX[s], transform: `translate(${q.p[0].toFixed(1)} ${q.p[1].toFixed(1)}) rotate(${(Math.atan2(q.a0[1] - q.p[1], q.a0[0] - q.p[0]) * 180 / Math.PI + 90).toFixed(1)})` }) : sv("rect", { x: (q.p[0] - 3).toFixed(1), y: (q.p[1] - 3).toFixed(1), width: 6, height: 6, fill: HEX[s] }));
        if (s === "fail") L.append(beacon(q.p));
      });
    }
  }
  var RIV = catmull([[-170, -1e3], [-140, -600], [-170, -420], [-95, -270], [-130, -150], [-45, -45], [40, 35], [140, 85], [270, 115], [420, 140]], 10);
  var coastX = (z) => 235 + 60 * Math.sin(z / 130) + 50 * (fbm(z / 90, 3.3, 3, 5) - 0.5);
  var land = (x, z) => {
    let h = 3 + fbm(x / 160, z / 160, 4, 1) * 14;
    const hl = fbm(x / 90 + 7, z / 90 - 3, 4, 2);
    h += Math.max(0, hl - 0.5) * 130;
    const mt = sm(-140, -520, z) + sm(-330, -520, x) * 0.6;
    if (mt > 0) {
      const r = ridged(x / 150, z / 150, 5, 9);
      h += Math.min(1, mt) * (r * r * 300 + 30);
    }
    return h;
  };
  var PIPES_W = [...WL.region.pipelines].sort((a, b) => a.key < b.key ? -1 : 1);
  var hashKey = (str) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
    return h;
  };
  var mixSeed = (n) => {
    n = Math.imul(n ^ n >>> 16, 73244475);
    n = Math.imul(n ^ n >>> 16, 73244475);
    return 1 + ((n ^ n >>> 16) >>> 0) % 2147483645;
  };
  var siteSeed = (i) => mixSeed(hashKey(PIPES_W[i].key));
  var YSK = PIPES_W.map((p) => [p.label, p.usd, p.st]);
  if (!WL.region.pipelines.length) throw new Error("world data: the open board has no pipelines");
  var PORT_I = Math.max(0, PIPES_W.findIndex((p) => p.key === (WL.focus || WL.region.pipelines[0].key)));
  var PORT_P = PIPES_W[PORT_I];
  var FOCUS_T = PORT_P.place;
  var placeType = (usd) => usd < 4 ? "farm" : usd <= 10 ? "village" : "harbor";
  var SITE_SPOTS = null;
  function autoSitesW() {
    const types = YSK.map(([, usd]) => placeType(usd)), S = [], KEEP = WL.keepSites || {};
    const inFrame = (x, z) => {
      const p = proj([x, Math.max(0, land(x, z)), z]);
      return p[0] > W * 0.12 && p[0] < W * 0.84 && p[1] > H * 0.2 && p[1] < H * 0.84;
    };
    const gap = (x, z, r) => S.length ? Math.min(...S.map((s) => Math.hypot(s.x - x, s.z - z) - (s.foot || s.r) - r)) : 1e9;
    const mk = (x, z, i, t) => t === "harbor" ? { x, z, r: 40, coast: true, lv: 2.2, i, t } : { x, z, r: t === "farm" ? 62 : 32, foot: t === "farm" ? 54 : 40, i, t };
    const none = (i) => {
      throw new Error("world: no free spot for " + PIPES_W[i].key);
    };
    types.forEach((t, i) => {
      const k = KEEP[PIPES_W[i].key];
      if (Array.isArray(k) && k[2] === "harbor" === (t === "harbor")) S.push(mk(k[0], k[1], i, t));
    });
    const kept = new Set(S.map((s) => s.i));
    types.forEach((t, i) => {
      if (kept.has(i) || t !== "harbor") return;
      let best = null;
      for (let z = -320; z <= 320; z += 10) {
        const x = coastX(z) - 16;
        if (Math.abs(z - 118) < 60 || !inFrame(x + 20, z)) continue;
        const d = gap(x, z, 40);
        if (!best || d > best.d) best = { x, z, d };
      }
      if (!best) none(i);
      S.push(mk(best.x, best.z, i, t));
    });
    types.forEach((t, i) => {
      if (kept.has(i) || t === "harbor") return;
      seed = siteSeed(i);
      const r = t === "farm" ? 54 : 40;
      let best = null;
      for (let k = 0; k < 3e3; k++) {
        const x = R(-460, 240), z = t === "farm" ? R(-20, 330) : R(-420, 330), h = land(x, z);
        if (h < 4 || h > 45) continue;
        if (Math.abs(land(x + 14, z) - land(x - 14, z)) + Math.abs(land(x, z + 14) - land(x, z - 14)) > 9) continue;
        if (dPoly(x, z, RIV) < r + 40 || coastX(z) - x < r + 60 || !inFrame(x, z)) continue;
        const d = gap(x, z, r);
        if (!best || d > best.d) best = { x, z, d };
      }
      if (!best) none(i);
      S.push(mk(best.x, best.z, i, t));
    });
    SITE_SPOTS = Object.fromEntries(S.map((q) => [PIPES_W[q.i].key, [q.x, q.z, q.t]]));
    return S.sort((a, b) => a.i - b.i);
  }
  function regionHF(kind) {
    let S;
    S = autoSitesW();
    seed = 17;
    S.forEach((s) => {
      if (!s.coast) s.lv = Math.max(4, land(s.x, s.z));
    });
    const f = (x, z) => {
      let h = land(x, z);
      for (const s of S) if (!s.coast) {
        const d = Math.hypot(x - s.x, z - s.z);
        if (d < s.r * 2.2) h = lerp(s.lv, h, sm(s.r, s.r * 2.2, d));
      }
      h = lerp(-8, h, sm(-12, 50, coastX(z) - x));
      const dr = dPolyLim(x, z, RIV, 32);
      if (dr < 32) h = lerp(-2.5, h, sm(5, 30, dr));
      for (const s of S) if (s.coast && h > -1) {
        const d = Math.hypot(x - s.x, z - s.z), rr = Math.min(s.r, 26);
        if (d < rr * 2.2) h = lerp(s.lv, h, sm(rr, rr * 2.2, d));
      }
      return h;
    };
    return { f, S };
  }
  function villageR(s, st) {
    const c = COLOR[st], a = R(0, 6.28), m = fr(s.x, s.lv, s.z, a);
    house(s.x, s.z, a, { w: 22, d: 12, h: 8, rh: 6, color: c, op: 1, chim: true, y: s.lv - 0.1 });
    const placed = [[0, 0, 15]];
    let tries = 0;
    while (placed.length < 20 && tries++ < 800) {
      const b = rnd() * 6.283, r = R(15, s.r * 1.15), x = Math.cos(b) * r, z = Math.sin(b) * r;
      if (placed.some(([px, pz, pr]) => Math.hypot(px - x, pz - z) < pr + 6)) continue;
      placed.push([x, z, 6]);
      const w = tp(m, [x, 0, z]);
      house(w[0], w[2], a - b + (rnd() < 0.5 ? 0 : Math.PI / 2), { w: R(6, 9), d: R(4.8, 6.4), h: R(3.4, 4.6), rh: R(2.4, 3.2), op: 0.95, chim: rnd() < 0.3 });
    }
    const tw = tp(m, [-8, 0, -16]);
    solid(BOX(5, 18, 5), { pos: [tw[0], s.lv + 9, tw[2]], rot: [0, a, 0], op: 0.95 });
    solid(new THREE.ConeGeometry(4.2, 8, 4), { pos: [tw[0], s.lv + 22, tw[2]], rot: [0, a + Math.PI / 4, 0], op: 0.95 });
    for (let k = 0; k < 5; k++) {
      const b = rnd() * 6.283, r = s.r * R(1.5, 2), cx = s.x + Math.cos(b) * r, cz = s.z + Math.sin(b) * r;
      field(cx, cz, b + R(-0.3, 0.3), R(14, 24), R(10, 18), INK, 0.3, 1, INK, 2.5);
    }
    if (st === "work") {
      const ch = tp(m, [22 * 0.28, 8 + 6 * 0.7 + 2, 12 * 0.12]);
      smoke(ch, 30, INK, 300, 0.45);
      sparks(tp(m, [5, 1, 8]), 30, 3);
    }
    return [s.x, s.lv + 22, s.z];
  }
  function harborR(s, st) {
    const c = COLOR[st], m = fr(s.x, s.lv, s.z, 0);
    for (const [z, L] of [[-14, 46], [2, 54], [18, 40]]) {
      solid(BOX(L, 2.4, 6), { m, pos: [10 + L / 2, -0.8, z], op: 0.9 });
    }
    for (const z of [-14, 18]) {
      const cm = mul(m, fr(30, 0.4, z, 0));
      for (const [x, zz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) solid(BOX(0.6, 12, 0.6), { m: cm, pos: [x, 6, zz], color: c });
      solid(BOX(7, 1, 7), { m: cm, pos: [0, 12, 0], color: c });
      truss(tp(cm, [-8, 13, 0]), tp(cm, [22, 13, 0]), 1.4, c, 0.9);
    }
    ship(mul(m, fr(48, 0, -5, 0)), 34, 7, st === "work" ? 0.5 : 1, c);
    if (st !== "fail") ship(mul(m, fr(44, 0, 26, 0)), 28, 6, 1, INK, 0.7);
    for (let k = 0; k < 6; k++) solid(BOX(16, 4.5, 7), { m, pos: [-12 - k % 2 * 19, 2.25, -22 + Math.floor(k / 2) * 11], op: 0.85 });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const hgt = 1 + Math.floor(rnd() * 3);
      solid(BOX(5.5, 1.3 * hgt, 2.2), { m, pos: [2 + i * 6.2 - 9, 0.65 * hgt, -20 + j * 2.8 + 26], color: st === "work" && i === 3 ? GOLD : INK, op: 0.75 });
    }
    for (let k = 0; k < 26; k++) {
      const x = s.x - R(32, 70), z = s.z + R(-38, 38);
      if (HF(x, z) < 1.5) continue;
      house(x, z, R(-0.2, 0.2) + (rnd() < 0.5 ? 0 : Math.PI / 2), { w: R(4, 7), d: R(4, 6), h: R(3, 7), rh: R(1, 2), op: 0.75 });
    }
    if (st === "work") {
      sparks(tp(m, [46, 8, -5]), 30, 2.4);
    }
    return tp(m, [30, 16, -14]);
  }
  function ship(m, L, Wd, load, col, op = 0.9) {
    const sh = new THREE.Shape([new THREE.Vector2(-L / 2, -Wd / 2), new THREE.Vector2(L / 2 - Wd, -Wd / 2), new THREE.Vector2(L / 2, 0), new THREE.Vector2(L / 2 - Wd, Wd / 2), new THREE.Vector2(-L / 2, Wd / 2)]);
    const g = new THREE.ExtrudeGeometry(sh, { depth: Wd * 0.5, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    solid(g, { m, pos: [0, -Wd * 0.2, 0], op });
    solid(BOX(Wd * 0.7, Wd * 0.7, Wd * 0.9), { m, pos: [-L / 2 + Wd * 0.5, Wd * 0.3 + Wd * 0.35, 0], op });
    solid(BOX(Wd * 0.35, Wd * 0.35, Wd * 1.1), { m, pos: [-L / 2 + Wd * 0.5, Wd * 0.3 + Wd * 0.87, 0], op });
    const nx = Math.floor((L - Wd * 2.2) / (Wd * 0.62));
    for (let i = 0; i < nx; i++) for (let j = 0; j < 3; j++) {
      if (i / nx > load) continue;
      const hgt = 1 + (i + j) % 2;
      solid(BOX(Wd * 0.55, Wd * 0.18 * hgt, Wd * 0.28), { m, pos: [-L / 2 + Wd * 1.25 + i * Wd * 0.62, Wd * 0.3 + Wd * 0.09 * hgt, (j - 1) * Wd * 0.3], color: col === INK ? INK : i / nx > load - 0.2 ? col : INK, op: op * 0.85 });
    }
  }
  function field(cx, cz, ang, w, d, col = INK, op = 0.3, frac = 1, colB = INK, tol = 1e9) {
    const c = Math.cos(ang), s = Math.sin(ang), P = (u, v) => [cx + u * c - v * s, cz + u * s + v * c];
    if (tol < 1e9) {
      const hs = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5], [0, 0], [0, -0.5], [0, 0.5], [-0.5, 0], [0.5, 0]].map(([u, v]) => HF(...P(u * w, v * d)));
      if (Math.max(...hs) - Math.min(...hs) > tol || Math.min(...hs) < 1.5) return false;
    }
    for (let u = -w / 2 + 4; u < w / 2; u += 8) for (let v = -d / 2 + 4; v < d / 2; v += 8) obsAdd(...P(u, v), 6);
    drape([P(-w / 2, -d / 2), P(w / 2, -d / 2), P(w / 2, d / 2), P(-w / 2, d / 2), P(-w / 2, -d / 2)], { color: col, op: Math.min(1, op * 1.8), dy: 0.3 });
    for (let u = -w / 2 + 1.6; u < w / 2; u += 1.6) {
      const plowed = (u + w / 2) / w <= frac;
      drape([P(u, -d / 2), P(u, d / 2)], { color: plowed ? col : colB, op: plowed ? op : op * 0.45, dy: 0.2, step: 3 });
    }
    return true;
  }
  function farmR(s, st) {
    const c = COLOR[st], a = R(0, 6.28), m = fr(s.x, s.lv, s.z, a);
    house(s.x, s.z, a, { w: 17, d: 11, h: 7, rh: 5.5, color: c, op: 1, y: s.lv - 0.1 });
    for (const [x, z] of [[13, -5], [18, -5]]) {
      const w = tp(m, [x, 0, z]);
      solid(CYL(2.3, 2.3, 15, 12), { pos: [w[0], s.lv + 7.5, w[2]], color: c });
      solid(new THREE.SphereGeometry(2.3, 12, 4, 0, 6.29, 0, 1.57), { pos: [w[0], s.lv + 15, w[2]], color: c });
    }
    {
      const w = tp(m, [-12, 0, 6]);
      house(w[0], w[2], a, { w: 6, d: 5, h: 3.4, rh: 2.4, op: 0.85, chim: true, y: s.lv - 0.1 });
    }
    const lay = [[-30, -24, 28, 20], [2, -30, 30, 18], [34, -18, 26, 30], [-34, 14, 24, 28], [26, 26, 34, 22], [-6, 34, 28, 18]].map((q) => q.map((v) => v * 1.2));
    lay.forEach(([u, v, w, d], k) => {
      const p = tp(m, [u, 0, v]);
      const working = st === "work" && k === 2;
      field(p[0], p[2], a, w, d, working ? GOLD : INK, 0.42, working ? 0.55 : 1, INK, 4.5);
      if (working) {
        tractor(...(() => {
          const q = tp(m, [u - w / 2 + w * 0.55, 0, v]);
          return [q[0], q[2]];
        })(), a + Math.PI / 2, GOLD, 1.3);
      }
    });
    if (st === "work") smoke(tp(m, [3, 9, 2]), 14, INK, 120, 0.35);
    return [s.x, s.lv + 17, s.z];
  }
  function tractor(x, z, ry, col = GOLD, s = 1) {
    const m = fr(x, HF(x, z), z, ry);
    solid(BOX(3.2 * s, 1.3 * s, 1.5 * s), { m, pos: [0.4 * s, 1.5 * s, 0], color: col });
    solid(BOX(1.8 * s, 1.9 * s, 1.7 * s), { m, pos: [-0.7 * s, 3.1 * s, 0], color: col, fill: false });
    for (const k of [-1, 1]) {
      solid(CYL(1.1 * s, 1.1 * s, 0.55 * s, 14), { m, pos: [-0.9 * s, 1.1 * s, k * 1.05 * s], rot: [Math.PI / 2, 0, 0], color: col });
      solid(CYL(0.6 * s, 0.6 * s, 0.4 * s, 12), { m, pos: [1.5 * s, 0.6 * s, k * 0.9 * s], rot: [Math.PI / 2, 0, 0], color: col });
    }
    seg(m, [1.2 * s, 2.15 * s, 0.4 * s], [1.2 * s, 3.4 * s, 0.4 * s], col);
    for (const k of [-1, 0, 1]) seg(m, [-2.2 * s, 1 * s, k * 0.9 * s], [-3.6 * s, 0, k * 0.9 * s], col);
    seg(m, [-2.2 * s, 1 * s, -1 * s], [-2.2 * s, 1 * s, 1 * s], col);
    return m;
  }
  function siteBox(s) {
    const pts = [], cx = s.coast ? s.x + 22 : s.x, r0 = s.coast ? 46 : s.t === "farm" ? 50 : s.r * 1.4;
    for (let k = 0; k < 16; k++) {
      const a = k / 16 * 6.283;
      for (const y of [0, s.coast ? 18 : 24]) pts.push(proj([cx + Math.cos(a) * r0, s.lv + y, s.z + Math.sin(a) * r0]));
    }
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  }
  function placeLabels(L, items, boxes) {
    const EXCL = [[0, 0, 215, 94], [W - 215, 0, W, 94], [W / 2 - 240, 0, W / 2 + 240, 86], [0, H - 40, W, H]], placed = [...EXCL], miss = [];
    L.textContent = "";
    const svg = sv("svg", { class: "lead", width: W, height: H });
    L.append(svg);
    const sizes = items.map((q) => {
      const t = labelEl(q, "");
      t.style.visibility = "hidden";
      L.append(t);
      const r = [t.offsetWidth + 2, t.offsetHeight];
      t.remove();
      return r;
    });
    const hit = (r, list) => list.some((b) => r[0] < b[2] && r[2] > b[0] && r[1] < b[3] && r[3] > b[1]);
    const order = items.map((q, i) => i).sort((a, b) => proj(items[a].at)[1] - proj(items[b].at)[1]);
    for (const i of order) {
      const q = items[i], p = proj(q.at), [w, h] = sizes[i];
      let best = null;
      for (const strict of [true, false]) {
        for (const d of [14, 28, 46, 70, 100, 140]) {
          for (const [dx, dy] of [[1, -1], [-1, -1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, 1], [0, 1]]) {
            const x = dx > 0 ? p[0] + d : dx < 0 ? p[0] - d - w : p[0] - w / 2, y = dy < 0 ? p[1] - d - h : dy > 0 ? p[1] + d : p[1] - h / 2, r = [x, y, x + w, y + h];
            if (x < 14 || y < 14 || x + w > W - 14 || y + h > H - 14 || hit(r, placed) || strict && hit(r, boxes)) continue;
            best = { x, y, r, right: dx < 0 };
            break;
          }
          if (best) break;
        }
        if (best) break;
      }
      if (!best) {
        miss.push(q.name);
        continue;
      }
      placed.push([best.r[0] - 8, best.r[1] - 8, best.r[2] + 8, best.r[3] + 8]);
      const t = labelEl(q, best.right ? "r" : "");
      t.style.left = `${best.x}px`;
      t.style.top = `${best.y}px`;
      t.style.width = `${w}px`;
      L.append(t);
      const ex = Math.min(Math.max(p[0], best.r[0]), best.r[2]), ey = Math.min(Math.max(p[1], best.r[1] + 9), best.r[3]);
      const dpath = `M${p[0].toFixed(1)} ${p[1].toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}`;
      svg.append(
        sv("path", { d: dpath, fill: "none", stroke: PAL.bg, "stroke-width": 4, "stroke-opacity": 0.85 }),
        sv("path", { d: dpath, fill: "none", stroke: HEX[q.st], "stroke-width": 1.2, "stroke-opacity": 0.9 }),
        sv("rect", { x: (p[0] - 3).toFixed(1), y: (p[1] - 3).toFixed(1), width: 6, height: 6, fill: HEX[q.st] })
      );
      if (q.st === "fail") L.append(beacon(p));
    }
    return miss;
  }
  function buildRegion(kind) {
    seed = 17;
    const cams = { mixed: [[110, 430, 610], [100, 0, -50]], village: [[-40, 250, 420], [-50, 0, -60]], harbor: [[-120, 240, 400], [150, 0, -40]], farm: [[-90, 230, 420], [-70, 0, -40]] }[kind];
    CAM = new THREE.PerspectiveCamera(40, W / H, 1, 8e3);
    CAM.position.set(...cams[0]);
    CAM.lookAt(...cams[1]);
    CAM.updateMatrixWorld();
    CAM.updateProjectionMatrix();
    const { f, S } = regionHF(kind);
    HF = WORLD ? memoHF(WORLD.blendH(WORLD.portHF(f, S))) : f;
    ZONE = WORLD ? -1 : 0;
    scene.fog = new THREE.Fog(BG, 700, 2300);
    terrain({ x0: -760, x1: 520, z0: -700, z1: 560, step: 2.5, rowK: 2, colK: WORLD ? 8 : 6, op: WORLD ? 0.5 : 0.3, colOp: 0.1, water: -0.3, colSteep: 0.7, rowSteep: 3 });
    if (WORLD) terrain({ x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 5, rowK: 1, colK: 4, op: 0.5, colOp: 0.1, hole: [-760, 520, -700, 560], water: -0.3, colSteep: 0.7, rowSteep: 3, fillR: 1430 });
    else terrain({ x0: -1600, x1: 1600, z0: -1900, z1: 1400, step: 10, rowK: 1, colK: 4, op: 0.36, colOp: 0.07, hole: [-760, 520, -700, 560], water: -0.3, colSteep: 0.5, rowSteep: 2.2 });
    if (WORLD) {
      const P = WORLD.port, x0 = Math.round((P.Ox - 80) / 5) * 5, z0 = Math.round((P.Oz - 80) / 5) * 5;
      ZONE = -2;
      terrain({ x0, x1: x0 + 160, z0, z1: z0 + 160, step: 1.25, rowK: 1, op: 0.5, colOp: 0.1, water: -0.3, rowSteep: 3, fill: false, cols: false, rowSkip: (v) => Math.abs(v / 5 - Math.round(v / 5)) < 1e-6, lodUnit: 1.25 });
      ZONE = -1;
    }
    if (WORLD) {
      const g = new THREE.RingGeometry(0, 1430, 160, 60);
      g.rotateX(-Math.PI / 2);
      scene.add(new THREE.Mesh(g, fillMat));
    } else waterPlane(-1600, 1600, -1900, 1500, 0);
    contour(0, { x0: -760, x1: 700, z0: -700, z1: 560, step: 2.5, op: 0.9 });
    contour(-1.6, { x0: -760, x1: 700, z0: -700, z1: 560, step: 5, op: 0.28 });
    if (WORLD) contour(0, { x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 10, op: 0.9, hole: [-760, 700, -700, 560] });
    FEAT = WORLD ? 40 : 0;
    contour([40, 70, 100, 130, 160, 190, 220, 250, 280], { x0: -760, x1: 520, z0: -700, z1: 560, step: 4, op: 0.42, dy: 0.3 });
    if (WORLD) {
      contour([40, 70, 100, 130, 160, 190, 220, 250, 280], { x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 8, op: 0.42, dy: 0.3, hole: [-760, 520, -700, 560] });
      FEAT = 0;
      contour(-1.6, { x0: -1800, x1: 1800, z0: -1800, z1: 1800, step: 10, op: 0.28, hole: [-760, 700, -700, 560] });
    }
    FEAT = WORLD ? 6 : 0;
    if (WORLD) waterHatch(3e4, -1600, 1600, -1600, 1600, 0, 0.26, (x, z) => 0.5 * (1 - sm(1250, 1600, Math.hypot(x, z))));
    else waterHatch(9e3, -760, 900, -700, 560, 0, 0.26, (x, z) => 0.15 + 0.85 * sm(-560, 300, z));
    if (!WORLD) {
      const d = dots(INK, 1.3, 0.5);
      for (let i = 0; i < 700; i++) {
        const a = R(-1.4, 1.4), e = R(0.02, 0.5);
        d.push(Math.sin(a) * 3e3, 300 + Math.sin(e) * 3e3, -Math.cos(a) * 3e3);
      }
    }
    let E = { village: [[0, 3], [0, 4], [0, 2], [3, 1], [1, 5], [2, 5]], harbor: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]], farm: [[0, 4], [0, 3], [3, 1], [3, 2], [1, 5], [0, 5]] }[kind];
    if (kind === "mixed") {
      E = [];
      const inT = new Set([0]);
      while (inT.size < S.length) {
        let bst = null;
        for (const a of inT) S.forEach((s, b) => {
          if (inT.has(b)) return;
          const d = Math.hypot(S[a].x - s.x, S[a].z - s.z);
          if (!bst || d < bst[2]) bst = [a, b, d];
        });
        E.push([bst[0], bst[1]]);
        inT.add(bst[1]);
      }
    }
    FEAT = 0;
    const RD = [];
    for (const [a, b] of E) {
      seed = mixSeed(hashKey(PIPES_W[a].key + "|" + PIPES_W[b].key));
      const A = S[a], B = S[b], mx = (A.x + B.x) / 2 + R(-20, 20), mz = (A.z + B.z) / 2 + R(-20, 20);
      RD.push(road([[A.x, A.z], [mx, mz], [B.x, B.z]], 2.4, { op: 0.7, minY: 1.4 }));
    }
    const LIST = PIPES_W.map((p) => [p.label, p.st, p.chip]);
    FEAT = WORLD ? 6 : 0;
    const items = S.map((s, i) => {
      const [name, st, chip] = LIST[i];
      seed = siteSeed(i);
      const at = WORLD && i === WORLD.port.i ? portR(s, st) : s.t === "village" ? villageR(s, st) : s.t === "harbor" ? harborR(s, st) : farmR(s, st);
      return { name, st, chip, at, id: PIPES_W[i].key };
    });
    FEAT = WORLD ? 15 : 0;
    for (let i = 0; i < (WORLD ? 900 : kind === "farm" ? 320 : 240); i++) {
      seed = mixSeed(i + 1);
      const x = WORLD ? R(-1250, 1250) : R(-700, 300), z = WORLD ? R(-1250, 1250) : R(-200, 540), h = HF(x, z);
      if (WORLD && rnd() < sm(950, 1250, Math.hypot(x, z))) continue;
      if (h < 2 || h > 30 || dPoly(x, z, RIV) < 16 || obsHit(x, z, 10)) continue;
      field(x, z, R(-0.5, 0.5) + (rnd() < 0.5 ? 0 : 1.57), R(12, 26), R(10, 18), INK, 0.2, 1, INK, 2.2);
    }
    FEAT = WORLD ? 8 : 0;
    let nt = 0;
    for (let i = 0; i < (WORLD ? 42e4 : 11e4) && nt < (WORLD ? 24e3 : 6500); i++) {
      seed = mixSeed(i + 5e6);
      const x = WORLD ? R(-1250, 1250) : R(-740, 500), z = WORLD ? R(-1250, 1250) : R(-680, 540), h = HF(x, z);
      if (WORLD && rnd() < sm(950, 1250, Math.hypot(x, z))) continue;
      if (h < 2.5 || h > 150) continue;
      const fm = fbm(x / 70 + 11, z / 70, 3, 21);
      if (fm < 0.55) continue;
      if (Math.abs(HF(x + 3, z) - h) > 4.5) continue;
      if (dPoly(x, z, RIV) < 10 || obsHit(x, z, 2.5)) continue;
      tree(x, z, R(1.1, 1.7), h > 26 || rnd() < 0.35 ? "c" : "d", 0.5);
      nt++;
    }
    FEAT = WORLD ? 6 : 0;
    const wi = LIST.findIndex((p) => p[1] === "work");
    RD.forEach((C, k) => {
      const [a, b] = E[k];
      if (a !== wi && b !== wi) return;
      const fwd = a === wi;
      if (ANIM) {
        const H0 = HF;
        for (const ph of [0, 0.5]) {
          const g = capture(() => cart(0, 0, 0, GOLD, 2.2));
          ANIM.movers.push((t) => {
            const c = (t / 14 + ph) % 1, out = c < 0.5, u = out ? sm(0, 0.5, c) : 1 - sm(0.5, 1, c), [x, z, ry] = pathPoint(C, fwd ? u : 1 - u);
            g.position.set(x, Math.max(1.4, H0(x, z)), z);
            g.rotation.y = ry + (out === fwd ? 0 : Math.PI);
          });
        }
        return;
      }
      for (const t of [0.22, 0.5]) {
        const [x, z, ry] = pathPoint(C, a === wi ? t : 1 - t);
        cart(x, z, ry, GOLD, 2.2);
      }
    });
    FEAT = 0;
    ZONE = 0;
    const segs = flush();
    WORLD.items = items;
    WORLD.S = S;
    return segs;
  }
  function stsCrane(x, z, col, load) {
    const m = fr(x, 2.2, z, 0);
    for (const lx of [-6, 6]) for (const lz of [2, 16]) solid(BOX(0.9, 26, 0.9), { m, pos: [lx, 13, lz], color: col });
    for (const lz of [2, 16]) {
      solid(BOX(13, 1.2, 1.2), { m, pos: [0, 26, lz], color: col });
      solid(BOX(13, 0.8, 0.8), { m, pos: [0, 9, lz], color: col });
    }
    for (const lx of [-6, 6]) {
      solid(BOX(1, 1, 15), { m, pos: [lx, 26, 9], color: col });
      seg(m, [lx, 9, 2], [lx, 26, 16], col, 0.6);
      seg(m, [lx, 9, 16], [lx, 26, 2], col, 0.6);
    }
    const up = !load;
    const tipZ = up ? 2 : -40, tipY = up ? 70 : 29;
    truss(tp(m, [0, 29, 26]), tp(m, [0, 29, 2]), 2, col, 0.9);
    truss(tp(m, [0, 29, 2]), tp(m, [0, tipY, tipZ]), 2, col, 0.9);
    for (const lx of [-1, 1]) {
      seg(m, [lx, 26, 2], [0, 44, 9], col);
      seg(m, [lx, 26, 16], [0, 44, 9], col);
    }
    seg(m, [0, 44, 9], [0, tipY + 1, tipZ], col, 0.8);
    seg(m, [0, 44, 9], [0, 30, 26], col, 0.8);
    solid(BOX(5, 4, 6), { m, pos: [0, 32, 20], color: col });
    for (const lx of [-6, 6]) for (const lz of [2, 16]) {
      solid(BOX(2.2, 0.9, 2.2), { m, pos: [lx, 0.45, lz], color: col });
    }
    if (load && ANIM) {
      const X = x, Z = z, ph = X > 0 ? 0.37 : 0;
      const tro = capture(() => solid(BOX(2.6, 1.6, 3), { color: col })), cab = capture(() => {
        for (const lx of [-0.8, 0.8]) seg(null, [lx, 0, 0], [lx, -1, 0], col, 0.9);
      });
      const spr = capture(() => solid(BOX(12, 0.5, 2.8), { pos: [0, 0.25, 0], color: col })), ctr = capture(() => solid(BOX(12, 2.6, 2.6), { pos: [0, -1.3, 0], color: GOLD }));
      ANIM.movers.push((t) => {
        const c = (t / 9 + ph) % 1, zq = 9.5, zs = -24, yUp = 18, yQ = 2.6, yS = 3.9;
        let zz = zq, yy = yUp, has = false;
        if (c < 0.15) yy = lerp(yUp, yQ, sm(0, 0.15, c));
        else if (c < 0.3) {
          yy = lerp(yQ, yUp, sm(0.15, 0.3, c));
          has = true;
        } else if (c < 0.45) {
          zz = lerp(zq, zs, sm(0.3, 0.45, c));
          has = true;
        } else if (c < 0.6) {
          zz = zs;
          yy = lerp(yUp, yS, sm(0.45, 0.6, c));
          has = true;
        } else if (c < 0.7) {
          zz = zs;
          yy = lerp(yS, yUp, sm(0.6, 0.7, c));
        } else if (c < 0.85) zz = lerp(zs, zq, sm(0.7, 0.85, c));
        tro.position.set(X, 2.2 + 27.4, Z + zz);
        spr.position.set(X, 2.2 + yy, Z + zz);
        ctr.position.set(X, 2.2 + yy, Z + zz);
        ctr.visible = has;
        cab.position.set(X, 2.2 + 26.6, Z + zz);
        cab.scale.y = 26.6 - yy - 0.5;
      });
    } else if (load) {
      solid(BOX(2.6, 1.6, 3), { m, pos: [0, 27.4, -24], color: col });
      for (const lx of [-0.8, 0.8]) seg(m, [lx, 26.6, -24], [lx, 15, -24], col, 0.9);
      solid(BOX(12, 2.6, 2.6), { m, pos: [0, 13.6, -24], color: GOLD });
    }
    return tp(m, [0, 47, 9]);
  }
  function truck(x, z, ry, cargo = INK) {
    const m = fr(x, 2.2, z, ry);
    solid(BOX(2.6, 2.6, 2.5), { m, pos: [5.3, 2.1, 0] });
    solid(BOX(12, 0.5, 2.4), { m, pos: [0, 1.1, 0] });
    for (const lx of [-4.5, -3.2, 3.5, 5.3]) for (const k of [-1, 1]) solid(CYL(0.55, 0.55, 0.35, 10), { m, pos: [lx, 0.55, k * 1.1], rot: [Math.PI / 2, 0, 0] });
    if (cargo) solid(BOX(9.5, 2.6, 2.4), { m, pos: [-1.2, 2.65, 0], color: cargo });
  }
  function harborHF(x, z) {
    let h;
    if (z > 0) h = 2.2 + sm(70, 170, z) * fbm(x / 80, z / 80, 4, 2) * 80;
    else h = -6;
    const head = sm(-150, -200, x) * sm(70, 20, z);
    if (head > 0) h = lerp(h, 6 + fbm(x / 50, z / 50, 4, 3) * 60, head);
    const far = sm(-480, -700, z);
    if (far > 0) h = lerp(h, 10 + Math.pow(ridged(x / 220, z / 220, 5, 8), 2) * 520, far);
    return h;
  }
  var D2R = Math.PI / 180;
  var clamp01 = (x) => Math.min(1, Math.max(0, x));
  function sph(lat, lon, r = 100) {
    const a = lat * D2R, b = lon * D2R;
    return [r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b)];
  }
  function capture(fn) {
    const keep = [LB, PB, FILLS, HF];
    LB = new Map();
    PB = new Map();
    FILLS = [];
    HF = () => 0;
    const keepZ = ZONE;
    ZONE = 0;
    fn();
    const g = new THREE.Group();
    g.userData.local = true;
    flush(g);
    [LB, PB, FILLS, HF] = keep;
    ZONE = keepZ;
    scene.add(g);
    return g;
  }
  var BOARDS = WL.boards.map((b) => ({ ...b }));
  function landF(lat, lon) {
    return WORLD ? WORLD.landF(lat, lon, landF0) : landF0(lat, lon);
  }
  function landF0(lat, lon) {
    let v = fbm(lon / 24 + 40, lat / 24 + 40, 5, 61) * 1.05;
    for (const b of BOARDS) {
      const dl = (lon - b.lon) * Math.cos(lat * D2R), d2 = dl * dl + (lat - b.lat) ** 2;
      v += 0.2 * Math.exp(-d2 / 70);
    }
    return v;
  }
  var isHome = (b) => b.current;
  var HOME = (() => {
    const b = BOARDS.find(isHome);
    if (!b) throw new Error("world data: no open board");
    return [b.lat, b.lon];
  })();
  var DETAIL = [4, 32, -12, 16];
  var inDetail = (la, lo) => la >= DETAIL[0] && la < DETAIL[1] && lo >= DETAIL[2] && lo < DETAIL[3];
  function sphContour(levels, color, op, r, box = [-80, 80, -150, 150], s = 0.6, skip = false) {
    const nx = Math.round((box[3] - box[2]) / s), nz = Math.round((box[1] - box[0]) / s), v = new Float32Array((nx + 1) * (nz + 1)), arr = lines(color, op);
    for (let j = 0; j <= nz; j++) for (let i = 0; i <= nx; i++) v[j * (nx + 1) + i] = landF(box[0] + j * s, box[2] + i * s);
    for (const lv of levels) for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      if (skip && inDetail(box[0] + (j + 0.5) * s, box[2] + (i + 0.5) * s)) continue;
      if (WORLD && WORLD.hole(box[0] + (j + 0.5) * s, box[2] + (i + 0.5) * s)) continue;
      const c = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => [box[2] + a * s, box[0] + b * s, v[b * (nx + 1) + a] - lv]), p = [];
      for (let e = 0; e < 4; e++) {
        const A = c[e], B = c[(e + 1) % 4];
        if (A[2] < 0 !== B[2] < 0) {
          const t = A[2] / (A[2] - B[2]);
          p.push(sph(A[1] + (B[1] - A[1]) * t, A[0] + (B[0] - A[0]) * t, r));
        }
      }
      if (p.length >= 2) arr.push(...p[0], ...p[1]);
      if (p.length === 4) arr.push(...p[2], ...p[3]);
    }
  }
  var rimRings = [];
  function buildPlanet() {
    seed = 23;
    scene.fog = null;
    const TH = 0.52;
    ZONE = WORLD ? 1 : 0;
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(99.7, 160, 120), fillMat));
    const g = lines(INK, 0.1);
    for (let lat = -75; lat <= 75; lat += 15) for (let lon = -180; lon < 180; lon += 2) if (!WORLD || !WORLD.hole(lat, lon + 1)) g.push(...sph(lat, lon, 100.02), ...sph(lat, lon + 2, 100.02));
    for (let lon = -180; lon < 180; lon += 15) for (let lat = -88; lat < 88; lat += 2) if (!WORLD || !WORLD.hole(lat + 1, lon)) g.push(...sph(lat, lon, 100.02), ...sph(lat + 2, lon, 100.02));
    const Lh = lines(INK, 0.34), Oc = lines(INK, 0.09), st = 0.7;
    for (let j = 0; j * st <= 156; j++) {
      const lat = -78 + j * st;
      for (let lon = -150; lon < 150; lon += st) {
        if (landF(lat, lon + st / 2) > TH) (WORLD && WORLD.hole(lat, lon + st / 2) ? [] : Lh).push(...sph(lat, lon, 100.05), ...sph(lat, lon + st, 100.05));
        else if (j % 5 === 0) Oc.push(...sph(lat, lon, 100.02), ...sph(lat, lon + st, 100.02));
      }
    }
    if (WORLD) for (const [off, f] of [[0.5, 49], [0.25, 24.5], [0.75, 24.5]]) {
      FEAT = f;
      const L = lines(INK, 0.34);
      for (let j = 0; j * st < 156; j++) {
        const lat = -78 + (j + off) * st;
        for (let lon = -150; lon < 150; lon += st) if (landF(lat, lon + st / 2) > TH && !WORLD.hole(lat, lon + st / 2)) L.push(...sph(lat, lon, 100.05), ...sph(lat, lon + st, 100.05));
      }
      FEAT = 0;
    }
    sphContour([TH], INK, 0.95, 100.08);
    sphContour([TH + 0.06, TH + 0.12, TH + 0.18, TH + 0.24], INK, 0.42, 100.07);
    if (WORLD) sphContour([40, 70, 100, 130, 160, 190, 220, 250, 280].map((h) => TH + h * 4e-3), INK, 0.42, 100.09, [-80, 80, -150, 150], 0.3);
    const items = [];
    for (const b of BOARDS) {
      if (WORLD && isHome(b)) {
        items.push({ name: b.name, st: b.st, chip: b.chip, at: sph(b.lat, b.lon, 100.3), id: b.slug });
        continue;
      }
      const c = COLOR[b.st], rr = 1.2 + Math.sqrt(b.n) * 0.45, pts = [], dI = dots(INK, 2, 0.9), dC = dots(c, 2.4, 1);
      for (let i = 0; i < 30 + b.n * 7; i++) {
        const a = rnd() * 6.283, r = rr * Math.sqrt(rnd()) * (rnd() < 0.2 ? 1.8 : 1), p = sph(b.lat + Math.sin(a) * r, b.lon + Math.cos(a) * r / Math.cos(b.lat * D2R), 100.35);
        pts.push(p);
        (i % 4 === 0 ? dC : dI).push(...p);
      }
      const L = lines(c, 0.45);
      for (let i = 0; i < pts.length; i++) {
        let best = -1, bd = 1e9;
        for (let j = 0; j < pts.length; j++) {
          if (j === i) continue;
          const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1], pts[i][2] - pts[j][2]);
          if (d < bd) {
            bd = d;
            best = j;
          }
        }
        if (bd < rr * 0.7) L.push(...pts[i], ...pts[best]);
      }
      if (b.labeled !== false) items.push({ name: b.name, st: b.st, chip: b.chip, at: sph(b.lat, b.lon, 100.3), id: b.slug });
    }
    ZONE = 0;
    {
      const d = dots(INK, 1.3, 0.55);
      for (let i = 0; i < 1500; i++) d.push(...sph(R(-85, 85), R(-180, 180), 3e3));
    }
    flush();
    const rim = new THREE.Group();
    rimRings = [[100, 0.55], [101.6, 0.25], [104.5, 0.1]].map(([r, o]) => {
      const pts = [];
      for (let i = 0; i <= 256; i++) {
        const a = i / 256 * 6.283;
        pts.push(Math.cos(a), Math.sin(a), 0);
      }
      const gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const l = new THREE.Line(gg, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: o, depthTest: false }));
      l.userData = { r, o };
      rim.add(l);
      return l;
    });
    scene.add(rim);
    return items;
  }
  function glide(t, a, b, r1, r2) {
    const L = b - a, x = Math.min(Math.max(t - a, 0), L), area = r1 / 2 + (L - r1 - r2) + r2 / 2, ramp = (s, r) => s / 2 - r / (2 * Math.PI) * Math.sin(Math.PI * s / r);
    return (x <= r1 ? ramp(x, r1) : x <= L - r2 ? r1 / 2 + x - r1 : area - ramp(L - x, r2)) / area;
  }
  var se = (u) => 0.5 - 0.5 * Math.cos(Math.PI * clamp01(u));
  var FOCAL = H / 2 / Math.tan(20 * D2R);
  function makeWorld() {
    const K = 1 / 80, RP = 100, RR = RP / K, BAND = [1250, 1600], TH = 0.52;
    const N = new THREE.Vector3(...sph(HOME[0], HOME[1], 1)), NO = new THREE.Vector3(0, 1, 0).sub(N.clone().multiplyScalar(N.y)).normalize(), E = NO.clone().cross(N).normalize();
    const xyz = (x, y, z) => {
      const dx = N.x * RR + E.x * x - NO.x * z, dy = N.y * RR + E.y * x - NO.y * z, dz = N.z * RR + E.z * x - NO.z * z, s = (RP + y * K) / Math.hypot(dx, dy, dz);
      return [dx * s, dy * s, dz * s];
    };
    const xf = (v) => new THREE.Vector3(...xyz(v[0], v[1], v[2]));
    const toRegion = (p) => {
      const c = p.dot(N);
      return [RR * p.dot(E) / c, -RR * p.dot(NO) / c, c];
    };
    const dist = (lat, lon) => {
      const p = new THREE.Vector3(...sph(lat, lon, 1));
      return Math.acos(Math.min(1, p.dot(N))) * RR;
    };
    const shader = (head, body, frag) => ({ vertexShader: `${head}
  #include <fog_pars_vertex>
  void main(){
  ${body}
  #include <fog_vertex>
  }`, fragmentShader: `uniform vec3 color; uniform float opacity; varying float vL;
  #include <fog_pars_fragment>
  void main(){ float a = opacity * vL${frag}; if (a < .002) discard; gl_FragColor = vec4(color, a);
  #include <colorspace_fragment>
  #include <fog_fragment>
  }` });
    const lod = `float dd = max(-mvPosition.z, 1e-4), fp = abs(feat) * focal / dd; vL = feat == 0. ? 1. : smoothstep(px0, px1, fp); if (feat < 0.) vL = 1. - vL;
    if (zone != 0.) { float r = acos(clamp(dot(normalize(position), cen), -1., 1.)) * 100., q = zb.y - zb.x; vL *= zone > 0. ? smoothstep(zb.x, zb.x + .6 * q, r) : 1. - smoothstep(zb.x + .4 * q, zb.y, r); }`;
    const uni = (color, op, feat, zone, extra = {}) => {
      const pz = zone === -2, zc = pz ? W_.port.cen : N, zbv = pz ? W_.port.band : [BAND[0] * K, BAND[1] * K];
      return THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { color: { value: new THREE.Color(color) }, opacity: { value: op }, feat: { value: feat * K }, focal: { value: FOCAL }, px0: { value: 2.5 }, px1: { value: 14 }, zone: { value: zone }, cen: { value: zc.clone() }, zb: { value: new THREE.Vector2(zbv[0], zbv[1]) }, ...extra }]);
    };
    const lineMat = (color, op, feat, zone) => new THREE.ShaderMaterial({
      transparent: true,
      fog: true,
      uniforms: uni(color, op, feat, zone),
      ...shader("uniform float feat, focal, px0, px1, zone; uniform vec3 cen; uniform vec2 zb; varying float vL;", `vec4 mvPosition = modelViewMatrix * vec4(position, 1.); ${lod} gl_Position = projectionMatrix * mvPosition;`, "")
    });
    const pointMat = (color, size, op, feat, zone) => new THREE.ShaderMaterial({
      transparent: true,
      fog: true,
      uniforms: uni(color, op, feat, zone, { size: { value: size * renderer.getPixelRatio() } }),
      ...shader("uniform float feat, focal, px0, px1, size, zone; uniform vec3 cen; uniform vec2 zb; varying float vL;", `vec4 mvPosition = modelViewMatrix * vec4(position, 1.); ${lod} gl_PointSize = size; gl_Position = projectionMatrix * mvPosition;`, "")
    });
    const coast = (x, z, r) => Math.max(-110, Math.min(110, (coastX(z) - x) * 0.6)) * (1 - sm(1500, 3200, r));
    const planetH = (x, z) => {
      const p = new THREE.Vector3(...xyz(x, 0, z));
      return (landF0(Math.asin(p.y / RP) / D2R, Math.atan2(p.x, p.z) / D2R) - TH) / 4e-3 + coast(x, z, Math.hypot(x, z));
    };
    const blendH = (f) => (x, z) => {
      const r = Math.hypot(x, z);
      return r < 950 ? f(x, z) : lerp(f(x, z), planetH(x, z), sm(950, 1250, r));
    };
    const portHF = (f, S) => {
      const i = PORT_I, s = S[i], sea = FOCUS_T === "harbor", k = sea ? 0.25 : 0.5, Ox = sea ? s.x + 16 : s.x, Oz = s.z;
      if (s.t !== FOCUS_T) throw new Error(`world data: site ${i} is a ${s.t}, the pipeline a ${FOCUS_T}`);
      const s2r = sea ? ([x, y, z]) => [Ox - k * z, k * (y + 0.4), Oz + k * x] : ([x, y, z]) => [Ox - k * z, s.lv + k * y, Oz + k * x];
      W_.port = { i, k, Ox, Oz, s2r, cen: xf([sea ? Ox + 10 : Ox, 0, Oz]).normalize(), band: sea ? [45 * K, 75 * K] : [70 * K, 100 * K] };
      if (!sea) return (x, z) => {
        const xs = (z - Oz) / k, zs = (Ox - x) / k, d = k * Math.hypot(Math.max(0, Math.abs(xs) - 150), Math.max(0, Math.abs(zs - 25) - 125));
        return d >= 24 ? f(x, z) : lerp(s.lv, f(x, z), sm(0, 24, d));
      };
      return (x, z) => {
        const xs = (z - Oz) / k, zs = (Ox - x) / k, d = k * Math.hypot(Math.max(0, Math.abs(xs) - 240), Math.max(0, Math.abs(zs) - 200));
        if (d >= 30) return f(x, z);
        const hs = harborHF(xs, zs), ys = hs >= -0.4 ? k * (hs + 0.4) : lerp(0, -8, Math.min(1, (-0.4 - hs) / 5.6));
        return lerp(ys, f(x, z), sm(0, 30, d));
      };
    };
    const W_ = {
      K,
      RP,
      RR,
      N,
      NO,
      E,
      TH,
      BAND,
      xyz,
      xf,
      toRegion,
      lineMat,
      pointMat,
      blendH,
      portHF,
      port: null,
      mapProj: false,
      locals: [],
      hole: (lat, lon, f = 1) => dist(lat, lon) < BAND[0] * f,
      landF: (lat, lon, f0) => {
        const p = new THREE.Vector3(...sph(lat, lon, 1)), d = Math.acos(Math.min(1, p.dot(N))) * RR;
        if (d > 3300) return f0(lat, lon);
        const [x, z] = toRegion(p);
        return d > 1250 ? f0(lat, lon) + coast(x, z, d) * 4e-3 : TH + W_.HF(x, z) * 4e-3;
      }
    };
    return W_;
  }
  function mapToPlanet(o) {
    const p = o.geometry.attributes.position, a = p.array;
    for (let i = 0; i < a.length; i += 3) {
      const v = WORLD.xyz(a[i], a[i + 1], a[i + 2]);
      a[i] = v[0];
      a[i + 1] = v[1];
      a[i + 2] = v[2];
    }
    p.needsUpdate = true;
    o.geometry.computeBoundingSphere();
  }
  var WC = new THREE.PerspectiveCamera(40, W / H, 1, 9e3);
  var ZW = { a: 0.8, b: 11.6, r1: 1.4, r2: 3 };
  var Z2W = { a: ZW.b + 2.2, b: ZW.b + 11.7, r1: 1.4, r2: 2.6, pan: 6.5 };
  var LD0 = Math.log(260);
  var LDT = Math.log(60);
  var RL1;
  var RL2;
  var LD1;
  var LD2;
  var WP1;
  var WH1;
  var WP2;
  var WH2;
  var TW = null;
  var SW1 = (t) => glide(t, ZW.a, ZW.b, ZW.r1, ZW.r2) * (LD0 - LD1);
  var SW2 = (t) => glide(t, Z2W.a, Z2W.b, Z2W.r1, Z2W.r2) * (LD1 - LD2);
  function camPose(lookR, h, p, dist) {
    const L = WORLD.xf(lookR), U = L.clone().normalize(), E = WORLD.E.clone().addScaledVector(U, -WORLD.E.dot(U)).normalize(), S = E.clone().cross(U);
    const dir = E.clone().multiplyScalar(Math.cos(p) * Math.sin(h)).addScaledVector(U, Math.sin(p)).addScaledVector(S, Math.cos(p) * Math.cos(h));
    const up = E.clone().multiplyScalar(-Math.sin(p) * Math.sin(h)).addScaledVector(U, Math.cos(p)).addScaledVector(S, -Math.sin(p) * Math.cos(h));
    WC.position.copy(L).addScaledVector(dir, dist);
    WC.up.copy(up);
    WC.lookAt(L);
  }
  function worldCam(t) {
    let dist;
    if (t < Z2W.a) {
      const ld = LD0 - SW1(t);
      dist = Math.exp(ld);
      camPose(RL1, WH1, lerp(Math.PI / 2, WP1, se((LDT - ld) / (LDT - LD1))), dist);
    } else {
      dist = Math.exp(LD1 - SW2(t));
      const u = se((t - Z2W.a) / Z2W.pan);
      camPose(RL1.map((v, i) => lerp(v, RL2[i], u)), lerp(WH1, WH2, u), lerp(WP1, WP2, u), dist);
    }
    const alt = WC.position.length() - 100;
    WC.near = Math.max(2e-3, alt * lerp(0.08, 0.3, sm(5, 20, alt)));
    WC.far = alt > 20 ? WC.position.length() + 3100 : dist * 4 + 40;
    WC.updateProjectionMatrix();
    WC.updateMatrixWorld();
    return { dist, alt };
  }
  function frameW(t, ta = t, moving = false, hidden = false) {
    const { dist, alt } = worldCam(t);
    for (const m of ANIM.movers) m(ta);
    for (const g of WORLD.locals) {
      const site = g.userData.site, pr = site ? WORLD.port.s2r([g.position.x, g.position.y, g.position.z]) : [g.position.x, g.position.y, g.position.z], sc = WORLD.K * (site ? WORLD.port.k : 1);
      const P = WORLD.xf(pr), U = P.clone().normalize(), e = WORLD.E.clone().addScaledVector(U, -WORLD.E.dot(U)).normalize(), s = e.clone().cross(U);
      g.matrix.makeBasis(e, U, s).multiply(new THREE.Matrix4().makeRotationY(g.rotation.y - (site ? Math.PI / 2 : 0))).scale(new THREE.Vector3(sc * g.scale.x, sc * g.scale.y, sc * g.scale.z)).setPosition(P);
      g.matrixWorldNeedsUpdate = true;
    }
    scene.fog.near = dist * 0.9 + 150 * WORLD.K;
    scene.fog.far = scene.fog.near + Math.max(1700 * WORLD.K, dist * 1.5);
    const d = WC.position.length(), n = WC.position.clone().normalize();
    for (const l of rimRings) {
      const r = l.userData.r;
      if (d <= r * 1.001) {
        l.visible = false;
        continue;
      }
      l.visible = true;
      l.position.copy(n).multiplyScalar(r * r / d);
      l.scale.setScalar(r * Math.sqrt(1 - (r / d) ** 2));
      l.lookAt(WC.position);
      l.material.opacity = l.userData.o * sm(6, 40, alt);
    }
    renderer.setRenderTarget(null);
    renderer.render(scene, WC);
    const ph = t < TW.rIn0 - 0.3 ? "planet" : t < TW.sIn0 - 0.3 ? "region" : "site";
    const o = ph === "planet" ? 1 - sm(TW.pOut0, TW.pOut1, t) : ph === "region" ? sm(TW.rIn0, TW.rIn1, t) * (1 - sm(TW.rOut0, TW.rOut1, t)) : sm(TW.sIn0, TW.sIn1, t);
    for (const k of PHASES) {
      const L = LAYERS[k], on = k === ph;
      L.hud.classList.toggle("on", on);
      L.ov.classList.toggle("on", on && !hidden);
      L.ov.classList.toggle("dim", moving || o < 0.6);
      L.hud.classList.toggle("dim", moving || o < 0.6);
      if (on) L.hud.style.opacity = L.ov.style.opacity = String(o);
    }
    return ph;
  }
  function runWorld() {
    ANIM = { movers: [] };
    WORLD = makeWorld();
    const reset = () => {
      LB = new Map();
      PB = new Map();
      FILLS = [];
      OBS.clear();
    };
    reset();
    const rs = scene = new THREE.Scene();
    buildRegion("mixed");
    WORLD.HF = HF;
    const ws = new THREE.Scene();
    for (const o of [...rs.children]) {
      if (o.userData.local) {
        o.matrixAutoUpdate = false;
        WORLD.locals.push(o);
      } else mapToPlanet(o);
      ws.add(o);
    }
    reset();
    scene = ws;
    const pItems = buildPlanet();
    scene.fog = new THREE.Fog(BG, 1, 2);
    reset();
    {
      FEAT = -6;
      const S = WORLD.S;
      S.forEach((s, i) => {
        seed = siteSeed(i);
        const st = WORLD.items[i].st, dI = dots(INK, 2, 0.9), dC = dots(COLOR[st], 2.4, 1);
        for (let k = 0; k < 45; k++) {
          const a = rnd() * 6.283, r = s.r * 1.5 * Math.sqrt(rnd()), x = s.x + Math.cos(a) * r, z = s.z + Math.sin(a) * r;
          (k % 4 === 0 ? dC : dI).push(...WORLD.xyz(x, Math.max(1, HF(x, z)) + 2, z));
        }
      });
      flush(ws);
      FEAT = 0;
    }
    RL1 = [100, 0, -50];
    const rd = new THREE.Vector3(10, 430, 660);
    LD1 = Math.log(rd.length() * WORLD.K);
    WP1 = Math.asin(rd.y / rd.length());
    WH1 = Math.atan2(rd.x, rd.z);
    RL2 = WORLD.port.s2r([0, 0, { harbor: 35, village: 10, farm: 30 }[FOCUS_T]]);
    LD2 = Math.log({ harbor: 320, village: 230, farm: 280 }[FOCUS_T] * WORLD.port.k * WORLD.K);
    WP2 = Math.atan2(200, 260);
    WH2 = 70 * D2R;
    TW = { pOut0: 0.8, pOut1: 1.3, rIn0: ZW.b, rIn1: ZW.b + 0.5, rOut0: Z2W.a, rOut1: Z2W.a + 0.4, sIn0: Z2W.b, sIn1: Z2W.b + 0.5 };
    worldCam(0);
    CAM = WC;
    const hud = (next) => {
      chrome(LAYERS.planet.hud, { ...next.planet, tabCol: TONE[next.planet.tabTone], hint: WORDS.hint.planet });
      chrome(LAYERS.region.hud, { ...next.region.chrome, tabCol: TONE[next.region.chrome.tabTone], hint: WORDS.hint.region });
      const p = next.region.pipelines.find((x) => x.key === PORT_P.key) || PORT_P;
      chrome(LAYERS.site.hud, { ...p.chrome, tabCol: TONE[p.chrome.tabTone], hint: WORDS.hint[FOCUS_T] });
    };
    for (const ph of PHASES) LAYERS[ph].hud.classList.add("on");
    hud(WL);
    placeLabels(LAYERS.planet.ov, pItems, []);
    worldCam(TW.rIn1);
    WORLD.mapProj = true;
    placeLabels(LAYERS.region.ov, WORLD.items, WORLD.S.map(siteBox));
    worldCam(TW.sIn1);
    columnLabels(LAYERS.site.ov, WORLD.portItems, { top: 130 });
    WORLD.mapProj = false;
    for (const ph of PHASES) LAYERS[ph].hud.classList.remove("on");
    const UPLOAD = [...ws.children], shown = UPLOAD.map((o) => o.visible), culled = [];
    ws.traverse((c) => {
      culled.push([c, c.frustumCulled]);
      c.frustumCulled = false;
    });
    for (const o of UPLOAD) o.visible = false;
    const vp = new THREE.Vector4(), sc = new THREE.Vector4();
    for (let i = 0; i < UPLOAD.length; i += 6) {
      const part = UPLOAD.slice(i, i + 6), cut = renderer.getScissorTest();
      renderer.getViewport(vp);
      renderer.getScissor(sc);
      renderer.setRenderTarget(null);
      renderer.setViewport(0, 0, 1, 1);
      renderer.setScissor(0, 0, 1, 1);
      renderer.setScissorTest(true);
      for (const o of part) o.visible = true;
      renderer.render(ws, WC);
      for (const o of part) o.visible = false;
      renderer.setViewport(vp);
      renderer.setScissor(sc);
      renderer.setScissorTest(cut);
    }
    UPLOAD.forEach((o, i) => {
      o.visible = shown[i];
    });
    for (const [c, f] of culled) c.frustumCulled = f;
    const STOPS = { planet: 0.75, region: TW.rIn1 + 0.1, site: TW.sIn1 + 0.1 };
    return {
      scene: ws,
      stops: STOPS,
      board: WL.region.slug,
      focus: PORT_P.key,
      spots: SITE_SPOTS,
      home: WORLD.N.clone(),
      frame: frameW,
      rehud: hud,
      dispose() {
        for (const ph of PHASES) {
          LAYERS[ph].ov.remove();
          LAYERS[ph].hud.remove();
        }
        disposeScene(ws);
        }
    };
  }
  function buildPort() {
    const items = [];
    FEAT = 4;
    {
      const r = lines(INK, 0.9);
      r.push(-240, 2.25, 0, 240, 2.25, 0);
    }
    FEAT = 0.5;
    for (let x = -234; x < 240; x += 8) solid(CYL(0.35, 0.45, 0.8, 8), { pos: [x, 2.6, 1] });
    {
      const t = lines(INK, 0.45);
      for (const z of [3, 4.4, 15, 16.4]) t.push(-240, 2.25, z, 240, 2.25, z);
      FEAT = 0.4;
      const u = lines(INK, 0.45);
      for (let x = -240; x < 240; x += 1.5) u.push(x, 2.25, 2.8, x, 2.25, 4.6, x, 2.25, 14.8, x, 2.25, 16.6);
    }
    FEAT = 3;
    {
      const m = fr(-118, 2.2, 52, 0);
      solid(BOX(60, 12, 22), { m, pos: [0, 6, 0], op: 1 });
      for (let x = -27; x <= 27; x += 6) seg(m, [x, 0, 11.02], [x, 12, 11.02], INK, 0.4);
      solid(prism(61, 4, 23), { m, pos: [0, 12, 0] });
      for (const x of [-18, 0, 18]) pl(m, [[x - 3.5, 0, 11.03], [x - 3.5, 7, 11.03], [x + 3.5, 7, 11.03], [x + 3.5, 0, 11.03]], INK, 0.9);
    }
    FEAT = 1.5;
    for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) {
      const hgt = 1 + Math.floor(rnd() * 3);
      for (let k = 0; k < hgt; k++) solid(BOX(12, 2.6, 2.5), { pos: [-80 + i * 13.5, 2.2 + 1.3 + k * 2.6, 30 + j * 3.2], op: 0.7 });
    }
    const BERTH = Math.min(70, 210 / Math.max(1, PORT_P.units.length - 1));
    const REV = PORT_P.units.map((u, k, a) => [u.label, u.st, (k - (a.length - 1) / 2) * BERTH, u.chip, u.id]);
    const IDLE = !PORT_P.counts.work;
    for (const [n2, st, x, chip, id] of REV) {
      const c = COLOR[st], work = st === "work";
      FEAT = 6;
      const at = stsCrane(x, 0, c, work);
      ship(fr(x, -0.4, -18, 0), Math.min(62, BERTH * 0.88), 13, work ? 0.55 : 1, work ? GOLD : INK, 0.95);
      FEAT = 1;
      if (work) sparks(tp(fr(x, 0, -24, 0), [0, 12, 0]), 26, 2.2);
      items.push({ name: n2, st, chip, at, id });
    }
    FEAT = 1;
    for (const [x0, x1, lane, ph, cg] of [[-78, -35, 6.5, 0, GOLD], [-70, 35, 12.5, 0.45, GOLD], [-60, 60, 9.5, 0.7, null]]) {
      const g = capture(() => truck(0, 0, 0, IDLE ? INK : cg));
      ANIM.movers.push((t) => {
        const c = IDLE ? 0 : (t / 11 + ph) % 1, u = c < 0.5 ? sm(0, 0.45, c) : 1 - sm(0.5, 0.95, c);
        g.position.set(lerp(x0, x1, u), 0, lane);
        g.rotation.y = c < 0.5 ? 0 : Math.PI;
      });
    }
    truck(-140, 22, 0.1, INK);
    truck(100, 25, Math.PI, INK);
    FEAT = 4;
    {
      const bw = [[[-200, -10], [-120, -120], [-26, -175]], [[200, -10], [150, -120], [26, -175]]];
      for (const P of bw) {
        for (let i = 0; i < P.length - 1; i++) {
          const [ax, az] = P[i], [bx, bz] = P[i + 1], L = Math.hypot(bx - ax, bz - az);
          solid(BOX(L, 4, 6), { pos: [(ax + bx) / 2, 0, (az + bz) / 2], rot: [0, -Math.atan2(bz - az, bx - ax), 0], op: 0.85 });
        }
      }
      FEAT = 2;
      for (const k of [-1, 1]) {
        const x = k * 26, z = -175;
        solid(CYL(1.6, 2.6, 16, 10), { pos: [x, 10, z], color: LAB });
        solid(CYL(2.6, 2.6, 0.6, 12), { pos: [x, 18.2, z], color: LAB });
        solid(CYL(1.3, 1.3, 2.4, 8), { pos: [x, 19.7, z], color: LAB, fill: false });
        solid(new THREE.ConeGeometry(1.7, 2, 8), { pos: [x, 21.9, z], color: LAB });
        solid(BOX(1.4, 9, 27), { pos: [k * 12.5, 2.5, z - 6], rot: [0, k * 1.2, 0], color: LAB });
      }
      for (const u of PORT_P.gate ? [PORT_P.gate] : []) items.push({ name: u.label, st: u.st, chip: u.chip, at: [0, 9, -180], id: u.id });
    }
    FEAT = 4;
    ship(fr(-20, -0.4, -250, 0.3), 70, 13, 1, INK, 0.6);
    ship(fr(70, -0.4, -80, -0.4), 16, 5, 0, INK, 0.9);
    FEAT = 2;
    let n = 0;
    for (let i = 0; i < 800 && n < 90; i++) {
      const x = R(-230, 230), z = R(70, 170);
      if (HF(x, z) > 60) continue;
      house(x, z, R(-0.2, 0.2) + (rnd() < 0.5 ? 0 : Math.PI / 2), { w: R(5, 9), d: R(5, 8), h: R(3.5, 8), rh: R(1.2, 2.8), op: 0.7 });
      n++;
    }
    let nt = 0;
    for (let i = 0; i < 6e3 && nt < 600; i++) {
      const x = R(-235, 235), z = R(-195, 195), h = HF(x, z);
      if (h < 4 || h > 300 || obsHit(x, z, 3)) continue;
      if (fbm(x / 50, z / 50, 3, 41) < 0.47) continue;
      tree(x, z, R(2, 3), "c", 0.7);
      nt++;
    }
    ZONE = -2;
    FEAT = 1.5;
    waterHatch(2600, -240, 240, -200, 0, -0.4, 0.28);
    ZONE = 0;
    return items;
  }
  function buildVillageW() {
    const items = [], U = PORT_P.units, n = U.length, SP = Math.min(26, 130 / Math.max(1, n - 1)), G = PORT_P.gate;
    FEAT = 3;
    road([[-120, -16], [120, -16]], 5, { op: 0.7, center: true });
    road([[0, -16], [0, -100]], 4, { op: 0.6 });
    road([[0, -16], [0, 40], [-12, 90]], 3.2, { op: 0.55, n: 8 });
    U.forEach((u, k) => {
      const x = (k - (n - 1) / 2) * SP, c = COLOR[u.st], work = u.st === "work";
      FEAT = 3;
      const m = house(x, 4, Math.PI, { w: Math.min(13, SP - 5), d: 8, h: 5, rh: 3.6, color: c, op: 1, chim: true });
      solid(BOX(8, 0.3, 4), { m, pos: [0, 4.2, 6], rot: [-0.25, 0, 0], color: c, op: 0.9 });
      for (const px of [-3.6, 3.6]) seg(m, [px, 0, 7.8], [px, 3.7, 7.8], c, 0.9);
      solid(BOX(4, 0.9, 1.4), { m, pos: [-1, 0.45, 6], color: c });
      FEAT = 1;
      if (work) {
        sparks(tp(m, [-1, 1.4, 6]), 40, 1.6);
        const w1 = tp(m, [-1, 0, 7.6]), w2 = tp(m, [1.8, 0, 6.6]);
        worker(w1[0], w1[2], 0, GOLD, "work");
        worker(w2[0], w2[2], 2, GOLD, "work");
        smoke(tp(m, [3.6, 9, 1]), 18, INK, 200, 0.4);
        crate(m, [2.8, 0.9, 6], [1.3, 1, 1], GOLD);
      } else crate(m, [2.5, 0, 6.5], [1.6, 1.2, 1.3], u.st === "fail" ? c : INK);
      items.push({ name: u.label, st: u.st, chip: u.chip, at: tp(m, [0, 10, 0]), id: u.id });
    });
    FEAT = 3;
    {
      const z = -66;
      for (const [a, b] of [[-130, -9], [9, 130]]) solid(BOX(b - a, 6, 2.6), { pos: [(a + b) / 2, 3, z], op: 0.85 });
      for (const k of [-1, 1]) {
        solid(BOX(7, 14, 7), { pos: [k * 9.5, 7, z], color: LAB });
        solid(new THREE.ConeGeometry(5.6, 6, 4), { pos: [k * 9.5, 17, z], rot: [0, Math.PI / 4, 0], color: LAB });
      }
      solid(BOX(12, 4, 4), { pos: [0, 9, z], color: LAB });
      if (G) items.push({ name: G.label, st: G.st, chip: G.chip, at: [0, 13, z], id: G.id });
    }
    {
      const m = house(-44, 46, 0, { w: 22, d: 11, h: 7, rh: 5, chim: true, op: 1 });
      for (let k = 0; k < 3; k++) crate(m, [6 + k * 2.2, 0, 7.5], [1.8, 1.4, 1.4], INK);
    }
    FEAT = 1;
    if (U.some((u) => u.st === "work")) for (const ph of [0, 0.5]) {
      const g = capture(() => {
        cart(0, 0, 0, GOLD, 1.3);
        worker(1.6, 2.2, 0);
      });
      ANIM.movers.push((t) => {
        const c = (t / 14 + ph) % 1, q = c < 0.5 ? sm(0, 0.45, c) : 1 - sm(0.5, 0.95, c);
        g.position.set(lerp(-100, 100, ph ? 1 - q : q), 0, ph ? -14 : -18);
        g.rotation.y = c < 0.5 === !ph ? 0 : Math.PI;
      });
    }
    FEAT = 2;
    let nh = 0;
    for (let i = 0; i < 900 && nh < 44; i++) {
      const x = R(-140, 140), z = R(26, 130);
      if (Math.hypot(x, z - 50) > 110 || obsHit(x, z, 5)) continue;
      house(x, z, (rnd() < 0.5 ? 0 : Math.PI / 2) + R(-0.15, 0.15), { w: R(6, 10), d: R(5, 7), h: R(3.5, 5.5), rh: R(2.4, 3.4), op: 0.78, chim: rnd() < 0.4 });
      nh++;
    }
    let nt = 0;
    for (let i = 0; i < 4e3 && nt < 160; i++) {
      const x = R(-150, 150), z = R(-100, 150);
      if (z < -72 ? Math.abs(x) < 12 : Math.hypot(x, z - 40) < 118 || z < 0) continue;
      if (obsHit(x, z, 3) || fbm(x / 40, z / 40, 3, 61) < 0.45) continue;
      tree(x, z, R(1.8, 2.6), rnd() < 0.5 ? "c" : "d", 0.7);
      nt++;
    }
    return items;
  }
  function buildFarmW() {
    const items = [], U = PORT_P.units, n = U.length, cols = Math.min(3, n), rows = Math.ceil(n / cols), w = 60, d = 34, G = PORT_P.gate, zb = rows * 46 + 22;
    FEAT = 3;
    const lane = -cols * 35 - 6;
    road([[-130, -32], [130, -32]], 4, { op: 0.65 });
    road([[0, -32], [0, -100]], 3.4, { op: 0.55 });
    road([[lane, -32], [lane, zb + 20]], 3, { op: 0.5 });
    U.forEach((u, k) => {
      const col = k % cols, row = Math.floor(k / cols), x = (col - (cols - 1) / 2) * 70, z = row * 46, work = u.st === "work", c = COLOR[u.st];
      FEAT = 2;
      field(x, z, 0, w, d, c, work ? 0.6 : 0.38, work ? 0.55 : 1, INK);
      FEAT = 1;
      if (!work) for (let i = 0; i < 8; i++) solid(CYL(0.85, 0.85, 1.5, 12), { pos: [x - 21 + i % 4 * 14 + R(-2, 2), 0.9, z - 8 + Math.floor(i / 4) * 16 + R(-2, 2)], rot: [Math.PI / 2, R(0, 3), 0], op: 0.9, color: u.st === "fail" ? c : INK });
      else {
        const tx = x - w / 2 + w * 0.55 + 2;
        tractor(tx, z, Math.PI / 2, GOLD, 1.5);
        smoke([tx + 1.8, 6, z], 8, INK, 80, 0.35);
        const dust = dots(GOLD, 1.6, 0.6);
        for (let i = 0; i < 120; i++) dust.push(tx - R(3, 8), R(0, 2.5), z + R(-8, 8));
      }
      items.push({ name: u.label, st: u.st, chip: u.chip, at: [x, 3, z], id: u.id });
    });
    FEAT = 1;
    for (let r = 0; r < rows - 1; r++) for (let x = -104; x <= 104; x += 5) if (Math.abs(x) > 5) tree(x + R(-1, 1), r * 46 + 23 + R(-1, 1), R(1.1, 1.5), "d", 0.7);
    FEAT = 3;
    {
      const m = house(-60, zb, 0, { w: 22, d: 13, h: 7, rh: 6, op: 1 });
      pl(m, [[-4, 0, 6.52], [-4, 6, 6.52], [4, 6, 6.52], [4, 0, 6.52]], INK, 0.9);
      house(-88, zb + 6, 0.1, { w: 10, d: 7, h: 4.5, rh: 3, chim: true, op: 0.9 });
    }
    {
      const x0 = 44;
      solid(BOX(8, 34, 8), { pos: [x0, 17, zb], color: LAB });
      solid(BOX(10, 5, 10), { pos: [x0, 36.5, zb], color: LAB });
      solid(prism(10.5, 2.5, 10.5), { pos: [x0, 39, zb], color: LAB });
      for (const k of [-1, 1]) {
        const sx = x0 + k * 11;
        solid(CYL(4, 4, 22, 16), { pos: [sx, 11, zb + 2], color: LAB });
        solid(new THREE.ConeGeometry(4.2, 3, 16), { pos: [sx, 23.5, zb + 2], color: LAB });
        seg(null, [x0, 34, zb], [sx, 24.5, zb + 2], LAB, 0.8);
        obsAdd(sx, zb + 2, 6);
      }
      obsAdd(x0, zb, 8);
      if (G) items.push({ name: G.label, st: G.st, chip: G.chip, at: [x0, 40, zb], id: G.id });
    }
    FEAT = 2;
    let nt = 0;
    for (let i = 0; i < 4e3 && nt < 160; i++) {
      const x = R(-150, 150), z = R(-100, 150);
      if (Math.abs(x) < 112 && z > -40 && z < zb + 16) continue;
      if (obsHit(x, z, 3) || fbm(x / 40, z / 40, 3, 71) < 0.45) continue;
      tree(x, z, R(1.8, 2.6), rnd() < 0.6 ? "d" : "c", 0.7);
      nt++;
    }
    return items;
  }
  function portR(s, st) {
    const P = WORLD.port, keep = [LB, PB, FILLS, HF, FEAT, ZONE], keepObs = new Map(OBS), n0 = scene.children.length;
    LB = new Map();
    PB = new Map();
    FILLS = [];
    HF = FOCUS_T === "harbor" ? harborHF : () => 0;
    OBS.clear();
    FEAT = 0;
    ZONE = 0;
    const items = FOCUS_T === "village" ? buildVillageW() : FOCUS_T === "farm" ? buildFarmW() : buildPort(), g = new THREE.Group();
    flush(g);
    for (const o of [...g.children]) {
      const a = o.geometry.attributes.position.array;
      for (let i = 0; i < a.length; i += 3) {
        const v = P.s2r([a[i], a[i + 1], a[i + 2]]);
        a[i] = v[0];
        a[i + 1] = v[1];
        a[i + 2] = v[2];
      }
      o.geometry.attributes.position.needsUpdate = true;
      scene.add(o);
    }
    for (const o of scene.children.slice(n0)) if (o.isGroup && o.userData.local) o.userData.site = true;
    [LB, PB, FILLS, HF, FEAT, ZONE] = keep;
    OBS.clear();
    keepObs.forEach((v, k) => OBS.set(k, v));
    const FP2 = FOCUS_T === "harbor" ? [-240, 240, 10, 200] : [-160, 160, -100, 160];
    for (let xs = FP2[0]; xs <= FP2[1]; xs += 40) for (let zs = FP2[2]; zs <= FP2[3]; zs += 40) {
      const [x, , z] = P.s2r([xs, 0, zs]);
      obsAdd(x, z, 14);
    }
    WORLD.portItems = items.map((q) => ({ ...q, at: P.s2r(q.at) }));
    return P.s2r(FOCUS_T === "harbor" ? [0, 47, 9] : [0, 24, 20]);
  }
  return runWorld();
}

export function mountWorld(host, opts) {
  const { words, onPick, onFallback, onStop } = opts
  const bad = gpuProblem()
  if (bad) {
    onFallback(bad)
    return { update() {}, destroy() {} }
  }
  const root = el('div', 'wlw')
  const stage = el('div', 'wlw-stage')
  const note = el('div', 'wlw-note')
  note.setAttribute('role', 'status')
  const fit = () => {
    const r = host.getBoundingClientRect()
    const s = Math.max(0.1, Math.min(r.width / W, r.height / H))
    stage.style.transform = `translate(${(r.width - W * s) / 2}px, ${(r.height - H * s) / 2}px) scale(${s})`
    return s
  }
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  root.append(el('style', null, CSS), stage, note)
  host.append(root)
  renderer.setPixelRatio(Math.min(2, Math.max(1, (window.devicePixelRatio || 1) * fit())))
  renderer.setSize(W, H, false)
  renderer.setClearColor(BG)
  stage.append(renderer.domElement, el('div', 'vig'))
  const made = []
  const env = {
    renderer,
    words,
    layers() {
      const L = {}
      for (const ph of PHASES) {
        const ov = el('div', 'layer')
        const hud = el('div', 'layer')
        ov.dataset.kind = KIND_OF[ph]
        stage.append(ov, hud)
        L[ph] = { ov, hud }
        made.push(ov, hud)
      }
      return L
    }
  }
  const ro = new ResizeObserver(() => fit())
  ro.observe(host)
  let cur = null
  let job = null
  let want = opts.data
  let wantFocus = null
  let dirty = false
  let descend = false
  let tc = null
  let target = null
  let spin = null
  let parked = null
  let fresh = false
  let dead = false
  let raf = 0
  let last = 0
  const frames = []
  const fail = (what, err) => {
    console.warn(`[wingline] the world view ${what} failed`, err)
    destroy()
    onFallback(`${what}: ${err?.message || err}`)
  }
  const build = data => {
    if (!data?.region?.pipelines?.length) {
      fail('build', new Error('the open board has no pipelines'))
      return
    }
    const base = parked || cur
    const same = base && base.board === data.region.slug
    const focus = wantFocus || (same ? base.focus : null)
    const d = { ...data, focus, keepSites: same ? base.spots : undefined }
    made.length = 0
    let g
    try {
      g = buildWorld(env, d)
    } catch (err) {
      fail('build', err)
      return
    }
    const mine = { g, board: data.region.slug, sig: sigOf(data), nodes: made.slice(), slow: [], from: 'start' }
    job = mine
    note.textContent = cur ? words.updating : words.loading
    const ch = new MessageChannel()
    ch.port1.onmessage = () => {
      if (dead || job !== mine) return
      const s = performance.now()
      SLICE.end = s + SLICE.ms
      let r
      try {
        r = g.next()
      } catch (err) {
        SLICE.end = Infinity
        job = null
        for (const n of mine.nodes) n.remove()
        fail('build', err)
        return
      }
      SLICE.end = Infinity
      const ms = performance.now() - s
      const to = r.done ? 'end' : r.value
      if (ms > 30) mine.slow.push([mine.from, to, Math.round(ms)])
      mine.from = to
      if (!r.done) {
        ch.port2.postMessage(0)
        return
      }
      job = null
      note.textContent = ''
      const inst = { ...r.value, sig: mine.sig, slow: mine.slow }
      if (dirty && want?.region?.slug !== inst.board) {
        inst.dispose()
        dirty = false
        build(want)
        return
      }
      if (cur && cur.board !== inst.board && tc !== cur.stops.planet) {
        parked = inst
        target = cur.stops.planet
      } else swap(inst)
      if (dirty) {
        dirty = false
        const base = parked || cur
        if (sigOf(want) !== base.sig || wantFocus) build(want)
        else base.rehud(want)
      }
    }
    ch.port2.postMessage(0)
  }
  const swap = inst => {
    const prev = cur
    cur = inst
    if (wantFocus === inst.focus) wantFocus = null
    if (!prev) {
      tc = target = inst.stops[opts.stop in inst.stops ? opts.stop : 'region']
    } else if (prev.board !== inst.board) {
      tc = inst.stops.planet
      target = inst.stops.planet
      const q = new THREE.Quaternion().setFromUnitVectors(prev.home, inst.home)
      spin = { q, t0: performance.now() }
      inst.scene.quaternion.copy(q)
    }
    if (descend) {
      descend = false
      target = inst.stops.site
    }
    if (prev) prev.dispose()
    opts.onSwap?.({ board: inst.board, focus: inst.focus, first: !prev, slow: inst.slow })
    fresh = true
  }
  const go = stop => {
    if (!cur) return
    target = cur.stops[stop]
    onStop?.(stop)
  }
  const phaseAt = () => (tc < cur.stops.region - 1 ? 'planet' : tc < cur.stops.site - 1 ? 'region' : 'site')
  const pick = (kind, id) => {
    if (!cur || spin) return
    if (kind === 'board') {
      if (id === cur.board) go('region')
      else onPick('board', id)
    } else if (kind === 'pipe') {
      if (id === cur.focus) go('site')
      else {
        wantFocus = id
        descend = true
        if (job) dirty = true
        else build(want)
      }
    } else if (kind === 'task') onPick('task', id)
  }
  const activate = e => {
    const up = e.target.closest?.('[data-nav]')
    if (up) {
      go(phaseAt() === 'site' ? 'region' : 'planet')
      return true
    }
    const tg = e.target.closest?.('.tg')
    if (!tg || !tg.dataset.id) return false
    pick(tg.parentElement?.dataset.kind, tg.dataset.id)
    return true
  }
  root.addEventListener('click', activate)
  root.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && activate(e)) e.preventDefault()
  })
  const loop = now => {
    raf = requestAnimationFrame(loop)
    if (!cur || document.visibilityState === 'hidden' || !root.isConnected) {
      last = 0
      return
    }
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0
    if (last && frames.length < 40 && now - last < 900) {
      frames.push(now - last)
      if (frames.length === 40) {
        const iv = frames.slice(10).sort((a, b) => a - b)
        const fps = 1000 / iv[iv.length >> 1]
        if (fps < MIN_FPS) {
          fail('frame rate check', new Error(`${fps.toFixed(0)} frames per second, needs ${MIN_FPS}`))
          return
        }
      }
    }
    last = now
    if (parked && tc === cur.stops.planet) {
      const p = parked
      parked = null
      swap(p)
    }
    if (spin) {
      const k = smooth(0, 1, (now - spin.t0) / 1400)
      cur.scene.quaternion.slerpQuaternions(spin.q, new THREE.Quaternion(), k)
      if (k >= 1) {
        spin = null
        target = cur.stops.region
      }
    } else if (tc !== target) {
      const step = dt * RATE
      tc = Math.abs(target - tc) <= step ? target : tc + Math.sign(target - tc) * step
    }
    const f0 = performance.now()
    cur.frame(tc, now / 1000, !!spin || tc !== target)
    if (fresh) {
      fresh = false
      const ms = performance.now() - f0
      if (ms > 30) opts.onSlowFrame?.(Math.round(ms))
    }
  }
  raf = requestAnimationFrame(loop)
  function destroy() {
    if (dead) return
    dead = true
    cancelAnimationFrame(raf)
    ro.disconnect()
    job = null
    parked?.dispose()
    parked = null
    cur?.dispose()
    cur = null
    renderer.dispose()
    renderer.forceContextLoss()
    root.remove()
  }
  build(want)
  return {
    update(data) {
      if (dead || !data) return
      const board = want?.region?.slug
      want = data
      if (data.region?.slug !== board) {
        wantFocus = null
        if (cur) target = cur.stops.planet
      }
      if (job) dirty = true
      else if (!cur) build(data)
      else if (sigOf(data) !== cur.sig) build(data)
      else cur.rehud(data)
    },
    destroy
  }
}
