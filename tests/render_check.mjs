/**
 * Wingline — the desktop page rendered in jsdom with the real React, driven like a user.
 *
 * Run: cd tests && npm install && node render_check.mjs      (exit 0 = passed)
 *
 * No real Hermes call is made: ctx.rest serves the overview fixtures and window.hermesDesktop.api is a
 * stub that records every Kanban request (method, path, body) and answers from a script.
 *
 * Locks:
 *   1. Registration: a `routes` page /wingline + a `sidebar.nav` row with a resolved label; never a pane.
 *   2. Board from the real fixture: Needs-you strip first, header counters, working-now empty state,
 *      pipeline map, timeline rows, detail drawer with cost status word; no raw i18n key anywhere.
 *   3. Edge fixture: XSS titles stay text, backend errors are shown, a running task's activity line.
 *   4. Factory: belts, 8 machines, packages, the jammed lab + red Needs-you bin + callout, Replay
 *      1×/4×/16× and Now; a package click opens the same drawer; the choice persists in ctx.storage.
 *   5. Retry: the confirm lists every step (incl. one link + unlink per child), the time-limit and
 *      retries notes; the run hits the exact Kanban URLs/methods/bodies in order; a failure stops at
 *      the first failing step and reports the completed ones.
 *   6. Add note, two-step Archive, Open log (ANSI stripped), Open in Kanban, Ask in chat (composer,
 *      then clipboard fallback) call the right things; failures land in the problems banner.
 *   7. Polling: /overview every 5 s while visible, paused while hidden; the board switcher re-reads.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const HERE_URL = new URL('.', import.meta.url)
const HERE = fileURLToPath(HERE_URL).replace(/\\/g, '/')
const SRC = process.argv[2] || `${HERE}../desktop/plugin.js`
const OUT_REL = '.out/'
const OUT = `${HERE}${OUT_REL}`
mkdirSync(OUT, { recursive: true })

writeFileSync(`${OUT}sdk-stub.mjs`, `
export const calls = { navigated: [], inserted: [] }
export const state = { composerAnswers: false, composerThrows: false }
const bundles = new Map()
const translators = new Map()
export function registerBundles(id, b) { bundles.set(id, b) }
export function usePluginI18n(id) {
  if (!translators.has(id)) {
    translators.set(id, (key, ...args) => {
      let node = bundles.get(id)?.en
      for (const p of key.split('.')) node = node?.[p]
      return typeof node === 'function' ? node(...args) : (typeof node === 'string' ? node : key)
    })
  }
  return translators.get(id)
}
export const host = {
  navigate: path => { calls.navigated.push(path) },
  composer: {
    insertText: async (sid, text) => {
      calls.inserted.push([sid, text])
      if (state.composerThrows) throw new Error('no composer')
      return state.composerAnswers
    }
  }
}
export default { host }
`)

const src = readFileSync(SRC, 'utf8').replace("'@hermes/plugin-sdk'", `'${HERE_URL.href}${OUT_REL}sdk-stub.mjs'`)
writeFileSync(`${OUT}plugin-under-test.mjs`, src)

const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true, url: 'http://localhost/' })
global.window = dom.window
global.document = dom.window.document
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true })
global.IS_REACT_ACT_ENVIRONMENT = true
let hidden = false
Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => (hidden ? 'hidden' : 'visible') })

const intervals = []
const realSetInterval = window.setInterval.bind(window)
window.setInterval = (fn, ms) => {
  const id = realSetInterval(() => {}, 1e9)
  intervals.push({ id, fn, ms, on: true })
  return id
}
const realClearInterval = window.clearInterval.bind(window)
window.clearInterval = id => {
  for (const it of intervals) if (it.id === id) it.on = false
  realClearInterval(id)
}

const clip = []
let clipRejects = false
Object.defineProperty(window.navigator, 'clipboard', {
  configurable: true,
  value: { writeText: async text => { if (clipRejects) throw new Error('clipboard denied'); clip.push(text) } }
})

const stub = await import(`${HERE_URL.href}${OUT_REL}sdk-stub.mjs`)
const mod = await import(`${HERE_URL.href}${OUT_REL}plugin-under-test.mjs`)
const React = (await import('react')).default
const { createRoot } = await import('react-dom/client')
const { act } = React

let failures = 0
const check = (ok, what) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}`)
  if (!ok) failures++
}
const tick = (ms = 0) => act(() => new Promise(r => setTimeout(r, ms)))
const settle = async () => { for (let i = 0; i < 4; i++) await tick(5) }

const load = name => JSON.parse(readFileSync(`${HERE}fixtures/${name}`, 'utf8'))
const REAL = load('overview-real.json')
const EDGE = load('overview-edge.json')
const BLOCKED = REAL.tasks.find(x => x.status === 'blocked')
const WITH_KIDS = structuredClone(REAL)
WITH_KIDS.tasks.find(x => x.id === BLOCKED.id).children = ['t_child_a', 't_child_b']

const kept = new Map()
const storage = {
  get: (key, fallback) => (kept.has(key) ? kept.get(key) : fallback),
  set: (key, value) => { kept.set(key, value) },
  remove: key => { kept.delete(key) }
}
const registered = []
const restCalls = []
let overview = REAL
let overviewFails = false
const ctx = {
  storage,
  register: c => { registered.push(c); return () => {} },
  i18n: { register: b => stub.registerBundles('wingline', b), t: k => k },
  rest: async path => {
    restCalls.push(path)
    if (!path.startsWith('/overview')) throw new Error(`unexpected wingline path ${path}`)
    if (overviewFails) throw new Error('wingline backend 503')
    return structuredClone(overview)
  }
}

const api = []
let script = () => ({ ok: true })
window.hermesDesktop = {
  api: async request => {
    api.push(structuredClone(request))
    return script(request, api.length)
  }
}

mod.default.register(ctx)
check(registered.some(c => c.area === 'routes' && c.data?.path === '/wingline' && typeof c.render === 'function'), 'registers the /wingline route page')
const nav = registered.find(c => c.area === 'sidebar.nav')
check(nav && nav.data?.path === '/wingline' && nav.data?.label === 'Wingline', 'registers a sidebar.nav row with a resolved label')
check(!registered.some(c => String(c.area).includes('pane')), 'registers no panes')
check(mod.default.id === 'wingline', 'plugin id is wingline')

const host = document.createElement('div')
document.body.appendChild(host)
const root = createRoot(host)
const page = registered.find(c => c.area === 'routes')
const mount = async () => {
  await act(async () => { root.render(page.render()) })
  await settle()
}
const unmount = async () => { await act(async () => { root.render(null) }) }
const q = sel => host.querySelector(sel)
const qa = sel => [...host.querySelectorAll(sel)]
const click = async el => {
  if (!el) throw new Error('click target missing')
  await act(async () => { el.dispatchEvent(new window.MouseEvent('click', { bubbles: true })) })
  await settle()
}
const typeInto = async (el, value) => {
  const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype
  const setter = Object.getOwnPropertyDescriptor(proto, 'value').set
  await act(async () => {
    setter.call(el, value)
    el.dispatchEvent(new window.Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }))
  })
  await settle()
}
const rawKeys = () => {
  const bits = [host.textContent]
  for (const el of host.querySelectorAll('*')) for (const a of ['aria-label', 'placeholder', 'title']) if (el.getAttribute(a)) bits.push(el.getAttribute(a))
  return bits.join('\n').match(/wingline\.[a-z][A-Za-z]*(\.[A-Za-z]+)*/g) || []
}
const intervalsAt = ms => intervals.filter(i => i.on && i.ms === ms)
const runPoll = async () => { for (const i of intervalsAt(5000)) await act(async () => { i.fn() }); await settle() }

await mount()
check(restCalls[0] === '/overview', 'first read is /overview on the current board')
check(q('.wl-root')?.getAttribute('data-view') === 'board', 'Board is the default view')
check(rawKeys().length === 0, `Board: no raw i18n keys (${rawKeys().slice(0, 3).join(', ')})`)
check(!host.textContent.includes('Stopped by its time limit') && host.textContent.includes('not as a time-out'), 'a crashed run that ran past its limit is reported as Hermes recorded it, never as a time-out')
const main = q('.wl-main')
check(main?.firstElementChild?.getAttribute('aria-labelledby') === 'wl-needs-h', 'Needs you is the first section of the Board')
const attn = qa('.wl-attn')
check(attn.length === 1 && attn[0].getAttribute('data-id') === BLOCKED.id, 'Needs you lists the one blocked task')
check(attn[0].textContent.includes(BLOCKED.block_reason_plain), 'the blocked card shows the plain reason')
check(/Retries used \d+\/\d+/.test(attn[0].textContent) && /worked/.test(attn[0].textContent), 'the blocked card shows retries and time worked')
check(['retry', 'log', 'chat', 'archive'].every(a => attn[0].querySelector(`[data-act="${a}"]`)), 'the blocked card carries Retry / Open log / Ask in chat / Archive')
const count = k => q(`[data-count="${k}"] b`)?.textContent
check(count('needs') === '1' && count('working') === '0' && count('queued') === '0' && count('done') === '16', 'header counters read 1 / 0 / 0 / 16')
check(count('spend') === '$46.16', 'Spend counter reads the backend total')
check(q('[aria-labelledby="wl-work-h"]')?.textContent.includes('No worker is running.'), 'Working now says nothing runs')
check(qa('.wl-node').length === 6 && qa('.wl-edge').length === 8, 'pipeline map draws the 6-task chain with 8 parent→child edges')
check(qa('.wl-tl-row').length === REAL.tasks.length, 'timeline has one row per task')
const bars = qa('.wl-run')
check(bars.length === REAL.tasks.reduce((s, x) => s + x.runs.length, 0), 'timeline draws one bar per attempt')
const widths = bars.map(b => parseFloat(b.style.width))
check(Math.max(...widths) > 3, 'run bars keep real length while idle gaps are squeezed')
const dr = q('aside.wl-dr')
check(dr?.getAttribute('data-id') === BLOCKED.id, 'drawer opens on the blocked task by default')
check(dr.textContent.includes('estimated') && dr.textContent.includes('Comments') && dr.textContent.includes('Attempt 1'), 'drawer shows cost status word, comments and attempts')
await click(qa('.wl-tl-row').find(r => r.getAttribute('data-id') === 't_834367bc'))
check(q('aside.wl-dr')?.getAttribute('data-id') === 't_834367bc', 'a timeline row selects its task in the drawer')
check(q('aside.wl-dr').textContent.includes('ui-polish-1140 r1 security'), 'drawer names the parents it waits for')
await click(q('[data-count="needs"]'))
check(qa('.wl-tl-row.is-dim').length === REAL.tasks.length - 1, 'the Needs you counter filters the timeline')
await click(q('[data-count="needs"]'))
check(q('style')?.textContent.includes('prefers-reduced-motion'), 'page respects prefers-reduced-motion')

check(intervalsAt(5000).length === 1, 'polls every 5 s')
let before = restCalls.length
await runPoll()
check(restCalls.length === before + 1, 'a poll while visible re-reads /overview')
hidden = true
before = restCalls.length
await runPoll()
check(restCalls.length === before, 'no poll while the page is hidden')
hidden = false
await act(async () => { document.dispatchEvent(new window.Event('visibilitychange')) })
await settle()
check(restCalls.length === before + 1, 'coming back visible reads at once')

await click(q('.wl-seg [data-view="factory"]'))
check(kept.get('view') === 'factory', 'the Board | Factory choice is kept in ctx.storage')
check(q('.wl-root')?.getAttribute('data-view') === 'factory', 'Factory view renders')
check(rawKeys().length === 0, `Factory: no raw i18n keys (${rawKeys().slice(0, 3).join(', ')})`)
check(host.textContent.includes('STOPPED · CRASHED') && !host.textContent.includes('TIME LIMIT'), 'the Factory callout names the recorded outcome (crashed), not a guessed time limit')
check(qa('.wl-bed').length >= 8 && qa('.wl-slats').length === qa('.wl-bed').length, 'belts are drawn between the zones')
check(qa('[data-machine]').length === 8, `eight machines: 2 presses, 4 scanners, gate, lab (${qa('[data-machine]').map(m => m.getAttribute('data-machine')).join(',')})`)
check(qa('[data-pkg]').length >= 17, 'tasks are packages on the floor')
const lab = q('[data-machine="lab"]')
check(['crash', 'pause'].includes(lab?.getAttribute('data-state')), 'the blocked detective task jams the lab')
check(q('[data-bay]')?.getAttribute('data-bay') === '1' && q('.wl-bay.is-on'), 'the red Needs-you bin holds the blocked task')
check(lab.getAttribute('data-state') !== 'crash' || q('[data-smoke="lab"]'), 'a crashed machine smokes')
check(q(`[data-callout="${BLOCKED.id}"]`), 'a callout names the blocked task')
check(q('.wl-pill')?.getAttribute('data-mode') === 'live', 'Factory starts on Now (live)')
check(q('[data-shipped]')?.getAttribute('data-shipped') === '16', 'the dock counts 16 shipped crates')
await click(q('[data-speed="16"]'))
check(q('[data-speed="16"]').getAttribute('aria-pressed') === 'true', 'speed 16× can be picked')
await click(q('[data-ctl="play"]'))
check(q('.wl-pill')?.getAttribute('data-mode') === 'replay' && /Replay · 16×/.test(q('.wl-pill').textContent), 'Play starts the replay at the picked speed')
check(intervalsAt(100).length === 1, 'replay advances on a timer')
for (let i = 0; i < 3; i++) for (const it of intervalsAt(100)) await act(async () => { it.fn() })
await settle()
check(qa('[data-pkg]').length < REAL.tasks.length, 'early in the replay fewer packages exist')
await click(q('[data-ctl="now"]'))
check(q('.wl-pill')?.getAttribute('data-mode') === 'live' && intervalsAt(100).length === 0, 'Now returns to live and stops the replay timer')
await click(q(`[data-pkg][data-id="t_242d9908"]`))
check(q('.wl-fx-dr')?.getAttribute('data-id') === 't_242d9908', 'a package click opens the same detail drawer')
await click(q('.wl-fx-dr .wl-x'))
check(!q('.wl-fx-dr'), 'the Factory drawer closes')
await click(q('[data-machine="pressA"]'))
check(q('.wl-fx-dr') && q('.wl-fx-dr').getAttribute('data-id'), 'a machine click opens the drawer on its task')
await click(q('.wl-seg [data-view="board"]'))
await unmount()

overview = EDGE
await mount()
check(rawKeys().length === 0, 'edge fixture: no raw i18n keys')
check(!host.querySelector('script') && !host.querySelector('img'), 'XSS titles never become elements')
check(host.textContent.includes("<script>alert('x')</script>"), 'the <script> title is shown as text')
const pre = q('.wl-problems')
check(pre && pre.textContent.includes('profiles/broken/state.db') && pre.textContent.includes('file is not a database'), 'backend read errors are shown in the page')
check(q('.wl-wrow')?.textContent.includes('terminal command running'), 'Working now shows the live activity line')
check(count('working') === '1' && count('queued') === '1', 'edge counters read the backend totals')
await click(q('.wl-seg [data-view="factory"]'))
check(!host.querySelector('script') && !host.querySelector('img'), 'Factory: XSS titles never become elements')
check(qa('[data-machine]').some(m => m.getAttribute('data-state') === 'work'), 'the running task works a machine')
await click(q('.wl-seg [data-view="board"]'))
await unmount()

overview = WITH_KIDS
await mount()
await click(q('.wl-attn [data-act="retry"]'))
let dlg = q('[data-dialog="retry"]')
check(dlg?.getAttribute('data-phase') === 'confirm', 'Retry opens a confirm dialog')
const stepKeys = () => qa('[data-dialog] [data-step]').map(s => s.getAttribute('data-step'))
check(JSON.stringify(stepKeys()) === JSON.stringify(['read', 'create', 'link', 'unlink', 'link', 'unlink', 'comment', 'archive']), 'the confirm lists every step, one link + unlink per child')
const dtext = dlg.textContent
check(['title', 'body', 'assignee', 'priority', 'parents', 'skills', 'goal mode', 'model/provider/reasoning overrides', 'workspace'].every(w => dtext.includes(w)), 'the create step names every copied field')
check(dtext.includes('t_child_a') && dtext.includes('t_child_b') && dtext.includes(`Archive ${BLOCKED.id}`) && dtext.includes('comment'), 'the confirm names the children, the comment and the archive')
check(dtext.includes("Hermes cannot change an existing task's time limit"), 'the dialog says why a new task is used')
check(dtext.includes('board default for retries'), 'the dialog says the new task uses the board default for retries')
const limitInput = q('[data-field="limit"]')
check(limitInput?.value === '3', 'the default new limit is twice the old one (1h 30m → 3 h)')
check(api.length === 0, 'nothing is called before confirming')
await typeInto(limitInput, '0.2')
check(q('[data-dialog] [data-act="confirm"]').disabled, 'a limit under 0.5 h cannot be confirmed')
await typeInto(limitInput, '7.5')
check(q('[data-dialog] [data-act="confirm"]').textContent.includes('7h 30m'), 'the confirm button states the new limit')

const SOURCE = { id: BLOCKED.id, title: BLOCKED.title, body: 'the body', assignee: 'default', tenant: null, priority: 3, skills: ['superpowers:systematic-debugging'], goal_mode: true, goal_max_turns: 9, model_override: 'm', provider_override: 'p', reasoning_effort: 'high', workspace_kind: 'dir', workspace_path: 'C:/w', project_id: null }
let failAt = null
script = (req, n) => {
  if (failAt && n === failAt) throw new Error('kanban 500 on purpose')
  if (req.method === 'GET' && /\/tasks\/[^/?]+\?/.test(req.path)) return { task: SOURCE, links: { parents: ['t_parent_x'], children: ['t_child_a', 't_child_b'] } }
  if (req.method === 'POST' && req.path.startsWith('/api/plugins/kanban/tasks?')) return { task: { id: 't_new0001' } }
  if (req.method === 'PATCH') return { task: { id: BLOCKED.id, status: 'archived' } }
  return { ok: true }
}
await click(q('[data-dialog] [data-act="confirm"]'))
await settle()
const B = `board=${REAL.board}`
const want = [
  ['GET', `/api/plugins/kanban/tasks/${BLOCKED.id}?${B}`],
  ['POST', `/api/plugins/kanban/tasks?${B}`],
  ['POST', `/api/plugins/kanban/links?${B}`],
  ['DELETE', `/api/plugins/kanban/links?parent_id=${BLOCKED.id}&child_id=t_child_a&${B}`],
  ['POST', `/api/plugins/kanban/links?${B}`],
  ['DELETE', `/api/plugins/kanban/links?parent_id=${BLOCKED.id}&child_id=t_child_b&${B}`],
  ['POST', `/api/plugins/kanban/tasks/${BLOCKED.id}/comments?${B}`],
  ['PATCH', `/api/plugins/kanban/tasks/${BLOCKED.id}?${B}`]
]
check(JSON.stringify(api.map(r => [r.method, r.path])) === JSON.stringify(want), 'retry calls the Kanban API in the contract order')
const create = api[1].body
check(create.title === SOURCE.title && create.body === 'the body' && create.assignee === 'default' && create.priority === 3 && create.goal_mode === true && create.workspace_path === 'C:/w' && create.reasoning_effort === 'high' && create.model_override === 'm' && create.provider_override === 'p' && JSON.stringify(create.skills) === JSON.stringify(SOURCE.skills), 'POST /tasks copies the old task fields')
check(JSON.stringify(create.parents) === '["t_parent_x"]' && create.max_runtime_seconds === 27000 && !('max_retries' in create), 'POST /tasks keeps the parents, sets the new limit, sends no max_retries')
check(api[2].body.parent_id === 't_new0001' && api[2].body.child_id === 't_child_a' && api[4].body.child_id === 't_child_b', 'links point new task → each child')
check(api[6].body.author === 'wingline' && api[6].body.body.includes('t_new0001'), 'the comment on the old task names the new id')
check(JSON.stringify(api[7].body) === '{"status":"archived"}', 'the old task is archived with PATCH {status:"archived"}')
dlg = q('[data-dialog="retry"]')
check(dlg?.getAttribute('data-phase') === 'done' && dlg.textContent.includes('t_new0001'), 'the dialog reports success and the new id')
await click(q('[data-dialog] [data-act="close"]'))

api.length = 0
failAt = 5
await click(q('.wl-attn [data-act="retry"]'))
await click(q('[data-dialog] [data-act="confirm"]'))
await settle()
dlg = q('[data-dialog="retry"]')
check(api.length === 5, 'a failed step stops the retry: no request after it')
const states = qa('[data-dialog] [data-step]').map(s => s.getAttribute('data-state'))
check(JSON.stringify(states) === JSON.stringify(['done', 'done', 'done', 'done', 'failed', 'pending', 'pending', 'pending']), 'steps before the failure read Done, the failing one Failed, the rest Not done')
check(dlg.getAttribute('data-phase') === 'failed' && dlg.textContent.includes('Stopped at the first failure') && dlg.textContent.includes('kanban 500 on purpose'), 'the dialog says it stopped and why')
check(q('.wl-problems')?.textContent.includes('kanban 500 on purpose'), 'the failure also lands in the problems banner')
await click(q('[data-dialog] [data-act="close"]'))
await click(q('.wl-problems [data-act="dismiss"]'))
failAt = null

api.length = 0
await typeInto(q('.wl-note textarea'), 'Try <b>the</b> other path')
await click(q('.wl-note [data-act="note"]'))
dlg = q('[data-dialog="note"]')
check(dlg && dlg.textContent.includes(`Adds this comment to ${BLOCKED.id}`) && q('[data-quote]').textContent === 'Try <b>the</b> other path' && !q('[data-quote] b'), 'Add note confirms with the exact text, kept as text')
check(api.length === 0, 'no call before the note is confirmed')
await click(q('[data-dialog] [data-act="confirm"]'))
check(api.length === 1 && api[0].method === 'POST' && api[0].path === `/api/plugins/kanban/tasks/${BLOCKED.id}/comments?${B}` && api[0].body.body === 'Try <b>the</b> other path' && api[0].body.author === 'wingline', 'Add note posts {body, author:"wingline"}')
await click(q('[data-dialog] [data-act="close"]'))

api.length = 0
await click(q('.wl-attn [data-act="archive"]'))
dlg = q('[data-dialog="archive"]')
check(dlg?.textContent.includes('stays readable under archived') && dlg.textContent.includes('found again'), 'Archive says the task stays readable and can be found again')
await click(q('[data-dialog] [data-act="confirm"]'))
check(api.length === 0 && q('[data-dialog="archive"]')?.getAttribute('data-phase') === 'sure', 'Archive needs a second confirmation')
await click(q('[data-dialog] [data-act="confirm"]'))
check(api.length === 1 && api[0].method === 'PATCH' && api[0].path === `/api/plugins/kanban/tasks/${BLOCKED.id}?${B}` && JSON.stringify(api[0].body) === '{"status":"archived"}', 'Archive sends PATCH {status:"archived"}')
await click(q('[data-dialog] [data-act="close"]'))

api.length = 0
script = req => (req.path.includes('/log') ? { exists: true, content: '\u001b[31mred\u001b[0m line <img src=x>', truncated: true } : { ok: true })
await click(q('aside.wl-dr [data-act="log"]'))
check(api[0]?.method === 'GET' && api[0].path.startsWith(`/api/plugins/kanban/tasks/${BLOCKED.id}/log?tail=`) && api[0].path.endsWith(B), 'Open log reads GET /tasks/{id}/log on the board')
const logPre = q('.wl-logpre')
check(logPre?.textContent === 'red line <img src=x>' && !logPre.querySelector('img'), 'the log shows ANSI stripped, as text')
check(q('.wl-log')?.textContent.includes('Showing the end of the log.'), 'a truncated log says so')
script = () => { throw new Error('log 404') }
await click(q('aside.wl-dr [data-act="log"]'))
check(q('.wl-log')?.textContent.includes('log 404') && q('.wl-problems')?.textContent.includes('log 404'), 'a log read failure is shown')
await click(q('.wl-problems [data-act="dismiss"]'))

await click(q('aside.wl-dr [data-act="kanban"]'))
check(stub.calls.navigated.at(-1) === '/kanban', 'Open in Kanban navigates to /kanban')

stub.state.composerAnswers = true
await click(q('aside.wl-dr [data-act="chat"]'))
check(stub.calls.inserted.length === 1 && stub.calls.inserted[0][1].includes(BLOCKED.id) && q('.wl-notice')?.textContent.includes('chat composer'), 'Ask in chat prefills the composer when the SDK offers it')
stub.state.composerAnswers = false
await click(q('aside.wl-dr [data-act="chat"]'))
check(clip.length === 1 && clip[0].includes(BLOCKED.id) && q('.wl-notice')?.textContent.includes('copied to the clipboard'), 'without a composer the prompt is copied and the page says so')
clipRejects = true
await click(q('aside.wl-dr [data-act="chat"]'))
check(q('.wl-notice')?.textContent.includes('Could not reach') && q('.wl-problems')?.textContent.includes('clipboard denied'), 'a clipboard failure is shown, not swallowed')
clipRejects = false
await click(q('.wl-problems [data-act="dismiss"]'))

before = restCalls.length
await typeInto(q('.wl-select'), 'sap-systems')
check(restCalls.slice(before).includes('/overview?board=sap-systems') && kept.get('board') === 'sap-systems', 'the board switcher reads the picked board and keeps it')
api.length = 0
await unmount()

overviewFails = true
kept.delete('board')
await mount()
check(q('.wl-state[role="alert"]')?.textContent.includes('wingline backend 503'), 'an unreadable overview is shown with Try again')
overviewFails = false
await click(q('[data-act="reload"]'))
check(q('.wl-main'), 'Try again recovers the page')
await unmount()

console.log(failures ? `\n${failures} check(s) FAILED` : '\nall checks passed')
process.exit(failures ? 1 : 0)
