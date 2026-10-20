// Makes the world build pause every few milliseconds, so the page (and the app around it) keeps responding while the
// world is built. Before this, the build was one ~3 s task that froze everything.
//
// How: the build functions become generator functions, and every loop inside them gets a pause point
// `if (!(++SLICE_N & 255) && performance.now() > SLICE_END) yield;` (the clock is read every 256 passes). A small scheduler (startWorld) runs the build in slices of SLICE_MS and
// hands control back to the browser in between. Nothing else runs between slices, so the build is the same sequence of
// steps (same random numbers, same geometry) as one uninterrupted run.
//
// Which functions: LEAVES are the heavy loops found by timing the build; G is every function on a call path from
// runWorld down to a leaf. A call to a G function becomes `(yield* f(...))` inside a pausable function, and
// `drain(f(...))` anywhere else (other callbacks, the other views), which runs it to the end at once, as before.
// A `.map(cb)` / `.forEach(cb)` callback on such a path is turned into a generator (mapG / eachG) so it can pause too;
// other callbacks are drained.
//
// Recorders (rec=1) build in one go, as before, unless slice=1 is also given (used to check the sliced build gives the
// same frames). Usage: node slice.mjs (edits planet.js in place; run after speedup.py).
import { readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'acorn'
import { ancestor, simple } from 'acorn-walk'

const FILE = 'planet.js'
const LEAVES = ['terrain', 'contour', 'sphContour', 'waterHatch', 'mapToPlanet', 'flush']
const ROOT = 'runWorld'
const SLICE_MS = 12
const src = readFileSync(FILE, 'utf8')
const ast = parse(src, { ecmaVersion: 'latest', sourceType: 'module' })
// a pause yields the source line of its loop (in the input file), so slow slices can be traced back
const lineOf = pos => src.slice(0, pos).split('\n').length

const decls = new Map()
for (const n of ast.body) if (n.type === 'FunctionDeclaration') decls.set(n.id.name, n)
for (const n of [...LEAVES, ROOT]) if (!decls.has(n)) throw new Error('slice: no top-level function ' + n)

const isFn = n => n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression'
const parentOf = new Map()
const nearestFn = anc => { for (let i = anc.length - 2; i >= 0; i--) if (isFn(anc[i])) return anc[i]; return null }
const isTopDecl = f => f && f.type === 'FunctionDeclaration' && decls.get(f.id.name) === f
// a callback that can be lifted into a generator: the only argument of X.map(...) / X.forEach(...)
const liftKind = f => { const p = parentOf.get(f); if (!p || p.type !== 'CallExpression' || p.arguments.length !== 1 || p.arguments[0] !== f || f.async || f.generator) return null
  const c = p.callee; return c.type === 'MemberExpression' && !c.computed && (c.property.name === 'map' || c.property.name === 'forEach') ? c.property.name : null }

const calls = [], loops = [], fnParent = new Map()
const LOOPS = new Set(['ForStatement', 'ForOfStatement', 'ForInStatement', 'WhileStatement', 'DoWhileStatement'])
// inner: inside another loop of the same function
const LOOP = (n, _st, anc) => { const fn = nearestFn(anc), k = fn ? anc.indexOf(fn) : 0; loops.push({ n, fn, inner: anc.slice(k, -1).some(a => LOOPS.has(a.type)) }) }
ancestor(ast, {
  CallExpression(n, _st, anc) { for (const a of n.arguments) parentOf.set(a, n); if (n.callee.type === 'Identifier' && decls.has(n.callee.name)) calls.push({ n, name: n.callee.name, fn: nearestFn(anc) }) },
  ArrowFunctionExpression(n, _st, anc) { fnParent.set(n, nearestFn(anc)) },
  FunctionExpression(n, _st, anc) { fnParent.set(n, nearestFn(anc)) },
  ForStatement: LOOP, ForOfStatement: LOOP, ForInStatement: LOOP, WhileStatement: LOOP, DoWhileStatement: LOOP
})
// owner: the top-level function a call or loop counts towards, through liftable callbacks
const owner = f => { while (f && !isTopDecl(f)) { if (!liftKind(f)) return null; f = fnParent.get(f) } return f }

const callees = new Map([...decls.keys()].map(k => [k, new Set()]))
for (const c of calls) { const o = owner(c.fn); if (o) callees.get(o.id.name).add(c.name) }
const reach = new Set([ROOT]); for (let ch = true; ch;) { ch = false; for (const f of [...reach]) for (const g of callees.get(f)) if (!reach.has(g)) { reach.add(g); ch = true } }
for (const l of LEAVES) if (!reach.has(l)) throw new Error('slice: leaf ' + l + ' is not reached from ' + ROOT)
const G = new Set(LEAVES)
for (let ch = true; ch;) { ch = false; for (const f of reach) if (!G.has(f) && [...callees.get(f)].some(g => G.has(g))) { G.add(f); ch = true } }

// callbacks to lift: on the way from a G function down to a call of a G function
const lifted = new Set()
for (const c of calls) { if (!G.has(c.name)) continue; const o = owner(c.fn); if (!o || !G.has(o.id.name)) continue; for (let f = c.fn; f && !isTopDecl(f); f = fnParent.get(f)) lifted.add(f) }
const pausable = f => f && ((isTopDecl(f) && G.has(f.id.name)) || lifted.has(f))
for (const f of lifted) simple(f.body, { ThisExpression() { throw new Error('slice: lifted callback uses this') }, Identifier(n) { if (n.name === 'arguments') throw new Error('slice: lifted callback uses arguments') } })

const edits = []
for (const name of G) { const d = decls.get(name); if (d.generator || d.async) throw new Error('slice: ' + name + ' is already generator/async'); edits.push([d.start, d.start + 'function'.length, 'function*']) }
for (const f of lifted) {
  const call = parentOf.get(f), kind = liftKind(f), obj = call.callee.object
  const params = f.params.map(p => src.slice(p.start, p.end)).join(', ')
  edits.push([call.start, call.start, `(yield* ${kind === 'map' ? 'mapG' : 'eachG'}(`])
  edits.push([obj.end, f.start, ', '])
  edits.push([f.start, f.body.start, `function* (${params}) `])
  if (f.body.type !== 'BlockStatement') { edits.push([f.body.start, f.body.start, '{ return (']); edits.push([f.body.end, f.body.end, '); }']) }
  edits.push([call.end, call.end, ')'])
}
let yc = 0, dc = 0
for (const c of calls) {
  if (!G.has(c.name) || (c.name === ROOT && !c.fn)) continue
  const text = [c.n.start, c.n.end]
  if (pausable(c.fn)) { edits.push([text[0], text[0], '(yield* ']); edits.push([text[1], text[1], ')']); yc++ } else { edits.push([text[0], text[0], 'drain(']); edits.push([text[1], text[1], ')']); dc++ }
}
// Outer loops and the steps of a pausable function read the clock every time (they run seldom). Inner loops read it
// every 256 passes: reading it on every pass of the inner loops made the build 3.5x slower.
const PAUSE = 'if (performance.now() > SLICE_END) yield '
const PAUSE_INNER = 'if (!(++SLICE_N & 255) && performance.now() > SLICE_END) yield '
let pc = 0
for (const { n, fn, inner } of loops) {
  if (!pausable(fn)) continue
  const b = n.body
  const at = (inner ? PAUSE_INNER : PAUSE) + lineOf(n.start) + ';'
  if (b.type === 'BlockStatement') edits.push([b.start + 1, b.start + 1, ' ' + at])
  else { edits.push([b.start, b.start, '{ ' + at + ' ']); edits.push([b.end, b.end, ' }']) }
  pc++
}
for (const f of [...G].map(n => decls.get(n)).concat([...lifted])) {
  if (f.body.type !== 'BlockStatement') continue
  const st = f.body.body
  for (let i = 0; i < st.length - 1; i++) { if (/^(Return|Throw|FunctionDeclaration)/.test(st[i].type)) continue; edits.push([st[i].end, st[i].end, ' ;' + PAUSE + lineOf(st[i].end) + ';']); pc++ }
}
// before the first frame of a sliced build, let the GPU driver compile the shaders in the background (compileAsync):
// done inside the first render, it was the one step left over 50 ms
const FIRST = 'frameW(0); window.__ready = true;'
{ const d = decls.get(ROOT), body = src.slice(d.start, d.end), k = body.indexOf(FIRST); if (k < 0 || body.indexOf(FIRST, k + 1) >= 0) throw new Error('slice: first frame of ' + ROOT + ' not found once')
  edits.push([d.start + k, d.start + k, '(yield* warmUp(scene, WC)); ']) }
const rootCall = calls.filter(c => c.name === ROOT && !c.fn)
if (rootCall.length !== 1) throw new Error('slice: expected one top-level ' + ROOT + '() call, found ' + rootCall.length)
edits.push([rootCall[0].n.start, rootCall[0].n.end, 'startWorld()'])

// replacements must not overlap each other; insertions (a === b) may sit anywhere. Stable order for equal positions:
// at one position, later-listed insertions go outside earlier ones only if they close; keep it simple by refusing
// two different insertions at one position unless both close or both open.
const reps = edits.filter(e => e[0] !== e[1]).sort((a, b) => a[0] - b[0])
for (let i = 1; i < reps.length; i++) if (reps[i][0] < reps[i - 1][1]) throw new Error('slice: overlapping replacements at ' + reps[i][0])
const opens = t => /^[({]|^\(yield\*|^drain\(/.test(t)
const order = edits.map((e, i) => [...e, i]).sort((a, b) => b[0] - a[0] || (a[0] === a[1]) - (b[0] === b[1]) || (opens(a[2]) === opens(b[2]) ? b[3] - a[3] : opens(a[2]) ? -1 : 1))
let out = src
for (const [a, b, t] of order) out = out.slice(0, a) + t + out.slice(b)

const HELPERS = `// Build slicing (generated by slice.mjs): the deadline of the current slice; Infinity runs to the end without pausing.
let SLICE_END = Infinity, SLICE_N = 0;
function* warmUp(sc, cam) {
  if (SLICE_END === Infinity || !renderer.compileAsync) return;
  let done = false; renderer.compileAsync(sc, cam).then(() => { done = true; }, () => { done = true; });
  while (!done) yield 'compile';
}
function drain(g) { let r; while (!(r = g.next()).done); return r.value; }
function* mapG(a, f) { const r = []; for (let i = 0; i < a.length; i++) r.push(yield* f(a[i], i, a)); return r; }
function* eachG(a, f) { for (let i = 0; i < a.length; i++) yield* f(a[i], i, a); }
// Runs the world build in slices of ${SLICE_MS} ms and gives the browser the time in between. window.__build: progress
// for the loading indicator and the build's own numbers (slices, wall time, longest slice, slices over 30 ms as
// [line paused at before, line paused at after, ms]; lines refer to planet.js before slicing).
function startWorld() {
  const q = new URLSearchParams(location.search), g = ${ROOT}();
  if (q.get('rec') && !q.get('slice')) { drain(g); return; }
  // while it builds, the page shows a loading line instead of the HUD (which the build fills and empties as it goes)
  const app = document.getElementById('app'); app.dataset.loading = 'Charting ' + BOARDS.length + ' boards'; app.classList.add('building');
  const B = window.__build = { slices: 0, t0: performance.now(), longest: 0, done: false, slow: [] }; let from = 'start';
  const ch = new MessageChannel();
  ch.port1.onmessage = () => {
    const s = performance.now(); SLICE_END = s + ${SLICE_MS}; let r;
    try { r = g.next(); } finally { SLICE_END = Infinity; }
    const ms = performance.now() - s, to = r && !r.done ? r.value : 'end'; B.slices++; B.longest = Math.max(B.longest, ms); if (ms > 30) B.slow.push([from, to, Math.round(ms)]); from = to;
    if (r.done) { B.done = true; B.ms = Math.round(performance.now() - B.t0); app.classList.remove('building'); } else ch.port2.postMessage(0);
  };
  ch.port2.postMessage(0);
}
`
const anchor = out.indexOf('\nfunction ')
out = out.slice(0, anchor + 1) + HELPERS + out.slice(anchor + 1)
writeFileSync(FILE, out)
console.log(`sliced: generators ${[...G].join(', ')}; lifted callbacks ${lifted.size}; yield* calls ${yc}, drained calls ${dc}, pause points ${pc}`)
