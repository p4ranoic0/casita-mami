import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Sticker from '../../../src/components/Sticker.jsx'
import JustifiedGrid, { SkeletonRow } from '../components/JustifiedGrid.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useManifest } from '../lib/useManifest.js'
import { getAlbumBySlug, photoCount } from '../lib/gallery.js'
import { albumZip } from '../lib/paths.js'
import { albumColor, albumCover } from '../lib/look.js'

// Fotos que se agregan a la vez. Al bajar se suman más (o con "Ver más fotos").
const BATCH = 36
const OTHER_ROT = [-2, 1.5, -1, 2]

export default function Album() {
  const { slug } = useParams()
  const { manifest, loading, error } = useManifest()
  const album = getAlbumBySlug(manifest, slug)

  // SEO/UX: título + descripción por álbum
  useEffect(() => {
    if (!album) return
    document.title = `${album.title} · Galería · La Casita de Mami`
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m) }
    m.setAttribute('content', `${album.description ? album.description + ' ' : ''}Fotos de ${album.title} en La Casita de Mami, nido en Surco.`)
  }, [album])

  if (loading) {
    return (
      <main>
        <section className="gb-band sc bot" style={{ '--c': 'var(--li)', background: 'var(--li)' }}>
          <div className="wrap"><span className="gb-back">← Todos los álbumes</span><div className="gb-bh"><h1>&nbsp;</h1></div></div>
        </section>
        <div className="wrap gb-photos2"><SkeletonRow photos={Array.from({ length: 9 }, (_, i) => ({ w: i % 3 ? 3 : 2, h: 2 }))} /></div>
      </main>
    )
  }
  if (error || !album) return <Navigate to="/" replace />
  // key: al pasar a otro álbum se reinicia el contador de carga y el lote
  return <AlbumView key={album.slug} album={album} albums={manifest.albums} />
}

function AlbumView({ album, albums }) {
  const [ix, setIx] = useState(null)
  const [shown, setShown] = useState(BATCH)
  const [loaded, setLoaded] = useState(0)
  const sentinel = useRef(null)
  const photos = album.photos ?? []
  const total = photoCount(album)
  const ci = albums.indexOf(album)
  const color = albumColor(ci)
  const more = shown < total

  useEffect(() => {
    if (!more || !sentinel.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown((s) => Math.min(total, s + BATCH))
    }, { rootMargin: '600px' })
    io.observe(sentinel.current)
    return () => io.disconnect()
  }, [more, total, shown])

  const busy = loaded < Math.min(shown, total)
  const pct = total ? Math.round((loaded / total) * 100) : 0
  const others = albums.map((a, i) => ({ a, i })).filter(({ a }) => a.slug !== album.slug)

  return (
    <main>
      <section className="gb-band sc bot" style={{ '--c': color, background: color }}>
        <div className="wrap">
          <Link to="/" className="gb-back">← Todos los álbumes</Link>
          <div className="gb-bh">
            <div><h1>{album.title}</h1>{album.description && <p>{album.description}</p>}</div>
            {total > 0 && <a className="btn" href={albumZip(album.slug)}>{total === 1 ? 'Descargar la foto' : `Descargar las ${total} fotos`}</a>}
          </div>
        </div>
      </section>

      {total > 0 && (
        <div className={'gb-load' + (busy ? '' : ' done')} role="status" aria-live="polite">
          <span>{busy ? `Cargando fotos · ${loaded} de ${total}` : `${loaded} de ${total} fotos listas`}</span>
          <b><i style={{ width: pct + '%' }} /></b>
        </div>
      )}

      <div className="wrap">
        {total ? (
          <section className="gb-photos2">
            <JustifiedGrid photos={photos.slice(0, shown)} title={album.title} total={total} onOpen={setIx} onLoaded={() => setLoaded((n) => n + 1)} />
            {more && (
              <div ref={sentinel} className="gb-more-wrap">
                <SkeletonRow photos={photos.slice(shown, shown + 6)} />
                <button className="btn light" onClick={() => setShown((s) => Math.min(total, s + BATCH))}>
                  {`Ver más fotos (${total - shown} restantes)`}
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="gb-empty">
            <span className="label">pronto</span>
            <h2>Estamos eligiendo las fotos</h2>
            <p>Vuelve en unos días para revivir este evento.</p>
          </section>
        )}

        {others.length > 0 && (
          <section className="db-sec" style={{ paddingTop: 40 }}>
            <h2>Otros álbumes</h2>
            <div className="gb-more">
              {others.map(({ a, i }, k) => (
                <Link key={a.slug} to={'/' + a.slug} className="gb-mi">
                  <Sticker src={albumCover(a, i)} cap={a.title} rot={OTHER_ROT[k % 4]} corners={false} ratio="1" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Lightbox photos={photos} index={ix} setIndex={setIx} title={album.title} />
    </main>
  )
}
