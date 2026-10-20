// Renders the world at fixed times and hashes the WebGL canvas pixels only (no CSS overlay), for one build mode.
// Env: PORT (8799), QS. Prints t -> sha1 of the canvas PNG.
const { app, BrowserWindow } = require('electron'); const crypto = require('crypto')
setTimeout(() => { console.log('ERR watchdog'); app.exit(2) }, 200000)
app.whenReady().then(async () => {
  const w = new BrowserWindow({ show: false, width: 1180, height: 900, useContentSize: true, paintWhenInitiallyHidden: true })
  await w.loadURL(`http://127.0.0.1:${process.env.PORT || 8799}/planet.html?view=world&rec=1&pr=1${process.env.QS || ''}&t=${Date.now()}`)
  const ev = s => w.webContents.executeJavaScript(s)
  for (let i = 0; i < 600 && !(await ev('!!window.__ready || (window.__errs||[]).length>0')); i++) await new Promise(r => setTimeout(r, 50))
  const out = []
  for (const t of [0.5, 2.5, 4.5, 6.5, 8.5, 10.5, 12.5, 16.5, 20.5, 24.5]) { const u = await ev(`(window.__seek(${t}), document.querySelector('#stage canvas').toDataURL())`); out.push(t + ':' + crypto.createHash('sha1').update(u).digest('hex').slice(0, 10)) }
  console.log('H', out.join(' ')); app.exit(0)
})
