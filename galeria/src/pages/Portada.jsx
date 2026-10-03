import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sticker from '../../../src/components/Sticker.jsx'
import { SkeletonRow } from '../components/JustifiedGrid.jsx'
import { useManifest } from '../lib/useManifest.js'
import { photoCount } from '../lib/gallery.js'
import { albumColor, albumCover, albumCoverSrcSet, countLabel } from '../lib/look.js'

export default function Portada() {
  const { manifest, loading, error } = useManifest({ overview: true })
  const albums = manifest?.albums ?? []

  useEffect(() => { document.title = 'Galería de fotos · La Casita de Mami | Nido en Surco' }, [])

  return (
    <main className="wrap">
      <div className="db-ph">
        <div><span className="label">galería</span><h1 style={{ marginTop: 18 }}>Nuestros álbumes</h1></div>
        <p>Las fotos de cada celebración en La Casita. Míralas aquí o descárgalas para guardarlas.</p>
      </div>

      {loading && <SkeletonRow photos={Array.from({ length: 6 }, () => ({ w: 4, h: 3 }))} />}
      {error && <p className="gb-error">No pudimos cargar la galería. Intenta recargar la página.</p>}

      {!loading && !error && (
        <section className="gb-grid">
          {albums.map((a, i) => (
            <Link key={a.slug} to={'/' + a.slug} className={'gb-card sc' + (i === 0 ? ' big' : '')}
              style={{ '--c': albumColor(i), background: albumColor(i) }}>
              <Sticker src={albumCover(a, i)} alt={`Portada del álbum ${a.title}, La Casita de Mami (Surco)`} corners={false}
                ratio={i === 0 ? '16/8' : '4/3'} loading={i < 3 ? 'eager' : 'lazy'} priority={i === 0}
                width={a.photos?.find((p) => p.web === a.cover)?.w} height={a.photos?.find((p) => p.web === a.cover)?.h}
                srcSet={albumCoverSrcSet(a)}
                sizes={i === 0 ? '(max-width: 560px) 100vw, (max-width: 900px) 90vw, 65vw' : '(max-width: 560px) 100vw, 33vw'} />
              <div className="gb-meta"><h2>{a.title}</h2><span>{countLabel(photoCount(a))}</span></div>
              {i === 0 && a.description && <p>{a.description}</p>}
            </Link>
          ))}
        </section>
      )}
      <div style={{ height: 80 }} />
    </main>
  )
}
