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
