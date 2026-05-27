import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE_STANDARD,
  withReducedMotion,
} from '../utils/motionTokens'

const navLinks = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/servicios', label: 'Servicios', icon: 'school' },
  { to: '/contacto', label: 'Contacto', icon: 'place' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-primary/15 bg-white/85 shadow-soft backdrop-saturate-150 backdrop-blur-xl'
          : 'border-b border-transparent bg-white/95 backdrop-blur-md'
      }`}
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
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-6 py-3.5">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            className="flex size-11 items-center justify-center rounded-full bg-primary/5 p-0.5 shadow-soft"
            whileHover={{ scale: withReducedMotion(prefersReducedMotion, 1.04, 1) }}
            whileTap={{ scale: withReducedMotion(prefersReducedMotion, 0.98, 1) }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="La Casita de Mami"
              className="size-10 rounded-full object-cover"
            />
          </motion.div>
          <div className="leading-tight">
            <h2 className="font-display text-lg font-bold tracking-tight text-primary">La Casita de Mami</h2>
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">Nido · Guardería · Surco</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  isActive ? 'bg-primary text-white shadow-button-sm' : 'text-text-main hover:bg-primary-soft'
                }`
              }
            >
              <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="tel:+51908880326"
            className="inline-flex items-center gap-1.5 rounded-xl border-[1.5px] border-primary/20 px-3.5 py-2.5 text-[13px] font-semibold text-text-main hover:bg-primary-soft"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            908 880 326
          </a>
          <motion.div
            whileHover={{ scale: withReducedMotion(prefersReducedMotion, 1.02, 1) }}
            whileTap={{ scale: withReducedMotion(prefersReducedMotion, 0.98, 1) }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <Link
              to="/contacto"
              className="rounded-xl bg-primary px-4 py-2.5 text-[13px] font-bold text-white shadow-button-sm hover:bg-primary-dark"
            >
              Agendar visita
            </Link>
          </motion.div>
        </div>

        {/* Mobile burger */}
        <motion.button
          className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: withReducedMotion(prefersReducedMotion, 0.95, 1) }}
          aria-label="Abrir menú"
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="overflow-hidden border-t border-primary/10 bg-white px-6 py-3 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: withReducedMotion(prefersReducedMotion, MOTION_DURATION.base, 0.01),
              ease: MOTION_EASE_STANDARD,
            }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition ${
                      isActive ? 'bg-primary-soft text-primary' : 'text-text-main'
                    }`
                  }
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 block rounded-xl bg-primary px-4 py-3.5 text-center font-bold text-white shadow-button"
              >
                Agendar visita
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
