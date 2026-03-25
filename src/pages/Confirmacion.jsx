import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MOTION_DURATION, MOTION_EASE_STANDARD } from '../utils/motionTokens'

export default function Confirmacion() {
  const [confirmationData, setConfirmationData] = useState(null)

  useEffect(() => {
    const data = sessionStorage.getItem('lastFormSubmission')
    if (data) {
      setConfirmationData(JSON.parse(data))
      sessionStorage.removeItem('lastFormSubmission')
    }
  }, [])

  return (
    <main className="mx-auto w-full max-w-[960px] px-4 md:px-10 py-16 md:py-20">
      {/* Success Animation */}
      <motion.div
        className="mb-12 relative flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }}
      >
        <div className="relative">
          <motion.div
            className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 bg-primary rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Message */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: MOTION_DURATION.base, ease: MOTION_EASE_STANDARD }}
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-text-main">
          ¡Solicitud Recibida!
        </h1>
        <p className="text-lg text-text-muted max-w-xl mx-auto">
          Hemos recibido tu solicitud de pre-inscripción. Nos pondremos en contacto contigo muy pronto para completar el proceso.
        </p>
      </motion.div>

      {/* Confirmation Details Card */}
      <motion.div
        className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-10 max-w-2xl mx-auto mb-10 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-2xl">info</span>
          <h2 className="text-xl font-bold">Detalles de tu Solicitud</h2>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-text-muted">Número de Solicitud:</span>
            <span className="font-bold text-primary">
              #PRE-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 10000)).padStart(4, '0')}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-text-muted">Fecha de Registro:</span>
            <span className="font-semibold">
              {new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-text-muted">Niño/a:</span>
            <span className="font-semibold">{confirmationData?.studentFullName || 'Solicitud recibida'}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-text-muted">Estado:</span>
            <span className="bg-accent-lime/30 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
              Pendiente de Revisión
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>📧 Confirmación:</strong> Hemos enviado un correo a {confirmationData?.parentEmail || 'tu correo'} con todos los detalles.
          </p>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        className="bg-background-light rounded-3xl p-8 md:p-10 max-w-2xl mx-auto mb-12 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: MOTION_DURATION.smooth, ease: MOTION_EASE_STANDARD }}
      >
        <h3 className="text-lg font-bold mb-6 text-center">¿Qué sigue ahora?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-gray-100"
            whileHover={{ y: -2 }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <h4 className="font-bold">24 - 48 Horas</h4>
            <p className="text-sm text-text-muted">Nuestro equipo revisará tu solicitud de forma cuidadosa.</p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-gray-100"
            whileHover={{ y: -2 }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">phone_in_talk</span>
            </div>
            <h4 className="font-bold">Contacto Directo</h4>
            <p className="text-sm text-text-muted">Te llamaremos para confirmar disponibilidad y agendar visita.</p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-gray-100"
            whileHover={{ y: -2 }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <h4 className="font-bold">Visita Guiada</h4>
            <p className="text-sm text-text-muted">Conocerás nuestros espacios y equipo pedagógico en persona.</p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-gray-100"
            whileHover={{ y: -2 }}
            transition={{ duration: MOTION_DURATION.quick }}
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <h4 className="font-bold">Completar Admisión</h4>
            <p className="text-sm text-text-muted">Finalizamos el proceso con documentación y orientación.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact & Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: MOTION_DURATION.base }}
      >
        <Link
          to="/"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <span className="material-symbols-outlined">home</span>
          Volver al Inicio
        </Link>
        <a
          href="https://wa.me/51908880326"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <span className="material-symbols-outlined">chat</span>
          Contactar por WhatsApp
        </a>
      </motion.div>

      {/* Help Box */}
      <motion.div
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: MOTION_DURATION.base }}
      >
        <h3 className="text-lg font-bold mb-4">¿Necesitas Ayuda?</h3>
        <p className="text-text-muted mb-6">
          Si tienes dudas sobre tu solicitud o necesitas información adicional, no dudes en contactarnos:
        </p>
        <div className="space-y-3">
          <a
            href="tel:+51908880326"
            className="block p-4 bg-background-light rounded-xl text-text-main font-semibold hover:bg-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined mr-2 align-middle">call</span>
            +51 908 880 326
          </a>
          <a
            href="https://wa.me/51908880326"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-green-50 rounded-xl text-green-700 font-semibold hover:bg-green-100 transition-colors"
          >
            <span className="material-symbols-outlined mr-2 align-middle">chat</span>
            WhatsApp: +51 908 880 326
          </a>
          <a
            href="mailto:lacasitademamisurco@gmail.com"
            className="block p-4 bg-blue-50 rounded-xl text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
          >
            <span className="material-symbols-outlined mr-2 align-middle">mail</span>
            lacasitademamisurco@gmail.com
          </a>
        </div>
        <p className="text-xs text-text-muted mt-6">
          Lunes a Viernes · 8:00 a.m. a 6:00 p.m.
        </p>
      </motion.div>
    </main>
  )
}
