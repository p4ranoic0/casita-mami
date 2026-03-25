import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE_STANDARD,
  withReducedMotion,
} from '../utils/motionTokens'

export default function SimpleModal({ isOpen, onClose, title, children }) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpen) return

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION_DURATION.base }}
        >
          <button
            className="absolute inset-0 bg-slate-900/55 backdrop-blur-[1.5px]"
            onClick={onClose}
            aria-label="Cerrar modal"
          />

          <motion.div
            className="relative w-full max-w-2xl rounded-2xl bg-white p-6 md:p-8 shadow-2xl"
            initial={{
              opacity: 0,
              y: withReducedMotion(prefersReducedMotion, MOTION_DISTANCE.sm, 0),
              scale: withReducedMotion(prefersReducedMotion, 0.99, 1),
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: withReducedMotion(prefersReducedMotion, MOTION_DISTANCE.xs, 0),
              scale: withReducedMotion(prefersReducedMotion, 0.995, 1),
            }}
            transition={{
              duration: withReducedMotion(prefersReducedMotion, MOTION_DURATION.base, 0.01),
              ease: MOTION_EASE_STANDARD,
            }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold text-text-main">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg bg-gray-100 p-2 text-text-main transition-colors hover:bg-gray-200"
                aria-label="Cerrar"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
