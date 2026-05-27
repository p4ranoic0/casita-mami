import { useState } from 'react'
import { Link } from 'react-router-dom'
import SimpleModal from '../components/SimpleModal'
import serviceImage01 from '../assets/services/servicios-galeria-01.jpeg'
import serviceImage02 from '../assets/services/servicios-galeria-02.jpeg'
import serviceImage03 from '../assets/services/servicios-galeria-03.jpeg'

const accentClasses = {
  'primary':     { text: 'text-primary',     softBg: 'bg-primary/10',     bg: 'bg-primary',     hover: 'hover:bg-primary-dark', ring: 'ring-primary/20',     dot: 'bg-primary',     pillBorder: 'border-primary',     hoverPill: 'hover:bg-primary/5' },
  'accent-pink': { text: 'text-accent-pink', softBg: 'bg-accent-pink/10', bg: 'bg-accent-pink', hover: 'hover:brightness-95',   ring: 'ring-accent-pink/30', dot: 'bg-accent-pink', pillBorder: 'border-accent-pink', hoverPill: 'hover:bg-accent-pink/10' },
  'accent-sky':  { text: 'text-accent-sky',  softBg: 'bg-accent-sky/15',  bg: 'bg-accent-sky',  hover: 'hover:brightness-95',   ring: 'ring-accent-sky/30',  dot: 'bg-accent-sky',  pillBorder: 'border-accent-sky',  hoverPill: 'hover:bg-accent-sky/10' },
}

const colorByService = {
  nido:      'accent-pink',
  guarderia: 'primary',
  bienestar: 'accent-sky',
}

const servicios = [
  {
    id: 'nido',
    title: 'Nido',
    tag: '3 a 5 años',
    horario: 'Lun a Vie · 8:00 a.m. – 1:00 p.m.',
    precio: 'S/ 690 al mes',
    image: serviceImage01,
    bullets: ['Educación inicial por edades', '12 niños por aula', 'Psicomotricidad e inglés'],
    detalle: [
      'Acompañamiento pedagógico por niveles.',
      'Rutinas de juego, lenguaje y autonomía.',
      'Comunicación constante con las familias.',
    ],
  },
  {
    id: 'guarderia',
    title: 'Guardería',
    tag: 'Desde 3 meses',
    horario: 'Lun a Vie · 8:00 a.m. – 6:00 p.m.',
    precio: 'S/ 1 150 plan completo',
    image: serviceImage02,
    bullets: ['Sala de cunas', 'Atención personalizada', 'Cámaras de seguridad'],
    detalle: [
      'Cuidado por grupos de edad.',
      'Sala de cunas y espacios de estimulación.',
      'Opcional: servicio de almuerzo.',
    ],
  },
  {
    id: 'bienestar',
    title: 'Bienestar',
    tag: 'Complementario',
    horario: 'Según calendario',
    precio: 'Incluido en programa',
    image: serviceImage03,
    bullets: ['Orientación psicopedagógica', 'Seguimiento de desarrollo', 'Apoyo a familias'],
    detalle: [
      'Acompañamiento emocional y conductual.',
      'Talleres preventivos para hábitos saludables.',
      'Recomendaciones personalizadas para casa.',
    ],
  },
]

export default function Servicios() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <main className="mx-auto w-full max-w-[1240px] px-6 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 pt-8 text-sm text-text-muted">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span>›</span>
        <span className="font-semibold text-text-main">Servicios</span>
      </div>

      {/* PAGE HERO */}
      <section className="py-4 md:py-6">
        <div className="relative overflow-hidden rounded-[28px] border border-primary/15 bg-white p-10 md:p-14">
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-2/5"
            style={{
              background:
                'linear-gradient(135deg, rgba(244,168,201,0.20), rgba(255,228,138,0.20), rgba(182,216,238,0.20))',
              clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
          <div className="relative max-w-[720px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-primary">
              3 servicios
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-text-main md:text-[56px]">
              Pensados para cada <em className="font-display italic font-medium text-primary">etapa</em>
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-text-muted">
              Nido, guardería y bienestar complementario — con horarios claros y atención cercana.
            </p>
          </div>
        </div>
      </section>

      {/* TABS (anchor nav) */}
      <section className="py-2">
        <div className="inline-flex gap-1 rounded-2xl border border-primary/15 bg-white p-1.5">
          {servicios.map((s) => {
            const a = accentClasses[colorByService[s.id]]
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-text-main transition ${a.hoverPill}`}
              >
                <span className={`size-2 rounded-full ${a.dot}`} />
                {s.title}
              </a>
            )
          })}
        </div>
      </section>

      {/* CARDS */}
      <section className="grid gap-5 py-5 md:grid-cols-3">
        {servicios.map((service) => {
          const a = accentClasses[colorByService[service.id]]
          return (
            <article
              key={service.id}
              id={service.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-primary/15 bg-white transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3]">
                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                <span className={`absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.05em] ${a.text}`}>
                  {service.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <h2 className="font-display text-[28px] font-semibold tracking-tight text-text-main">{service.title}</h2>
                <div className={`inline-flex items-center gap-1.5 text-sm font-bold ${a.text}`}>
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  {service.horario}
                </div>
                <div className="font-display text-xl font-bold text-text-main">{service.precio}</div>
                <ul className="mt-1 flex flex-col gap-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-sm text-text-muted">
                      <span className={`material-symbols-outlined text-[18px] ${a.text}`}>check_circle</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-2 pt-3">
                  <button
                    className="flex-1 rounded-xl border-[1.5px] border-primary/20 px-3 py-2.5 text-sm font-semibold text-text-main hover:bg-primary/5"
                    onClick={() => setSelectedService(service)}
                  >
                    Ver detalle
                  </button>
                  <Link
                    to="/contacto"
                    className={`flex-1 rounded-xl ${a.bg} ${a.hover} px-3 py-2.5 text-center text-sm font-bold text-white transition`}
                  >
                    Coordinar →
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      {/* HELP */}
      <section className="mt-8 grid items-center gap-6 rounded-3xl bg-primary-soft p-8 md:grid-cols-[1fr_auto] md:p-10">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-text-main md:text-[26px]">
            ¿No sabes qué opción elegir?
          </h3>
          <p className="mt-2 text-text-muted">Te orientamos por edad, horario familiar y vacantes disponibles.</p>
        </div>
        <Link
          to="/contacto"
          className="inline-block rounded-2xl bg-primary px-6 py-3.5 text-center font-bold text-white shadow-button hover:bg-primary-dark"
        >
          Hablemos →
        </Link>
      </section>

      <SimpleModal
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        title={selectedService ? `Detalle: ${selectedService.title}` : 'Detalle de servicio'}
      >
        {selectedService && (
          <div className="space-y-4 text-text-muted">
            <p><strong>Horario:</strong> {selectedService.horario}</p>
            <p><strong>Referencia de inversión:</strong> {selectedService.precio}</p>
            <ul className="space-y-2">
              {selectedService.detalle.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </SimpleModal>
    </main>
  )
}
