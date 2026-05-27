import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import MobileActionBar from './MobileActionBar'
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE_STANDARD,
  withReducedMotion,
} from '../utils/motionTokens'

export default function Layout() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  const pageVariants = {
    initial: {
      opacity: withReducedMotion(prefersReducedMotion, 0, 1),
      y: withReducedMotion(prefersReducedMotion, MOTION_DISTANCE.sm, 0),
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: withReducedMotion(prefersReducedMotion, 0, 1),
      y: withReducedMotion(prefersReducedMotion, -MOTION_DISTANCE.xs, 0),
    },
  }

  const pageTransition = {
    type: 'tween',
    ease: MOTION_EASE_STANDARD,
    duration: withReducedMotion(prefersReducedMotion, MOTION_DURATION.smooth, 0.01),
  }

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-background-light text-text-main font-sans antialiased pb-[84px] md:pb-0">
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
      <MobileActionBar />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
