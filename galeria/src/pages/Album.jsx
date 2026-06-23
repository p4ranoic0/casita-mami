import { useState, useEffect } from 'react'
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
import MoreAlbums from '../components/MoreAlbums.jsx'

export default function Album() {
  const { slug } = useParams()
  const { manifest, loading, error } = useManifest()
  const [index, setIndex] = useState(null)

  // SEO/UX: título + descripción por álbum
  useEffect(() => {
    const a = getAlbumBySlug(manifest, slug)
    if (!a) return
    document.title = `${a.title} · Galería · La Casita de Mami`
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m) }
    m.setAttribute('content', `${a.description ? a.description + ' ' : ''}Fotos de ${a.title} en La Casita de Mami, nido en Surco.`)
  }, [manifest, slug])

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

      <MoreAlbums albums={manifest?.albums ?? []} currentSlug={album.slug} />

      <Footer />
    </div>
  )
}
