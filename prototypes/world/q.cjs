// One-off page query for the world view: prints the JS expression in env Q after the page is ready.
const { app, BrowserWindow } = require('electron')
setTimeout(() => app.exit(2), 200000)
app.whenReady().then(async () => {
  const w = new BrowserWindow({ show: false, width: 1180, height: 900, useContentSize: true, paintWhenInitiallyHidden: true })
  await w.loadURL(`http://127.0.0.1:${process.env.PORT || 8799}/planet.html?view=world&rec=1&t=${Date.now()}`)
  const ev = s => w.webContents.executeJavaScript(s)
  for (let i = 0; i < 240 && !(await ev('!!window.__ready || (window.__errs||[]).length>0')); i++) await new Promise(r => setTimeout(r, 500))
  console.log('Q', await ev(process.env.Q)); app.exit(0)
})
