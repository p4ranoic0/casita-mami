import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  return (
    <motion.a 
      href="https://api.whatsapp.com/send?phone=51908880326" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 size-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 z-[100]"
      aria-label="Contactar por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 1, 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      whileHover={{ 
        scale: 1.15,
        boxShadow: "0 0 30px rgba(37, 211, 102, 0.6)"
      }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ 
          scale: [1, 1.4, 1.4],
          opacity: [0.5, 0, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ 
          scale: [1, 1.4, 1.4],
          opacity: [0.5, 0, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
      />
      <motion.span 
        className="material-symbols-outlined text-4xl relative z-10"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ 
          duration: 0.5, 
          repeat: Infinity, 
          repeatDelay: 3 
        }}
      >
        chat
      </motion.span>
    </motion.a>
  )
}
