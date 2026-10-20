// Debug renders of the world view at one time: the full frame plus variants with groups of objects hidden, to find which
// layer makes a visible artefact. Env: PORT (8799), T (seconds). Writes dbg-<variant>.png.
const { app, BrowserWindow } = require('electron')
const fs = require('fs'), path = require('path'), PORT = process.env.PORT || 8799, T = process.env.T || 3.5
setTimeout(() => { console.log('ERR watchdog'); app.exit(2) }, 300000)
app.whenReady().then(async () => {
  const w = new BrowserWindow({ show: false, width: 1180, height: 900, useContentSize: true, paintWhenInitiallyHidden: true })
  await w.loadURL(`http://127.0.0.1:${PORT}/planet.html?view=world&rec=1&pr=1&t=${Date.now()}`)
  const ev = s => w.webContents.executeJavaScript(s)
  for (let i = 0; i < 240 && !(await ev('!!window.__ready || (window.__errs||[]).length>0')); i++) await new Promise(r => setTimeout(r, 500))
  const errs = await ev('JSON.stringify(window.__errs || [])'); if (errs !== '[]' || !(await ev('!!window.__ready'))) { console.log('ERR page', errs); app.exit(3); return }
  // classify scene children: region lines (zone<0), planet lines (zone>0 or plain), fills (Mesh)
  const variants = { full: 'o => true', noFill: "o => !o.isMesh", onlyRegion: "o => o.isMesh || (o.material.uniforms && o.material.uniforms.zone && o.material.uniforms.zone.value < 0)", onlyPlanet: "o => o.isMesh || !(o.material.uniforms && o.material.uniforms.zone && o.material.uniforms.zone.value < 0)" }
  for (const [k, f] of Object.entries(variants)) {
    await ev(`(() => { const f = ${f}; window.__dbgScene = window.__dbgScene || document.querySelector('canvas'); for (const o of window.__worldScene.children) if (!o.isGroup) o.visible = f(o); __seek(${T}); })()`)
    await new Promise(r => setTimeout(r, 200))
    const img = await w.webContents.capturePage(); fs.writeFileSync(path.join(__dirname, `dbg-${k}.png`), img.toPNG())
  }
  console.log('dbg ok', await ev(`JSON.stringify(window.__worldScene.children.filter(o => !o.isGroup).map(o => [o.type, o.material.type, o.material.uniforms && o.material.uniforms.zone ? o.material.uniforms.zone.value : null, o.material.uniforms && o.material.uniforms.feat ? +o.material.uniforms.feat.value.toFixed(3) : null, o.material.opacity ?? (o.material.uniforms && o.material.uniforms.opacity.value), o.geometry.attributes.position.count]))`))
  app.exit(0)
})
