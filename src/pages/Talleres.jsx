export default function Talleres() {
  const workshops = [
    {
      title: 'Música y Danzas',
      desc: 'Exploración del ritmo, movimiento y expresión corporal para fomentar la creatividad.',
      icon: 'music_note',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0uoIVbRahUmTtnLSVRFoQx-a7YkX0UkwsBMbvHHHEanA21DZVw_8wCRQiLptQDFW7zSHIQioIvSGPiGV5KK-TB_B09g0TU8AHaCQwZSqBZDjnSv1rgbwtuqI9HDHn7a-EMKoJTv9NifpHWXD5Dsvz6tcyR5iVP3V_69OhDp8vqfLMuyAuEW72DoeBeSokVLx6-TCou_qLiBcXaEdNOezy4TX9aa3dRzKjSoGrMgfrHRWOMt_HUmqDIVCDlnMVNHuGZ9kZEI0I9W3T',
      colorClass: 'bg-accent-lime/20 text-charcoal'
    },
    {
      title: 'Cocina y Repostería',
      desc: 'Aprendizaje sensorial a través de sabores, texturas y colores naturales.',
      icon: 'restaurant_menu',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChb_o0WsKJXBrXQIUKoPssf8quPKjghdQqKjJIEk_myQMf8Z5zHInT7H1n55x1ygM9gL0JQFuFiKEDCSNpOVPsw9qO6ngLBAgWUiIMegRXs9RFAj2NUskkK_E6J_-4s1Dt6ks0eo_SUzN9o5TQTHmvlZT_FNGWQ4nWY0GXNPgDf0cCooqEbskUWqSesw30NNyGIqnTE-5Tfu3akJmQimnm9m3cKMj9eSGbHbs-XEJv-8vcAJ50JwalTyySdptYkQ2D5cCH3uymUcxu',
      colorClass: 'bg-primary/20 text-primary'
    },
  ]

  const infrastructure = [
    {
      title: 'Salas de Cómputo Modernas',
      desc: 'Introducción amigable a la tecnología digital.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARXaBAe7Gd2Z0v0SB_h74X5E8WEjzwo9CJjNInJGh4EPoPuaHhMFT5TtPYoN26HPhNwXHrFbBINV0eHq03lHDd4yWvm0dfW3aXRMmGHEoUNeBXg4CyBD6OJbFQz6oe-WltNFowD7jDnMLXALrFXs2MMau7gVDhiJlg7C73qga1CmUl7nZoJHC1_rCr7qrZvmXwi9kGUOnqVCWT0wHCltqjE9pHlQo5UJem0YgJW5AVKjnGijnYQGfBrnakgfBilmi5GcNNZ-gsuYwh',
      span: 'md:col-span-8',
      height: 'h-[400px]'
    },
    {
      title: 'Área de Arte & Sala de Videos',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl40zohVoCI0fCCgQYK7a03jtUAasgfe0zakO79t_H71pQf5PGUSzf_dl75RCCK8vfH1-khaW8Hn74QGklYXbGvXYAoeR3HplNqINz-tBjghfmXT6lw_7Oh4HiNpU4g3k4x7nuhuidWfLkh0iE18nNgbX175ZbqNuIYTpgTjNJIQjrHrnc_MNi_QlRyW7jo_1oAo5XHD2aWJhSj7fSvxOWv1LR-alZ0MykFKnL3OoxYj5yNW3i9QGYDmO18rH2R8_cjPeMDBZUgPVW',
      span: 'md:col-span-4',
      height: 'h-[400px]'
    },
    {
      title: 'Campos Multifuncionales',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1jKkFLk88tantvHoBH2_WCwn54EA3NUQqHaeFOiY-CVRJ9TM5fWfIvmu68a7CfqyQvE2Mg2TjhD7JPWW5Gxq6iz8OkZ3_tgkJTUv5tNTzginPLl7vqsWD2wb6idCk54zn4mnQcAXhKu-gENWIWbw7ZdHa1qK2Fa1Hm3MNyuS5vZKOmFpwmaKoPLkJxKCVInu-cICRX4GcOZa8NCjw6UNBUihOTChs1LQQmKSLbUm5ID3PB4e_wp9dJtMgb2LSHLQSel_RVwdfKifW',
      span: 'md:col-span-4',
      height: 'h-[300px]'
    },
    {
      title: 'Patios por Edades',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo5QiBqRvZUIcam7K0j5evagOKzygCuWVJtnPvcT0m90Gje5XrCEacuVf_F1ewW0avRuWrrjJuKuoRHlQNFxoVKSS0EAs1jdD-zVr5SQHl6Z4Oc7IcGSqooGtRtF53AS1sdfhbW1l9PesAkJdCTKQe3EEWy__KzXC7on-2G8SOABTIa8N_lwD8lXaJRm--x1i18y76PtL7mmaFbtKfT6AtGEQqRS5TFVkoqZvDej1BVUn2F6CSntGXQwH99xYC96zGpliHP2L2GQTO',
      span: 'md:col-span-4',
      height: 'h-[300px]'
    },
    {
      title: 'SS.HH. Adaptados',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDvW7afBLxZbWfNVzvJ3YzH3BlhffBICfVPl5II5U1SK6wUIPc9X68uSYkDp8Rn2GEA_BzlDSmz9a5QTwyFumlr7DPshH5Us8g-YZzvlpkrLQvqjayw5MPDBfSIocOKclHfkmDcCa6-aRK6esMITdj35udrXA8bYjWdmdG_WSHMCnnWL-v2BIk5jF2KaHpbSEVTC3w-4eMCfHXrVTiieHCIRVw2snkLol35HXTXKpazEvO6t-iLTunN6zucpApCf12INcyX8quqcUd',
      span: 'md:col-span-4',
      height: 'h-[300px]'
    },
  ]

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="relative mb-20 overflow-hidden rounded-3xl bg-primary/10 p-12 md:p-20 flex flex-col items-center text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none pattern-bg"></div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block py-1 px-3 bg-accent-lime text-charcoal text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
            Bienvenidos al Crecimiento
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter">
            Espacios Diseñados para <span className="text-primary">Crecer</span>
          </h1>
          <p className="text-lg md:text-xl text-soft-gray mb-10 leading-relaxed">
            Un ambiente seguro, cálido y estimulante creado específicamente para el desarrollo integral y sensorial de tus hijos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 bg-charcoal text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105">
              <span className="material-symbols-outlined">explore</span>
              Ver Talleres
            </button>
          </div>
        </div>
      </section>

      {/* Specialized Workshops Section */}
      <section className="mb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black mb-2">Talleres Especializados</h2>
            <p className="text-soft-gray">Programas diseñados por expertos en pedagogía infantil.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Highlighted Card: Gimnasia Motriz */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvo9cSqR5j0q7vwq8BJ88fRbKPXd0bMx_V2HqJZT5Q4X4vMTE7ba3H8Tm6U0gPmLYqpPApxeSXiX3PQ2huY47r0br-uA-OB1a0PxIlcEpn1IeWaBMOUgHpv7lExqSfhZasH_F16xrc9vlaiIfPVFbDp-HRlEX3r9mtPX7rVI_SfqY7cXbpXXAZBIFL6w7fcy8TheO04GskvXAzB1uoN6M9iHwj0cxR2fRJBC6SWYSNfghBw7FIyh9RMJzrAw-ZPz8MFpGBUw8vHCiB')" }}
              ></div>
              <div className="absolute top-4 left-4 bg-primary text-charcoal font-bold px-3 py-1 rounded-lg text-xs uppercase">
                Programa Estrella
              </div>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-black mb-4">Gimnasia Motriz</h3>
              <p className="text-soft-gray mb-6 leading-relaxed">
                Programa innovador enfocado en el desarrollo físico, equilibrio y coordinación rítmica.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-primary">fitness_center</span>
                  <span>Vigas de equilibrio y colchonetas de alta densidad</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  <span>Lunes, Miércoles y Viernes</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary/20 hover:bg-primary text-charcoal font-bold rounded-xl transition-colors">
                Más Información
              </button>
            </div>
          </div>

          {/* Small Cards */}
          {workshops.map((workshop, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col">
              <div className={`size-14 ${workshop.colorClass} rounded-2xl flex items-center justify-center mb-6`}>
                <span className="material-symbols-outlined text-3xl">{workshop.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{workshop.title}</h3>
              <p className="text-soft-gray text-sm mb-6 flex-grow">{workshop.desc}</p>
              <div 
                className="w-full h-32 rounded-xl bg-cover bg-center mb-4"
                style={{ backgroundImage: `url('${workshop.image}')` }}
              ></div>
            </div>
          ))}

          {/* Psicomotricidad */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="size-14 bg-accent-lime text-charcoal rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">extension</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Psicomotricidad</h3>
              <p className="text-soft-gray mb-6">
                Equipamiento especializado con módulos de espuma, rampas y túneles diseñados para la seguridad total.
              </p>
              <ul className="grid grid-cols-2 gap-3 text-sm font-semibold">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-lime text-sm">check_circle</span>
                  Módulos Soft-Play
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-lime text-sm">check_circle</span>
                  Área Protegida
                </li>
              </ul>
            </div>
            <div 
              className="md:w-1/3 h-48 md:h-auto rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANF6Hwdck6cVENxhZejmWuzx19tdvZi7NlcwxG7U8ydLjruYhAbRosXOCVOBgdDceJaHkuHjuEAZ5TC0rxkKgIf8aFDcht8hA8TGUP0Sf1AkbM-WSZTVswVlkISXhRrdo4xSDAAGFCwqR3EHOtq58MY1ms7lxdGPehbH0gNm9655ReaZqDHpdrlYfpMOvA_UuERUO3I9cGPnwnZp5gqhp5W7zjIMA1rmgSsDYBNxDAsBbeB-RLQJXCkWt8Jw_PqsoE-yTr2AW7CpAy')" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Capacity Infographic */}
      <section className="mb-24 px-6 py-8 bg-charcoal rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-around gap-8 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">groups</span>
          </div>
          <div>
            <p className="text-2xl font-black">48 Niños</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Capacidad Total</p>
          </div>
        </div>
        <div className="h-px md:h-12 w-24 md:w-px bg-gray-700"></div>
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-accent-lime/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-accent-lime">category</span>
          </div>
          <div>
            <p className="text-2xl font-black">3 Secciones</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Diferenciadas por edad</p>
          </div>
        </div>
        <div className="h-px md:h-12 w-24 md:w-px bg-gray-700"></div>
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white">apartment</span>
          </div>
          <div>
            <p className="text-2xl font-black">Material Noble</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Construcción Segura</p>
          </div>
        </div>
      </section>

      {/* Infrastructure Gallery */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 tracking-tight">Infraestructura</h2>
          <p className="text-soft-gray max-w-2xl mx-auto">
            Cada rincón ha sido pensado para brindar comodidad, seguridad y las mejores herramientas tecnológicas y artísticas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {infrastructure.map((item, index) => (
            <div 
              key={index}
              className={`${item.span} ${item.height} relative rounded-3xl overflow-hidden group`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="text-xl font-bold">{item.title}</h4>
                {item.desc && <p className="text-gray-200">{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
