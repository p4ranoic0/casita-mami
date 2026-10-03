import { spawnSync } from 'node:child_process'
import { rm } from 'node:fs/promises'

const vite = 'node_modules/vite/bin/vite.js'
const baseArgs = process.argv.slice(2)

function run(args) {
  const result = spawnSync(process.execPath, [vite, ...args], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Vite terminó con código ${result.status}`)
}

const images = spawnSync(process.execPath, ['scripts/images.mjs'], { stdio: 'inherit' })
if (images.error) throw images.error
if (images.status !== 0) throw new Error(`Imágenes terminaron con código ${images.status}`)

run(['build', ...baseArgs])
try {
  run(['build', '--ssr', 'src/entry-server.jsx', '--outDir', 'dist-ssr', ...baseArgs])
  const result = spawnSync(process.execPath, ['scripts/prerender.mjs'], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Prerender terminó con código ${result.status}`)
} finally {
  await rm('dist-ssr', { recursive: true, force: true })
}
