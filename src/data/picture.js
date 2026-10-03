import logo from '../assets/logo.jpg'

const originals = {
  ...import.meta.glob('../assets/real/*.jpg', { eager: true, import: 'default' }),
  ...import.meta.glob('../assets/contact/*.{jpg,jpeg}', { eager: true, import: 'default' }),
  '../assets/logo.jpg': logo,
}
const files = import.meta.glob('../assets/optimized/*.{avif,webp}', { eager: true, query: '?url', import: 'default' })
const manifests = import.meta.glob('../assets/optimized/manifest.json', { eager: true, import: 'default' })
const manifest = Object.values(manifests)[0] ?? {}

const byUrl = new Map(Object.entries(originals).map(([path, url]) => {
  const pieces = path.split('/')
  const group = pieces.at(-2) === 'assets' ? 'logo' : pieces.at(-2)
  const stem = pieces.at(-1).replace(/\.jpe?g$/i, '')
  const data = manifest[`${group}--${stem}`]
  if (!data) return [url, null]
  const variants = data.variants.map((variant) => ({
    width: variant.width,
    avif: files[`../assets/optimized/${variant.avif}`],
    webp: files[`../assets/optimized/${variant.webp}`],
  }))
  return [url, { width: data.width, height: data.height, variants }]
}))

export function pictureData(src) {
  return byUrl.get(src) ?? null
}

export function pictureSrcSet(src, format) {
  const data = pictureData(src)
  return data?.variants.map((variant) => `${variant[format]} ${variant.width}w`).join(', ') ?? ''
}
