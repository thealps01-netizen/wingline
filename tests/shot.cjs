/**
 * Photographs the Wingline preview pages in the REAL engine (the app's own Electron = Chromium).
 *
 * Run (from tests/): node preview.mjs && <electron> shot.cjs
 * Writes tests/shots/<name>.png at 1440×900 for every .out/preview/preview-<name>.html, and fails
 * (exit 1) on any page error or when the page scrolls sideways.
 */
const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

const DIR = path.join(__dirname, '.out', 'preview')
const SHOTS = path.join(__dirname, 'shots')
const WIDTH = 1440
const HEIGHT = 900

app.disableHardwareAcceleration()
app.on('window-all-closed', () => {})

app.whenReady().then(async () => {
  fs.mkdirSync(SHOTS, { recursive: true })
  const pages = fs.readdirSync(DIR).filter(n => /^preview-.*.html$/.test(n) && (!process.env.WL_ONLY || n.includes(process.env.WL_ONLY))).sort()
  const problems = []
  if (!pages.length) problems.push('no preview pages: run node preview.mjs first')
  for (const name of pages) {
    const win = new BrowserWindow({ width: WIDTH, height: HEIGHT, useContentSize: true, show: false, backgroundColor: '#0d0d0e' })
    win.webContents.on('console-message', e => {
      if (e.level === 'error') problems.push(`${name}: ${e.message}`)
    })
    win.webContents.on('did-fail-load', (_e, code, desc, url) => console.error(`fail-load ${code} ${desc} ${url}`))
    win.webContents.on('render-process-gone', (_e, d) => console.error(`render gone ${name} ${JSON.stringify(d)}`))
    win.webContents.on('will-navigate', (_e, url) => console.error(`will-navigate ${url}`))
    try {
      await win.loadFile(path.join(DIR, name))
    } catch (err) {
      problems.push(`${name}: did not load: ${err.message}`)
      win.destroy()
      continue
    }
    await new Promise(r => setTimeout(r, 900))
    const wide = await win.webContents.executeJavaScript('document.documentElement.scrollWidth - document.documentElement.clientWidth')
    if (wide > 0) problems.push(`${name}: the page scrolls sideways by ${wide}px`)
    const image = await win.webContents.capturePage({ x: 0, y: 0, width: WIDTH, height: HEIGHT })
    const out = path.join(SHOTS, name.replace(/^preview-/, '').replace(/\.html$/, '.png'))
    fs.writeFileSync(out, image.toPNG())
    console.log(`wrote ${path.relative(path.join(__dirname, '..'), out)}`)
    win.destroy()
  }
  for (const p of problems) console.error(`PROBLEM  ${p}`)
  app.exit(problems.length ? 1 : 0)
})
