import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#f1f4f4]">
      <div className="px-4 md:px-10 py-3 max-w-[1280px] mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">child_care</span>
          </div>
          <h2 className="text-text-main text-lg font-bold leading-tight tracking-tight">La Casita de Mami</h2>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-text-muted hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link 
            to="/formulario"
            className="bg-primary hover:bg-primary-dark transition-transform hover:scale-105 active:scale-95 text-text-main font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm"
          >
            Solicitar Información
          </Link>
        </div>
        
        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden p-2 text-text-main"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors py-2 ${
                    isActive ? 'text-primary font-semibold' : 'text-text-muted hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link 
              to="/formulario"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-primary hover:bg-primary-dark text-text-main font-bold text-sm px-5 py-3 rounded-xl shadow-sm text-center mt-2"
            >
              Solicitar Información
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
