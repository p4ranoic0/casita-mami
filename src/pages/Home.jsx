import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SimpleModal from '../components/SimpleModal'
import HeroQuickAnswers from '../components/HeroQuickAnswers'
import { MOTION_DURATION, MOTION_EASE_STANDARD, withReducedMotion } from '../utils/motionTokens'
import heroImage from '../assets/home/home-hero-aula-01.jpeg'
import ambienteImage from '../assets/home/home-ambiente-aula-02.jpeg'
import gallery01 from '../assets/home/home-galeria-01.jpeg'
import gallery02 from '../assets/home/home-galeria-02.jpeg'
import gallery03 from '../assets/home/home-galeria-03.jpeg'
import contact01 from '../assets/contact/contacto-galeria-01.jpeg'
import contact02 from '../assets/contact/contacto-galeria-02.jpeg'
import contact03 from '../assets/contact/contacto-galeria-03.jpeg'

const TRUST_STATS = [
  { n: '12+', l: 'años acompañando' },
  { n: '1:6', l: 'ratio promedio' },
  { n: '3m–5a', l: 'rango de edades' },
]

const QUICK_NAV = [
  {
    icon: 'school',
    title: 'Nuestros servicios',
    desc: 'Nido, guardería y bienestar.',
    color: 'accent-pink',
    to: '/servicios',
  },
  {
    icon: 'calendar_month',
    title: 'Agendar visita',
    desc: 'Conoce el local con dirección.',
    color: 'primary',
    to: '/contacto',
  },
  {
    icon: 'chat',
    title: 'Hablar por WhatsApp',
    desc: 'Respuesta el mismo día.',
    color: 'accent-sky',
    href: 'https://api.whatsapp.com/send?phone=51908880326',
  },
]

const quickNavStyles = {
  'accent-pink': { iconBg: 'bg-accent-pink/20', iconText: 'text-accent-pink', cta: 'text-accent-pink' },
  'primary':     { iconBg: 'bg-primary/15',     iconText: 'text-primary',     cta: 'text-primary' },
  'accent-sky':  { iconBg: 'bg-accent-sky/30',  iconText: 'text-accent-sky',  cta: 'text-accent-sky' },
}

export default function Home() {
  const [openModal, setOpenModal] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const galleryImages = [
    { src: gallery01, alt: 'Ambiente educativo 1' },
    { src: gallery02, alt: 'Ambiente educativo 2' },
    { src: gallery03, alt: 'Ambiente educativo 3' },
    { src: contact01, alt: 'Espacio educativo y zona de actividades' },
    { src: contact02, alt: 'Recepción y bienvenida para familias' },
    { src: contact03, alt: 'Aula de aprendizaje para inicial' },
  ]

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <main className="mx-auto w-full max-w-[1240px] px-6 pb-16">
      {/* HERO */}
      <section className="py-8 md:py-12">
        <div className="grid overflow-hidden rounded-[32px] bg-white border border-primary/15 shadow-brand md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-center gap-5 p-8 md:p-14">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Educación inicial en Surco
            </span>
            <h1 className="font-display text-4xl font-semibold leading-[1.02] text-text-main tracking-tight md:text-[56px]">
              Un lugar <em className="font-display italic font-medium text-primary">seguro</em> para crecer con amor.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-text-muted">
              Acompañamos a niños desde los 3 meses hasta los 5 años. Atención cercana, espacios seguros y rutinas simples para las familias.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/contacto"
                className="rounded-2xl bg-primary px-6 py-3.5 font-bold text-white shadow-button transition-colors hover:bg-primary-dark"
              >
                Agendar visita guiada
              </Link>
              <Link
                to="/servicios"
                className="rounded-2xl border-[1.5px] border-primary/20 px-6 py-3.5 font-bold text-text-main hover:bg-primary/5"
              >
                Ver servicios →
              </Link>
            </div>

            <div className="mt-2 flex flex-wrap gap-6 border-t border-dashed border-primary/20 pt-5">
              {TRUST_STATS.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-semibold text-primary">{s.n}</div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px]">
            <img src={heroImage} alt="Aula principal de La Casita de Mami" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 backdrop-blur-sm shadow-soft">
              <span className="size-2.5 rounded-full bg-accent-pink" />
              <span className="size-2.5 rounded-full bg-accent-butter" />
              <span className="size-2.5 rounded-full bg-accent-sky" />
              <span className="size-2.5 rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </section>

      <HeroQuickAnswers />

      {/* QUICK NAV CARDS */}
      <section className="py-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {QUICK_NAV.map((c) => {
            const s = quickNavStyles[c.color]
            const inner = (
              <>
                <div className={`flex size-11 items-center justify-center rounded-xl ${s.iconBg}`}>
                  <span className={`material-symbols-outlined text-[26px] ${s.iconText}`}>{c.icon}</span>
                </div>
                <div className="mt-1 text-base font-bold text-text-main">{c.title}</div>
                <div className="text-sm text-text-muted">{c.desc}</div>
                <div className={`mt-1 text-sm font-bold ${s.cta}`}>Ir →</div>
              </>
            )
            return c.href ? (
              <a
                key={c.title}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-2xl border border-primary/15 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card-hover-sm"
              >
                {inner}
              </a>
            ) : (
              <Link
                key={c.title}
                to={c.to}
                className="group flex flex-col gap-2 rounded-2xl border border-primary/15 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card-hover-sm"
              >
                {inner}
              </Link>
            )
          })}
        </div>
      </section>

      {/* OFRECEMOS */}
      <section className="grid items-center gap-10 py-10 md:grid-cols-2 md:py-14">
        <div>
          <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.1em] text-primary">
            ─── Lo esencial
          </div>
          <h2 className="font-display text-3xl font-semibold leading-[1.05] text-text-main tracking-tight md:text-[38px]">
            Lo que realmente ofrecemos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Hemos simplificado la información para que encuentres lo esencial: propuesta pedagógica, servicios y contacto directo.
          </p>
          <ul className="mt-5 flex flex-col gap-3.5">
            {[
              { ring: 'bg-accent-pink/30', dot: 'bg-accent-pink', t: 'Nido y guardería en un solo lugar.' },
              { ring: 'bg-accent-butter/40', dot: 'bg-accent-butter', t: 'Grupos reducidos y comunicación constante.' },
              { ring: 'bg-accent-sky/40', dot: 'bg-accent-sky', t: 'Bienestar, autonomía y juego guiado.' },
            ].map((it) => (
              <li key={it.t} className="flex items-center gap-3.5 text-base text-text-main">
                <span className={`flex size-7 items-center justify-center rounded-full ${it.ring}`}>
                  <span className={`size-2.5 rounded-full ${it.dot}`} />
                </span>
                {it.t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-6">
            <button
              className="rounded-2xl bg-primary/10 px-5 py-3 font-semibold text-primary hover:bg-primary/15"
              onClick={() => setOpenModal('talleres')}
            >
              Ver talleres y actividades
            </button>
            <button
              className="rounded-2xl border-[1.5px] border-primary/20 px-5 py-3 font-semibold text-text-main hover:bg-primary/5"
              onClick={() => setOpenModal('familias')}
            >
              Recursos para familias
            </button>
          </div>
        </div>
        <div className="relative">
          <div
            className="absolute -inset-2 -z-10 rounded-[28px] opacity-35 blur-xl"
            style={{
              background: 'linear-gradient(135deg, #F4A8C9 0%, #FFE48A 33%, #B6D8EE 66%, #8A4FBD 100%)',
            }}
          />
          <img src={ambienteImage} alt="Ambiente de aprendizaje y juego" className="h-[420px] w-full rounded-3xl object-cover" />
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-text-main md:text-[32px]">
            Galería real del espacio
          </h2>
          <Link to="/contacto" className="text-sm font-bold text-primary">Coordinar visita →</Link>
        </div>
        <div className="overflow-hidden rounded-3xl border border-primary/15 bg-white">
          <div className="relative aspect-[16/9] bg-black">
            <motion.img
              key={galleryImages[currentSlide].src}
              src={galleryImages[currentSlide].src}
              alt={galleryImages[currentSlide].alt}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_STANDARD }}
            />
            <button
              type="button"
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md hover:bg-white"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-md hover:bg-white"
              aria-label="Imagen siguiente"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === currentSlide ? 24 : 8,
                    background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.55)',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-2 p-3" style={{ gridTemplateColumns: `repeat(${galleryImages.length}, 1fr)` }}>
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`overflow-hidden rounded-xl outline transition ${
                  index === currentSlide ? 'outline-[3px] outline-primary' : 'outline-2 outline-transparent hover:outline-primary/40'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-14 w-full object-cover md:h-16"
                  style={{ opacity: index === currentSlide ? 1 : 0.7 }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-8">
        <div
          className="relative grid items-center gap-8 overflow-hidden rounded-[28px] p-10 md:grid-cols-[1.5fr_1fr] md:p-12"
          style={{ background: 'linear-gradient(110deg, #8A4FBD 0%, #6F3CA0 100%)' }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full bg-accent-butter opacity-20" />
          <div className="pointer-events-none absolute -bottom-10 right-20 size-40 rounded-full bg-accent-pink opacity-25" />
          <div className="relative text-white">
            <h3 className="font-display text-3xl font-semibold tracking-tight md:text-[32px]">
              ¿Quieres conocer el nido?
            </h3>
            <p className="mt-2 text-base text-white/90">
              Coordina una visita guiada con dirección. Te mostramos las aulas y resolvemos tus dudas.
            </p>
          </div>
          <div className="relative flex flex-wrap justify-end gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=51908880326"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-primary"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp
            </a>
            <Link
              to="/contacto"
              className="rounded-2xl border-[1.5px] border-white/40 bg-white/15 px-5 py-3.5 font-bold text-white"
            >
              Agendar visita
            </Link>
          </div>
        </div>
      </section>

      <SimpleModal isOpen={openModal === 'admisión'} onClose={() => setOpenModal(null)} title="Proceso de admisión">
        <ol className="space-y-3 text-text-muted">
          <li><strong>1.</strong> Escríbenos por WhatsApp o formulario de contacto.</li>
          <li><strong>2.</strong> Agenda una visita guiada al local.</li>
          <li><strong>3.</strong> Revisa vacantes, horarios y requisitos con dirección.</li>
          <li><strong>4.</strong> Completa matrícula y bienvenida de tu pequeño.</li>
        </ol>
      </SimpleModal>

      <SimpleModal isOpen={openModal === 'talleres'} onClose={() => setOpenModal(null)} title="Talleres y actividades">
        <ul className="space-y-2 text-text-muted">
          <li>• Psicomotricidad y juego guiado.</li>
          <li>• Actividades artísticas y musicales.</li>
          <li>• Rutinas de lenguaje y socialización.</li>
          <li>• Actividades por edades y nivel de desarrollo.</li>
        </ul>
      </SimpleModal>

      <SimpleModal isOpen={openModal === 'familias'} onClose={() => setOpenModal(null)} title="Recursos para familias">
        <ul className="space-y-2 text-text-muted">
          <li>• Orientación para adaptación inicial.</li>
          <li>• Recomendaciones de hábitos y rutinas en casa.</li>
          <li>• Comunicación directa con el equipo docente.</li>
          <li>• Seguimiento de avances durante el año escolar.</li>
        </ul>
      </SimpleModal>
    </main>
  )
}
