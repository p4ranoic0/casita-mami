import { readdir, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { join, basename } from 'node:path'
import sharp from 'sharp'

const output = 'src/assets/optimized'
const inputs = [
  ...(await readdir('src/assets/real')).filter((name) => /\.jpe?g$/i.test(name)).map((name) => ['real', `src/assets/real/${name}`]),
  ...(await readdir('src/assets/contact')).filter((name) => /\.jpe?g$/i.test(name)).map((name) => ['contact', `src/assets/contact/${name}`]),
  ['logo', 'src/assets/logo.jpg'],
]
await mkdir(output, { recursive: true })

const manifest = {}
for (const [group, input] of inputs) {
  const source = await stat(input)
  const metadata = await sharp(input).metadata()
  const rotated = metadata.orientation >= 5 && metadata.orientation <= 8
  const width = rotated ? metadata.height : metadata.width
  const height = rotated ? metadata.width : metadata.height
  const key = `${group}--${basename(input).replace(/\.jpe?g$/i, '')}`
  const widths = [...new Set([480, 800, 1200].map((value) => Math.min(value, width)))].sort((a, b) => a - b)
  const variants = []
  for (const size of widths) {
    const files = { width: size }
    for (const format of ['avif', 'webp']) {
      const filename = `${key}-${size}.${format}`
      const destination = join(output, filename)
      const previous = await stat(destination).catch(() => null)
      if (!previous || previous.mtimeMs < source.mtimeMs) {
        const pipeline = sharp(input).rotate().resize({ width: size, withoutEnlargement: true })
        if (format === 'avif') await pipeline.avif({ quality: 48, effort: 3 }).toFile(destination)
        else await pipeline.webp({ quality: 72, effort: 4 }).toFile(destination)
      }
      files[format] = filename
    }
    variants.push(files)
  }
  manifest[key] = { width, height, variants }
}

const path = join(output, 'manifest.json')
const content = JSON.stringify(manifest, null, 2) + '\n'
if (await readFile(path, 'utf8').catch(() => '') !== content) await writeFile(path, content)
console.log(`Imágenes optimizadas: ${inputs.length} originales`)
