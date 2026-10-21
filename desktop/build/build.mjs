// Builds desktop/plugin.js, the one file Hermes loads, from the hand-written sources in desktop/src/:
//   src/page.js   the page (React through the Hermes plugin SDK), imports the world view from src/world.js
//   src/world.js  the Board's world view (three.js), sliced by slice.mjs so its build never freezes the app
// three.js is bundled in; '@hermes/plugin-sdk' and react stay imports, which the Hermes loader maps to its own copies.
//
// Usage (in desktop/):  npm ci            once, installs the pinned three.js, esbuild and acorn
//                       node build/build.mjs          writes plugin.js
//                       node build/build.mjs --check  exits 1 when plugin.js differs from what the sources build
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { slice } from './slice.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')
const OUT = join(ROOT, 'plugin.js')
const check = process.argv.includes('--check')

const sliceWorld = {
  name: 'slice-world',
  setup(b) {
    b.onLoad({ filter: /[\\/]src[\\/]world\.js$/ }, args => ({ contents: slice(readFileSync(args.path, 'utf8')), loader: 'js' }))
  }
}

const res = await build({
  entryPoints: [join(ROOT, 'src', 'page.js')],
  bundle: true,
  format: 'esm',
  target: 'es2022',
  minify: true,
  legalComments: 'eof',
  charset: 'utf8',
  external: ['@hermes/plugin-sdk', 'react', 'react/jsx-runtime'],
  plugins: [sliceWorld],
  write: false,
  logLevel: 'warning'
})
if (res.warnings.length) {
  console.error(`build: ${res.warnings.length} warning(s) above; fix them (a duplicate i18n key once hid a label)`)
  process.exit(1)
}
const text = res.outputFiles[0].text
if (check) {
  let old = ''
  try {
    old = readFileSync(OUT, 'utf8')
  } catch {
    old = ''
  }
  if (old !== text) {
    console.error('plugin.js is stale: run `node build/build.mjs` in desktop/ and commit the result')
    process.exit(1)
  }
  console.log(`plugin.js is up to date (${text.length} bytes)`)
} else {
  writeFileSync(OUT, text)
  console.log(`wrote plugin.js (${text.length} bytes)`)
}
