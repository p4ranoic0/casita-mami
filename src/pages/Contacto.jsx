import { useState } from 'react'
import { Link } from 'react-router-dom'
import SimpleModal from '../components/SimpleModal'
import contactHero from '../assets/contact/contacto-galeria-02.jpeg'

const channels = [
  {
    icon: 'call',
    label: 'Teléfono',
    value: '+51 908 880 326',
    href: 'tel:+51908880326',
    iconBg: 'bg-primary/15',
    iconText: 'text-primary',
    external: false,
  },
  {
    icon: 'chat',
    label: 'WhatsApp',
    value: 'Respuesta el mismo día',
    href: 'https://api.whatsapp.com/send?phone=51908880326',
    iconBg: 'bg-[#25D366]/20',
    iconText: 'text-[#1c8b48]',
    external: true,
  },
  {
    icon: 'mail',
    label: 'Correo',
    value: 'lacasitademamisurco@gmail.com',
    href: 'mailto:lacasitademamisurco@gmail.com',
    iconBg: 'bg-accent-sky/30',
    iconText: 'text-accent-sky',
    external: false,
  },
  {
    icon: 'location_on',
    label: 'Dirección',
    value: 'Calle Morropón 105, Santiago de Surco',
    href: 'https://www.google.com/maps/search/?api=1&query=Calle+Morropon+105+Santiago+de+Surco',
    iconBg: 'bg-accent-pink/25',
    iconText: 'text-accent-pink',
    external: true,
  },
]

export default function Contacto() {
  const [openVisitModal, setOpenVisitModal] = useState(false)

  return (
    <main className="mx-auto w-full max-w-[1240px] px-6 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 pt-8 text-sm text-text-muted">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span>›</span>
        <span className="font-semibold text-text-main">Contacto</span>
      </div>

      {/* HERO */}
      <section className="py-4 md:py-6">
        <div className="grid overflow-hidden rounded-[28px] border border-primary/15 bg-white md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-4 p-10 md:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-primary">
              Hablemos
            </span>
            <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-text-main md:text-[52px]">
              Estamos cerca, <em className="font-display italic font-medium text-primary">en Surco.</em>
            </h1>
            <p className="text-lg leading-relaxed text-text-muted">
              Llamada, WhatsApp o visita guiada — el canal que más te acomode.
            </p>

            <div className="mt-3 flex flex-col gap-2.5">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-3.5 rounded-2xl border border-primary/15 bg-white px-4 py-3.5 transition hover:translate-x-0.5 hover:bg-primary-soft"
                >
                  <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${c.iconBg}`}>
                    <span className={`material-symbols-outlined ${c.iconText}`}>{c.icon}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-text-muted">{c.label}</div>
                    <div className="truncate text-[15px] font-semibold text-text-main">{c.value}</div>
                  </div>
                  <span className="material-symbols-outlined text-text-muted">arrow_forward</span>
                </a>
              ))}
            </div>

            <button
              onClick={() => setOpenVisitModal(true)}
              className="mt-3 inline-block self-start rounded-2xl bg-primary px-6 py-3.5 font-bold text-white shadow-button hover:bg-primary-dark"
            >
              Agendar visita guiada
            </button>
          </div>

          <div className="relative min-h-[420px]">
            <img src={contactHero} alt="Zona de recepción para visitas" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-soft backdrop-blur">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-text-muted">Horario de atención</div>
                <div className="text-sm font-bold text-text-main">Lunes a viernes · 8:00 a.m. – 6:00 p.m.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="grid gap-4 py-5 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-3 rounded-3xl border border-primary/15 bg-white p-8 md:p-9">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-text-main md:text-[28px]">Ubicación</h2>
          <p className="leading-relaxed text-text-muted">
            Zona residencial de fácil acceso en Surco. Escríbenos y te compartimos el punto exacto por WhatsApp con referencias.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Calle+Morropon+105+Santiago+de+Surco"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-2xl border-[1.5px] border-primary/20 px-5 py-3 font-bold text-text-main hover:bg-primary/5"
          >
            <span className="material-symbols-outlined text-primary">open_in_new</span>
            Abrir Google Maps
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl border border-primary/15 bg-white">
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
          <button type="button" className="rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary-dark">
            Enviar por WhatsApp
          </button>
        </form>
      </SimpleModal>
    </main>
  )
}
