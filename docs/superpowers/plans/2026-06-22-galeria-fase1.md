# Galería pública (Fase 1) — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar una galería pública vistosa en `lacasitademami.edu.pe/galeria` (ruta del dominio principal, **sin subdominio**) con 5 álbumes, portada animada, lightbox, y descarga individual y por álbum (ZIP).

**Architecture:** App React+Vite independiente en la carpeta `galeria/` del mismo repo, que reusa `node_modules` y la marca del sitio. Se compila con `base: '/galeria/'` y se sirve desde `public_html/galeria/` (mismo origen que el sitio, sin CORS, sin crear subdominio). Las rutas de imágenes/manifest/descarga son **base-aware** vía `import.meta.env.BASE_URL`. Lee un `manifest.json` (en Fase 1, escrito a mano + media de muestra). El motion lo da Framer Motion (ya es dependencia). La descarga del álbum la sirve un único endpoint PHP (`download-album.php`) bajo `/galeria`. Build y deploy propios; los datos (`manifest.json`, `media/`) se separan del código para que un futuro `--delete` no los borre.

**Tech Stack:** React 18, React Router 6, Vite 6, Tailwind CSS 3, Framer Motion 12, Vitest (nuevo, para helpers puros), PHP 8.3 + ZipArchive (endpoint de descarga).

**Spec de referencia:** [`docs/superpowers/specs/2026-06-22-galeria-subdomain-design.md`](../specs/2026-06-22-galeria-subdomain-design.md)

---

## Estructura de archivos (Fase 1)

```
vite.galeria.config.js              # config Vite de la galería (root: galeria, base: /galeria/)
vitest.config.js                    # config de tests (helpers puros)
package.json                        # MODIFICAR: scripts dev:galeria, build:galeria, test
deploy-galeria.sh                   # NUEVO: deploy de /galeria (excluye datos)
deploy.sh                           # MODIFICAR: excluir admin/ api/ galeria/
# NOTA: NO se toca el tailwind.config.js raíz (tiene WIP del usuario). La galería
# usa su propia config de Tailwind/PostCSS que hereda el tema raíz vía presets.

galeria/
  tailwind.config.js                # config Tailwind propia (presets: [raíz] + content galeria)
  postcss.config.js                 # PostCSS propio que apunta a galeria/tailwind.config.js
  index.html                        # entry HTML (fuentes de marca)
  src/
    main.jsx                        # root React + BrowserRouter
    App.jsx                         # rutas / y /:slug
    lib/
      gallery.js                    # helpers puros (TESTED): incl. assetUrl/albumDownloadUrl(base,...)
      gallery.test.js               # tests Vitest
      paths.js                      # adaptador base-aware (import.meta.env.BASE_URL)
      useManifest.js                # hook: fetch BASE_URL + manifest.json
    motion/
      variants.js                   # variants de Framer Motion
    components/
      Header.jsx  Footer.jsx
      AlbumCard.jsx
      PhotoGrid.jsx
      Lightbox.jsx
      DownloadButtons.jsx
      MoreAlbums.jsx
      Skeleton.jsx
    pages/
      Portada.jsx
      Album.jsx
    styles/
      index.css                     # @tailwind + keyframes de la galería
  public/
    manifest.json                   # SEED: 5 álbumes (Fase 1)
    .htaccess                       # routing SPA (RewriteBase /galeria/)
    404.html                        # fallback SPA
    download-album.php              # endpoint ZIP
    media/<slug>/{thumb,web,orig}/  # SEED: fotos de muestra
```

---

## Task 0: Scaffold de la app `galeria/`

**Files:**
- Create: `vite.galeria.config.js`
- Create: `galeria/index.html`
- Create: `galeria/src/main.jsx`
- Create: `galeria/src/App.jsx`
- Create: `galeria/src/styles/index.css`
- Create: `galeria/tailwind.config.js`
- Create: `galeria/postcss.config.js`
- Modify: `package.json` (scripts)
- **NO** modificar `tailwind.config.js` raíz (tiene WIP del usuario)

- [ ] **Step 1: Crear `vite.galeria.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build independiente de la galería. root apunta a galeria/, base '/galeria/'
// porque la app se sirve en lacasitademami.edu.pe/galeria (ruta, no subdominio).
export default defineConfig({
  plugins: [react()],
  root: 'galeria',
  base: '/galeria/',
  build: {
    outDir: '../dist-galeria',
    emptyOutDir: true,
  },
})
```

- [ ] **Step 2: Crear `galeria/index.html`**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="%BASE_URL%favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Galería de fotos de La Casita de Mami — revive cada momento de nuestros eventos." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <title>Galería · La Casita de Mami</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Crear `galeria/src/styles/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }
body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #f5fdff;
  color: #0d2d3a;
}

/* Keyframes propios de la galería (no tocan el config compartido de Tailwind) */
@keyframes shimmer {
  0% { background-position: -800px 0; }
  100% { background-position: 800px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #e0f6fc 25%, #d6f0fa 37%, #e0f6fc 63%);
  background-size: 800px 100%;
  animation: shimmer 1.4s linear infinite;
}

@keyframes title-sweep {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.title-gradient {
  background: linear-gradient(90deg, #25c1e9, #7dcfeb, #e8ff52, #25c1e9);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: title-sweep 6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton, .title-gradient { animation: none; }
}
```

- [ ] **Step 4: Crear `galeria/src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] **Step 5: Crear `galeria/src/App.jsx` (placeholder mínimo para verificar el scaffold)**

```jsx
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="p-8 text-3xl font-display">Galería OK</h1>} />
    </Routes>
  )
}

export default App
```

- [ ] **Step 6: Crear config propia de Tailwind/PostCSS para la galería**

> ⚠ El `tailwind.config.js` raíz tiene cambios sin commitear del usuario. **No lo toques.**
> La galería usa su propia config que **hereda el tema raíz** vía `presets` (DRY: mismos
> colores, fuentes, sombras) y define su propio `content`. Tailwind resuelve los globs de
> `content` relativos al **cwd** (raíz del repo, donde corre npm), por eso van como `./galeria/...`.

Crear `galeria/tailwind.config.js`:

```js
import root from '../tailwind.config.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [root],
  content: [
    './galeria/index.html',
    './galeria/src/**/*.{js,jsx}',
  ],
}
```

Crear `galeria/postcss.config.js` (Vite lo toma porque `root: 'galeria'`):

```js
export default {
  plugins: {
    tailwindcss: { config: './galeria/tailwind.config.js' },
    autoprefixer: {},
  },
}
```

- [ ] **Step 7: Modificar `package.json` — añadir scripts**

Dentro de `"scripts"`, añadir:

```json
    "dev:galeria": "vite --config vite.galeria.config.js",
    "build:galeria": "vite build --config vite.galeria.config.js",
    "test": "vitest run --config vitest.config.js"
```

- [ ] **Step 8: Verificar el dev server**

Run: `npm run dev:galeria`
Expected: Vite arranca y sirve bajo `/galeria/` (p. ej. `http://localhost:5173/galeria/`); al abrir esa URL se ve "Galería OK". Cortar con Ctrl-C.

- [ ] **Step 9: Verificar el build**

Run: `npm run build:galeria`
Expected: build exitoso, se genera `dist-galeria/index.html` y `dist-galeria/assets/`.

- [ ] **Step 10: Commit**

```bash
git add vite.galeria.config.js galeria/index.html galeria/src/main.jsx galeria/src/App.jsx galeria/src/styles/index.css galeria/tailwind.config.js galeria/postcss.config.js package.json
git commit -m "feat(galeria): scaffold de la app de galería (Vite + React + Tailwind)"
```

---

## Task 1: Helpers puros + Vitest (TDD)

**Files:**
- Create: `vitest.config.js`
- Create: `galeria/src/lib/gallery.js`
- Create: `galeria/src/lib/paths.js`
- Test: `galeria/src/lib/gallery.test.js`
- Modify: `package.json` (añadir devDependency `vitest`)

- [ ] **Step 1: Instalar Vitest**

Run: `npm install -D vitest`
Expected: vitest queda en `devDependencies`.

- [ ] **Step 2: Crear `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['galeria/src/**/*.test.js'],
  },
})
```

- [ ] **Step 3: Escribir el test que falla — `galeria/src/lib/gallery.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { getAlbumBySlug, albumDownloadUrl, assetUrl, isAlbumEmpty, photoCount } from './gallery.js'

const manifest = {
  albums: [
    { slug: 'pascua', title: 'Pascua', photos: [{ web: 'a.jpg', orig: 'a.jpg', thumb: 'a.jpg' }] },
    { slug: 'dia-del-padre', title: 'Día del Padre', photos: [] },
  ],
}

describe('getAlbumBySlug', () => {
  it('devuelve el álbum por su slug', () => {
    expect(getAlbumBySlug(manifest, 'pascua').title).toBe('Pascua')
  })
  it('devuelve null si no existe', () => {
    expect(getAlbumBySlug(manifest, 'no-existe')).toBeNull()
  })
  it('tolera manifest vacío/indefinido', () => {
    expect(getAlbumBySlug(null, 'pascua')).toBeNull()
    expect(getAlbumBySlug({}, 'pascua')).toBeNull()
  })
})

describe('albumDownloadUrl', () => {
  it('construye la URL del endpoint ZIP respetando el base', () => {
    expect(albumDownloadUrl('/galeria/', 'dia-del-padre')).toBe('/galeria/download-album.php?album=dia-del-padre')
  })
})

describe('assetUrl', () => {
  it('antepone el base y normaliza la barra inicial', () => {
    expect(assetUrl('/galeria/', 'media/pascua/web/01.jpeg')).toBe('/galeria/media/pascua/web/01.jpeg')
    expect(assetUrl('/galeria/', '/media/pascua/web/01.jpeg')).toBe('/galeria/media/pascua/web/01.jpeg')
  })
})

describe('isAlbumEmpty / photoCount', () => {
  it('detecta álbum vacío', () => {
    expect(isAlbumEmpty({ photos: [] })).toBe(true)
    expect(isAlbumEmpty({ photos: [{ web: 'a' }] })).toBe(false)
    expect(isAlbumEmpty({})).toBe(true)
  })
  it('cuenta fotos', () => {
    expect(photoCount({ photos: [{}, {}] })).toBe(2)
    expect(photoCount({})).toBe(0)
  })
})
```

- [ ] **Step 4: Correr el test y verificar que falla**

Run: `npm test`
Expected: FAIL — "Failed to resolve import './gallery.js'" o "getAlbumBySlug is not a function".

- [ ] **Step 5: Implementar `galeria/src/lib/gallery.js`**

```js
// Helpers puros para la galería. Sin dependencias de React ni del DOM.

export function getAlbumBySlug(manifest, slug) {
  const albums = manifest?.albums
  if (!Array.isArray(albums)) return null
  return albums.find((a) => a.slug === slug) ?? null
}

// base-aware: base es import.meta.env.BASE_URL (p. ej. '/galeria/').
export function assetUrl(base, path) {
  return base + String(path).replace(/^\/+/, '')
}

export function albumDownloadUrl(base, slug) {
  return `${base}download-album.php?album=${encodeURIComponent(slug)}`
}

export function photoCount(album) {
  return Array.isArray(album?.photos) ? album.photos.length : 0
}

export function isAlbumEmpty(album) {
  return photoCount(album) === 0
}
```

- [ ] **Step 6: Correr el test y verificar que pasa**

Run: `npm test`
Expected: PASS — los 7 casos en verde.

- [ ] **Step 7: Crear `galeria/src/lib/paths.js` (adaptador base-aware)**

Lee el `base` una sola vez de Vite y expone helpers sin argumentos para los componentes. No se testea (depende de Vite); la lógica pura ya está cubierta en `gallery.js`.

```js
import { assetUrl, albumDownloadUrl } from './gallery.js'

// import.meta.env.BASE_URL = '/galeria/' en build y dev (por la config de Vite).
const BASE = import.meta.env.BASE_URL

// asset('media/x.jpeg') -> '/galeria/media/x.jpeg'
export const asset = (path) => assetUrl(BASE, path)

// albumZip('pascua') -> '/galeria/download-album.php?album=pascua'
export const albumZip = (slug) => albumDownloadUrl(BASE, slug)
```

- [ ] **Step 8: Commit**

```bash
git add vitest.config.js galeria/src/lib/gallery.js galeria/src/lib/paths.js galeria/src/lib/gallery.test.js package.json package-lock.json
git commit -m "feat(galeria): helpers puros base-aware + Vitest"
```

---

## Task 2: Seed del manifest y media de muestra

**Files:**
- Create: `galeria/public/manifest.json`
- Create: `galeria/public/media/<slug>/{thumb,web,orig}/...` (copias de fotos existentes)

- [ ] **Step 1: Crear el seed `galeria/public/manifest.json`**

```json
{
  "generated_at": "2026-06-22T12:00:00Z",
  "albums": [
    {
      "slug": "dia-del-padre",
      "title": "Día del Padre",
      "description": "Celebramos a los papás de La Casita con cariño y juegos.",
      "cover": "media/dia-del-padre/web/01.jpeg",
      "photos": [
        { "thumb": "media/dia-del-padre/thumb/01.jpeg", "web": "media/dia-del-padre/web/01.jpeg", "orig": "media/dia-del-padre/orig/01.jpeg", "w": 1280, "h": 853 },
        { "thumb": "media/dia-del-padre/thumb/02.jpeg", "web": "media/dia-del-padre/web/02.jpeg", "orig": "media/dia-del-padre/orig/02.jpeg", "w": 1280, "h": 853 },
        { "thumb": "media/dia-del-padre/thumb/03.jpeg", "web": "media/dia-del-padre/web/03.jpeg", "orig": "media/dia-del-padre/orig/03.jpeg", "w": 1280, "h": 853 }
      ]
    },
    {
      "slug": "dia-del-medio-ambiente",
      "title": "Día del Medio Ambiente",
      "description": "Aprendimos a cuidar nuestro planeta sembrando y jugando.",
      "cover": "media/dia-del-medio-ambiente/web/01.jpeg",
      "photos": []
    },
    {
      "slug": "dia-de-la-madre",
      "title": "Día de la Madre",
      "description": "Un día lleno de abrazos para nuestras mamás.",
      "cover": "media/dia-de-la-madre/web/01.jpeg",
      "photos": []
    },
    {
      "slug": "pascua",
      "title": "Pascua",
      "description": "Búsqueda de huevitos y mucha alegría en familia.",
      "cover": "media/pascua/web/01.jpeg",
      "photos": [
        { "thumb": "media/pascua/thumb/01.jpeg", "web": "media/pascua/web/01.jpeg", "orig": "media/pascua/orig/01.jpeg", "w": 1280, "h": 853 },
        { "thumb": "media/pascua/thumb/02.jpeg", "web": "media/pascua/web/02.jpeg", "orig": "media/pascua/orig/02.jpeg", "w": 1280, "h": 853 }
      ]
    },
    {
      "slug": "dia-de-la-educacion-inicial",
      "title": "Día de la Educación Inicial",
      "description": "Festejamos el aprendizaje y el juego de nuestros niños.",
      "cover": "media/dia-de-la-educacion-inicial/web/01.jpeg",
      "photos": []
    }
  ]
}
```

- [ ] **Step 2: Sembrar las carpetas de media y copiar fotos de muestra**

Reusa fotos existentes del repo como muestra (Fase 2 las reemplaza por subidas reales). Para Fase 1, las 3 versiones (thumb/web/orig) son copias del mismo archivo — el redimensionado real llega con Imagick en Fase 2.

Run:
```bash
cd galeria/public
for slug in dia-del-padre dia-del-medio-ambiente dia-de-la-madre pascua dia-de-la-educacion-inicial; do
  mkdir -p "media/$slug/thumb" "media/$slug/web" "media/$slug/orig"
done
# Día del Padre: 3 fotos
cp ../../src/assets/home/home-galeria-01.jpeg media/dia-del-padre/web/01.jpeg
cp ../../src/assets/home/home-galeria-02.jpeg media/dia-del-padre/web/02.jpeg
cp ../../src/assets/home/home-galeria-03.jpeg media/dia-del-padre/web/03.jpeg
# Pascua: 2 fotos
cp ../../src/assets/home/home-galeria-09.jpeg media/pascua/web/01.jpeg
cp ../../src/assets/home/home-galeria-10.jpeg media/pascua/web/02.jpeg
# Portadas de los álbumes vacíos (solo cover, sin fotos dentro)
cp ../../src/assets/home/home-galeria-11.jpeg media/dia-del-medio-ambiente/web/01.jpeg
cp ../../src/assets/home/home-galeria-12.jpeg media/dia-de-la-madre/web/01.jpeg
cp ../../src/assets/home/home-galeria-13.jpeg media/dia-de-la-educacion-inicial/web/01.jpeg
# thumb y orig = copia de web (Fase 1)
for slug in dia-del-padre pascua; do
  for f in media/$slug/web/*.jpeg; do
    cp "$f" "media/$slug/thumb/$(basename "$f")"
    cp "$f" "media/$slug/orig/$(basename "$f")"
  done
done
cd ../..
```

- [ ] **Step 3: Verificar que el dev server sirve el manifest**

Run: `npm run dev:galeria` y en otra terminal `curl -s http://localhost:5173/galeria/manifest.json | head -3` (ajustar puerto al que muestre Vite; el manifest se sirve bajo `/galeria/`). Cortar con Ctrl-C.
Expected: el JSON del manifest se sirve correctamente.

- [ ] **Step 4: Commit**

```bash
git add galeria/public/manifest.json galeria/public/media
git commit -m "feat(galeria): seed de manifest y media de muestra (5 álbumes)"
```

---

## Task 3: Hook de manifest + Header/Footer + variants de motion

**Files:**
- Create: `galeria/src/lib/useManifest.js`
- Create: `galeria/src/components/Header.jsx`
- Create: `galeria/src/components/Footer.jsx`
- Create: `galeria/src/motion/variants.js`

- [ ] **Step 1: Crear `galeria/src/lib/useManifest.js`**

```jsx
import { useEffect, useState } from 'react'

// Carga /manifest.json una sola vez. Devuelve { manifest, loading, error }.
export function useManifest() {
  const [state, setState] = useState({ manifest: null, loading: true, error: null })

  useEffect(() => {
    let alive = true
    fetch(import.meta.env.BASE_URL + 'manifest.json', { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((manifest) => alive && setState({ manifest, loading: false, error: null }))
      .catch((error) => alive && setState({ manifest: null, loading: false, error }))
    return () => { alive = false }
  }, [])

  return state
}
```

- [ ] **Step 2: Crear `galeria/src/motion/variants.js`**

```js
// Variants reutilizables de Framer Motion. Respetan prefers-reduced-motion
// porque las transiciones son cortas y por transform/opacity (no layout).

export const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
}

export const titleReveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const pageFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
}
```

- [ ] **Step 3: Crear `galeria/src/components/Header.jsx`**

```jsx
import { asset } from '../lib/paths.js'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background-light/80 border-b border-primary-soft">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        {/* Logo → portada de la galería (BASE_URL = /galeria/) */}
        <a href={import.meta.env.BASE_URL} className="flex items-center gap-3">
          <img src={asset('logo.jpg')} alt="La Casita de Mami" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display font-semibold text-lg text-text-main">Galería</span>
        </a>
        {/* Volver al sitio principal (raíz del dominio) */}
        <a
          href="/"
          className="text-sm font-semibold text-primary-dark hover:text-primary transition-colors"
        >
          ← Volver al sitio
        </a>
      </div>
    </header>
  )
}
```

Nota: copiar `logo.jpg` al public de la galería en el siguiente step para que `/logo.jpg` resuelva.

- [ ] **Step 4: Copiar el logo al public de la galería**

Run: `cp public/logo.jpg galeria/public/logo.jpg && cp public/favicon.svg galeria/public/favicon.svg`
Expected: ambos archivos quedan en `galeria/public/`.

- [ ] **Step 5: Crear `galeria/src/components/Footer.jsx`**

```jsx
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-primary-soft bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 text-center text-text-muted">
        <p className="font-display text-xl text-text-main">La Casita de Mami</p>
        <p className="mt-2 text-sm">Nido en Surco · Revive cada momento</p>
        <a href="/" className="mt-4 inline-block text-sm font-semibold text-primary-dark hover:text-primary">
          lacasitademami.edu.pe
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Verificar build**

Run: `npm run build:galeria`
Expected: build sin errores (los componentes aún no se usan; solo se valida que compilan al importarlos en la siguiente task; este step solo confirma que no hay errores de sintaxis si se importan). Si build no los incluye por tree-shaking, basta con que no rompa.

- [ ] **Step 7: Commit**

```bash
git add galeria/src/lib/useManifest.js galeria/src/motion/variants.js galeria/src/components/Header.jsx galeria/src/components/Footer.jsx galeria/public/logo.jpg galeria/public/favicon.svg
git commit -m "feat(galeria): hook de manifest, Header, Footer y variants de motion"
```

---

## Task 4: Skeleton + AlbumCard

**Files:**
- Create: `galeria/src/components/Skeleton.jsx`
- Create: `galeria/src/components/AlbumCard.jsx`

- [ ] **Step 1: Crear `galeria/src/components/Skeleton.jsx`**

```jsx
// Placeholder con shimmer (clase .skeleton definida en styles/index.css).
export default function Skeleton({ className = '' }) {
  return <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />
}
```

- [ ] **Step 2: Crear `galeria/src/components/AlbumCard.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cardItem } from '../motion/variants.js'
import { photoCount } from '../lib/gallery.js'
import { asset } from '../lib/paths.js'

export default function AlbumCard({ album }) {
  const count = photoCount(album)
  return (
    <motion.div variants={cardItem}>
      <Link
        to={`/${album.slug}`}
        className="group relative block overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
      >
        <div className="aspect-[4/3] overflow-hidden bg-primary-soft">
          <img
            src={asset(album.cover)}
            alt={album.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {/* Overlay de marca que aparece en hover (juego de paleta) */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-80 group-hover:from-primary-dark/80 transition-colors duration-300" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl font-semibold text-white drop-shadow">{album.title}</h3>
          <span className="mt-1 inline-block h-1 w-10 rounded-full bg-accent-butter transition-all duration-300 group-hover:w-20" />
          <p className="mt-1 text-sm text-white/90">
            {count > 0 ? `${count} ${count === 1 ? 'foto' : 'fotos'}` : 'Próximamente'}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build:galeria`
Expected: build sin errores.

- [ ] **Step 4: Commit**

```bash
git add galeria/src/components/Skeleton.jsx galeria/src/components/AlbumCard.jsx
git commit -m "feat(galeria): Skeleton y AlbumCard con hover de marca"
```

---

## Task 5: Página Portada

**Files:**
- Create: `galeria/src/pages/Portada.jsx`
- Modify: `galeria/src/App.jsx`

- [ ] **Step 1: Crear `galeria/src/pages/Portada.jsx`**

```jsx
import { motion } from 'framer-motion'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AlbumCard from '../components/AlbumCard.jsx'
import Skeleton from '../components/Skeleton.jsx'
import { useManifest } from '../lib/useManifest.js'
import { containerStagger, titleReveal } from '../motion/variants.js'

export default function Portada() {
  const { manifest, loading, error } = useManifest()
  const albums = manifest?.albums ?? []

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-accent-butter/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 text-center">
          <motion.h1
            initial="hidden" animate="show" variants={titleReveal}
            className="font-display text-5xl sm:text-6xl font-bold title-gradient"
          >
            Nuestra Galería
          </motion.h1>
          <motion.p
            initial="hidden" animate="show" variants={titleReveal}
            className="mx-auto mt-4 max-w-xl text-lg text-text-muted"
          >
            Revive cada momento de los eventos de La Casita de Mami.
          </motion.p>
        </div>
      </section>

      {/* Grid de álbumes */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3]" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-text-muted">No pudimos cargar la galería. Intenta recargar la página.</p>
        )}

        {!loading && !error && (
          <motion.div
            initial="hidden" animate="show" variants={containerStagger}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {albums.map((album) => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Conectar la ruta en `galeria/src/App.jsx`**

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Portada from './pages/Portada.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portada />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
```

- [ ] **Step 3: Verificar en el navegador**

Run: `npm run dev:galeria`
Expected: la portada muestra el título con degradado animado, 5 tarjetas en grid que entran en stagger, hover con zoom + overlay turquesa + subrayado lima que crece. Cortar con Ctrl-C.

- [ ] **Step 4: Verificar build**

Run: `npm run build:galeria`
Expected: build sin errores.

- [ ] **Step 5: Commit**

```bash
git add galeria/src/pages/Portada.jsx galeria/src/App.jsx
git commit -m "feat(galeria): página Portada con hero animado y grid de álbumes"
```

---

## Task 6: PhotoGrid con blur-up + skeletons

**Files:**
- Create: `galeria/src/components/PhotoGrid.jsx`

- [ ] **Step 1: Crear `galeria/src/components/PhotoGrid.jsx`**

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { containerStagger, cardItem } from '../motion/variants.js'
import { asset } from '../lib/paths.js'

// Grid de miniaturas. Cada imagen hace fade-in al cargar (blur-up simple).
export default function PhotoGrid({ photos, onOpen }) {
  return (
    <motion.div
      initial="hidden" animate="show" variants={containerStagger}
      className="columns-2 md:columns-3 gap-4 [&>*]:mb-4"
    >
      {photos.map((photo, i) => (
        <Thumb key={photo.thumb} photo={photo} index={i} onOpen={onOpen} />
      ))}
    </motion.div>
  )
}

function Thumb({ photo, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.button
      variants={cardItem}
      onClick={() => onOpen(index)}
      className="group block w-full overflow-hidden rounded-xl shadow-card focus:outline-none focus:ring-4 focus:ring-primary/40"
      aria-label={`Abrir foto ${index + 1}`}
    >
      <img
        src={asset(photo.thumb)}
        alt={`Foto ${index + 1}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'blur-0 opacity-100' : 'blur-md opacity-0'}`}
      />
    </motion.button>
  )
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build:galeria`
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add galeria/src/components/PhotoGrid.jsx
git commit -m "feat(galeria): PhotoGrid con blur-up y stagger"
```

---

## Task 7: Lightbox con descarga individual

**Files:**
- Create: `galeria/src/components/DownloadButtons.jsx`
- Create: `galeria/src/components/Lightbox.jsx`

- [ ] **Step 1: Crear `galeria/src/components/DownloadButtons.jsx`**

```jsx
import { useState } from 'react'
import { asset, albumZip } from '../lib/paths.js'

// Botón de descarga individual (atributo download, same-origin).
export function DownloadPhoto({ orig, filename }) {
  return (
    <a
      href={asset(orig)}
      download={filename}
      className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-primary-dark shadow hover:bg-white transition-colors"
    >
      ⬇ Descargar original
    </a>
  )
}

// Botón de descarga del álbum completo (ZIP por PHP).
export function DownloadAlbum({ slug, count }) {
  const [preparing, setPreparing] = useState(false)
  if (count === 0) return null
  return (
    <a
      href={albumZip(slug)}
      onClick={() => { setPreparing(true); setTimeout(() => setPreparing(false), 4000) }}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-button hover:bg-primary-dark transition-colors"
    >
      {preparing ? 'Preparando ZIP…' : `⬇ Descargar álbum (${count})`}
    </a>
  )
}
```

- [ ] **Step 2: Crear `galeria/src/components/Lightbox.jsx`**

```jsx
import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DownloadPhoto } from './DownloadButtons.jsx'
import { asset } from '../lib/paths.js'

// Lightbox con navegación por teclado/flechas. index === null => cerrado.
export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const open = index !== null && index >= 0

  const handleKey = useCallback((e) => {
    if (!open) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [open, onClose, onPrev, onNext])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const photo = open ? photos[index] : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <button onClick={onClose} aria-label="Cerrar"
            className="absolute top-4 right-5 text-white/80 hover:text-white text-3xl">×</button>

          <button onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Anterior"
            className="absolute left-3 sm:left-6 text-white/70 hover:text-white text-4xl select-none">‹</button>

          <motion.div
            key={photo.web}
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4"
          >
            <img src={asset(photo.web)} alt="" className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-brand" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">{index + 1} / {photos.length}</span>
              <DownloadPhoto orig={photo.orig} filename={`la-casita-${index + 1}.jpeg`} />
            </div>
          </motion.div>

          <button onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Siguiente"
            className="absolute right-3 sm:right-6 text-white/70 hover:text-white text-4xl select-none">›</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build:galeria`
Expected: build sin errores.

- [ ] **Step 4: Commit**

```bash
git add galeria/src/components/DownloadButtons.jsx galeria/src/components/Lightbox.jsx
git commit -m "feat(galeria): Lightbox con navegación y descarga individual"
```

---

## Task 8: Página Álbum (integra grid + lightbox + descargas + estado vacío)

**Files:**
- Create: `galeria/src/pages/Album.jsx`
- Modify: `galeria/src/App.jsx`

- [ ] **Step 1: Crear `galeria/src/pages/Album.jsx`**

```jsx
import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PhotoGrid from '../components/PhotoGrid.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Skeleton from '../components/Skeleton.jsx'
import { DownloadAlbum } from '../components/DownloadButtons.jsx'
import { useManifest } from '../lib/useManifest.js'
import { getAlbumBySlug, photoCount, isAlbumEmpty } from '../lib/gallery.js'
import { titleReveal } from '../motion/variants.js'

export default function Album() {
  const { slug } = useParams()
  const { manifest, loading, error } = useManifest()
  const [index, setIndex] = useState(null)

  if (loading) {
    return (
      <div className="min-h-screen"><Header />
        <div className="mx-auto max-w-6xl px-5 py-12">
          <Skeleton className="h-10 w-64" />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square" />)}
          </div>
        </div>
      </div>
    )
  }

  if (error) return <Navigate to="/" replace />
  const album = getAlbumBySlug(manifest, slug)
  if (!album) return <Navigate to="/" replace />

  const photos = album.photos ?? []
  const count = photoCount(album)
  const empty = isAlbumEmpty(album)

  return (
    <div className="min-h-screen">
      <Header />

      {/* Cabecera del álbum */}
      <section className="relative overflow-hidden border-b border-primary-soft">
        <div className="absolute -top-16 right-0 h-64 w-64 rounded-full bg-accent-sky/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent-butter/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pt-12 pb-10">
          <Link to="/" className="text-sm font-semibold text-primary-dark hover:text-primary">← Todos los álbumes</Link>
          <motion.h1
            initial="hidden" animate="show" variants={titleReveal}
            className="mt-4 font-display text-4xl sm:text-5xl font-bold text-text-main"
          >
            {album.title}
            <span className="mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-primary to-accent-butter" />
          </motion.h1>
          {album.description && (
            <motion.p initial="hidden" animate="show" variants={titleReveal}
              className="mt-4 max-w-2xl text-text-muted">{album.description}</motion.p>
          )}
          {!empty && (
            <div className="mt-6"><DownloadAlbum slug={album.slug} count={count} /></div>
          )}
        </div>
      </section>

      {/* Contenido */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        {empty ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-card">
            <p className="font-display text-2xl text-text-main">Pronto subiremos las fotos de este evento</p>
            <p className="mt-2 text-text-muted">Vuelve en unos días para revivirlo. 💙</p>
          </div>
        ) : (
          <PhotoGrid photos={photos} onOpen={setIndex} />
        )}
      </section>

      <Lightbox
        photos={photos}
        index={index}
        onClose={() => setIndex(null)}
        onPrev={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
        onNext={() => setIndex((i) => (i + 1) % photos.length)}
      />

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Conectar la ruta dinámica en `galeria/src/App.jsx`**

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Portada from './pages/Portada.jsx'
import Album from './pages/Album.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portada />} />
      <Route path="/:slug" element={<Album />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
```

- [ ] **Step 3: Verificar en el navegador**

Run: `npm run dev:galeria`
Expected: clic en "Día del Padre" → cabecera con título animado + acento degradado, botón "Descargar álbum (3)", grid de 3 fotos con blur-up; clic en una foto abre el lightbox con zoom, flechas/teclado navegan, botón "Descargar original". "Día de la Madre" muestra el estado vacío. Cortar con Ctrl-C.

- [ ] **Step 4: Verificar build**

Run: `npm run build:galeria`
Expected: build sin errores.

- [ ] **Step 5: Commit**

```bash
git add galeria/src/pages/Album.jsx galeria/src/App.jsx
git commit -m "feat(galeria): página Álbum con grid, lightbox, descargas y estado vacío"
```

---

## Task 9: Retención — MoreAlbums + transición de página

**Files:**
- Create: `galeria/src/components/MoreAlbums.jsx`
- Modify: `galeria/src/pages/Album.jsx` (insertar MoreAlbums antes del Footer)
- Modify: `galeria/src/App.jsx` (AnimatePresence para transición de ruta)

- [ ] **Step 1: Crear `galeria/src/components/MoreAlbums.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { asset } from '../lib/paths.js'

// Carrusel horizontal de otros álbumes para invitar a seguir navegando.
export default function MoreAlbums({ albums, currentSlug }) {
  const others = albums.filter((a) => a.slug !== currentSlug)
  if (others.length === 0) return null
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8">
      <h2 className="font-display text-2xl font-semibold text-text-main">Más álbumes</h2>
      <div className="mt-5 flex gap-4 overflow-x-auto pb-3 snap-x">
        {others.map((a) => (
          <Link key={a.slug} to={`/${a.slug}`}
            className="group relative w-56 shrink-0 snap-start overflow-hidden rounded-xl shadow-card">
            <div className="aspect-[4/3] overflow-hidden bg-primary-soft">
              <img src={asset(a.cover)} alt={a.title} loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
            <span className="absolute bottom-3 left-3 font-display text-lg font-semibold text-white">{a.title}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Insertar MoreAlbums en `galeria/src/pages/Album.jsx`**

Añadir el import al inicio:

```jsx
import MoreAlbums from '../components/MoreAlbums.jsx'
```

Y justo **antes** de `<Footer />`, insertar:

```jsx
      <MoreAlbums albums={manifest?.albums ?? []} currentSlug={album.slug} />
```

- [ ] **Step 3: Envolver las rutas con AnimatePresence en `galeria/src/App.jsx`**

```jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Portada from './pages/Portada.jsx'
import Album from './pages/Album.jsx'
import { pageFade } from './motion/variants.js'

function Animated({ children }) {
  return (
    <motion.div variants={pageFade} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Animated><Portada /></Animated>} />
        <Route path="/:slug" element={<Animated><Album /></Animated>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
```

- [ ] **Step 4: Verificar en el navegador**

Run: `npm run dev:galeria`
Expected: al entrar a un álbum, abajo aparece "Más álbumes" con los otros 4; navegar entre portada y álbum tiene transición suave de fade. Cortar con Ctrl-C.

- [ ] **Step 5: Verificar build**

Run: `npm run build:galeria`
Expected: build sin errores.

- [ ] **Step 6: Commit**

```bash
git add galeria/src/components/MoreAlbums.jsx galeria/src/pages/Album.jsx galeria/src/App.jsx
git commit -m "feat(galeria): carrusel 'Más álbumes' y transición de página"
```

---

## Task 10: Routing de /galeria (.htaccess + 404) y endpoint de descarga PHP

**Files:**
- Create: `galeria/public/.htaccess`
- Create: `galeria/public/404.html`
- Create: `galeria/public/download-album.php`

- [ ] **Step 1: Crear `galeria/public/.htaccess`**

```apache
# Cache de imágenes y assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Compresión
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Routing SPA bajo /galeria. Este .htaccess vive en public_html/galeria/ y tiene su
# propio RewriteEngine On, así que NO hereda las reglas del .htaccess del dominio
# principal. Archivos/carpetas reales (incluye download-album.php y media/) se sirven
# directo; el resto cae en /galeria/index.html para que /galeria/dia-del-padre funcione.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /galeria/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /galeria/index.html [L]
</IfModule>
```

- [ ] **Step 2: Crear `galeria/public/404.html`**

```html
<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8" />
<script>
  // Fallback SPA: cualquier 404 redirige a la portada de la galería; el router resuelve el slug.
  location.replace('/galeria/');
</script></head><body></body></html>
```

- [ ] **Step 3: Crear `galeria/public/download-album.php`**

```php
<?php
// Descarga de un álbum completo como ZIP de sus originales.
// Público y solo lectura. Valida el slug contra el manifest (defensa en profundidad).

$slug = $_GET['album'] ?? '';
if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
  http_response_code(400);
  exit('Solicitud inválida');
}

$manifestPath = __DIR__ . '/manifest.json';
$manifest = json_decode(@file_get_contents($manifestPath), true);
$slugs = array_column($manifest['albums'] ?? [], 'slug');
if (!in_array($slug, $slugs, true)) {
  http_response_code(404);
  exit('Álbum no encontrado');
}

$origDir = __DIR__ . '/media/' . $slug . '/orig';
if (!is_dir($origDir)) {
  http_response_code(404);
  exit('Álbum no encontrado');
}

$files = glob($origDir . '/*.{jpg,jpeg,png,JPG,JPEG,PNG}', GLOB_BRACE);
if (!$files) {
  http_response_code(404);
  exit('Este álbum aún no tiene fotos');
}

$tmp = tempnam(sys_get_temp_dir(), 'galzip');
$zip = new ZipArchive();
if ($zip->open($tmp, ZipArchive::OVERWRITE) !== true) {
  http_response_code(500);
  exit('No se pudo crear el ZIP');
}
foreach ($files as $f) {
  $zip->addFile($f, basename($f));
}
$zip->close();

header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $slug . '.zip"');
header('Content-Length: ' . filesize($tmp));
header('Cache-Control: no-store');
readfile($tmp);
unlink($tmp);
```

- [ ] **Step 4: Verificar el endpoint con un servidor PHP local**

Run:
```bash
npm run build:galeria
cd dist-galeria && php -S localhost:8899 >/tmp/galphp.log 2>&1 &
sleep 1
curl -s -o /tmp/pascua.zip -w "%{http_code} %{content_type}\n" "http://localhost:8899/download-album.php?album=pascua"
unzip -l /tmp/pascua.zip
curl -s -o /dev/null -w "slug malo: %{http_code}\n" "http://localhost:8899/download-album.php?album=../etc"
kill %1; cd ..
```
Expected: `200 application/zip`, el `unzip -l` lista 2 archivos (01.jpeg, 02.jpeg), y el slug malo devuelve `400`.

- [ ] **Step 5: Commit**

```bash
git add galeria/public/.htaccess galeria/public/404.html galeria/public/download-album.php
git commit -m "feat(galeria): routing SPA de /galeria y endpoint ZIP de descarga"
```

---

## Task 11: Scripts de deploy con datos protegidos

**Files:**
- Create: `deploy-galeria.sh`
- Modify: `deploy.sh` (excluir admin/ api/ galeria/)

- [ ] **Step 1: Crear `deploy-galeria.sh`**

```bash
#!/bin/bash
# ============================================
# Deploy galería → lacasitademami.edu.pe/galeria  (ruta, NO subdominio)
# Uso: ./deploy-galeria.sh [--dry-run]
# El build ya usa base=/galeria/ (vite.galeria.config.js); no requiere subdominio.
# ============================================
set -euo pipefail

REMOTE="hostinger:~/domains/lacasitademami.edu.pe/public_html/galeria/"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

DRY_RUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN="--dry-run"
  echo "🧪 Dry-run (no se sube nada)"
fi

cd "$PROJECT_DIR"

echo "📦 Building galería (base=/) ..."
npm run build:galeria

echo "🚀 Sincronizando a $REMOTE ..."
# --delete limpia builds viejos PERO se excluyen los DATOS subidos por el admin
# (Fase 2) para no borrarlos nunca:
#   media/         → fotos subidas
#   manifest.json  → metadatos generados por el admin
rsync -avz --delete $DRY_RUN \
  --exclude='media/' \
  --exclude='manifest.json' \
  --exclude='.DS_Store' \
  dist-galeria/ "$REMOTE"

if [[ -z "$DRY_RUN" ]]; then
  echo "✅ Listo → https://lacasitademami.edu.pe/galeria"
else
  echo "✅ Dry-run terminado."
fi
```

> ⚠ **Primer deploy (Fase 1):** como `media/` y `manifest.json` se excluyen del `--delete`, en el **primer** deploy hay que subir el seed manualmente una sola vez (después el admin los gestiona):
> ```bash
> rsync -avz dist-galeria/media/ hostinger:~/domains/lacasitademami.edu.pe/public_html/galeria/media/
> rsync -avz dist-galeria/manifest.json hostinger:~/domains/lacasitademami.edu.pe/public_html/galeria/manifest.json
> ```

- [ ] **Step 2: Hacer ejecutable el script**

Run: `chmod +x deploy-galeria.sh`
Expected: sin salida (permiso aplicado).

- [ ] **Step 3: Modificar `deploy.sh` — excluir admin/, api/ y galeria/ del sitio principal**

En el bloque `rsync` de `deploy.sh`, añadir estas exclusiones junto a las existentes (para que el deploy del sitio principal NO borre la galería ni el futuro admin/api):

```bash
  --exclude='galeria/' \
  --exclude='admin/' \
  --exclude='api/' \
```

(Insertarlas dentro del comando `rsync -avz --delete ...`, antes de la línea `dist/ "$REMOTE"`.)

- [ ] **Step 4: Verificar el deploy en seco (dry-run)**

Run: `./deploy-galeria.sh --dry-run`
Expected: build OK + rsync en modo dry-run lista lo que subiría (sin `media/` ni `manifest.json` en el set de `--delete`). No sube nada.

- [ ] **Step 5: Commit**

```bash
git add deploy-galeria.sh deploy.sh
git commit -m "chore(galeria): script de deploy de /galeria + proteger datos en deploy principal"
```

---

## Task 12: Verificación integral y deploy real

**Files:** (ninguno nuevo)

- [ ] **Step 1: Correr todos los tests**

Run: `npm test`
Expected: PASS (helpers de `gallery.js`).

- [ ] **Step 2: Build final**

Run: `npm run build:galeria`
Expected: build sin errores; `dist-galeria/` contiene `index.html`, `assets/`, `manifest.json`, `media/`, `download-album.php`, `.htaccess`, `404.html`.

- [ ] **Step 3: Verificación visual completa (dev server, bajo `/galeria/`)**

Run: `npm run dev:galeria` y abrir `http://localhost:5173/galeria/` (ajustar puerto al que muestre Vite).
Checklist:
- Portada: título con degradado animado, 5 tarjetas con stagger + hover.
- Entrar a "Día del Padre" (`/galeria/dia-del-padre`): título animado, grid con blur-up, lightbox con flechas/teclado.
- "Descargar original" baja una foto (same-origin). _(La "Descarga de álbum" usa PHP y se valida en Task 10 Step 4 y en producción — el dev server de Vite no ejecuta PHP.)_
- "Día de la Madre": estado vacío.
- URL directa `http://localhost:5173/galeria/pascua` carga el álbum (routing del dev server).
- "Más álbumes" aparece al final.
Cortar con Ctrl-C.

- [ ] **Step 4 (infra): NO se crea subdominio**

La galería es una ruta (`/galeria`), no un subdominio. La carpeta `public_html/galeria/`
se crea sola con el primer deploy (rsync). No hay que tocar hPanel.

- [ ] **Step 5: Primer deploy real**

Run:
```bash
./deploy-galeria.sh
# Subir el seed una sola vez (excluido del --delete):
rsync -avz dist-galeria/media/ hostinger:~/domains/lacasitademami.edu.pe/public_html/galeria/media/
rsync -avz dist-galeria/manifest.json hostinger:~/domains/lacasitademami.edu.pe/public_html/galeria/manifest.json
```
Expected: el sitio queda en `https://lacasitademami.edu.pe/galeria`.

- [ ] **Step 6: Verificación en producción**

Abrir `https://lacasitademami.edu.pe/galeria` y `https://lacasitademami.edu.pe/galeria/dia-del-padre` directo (refrescar la página del álbum para validar el routing de `/galeria`). Probar una descarga individual y una de álbum (ZIP).
Expected: todo funciona; el enlace directo a un álbum carga sin 404; el sitio principal en `/` sigue intacto.

- [ ] **Step 7: Confirmar que el deploy del sitio principal no rompe nada**

Run: `./deploy.sh --dry-run`
Expected: el dry-run muestra que `galeria/`, `admin/` y `api/` están excluidos (no aparecen para borrado).

---

## Self-Review (cobertura del spec)

- **Ruta `/galeria` + 5 álbumes + URLs limpias (base-aware)** → Tasks 0, 1 (paths.js), 5, 8, 10. ✓
- **Vistoso / motion / título con efecto / paleta turquesa+verde** → Tasks 0 (keyframes), 3 (variants), 5 (hero), 8 (cabecera álbum). ✓
- **Animación de carga** → Skeletons (Tasks 4, 5, 8) + blur-up (Task 6). ✓
- **Retención (que vuelva)** → MoreAlbums + transición de página (Task 9). ✓
- **Descarga individual** → Lightbox + DownloadPhoto (Task 7). ✓
- **Descarga de álbum (ZIP)** → DownloadAlbum + download-album.php (Tasks 7, 10). ✓
- **Reusa marca (Fraunces/Jakarta, tokens Tailwind)** → Tasks 0, 3, AlbumCard. ✓
- **Separar código de datos / deploy seguro** → Task 11 (exclusiones). ✓
- **prefers-reduced-motion** → Task 0 (CSS) + variants cortos. ✓
- **Fuente que lee la galería = manifest.json** → Tasks 2, 3. ✓

Pendiente para **Fase 2** (fuera de este plan): login, panel admin, subida masiva, reordenar, pipeline Imagick (thumb/web/orig reales + strip GPS), regeneración dinámica de `manifest.json`, scripts `deploy-admin.sh`, `private/config.php` y `gallery.db`.
