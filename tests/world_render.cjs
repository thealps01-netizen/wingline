// Wingline: the Board's world view, rendered for real (WebGL in Electron) from the built desktop/plugin.js.
//
// Run (repo root):  "<electron>" tests/world_render.cjs [overview.json]
//   electron: the binary inside the Hermes desktop install (prototypes/world/env.sh finds it) or ELECTRON.
//   overview.json: one /overview response, or {slug: overview}; default tests/fixtures/world-real.json.
//   OUT=<dir> also writes a screenshot of every step there.
//
// Checks, each printed PASS / FAIL (exit 1 on any FAIL):
//   1. the world builds without a page error and without a main-thread task over 50 ms (slices of 12 ms)
//   2. region: one clickable label per pipeline; site: one per task shown plus the gate; planet: one per labelled board
//   3. clicking the open pipeline flies down to its site with no frame later than 50 ms; a task label reports ('task', id); "◂ back" flies up twice
//   4. clicking another pipeline rebuilds the site for it in the background and flies down to it
//   5. an update that only changes HUD numbers redraws no scene; one task changing state rebuilds once, and the
//      camera stays where it was (the swap is not a cut: under 3% of the frame changes besides that place)
//   6. opening another board turns the planet to it and flies down to its region
const { app, BrowserWindow } = require('electron')
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const OVERVIEW = path.resolve(process.argv.find((a, i) => i > 1 && a.endsWith('.json')) || path.join(__dirname, 'fixtures', 'world-real.json'))
const OUT = process.env.OUT || ''
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' }
let failed = 0
const check = (ok, msg) => { if (!ok) failed++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`) }
const sleep = ms => new Promise(r => setTimeout(r, ms))
setTimeout(() => { console.log('FAIL  watchdog: the run took over 6 minutes'); app.exit(2) }, 360000)
app.on('window-all-closed', () => {})
// the window sits off screen; without these Windows reports it occluded and Chromium drops it to one frame a second
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion')
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows')
app.commandLine.appendSwitch('disable-renderer-backgrounding')

const server = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const file = u === '/overview.json' ? OVERVIEW : path.join(ROOT, u)
  if (!file.startsWith(ROOT) && file !== OVERVIEW) { res.writeHead(403); res.end(); return }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); res.end(); return }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' })
    res.end(buf)
  })
})

app.whenReady().then(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r))
  const port = server.address().port
  const w = new BrowserWindow({ show: true, x: -3000, y: 0, width: 1180, height: 900, useContentSize: true, webPreferences: { backgroundThrottling: false } })
  const ev = s => w.webContents.executeJavaScript(s)
  const shot = async name => { if (!OUT) return; fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, `${name}.png`), (await w.webContents.capturePage()).toPNG()) }
  const until = async (expr, ms = 30000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(`!!(${expr})`)) return true; await sleep(100) } return false }
  const errs = () => ev('window.__errs')
  const labels = ph => ev(`[...document.querySelectorAll('.wlw .layer[data-kind="${ph}"] .tg')].map(e => e.dataset.id)`)
  const onLayer = () => ev(`[...document.querySelectorAll('.wlw .layer.on[data-kind]')].map(e => e.dataset.kind)[0] || null`)
  const click = (kind, id) => ev(`(() => { const e = [...document.querySelectorAll('.wlw .layer[data-kind="${kind}"] .tg')].find(x => x.dataset.id === ${JSON.stringify(id)}); if (!e) return false; e.click(); return true })()`)
  const back = () => ev(`(() => { const e = document.querySelector('.wlw .layer.on [data-nav]'); if (!e) return false; e.click(); return true })()`)
  const settle = async kind => { const ok = await until(`[...document.querySelectorAll('.wlw .layer.on[data-kind]')].some(e => e.dataset.kind === '${kind}' && !e.classList.contains('dim') && +e.style.opacity > .99)`, 20000); await sleep(300); return ok }
  const pixels = async () => { const img = await w.webContents.capturePage(); return { size: img.getSize(), buf: img.toBitmap() } }
  const diff = (a, b) => { let n = 0; for (let i = 0; i < a.buf.length; i += 4) if (Math.abs(a.buf[i] - b.buf[i]) + Math.abs(a.buf[i + 1] - b.buf[i + 1]) + Math.abs(a.buf[i + 2] - b.buf[i + 2]) > 72) n++; return n / (a.buf.length / 4) }

  await w.loadURL(`http://127.0.0.1:${port}/tests/world_render.html?overview=/overview.json`)
  const built = await until('window.__harness && (window.__harness.swaps.length || window.__harness.fallback) || window.__errs.length', 60000)
  const H0 = await ev('({ swaps: __harness.swaps, fallback: __harness.fallback, longtasks: __harness.longtasks, data: { pipes: __harness.data.region.pipelines.map(p => [p.key, p.units.length + (p.gate ? 1 : 0)]), boards: __harness.data.boards.filter(b => b.labeled).map(b => b.slug), focus: __harness.data.region.pipelines[0].key } })')
  check(built && !H0.fallback && H0.swaps.length === 1, `the world builds (${H0.swaps[0]?.ms} ms to the first frame${H0.fallback ? `; fallback: ${H0.fallback}` : ''})`)
  if (!built || H0.fallback) { console.log('errors', JSON.stringify(await errs())); app.exit(1); return }
  await settle('pipe')
  await shot('1-region')
  check((await errs()).length === 0, `no page error while building (${(await errs()).slice(0, 2).join(' | ')})`)
  console.log('info  slices over 30 ms [paused at line, next pause line, ms]:', JSON.stringify(H0.swaps[0].slow), 'first frame over 30 ms:', JSON.stringify(await ev('__harness.slowFrames')))
  check(H0.longtasks.every(x => x <= 50), `no main-thread task over 50 ms while building (longest ${Math.max(0, ...H0.longtasks)} ms of ${H0.longtasks.length} over 50 ms reported)`)
  const reg = await labels('pipe')
  check(reg.length === H0.data.pipes.length && H0.data.pipes.every(([k]) => reg.includes(k)), `region: a label per pipeline (${reg.length}/${H0.data.pipes.length})`)

  const focus = H0.swaps[0].focus
  await ev(`window.__gap = []; window.__gapOn = true; (() => { let p = 0; const f = n => { if (p) __gap.push(n - p); p = n; if (window.__gapOn) requestAnimationFrame(f) }; requestAnimationFrame(f) })()`)
  check(await click('pipe', focus), `the focus pipeline's label is clickable (${focus})`)
  check(await settle('task'), 'clicking it flies down to its site')
  const gaps = await ev('(window.__gapOn = false, __gap)')
  const worst = Math.max(...gaps), med = [...gaps].sort((a, b) => a - b)[gaps.length >> 1]
  check(gaps.length > 60 && worst < 50, `the flight down draws every frame on time (${gaps.length} frames, median ${med.toFixed(1)} ms, worst ${worst.toFixed(1)} ms)`)
  await shot('2-site')
  const site = await labels('task')
  const want = H0.data.pipes.find(([k]) => k === focus)[1]
  check(site.length === want, `site: a label per task shown plus the gate (${site.length}/${want})`)
  await click('task', site[0])
  check(JSON.stringify(await ev('__harness.picks')) === JSON.stringify([['task', site[0]]]), `a task label reports ('task', ${site[0]})`)
  check(await back() && await settle('pipe'), '◂ back flies up to the region')
  check(await back() && await settle('board'), '◂ back again flies up to the planet')
  await shot('3-planet')
  const pl = await labels('board')
  check(pl.length === H0.data.boards.length, `planet: a label per labelled board (${pl.length}/${H0.data.boards.length})`)
  check(await click('board', H0.swaps[0].board) && await settle('pipe'), 'clicking the open board flies down to its region')

  const other = H0.data.pipes.map(p => p[0]).find(k => k !== focus)
  if (other) {
    const n0 = (await ev('__harness.swaps')).length
    const lt0 = (await ev('__harness.longtasks')).length
    const t0 = Date.now()
    await click('pipe', other)
    const ok = await until(`__harness.swaps.length > ${n0}`, 30000)
    const ms = Date.now() - t0
    check(ok && (await ev('__harness.swaps.at(-1).focus')) === other, `clicking another pipeline rebuilds its site in the background (${ms} ms)`)
    check(await settle('task'), 'and flies down to it')
    await shot('4-other-site')
    const lt = (await ev('__harness.longtasks')).slice(lt0)
    check(lt.every(x => x <= 50), `no main-thread task over 50 ms during that rebuild (${lt.join(', ') || 'none'})`)
    check(await back() && await settle('pipe'), 'and back up to the region')
  } else console.log('info  only one pipeline: the other-site step is not drawn')

  const n1 = (await ev('__harness.swaps')).length
  await ev(`(() => { const d = structuredClone(__harness.data); d.region.chrome.tl[2][1] = '$999.99'; d.planet.tr[0][1] = '77'; __harness.api.update(d) })()`)
  await sleep(1500)
  check((await ev('__harness.swaps')).length === n1, 'an update with new HUD numbers only redraws no scene')
  check(await ev(`document.querySelector('.wlw .layer.on .tel.l').textContent.includes('$999.99')`), 'and the HUD shows the new number in place')
  const before = await pixels()
  const changed = await ev(`(() => {
    const ov = structuredClone(__harness.overviews[Object.keys(__harness.overviews)[0]])
    const done = ov.tasks.find(x => x.status === 'done')
    if (!done) return null
    done.status = 'running'
    __harness.api.update(__harness.worldOf(ov, __harness.t, null))
    return done.id
  })()`)
  if (changed) {
    const ok = await until(`__harness.swaps.length > ${n1}`, 30000)
    await sleep(800)
    const after = await pixels()
    const d = diff(before, after)
    check(ok, `one task turning running rebuilds the scene once (${changed})`)
    check(d < 0.03, `the camera stays put across the swap (${(d * 100).toFixed(2)}% of pixels changed)`)
    await shot('5-after-update')
  }

  const boards = await ev('__harness.data.boards.map(b => b.slug)')
  const next = boards.find(s => s !== H0.swaps[0].board)
  if (next) {
    const n2 = (await ev('__harness.swaps')).length
    await ev(`(() => { const ov = structuredClone(__harness.overviews[Object.keys(__harness.overviews)[0]]); ov.board = ${JSON.stringify(next)}; __harness.api.update(__harness.worldOf(ov, __harness.t, null)) })()`)
    const ok = await until(`__harness.swaps.length > ${n2} && __harness.swaps.at(-1).board === ${JSON.stringify(next)}`, 40000)
    check(ok, `opening another board rebuilds the world around it (${next})`)
    check(await settle('pipe'), 'and the camera turns the planet and flies down to its region')
    await shot('6-other-board')
  }
  check((await errs()).length === 0, `no page error in the whole run (${(await errs()).slice(0, 3).join(' | ')})`)
  const lt1 = (await ev('__harness.longtasks')).length
  await ev('(() => { const t = performance.now(); while (performance.now() - t < 120); })()')
  await sleep(500)
  const ctl = (await ev('__harness.longtasks')).slice(lt1)
  check(ctl.some(x => x >= 100), `positive control: the long-task probe sees a 120 ms busy loop (${ctl.join(', ') || 'nothing'})`)
  console.log(failed ? `\n${failed} world render check(s) FAILED` : '\nall world render checks passed')
  app.exit(failed ? 1 : 0)
})
