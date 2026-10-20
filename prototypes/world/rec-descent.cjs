// Records the descent timeline frame by frame in a hidden Electron window (real GPU); writes <OUT>/d####.png.
// Env: PORT (8799), PR pixel ratio (2), FPS (25), T0/T1 seconds (0 / end of timeline), OUT folder (frames).
// Also writes <OUT>/phases.json (phase boundaries read from the page) for flicker.py.
const { app, BrowserWindow } = require('electron')
const fs = require('fs'), path = require('path')
const PORT = process.env.PORT || 8799, PR = process.env.PR || 2, FPS = +(process.env.FPS || 25), T0 = +(process.env.T0 || 0), T1env = process.env.T1, OUT = path.join(__dirname, process.env.OUT || 'frames')
process.on('unhandledRejection', e => { console.log('ERR', String(e)); app.exit(1) })
setTimeout(() => { console.log('ERR watchdog'); app.exit(2) }, 1500000)
app.whenReady().then(async () => {
  fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT)
  const w = new BrowserWindow({ show: false, width: 1180, height: 900, useContentSize: true, paintWhenInitiallyHidden: true, backgroundColor: '#0b0b0c', webPreferences: { backgroundThrottling: false } })
  await w.loadURL(`http://127.0.0.1:${PORT}/planet.html?view=${process.env.VIEW || 'descent'}&rec=1&pr=${PR}&t=${Date.now()}`)
  const ev = s => w.webContents.executeJavaScript(s)
  for (let i = 0; i < 240 && !(await ev('!!window.__ready || (window.__errs||[]).length>0')); i++) await new Promise(r => setTimeout(r, 500))
  const errs = await ev('JSON.stringify(window.__errs || [])'); if (errs !== '[]' || !(await ev('!!window.__ready'))) { console.log('ERR page', errs); app.exit(3); return }
  console.log('build', await ev('JSON.stringify({ok:window.__ok,errs:window.__errs,m:window.__measures})'))
  const T1 = +(T1env || await ev('__T.end'))
  fs.writeFileSync(path.join(OUT, 'phases.json'), await ev('JSON.stringify(window.__phases)'))
  const n = Math.round((T1 - T0) * FPS) + 1
  for (let i = 0; i < n; i++) { await ev(`__seek(${(T0 + i / FPS).toFixed(4)});1`); await new Promise(r => setTimeout(r, 20)); const img = await w.webContents.capturePage(); fs.writeFileSync(path.join(OUT, `d${String(i).padStart(4, '0')}.png`), img.toPNG()) }
  console.log('frames', n, 'bench', await ev('JSON.stringify(__bench())'), 'errs', await ev('JSON.stringify(window.__errs)'))
  app.exit(0)
})
