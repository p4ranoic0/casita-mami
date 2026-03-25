import { useState } from 'react'
import SimpleModal from '../components/SimpleModal'
import contactHero from '../assets/contact/contacto-galeria-02.jpeg'

export default function Contacto() {
  const [openVisitModal, setOpenVisitModal] = useState(false)

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-10">
      <section className="py-8 md:py-10">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-card md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
            <h1 className="text-4xl font-black text-text-main md:text-5xl">Contacto</h1>
            <p className="text-lg text-text-muted">
              Estamos en Surco y te atendemos por llamada, WhatsApp o visita guiada. Todo en un solo lugar.
            </p>
            <div className="space-y-2 text-text-main">
              <p><strong>Dirección:</strong> Calle Morropon 105, Santiago de Surco</p>
              <p><strong>Teléfono:</strong> +51 908 880 326</p>
              <p><strong>Correo:</strong> lacasitademamisurco@gmail.com</p>
              <p><strong>Horario:</strong> Lunes a viernes · 8:00 a.m. a 6:00 p.m.</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="tel:+51908880326" className="rounded-xl bg-primary px-5 py-3 font-bold text-text-main hover:bg-primary-dark">
                Llamar
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=51908880326"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white hover:brightness-95"
              >
                WhatsApp
              </a>
              <button
                className="rounded-xl bg-background-dark px-5 py-3 font-bold text-white hover:bg-[#1c2f2c]"
                onClick={() => setOpenVisitModal(true)}
              >
                Agendar visita
              </button>
            </div>
          </div>
          <img src={contactHero} alt="Zona de recepción para visitas" className="h-full min-h-[320px] w-full object-cover" />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-2xl font-bold text-text-main">Ubicación</h2>
          <p className="mt-3 text-text-muted">
            Referencia: zona residencial de fácil acceso en Surco. Puedes escribirnos y te compartimos punto exacto por WhatsApp.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Calle+Morropon+105+Santiago+de+Surco"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl border border-primary/30 px-4 py-2.5 font-semibold text-text-main hover:bg-primary/10"
          >
            Abrir Google Maps
          </a>
        </article>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <iframe
            title="Mapa de La Casita de Mami"
            src="https://www.google.com/maps?q=Calle+Morropon+105,+Santiago+de+Surco,+Lima&output=embed"
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <SimpleModal isOpen={openVisitModal} onClose={() => setOpenVisitModal(false)} title="Agendar visita rápida">
        <form className="grid gap-3">
          <input className="rounded-xl border border-gray-200 px-4 py-3" placeholder="Nombre y apellido" />
          <input className="rounded-xl border border-gray-200 px-4 py-3" placeholder="Teléfono" />
          <input className="rounded-xl border border-gray-200 px-4 py-3" placeholder="Edad del niño(a)" />
          <textarea className="min-h-24 rounded-xl border border-gray-200 px-4 py-3" placeholder="Horario sugerido para visitar" />
          <button type="button" className="rounded-xl bg-primary px-6 py-3 font-bold text-text-main hover:bg-primary-dark">
            Enviar por WhatsApp
          </button>
        </form>
      </SimpleModal>
    </main>
  )
}
