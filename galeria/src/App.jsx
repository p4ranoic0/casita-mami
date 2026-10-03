import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from '../../src/components/Header.jsx'
import Footer from '../../src/components/Footer.jsx'
import Portada from './pages/Portada.jsx'
import Album from './pages/Album.jsx'

// Dentro de /galeria/ el router solo maneja la galería; Inicio, Servicios y
// Contacto son enlaces normales al sitio principal.
const ROUTES = { galeria: '/' }

function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div className="db">
      <Header current="galeria" routes={ROUTES} />
      <Routes>
        <Route path="/" element={<Portada />} />
        <Route path="/:slug" element={<Album />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer routes={ROUTES} />
    </div>
  )
}

export default App
