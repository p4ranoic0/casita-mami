import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Admision() {
  const [openFaq, setOpenFaq] = useState(null)

  const steps = [
    { icon: 'chat', title: 'Primer Contacto', desc: 'Completa el formulario lateral o contáctanos vía WhatsApp para recibir la información inicial.', active: true },
    { icon: 'location_on', title: 'Visita Guiada', desc: 'Conoce nuestras instalaciones, aulas temáticas y áreas de recreación seguras.' },
    { icon: 'groups', title: 'Entrevista', desc: 'Conversación personalizada con la dirección para conocer el perfil de tu pequeño.' },
    { icon: 'description', title: 'Documentación', desc: 'Entrega de los requisitos físicos detallados en la sección inferior.' },
    { icon: 'verified', title: 'Matrícula', desc: 'Firma del compromiso de apoyo y reserva oficial de vacante.', last: true },
  ]

  const documents = [
    'Partida de Nacimiento (Original)',
    'DNI del menor (Copia a color)',
    'DNI de ambos padres (Copia)',
    'Carnet de Vacunación actualizado',
    'Certificado de estudios previos',
  ]

  const faqs = [
    { q: '¿Cuál es el horario de atención?', a: 'Nuestra institución ofrece dos turnos: Mañana de 08:00 a 12:30 y Tarde de 13:30 a 18:00. Las oficinas administrativas atienden de lunes a viernes de 08:00 a 17:00.' },
    { q: '¿Qué incluye el taller de Gimnasia Motriz?', a: 'El taller incluye actividades de coordinación, equilibrio, esquema corporal y desarrollo de motricidad gruesa dirigidas por especialistas, utilizando materiales seguros y diseñados para cada etapa de crecimiento.' },
    { q: '¿Reciben niños de menos de 3 años?', a: 'Actualmente nuestro programa está diseñado para niños de 3, 4 y 5 años cumplidos al 31 de marzo del año escolar correspondiente, enfocándonos en la etapa preescolar obligatoria.' },
    { q: '¿Cómo es la comunicación con los padres?', a: 'Mantenemos una comunicación constante a través de nuestra agenda digital, reuniones mensuales de seguimiento y atención personalizada vía WhatsApp para temas urgentes o coordinaciones diarias.' },
  ]

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-10 lg:grid lg:grid-cols-12 lg:gap-12 items-start">
      <div className="lg:col-span-8 flex flex-col gap-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-white p-8 md:p-12 shadow-xl shadow-black/[0.03]">
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-lime/20 text-text-main text-xs font-bold uppercase tracking-wider">
                Admisiones 2024 - 2025
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Únete a Nuestra <span className="text-primary">Familia Educativa</span>
              </h1>
              <p className="text-text-muted text-lg leading-relaxed">
                Descubre un espacio donde el aprendizaje y el cariño van de la mano. Iniciamos el proceso de admisión para el periodo escolar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/formulario"
                  className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Ver Proceso de Admisión
                </Link>
              </div>
            </div>
            <div 
              className="w-full md:w-2/5 aspect-[4/5] rounded-2xl bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBD1EbIIHrFawnMdWu0_UAqpR3Dn3_Oqn8Nwm89NRSEXcYRBRVv9npNdcAIKQtyuBq3OdzKXo7q2uRIRTeghYmsXTefSTo56Jpr9JecSpXmCSK9mCXm2Z5_O8nMXwSAzoFCR8fdzKWZQjXodgUQeUs5_NrQJ_b4F_9tWrkDHcw7t_0xk4GK1z2DTk1HmqpVv_ylKfVYR-a2B0AVceampxdRz5RweH7uDkenS0NLFh6wV5XbMTyDq67zmbLcgtk2erynpp0LGnObCGVJ')" }}
            ></div>
          </div>
          <div className="absolute -top-24 -right-24 size-64 bg-accent-lime/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 size-64 bg-primary/10 rounded-full blur-3xl"></div>
        </section>

        {/* Steps Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-extrabold">Pasos para la Admisión</h2>
            <span className="text-primary font-bold text-sm">5 Sencillos Pasos</span>
          </div>
          
          <div className="grid grid-cols-[48px_1fr] gap-x-6 px-4">
            {steps.map((step, index) => (
              <div key={index} className="contents">
                <div className="flex flex-col items-center">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shadow-lg ${
                    step.active ? 'bg-primary text-white shadow-primary/30' : 
                    step.last ? 'bg-accent-lime text-text-main shadow-accent-lime/30' :
                    'bg-white text-primary border-2 border-primary/20'
                  }`}>
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  {!step.last && <div className="w-1 bg-primary/20 grow my-2 rounded-full"></div>}
                </div>
                <div className={step.last ? 'pt-1' : 'pb-10 pt-1'}>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-text-muted mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documentation Section */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Documentación Requerida</h2>
              <p className="text-sm text-text-muted">Documentos originales y copias legibles</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-background-light">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="text-sm font-medium">{doc}</span>
              </div>
            ))}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-background-light border-2 border-dashed border-primary/20">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              <span className="text-sm font-medium text-text-muted italic">Otros requerimientos internos</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-extrabold">Preguntas Frecuentes</h2>
            <p className="text-text-muted text-sm">Resolvemos tus dudas más comunes sobre nuestro proceso y servicios.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-2xl px-6 transition-all hover:border-primary/30"
              >
                <button 
                  className="flex items-center justify-between py-5 cursor-pointer select-none w-full text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-bold text-primary">{faq.q}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 text-text-muted ${openFaq === index ? 'rotate-180 text-primary' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div className={`text-text-muted text-sm leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Cards */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-primary text-white p-8 rounded-3xl relative overflow-hidden group">
            <h3 className="text-xl font-bold mb-4 relative z-10">Edades de Ingreso</h3>
            <div className="flex gap-4 relative z-10">
              {[3, 4, 5].map((age) => (
                <div key={age} className="flex-1 text-center p-3 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <div className="text-2xl font-black italic">{age}</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Años</div>
                </div>
              ))}
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-10 group-hover:scale-110 transition-transform">school</span>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Horarios y Turnos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">light_mode</span>
                  <span className="font-semibold text-sm">Turno Mañana</span>
                </div>
                <span className="text-sm font-bold text-primary">08:00 - 12:30</span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-text-muted">wb_twilight</span>
                  <span className="font-semibold text-sm">Turno Tarde</span>
                </div>
                <span className="text-sm font-bold text-text-muted">13:30 - 18:00</span>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Banner */}
        <section className="bg-accent-lime/10 rounded-3xl p-8 border border-accent-lime/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="size-20 bg-accent-lime rounded-full flex items-center justify-center text-text-main shadow-lg shadow-accent-lime/20">
              <span className="material-symbols-outlined text-4xl">handshake</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold">Compromiso de Apoyo</h3>
              <p className="text-text-muted mt-2 leading-relaxed">
                Al unirte a nuestra comunidad, firmamos juntos un compromiso de corresponsabilidad educativa, asegurando que el desarrollo de tu hijo sea nuestra prioridad mutua.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar Form */}
      <aside className="lg:col-span-4 mt-12 lg:mt-0 sticky top-28">
        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/[0.05] border border-gray-100">
          <h3 className="text-2xl font-black mb-2">Solicitar Información</h3>
          <p className="text-text-muted text-sm mb-8">Déjanos tus datos y nos pondremos en contacto contigo en menos de 24 horas.</p>
          
          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Nombre Completo</label>
              <input 
                type="text" 
                className="w-full bg-background-light border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="Ej. Ana García"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Teléfono / WhatsApp</label>
              <input 
                type="tel" 
                className="w-full bg-background-light border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="+51 900 000 000"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Correo Electrónico</label>
              <input 
                type="email" 
                className="w-full bg-background-light border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="ana@ejemplo.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Edad del niño(a)</label>
              <div className="grid grid-cols-3 gap-3">
                {[3, 4, 5].map((age) => (
                  <label key={age} className="relative cursor-pointer">
                    <input type="radio" name="age" className="peer sr-only" />
                    <div className="w-full text-center py-3 rounded-xl bg-background-light peer-checked:bg-primary peer-checked:text-white text-sm font-bold transition-all">
                      {age}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
            >
              Enviar Solicitud
            </button>
            
            <p className="text-[10px] text-center text-text-muted mt-4 uppercase font-semibold tracking-tighter">
              Al enviar aceptas nuestras políticas de privacidad
            </p>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
            <p className="text-sm font-bold text-center">O contáctanos directamente</p>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/51987654321" 
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white p-3 rounded-2xl font-bold text-sm hover:brightness-105 transition-all"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                WhatsApp
              </a>
              <a 
                href="tel:+51987654321" 
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-text-main p-3 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
              >
                <span className="material-symbols-outlined text-lg">call</span>
                Llamar
              </a>
            </div>
          </div>
        </div>
      </aside>
    </main>
  )
}
