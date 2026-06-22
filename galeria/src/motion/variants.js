// Variants reutilizables de Framer Motion. Respetan prefers-reduced-motion
// porque las transiciones son cortas y por transform/opacity (no layout).

export const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
}

export const titleReveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const pageFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
}
