/**
 * Makes the world view's data file from a Kanban overview: runs the plugin's own converter (worldOf in
 * desktop/plugin.js) on it, so the prototype draws exactly what the plugin will hand it.
 *
 * Usage: node world-data.mjs <overview.json> <out.json> [board slug]
 *   overview.json: one board's overview (GET /overview?board=<slug>, or tests/make_fixture.py's output), or a
 *   { slug: overview } map, in which case the slug picks the board (default: the first).
 * Open the result with planet.html?view=world&data=<out.json>.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const [, , inPath, outPath, slug] = process.argv
if (!inPath || !outPath) {
  console.error('usage: node world-data.mjs <overview.json> <out.json> [board slug]')
  process.exit(2)
}
const here = new URL('.', import.meta.url)
// tests/.out: plugin.js imports react, which tests/node_modules has (cd tests && npm ci)
const out = new URL('../../tests/.out/', here)
mkdirSync(fileURLToPath(out), { recursive: true })
writeFileSync(new URL('sdk-stub.mjs', out), 'export const host = {}\nexport function usePluginI18n() { return k => k }\n')
const plugin = readFileSync(new URL('../../desktop/plugin.js', here), 'utf8').replace("'@hermes/plugin-sdk'", `'${new URL('sdk-stub.mjs', out).href}'`)
writeFileSync(new URL('plugin-under-data.mjs', out), plugin)
const mod = await import(new URL('plugin-under-data.mjs', out).href)
let bundles = null
mod.default.register({ i18n: { register: b => { bundles = b } }, register: () => {} })
const t = (key, ...args) => {
  let node = bundles?.en
  for (const p of key.split('.')) node = node?.[p]
  return typeof node === 'function' ? node(...args) : typeof node === 'string' ? node : key
}
let data = JSON.parse(readFileSync(inPath, 'utf8'))
if (!Array.isArray(data.boards)) data = data[slug || Object.keys(data)[0]]
if (!data) throw new Error(`no overview for board ${slug}`)
const world = mod.worldOf(data, t)
writeFileSync(outPath, JSON.stringify(world))
console.log(`${outPath}: ${world.boards.length} boards, open board ${world.region?.name}, ${world.region?.pipelines.length} pipelines`)
