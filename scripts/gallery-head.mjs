import { readdir, readFile, writeFile } from 'node:fs/promises'

const folder = 'dist-galeria/assets'
const files = await readdir(folder)
const fonts = ['nunito-latin-wght-normal-', 'fredoka-latin-wght-normal-']
const tags = fonts.map((prefix) => {
  const file = files.find((name) => name.startsWith(prefix) && name.endsWith('.woff2'))
  if (!file) throw new Error(`Falta la fuente ${prefix} en ${folder}`)
  return `<link rel="preload" as="font" type="font/woff2" href="/galeria/assets/${file}" crossorigin="anonymous" />`
})
const path = 'dist-galeria/index.html'
const html = await readFile(path, 'utf8')
await writeFile(path, html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`))
