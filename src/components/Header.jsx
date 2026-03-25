import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE_STANDARD,
  withReducedMotion,
} from '../utils/motionTokens'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#f1f4f4]"
      initial={{
        y: withReducedMotion(prefersReducedMotion, -MOTION_DISTANCE.md, 0),
        opacity: withReducedMotion(prefersReducedMotion, 0, 1),
      }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: withReducedMotion(prefersReducedMotion, MOTION_DURATION.smooth, 0.01),
        ease: MOTION_EASE_STANDARD,
      }}
    >
      <div className="px-4 md:px-10 py-3 max-w-[1280px] mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div 
            className="size-8 rounded-full bg-primary flex items-center justify-center text-white"
            whileHover={{ scale: withReducedMotion(prefersReducedMotion, 1.04, 1) }}
            whileTap={{ scale: withReducedMotion(prefersReducedMotion, 0.98, 1) }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <span className="material-symbols-outlined text-[20px]">child_care</span>
          </motion.div>
          <h2 className="text-text-main text-lg font-bold leading-tight tracking-tight">La Casita de Mami</h2>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: withReducedMotion(prefersReducedMotion, index * 0.08, 0),
                  duration: MOTION_DURATION.base,
                  ease: MOTION_EASE_STANDARD,
                }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors relative ${
                      isActive ? 'text-primary font-semibold' : 'text-text-muted hover:text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                          layoutId="activeTab"
                          transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_STANDARD }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <motion.div
            whileHover={{ scale: withReducedMotion(prefersReducedMotion, 1.02, 1) }}
            whileTap={{ scale: withReducedMotion(prefersReducedMotion, 0.98, 1) }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <Link 
              to="/contacto"
              className="bg-primary hover:bg-primary-dark transition-colors text-text-main font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm"
            >
              Agendar Visita
            </Link>
          </motion.div>
        </div>
        
        {/* Mobile Menu Icon */}
        <motion.button 
          className="md:hidden p-2 text-text-main"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: withReducedMotion(prefersReducedMotion, 0.95, 1) }}
        >
          <motion.span 
            className="material-symbols-outlined"
            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? 'close' : 'menu'}
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-gray-100 px-4 py-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: withReducedMotion(prefersReducedMotion, MOTION_DURATION.base, 0.01),
              ease: MOTION_EASE_STANDARD,
            }}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: withReducedMotion(prefersReducedMotion, index * 0.04, 0),
                    duration: MOTION_DURATION.quick,
                    ease: MOTION_EASE_STANDARD,
                  }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-base font-medium transition-colors py-2 block ${
                        isActive ? 'text-primary font-semibold' : 'text-text-muted hover:text-primary'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary hover:bg-primary-dark text-text-main font-bold text-sm px-5 py-3 rounded-xl shadow-sm text-center mt-2 block"
                >
                  Agendar Visita
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
