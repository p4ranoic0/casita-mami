import { useEffect, useState } from 'react'
import { asset } from '../lib/paths.js'
import { ratio } from '../lib/look.js'

// Foto en grande. Primero se ve la miniatura borrosa y encima aparece la
// versión web cuando termina de cargar. Precarga la anterior y la siguiente.
// index === null => cerrado.
export default function Lightbox({ photos, index, setIndex, title }) {
  const [loadedSrc, setLoadedSrc] = useState(null)
  const n = photos.length
  const open = index !== null && index >= 0 && index < n

  useEffect(() => {
    if (!open) return
    ;[index + 1, index - 1].forEach((j) => {
      const p = photos[(j + n) % n]
      if (p) { const im = new Image(); im.src = asset(p.web) }
    })
    const k = (e) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowLeft') setIndex((index - 1 + n) % n)
      if (e.key === 'ArrowRight') setIndex((index + 1) % n)
    }
    window.addEventListener('keydown', k)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = prev }
  }, [open, index, n, photos, setIndex])

  if (!open) return null
  const p = photos[index]
  const web = asset(p.web)
  const ok = loadedSrc === web
  const step = (d) => (e) => { e.stopPropagation(); setIndex((index + d + n) % n) }

  return (
    <div className="lb" onClick={() => setIndex(null)} role="dialog" aria-modal="true" aria-label={title}>
      <button className="lb-x" onClick={() => setIndex(null)}>Cerrar</button>
      <button className="lb-nav l" aria-label="Anterior" onClick={step(-1)}>‹</button>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <div className="lb-stage" style={{ aspectRatio: String(ratio(p)) }}>
          <img className="lb-blur" src={asset(p.thumb)} alt="" aria-hidden="true" width={p.w || undefined} height={p.h || undefined} decoding="async" />
          <img key={web} className={'lb-full' + (ok ? ' ok' : '')} src={web}
            alt={`${title} – foto ${index + 1} de ${n}, La Casita de Mami (Surco)`}
            width={p.w || undefined} height={p.h || undefined} loading="eager" decoding="async" fetchpriority="high"
            onLoad={() => setLoadedSrc(web)} />
          {!ok && <span className="lb-spin">cargando…</span>}
        </div>
        <figcaption>
          <span>{title} · {index + 1} de {n}</span>
          <a href={asset(p.orig || p.web)} download={`la-casita-${index + 1}.jpg`}>Descargar foto</a>
        </figcaption>
      </figure>
      <button className="lb-nav r" aria-label="Siguiente" onClick={step(1)}>›</button>
    </div>
  )
}
