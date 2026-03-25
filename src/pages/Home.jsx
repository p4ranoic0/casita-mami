import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SimpleModal from '../components/SimpleModal'
import { MOTION_DURATION, MOTION_EASE_STANDARD, withReducedMotion } from '../utils/motionTokens'
import heroImage from '../assets/home/home-hero-aula-01.jpeg'
import ambienteImage from '../assets/home/home-ambiente-aula-02.jpeg'
import gallery01 from '../assets/home/home-galeria-01.jpeg'
import gallery02 from '../assets/home/home-galeria-02.jpeg'
import gallery03 from '../assets/home/home-galeria-03.jpeg'
import contact01 from '../assets/contact/contacto-galeria-01.jpeg'
import contact02 from '../assets/contact/contacto-galeria-02.jpeg'
import contact03 from '../assets/contact/contacto-galeria-03.jpeg'
import contact04 from '../assets/contact/contacto-galeria-04.jpeg'
import contact05 from '../assets/contact/contacto-galeria-05.jpeg'
import contact06 from '../assets/contact/contacto-galeria-06.jpeg'

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
    { src: contact04, alt: 'Ambiente de juego guiado' },
    { src: contact05, alt: 'Zona de interacción y psicomotricidad' },
    { src: contact06, alt: 'Espacio integral para desarrollo infantil' },
  ]

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-10">
      <section className="py-6 md:py-10">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-card md:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-text-main">
              <span className="material-symbols-outlined text-sm">home</span>
              Educación inicial en Surco
            </span>
            <h1 className="text-4xl font-black leading-tight text-text-main md:text-5xl">
              Un lugar seguro para crecer con amor
            </h1>
            <p className="max-w-xl text-lg text-text-muted">
              Acompañamos a niños desde los 3 meses hasta los 5 años con atención cercana, espacios seguros y rutinas simples para las familias.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contacto" className="rounded-xl bg-primary px-6 py-3 font-bold text-text-main transition-colors hover:bg-primary-dark">
                Agendar visita
              </Link>
              <button
                className="rounded-xl border border-primary/30 px-6 py-3 font-bold text-text-main hover:bg-primary/10"
                onClick={() => setOpenModal('admisión')}
              >
                Ver admisión
              </button>
            </div>
          </div>
          <div className="relative min-h-[320px]">
            <img src={heroImage} alt="Aula principal de La Casita de Mami" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
          </div>
        </div>
      </section>

      <section className="grid gap-8 py-10 md:grid-cols-2 md:py-14">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-text-main">Lo que realmente ofrecemos</h2>
          <p className="text-text-muted">
            Hemos simplificado la información para que encuentres lo esencial: propuesta pedagógica, servicios y contacto directo.
          </p>
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-start gap-2"><span className="text-primary">●</span> Nido y guardería en un solo lugar.</li>
            <li className="flex items-start gap-2"><span className="text-primary">●</span> Grupos reducidos y comunicación constante con familias.</li>
            <li className="flex items-start gap-2"><span className="text-primary">●</span> Enfoque en bienestar, autonomía y juego guiado.</li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="rounded-xl bg-background-dark px-5 py-3 font-semibold text-white hover:bg-[#1c2f2c]"
              onClick={() => setOpenModal('talleres')}
            >
              Ver talleres y actividades
            </button>
            <button
              className="rounded-xl bg-white px-5 py-3 font-semibold text-text-main shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
              onClick={() => setOpenModal('familias')}
            >
              Recursos para familias
            </button>
          </div>
        </div>
        <img src={ambienteImage} alt="Ambiente de aprendizaje y juego" className="h-full min-h-[280px] w-full rounded-2xl object-cover" />
      </section>

      <section className="py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-main md:text-3xl">Galería real del espacio</h2>
          <Link to="/contacto" className="text-sm font-bold text-primary">Coordinar visita →</Link>
        </div>
        <div className="overflow-hidden rounded-3xl bg-white shadow-card">
          <div className="relative">
            <motion.img
              key={galleryImages[currentSlide].src}
              src={galleryImages[currentSlide].src}
              alt={galleryImages[currentSlide].alt}
              className="h-[280px] w-full object-cover md:h-[460px]"
              whileHover={{
                scale: withReducedMotion(prefersReducedMotion, 1.01, 1),
                y: withReducedMotion(prefersReducedMotion, -2, 0),
              }}
              transition={{ duration: MOTION_DURATION.quick, ease: MOTION_EASE_STANDARD }}
            />

            <button
              type="button"
              onClick={goToPrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-text-main shadow-md hover:bg-white"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-text-main shadow-md hover:bg-white"
              aria-label="Imagen siguiente"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          <div className="flex items-center justify-between px-4 pt-3 text-sm font-semibold text-text-muted">
            <span>Galería del nido</span>
            <span>{currentSlide + 1} / {galleryImages.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 md:grid-cols-9">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`overflow-hidden rounded-xl ring-2 transition ${
                  index === currentSlide ? 'ring-primary' : 'ring-transparent hover:ring-primary/40'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img src={image.src} alt={image.alt} className="h-14 w-full object-cover md:h-16" />
              </button>
            ))}
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
