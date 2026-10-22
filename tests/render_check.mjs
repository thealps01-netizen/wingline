/**
 * Wingline — the desktop page rendered in jsdom with the real React, driven like a user.
 *
 * Run: cd tests && npm ci && node render_check.mjs      (exit 0 = passed)
 *
 * No real Hermes call is made: ctx.rest serves fixtures/app-real.json (plus edge tasks built here)
 * and window.hermesDesktop.api is a stub that records every Kanban request (method, path, body)
 * and answers from a script.
 *
 * Locks:
 *   1. Registration: a `routes` page /wingline + a `sidebar.nav` row with a resolved label; never a pane.
 *   2. Board from the real fixture: four columns, the stuck task in Needs you with its plain badge,
 *      finished pipelines grouped with a one-line result, the rail and decision count; no raw i18n key.
 *   3. Drawer: the story (headline, why, what follows), timeline dots, the loop rounds for r1/r2/r3
 *      pipelines, technical details folded away.
 *   4. Run again: note → POST comment then PATCH status ready, in that order; a refusal reverts and
 *      says so. Reply needs text. Tell the agent → one POST comment, no status change. Check → no call.
 *   5. Remove: two clicks, then 8 s of Undo before PATCH archived; Undo sends nothing; leaving the
 *      page sends the pending removal at once.
 *   6. Run with more time: the dialog lists every step; the run hits the exact URLs/methods/bodies.
 *   7. Edge data: hostile titles stay text, backend errors reach the rail, a running card shows its
 *      activity; List, Inbox, palette, help, replay open and close from the keyboard.
 *   8. Polling: /app every 5 s while visible, paused while hidden; a failing read offers Try again.
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
export const calls = { navigated: [] }
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
export const host = { navigate: path => { calls.navigated.push(path) } }
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

const REAL = JSON.parse(readFileSync(`${HERE}fixtures/app-real.json`, 'utf8'))
const BOARD = REAL.boards[0].slug
const STUCK = REAL.tasks.find(x => x.status === 'blocked' && x.story)
const LOOPED = REAL.tasks.find(x => / r2$/.test(x.pipe) && x.status === 'done')

const now = REAL.now
const base = { board: BOARD, role: 'builder', assignee: 'builder', created: now - 7200, done: null, maxrt: null, retries: null, reason: '', parents: [], children: [], usd: 0, usdKind: 'none', act: null, comments: 0, outcome: '', lens: null, labelKind: null, idx: 1, of: 1 }
const edgeTask = (id, over) => ({ ...base, id, title: `edge ${id}`, pipe: 'edge', step: id, label: `Edge ${id}`, ...over })
const EDGE = structuredClone(REAL)
EDGE.errors = [{ source: 'sessions', message: 'state.db unreadable' }]
EDGE.tasks.push(
  edgeTask('t_run', { status: 'running', title: '<img src=x onerror="window.__xss=1">', label: '<b>hostile</b>', runs: [{ s: now - 600, e: null, o: null, sum: '', err: '' }], act: { text: 'running tests', at: now - 30 } }),
  edgeTask('t_time', { status: 'blocked', maxrt: 3600, children: ['t_kid'], runs: [{ s: now - 5000, e: now - 1400, o: 'timed_out', sum: '', err: 'timed out' }], story: { cause: 'time_limit', facts: { limit: 3600, worked: 3600, kids: 1 }, asked: '', question: '', tl: [{ ts: now - 5000, tone: 'work', k: 'started', a: [], q: '' }, { ts: now - 1400, tone: 'bad', k: 'timedOut', a: [], q: '' }] } }),
  edgeTask('t_ask', { status: 'blocked', runs: [{ s: now - 900, e: now - 800, o: 'blocked', sum: '', err: '' }], story: { cause: 'asks_you', facts: { kids: 0 }, asked: 'Pick a colour.', question: 'Blue or green?', tl: [{ ts: now - 800, tone: 'you', k: 'asked', a: [], q: 'Blue or green?' }] } }),
  edgeTask('t_kid', { status: 'todo', parents: ['t_time'], runs: [] })
)

const kept = new Map()
const storage = {
  get: (key, fallback) => (kept.has(key) ? kept.get(key) : fallback),
  set: (key, value) => { kept.set(key, value) },
  remove: key => { kept.delete(key) }
}
const registered = []
const restCalls = []
let data = REAL
let restFails = false
const ctx = {
  storage,
  register: c => { registered.push(c); return () => {} },
  i18n: { register: b => stub.registerBundles('wingline', b), t: k => k },
  rest: async path => {
    restCalls.push(path)
    if (path !== '/app') throw new Error(`unexpected wingline path ${path}`)
    if (restFails) throw new Error('wingline backend 503')
    return structuredClone(data)
  }
}

const api = []
let script = () => ({ ok: true })
window.hermesDesktop = { api: async request => { api.push(structuredClone(request)); return script(request, api.length) } }

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
const unmount = async () => { await act(async () => { root.render(null) }); await settle() }
const q = sel => host.querySelector(sel)
const qa = sel => [...host.querySelectorAll(sel)]
const click = async el => {
  if (!el) throw new Error('click target missing')
  await act(async () => { el.dispatchEvent(new window.MouseEvent('click', { bubbles: true })) })
  await settle()
}
const key = async (k, target) => {
  await act(async () => { (target || q('.wl-app')).dispatchEvent(new window.KeyboardEvent('keydown', { key: k, bubbles: true })) })
  await settle()
}
const typeInto = async (el, value) => {
  const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value)
  await act(async () => { el.dispatchEvent(new window.Event('input', { bubbles: true })) })
  await settle()
}
const rawKeys = () => {
  const bits = [host.textContent]
  for (const el of host.querySelectorAll('*')) for (const a of ['aria-label', 'placeholder', 'title']) if (el.getAttribute(a)) bits.push(el.getAttribute(a))
  return bits.join('\n').match(/wingline\.[a-z][A-Za-z]*(\.[A-Za-z]+)*/g) || []
}
const card = id => qa('.card').find(c => c.dataset.ids.split(',').includes(id))
const runPoll = async () => { for (const i of intervals.filter(x => x.on && x.ms === 5000)) await act(async () => { i.fn() }); await settle() }
const okTask = status => (req, n) => (req.method === 'PATCH' ? { task: { status: req.body.status === 'ready' ? 'ready' : status } } : { ok: true, n })

await mount()
check(restCalls[0] === '/app', 'first read is /app')
check(rawKeys().length === 0, `Board: no raw i18n keys (${rawKeys().slice(0, 3).join(', ')})`)
check(qa('.col').map(c => c.dataset.col).join() === 'needs,working,queued,done', 'four columns: Needs you, Working, Queued, Done')
check(q('[data-board]')?.dataset.board === BOARD && q('.attn')?.textContent.includes('1 decision waits for you'), 'the rail lists the board and counts one decision')
const stuck = card(STUCK.id)
check(stuck && stuck.closest('.col').dataset.col === 'needs', 'the stuck task sits in Needs you')
check(stuck?.querySelector('[data-cause="silent"]')?.textContent.startsWith('Stuck · silent'), 'its badge says in plain words that it is stuck and silent')
check(!stuck?.textContent.includes('heartbeat') && !stuck?.textContent.includes('VERDICT'), 'the card carries no raw agent or Hermes wording')
check(['again', 'remove'].every(a => stuck?.querySelector(`[data-act="${a}"]`)), 'the stuck card offers Run again and Remove')
const doneCards = qa('.col[data-col="done"] .card.grp')
check(doneCards.length > 0 && doneCards.every(c => c.querySelector('.res')), 'finished pipelines are grouped, each with a one-line result')
check(doneCards.some(c => /round \d/.test(c.querySelector('.res').textContent)), 'a finished round names the round it ended in or went back to')

await click(stuck.querySelector('.ctitle'))
const dr = q('.drawer.on')
check(dr && dr.querySelector('[data-story="silent"] .shead')?.textContent === 'The agent got stuck. Still need this?', 'the drawer opens on the story headline')
check(dr?.querySelector('.swhy')?.textContent.includes('went silent'), 'the story says why in a plain sentence')
check(dr?.querySelectorAll('.tdot').length === STUCK.story.tl.length, `the timeline has one dot per recorded event (${STUCK.story.tl.length})`)
check(dr?.querySelector('details.tech') && !dr.querySelector('details.tech').open, 'technical details are folded away')
check(rawKeys().length === 0, `Drawer: no raw i18n keys (${rawKeys().slice(0, 3).join(', ')})`)
check(STUCK.runs.some(r => r.o === 'crashed' && r.e - r.s > (STUCK.maxrt || Infinity)) && !dr.textContent.includes('Out of time') && !dr.textContent.includes('so Hermes stopped it.'),
  'a crashed run that ran past its limit is never reported as a time-out')
api.length = 0
script = () => ({ exists: true, content: '\u001b[31mred\u001b[0m line', truncated: false })
await click(q('.drawer [data-act="log"]'))
check(api[0]?.method === 'GET' && api[0].path === `/api/plugins/kanban/tasks/${STUCK.id}/log?tail=131072&board=${BOARD}` && q('.drawer .logpre')?.textContent === 'red line', 'Open log reads the worker log and strips colour codes')
await click(q('.drawer [data-act="close"]'))
check(!q('.drawer.on'), 'the close button shuts the drawer')

if (LOOPED) {
  await click(card(LOOPED.id).querySelector('.ctitle'))
  await click(qa('.card.grp.open .srow').find(r => r.dataset.nav === `t:${LOOPED.id}`))
  const rounds = qa('.drawer.on [data-round]').map(r => r.dataset.round)
  check(rounds.length >= 2 && rounds[0] === '1', `the loop box lists every round of the pipeline (${rounds.join(',')})`)
  check(q('.drawer.on .lpb')?.textContent.includes('→ round'), 'the loop box says why a round went back')
  await click(q('.drawer [data-act="close"]'))
} else check(false, 'the fixture holds a round-2 pipeline for the loop check')

script = okTask('blocked')
api.length = 0
await click(card(STUCK.id).querySelector('[data-act="again"]'))
const note = q(`[data-note="again"] textarea`)
check(!!note, 'Run again first asks for an optional note')
await typeInto(note, 'focus on the test')
data = structuredClone(REAL)
data.tasks.find(x => x.id === STUCK.id).status = 'ready'
await click(q('[data-note="again"] [data-act="send"]'))
check(api.length === 2 && api[0].method === 'POST' && api[0].path === `/api/plugins/kanban/tasks/${STUCK.id}/comments?board=${BOARD}` && api[0].body.body === 'focus on the test' && api[0].body.author === 'wingline', 'the note is saved as a Kanban comment first')
check(api[1]?.method === 'PATCH' && api[1].path === `/api/plugins/kanban/tasks/${STUCK.id}?board=${BOARD}` && api[1].body.status === 'ready', 'then Hermes is asked to set the task ready')
check(card(STUCK.id)?.closest('.col').dataset.col === 'queued' && q('.toast')?.textContent.includes('with your note'), 'the card moves to Queued and a toast confirms it')

script = req => (req.method === 'PATCH' ? { task: { status: 'blocked' } } : { ok: true })
data = structuredClone(REAL)
await runPoll()
api.length = 0
await click(card(STUCK.id).querySelector('[data-act="again"]'))
await click(q('[data-note="again"] [data-act="send"]'))
check(api.length === 1 && api[0].method === 'PATCH', 'an empty note sends no comment')
check(card(STUCK.id)?.closest('.col').dataset.col === 'needs' && qa('.toast.bad').some(t => t.textContent.includes('Hermes did not apply the change')), 'a refusal puts the card back and says so')

api.length = 0
await click(card(STUCK.id).querySelector('[data-act="remove"]'))
check(card(STUCK.id)?.querySelector('[data-act="remove"]')?.textContent === 'Click again to remove' && api.length === 0, 'Remove asks for a second click and sends nothing')
await click(card(STUCK.id).querySelector('[data-act="remove"]'))
check(!card(STUCK.id) && api.length === 0, 'after the second click the card leaves, still nothing sent')
await click(qa('.toast [data-act="undo"]').pop())
check(card(STUCK.id) && api.length === 0, 'Undo brings it back without any call')
await click(card(STUCK.id).querySelector('[data-act="remove"]'))
await click(card(STUCK.id).querySelector('[data-act="remove"]'))
script = req => (req.method === 'PATCH' ? { task: { status: 'archived' } } : { ok: true })
await tick(8300)
await settle()
check(api.length === 1 && api[0].method === 'PATCH' && api[0].body.status === 'archived', 'after 8 s the removal is sent as PATCH archived')
await unmount()

data = EDGE
restCalls.length = 0
await mount()
check(window.__xss === undefined && !host.querySelector('img[src="x"]') && host.textContent.includes('<b>hostile</b>'), 'hostile titles stay text')
check(q('.probs')?.textContent.includes('state.db unreadable'), 'backend read errors are shown in the rail')
const run = card('t_run')
check(run?.closest('.col').dataset.col === 'working' && run.querySelector('[data-live="t_run"]')?.textContent === 'running tests', 'a running card shows what the agent is doing')
api.length = 0
await click(run.querySelector('[data-act="check"]'))
check(card('t_run').querySelector('[data-check]')?.textContent.length > 10 && api.length === 0, 'Check answers from the record and calls nothing')
await click(card('t_run').querySelector('[data-act="tell"]'))
await typeInto(q('[data-note="tell"] textarea'), 'skip the docs')
script = () => ({ ok: true })
await click(q('[data-note="tell"] [data-act="send"]'))
check(api.length === 1 && api[0].method === 'POST' && api[0].path.endsWith(`/tasks/t_run/comments?board=${BOARD}`) && api[0].body.body === 'skip the docs', 'Tell the agent adds one comment and changes no status')

api.length = 0
await click(card('t_ask').querySelector('[data-act="reply"]'))
await click(q('[data-note="reply"] [data-act="send"]'))
check(api.length === 0 && q('[data-note="reply"]'), 'Reply refuses to send an empty answer')
await unmount()

await mount()
await click(card('t_time').querySelector('[data-act="more"]'))
const steps = qa('.dlg [data-step]').map(s => s.dataset.step)
check(steps.join() === 'read,create,link,unlink,comment,archive', `Run with more time lists every step (${steps.join()})`)
check(q('.dlg .lim')?.value === '2', 'the new limit defaults to twice the old one')
api.length = 0
script = req => {
  if (req.method === 'GET') return { task: { title: 'edge t_time', body: 'b', assignee: 'builder', priority: 2 }, links: { parents: [], children: ['t_kid'] } }
  if (req.method === 'POST' && req.path.startsWith('/api/plugins/kanban/tasks?')) return { task: { id: 't_new' } }
  if (req.method === 'PATCH') return { task: { status: 'archived' } }
  return { ok: true }
}
await click(q('.dlg [data-act="confirm"]'))
await settle()
const trail = api.map(r => `${r.method} ${r.path.replace('/api/plugins/kanban', '').replace(`board=${BOARD}`, 'B')}`)
check(trail.join(' | ') === 'GET /tasks/t_time?B | POST /tasks?B | POST /links?B | DELETE /links?parent_id=t_time&child_id=t_kid&B | POST /tasks/t_time/comments?B | PATCH /tasks/t_time?B', `the retry runs the exact Kanban calls in order (${trail.join(' | ')})`)
check(api[1]?.body.max_runtime_seconds === 7200 && api[1].body.priority === 2 && api[2]?.body.parent_id === 't_new', 'the copy keeps the task fields and the new limit, and the child is re-linked')
check(q('.dlg')?.dataset.phase === 'done' && q('.dlg .cans')?.textContent.includes('t_new'), 'the dialog reports the new task id')
await click(q('.dlg [data-act="close"]'))

await key('2')
check(q('.list .lgrp') && q('.tabs [data-view="list"]').classList.contains('on'), 'key 2 opens the List')
await key('3')
check(qa('.irow[data-kind="needs"]').length >= 2 && q('.idet .det'), 'key 3 opens the Inbox with the decisions and a detail pane')
await key('1')
await key('/')
check(q('.scrim.on .pal input'), '/ opens the command palette')
await key('Escape', q('.pal input'))
check(!q('.scrim.on'), 'Escape closes it')
await key('?')
check(q('.scrim.on .help'), '? opens the keyboard help')
await key('Escape')
await key('r')
check(q('.rbar.on') && q('.live.rp'), 'R starts the replay')
await key('Escape')
check(!q('.rbar.on'), 'Escape goes back live')
check(rawKeys().length === 0, `Edge pass: no raw i18n keys (${rawKeys().slice(0, 3).join(', ')})`)

script = req => (req.method === 'PATCH' ? { task: { status: 'archived' } } : { ok: true })
await click(card('t_ask').querySelector('[data-act="remove"]'))
await click(card('t_ask').querySelector('[data-act="remove"]'))
api.length = 0
await unmount()
await settle()
check(api.length === 1 && api[0].path.includes('/tasks/t_ask?') && api[0].body.status === 'archived', 'leaving the page sends a pending removal at once')

data = REAL
restCalls.length = 0
await mount()
await runPoll()
check(restCalls.filter(p => p === '/app').length === 2, 'polls /app every 5 s')
hidden = true
await runPoll()
check(restCalls.length === 2, 'no poll while the window is hidden')
hidden = false
await unmount()

restFails = true
await mount()
check(q('.wl-state[role="alert"]')?.textContent.includes('wingline backend 503'), 'an unreadable backend is shown with Try again')
restFails = false
await click(q('[data-act="reload"]'))
check(q('.board .col'), 'Try again recovers the page')
await unmount()

console.log(failures ? `\n${failures} check(s) FAILED` : '\nall checks passed')
process.exit(failures ? 1 : 0)
