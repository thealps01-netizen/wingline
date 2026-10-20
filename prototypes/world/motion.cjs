// Dumps the motion probe (__motion) of the descent timeline to motion.json. Env: PORT (8799).
const { app, BrowserWindow } = require('electron')
const fs = require('fs'), path = require('path'), PORT = process.env.PORT || 8799
setTimeout(() => { console.log('ERR watchdog'); app.exit(2) }, 300000)
app.whenReady().then(async () => {
  for (const f of ['motion.json', 'motion-phases.json']) fs.rmSync(path.join(__dirname, f), { force: true }) // never leave stale results behind
  const w = new BrowserWindow({ show: false, width: 1180, height: 900, useContentSize: true, paintWhenInitiallyHidden: true })
  await w.loadURL(`http://127.0.0.1:${PORT}/planet.html?view=${process.env.VIEW || 'descent'}&rec=1&t=${Date.now()}`)
  const ev = s => w.webContents.executeJavaScript(s)
  for (let i = 0; i < 240 && !(await ev('!!window.__ready || (window.__errs||[]).length>0')); i++) await new Promise(r => setTimeout(r, 500))
  const errs = await ev('JSON.stringify(window.__errs || [])'); if (errs !== '[]' || !(await ev('!!window.__ready'))) { console.log('ERR page', errs); app.exit(3); return }
  fs.writeFileSync(path.join(__dirname, 'motion-phases.json'), await ev('JSON.stringify(window.__phases)'))
  fs.writeFileSync(path.join(__dirname, process.env.OUT || 'motion.json'), await ev('__motion(0, __T.end, .01)'))
  console.log('motion ok', await ev('JSON.stringify(window.__errs)')); app.exit(0)
})
