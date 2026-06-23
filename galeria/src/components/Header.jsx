import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const DURATION_SMOOTH = 0.45
const DURATION_QUICK = 0.18
const DURATION_BASE = 0.25
const EASE_STANDARD = [0.4, 0, 0.2, 1]
const DISTANCE_MD = 12

const navLinks = [
  { href: '/', label: 'Inicio', icon: 'home' },
  { href: '/servicios', label: 'Servicios', icon: 'school' },
  { href: '/contacto', label: 'Contacto', icon: 'place' },
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

  const rm = (val, fallback) => (prefersReducedMotion ? fallback : val)

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-primary/15 bg-white/85 shadow-soft backdrop-saturate-150 backdrop-blur-xl'
          : 'border-b border-transparent bg-white/95 backdrop-blur-md'
      }`}
      initial={{ y: rm(-DISTANCE_MD, 0), opacity: rm(0, 1) }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: rm(DURATION_SMOOTH, 0.01), ease: EASE_STANDARD }}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-6 py-3.5">
        {/* Logo → main site home */}
        <a href="/" className="flex items-center gap-3">
          <motion.div
            className="flex size-11 items-center justify-center rounded-full bg-primary/5 p-0.5 shadow-soft"
            whileHover={{ scale: rm(1.04, 1) }}
            whileTap={{ scale: rm(0.98, 1) }}
            transition={{ duration: DURATION_QUICK }}
          >
            <img
              src={import.meta.env.BASE_URL + 'logo.jpg'}
              alt="La Casita de Mami"
              className="size-10 rounded-full object-cover"
            />
          </motion.div>
          <div className="leading-tight">
            <h2 className="font-display text-lg font-bold tracking-tight text-primary">La Casita de Mami</h2>
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">Nido · Guardería · Surco</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-text-main transition hover:bg-primary-soft"
            >
              <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
              {link.label}
            </a>
          ))}
          {/* Galería — active item */}
          <a
            href="/galeria/"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-button-sm"
          >
            <span className="material-symbols-outlined text-[18px]">collections</span>
            Galería
          </a>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="tel:+51908880326"
            className="inline-flex items-center gap-1.5 rounded-xl border-[1.5px] border-primary/20 px-3.5 py-2.5 text-[13px] font-semibold text-text-main hover:bg-primary-soft"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            908 880 326
          </a>
          <motion.div
            whileHover={{ scale: rm(1.02, 1) }}
            whileTap={{ scale: rm(0.98, 1) }}
            transition={{ duration: DURATION_QUICK }}
          >
            <a
              href="/contacto"
              className="rounded-xl bg-primary px-4 py-2.5 text-[13px] font-bold text-white shadow-button-sm hover:bg-primary-dark"
            >
              Agendar visita
            </a>
          </motion.div>
        </div>

        {/* Mobile burger */}
        <motion.button
          className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: rm(0.95, 1) }}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="overflow-hidden border-t border-primary/10 bg-white px-6 py-3 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: rm(DURATION_BASE, 0.01), ease: EASE_STANDARD }}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-text-main transition"
                >
                  <span className="material-symbols-outlined">{link.icon}</span>
                  {link.label}
                </a>
              ))}
              {/* Galería — active on mobile */}
              <a
                href="/galeria/"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-3 rounded-xl bg-primary-soft px-3 py-3 text-base font-semibold text-primary transition"
              >
                <span className="material-symbols-outlined">collections</span>
                Galería
              </a>
              <a
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 block rounded-xl bg-primary px-4 py-3.5 text-center font-bold text-white shadow-button"
              >
                Agendar visita
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
