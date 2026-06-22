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
