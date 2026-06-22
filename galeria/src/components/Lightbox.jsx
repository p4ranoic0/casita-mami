import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DownloadPhoto } from './DownloadButtons.jsx'
import { asset } from '../lib/paths.js'

// Lightbox con navegación por teclado/flechas. index === null => cerrado.
export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const open = index !== null && index >= 0

  const handleKey = useCallback((e) => {
    if (!open) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [open, onClose, onPrev, onNext])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  const photo = open ? photos[index] : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <button onClick={onClose} aria-label="Cerrar"
            className="absolute top-4 right-5 text-white/80 hover:text-white text-3xl">×</button>

          <button onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Anterior"
            className="absolute left-3 sm:left-6 text-white/70 hover:text-white text-4xl select-none">‹</button>

          <motion.div
            key={photo.web}
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4"
          >
            <img src={asset(photo.web)} alt="" className="max-h-[78vh] max-w-full rounded-lg object-contain shadow-brand" />
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">{index + 1} / {photos.length}</span>
              <DownloadPhoto orig={photo.orig} filename={`la-casita-${index + 1}.jpeg`} />
            </div>
          </motion.div>

          <button onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Siguiente"
            className="absolute right-3 sm:right-6 text-white/70 hover:text-white text-4xl select-none">›</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
