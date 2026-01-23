import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-background-light text-text-main font-display antialiased overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
