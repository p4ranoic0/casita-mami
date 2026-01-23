import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/identidad', label: 'Identidad' },
    { to: '/talleres', label: 'Talleres' },
    { to: '/admision', label: 'Admisión' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/ubicacion', label: 'Contacto' },
  ]

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#f1f4f4]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="px-4 md:px-10 py-3 max-w-[1280px] mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div 
            className="size-8 rounded-full bg-primary flex items-center justify-center text-white"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
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
                transition={{ delay: index * 0.1 }}
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
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/formulario"
              className="bg-primary hover:bg-primary-dark transition-colors text-text-main font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm"
            >
              Solicitar Información
            </Link>
          </motion.div>
        </div>
        
        {/* Mobile Menu Icon */}
        <motion.button 
          className="md:hidden p-2 text-text-main"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
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
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                  to="/formulario"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary hover:bg-primary-dark text-text-main font-bold text-sm px-5 py-3 rounded-xl shadow-sm text-center mt-2 block"
                >
                  Solicitar Información
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
