export default function Servicios() {
  const precios = [
    { icon: '📝', title: 'Matrícula', price: 'S/. 690.00', detail: null },
    { icon: '📚', title: 'Mensualidad', price: 'S/. 690.00', detail: 'Horario de 8:00 a.m a 1:00 pm' },
    { icon: '🎒', title: 'Matrícula Guardería', price: 'S/. 690', detail: 'Cualquier horario' },
    { icon: '🌟', title: 'Guardería Completa', price: 'S/. 1150.00', detail: 'Horario completo de 8:00 a.m a 6:00 pm' },
    { icon: '🌙', title: 'Guardería Turno Tarde', price: 'S/. 550', detail: null },
    { icon: '📞', title: 'Otros Horarios', price: 'Consultar', detail: 'Consultar con dirección' },
  ]

  const guarderiaFeatures = [
    'Atención a niños desde 3 meses a 5 años',
    'CÁMARAS DE SEGURIDAD en todas las áreas',
    'Todos los niños llevan programa educativo de acuerdo a la edad',
    'Atención personalizada',
    'Los niños están separados por edades',
    'Contamos con sala de cunas',
    'Arenero para psicomotricidad',
    'Sala de estimulación',
    'Servicio de almuerzo (costo adicional)',
    'Horario de atención de lunes a viernes 8:00 AM a 6:00 PM',
  ]

  const nidoFeatures = [
    'Inicio de clases 4 de Marzo',
    'Taller de TAEKWONDO todo el año',
    'Horario de lunes a viernes de 8:00 AM a 1:00 PM',
    'Cámaras de seguridad en todos los ambientes del nido',
    'Programa de psicomotricidad',
    'Estimulación de Lenguaje',
    'Aulas ventiladas',
    '12 niños por aula',
    'Clases de inglés',
    'Amplios ambientes',
    'Una auxiliar perenne en cada aula',
  ]

  const instalaciones = [
    { icon: 'beach_access', name: 'Arenero' },
    { icon: 'restaurant', name: 'Comedor' },
    { icon: 'sports_gymnastics', name: 'Sala de psicomotricidad' },
    { icon: 'toys', name: 'Amplio patio de juegos' },
    { icon: 'psychology', name: 'Acompañamiento psicológico' },
  ]

  const services = [
    {
      icon: 'medical_services',
      tag: 'Cuidado Inmediato',
      title: 'Tópico Escolar',
      desc: 'Contamos con personal de enfermería permanente para monitoreo de salud, administración de medicamentos bajo receta y atención de primeros auxilios.',
      features: ['Protocolos de Emergencia', 'Reportes de Salud Diarios'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6aP_baX2rL1Nev2rURlL5tOfMGStX25dPe6w3myilCLt183EBjCwIeFR1YLXhHJ6Z8lI-y5_ZMMPSNnI4KwnGIJuz2AasUyhL4-mK8b-lv44y_RFfgOpk85gHkNXPjw2SnP4jMfB4Hnbxtg1QPvFaVqsf6Hf0QFxclgb1yleUAn_DZNFQt8oqg30yDvrNyTTcjK0u8KRUuc6tuc_J_OBIMQ4JDOExbsukTeEsurITsQmZNtUs9uj5JrP_kMNf_SHK4u9DwFFlTfT7'
    },
    {
      icon: 'dentistry',
      tag: 'Prevención Bucal',
      title: 'Servicio Odontológico',
      desc: 'Fomentamos hábitos saludables desde pequeños con revisiones periódicas preventivas y talleres lúdicos de higiene dental.',
      features: ['Chequeos Odontológicos', 'Educación en Cepillado'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHoABTmb8K7hRry4HvA0wgmX2FPjYJoDy2etf63hocMIC444tQARnLKWcCv8R5fzMoW-nTNppBGLoBqYmorLTXSxWlUK8cJPQ5a9b8pqe8V9i9yN_VDbGulB9H6AuscDNJD6FyiO3WfmNbmGyIlu4h3VuDvA00Xw2de_IAaYFPfgtUps9gi96mU3BvX6pG4w9gQ8atMW-dOQMYuzyZzWsQV70QF1sLleQ_S0hW6V3gn0DJTaPA_D7w4Ntr9pHPhRI63b3vYveOZJSn'
    },
    {
      icon: 'psychology',
      tag: 'Apoyo Emocional',
      title: 'Apoyo Psicopedagógico',
      desc: 'Un equipo especializado acompaña el desarrollo cognitivo y emocional, brindando herramientas tanto a niños como a sus familias.',
      features: ['Escuela para Padres', 'Orientación Familiar'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrCoz5v2TclQfmk5YvVeFL0ayLCrhG4PWw89Hk7I2JfpbXWhsTGGmquL0RqfS7HmPvCqnfIacWhP6uJtbrVNLERIQdnJh51ZYDqRBM5H9RWvoVKGq3f6PW09bI_9R86FfAqzT4i76roeql-3VdI7UpUBlUbOXTxTRtGdWbfZwPI8C-mtrwKIAmAy_ajkLt9cFLNAJVCxE_IObwZp2lRVy0HgOpcBh9_ZuH6NyMkF4Qzx1yE9FXqAlUeA6UkBVJgmtINdzeDCRqiLJC'
    }
  ]

  const team = [
    { name: 'Lic. Ana Valery', role: 'Enfermería', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoqlIZPpGGMbijxSdMjHJ8YbwTd0Jq_h8zfL3GPcbcWJZNhXP2_v1HVMFreO_sN40dVuaXKuRxVSLRWTQQwghp4217xqsJTOPPkGjncc4CrHBHaXS0JUczQ09ZP50Nmq_FeihCyhln521p1O8i39VlFifdc9Qwb7p0tVZQK3N0F0-4Hxp9e3P0syjMrht1bIsAo0HXDgveJPY5G04nVdsWVsYAXzdEemti2gddS48oWL7ib5cFS47IjEpnPggv3Cxicqi1FgsKmkeP' },
    { name: 'Dr. Carlos Ruiz', role: 'Odontología', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHUyGbtrCyVG0NZvKvRH63D52psgpX_a1oUhCqaGOOkSFwZOLd3-hBDSyyxeVQ9VgR2ZwUfUx3tQr1KJbHHIs-7m8NiGTrMoQamdchV7eOYLuB0NEdnG7tKHdFlPwOig4u-gIEcWfgJK5F-csbdWhOfafJi7rHOLgNy0htIFeSkdSiXpA-bJxmFjJFeFSvBR6CCZrU-EWZyk57a8JbkDxvoRhzld1HxIJHjzfDFQjChkHVefYEKS7mw0n63Q287oC_9asIl3vjU4Sx' },
    { name: 'Mg. Sofía Méndez', role: 'Psicopedagogía', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApg3TD21rCxRXdubnOiEvpSC-L2TbH7KtwA4QkZGDubVSHoQAFW_ofFa7QDChLRvWtKBmiIbLfCkoZBGmI7DJfYVGhvDcoLLDjERoy4nOu-uTrytge7ytGKlcmBRBl1q0dhwQPPO5cjs_tAAI9P4X97Ybyw7V6lrjfpfKQ405atfXIgU9_MLAiK_yvFPWJ2jSmI4SAk9DgSenKMBcpWdwTqxXmgiYUA2W4e9lKWyG5V6E53w2ktePFCeAm7MOaNhAch4K7zoXu0ohV' },
    { name: 'Lic. Elena Paz', role: 'Coordinación', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXxe5bgwHC-k7fMX5FJ2vB6niMeYVBh23sutaIcIyZ1XGp4dPFbM5DwGRcTltUzYMZIQqEuu7RUAKgb0q3sBLWb1awDfhRCYFObCC2oB9fsGHeFhpSLNwSOpdVmuB5zeuq2Y4hN8GMqs_KTuHFLs7qV0WRCtsD93A5R5y1KL1-TznHQUFtXQxVb6bVmb7oT5Q2IVBXrO-XwQidWqRTeQBDoXtxvpDNdSFfJbXBD5Sch11kCHioX16G4igyRbGmdzNFmMYj5layOkmY' },
  ]

  return (
    <main className="max-w-[1200px] mx-auto pb-20">
      {/* Hero Section */}
      <div className="px-4 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary/10">
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="flex-1 flex flex-col justify-center p-8 md:p-16 gap-6 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-lime/30 text-text-main font-bold text-xs uppercase tracking-wider">
                Salud & Bienestar
              </span>
              <h1 className="text-text-main text-5xl md:text-6xl font-black leading-tight tracking-tight">
                Bienestar y Cuidado <br/><span className="text-primary">Integral</span>
              </h1>
              <p className="text-lg text-text-muted max-w-[500px]">
                Comprometidos con el desarrollo saludable y seguro de nuestros pequeños a través de un acompañamiento profesional constante en cada etapa de su crecimiento.
              </p>
              <div className="flex gap-4">
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-text-main text-base font-bold shadow-lg shadow-primary/30">
                  Saber Más
                </button>
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 border-2 border-primary/30 text-text-main text-base font-bold hover:bg-primary/10">
                  Ver Protocolos
                </button>
              </div>
            </div>
            <div className="flex-1 relative min-h-[300px]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCa_6DxNxb0pxKpuHUi-Yv5h_xyvhsrXg3IVspCtZkjptHIqzGKdaA7aGkQ2ChckyfA1x8LEVVV3FNATaH5R_O82UIyss6WBvBBcs3Xsv1KeVTPEFMpS48uneAIE2bUQD4Pk2QrdxaFi06jrKZZOuNmozcUszoH-MEUGgv-SBE8iVySJVwy5lAPRnz_Z_aRYc3Ujku8qZc3Aw7hJ5r_qjze5QRDpLLZ2gj5ymt0m_lblO4ltREEvvGj3ETYEyCJeHWqf9LFenEhw60r')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Precios 2026 */}
      <div className="mt-12 px-4">
        <div className="bg-gradient-to-br from-primary/10 via-accent-lime/10 to-white rounded-3xl p-8 md:p-12 border border-primary/20">
          <div className="text-center mb-10">
            <span className="text-4xl mb-2 block">🌈</span>
            <h2 className="text-3xl md:text-4xl font-black text-text-main">Precios 2026</h2>
            <p className="text-text-muted mt-2">Inversión en el futuro de tus pequeños</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {precios.map((precio, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{precio.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-main text-lg">{precio.title}</h3>
                    <p className="text-primary font-black text-2xl mt-1">{precio.price}</p>
                    {precio.detail && (
                      <p className="text-text-muted text-sm mt-1">{precio.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Servicios Principales: Guardería y Nido */}
      <div className="mt-16 px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-wider uppercase text-sm">Nuestros Servicios</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mt-2">🌈 Bienvenidos al Nido - Guardería La Casita de Mami 🌈</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Guardería */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl">child_care</span>
                <div>
                  <h3 className="text-2xl font-black">Servicio de Guardería</h3>
                  <p className="text-white/80 text-sm">Cuidado integral para los más pequeños</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {guarderiaFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-0.5">⭐️</span>
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nido */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-accent-lime/80 to-green-500 p-6 text-white">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl">school</span>
                <div>
                  <h3 className="text-2xl font-black">Nido</h3>
                  <p className="text-white/80 text-sm">Educación inicial de calidad</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {nidoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-0.5">✨</span>
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Instalaciones */}
      <div className="mt-16 px-4">
        <div className="bg-background-dark rounded-3xl p-8 md:p-12">
          <h3 className="text-white text-2xl font-bold text-center mb-8">Contamos con:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {instalaciones.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                <span className="text-white font-medium">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">📍 Puedes conocer nuestras instalaciones en:</p>
            <p className="text-white text-xl font-bold">Calle Morropon 105, Surco</p>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="mt-16 px-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-text-main text-3xl font-bold tracking-tight">Servicios de Salud Complementarios</h2>
          <div className="h-1.5 w-24 bg-accent-lime rounded-full"></div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-4">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div 
              className="h-56 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${service.image}')` }}
            ></div>
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">{service.icon}</span>
                <span className="font-bold text-sm uppercase">{service.tag}</span>
              </div>
              <h3 className="text-text-main text-xl font-bold">{service.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{service.desc}</p>
              <ul className="mt-2 space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-xs font-medium text-text-main">
                    <span className="material-symbols-outlined text-accent-lime text-lg">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mt-20 px-4">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-text-main text-3xl font-bold tracking-tight">Nuestro Equipo Multidisciplinario</h2>
          <p className="text-text-muted max-w-2xl">Profesionales apasionados que trabajan en conjunto para garantizar un entorno seguro y estimulante para cada estudiante.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="size-24 rounded-full border-4 border-primary/20 p-1">
                <div 
                  className="size-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${member.image}')` }}
                ></div>
              </div>
              <div className="text-center">
                <p className="font-bold text-text-main">{member.name}</p>
                <p className="text-xs text-primary font-semibold uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Banner */}
      <div className="mt-20 px-4">
        <div className="bg-background-dark rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-lime/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-white text-3xl md:text-4xl font-black">Nuestro Compromiso con la Vida</h2>
            <p className="text-gray-400 max-w-2xl text-lg">
              En La Casita de Mami, no solo educamos mentes, cuidamos corazones. Creamos un entorno donde la salud, la seguridad y la felicidad son los pilares fundamentales para el crecimiento de sus hijos.
            </p>
            
            <div className="flex flex-wrap justify-center gap-10 mt-4">
              <div className="flex flex-col items-center">
                <span className="text-primary text-4xl font-bold">100%</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Seguridad</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-accent-lime text-4xl font-bold">24/7</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Atención</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-primary text-4xl font-bold">15+</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Especialistas</span>
              </div>
            </div>
            
            <button className="mt-6 flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-text-main text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Inscribirse Ahora
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
