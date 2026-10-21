/**
 * Wingline preview — the page's REAL jsdom output (real React, overview fixtures) written as static
 * HTML pages styled by the Hermes desktop app's own compiled stylesheet, for shot.cjs to photograph.
 *
 * Run: cd tests && node preview.mjs && <electron> shot.cjs
 *   <electron> = $HERMES_ELECTRON, or <core>/apps/desktop/node_modules/electron/dist/electron(.exe)
 *
 * Writes .out/preview-<name>.html for: board (real fixture), factory (real fixture), board-edge and
 * factory-edge (edge fixture: running task, XSS titles, a backend error), retry (the retry confirm).
 * Exit 1 when a raw `wingline.*` key is on screen or a frame is missing.
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { DESKTOP_APP } from './env.mjs'

const HERE_URL = new URL('.', import.meta.url)
const HERE = fileURLToPath(HERE_URL).replace(/\\/g, '/')
const OUT_REL = '.out/preview/'
const OUT = `${HERE}${OUT_REL}`
mkdirSync(OUT, { recursive: true })

writeFileSync(`${OUT}sdk-stub.mjs`, `
const bundles = new Map()
const translators = new Map()
export function registerBundles(id, b) { bundles.set(id, b) }
export function usePluginI18n(id) {
  if (!translators.has(id)) translators.set(id, (key, ...args) => {
    let node = bundles.get(id)?.en
    for (const p of key.split('.')) node = node?.[p]
    return typeof node === 'function' ? node(...args) : (typeof node === 'string' ? node : key)
  })
  return translators.get(id)
}
export const host = { navigate: () => {}, composer: { insertText: async () => false } }
export default { host }
`)
const src = readFileSync(`${HERE}../desktop/plugin.js`, 'utf8').replace(/(['"])@hermes\/plugin-sdk\1/, `'${HERE_URL.href}${OUT_REL}sdk-stub.mjs'`)
writeFileSync(`${OUT}plugin-under-test.mjs`, src)

const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true, url: 'http://localhost/' })
global.window = dom.window
global.document = dom.window.document
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true })
global.IS_REACT_ACT_ENVIRONMENT = true
window.setInterval = () => 0
window.clearInterval = () => {}

const stub = await import(`${HERE_URL.href}${OUT_REL}sdk-stub.mjs`)
const mod = await import(`${HERE_URL.href}${OUT_REL}plugin-under-test.mjs`)
const React = (await import('react')).default
const { createRoot } = await import('react-dom/client')
const { act } = React
const tick = (ms = 5) => act(() => new Promise(r => setTimeout(r, ms)))
const settle = async () => { for (let i = 0; i < 4; i++) await tick() }

const fixture = name => JSON.parse(readFileSync(`${HERE}fixtures/${name}`, 'utf8'))
const kept = new Map()
let overview = null
const registered = []
mod.default.register({
  storage: { get: (k, f) => (kept.has(k) ? kept.get(k) : f), set: (k, v) => kept.set(k, v), remove: k => kept.delete(k) },
  register: c => { registered.push(c); return () => {} },
  i18n: { register: b => stub.registerBundles('wingline', b), t: k => k },
  rest: async () => structuredClone(overview)
})
window.hermesDesktop = { api: async () => ({ ok: true }) }
const page = registered.find(c => c.area === 'routes')

const problems = []
const frames = []
async function frame(name, data, view, after) {
  overview = data
  kept.set('view', view)
  const el = document.createElement('div')
  document.body.appendChild(el)
  const root = createRoot(el)
  await act(async () => { root.render(page.render()) })
  await settle()
  if (after) await after(el)
  const raw = el.textContent.match(/wingline\.[a-z][A-Za-z.]*/g)
  if (raw) problems.push(`${name}: raw i18n keys on screen: ${raw.slice(0, 3).join(', ')}`)
  for (const opt of el.querySelectorAll('option')) opt.toggleAttribute('selected', opt.selected)
  for (const input of el.querySelectorAll('input')) input.setAttribute('value', input.value)
  frames.push({ name, html: el.innerHTML })
  await act(async () => { root.render(null) })
  el.remove()
}
const click = async el => {
  await act(async () => { el.dispatchEvent(new window.MouseEvent('click', { bubbles: true })) })
  await settle()
}

const REAL = fixture('overview-real.json')
const EDGE = fixture('overview-edge.json')
await frame('board', REAL, 'board')
await frame('factory', REAL, 'factory')
await frame('factory-drawer', REAL, 'factory', async el => click(el.querySelector('[data-pkg][data-id="t_834367bc"]')))
await frame('board-edge', EDGE, 'board')
await frame('factory-edge', EDGE, 'factory')
const KIDS = structuredClone(REAL)
KIDS.tasks.find(x => x.status === 'blocked').children = ['t_child_a', 't_child_b']
await frame('retry', KIDS, 'board', async el => click(el.querySelector('.wl-attn [data-act="retry"]')))

const DIST = DESKTOP_APP ? `${DESKTOP_APP.replace(/\\/g, '/')}/dist/assets` : null
function newestCss(pattern) {
  try {
    return readdirSync(DIST).filter(n => pattern.test(n)).map(n => ({ n, at: statSync(`${DIST}/${n}`).mtimeMs })).sort((a, b) => b.at - a.at)[0]?.n
  } catch (err) {
    console.warn(`app stylesheet folder unreadable: ${err.message}`)
    return undefined
  }
}
const cssName = DIST ? newestCss(/^index-.*\.css$/) : undefined
const appCss = cssName ? readFileSync(`${DIST}/${cssName}`, 'utf8') : ''
if (!appCss) problems.push(`app stylesheet NOT FOUND in ${DIST || '(no core — set HERMES_AGENT_DIR)'}`)
const DARK_SEEDS = ':root.dark { color-scheme: dark; --theme-background-seed: #0d0d0e; --theme-sidebar-seed: #0a0a0b; --theme-elevated-seed: #1b1b1d;'
  + ' --theme-card-seed: #161618; --theme-neutral-card: #161618; --theme-foreground: #f4f4f6; }'

for (const f of frames) {
  writeFileSync(`${OUT}preview-${f.name}.html`, `<!doctype html>
<html class="dark" lang="en">
<head><meta charset="utf-8"><title>Wingline — ${f.name}</title>
<style>${appCss}</style>
<style>${DARK_SEEDS}</style>
<style>html,body{margin:0;background:var(--ui-bg-chrome);color:var(--ui-text-primary);font-family:system-ui,'Segoe UI',sans-serif}</style>
</head>
<body><div id="frame" data-frame="${f.name}">${f.html}</div></body>
</html>
`)
}
if (problems.length) {
  for (const p of problems) console.error(`PROBLEM  ${p}`)
  process.exit(1)
}
console.log(`preview: ${frames.map(f => f.name).join(', ')} · style ${cssName} (${appCss.length} bytes)`)
process.exit(0)
