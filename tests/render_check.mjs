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
 *   2. Board from the real fixture, one check (or more) per owner rule:
 *      1 plain one-line reason, raw text only in a closed "Raw error" disclosure; 2 the detail sheet
 *      opens only on click, closes, never repeats the reason, attempts show outcome + duration;
 *      3 idle Working now is one slim line; 4 timeline grouped by pipeline, compact rows, bar min width,
 *      even ticks, no wide empty band, longest run widest; 5 every group mapped without overlap and one
 *      duration format; 6 stored board names; 7 sheet body scrolls, footer actions stay visible;
 *      8 empty board → last pick, else most recent activity, switcher counts; 9 hierarchy, type scale,
 *      one accent per meaning. No raw i18n key anywhere.
 *   3. Edge fixture: XSS titles stay text, backend errors are shown, a running task's activity line.
 *   4. Factory: the prototype's own light scene (floor + grid, smooth belts, 3D-ish machines, gold
 *      gate disc, calm dashed Needs-you bin, no theme colour inside, no label under 11 px at 1440 wide,
 *      no network font), 8 machines, crates, the jammed lab + callout naming the recorded outcome,
 *      Replay 1×/4×/16× and Now; a crate click opens the same sheet; the choice persists.
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

const src = readFileSync(SRC, 'utf8').replace(/(['"])@hermes\/plugin-sdk\1/, `'${HERE_URL.href}${OUT_REL}sdk-stub.mjs'`)
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
    return structuredClone(typeof overview === 'function' ? overview(path) : overview)
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
const main = q('.wl-main')
const lists = [...(main?.children || [])].filter(e => !e.matches('.wl-world, .wl-world-off'))
check(lists[0]?.getAttribute('aria-labelledby') === 'wl-needs-h', 'Needs you is the first list section of the Board')
check(main?.firstElementChild?.matches('.wl-world-off') && /World view is off on this computer \(no WebGL2\)/.test(main.firstElementChild.textContent), `without WebGL2 the Board says the world view is off and shows the lists (${main?.firstElementChild?.textContent?.slice(0, 80)})`)
const attn = qa('.wl-attn')
check(attn.length === 1 && attn[0].getAttribute('data-id') === BLOCKED.id, 'Needs you lists the one blocked task')
check(/Retries used \d+\/\d+/.test(attn[0].textContent) && /worked/.test(attn[0].textContent), 'the blocked card shows retries and time worked')
check(['retry', 'log', 'chat', 'archive'].every(a => attn[0].querySelector(`[data-act="${a}"]`)), 'the blocked card carries Retry / Open log / Ask in chat / Archive')
const count = k => q(`[data-count="${k}"] b`)?.textContent
check(count('needs') === '1' && count('working') === '0' && count('queued') === '0' && count('done') === '16', 'header counters read 1 / 0 / 0 / 16')
check(count('spend') === '$46.16', 'Spend counter reads the backend total')

// rule 1: one plain line as the reason; the raw dump only behind a closed "Raw error" disclosure
const reasonEl = attn[0].querySelector('[data-reason]')
check(reasonEl?.textContent === BLOCKED.block_reason_plain && !/\n/.test(reasonEl.textContent) && reasonEl.textContent.length <= 160, 'rule 1: the card reason is the one plain line from the backend')
check(!/last output|IS_REACT_ACT|\\x1b|\u001b/.test(qa('[data-reason]').map(e => e.textContent).join(' ')), 'rule 1: no worker dump text in any reason')
const rawBox = attn[0].querySelector('details[data-raw]')
check(rawBox && !rawBox.open && rawBox.querySelector('summary')?.textContent === 'Raw error' && rawBox.querySelector('pre.wl-mono')?.textContent.includes('pid 30928 not alive'), 'rule 1: the raw error sits in a collapsed "Raw error" disclosure, monospace')
const cssText = () => q('style')?.textContent || ''
const rule = sel => (cssText().match(new RegExp(`(?:^|\\})${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\{([^}]*)\\}`, 'm')) || [])[1] || ''
check(/max-height:\d+px/.test(rule('.wl-rawtext')) && /overflow:auto/.test(rule('.wl-rawtext')), 'rule 1: the raw text box has a max height and scrolls')
check(!host.textContent.includes('Stopped by its time limit') && !host.textContent.includes('TIME LIMIT'), 'a crashed run that ran past its limit is never reported as a time-out')

// rule 2: one place per fact; the detail sheet opens only on click and does not repeat the reason
check(!q('.wl-sheet'), 'rule 2: no detail sheet is open by default')
await click(attn[0].querySelector('[data-act="details"]'))
let sheet = q('.wl-sheet')
check(sheet?.getAttribute('data-id') === BLOCKED.id && sheet.getAttribute('role') === 'dialog', 'rule 2: Details opens the sheet on the task')
check(sheet && !sheet.textContent.includes(BLOCKED.block_reason_plain) && !sheet.querySelector('[data-reason]'), 'rule 2: the sheet does not repeat the card reason')
check(host.textContent.split(BLOCKED.block_reason_plain).length === 2, 'rule 2: the reason appears exactly once on the page')
const att = sheet ? [...sheet.querySelectorAll('[data-attempt]')] : []
check(att.length === BLOCKED.runs.length && att.every(li => li.querySelector('[data-outcome]')?.textContent === 'crashed' && /\d+h \d+m|\d+m \d+s|\d+s/.test(li.textContent)), 'rule 2: each attempt shows its outcome and duration')
check(att.every(li => !li.querySelector('details[data-raw]') || !li.querySelector('details[data-raw]').open) && !/IS_REACT_ACT/.test([...(sheet?.querySelectorAll('.wl-att-out, small') || [])].map(e => e.textContent).join(' ')), 'rule 2: attempt raw text stays collapsed')
check(sheet?.textContent.includes('estimated') && sheet.textContent.includes('Comments'), 'the sheet shows the cost status word and comments')
await click(q('.wl-sheet [data-act="close-sheet"]'))
check(!q('.wl-sheet'), 'rule 2: the sheet closes with its close button')
await click(qa('.wl-tl-row').find(r => r.getAttribute('data-id') === 't_834367bc'))
check(q('.wl-sheet')?.getAttribute('data-id') === 't_834367bc', 'a timeline row opens its task in the sheet')
check(q('.wl-sheet').textContent.includes('ui-polish-1140 r1 security'), 'the sheet names the parents it waits for')
await act(async () => { document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })) })
await settle()
check(!q('.wl-sheet'), 'rule 2: Escape closes the sheet')

// rule 3: Working now with nothing running is one slim line
const work = q('[aria-labelledby="wl-work-h"]')
check(work?.getAttribute('data-idle') === '1' && work.children.length === 1 && work.querySelectorAll('.wl-slim').length === 1 && !work.querySelector('.wl-panel, h2'), 'rule 3: idle Working now is a single slim line')
check(work?.textContent.includes('No worker is running.'), 'rule 3: the slim line says nothing runs')

// rules 4 + 5: every group, mapped and on the timeline, one duration format
const REF_DUR = s => { const v = Math.round(s); if (v < 60) return `${v}s`; if (v < 3600) return v % 60 ? `${Math.floor(v / 60)}m ${v % 60}s` : `${v / 60}m`; const m = Math.round(v / 60); return m % 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${Math.floor(m / 60)}h` }
const work_s = x => x.runs.reduce((s, r) => s + Math.max(0, (r.ended_at ?? REAL.now) - r.started_at), 0)
const pipes = qa('.wl-pipe')
const nodeIds = qa('.wl-node').map(n => n.getAttribute('data-id'))
check(nodeIds.length === REAL.tasks.length && new Set(nodeIds).size === REAL.tasks.length, `rule 5: the pipeline map shows every task once (${nodeIds.length}/${REAL.tasks.length})`)
const pipeNames = pipes.map(p => p.getAttribute('data-group'))
check(pipes.length === 7 && ['deck T1', 'deck T2', 'deck T3', 'deck T4', 'deck flake'].every(n => pipeNames.includes(n)) && pipeNames.some(n => n.startsWith('ui-polish-1140')), `rule 5: every group is mapped, deck implement/review pairs too (${pipeNames.join(' | ')})`)
check(qa('.wl-edge[data-edge="dep"]').length === 8 && qa('.wl-edge[data-edge="seq"]').length === 5, 'rule 5: the chain keeps its 8 parent→child edges; each pair is linked')
const overlaps = pipes.some(p => {
  const boxes = [...p.querySelectorAll('.wl-node')].map(n => { const m = /translate\(([-\d.]+),([-\d.]+)\)/.exec(n.getAttribute('transform')); const r = n.querySelector('rect'); return [+m[1], +m[2], +r.getAttribute('width'), +r.getAttribute('height')] })
  const svg = p.querySelector('svg')
  const W = +svg.getAttribute('width'); const H = +svg.getAttribute('height')
  return boxes.some(([x, y, w, hh], i) => x < 0 || y < 0 || x + w > W || y + hh > H || boxes.some(([x2, y2, w2, h2], j) => j > i && x < x2 + w2 && x2 < x + w && y < y2 + h2 && y2 < y + hh))
})
check(!overlaps, 'rule 5: no pipeline node overlaps another or leaves its group')
const nodeDur = qa('.wl-node').every(n => n.querySelector('.wl-nt span')?.textContent.startsWith(REF_DUR(work_s(REAL.tasks.find(x => x.id === n.getAttribute('data-id'))))))
check(nodeDur, 'rule 5: node durations use the one formatter (74 s → 1m 14s)')
check(!/\b\d+ (?:s|min)\b/.test(host.textContent), 'rule 5: no other duration style ("74 s", "12 min") anywhere')
const tlGroups = qa('.wl-tl-groupbox')
check(tlGroups.length === pipes.length && tlGroups.every((g, i) => g.getAttribute('data-group') === pipeNames[i]) && qa('.wl-tl-groupbox .wl-tl-row').length === REAL.tasks.length, 'rule 4: the timeline is grouped by the same pipelines, one row per task')
check(/height:2[0-8]px/.test(rule('.wl-tl-row')), 'rule 4: timeline rows are compact')
check(/min-width:[4-9]px/.test(rule('.wl-run')), 'rule 4: run bars have a visible minimum width')
const tickPos = qa('[data-tick]').map(e => parseFloat(e.style.left))
const steps = tickPos.slice(1).map((p, i) => p - tickPos[i])
check(tickPos.length >= 4 && steps.every(d => Math.abs(d - steps[0]) < 0.01) && tickPos[0] > 0 && tickPos.at(-1) < 100, 'rule 4: ticks are evenly placed inside the track')
const bars = qa('.wl-run')
check(bars.length === REAL.tasks.reduce((s, x) => s + x.runs.length, 0), 'timeline draws one bar per attempt')
const spans = bars.map(b => [parseFloat(b.style.left), parseFloat(b.style.left) + parseFloat(b.style.width)]).sort((a, b) => a[0] - b[0])
let reach = 0, gapMax = 0
for (const [a, b] of spans) { gapMax = Math.max(gapMax, a - reach); reach = Math.max(reach, b) }
gapMax = Math.max(gapMax, 100 - reach)
check(gapMax < 15, `rule 4: no wide empty band on the timeline (largest gap ${gapMax.toFixed(1)}%)`)
const longest = REAL.tasks.flatMap(x => x.runs).reduce((m, r) => ((r.ended_at ?? REAL.now) - r.started_at > (m.ended_at ?? REAL.now) - m.started_at ? r : m))
const longTask = REAL.tasks.find(x => x.runs.includes(longest))
const longBar = qa('.wl-tl-row').find(r => r.getAttribute('data-id') === longTask.id)?.querySelectorAll('.wl-run')[longTask.runs.indexOf(longest)]
check(Math.max(...bars.map(b => parseFloat(b.style.width))) === parseFloat(longBar?.style.width) && parseFloat(longBar.style.width) > 20, 'rule 4: working time keeps true length (the longest run is the widest bar) while idle gaps are squeezed')

// rule 6: board names as Hermes stores them, with task counts
const opts = qa('.wl-select option')
const cur = opts.find(o => o.value === REAL.board)
check(cur?.textContent === 'Hermes Approvals Ui · 17 tasks' && opts.length === REAL.boards.length, 'rule 6 + 8: the switcher shows Hermes\' stored board name and the task count')
check(opts.every(o => o.textContent.startsWith(REAL.boards.find(b => b.slug === o.value).name)), 'rule 6: every board option starts with its stored name, unchanged')

// rule 7: nothing clipped — the sheet scrolls inside, its actions stay in a fixed footer
check(/overflow:auto/.test(rule('.wl-sheet-body')) && /min-height:0/.test(rule('.wl-sheet-body')) && /flex:none/.test(rule('.wl-sheet-foot')) && /flex-direction:column/.test(rule('.wl-sheet')), 'rule 7: the sheet body scrolls while head and action footer stay visible')
await click(attn[0].querySelector('[data-act="details"]'))
check(q('.wl-sheet-foot [data-act="retry"]') && !q('.wl-sheet-body [data-act="retry"]'), 'rule 7: sheet actions sit in the footer, outside the scrolling body')
await click(q('.wl-sheet [data-act="close-sheet"]'))

// rule 9: hierarchy — Needs you strongest, one type scale, one accent per meaning
const px = sel => parseFloat((/font-size:([\d.]+)px/.exec(rule(sel)) || [])[1] || '0')
check(px('.wl-sec.is-needs>.wl-h2') > px('.wl-h2') && px('.wl-attn h3') >= px('.wl-sheet h3'), 'rule 9: Needs you carries the strongest heading on the Board')
const sizes = [...cssText().split('}').filter(r => r.trim().startsWith('.wl-')).join('}').matchAll(/font-size:([\d.]+)px/g)].map(m => +m[1])
check(sizes.every(s => [11.5, 12, 12.5, 13, 13.5, 14, 15, 16, 17].includes(s)), `rule 9: chrome font sizes stay on one scale (${[...new Set(sizes)].sort((a, b) => a - b).join(', ')})`)
check(/--ui-yellow/.test(rule('.wl-attn')) && !/--ui-(?:red|accent|green)/.test(rule('.wl-attn')) && /--ui-accent/.test(rule('.wl-wrow')) && !/--ui-yellow/.test(rule('.wl-wrow')), 'rule 9: one accent per meaning (needs you = yellow, working = accent)')

await click(q('[data-count="needs"]'))
check(qa('.wl-tl-row.is-dim').length === REAL.tasks.length - 1, 'the Needs you counter filters the timeline')
await click(q('[data-count="needs"]'))
check(cssText().includes('prefers-reduced-motion'), 'page respects prefers-reduced-motion')

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
check(qa('.wlf-bed').length >= 8 && qa('.wlf-slats').length === qa('.wlf-bed').length, 'belts are drawn between the zones')
check(qa('[data-machine]').length === 8, `eight machines: 2 presses, 4 scanners, gate, lab (${qa('[data-machine]').map(m => m.getAttribute('data-machine')).join(',')})`)
check(qa('[data-pkg]').length >= 17, 'tasks are crates on the floor')
const lab = q('[data-machine="lab"]')
check(['crash', 'pause'].includes(lab?.getAttribute('data-state')), 'the blocked detective task jams the lab')
check(q('[data-bay]')?.getAttribute('data-bay') === '1' && q('.wlf-bin.is-on'), 'the Needs-you bin holds the blocked task')
check(lab.getAttribute('data-state') !== 'crash' || q('[data-smoke="lab"]'), 'a crashed machine smokes')
check(q(`[data-callout="${BLOCKED.id}"]`), 'a callout names the blocked task')
check(q('.wl-pill')?.getAttribute('data-mode') === 'live', 'Factory starts on Now (live)')
check(q('[data-shipped]')?.getAttribute('data-shipped') === '16', 'the dock counts 16 shipped crates')
const fsvg = q('.wlf-svg')
const sceneFill = [...fsvg.querySelectorAll('*')].flatMap(e => ['fill', 'stroke', 'style'].map(a => e.getAttribute(a) || '')).join(' ')
check(!sceneFill.includes('var(--ui-') && !/var\(--ui-/.test(rule('.wlf-stage')), 'Factory: the scene keeps its own light palette, no app theme colours inside')
check(fsvg.querySelector('rect[fill="url(#wlf-floor)"]') && fsvg.querySelectorAll('[clip-path="url(#wlf-floorclip)"] line').length > 20, 'Factory: a soft light floor with a grid')
check(['pressA', 'pressB', 'gate', 'lab'].every(k => q(`[data-machine="${k}"] [filter="url(#wlf-f-head)"], [data-machine="${k}"] [filter="url(#wlf-f-block)"]`)) && q('[data-machine="gate"] [fill="url(#wlf-disc)"]'), 'Factory: machines are 3D-ish blocks with shadows; the gate has its gold disc')
check(!q('[data-bay] [fill="url(#wlf-hz)"]') && q('.wlf-binline')?.getAttribute('stroke-dasharray'), 'Factory: the Needs-you bin has a calm dashed border, no candy stripes')
check(qa('.wlf-bed').every(b => !b.getAttribute('stroke-dasharray')) && !q('pattern#wlf-rail, pattern#wlf-ladder'), 'Factory: belts are smooth beds, no rail or ladder texture')
const vbW = +fsvg.getAttribute('viewBox').split(' ')[2]
const sceneSizes = [...cssText().split('}').filter(r => r.trim().startsWith('.wlf-')).join('}').matchAll(/font-size:([\d.]+)px/g)].map(m => +m[1])
const CONTENT_AT_1440 = 1440 - 300 - 48
check(sceneSizes.length > 0 && Math.min(...sceneSizes) * (CONTENT_AT_1440 / vbW) >= 11, `Factory: no label under 11 px at 1440 wide (smallest ${(Math.min(...sceneSizes) * (CONTENT_AT_1440 / vbW)).toFixed(1)} px)`)
check(!/@import|url\(https?:|fonts\.googleapis/.test(cssText()), 'Factory: no network fonts')
await click(q('[data-speed="16"]'))
check(q('[data-speed="16"]').getAttribute('aria-pressed') === 'true', 'speed 16× can be picked')
await click(q('[data-ctl="play"]'))
check(q('.wl-pill')?.getAttribute('data-mode') === 'replay' && /Replay · 16×/.test(q('.wl-pill').textContent), 'Play starts the replay at the picked speed')
check(intervalsAt(100).length === 1, 'replay advances on a timer')
for (let i = 0; i < 3; i++) for (const it of intervalsAt(100)) await act(async () => { it.fn() })
await settle()
check(qa('[data-pkg]').length < REAL.tasks.length, 'early in the replay fewer crates exist')
await click(q('[data-ctl="now"]'))
check(q('.wl-pill')?.getAttribute('data-mode') === 'live' && intervalsAt(100).length === 0, 'Now returns to live and stops the replay timer')
check(!q('.wl-sheet'), 'Factory: no sheet open until something is clicked')
await click(q(`[data-pkg][data-id="t_242d9908"]`))
check(q('.wl-sheet')?.getAttribute('data-id') === 't_242d9908', 'a crate click opens the same detail sheet')
await click(q('.wl-sheet [data-act="close-sheet"]'))
check(!q('.wl-sheet'), 'the Factory sheet closes')
await click(q('[data-machine="pressA"]'))
check(q('.wl-sheet') && q('.wl-sheet').getAttribute('data-id'), 'a machine click opens the sheet on its task')
await click(q('.wl-sheet [data-act="close-sheet"]'))
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

// rule 8: an empty current board opens the last picked board, else the board with the newest activity
const EMPTY = { ...structuredClone(REAL), board: 'default', tasks: [], totals: { needs_you: 0, working: 0, queued: 0, done: 0, spend_usd: 0 } }
const bySlug = path => {
  const m = /board=([^&]+)/.exec(path)
  return m ? { ...structuredClone(REAL), board: decodeURIComponent(m[1]) } : EMPTY
}
overview = bySlug
kept.delete('board')
restCalls.length = 0
await mount()
check(restCalls[0] === '/overview' && restCalls.includes('/overview?board=sap-systems') && q('.wl-select')?.value === 'sap-systems', `rule 8: an empty current board with no pick jumps to the most recently active board (${restCalls.join(' ')})`)
check(!kept.has('board'), 'rule 8: the automatic jump is not stored as the user\'s pick')
await unmount()
kept.set('board', 'wiki-recall')
restCalls.length = 0
await mount()
check(restCalls[0] === '/overview?board=wiki-recall' && !restCalls.some(p => p.includes('sap-systems')) && q('.wl-select')?.value === 'wiki-recall', 'rule 8: the board the user last picked opens, no automatic jump')
await unmount()
kept.delete('board')
overview = REAL
restCalls.length = 0
await mount()
check(restCalls.length === 1 && restCalls[0] === '/overview', 'rule 8: a current board with tasks stays put')
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
await click(q('.wl-attn [data-act="details"]'))
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
await click(q('.wl-sheet-foot [data-act="log"]'))
check(api[0]?.method === 'GET' && api[0].path.startsWith(`/api/plugins/kanban/tasks/${BLOCKED.id}/log?tail=`) && api[0].path.endsWith(B), 'Open log reads GET /tasks/{id}/log on the board')
const logPre = q('.wl-logpre')
check(logPre?.textContent === 'red line <img src=x>' && !logPre.querySelector('img'), 'the log shows ANSI stripped, as text')
check(q('.wl-log')?.textContent.includes('Showing the end of the log.'), 'a truncated log says so')
script = () => { throw new Error('log 404') }
await click(q('.wl-sheet-foot [data-act="log"]'))
check(q('.wl-log')?.textContent.includes('log 404') && q('.wl-problems')?.textContent.includes('log 404'), 'a log read failure is shown')
await click(q('.wl-problems [data-act="dismiss"]'))

await click(q('.wl-sheet-foot [data-act="kanban"]'))
check(stub.calls.navigated.at(-1) === '/kanban', 'Open in Kanban navigates to /kanban')

stub.state.composerAnswers = true
await click(q('.wl-sheet-foot [data-act="chat"]'))
check(stub.calls.inserted.length === 1 && stub.calls.inserted[0][1].includes(BLOCKED.id) && q('.wl-notice')?.textContent.includes('chat composer'), 'Ask in chat prefills the composer when the SDK offers it')
stub.state.composerAnswers = false
await click(q('.wl-sheet-foot [data-act="chat"]'))
check(clip.length === 1 && clip[0].includes(BLOCKED.id) && q('.wl-notice')?.textContent.includes('copied to the clipboard'), 'without a composer the prompt is copied and the page says so')
clipRejects = true
await click(q('.wl-sheet-foot [data-act="chat"]'))
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
