/**
 * Wingline — the world converter (`worldOf` in desktop/plugin.js): Kanban overview JSON -> what the world view draws.
 *
 * Run: cd tests && npm ci && node world_check.mjs      (exit 0 = passed)
 *
 * The world view (prototypes/world) draws three levels of one scene: the planet (one area per board), the region (one
 * board; each pipeline a settlement) and the site (one pipeline; each task a building, a berth or a field). worldOf is
 * the only place where Kanban data becomes those things, so these checks pin its rules:
 *   1. Real data (fixtures/world-real.json, 8 boards): every board placed once, in the planet's visible face, at its
 *      own spot; pipelines are the Board view's own groups (groupsOf), minus the ones with only archived tasks.
 *   2. Place by spend: under $4 a farm, $4 to $10 a village, over $10 a port (harbor).
 *   3. State: needs you (blocked) > working (running) > waiting (any other open status) > done; archived tasks are
 *      not drawn but their spend counts.
 *   4. Stable places: with the spot table the page stores (worldOf's `spots`, handed back as `keep`), no board moves
 *      when boards are added or removed, as long as the count stays in the same tier of spots (48, then 96, ...;
 *      crossing a tier lays the planet out anew). Without it, adding a board moved one or two others in 37 of 500 random
 *      tries (printed as info below). A pipeline keeps its key and seed when others come and go or its tasks change state.
 *   5. Limits: at most 12 labelled boards, 12 settlements, and per site 6 tasks plus the gate (each task is one berth,
 *      workshop or field; the gate stands apart). Tasks that need you or are working are shown first; the rest is
 *      counted, never dropped silently. 60 boards still get 60 different spots. Labels longer than 26 characters end
 *      in an ellipsis (the full title stays in `title`); two pipelines with one name are numbered.
 *   6. Agents: a running task carries its agent (the last run's profile) and live activity line.
 *   7. Text: every label is resolved English (no raw i18n key); task titles pass through unchanged (the scene must
 *      insert them as text, never as HTML); an old backend without the per-board counts still converts.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const HERE_URL = new URL('.', import.meta.url)
const HERE = fileURLToPath(HERE_URL).replace(/\\/g, '/')
const OUT_REL = '.out/'
const OUT = `${HERE}${OUT_REL}`
mkdirSync(OUT, { recursive: true })
writeFileSync(`${OUT}world-sdk-stub.mjs`, 'export const host = {}\nexport function usePluginI18n() { return k => k }\n')
const src = readFileSync(`${HERE}../desktop/plugin.js`, 'utf8').replace(/(['"])@hermes\/plugin-sdk\1/, `'${HERE_URL.href}${OUT_REL}world-sdk-stub.mjs'`)
writeFileSync(`${OUT}world-under-test.mjs`, src)
const mod = await import(`${HERE_URL.href}${OUT_REL}world-under-test.mjs`)
const { worldOf } = mod

let bundles = null
mod.default.register({ i18n: { register: b => { bundles = b } }, register: () => {} })
const t = (key, ...args) => {
  let node = bundles?.en
  for (const p of key.split('.')) node = node?.[p]
  return typeof node === 'function' ? node(...args) : typeof node === 'string' ? node : key
}

let failures = 0
const check = (ok, what) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}`)
  if (!ok) failures++
}
const REAL = JSON.parse(readFileSync(`${HERE}fixtures/world-real.json`, 'utf8'))
const strings = o => (typeof o === 'string' ? [o] : o && typeof o === 'object' ? Object.values(o).flatMap(strings) : [])
const task = (id, title, status, extra = {}) => ({ id, title, status, role: 'builder', parents: [], children: [], runs: [], cost: { usd: 0 }, ...extra })
const board = (slug, extra = {}) => ({ slug, name: slug, tasks: 1, last_activity: 1, needs_you: 0, working: 0, queued: 0, done: 1, spend_usd: 0, ...extra })

check(typeof worldOf === 'function', 'plugin.js exports worldOf next to its default export')

{
  const w = worldOf(REAL, t)
  check(w.boards.length === REAL.boards.length && w.boards.length === 8, `every board is on the planet (${w.boards.length})`)
  const spots = new Set(w.boards.map(b => `${b.lat},${b.lon}`))
  check(spots.size === w.boards.length, 'each board has its own spot')
  check(w.boards.every(b => Math.hypot(b.lat - 10, (b.lon - 0) * Math.cos((b.lat * Math.PI) / 180)) <= 46.5), 'every spot is on the visible face (within 46 degrees of its centre)')
  check(w.boards.filter(b => b.current).length === 1 && w.boards.find(b => b.current).slug === REAL.board, 'the open board is marked current')
  const hau = w.boards.find(b => b.slug === 'hermes-approvals-ui')
  check(hau.st === 'fail' && hau.chip === 'Needs you · 28 tasks', `a board with a blocked task reads "Needs you" (${hau.chip})`)
  const empty = w.boards.find(b => b.slug === 'default')
  check(empty.empty && empty.chip === 'No tasks yet', `an empty board reads "No tasks yet" (${empty.chip})`)
  check(w.planet.tab === 'All boards · 1 needs you' && w.planet.ticks.label === '7/8 boards clear', `planet header, an empty board counts as clear: ${w.planet.tab} / ${w.planet.ticks.label}`)
  check(w.planet.tl[2][1] === '$316.54', `planet spend sums every board (${w.planet.tl[2][1]})`)
  const p = w.region.pipelines
  check(p.length === 9 && w.region.archivedOnly === 0 && w.region.more === 0, `the Board view's 9 groups are the 9 settlements (${p.length}, hidden ${w.region.archivedOnly})`)
  const names = p.map(x => x.name)
  check(names[0] === 'deck flake' && p[0].st === 'fail', `the pipeline that needs you comes first (${names[0]})`)
  check(new Set(p.map(x => x.key)).size === p.length, 'every pipeline has its own key')
  const ui = p.find(x => x.name === 'ui-polish-1140 r1')
  check(ui.place === 'village' && ui.n === 6 && ui.units.map(u => u.role).join(',') === 'builder,review,review,review,review' && ui.gate?.role === 'gate' && ui.more === 0,
    `ui-polish-1140 r1 ($9.37): a village of 5 workshops (builder first) and a gate (${ui.place})`)
  check(ui.units.slice(1).map(x => x.short).join(',') === 'security,ux,ui,code', `site labels drop the pipeline name (${ui.units.map(x => x.short)})`)
  const fam = p.find(x => x.name.startsWith('needs-you') && x.kind === 'family')
  check(fam.units.length === 6 && fam.more === 2 && fam.gate && fam.units.every(u => u.label.length <= 26) && fam.units.some(u => u.label.endsWith('…') && u.title.length > 26),
    `a 9-task family shows 6 berths and its gate, counts 2, clips long labels and keeps the title (${fam.units.map(u => u.label).join(' | ')})`)
  const dup = p.filter(x => x.name.startsWith('needs-you')).map(x => x.name).sort()
  check(dup.join(',') === 'needs-you (1),needs-you (2)', `two pipelines named needs-you are numbered (${dup})`)
  check(fam.place === 'harbor', 'the $64 family is a port')
  check(p.find(x => x.name === 'deck T1').place === 'farm', 'the $3.43 pair is a farm')
  check(ui.chrome.tab === 'ui-polish-1140 r1' && ui.chrome.back === 'Hermes Approvals Ui' && ui.chrome.ticks.label === '6/6 done', 'site header names the pipeline and its board')
  const raw = strings(w).filter(s => /^wingline\./.test(s))
  check(raw.length === 0, `no raw i18n key in any label (${raw.slice(0, 3)})`)
  check(JSON.stringify(worldOf(REAL, t)) === JSON.stringify(w), 'same input, same world')
}

{
  const at = usd => worldOf({ board: 'b', boards: [board('b')], tasks: [task('t1', 'x', 'done', { cost: { usd } })] }, t).region.pipelines[0].place
  check(at(3.99) === 'farm' && at(4) === 'village' && at(10) === 'village' && at(10.01) === 'harbor', 'spend thresholds: 3.99 farm, 4 and 10 village, 10.01 port')
}

{
  const one = (...st) => worldOf({ board: 'b', boards: [board('b')], tasks: st.map((s, i) => task(`t${i}`, `p x${i}`, s, { parents: i ? ['t0'] : [] })) }, t).region.pipelines[0]
  check(one('done', 'running', 'blocked').st === 'fail', 'blocked beats running')
  check(one('done', 'running', 'todo').st === 'work', 'running beats waiting')
  check(one('done', 'review', 'scheduled').st === 'wait' && one('done', 'triage').st === 'wait', 'review, scheduled and triage are waiting')
  const arch = one('done', 'archived')
  check(arch.n === 1 && arch.st === 'done', 'an archived task is not drawn')
  const spent = worldOf({ board: 'b', boards: [board('b')], tasks: [task('a', 'p a', 'done', { cost: { usd: 2 } }), task('b', 'p b', 'archived', { parents: ['a'], cost: { usd: 3 } })] }, t).region.pipelines[0]
  check(spent.usd === 5 && spent.place === 'village', 'an archived task still counts in the spend')
  const gone = worldOf({ board: 'b', boards: [board('b')], tasks: [task('a', 'q', 'done'), task('y', 'gone build', 'archived'), task('z', 'gone check', 'archived', { parents: ['y'] })] }, t).region
  check(gone.pipelines.length === 1 && gone.archivedOnly === 1, 'a pipeline with only archived tasks is left out and counted')
}

{
  const slugs = REAL.boards.map(b => b.slug)
  const before = new Map(worldOf(REAL, t).boards.map(b => [b.slug, `${b.lat},${b.lon}`]))
  let worst = 0
  let moves = 0
  for (let i = 0; i < 500; i++) {
    const add = `new-board-${i}`
    const w = worldOf({ ...REAL, boards: [...REAL.boards, board(add)] }, t)
    const moved = w.boards.filter(b => b.slug !== add && before.get(b.slug) !== `${b.lat},${b.lon}`).length
    worst = Math.max(worst, moved)
    moves += moved ? 1 : 0
  }
  console.log(`info  without the stored spot table, adding a board moved others in ${moves} of 500 tries (at most ${worst})`)
  const first = worldOf(REAL, t)
  let keep = first.spots
  const home = new Map(first.boards.map(b => [b.slug, `${b.lat},${b.lon}`]))
  let drift = 0
  const grown = [...REAL.boards]
  for (let i = 0; i < 40; i++) {
    grown.push(board(`grow-${i}`))
    const w = worldOf({ ...REAL, boards: grown }, t, keep)
    keep = w.spots
    for (const b of w.boards) {
      if (!home.has(b.slug)) home.set(b.slug, `${b.lat},${b.lon}`)
      else if (home.get(b.slug) !== `${b.lat},${b.lon}` && w.spots.tier === first.spots.tier) drift++
    }
  }
  check(drift === 0, `with the stored spot table, 40 new boards one by one move no board (moves: ${drift})`)
  const shrunk = worldOf({ ...REAL, boards: REAL.boards.slice(2) }, t, first.spots).boards
  check(shrunk.every(b => before.get(b.slug) === `${b.lat},${b.lon}`), 'with the table, removing boards moves none of the others')
  const bad = worldOf(REAL, t, { tier: 48, at: { 'hermes-approvals-ui': 3, 'sap-systems': 3, 'wiki-recall': -1, default: 999 } })
  check(new Set(bad.boards.map(b => `${b.lat},${b.lon}`)).size === 8, 'a broken stored table (two boards on one spot, bad numbers) still gives every board its own spot')
  const without = worldOf({ ...REAL, boards: REAL.boards.slice(1) }, t).boards
  check(without.every(b => before.get(b.slug) === `${b.lat},${b.lon}`) || slugs.length < 2, 'removing a board moves none of the others')
  const base = [task('a', 'alpha build', 'done'), task('b', 'alpha review', 'done', { parents: ['a'] }), task('c', 'beta T1', 'done'), task('d', 'beta T1 review', 'running')]
  const keys = w => new Map(w.region.pipelines.map(x => [x.name, `${x.key}/${x.seed}`]))
  const k0 = keys(worldOf({ board: 'b', boards: [board('b')], tasks: base }, t))
  const k1 = keys(worldOf({ board: 'b', boards: [board('b')], tasks: [...base.map(x => ({ ...x, status: 'blocked' })), task('e', 'gamma', 'todo'), task('f', 'gamma two', 'todo', { parents: ['e'] })] }, t))
  check([...k0].every(([n, k]) => k1.get(n) === k), 'pipeline keys and seeds stay when others appear and states change')
}

{
  const many = Array.from({ length: 60 }, (_, i) => board(`board-${i}`, { needs_you: i % 7 === 0 ? 1 : 0 }))
  const w = worldOf({ board: 'board-59', boards: many, tasks: [] }, t)
  check(new Set(w.boards.map(b => `${b.lat},${b.lon}`)).size === 60, '60 boards get 60 different spots')
  check(w.boards.filter(b => b.labeled).length === 12 && w.planet.more === 48, 'at most 12 boards are labelled; the rest are counted')
  check(w.boards.find(b => b.slug === 'board-59').labeled && w.boards.filter(b => b.labeled && b.st === 'fail').length === 9,
    'labels go to the open board first, then to the boards that need you')
  const tasks = []
  for (let i = 0; i < 40; i++) tasks.push(task(`p${i}`, `pipe${i} build`, 'done'), task(`q${i}`, `pipe${i} check`, 'done', { parents: [`p${i}`] }))
  const r = worldOf({ board: 'b', boards: [board('b')], tasks }, t).region
  check(r.pipelines.length === 12 && r.more === 28, `at most 12 settlements; the rest are counted (${r.pipelines.length} + ${r.more})`)
  const big = [task('m', 'big build', 'done')]
  for (let i = 0; i < 10; i++) big.push(task(`r${i}`, `big review ${i}`, 'done', { role: 'review', parents: ['m'] }))
  const site = worldOf({ board: 'b', boards: [board('b')], tasks: big }, t).region.pipelines[0]
  check(site.units.length === 6 && site.more === 5 && site.n === 11 && site.units[0].role === 'builder', `a site shows 6 tasks and counts the other 5 (${site.units.length} + ${site.more})`)
  const busy = [task('m', 'busy build', 'done')]
  for (let i = 0; i < 9; i++) busy.push(task(`r${i}`, `busy review ${i}`, i === 8 ? 'running' : i === 7 ? 'blocked' : 'done', { role: 'review', parents: ['m'] }))
  const shown = worldOf({ board: 'b', boards: [board('b')], tasks: busy }, t).region.pipelines[0].units
  check(shown.some(u => u.st === 'work') && shown.some(u => u.st === 'fail'), 'a working or blocked task is never the one left out')
}

{
  const run = { id: 1, profile: 'reviewer-a', status: 'running', started_at: 10, ended_at: null }
  const w = worldOf({ board: 'b', boards: [board('b')], tasks: [task('a', 'x build', 'running', { assignee: 'default', runs: [run], activity: { text: 'running tests', at: 20 } })] }, t)
  const u = w.region.pipelines[0].units[0]
  check(u.agent && u.agent.profile === 'reviewer-a' && u.agent.activity === 'running tests', `a running task carries its agent and activity (${JSON.stringify(u.agent)})`)
  check(w.region.pipelines[0].units.every(x => x.st !== 'work' || x.agent), 'every working task has an agent')
}

{
  const xss = '<img src=x onerror=alert(1)>'
  const w = worldOf({ board: 'b', boards: [{ slug: 'b', name: '<b>bold</b>', tasks: 1 }], tasks: [task('a', xss, 'blocked')] }, t)
  check(w.region.pipelines[0].units[0].title === xss && w.boards[0].name === '<b>bold</b>', 'titles and names pass through unchanged (the scene inserts them as text)')
  check(w.boards[0].st === 'done' && w.boards[0].chip === 'Done · 1 task', 'an old backend without per-board counts still converts (the board reads done)')
  check(worldOf({}, t).boards.length === 0 && worldOf({}, t).region === null, 'no data, no world, no crash')
}

console.log(failures ? `\n${failures} check(s) failed` : '\nall world checks passed')
process.exit(failures ? 1 : 0)
