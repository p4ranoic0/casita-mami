import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const { render, SEO, socialImage, localBusinessData, pictureSrcSet, criticalFonts } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const template = await readFile('dist/index.html', 'utf8')

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}

function meta(attribute, name, content) {
  return `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`
}

for (const [pathname, seo] of Object.entries(SEO)) {
  const tags = [
    `<link rel="preload" as="image" type="image/avif" imagesrcset="${escapeHtml(pictureSrcSet(seo.lcpImage, 'avif'))}" imagesizes="${escapeHtml(seo.lcpSizes)}" fetchpriority="high" />`,
    ...criticalFonts.map((url) => `<link rel="preload" as="font" type="font/woff2" href="${escapeHtml(url)}" crossorigin="anonymous" />`),
    '<meta name="robots" content="index, follow" />',
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    ...Object.entries({
      'og:type': 'website',
      'og:site_name': 'La Casita de Mami',
      'og:title': seo.title,
      'og:description': seo.description,
      'og:url': seo.canonical,
      'og:image': socialImage,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:locale': 'es_PE',
    }).map(([key, value]) => meta('property', key, value)),
    ...Object.entries({
      'twitter:card': 'summary_large_image',
      'twitter:title': seo.title,
      'twitter:description': seo.description,
      'twitter:image': socialImage,
    }).map(([key, value]) => meta('name', key, value)),
  ]
  if (pathname === '/') {
    const json = JSON.stringify(localBusinessData()).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${render(pathname)}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, meta('name', 'description', seo.description))
    .replace('<!-- SEO_HEAD -->', tags.join('\n    '))

  const destination = pathname === '/' ? 'dist/index.html' : `dist${pathname}/index.html`
  await mkdir(resolve(destination, '..'), { recursive: true })
  await writeFile(destination, html)
  console.log(`Prerender: ${pathname} → ${destination}`)
}

function lastModified(file) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim() || new Date().toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

const sitemapRoutes = [
  [SEO['/'].canonical, 'src/pages/Home.jsx'],
  [SEO['/servicios'].canonical, 'src/pages/Servicios.jsx'],
  [SEO['/contacto'].canonical, 'src/pages/Contacto.jsx'],
  ['https://lacasitademami.edu.pe/galeria/', 'galeria/src/pages/Portada.jsx'],
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes
  .map(([url, file]) => `  <url><loc>${escapeHtml(url)}</loc><lastmod>${lastModified(file)}</lastmod></url>`)
  .join('\n')}\n</urlset>\n`
await writeFile('dist/sitemap.xml', sitemap)
