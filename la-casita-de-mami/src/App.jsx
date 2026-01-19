import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Identidad from './pages/Identidad'
import Talleres from './pages/Talleres'
import Admision from './pages/Admision'
import Servicios from './pages/Servicios'
import Ubicacion from './pages/Ubicacion'
import Familias from './pages/Familias'
import Formulario from './pages/Formulario'
import Confirmacion from './pages/Confirmacion'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="identidad" element={<Identidad />} />
        <Route path="talleres" element={<Talleres />} />
        <Route path="admision" element={<Admision />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="ubicacion" element={<Ubicacion />} />
        <Route path="familias" element={<Familias />} />
        <Route path="formulario" element={<Formulario />} />
        <Route path="confirmacion" element={<Confirmacion />} />
      </Route>
    </Routes>
  )
}

export default App
