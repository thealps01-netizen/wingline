// Makes the world build pause every few milliseconds, so the app keeps responding while the world is built (before
// this, the build was one ~3 s task that froze everything). Used by build.mjs on desktop/src/world.js; the output only
// exists inside the generated desktop/plugin.js.
//
// How: the build functions inside buildWorld() become generator functions, and every loop inside them gets a pause
// point `if (!(++SLICE.n & 255) && performance.now() > SLICE.end) yield <line>;` (the clock is read every 256 passes in
// inner loops). mountWorld() runs the generator in slices of SLICE.ms and hands control back to the browser in between.
// Nothing else runs between slices, so the build is the same sequence of steps (same random numbers, same geometry) as
// one uninterrupted run.
//
// Which functions: LEAVES are the heavy loops found by timing the build; G is every function on a call path from
// runWorld down to a leaf. A call to a G function becomes `(yield* f(...))` inside a pausable function, and
// `drain(f(...))` anywhere else, which runs it to the end at once. A `.map(cb)` / `.forEach(cb)` callback on such a path
// is turned into a generator (mapG / eachG) so it can pause too. buildWorld's own `return runWorld()` hands the
// generator to mountWorld unchanged. Before the first frame, warmUp() lets the driver compile the shaders in the
// background (compileAsync); runWorld then draws the new scene a few objects at a time into one pixel, so the
// geometry reaches the GPU in slices too (the first full frame took about 40 ms when it did both at once).
import { parse } from 'acorn'
import { ancestor, simple } from 'acorn-walk'

const CONTAINER = 'buildWorld'
const LEAVES = ['terrain', 'contour', 'sphContour', 'waterHatch', 'mapToPlanet', 'flush']
const ROOT = 'runWorld'
const FIRST = 'const UPLOAD = '

export function slice(src) {
  const ast = parse(src, { ecmaVersion: 'latest', sourceType: 'module' })
  const lineOf = pos => src.slice(0, pos).split('\n').length
  const box = ast.body.find(n => n.type === 'FunctionDeclaration' && n.id.name === CONTAINER)
  if (!box) throw new Error('slice: no top-level function ' + CONTAINER)
  const decls = new Map()
  for (const n of box.body.body) if (n.type === 'FunctionDeclaration') decls.set(n.id.name, n)
  for (const n of [...LEAVES, ROOT]) if (!decls.has(n)) throw new Error('slice: no function ' + n + ' in ' + CONTAINER)

  const isFn = n => n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression'
  const parentOf = new Map()
  const nearestFn = anc => { for (let i = anc.length - 2; i >= 0; i--) if (isFn(anc[i])) return anc[i]; return null }
  const isTopDecl = f => f && f.type === 'FunctionDeclaration' && decls.get(f.id.name) === f
  const liftKind = f => {
    const p = parentOf.get(f)
    if (!p || p.type !== 'CallExpression' || p.arguments.length !== 1 || p.arguments[0] !== f || f.async || f.generator) return null
    const c = p.callee
    return c.type === 'MemberExpression' && !c.computed && (c.property.name === 'map' || c.property.name === 'forEach') ? c.property.name : null
  }

  const calls = [], loops = [], fnParent = new Map()
  const LOOPS = new Set(['ForStatement', 'ForOfStatement', 'ForInStatement', 'WhileStatement', 'DoWhileStatement'])
  const LOOP = (n, _st, anc) => { const fn = nearestFn(anc), k = fn ? anc.indexOf(fn) : 0; loops.push({ n, fn, inner: anc.slice(k, -1).some(a => LOOPS.has(a.type)) }) }
  ancestor(box, {
    CallExpression(n, _st, anc) { for (const a of n.arguments) parentOf.set(a, n); if (n.callee.type === 'Identifier' && decls.has(n.callee.name)) calls.push({ n, name: n.callee.name, fn: nearestFn(anc) }) },
    ArrowFunctionExpression(n, _st, anc) { fnParent.set(n, nearestFn(anc)) },
    FunctionExpression(n, _st, anc) { fnParent.set(n, nearestFn(anc)) },
    ForStatement: LOOP, ForOfStatement: LOOP, ForInStatement: LOOP, WhileStatement: LOOP, DoWhileStatement: LOOP
  })
  const owner = f => { while (f && !isTopDecl(f)) { if (!liftKind(f)) return null; f = fnParent.get(f) } return f }

  const callees = new Map([...decls.keys()].map(k => [k, new Set()]))
  for (const c of calls) { const o = owner(c.fn); if (o) callees.get(o.id.name).add(c.name) }
  const reach = new Set([ROOT])
  for (let ch = true; ch;) { ch = false; for (const f of [...reach]) for (const g of callees.get(f)) if (!reach.has(g)) { reach.add(g); ch = true } }
  for (const l of LEAVES) if (!reach.has(l)) throw new Error('slice: leaf ' + l + ' is not reached from ' + ROOT)
  const G = new Set(LEAVES)
  for (let ch = true; ch;) { ch = false; for (const f of reach) if (!G.has(f) && [...callees.get(f)].some(g => G.has(g))) { G.add(f); ch = true } }

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
  const rootCalls = calls.filter(c => c.name === ROOT && c.fn === box)
  if (rootCalls.length !== 1) throw new Error('slice: expected one ' + ROOT + '() call in ' + CONTAINER + ', found ' + rootCalls.length)
  for (const c of calls) {
    if (!G.has(c.name) || c === rootCalls[0]) continue
    if (pausable(c.fn)) { edits.push([c.n.start, c.n.start, '(yield* ']); edits.push([c.n.end, c.n.end, ')']) } else { edits.push([c.n.start, c.n.start, 'drain(']); edits.push([c.n.end, c.n.end, ')']) }
  }
  const PAUSE = 'if (performance.now() > SLICE.end) yield '
  const PAUSE_INNER = 'if (!(++SLICE.n & 255) && performance.now() > SLICE.end) yield '
  for (const { n, fn, inner } of loops) {
    if (!pausable(fn)) continue
    const b = n.body
    const at = (inner ? PAUSE_INNER : PAUSE) + lineOf(n.start) + ';'
    if (b.type === 'BlockStatement') edits.push([b.start + 1, b.start + 1, ' ' + at])
    else { edits.push([b.start, b.start, '{ ' + at + ' ']); edits.push([b.end, b.end, ' }']) }
  }
  for (const f of [...G].map(n => decls.get(n)).concat([...lifted])) {
    if (f.body.type !== 'BlockStatement') continue
    const st = f.body.body
    for (let i = 0; i < st.length - 1; i++) { if (/^(Return|Throw|FunctionDeclaration)/.test(st[i].type)) continue; edits.push([st[i].end, st[i].end, ' ;' + PAUSE + lineOf(st[i].end) + ';']) }
  }
  {
    const d = decls.get(ROOT), body = src.slice(d.start, d.end), k = body.indexOf(FIRST)
    if (k < 0 || body.indexOf(FIRST, k + 1) >= 0) throw new Error('slice: "' + FIRST + '" not found once in ' + ROOT)
    edits.push([d.start + k, d.start + k, '(yield* warmUp(renderer, scene, WC)); '])
  }

  const reps = edits.filter(e => e[0] !== e[1]).sort((a, b) => a[0] - b[0])
  for (let i = 1; i < reps.length; i++) if (reps[i][0] < reps[i - 1][1]) throw new Error('slice: overlapping replacements at ' + reps[i][0])
  const opens = t => /^[({]|^\(yield\*|^drain\(/.test(t)
  const order = edits.map((e, i) => [...e, i]).sort((a, b) => b[0] - a[0] || (a[0] === a[1]) - (b[0] === b[1]) || (opens(a[2]) === opens(b[2]) ? b[3] - a[3] : opens(a[2]) ? -1 : 1))
  let out = src
  for (const [a, b, t] of order) out = out.slice(0, a) + t + out.slice(b)

  const HELPERS = `function* warmUp(renderer, sc, cam) {
  if (SLICE.end === Infinity || !renderer.compileAsync) return;
  let done = false; renderer.compileAsync(sc, cam).then(() => { done = true; }, () => { done = true; });
  while (!done) yield 'compile';
}
function drain(g) { let r; while (!(r = g.next()).done); return r.value; }
function* mapG(a, f) { const r = []; for (let i = 0; i < a.length; i++) r.push(yield* f(a[i], i, a)); return r; }
function* eachG(a, f) { for (let i = 0; i < a.length; i++) yield* f(a[i], i, a); }
`
  const anchor = out.indexOf('\nfunction ' + CONTAINER + '(')
  return out.slice(0, anchor + 1) + HELPERS + out.slice(anchor + 1)
}
