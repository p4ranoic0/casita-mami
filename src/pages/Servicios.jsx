import { useState } from 'react'
import { Link } from 'react-router-dom'
import SimpleModal from '../components/SimpleModal'
import serviceImage01 from '../assets/services/servicios-galeria-01.jpeg'
import serviceImage02 from '../assets/services/servicios-galeria-02.jpeg'
import serviceImage03 from '../assets/services/servicios-galeria-03.jpeg'

export default function Servicios() {
  const [selectedService, setSelectedService] = useState(null)

  const servicios = [
    {
      id: 'nido',
      title: 'Nido',
      horario: 'Lunes a viernes · 8:00 a.m. a 1:00 p.m.',
      precio: 'Mensualidad: S/. 690',
      image: serviceImage01,
      bullets: ['Educación inicial por edades', '12 niños por aula', 'Psicomotricidad e inglés'],
      detalle: [
        'Acompañamiento pedagógico por niveles.',
        'Rutinas de juego, lenguaje y autonomía.',
        'Comunicación constante con las familias.'
      ]
    },
    {
      id: 'guarderia',
      title: 'Guardería',
      horario: 'Lunes a viernes · 8:00 a.m. a 6:00 p.m.',
      precio: 'Plan completo: S/. 1150',
      image: serviceImage02,
      bullets: ['Desde 3 meses hasta 5 años', 'Atención personalizada', 'Cámaras de seguridad'],
      detalle: [
        'Cuidado por grupos de edad.',
        'Sala de cunas y espacios de estimulación.',
        'Opcional: servicio de almuerzo.'
      ]
    },
    {
      id: 'bienestar',
      title: 'Bienestar complementario',
      horario: 'Coordinación según calendario',
      precio: 'Incluido según programa',
      image: serviceImage03,
      bullets: ['Orientación psicopedagógica', 'Seguimiento de desarrollo', 'Apoyo a familias'],
      detalle: [
        'Acompañamiento emocional y conductual.',
        'Talleres preventivos para hábitos saludables.',
        'Recomendaciones personalizadas para casa.'
      ]
    }
  ]

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-10">
      <section className="py-8 md:py-10">
        <div className="rounded-3xl bg-white p-8 shadow-card md:p-12">
          <h1 className="text-4xl font-black text-text-main md:text-5xl">Servicios</h1>
          <p className="mt-4 max-w-2xl text-lg text-text-muted">
             Nido, guardería y bienestar complementario.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {servicios.map((service) => (
          <article key={service.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <img src={service.image} alt={service.title} className="h-52 w-full object-cover" />
            <div className="space-y-3 p-6">
              <h2 className="text-2xl font-bold text-text-main">{service.title}</h2>
              <p className="text-sm font-semibold text-primary">{service.horario}</p>
              <p className="text-text-main">{service.precio}</p>
              <ul className="space-y-1 text-sm text-text-muted">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
              <button
                className="mt-2 w-full rounded-xl bg-background-dark px-4 py-2.5 font-semibold text-white hover:bg-[#1c2f2c]"
                onClick={() => setSelectedService(service)}
              >
                Ver detalles
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl bg-primary/10 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-text-main">¿No sabes qué opción elegir?</h3>
        <p className="mt-2 text-text-muted">Te orientamos por edad, horario familiar y vacantes disponibles.</p>
        <Link to="/contacto" className="mt-4 inline-block rounded-xl bg-primary px-6 py-3 font-bold text-text-main hover:bg-primary-dark">
          Hablemos
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
