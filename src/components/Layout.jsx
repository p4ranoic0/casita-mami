import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// Páginas que maneja el router del sitio. Galería es la app aparte en /galeria/.
const ROUTES = { inicio: '/', servicios: '/servicios', contacto: '/contacto' }
const CURRENT = { '/': 'inicio', '/servicios': 'servicios', '/contacto': 'contacto' }

export default function Layout() {
  const { pathname, hash } = useLocation()
  // Al cambiar de página, arriba. Si hay #ancla (p. ej. /servicios#tarde) la
  // página decide qué hacer con ella.
  useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash])
  return (
    <div className="db">
      <Header current={CURRENT[pathname]} routes={ROUTES} />
      <Outlet />
      <Footer routes={ROUTES} />
    </div>
  )
}
