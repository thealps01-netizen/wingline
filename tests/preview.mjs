/**
 * Wingline preview — the REAL plugin running in the app's own engine (Electron = Chromium), fed by
 * fixtures/app-real.json plus a few edge tasks, styled by the Hermes desktop app's compiled stylesheet.
 *
 * Run: cd tests && node preview.mjs && <electron> shot.cjs
 *   <electron> = $HERMES_ELECTRON, or <core>/apps/desktop/node_modules/electron/dist/electron(.exe)
 *
 * Writes .out/preview/preview-<name>.html; each page mounts the plugin with stubbed ctx.rest and
 * window.hermesDesktop.api (no Hermes call), plays one scenario (open a drawer, a note, the retry
 * dialog, the list, …) and sets window.__ready for shot.cjs. Exit 1 when the app stylesheet is missing.
 */
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { DESKTOP_APP } from './env.mjs'

const HERE_URL = new URL('.', import.meta.url)
const HERE = fileURLToPath(HERE_URL).replace(/\\/g, '/')
const OUT = `${HERE}.out/preview/`
mkdirSync(OUT, { recursive: true })
const problems = []

copyFileSync(`${HERE}node_modules/react/umd/react.production.min.js`, `${OUT}react.js`)
copyFileSync(`${HERE}node_modules/react-dom/umd/react-dom.production.min.js`, `${OUT}react-dom.js`)
writeFileSync(`${OUT}react-shim.mjs`, 'const R = window.React\nexport default R\nexport const { useEffect, useRef, useState, useMemo, useCallback } = R\n')
writeFileSync(`${OUT}jsx-shim.mjs`, `const R = window.React
const make = (type, props, key) => R.createElement(type, key === undefined ? props : { ...props, key })
export const jsx = make
export const jsxs = make
export const Fragment = R.Fragment
`)
writeFileSync(`${OUT}sdk-shim.mjs`, `const bundles = new Map()
export function registerBundles(id, b) { bundles.set(id, b) }
export function usePluginI18n(id) {
  return (key, ...args) => {
    let node = bundles.get(id)?.en
    for (const p of key.split('.')) node = node?.[p]
    return typeof node === 'function' ? node(...args) : (typeof node === 'string' ? node : key)
  }
}
export const host = { navigate: () => {} }
`)
const src = readFileSync(`${HERE}../desktop/plugin.js`, 'utf8')
  .replace("'@hermes/plugin-sdk'", "'./sdk-shim.mjs'")
  .replace("'react/jsx-runtime'", "'./jsx-shim.mjs'")
  .replace("from 'react'", "from './react-shim.mjs'")
writeFileSync(`${OUT}plugin.mjs`, src)

const REAL = JSON.parse(readFileSync(`${HERE}fixtures/app-real.json`, 'utf8'))
const now = REAL.now
const base = { board: REAL.boards[0].slug, role: 'builder', assignee: 'builder', created: now - 7200, done: null, maxrt: null, retries: null, reason: '', parents: [], children: [], usd: 0, usdKind: 'none', act: null, comments: 0, outcome: '', lens: null, labelKind: null, idx: 1, of: 2 }
const EDGE = structuredClone(REAL)
EDGE.tasks.push(
  { ...base, id: 't_run', title: 'notes-panel r1: build', pipe: 'notes-panel r1', step: 'build', lens: 'build', label: 'build', status: 'running', usd: 0.84, usdKind: 'estimated', runs: [{ s: now - 640, e: null, o: null, sum: '', err: '' }], act: { text: 'running the render tests', at: now - 25 } },
  { ...base, id: 't_time', title: 'export-report: write the CSV export', pipe: 'export-report', step: 'write the CSV export', label: 'Write the CSV export', status: 'blocked', maxrt: 3600, usd: 1.92, usdKind: 'actual', children: ['t_kid'], runs: [{ s: now - 5200, e: now - 1600, o: 'timed_out', sum: '', err: 'timed out' }], story: { cause: 'time_limit', facts: { limit: 3600, worked: 3600, kids: 1 }, asked: 'Add a CSV export to the report page.', question: '', tl: [{ ts: now - 7000, tone: 'plain', k: 'createdYou', a: [], q: '' }, { ts: now - 5200, tone: 'work', k: 'started', a: [], q: '' }, { ts: now - 1600, tone: 'warn', k: 'limitRan', a: [3600], q: '' }, { ts: now - 1600, tone: 'bad', k: 'timedOut', a: [], q: '' }] } },
  { ...base, id: 't_kid', title: 'export-report: review', pipe: 'export-report', step: 'review', label: 'Review', idx: 2, status: 'todo', parents: ['t_time'], runs: [] },
  { ...base, id: 't_ask', title: 'theme-pass: dark palette', pipe: 'theme-pass', step: 'dark palette', label: 'Dark palette', status: 'blocked', usd: 0.4, usdKind: 'actual', runs: [{ s: now - 1900, e: now - 1500, o: 'blocked', sum: '', err: '' }], story: { cause: 'asks_you', facts: { kids: 0 }, asked: 'Make the dark palette easier to read.', question: 'The accent fails contrast on cards. Lighten the accent, or darken the cards?', tl: [{ ts: now - 1900, tone: 'work', k: 'started', a: [], q: '' }, { ts: now - 1500, tone: 'you', k: 'asked', a: [], q: 'The accent fails contrast on cards. Lighten the accent, or darken the cards?' }] } }
)
writeFileSync(`${OUT}data-real.json`, JSON.stringify(REAL))
writeFileSync(`${OUT}data-edge.json`, JSON.stringify(EDGE))

const stuck = REAL.tasks.find(x => x.status === 'blocked' && x.story)?.id
const looped = REAL.tasks.find(x => / r2$/.test(x.pipe) && x.status === 'done')?.id
const FRAMES = {
  board: ['real', ''],
  'board-live': ['edge', ''],
  'drawer-stuck': ['edge', `await clickSel('[data-ids="${stuck}"] .ctitle')`],
  'drawer-loop': ['real', `await clickSel('[data-ids*="${looped}"] .ctitle'); await clickSel('.srow[data-nav="t:${looped}"]')`],
  'drawer-ask': ['edge', `await clickSel('[data-ids="t_ask"] .ctitle')`],
  'note-again': ['edge', `await clickSel('[data-ids="${stuck}"] [data-act="again"]')`],
  'check-tell': ['edge', `await clickSel('[data-ids="t_run"] [data-act="check"]'); await clickSel('[data-ids="t_run"] [data-act="tell"]')`],
  'remove-undo': ['edge', `await clickSel('[data-ids="t_ask"] [data-act="remove"]'); await clickSel('[data-ids="t_ask"] [data-act="remove"]')`],
  retry: ['edge', `await clickSel('[data-ids="t_time"] [data-act="more"]')`],
  hover: ['real', `hoverSel('.col[data-col="done"] .card'); await wait(900)`],
  list: ['edge', `key('2')`],
  inbox: ['edge', `key('3')`],
  palette: ['edge', `key('/'); await wait(80); typeSel('.pal input', 'layout')`],
  replay: ['real', `key('r'); await wait(1600)`],
  drag: ['edge', `await dragTo('[data-ids="${stuck}"] .ctitle', '.col[data-col="queued"]')`]
}

const DIST = DESKTOP_APP ? `${DESKTOP_APP.replace(/\\/g, '/')}/dist/assets` : null
function newestCss() {
  try {
    return readdirSync(DIST).filter(n => /^index-.*\.css$/.test(n)).map(n => ({ n, at: statSync(`${DIST}/${n}`).mtimeMs })).sort((a, b) => b.at - a.at)[0]?.n
  } catch (err) {
    console.warn(`app stylesheet folder unreadable: ${err.message}`)
    return undefined
  }
}
const cssName = DIST ? newestCss() : undefined
const distUrl = DIST ? pathToFileURL(DIST).href : ''
const appCss = cssName ? readFileSync(`${DIST}/${cssName}`, 'utf8').replace(/url\(\.\//g, `url(${distUrl}/`) : ''
if (!appCss) problems.push(`app stylesheet NOT FOUND in ${DIST || '(no core — set HERMES_AGENT_DIR)'}`)
writeFileSync(`${OUT}app.css`, appCss)
const DARK_SEEDS = ':root.dark { color-scheme: dark; --theme-background-seed: #0d0d0e; --theme-sidebar-seed: #0a0a0b; --theme-elevated-seed: #1b1b1d; --theme-card-seed: #161618; --theme-neutral-card: #161618; --theme-foreground: #f4f4f6; }'

for (const [name, [data, steps]] of Object.entries(FRAMES)) {
  writeFileSync(`${OUT}preview-${name}.html`, `<!doctype html>
<html class="dark" lang="en">
<head><meta charset="utf-8"><title>Wingline — ${name}</title>
<link rel="stylesheet" href="app.css">
<style>${DARK_SEEDS} html,body{margin:0;height:100%;background:var(--ui-bg-chrome)} #frame{position:fixed;inset:0}</style>
<script src="react.js"></script><script src="react-dom.js"></script>
</head>
<body><div id="frame" data-frame="${name}"></div>
<script>window.__data = ${JSON.stringify(data === 'real' ? REAL : EDGE).replace(/</g, '\\u003c')}</script>
<script type="module">
import plugin from './plugin.mjs'
import { registerBundles } from './sdk-shim.mjs'
const data = window.__data
const kept = new Map()
const reg = []
const ctx = {
  storage: { get: (k, f) => (kept.has(k) ? kept.get(k) : f), set: (k, v) => kept.set(k, v) },
  register: c => { reg.push(c); return () => {} },
  i18n: { register: b => registerBundles('wingline', b), t: k => k },
  rest: async () => structuredClone(data)
}
window.hermesDesktop = { api: async req => (req.method === 'PATCH' ? { task: { status: req.body.status } } : { ok: true }) }
plugin.register(ctx)
ReactDOM.createRoot(document.getElementById('frame')).render(reg.find(c => c.area === 'routes').render())
const wait = ms => new Promise(r => setTimeout(r, ms))
const $ = s => document.querySelector(s)
const clickSel = async s => { const n = $(s); if (!n) throw new Error('missing ' + s); n.dispatchEvent(new MouseEvent('click', { bubbles: true })); await wait(450) }
const hoverSel = s => $(s).dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
const key = k => $('.wl-app').dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }))
const typeSel = (s, v) => { const n = $(s); n.value = v; n.dispatchEvent(new Event('input', { bubbles: true })) }
const dragTo = async (from, to) => {
  const a = $(from).getBoundingClientRect()
  const b = $(to).getBoundingClientRect()
  const at = (x, y) => ({ bubbles: true, clientX: x, clientY: y, button: 0, pointerId: 1 })
  $(from).dispatchEvent(new PointerEvent('pointerdown', at(a.left + 10, a.top + 5)))
  for (let i = 1; i <= 8; i++) window.dispatchEvent(new PointerEvent('pointermove', at(a.left + 10 + ((b.left + 60 - a.left) * i) / 8, a.top + 5 + ((b.top + 120 - a.top) * i) / 8)))
  await wait(50)
  window.dispatchEvent(new PointerEvent('pointerup', at(b.left + 60, b.top + 120)))
  await wait(300)
}
await wait(700)
try {
  ${steps}
} catch (err) { console.error(String(err)) }
await wait(600)
window.__ready = true
</script>
</body>
</html>
`)
}
if (problems.length) {
  for (const p of problems) console.error(`PROBLEM  ${p}`)
  process.exit(1)
}
console.log(`preview: ${Object.keys(FRAMES).join(', ')} · style ${cssName} (${appCss.length} bytes)`)
