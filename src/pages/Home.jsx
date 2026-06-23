import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SimpleModal from '../components/SimpleModal'
import HeroQuickAnswers from '../components/HeroQuickAnswers'
import heroImage from '../assets/home/home-hero-aula-01.jpeg'
import ambienteImage from '../assets/home/home-ambiente-aula-02.jpeg'

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
  const [albums, setAlbums] = useState([])

  // Álbumes ACTIVOS de la galería (/galeria/albums.json) para mostrarlos aquí
  useEffect(() => {
    fetch('/galeria/albums.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setAlbums(Array.isArray(d?.albums) ? d.albums : []))
      .catch(() => setAlbums([]))
  }, [])

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
              background: 'linear-gradient(135deg, #25c1e9 0%, #e8ff52 33%, #7dcfeb 66%, #25c1e9 100%)',
            }}
          />
          <img src={ambienteImage} alt="Ambiente de aprendizaje y juego" className="h-[420px] w-full rounded-3xl object-cover" />
        </div>
      </section>

      {/* GALERÍA — eje del sitio */}
      <section className="py-12 md:py-16">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.08em] text-primary">Galería</span>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-text-main md:text-[40px]">
              Revive cada momento
            </h2>
            <p className="mt-2 max-w-xl text-text-muted">
              Recorre nuestros ambientes y los eventos de La Casita: celebraciones, aprendizaje y mucho juego.
            </p>
          </div>
          <a
            href="/galeria/"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-button-sm transition hover:bg-primary-dark sm:self-auto"
          >
            Ver galería completa
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>

        {albums.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {albums.map((album) => (
              <a
                key={album.slug}
                href={`/galeria/${album.slug}`}
                className="group relative block overflow-hidden rounded-3xl shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="aspect-[4/3] overflow-hidden bg-primary/10">
                  <img
                    src={`/galeria/${album.cover}`}
                    alt={album.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d3a]/80 via-[#0d2d3a]/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="font-display text-lg font-semibold leading-tight text-white md:text-xl">{album.title}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-white/85">
                    <span className="material-symbols-outlined text-[15px]">photo_library</span>
                    {album.count} fotos
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <a
            href="/galeria/"
            className="flex items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-primary/5 px-4 py-14 text-center font-semibold text-primary transition hover:bg-primary/10"
          >
            Ver nuestra galería de fotos →
          </a>
        )}
      </section>

      {/* CTA BAND */}
      <section className="py-8">
        <div
          className="relative grid items-center gap-8 overflow-hidden rounded-[28px] p-10 md:grid-cols-[1.5fr_1fr] md:p-12"
          style={{ background: 'linear-gradient(110deg, #25c1e9 0%, #1a9dc0 100%)' }}
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
