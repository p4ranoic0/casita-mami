import { Link } from 'react-router-dom'

export default function Confirmacion() {
  return (
    <main className="max-w-[960px] mx-auto px-6 py-20 text-center">
      {/* Success Animation */}
      <div className="mb-10 relative">
        <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
        </div>
      </div>

      {/* Main Message */}
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-text-main">
        ¡Solicitud Recibida!
      </h1>
      <p className="text-xl text-text-muted max-w-xl mx-auto mb-8">
        Hemos recibido tu solicitud de pre-inscripción. Nos pondremos en contacto contigo muy pronto.
      </p>

      {/* Confirmation Details Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-10 max-w-2xl mx-auto mb-10 text-left">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary">info</span>
          <h2 className="text-xl font-bold">Detalles de tu Solicitud</h2>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-text-muted">Número de Solicitud:</span>
            <span className="font-bold text-primary">#PRE-2025-00XX</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-text-muted">Fecha de Registro:</span>
            <span className="font-semibold">{new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-text-muted">Estado:</span>
            <span className="bg-accent-lime/30 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Pendiente de Revisión</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-text-muted">Tiempo de Respuesta Estimado:</span>
            <span className="font-semibold">24 - 48 horas</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-background-light rounded-3xl p-8 md:p-10 max-w-2xl mx-auto mb-10 text-left">
        <h3 className="text-lg font-bold mb-6 text-center">¿Qué sigue ahora?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">mark_email_read</span>
            </div>
            <h4 className="font-bold mb-1">Revisa tu Email</h4>
            <p className="text-xs text-text-muted">Enviaremos una copia de tu solicitud y próximos pasos.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">phone_in_talk</span>
            </div>
            <h4 className="font-bold mb-1">Espera Nuestra Llamada</h4>
            <p className="text-xs text-text-muted">Un asesor te contactará para agendar una visita guiada.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">folder_open</span>
            </div>
            <h4 className="font-bold mb-1">Prepara Documentos</h4>
            <p className="text-xs text-text-muted">Ten listos DNI, partida de nacimiento y fotos tamaño carnet.</p>
          </div>
        </div>
      </div>

      {/* Contact & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <Link 
          to="/"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">home</span>
          Volver al Inicio
        </Link>
        <a 
          href="https://wa.me/51988238378"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined">chat</span>
          Contactar por WhatsApp
        </a>
      </div>

      {/* Social Follow */}
      <div className="border-t border-gray-200 pt-10">
        <p className="text-text-muted mb-4">Síguenos en redes para más novedades:</p>
        <div className="flex justify-center gap-4">
          <a 
            href="#"
            className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a 
            href="#"
            className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
            </svg>
          </a>
          <a 
            href="#"
            className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
    </main>
  )
}
