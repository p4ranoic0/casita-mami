import { motion } from 'framer-motion'
import { MOTION_DURATION, MOTION_EASE_STANDARD, MOTION_DISTANCE } from '../utils/motionTokens'

// Variantes de animación reutilizables
export const fadeInUp = {
  hidden: { opacity: 0, y: MOTION_DISTANCE.md },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }
  }
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -MOTION_DISTANCE.md },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }
  }
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -MOTION_DISTANCE.md },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }
  }
}

export const fadeInRight = {
  hidden: { opacity: 0, x: MOTION_DISTANCE.md },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  }
}

export const staggerItem = {
  hidden: { opacity: 0, y: MOTION_DISTANCE.sm },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD }
  }
}

// Componente de sección animada al hacer scroll
export default function AnimatedSection({ 
  children, 
  className = "", 
  variants = fadeInUp,
  delay = 0,
  once = true 
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Componente para elementos con hover
export function AnimatedCard({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 14px 30px rgba(15, 23, 42, 0.10)",
        transition: { duration: MOTION_DURATION.quick, ease: MOTION_EASE_STANDARD }
      }}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  )
}

// Componente para botones animados
export function AnimatedButton({ children, className = "", onClick }) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: MOTION_DURATION.quick }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

// Componente para imágenes con efecto parallax suave
export function AnimatedImage({ src, alt, className = "" }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }}
    />
  )
}

// Componente contador animado
export function AnimatedCounter({ value, suffix = "", className = "" }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD }}
    >
      {value}{suffix}
    </motion.span>
  )
}
