import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/paths.js'
import { ratio } from '../lib/look.js'

// Miniatura que no pide la imagen hasta que está cerca de la pantalla.
// Mientras tanto (y mientras descarga) muestra el recuadro animado.
function LazyImg({ src, alt, eager, priority, width, height, onDone }) {
  const ref = useRef(null)
  const [go, setGo] = useState(eager)
  const [ok, setOk] = useState(false)
  useEffect(() => {
    if (go) return
    if (typeof IntersectionObserver === 'undefined') { setGo(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); setGo(true) }
    }, { rootMargin: '400px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [go])
  const done = () => { setOk(true); onDone?.() }
  return (
    <span ref={ref} className={'jg-img' + (ok ? ' ok' : '')}>
      {go && <img src={src} alt={alt} width={width || undefined} height={height || undefined}
        loading={eager ? 'eager' : 'lazy'} decoding="async" fetchpriority={priority ? 'high' : undefined}
        onLoad={done} onError={done} />}
    </span>
  )
}

const tileStyle = (p) => {
  const r = ratio(p)
  return { flexGrow: r, flexBasis: `calc(var(--rowh) * ${r})` }
}

// Cuadrícula justificada: las fotos van por filas, de izquierda a derecha,
// y cada una conserva su proporción.
export default function JustifiedGrid({ photos, title, total, onOpen, onLoaded }) {
  return (
    <div className="jg">
      {photos.map((p, i) => (
        <button key={p.thumb} className="jg-t" style={tileStyle(p)} onClick={() => onOpen(i)} aria-label={`Abrir foto ${i + 1}`}>
          <i style={{ paddingBottom: (1 / ratio(p)) * 100 + '%' }} />
          <LazyImg src={asset(p.thumb)} alt={`${title} – foto ${i + 1} de ${total}, La Casita de Mami (Surco)`}
            eager={i < 8} priority={i === 0} width={p.w} height={p.h} onDone={onLoaded} />
        </button>
      ))}
    </div>
  )
}

// Fila de recuadros vacíos con la forma de las próximas fotos.
export function SkeletonRow({ photos }) {
  return (
    <div className="jg jg-skel" aria-hidden="true">
      {photos.map((p, i) => (
        <span key={i} className="jg-t" style={tileStyle(p)}>
          <i style={{ paddingBottom: (1 / ratio(p)) * 100 + '%' }} />
          <span className="jg-img" />
        </span>
      ))}
    </div>
  )
}
