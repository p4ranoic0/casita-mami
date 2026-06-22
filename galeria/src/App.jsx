import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Portada from './pages/Portada.jsx'
import Album from './pages/Album.jsx'
import { pageFade } from './motion/variants.js'

function Animated({ children }) {
  return (
    <motion.div variants={pageFade} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Animated><Portada /></Animated>} />
        <Route path="/:slug" element={<Animated><Album /></Animated>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
