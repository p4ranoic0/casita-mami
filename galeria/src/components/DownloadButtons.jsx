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
