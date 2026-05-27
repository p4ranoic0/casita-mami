import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroQuickAnswers
 * ----------------------------------------------------------------------------
 * Strip de 5 píldoras con las preguntas que el visitante trae en mente.
 * Al hacer click sobre una, se expande debajo la respuesta + CTA dirigido.
 *
 * Diseño:
 *  - Se monta como "card flotante" justo debajo del hero (overlap -20px).
 *  - Cada chip usa un color distinto de la paleta de marca → además funciona
 *    como muestrario visual de la paleta en la primera pantalla.
 *
 * Tailwind: requiere los tokens nuevos (primary, accent-pink, accent-sky,
 * accent-butter) definidos en `tailwind.config.js`.
 */

const QUESTIONS = [
  {
    q: '¿Hay vacantes?',
    icon: 'event_available',
    accent: 'primary',
    a: 'Sí, tenemos vacantes limitadas en sala de 2 y 3 años para el ciclo en curso. Te confirmamos por WhatsApp al momento.',
    cta: {
      label: 'Consultar por WhatsApp',
      href: 'https://api.whatsapp.com/send?phone=51908880326',
      external: true,
    },
  },
  {
    q: '¿Cuánto cuesta?',
    icon: 'payments',
    accent: 'accent-pink',
    a: 'Nido: S/ 690 al mes (mañana). Guardería plan completo: S/ 1 150. Incluye material y talleres regulares.',
    cta: { label: 'Ver detalle de servicios', to: '/servicios' },
  },
  {
    q: '¿Desde qué edad?',
    icon: 'child_care',
    accent: 'accent-sky',
    a: 'Recibimos niños desde los 3 meses (sala de cunas) hasta los 5 años en aulas por nivel.',
    cta: { label: 'Ver servicios por edad', to: '/servicios' },
  },
  {
    q: '¿Qué horario manejan?',
    icon: 'schedule',
    accent: 'accent-butter',
    a: 'Nido 8:00 a.m. – 1:00 p.m. Guardería 8:00 a.m. – 6:00 p.m. Lunes a viernes. Sábados con cita previa.',
    cta: { label: 'Coordinar visita', to: '/contacto' },
  },
  {
    q: '¿Dónde están?',
    icon: 'location_on',
    accent: 'primary',
    a: 'Calle Morropón 105, zona residencial de Santiago de Surco. Te compartimos referencias exactas por WhatsApp.',
    cta: {
      label: 'Abrir en Google Maps',
      href: 'https://www.google.com/maps/search/?api=1&query=Calle+Morropon+105+Santiago+de+Surco',
      external: true,
    },
  },
]

// Mapa de acento → clases Tailwind (text + bg + ring). Lo hacemos explícito
// para que el JIT de Tailwind no purgue las clases dinámicas.
const accentClasses = {
  'primary':       { text: 'text-primary',       bg: 'bg-primary',       softBg: 'bg-primary/10',       ring: 'ring-primary/30',       border: 'border-primary' },
  'accent-pink':   { text: 'text-accent-pink',   bg: 'bg-accent-pink',   softBg: 'bg-accent-pink/15',   ring: 'ring-accent-pink/30',   border: 'border-accent-pink' },
  'accent-sky':    { text: 'text-accent-sky',    bg: 'bg-accent-sky',    softBg: 'bg-accent-sky/15',    ring: 'ring-accent-sky/30',    border: 'border-accent-sky' },
  'accent-butter': { text: 'text-accent-butter', bg: 'bg-accent-butter', softBg: 'bg-accent-butter/20', ring: 'ring-accent-butter/40', border: 'border-accent-butter' },
}

export default function HeroQuickAnswers() {
  const [open, setOpen] = useState(null)

  return (
    <section className="px-4 md:px-10 -mt-5 md:-mt-6 relative z-10">
      <div className="max-w-[1240px] mx-auto bg-white rounded-3xl border border-primary/15 shadow-soft px-5 py-5 md:px-6 md:py-5">
        <div className="flex items-center gap-2 mb-4 text-[11px] md:text-xs font-bold text-text-muted uppercase tracking-wider">
          <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
          Respuestas rápidas — sin moverte de aquí
        </div>

        <div className="flex flex-wrap gap-2">
          {QUESTIONS.map((qi, i) => {
            const a = accentClasses[qi.accent]
            const active = open === i
            return (
              <button
                key={i}
                onClick={() => setOpen(active ? null : i)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-colors border-[1.5px]
                  ${active
                    ? `${a.bg} text-white ${a.border}`
                    : `bg-transparent text-text-main border-gray-200 hover:${a.softBg}`}`}
              >
                <span className={`material-symbols-outlined text-[18px] ${active ? 'text-white' : a.text}`}>
                  {qi.icon}
                </span>
                {qi.q}
              </button>
            )
          })}
        </div>

        {open !== null && (
          <div
            key={open}
            className={`mt-4 p-5 rounded-2xl border ${accentClasses[QUESTIONS[open].accent].softBg} ${accentClasses[QUESTIONS[open].accent].ring} ring-1 ring-inset flex flex-wrap items-start justify-between gap-5 animate-[fadeSlide_220ms_ease]`}
          >
            <div className="flex-1 min-w-[240px]">
              <div className="font-display text-xl md:text-2xl font-semibold text-text-main mb-1.5 tracking-tight">
                {QUESTIONS[open].q}
              </div>
              <p className="text-[15px] leading-relaxed text-text-muted m-0">
                {QUESTIONS[open].a}
              </p>
            </div>
            {QUESTIONS[open].cta && (
              QUESTIONS[open].cta.external ? (
                <a
                  href={QUESTIONS[open].cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`whitespace-nowrap px-5 py-3 rounded-xl font-bold text-sm text-white ${accentClasses[QUESTIONS[open].accent].bg}`}
                >
                  {QUESTIONS[open].cta.label} →
                </a>
              ) : (
                <Link
                  to={QUESTIONS[open].cta.to}
                  className={`whitespace-nowrap px-5 py-3 rounded-xl font-bold text-sm text-white ${accentClasses[QUESTIONS[open].accent].bg}`}
                >
                  {QUESTIONS[open].cta.label} →
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  )
}
