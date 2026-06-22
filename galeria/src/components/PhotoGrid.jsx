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
