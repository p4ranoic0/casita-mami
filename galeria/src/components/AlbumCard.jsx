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
