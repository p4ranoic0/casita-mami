import { motion, useReducedMotion } from 'framer-motion'
import {
  MOTION_DURATION,
  MOTION_EASE_STANDARD,
  withReducedMotion,
} from '../utils/motionTokens'

export default function WhatsAppButton() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.a 
      href="https://api.whatsapp.com/send?phone=51908880326" 
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-8 right-8 size-16 bg-[#25D366] text-white rounded-full items-center justify-center shadow-2xl shadow-[#25D366]/40 z-[100]"
      aria-label="Contactar por WhatsApp"
      initial={{
        scale: withReducedMotion(prefersReducedMotion, 0.9, 1),
        opacity: withReducedMotion(prefersReducedMotion, 0, 1),
      }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: withReducedMotion(prefersReducedMotion, 0.8, 0), 
        duration: withReducedMotion(prefersReducedMotion, MOTION_DURATION.smooth, 0.01),
        ease: MOTION_EASE_STANDARD,
      }}
      whileHover={{ 
        scale: withReducedMotion(prefersReducedMotion, 1.06, 1),
        boxShadow: "0 0 22px rgba(37, 211, 102, 0.35)"
      }}
      whileTap={{ scale: withReducedMotion(prefersReducedMotion, 0.97, 1) }}
    >
      {/* Pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ 
          scale: withReducedMotion(prefersReducedMotion, [1, 1.25, 1.25], 1),
          opacity: withReducedMotion(prefersReducedMotion, [0.24, 0, 0], 0)
        }}
        transition={{ 
          duration: 2.4, 
          repeat: withReducedMotion(prefersReducedMotion, Infinity, 0),
          ease: MOTION_EASE_STANDARD,
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ 
          scale: withReducedMotion(prefersReducedMotion, [1, 1.25, 1.25], 1),
          opacity: withReducedMotion(prefersReducedMotion, [0.24, 0, 0], 0)
        }}
        transition={{ 
          duration: 2.4,
          repeat: withReducedMotion(prefersReducedMotion, Infinity, 0),
          ease: MOTION_EASE_STANDARD,
          delay: 0.8,
        }}
      />
      <motion.span 
        className="material-symbols-outlined text-4xl relative z-10"
        animate={{ rotate: withReducedMotion(prefersReducedMotion, [0, 4, -4, 0], 0) }}
        transition={{ 
          duration: 0.6,
          repeat: withReducedMotion(prefersReducedMotion, Infinity, 0),
          repeatDelay: 4,
          ease: MOTION_EASE_STANDARD,
        }}
      >
        chat
      </motion.span>
    </motion.a>
  )
}
