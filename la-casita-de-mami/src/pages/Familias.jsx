import { Link } from 'react-router-dom'

export default function Familias() {
  const channels = [
    { icon: 'groups', title: 'Comités de Aula', desc: 'Reuniones periódicas para planificar actividades y dialogar sobre el grupo.' },
    { icon: 'person_pin_circle', title: 'Atención Personal', desc: 'Espacios individuales con las maestras para tratar el progreso particular.' },
    { icon: 'analytics', title: 'Informes Progreso', desc: 'Reportes trimestrales detallados sobre el desarrollo integral del niño.' },
    { icon: 'school', title: 'Escuela para Padres', desc: 'Talleres formativos y charlas especializadas en crianza y pedagogía.' },
  ]

  const resources = [
    { icon: 'picture_as_pdf', title: 'Reglamento Interno', size: '2MB' },
    { icon: 'calendar_today', title: 'Calendario Escolar', size: '1.2MB' },
    { icon: 'menu_book', title: 'Manual de Convivencia', size: '3.5MB' },
  ]

  return (
    <main className="max-w-[1200px] mx-auto px-6 pb-24">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-text-main">
              Familia y Escuela: <span className="text-primary">Juntos por su Futuro</span>
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Bienvenidos a un espacio de colaboración donde el crecimiento de sus hijos es nuestra prioridad compartida. Creemos en una educación participativa y cercana.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/identidad"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform"
              >
                Conocer más
              </Link>
              <button className="bg-white border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                Ver Calendario
              </button>
            </div>
          </div>
          <div className="relative">
            <div 
              className="w-full aspect-[4/3] bg-center bg-cover rounded-[2.5rem] shadow-2xl relative z-10"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBr2WzzX4opSnFgzWMA_kRW30aiRCdWMsdimAujkwxdsycuP5MdqdwPBfQfCupqbmFhr96lZyR_K6iMHdfWJAbRPrSKZfaG9HLj4cXvUUWnYAcc1M-TZ5m2WgK_B29SQ-BSSNZDIYbWNNmfUv17cXidT5S4R1LNysL0m_3e1YeYqH4-V0Nb-tNkZSiZL2kBqY3ApQ54kyt1EKexmj1pXXbPCgWHavbORGGKWDeR_OIXKswRA9J3-Z0s0xsFyvPz1GyAV5xbTHz0gAXu')" }}
            ></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-lime rounded-full -z-0 opacity-50 blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary rounded-full -z-0 opacity-30 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Participation & Commitment */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Participación y Compromiso</h2>
          <div className="h-1.5 w-20 bg-accent-lime mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row gap-10 items-center">
          <div 
            className="w-full md:w-1/2 aspect-video bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSJS1RZ54owG4wYsF-doto0EIfHmnzoFyzaH0U5zcpMfW-aRVg0vLP7sWlKf-kS0v72zq2I0Lwcs7bcQEhnCOjLk6uKDkuH7GnDNCfgf5emhQHuLNTBMyJMl1Eer-SEyAtnkvnVJJN60sgv8VT2WP_7Sh5PIRSKFzt6PL1mAeDJXsHKdN0j0Kl14Bk3ZIT8QXlOfQpgcM5ZGaKo988bgu7MSu44ZSXigIL25S4EjzmkB070N15d1OFUhuQpSB9oyaufZ_Qwu2c9QzG')" }}
          ></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="material-symbols-outlined">handshake</span>
              <span>Alianza Educativa</span>
            </div>
            <h3 className="text-2xl font-bold">Compromiso Firmado</h3>
            <p className="text-text-muted text-lg leading-relaxed">
              La educación es un camino que recorremos juntos. Al unirse a nuestra comunidad, firmamos un pacto de mutua colaboración. Su participación activa en el proceso educativo es el cimiento del éxito de sus pequeños.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <button className="bg-primary/10 text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/20 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">description</span>
                Descargar Compromiso
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Channels */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Canales de Comunicación</h2>
          <p className="text-text-muted mt-2">Manténgase siempre informado sobre el desarrollo de su hijo</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">{channel.icon}</span>
              </div>
              <h4 className="font-bold text-lg mb-2">{channel.title}</h4>
              <p className="text-sm text-text-muted">{channel.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Escuela para Padres Highlight */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-6">
              <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md">Programa Especial</span>
              <h2 className="text-4xl font-black">Escuela para Padres</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Ofrecemos soporte pedagógico y acompañamiento especializado a través de nuestro programa estrella. Juntos aprenderemos sobre:
              </p>
              <ul className="space-y-3 text-white/90">
                {[
                  'Desarrollo evolutivo y emocional',
                  'Disciplina positiva y límites amorosos',
                  'Estimulación temprana en casa'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-accent-lime">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="bg-accent-lime text-text-main px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors mt-4">
                Inscribirse en el Próximo Taller
              </button>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/10 rounded-3xl overflow-hidden backdrop-blur-sm p-2">
                  <div 
                    className="w-full h-full rounded-2xl bg-center bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAg-CCiXyw8BbmxLL7yNtlE1zqKViIFpKf32T4geYdveMr0FXBcDkl7HiL_Gx8ZP0yL6wdW6O-4SVIBxiRSsteoUwqvg_yly_arZ5WbVkXi-MMTGrhLBA4t_g0sxq3Eq7g4Uvsh6N7RJ3Kr1ibhHtAnpA4S7ye_4jrX7QZXRYP5HU9yO5HSY2X9tK07vOJ-p27zMIYoBBFFl7YpTFO2kDCS1ZmkvKX0bnnqUDj1xiAcVzCOjKo77qg6uWrDYjkQXwU9LSitl2cUhEu0')" }}
                  ></div>
                </div>
                <div className="aspect-square bg-white/10 rounded-3xl overflow-hidden backdrop-blur-sm p-2 mt-8">
                  <div 
                    className="w-full h-full rounded-2xl bg-center bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1zQVsCAwSj0QhmSASSZnLWmn8YG3fOGAoneXhvU6XWuDgpLZvZ2JwvxZUVpK6tDL4_Otpc6UASG8s-OTWkOXcmp-AcBh7z3k5WKCOxz3RdSw24Kjm3P4niejZSe59xG4B9GemMPB6gksrHoTZGnyWABs9KnJ5rAjjnAzGYgFpuxTE236VZM3-0iXO7kHSbp6B16Wl--KIJZ5NouNJSPkJNvBPUZwu0cLuDOfpY9RXiAfTA7q82gV6rA5BPGNPWNavSeZoCJizpbh2')" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symbols & Uniform */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Símbolos e Identidad</h2>
          <p className="text-text-muted mt-2">Nuestra imagen refleja nuestra esencia alegre y acogedora</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Insignia */}
          <div className="bg-white p-10 rounded-[2rem] border border-gray-100 text-center flex flex-col items-center">
            <div className="w-24 h-24 text-primary mb-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-3">Nuestra Insignia</h4>
            <p className="text-text-muted">Representa la unión de los niños, los padres y los educadores en un solo núcleo de crecimiento armónico.</p>
          </div>
          
          {/* Uniform */}
          <div className="bg-white p-10 rounded-[2rem] border border-gray-100">
            <h4 className="text-xl font-bold mb-6 text-center">Kit de Uniforme</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 p-4 bg-background-light rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-primary shadow-inner"></div>
                <div>
                  <p className="font-bold">Buzo Deportivo</p>
                  <p className="text-sm text-text-muted">Color Turquesa Institucional</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-background-light rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-accent-lime shadow-inner border-4 border-white"></div>
                <div>
                  <p className="font-bold">Detalles Lima</p>
                  <p className="text-sm text-text-muted">Vivos en Verde Lima</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-background-light rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-300">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div>
                  <p className="font-bold">Zapatillas</p>
                  <p className="text-sm text-text-muted">Blancas (sin cordones preferiblemente)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Recursos para Descargar</h3>
              <p className="text-text-muted">Acceda a los documentos importantes del año escolar.</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {resources.map((resource, index) => (
                <a 
                  key={index}
                  href="#"
                  className="flex items-center gap-3 bg-background-light px-6 py-4 rounded-xl border border-gray-100 hover:border-primary transition-all group"
                >
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{resource.icon}</span>
                  <div className="text-left">
                    <p className="text-xs text-text-muted uppercase font-bold tracking-wider">PDF ({resource.size})</p>
                    <p className="font-bold text-sm">{resource.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
