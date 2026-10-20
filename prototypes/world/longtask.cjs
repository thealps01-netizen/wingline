// Freeze check: loads the world view as a user would (no rec), in a visible-size hidden Electron window, and records
// every main-thread task longer than 50 ms (the browser's "long task" threshold) from page start until 2 s after the
// world is ready, plus the gaps between animation frames during the build (a gap is how long the page could not paint).
// Prints one JSON line. Env: PORT (8799), QS (extra query string), RUNS (1).
const { app, BrowserWindow } = require('electron')
const PORT = process.env.PORT || 8799, QS = process.env.QS || '', RUNS = +(process.env.RUNS || 1)
setTimeout(() => { console.log('ERR watchdog'); app.exit(2) }, 240000)
app.on('window-all-closed', () => {})
const PROBE = `(() => {
  window.__lt = []; window.__probeFrames = { t: [], last: 0 };
  new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: true });
  const tick = now => { const G = window.__probeFrames; if (G.last) G.t.push([Math.round(now), +(now - G.last).toFixed(1)]); G.last = now; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
})()`
app.whenReady().then(async () => {
  for (let r = 0; r < RUNS; r++) {
    const w = new BrowserWindow({ show: false, width: 1180, height: 900, useContentSize: true, paintWhenInitiallyHidden: true, webPreferences: { backgroundThrottling: false } })
    await w.loadURL('about:blank')
    const d = w.webContents.debugger; d.attach('1.3')
    await d.sendCommand('Page.enable'); await d.sendCommand('Page.addScriptToEvaluateOnNewDocument', { source: PROBE })
    await w.loadURL(`http://127.0.0.1:${PORT}/planet.html?view=world&pr=1${QS}&t=${Date.now()}`)
    const ev = s => w.webContents.executeJavaScript(s)
    for (let i = 0; i < 600 && !(await ev('!!window.__ready || (window.__errs||[]).length>0')); i++) await new Promise(r => setTimeout(r, 50))
    await new Promise(r => setTimeout(r, 2000))
    const o = JSON.parse(await ev(`JSON.stringify({ errs: window.__errs, lt: window.__lt, build: window.__build || null, readyAt: Math.round(window.__readyAt || 0), gaps: window.__probeFrames.t })`))
    if (o.errs.length) { console.log('ERR page', JSON.stringify(o.errs)); app.exit(3); return }
    const g = o.gaps.map(x => x[1]).sort((a, b) => a - b)
    console.log('LT', JSON.stringify({ longest: Math.max(0, ...o.lt.map(x => x[1])), over50: o.lt.length, tasks: o.lt.slice(0, 12), build: o.build, frames: g.length, gapMax: g[g.length - 1], gapP99: g[Math.floor(g.length * .99)], gapsOver50: g.filter(x => x > 50).length }))
    w.destroy()
  }
  app.exit(0)
})
