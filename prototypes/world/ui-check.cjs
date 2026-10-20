// Loads the world view as a user would (no rec) and captures the page at fixed moments of the build, then after it.
// Prints the app state at each shot. Env: PORT (8799), QS (extra query), SW=1 (software rendering via SwiftShader),
// OUT (shot prefix, default ui), VISIBLE=1 (see below).
const { app, BrowserWindow } = require('electron')
if (process.env.SW) { app.commandLine.appendSwitch('use-angle', 'swiftshader'); app.commandLine.appendSwitch('enable-unsafe-swiftshader') }
const PORT = process.env.PORT || 8799, QS = process.env.QS || '', OUT = process.env.OUT || 'ui'
setTimeout(() => { console.log('ERR watchdog'); app.exit(2) }, 120000)
app.whenReady().then(async () => {
  // VISIBLE=1: a real shown window, placed off-screen (hidden windows are throttled to ~1 frame per second)
  const w = new BrowserWindow(process.env.VISIBLE ? { show: true, x: -4000, y: 0, skipTaskbar: true, focusable: false, width: 1180, height: 900, useContentSize: true, webPreferences: { backgroundThrottling: false } } : { show: false, width: 1180, height: 900, useContentSize: true, paintWhenInitiallyHidden: true, webPreferences: { backgroundThrottling: false } })
  const t0 = Date.now()
  w.loadURL(`http://127.0.0.1:${PORT}/planet.html?view=world&pr=1${QS}&t=${Date.now()}`)
  const ev = s => w.webContents.executeJavaScript(s).catch(e => 'ERR ' + e.message)
  const state = () => ev(`JSON.stringify({ cls: document.getElementById('app')?.className, ready: !!window.__ready, fallback: window.__fallback || null, fps: window.__fps || null, vis: document.visibilityState, build: window.__build && { done: window.__build.done, ms: window.__build.ms, slices: window.__build.slices }, errs: window.__errs })`)
  for (const at of [400, 1500, 2800]) {
    while (Date.now() - t0 < at) await new Promise(r => setTimeout(r, 20))
    const img = await w.webContents.capturePage(); require('fs').writeFileSync(`${OUT}-${at}.png`, img.toPNG())
    console.log('S', at, await state())
  }
  for (let i = 0; i < 300 && !(await ev('!!window.__ready || !!window.__fallback || (window.__errs||[]).length>0')); i++) await new Promise(r => setTimeout(r, 50))
  await new Promise(r => setTimeout(r, 2500))
  const img = await w.webContents.capturePage(); require('fs').writeFileSync(`${OUT}-after.png`, img.toPNG())
  console.log('S after', await state())
  app.exit(0)
})
