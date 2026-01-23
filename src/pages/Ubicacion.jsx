import { Link } from 'react-router-dom'

export default function Ubicacion() {
  return (
    <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-20 py-10">
      {/* Hero Section */}
      <section className="mb-12">
        <div 
          className="relative overflow-hidden rounded-2xl bg-cover bg-center min-h-[280px] flex flex-col items-center justify-center text-center p-8"
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAU5pfUnRQFLnIAjTMqKDDS5VkeSte1YOX5EL30Nk2sYJ_sh2xz5z5in_JBK0QE6J5EeHQbWnWpv3kA4xpHANixhc3dj4YDuhF-AR9Hdrt4_nxwHg3HuVlvII_NBxgWuG2LklG_JMwlJE911BMQwE0mN9WOnwFHTeQAq5tw6oBjspuh-BD2nqJCiMP3HMuwVARHVNpYEV2zw9Sty9Qjkz6pqUpUzsi30rqtELdfhjyU0u4YLFG3AyoQAfNAzHwI25m2Upfi6oJ-2DE9")` }}
        >
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4 tracking-tight">Visítanos en Surco</h1>
          <p className="text-white/90 text-lg max-w-xl font-medium">Estamos en una zona segura, tranquila y accesible para tu familia.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Address Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/20 text-text-main rounded-lg">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Nuestra Dirección</h3>
                <p className="text-text-muted text-sm leading-relaxed mt-1">
                  Calle Morropon 105, Santiago de Surco, Lima.
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 w-full justify-center py-2 px-4 bg-background-light rounded-lg text-sm font-semibold hover:bg-primary/30 transition-colors">
              <span className="material-symbols-outlined text-sm">content_copy</span>
              Copiar Dirección
            </button>
          </div>

          {/* Directions Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">directions_car</span>
              ¿Cómo llegar?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1.5 h-auto bg-primary/30 rounded-full"></div>
                <p className="text-sm text-text-muted">
                  <strong>Referencias:</strong> Ubicados a pocas cuadras de la Av. Benavides y Av. Velasco Astete. Zona residencial muy tranquila.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-auto bg-accent-lime/30 rounded-full"></div>
                <p className="text-sm text-text-muted">
                  <strong>Estacionamiento:</strong> Contamos con espacios reservados frente al local para la entrega y recojo seguro de los niños.
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">schedule</span>
              Horario de Atención
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-2 font-medium">Lunes a Viernes</td>
                  <td className="py-2 text-right text-text-muted">8:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Sábados</td>
                  <td className="py-2 text-right text-text-muted">Previa Cita</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Contact Card */}
          <div className="bg-text-main p-6 rounded-xl text-white shadow-lg shadow-black/5">
            <h3 className="font-bold text-lg mb-4">Contacto Directo</h3>
            <div className="space-y-3">
              <a 
                href="tel:+51908880326"
                className="flex items-center justify-between group p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">call</span>
                  <span>908 880 326</span>
                </div>
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=51908880326"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#25D366]">chat</span>
                  <span>WhatsApp</span>
                </div>
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
              </a>
              <a 
                href="mailto:lacasitademamisurco@gmail.com"
                className="flex items-center justify-between group p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <span>lacasitademamisurco@gmail.com</span>
                </div>
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
              </a>
              <a 
                href="https://www.instagram.com/lacasitademami"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-pink-500">photo_camera</span>
                  <span>@lacasitademami</span>
                </div>
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
              </a>
              <a 
                href="https://www.tiktok.com/@lacasitademamisur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-white">music_note</span>
                  <span>@lacasitademamisur</span>
                </div>
                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex-1 min-h-[500px] relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
            {/* Map Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRpk9YDzTm-TMw1GvCui1RmfJg6B-ZRUN5jm7M-4J2FmDAVg31lXs3qKUtg3VbWeGuhsBtRCNwz3EcXhTomVxAM9uB_1ucpLyrVMT_qXRHxsHKakNzXcyAJ6UVP0xiXBiCnH_DCgDm3AusuGLYF0otPehHEZ6Yvq-nxPVcH5U60Qo7J4WElRLjorHTTl2vardwHgIB2bVwv2n40--j3ajBUgMxNlpAFCH3V4KiuAyoFOFI08ntOngJIXkfRziaRauT4NEqUr0C73qs')" }}
            ></div>

            {/* Map Controls Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
              <div className="pointer-events-auto w-full max-w-xs">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
                  <input 
                    type="text"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-white/95 shadow-lg focus:ring-2 focus:ring-primary text-sm font-medium"
                    placeholder="Buscar direcciones..."
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 pointer-events-auto">
                <button className="size-10 flex items-center justify-center bg-white rounded-lg shadow-lg">
                  <span className="material-symbols-outlined">add</span>
                </button>
                <button className="size-10 flex items-center justify-center bg-white rounded-lg shadow-lg">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <button className="size-10 flex items-center justify-center bg-white rounded-lg shadow-lg text-primary">
                  <span className="material-symbols-outlined">my_location</span>
                </button>
              </div>
            </div>

            {/* Map Pin Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex flex-col items-center group pointer-events-auto cursor-pointer">
                <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold mb-1 border border-primary">La Casita de Mami</div>
                <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <div className="w-3 h-3 bg-primary/40 rounded-full blur-[2px] animate-pulse"></div>
              </div>
            </div>

            {/* Open in Google Maps Link */}
            <a 
              href="https://goo.gl/maps/xyz" 
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold text-text-main border border-gray-100"
            >
              <span className="material-symbols-outlined text-sm">map</span>
              Abrir en Google Maps
            </a>
          </div>

          {/* Call to Action */}
          <div className="bg-primary p-1 rounded-2xl">
            <div className="bg-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h4 className="text-xl font-bold">¿Te gustaría conocernos en persona?</h4>
                <p className="text-text-muted">Coordina una visita guiada para ver nuestras instalaciones.</p>
              </div>
              <Link 
                to="/formulario"
                className="bg-primary hover:bg-primary/90 text-text-main px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Agendar Visita Guiada
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
