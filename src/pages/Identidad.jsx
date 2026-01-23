import { Link } from 'react-router-dom'

export default function Identidad() {
  const values = [
    { icon: 'favorite', color: 'primary', title: 'Autoestima', desc: 'Fomentamos el amor propio y la confianza en las capacidades individuales.' },
    { icon: 'directions_run', color: 'secondary', title: 'Autonomía', desc: 'Desarrollamos la capacidad de tomar decisiones con seguridad y libertad.' },
    { icon: 'trending_up', color: 'primary', title: 'Superación', desc: 'Motivamos la búsqueda constante de la excelencia personal.' },
    { icon: 'balance', color: 'secondary', title: 'Justicia', desc: 'Promovemos la equidad y el respeto mutuo en todo momento.' },
    { icon: 'psychology', color: 'primary', title: 'Actitud Crítica', desc: 'Enseñamos a cuestionar, analizar y reflexionar sobre el entorno.' },
    { icon: 'handshake', color: 'secondary', title: 'Solidaridad', desc: 'Cultivamos el apoyo mutuo y la empatía con los demás.' },
    { icon: 'construction', color: 'primary', title: 'Amor al Trabajo', desc: 'Inculcamos el valor del esfuerzo y la dedicación en cada tarea.' },
    { icon: 'account_balance', color: 'secondary', title: 'Civismo', desc: 'Respeto por las normas sociales y el amor a nuestra patria.' },
    { icon: 'task_alt', color: 'primary', title: 'Eficacia', desc: 'Desarrollamos la capacidad de lograr objetivos con calidad.' },
  ]

  const approaches = [
    { icon: 'gavel', label: 'Derechos' },
    { icon: 'groups', label: 'Inclusivo' },
    { icon: 'public', label: 'Intercultural' },
    { icon: 'diversity_3', label: 'Igualdad Género' },
    { icon: 'eco', label: 'Ambiental' },
    { icon: 'volunteer_activism', label: 'Bien Común' },
    { icon: 'grade', label: 'Excelencia' },
  ]

  const exitProfile = [
    'Se identifica como persona valiosa.',
    'Practica una vida activa y saludable.',
    'Aprecia manifestaciones artístico-culturales.',
    'Se comunica con fluidez y asertividad.',
    'Indaga y comprende el mundo natural.',
    'Interpreta la realidad mediante el juego.',
    'Gestiona su aprendizaje de manera autónoma.',
    'Interactúa respetando la diversidad.',
    'Utiliza entornos virtuales con responsabilidad.',
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden px-4 md:px-10 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div 
            className="relative min-h-[560px] flex items-center justify-center rounded-3xl overflow-hidden bg-center bg-cover"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRqskO2yJ-3lPz6D0fegZVonnF8I0dEPwzmRJuTL56am0RqXqLEXz-L0n4-D27WCzuh7L8LQsD1Ayh-Uk3gc0I0lxUXfUY23DLBehLx9nCtCaTaYi7bIZrzM1VKzTpw73nt8NCnySKWFqZmqXBf4TnsdjsMvxPovcurg_PtbNzmVnEyjXR2E8vlHQm25W4UTV7FnzVwqPa0wg4S9Yu7REy9_4L7bVbYG1_ht0DTyMkf6XgYVHtohKk0bzLEEYV_8GCKQJa4Htamujs")` }}
          >
            <div className="relative z-10 text-center px-6 max-w-4xl">
              <h1 className="text-white text-4xl md:text-7xl font-bold mb-6 leading-[1.1]">
                Nuestra Identidad: <span className="text-primary italic">Amor, Valores</span> y Excelencia
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                Formando corazones y mentes para un futuro brillante y lleno de valores fundamentales desde la primera infancia.
              </p>
              <Link 
                to="/talleres"
                className="bg-primary text-white px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-transform inline-block"
              >
                Descubre Nuestro Método
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-surface-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Nuestro Propósito</span>
            <h2 className="text-4xl font-bold mt-4 text-text-main">Misión y Visión Institucional</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-white p-12 rounded-3xl border border-black/5 custom-shadow flex flex-col gap-8 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-4xl">child_care</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">Nuestra Misión</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                  La Institución Educativa Inicial Privada "La Casita de Mami", perteneciente a una sociedad diversa y aun desigual y al mismo tiempo con grandes potencialidades, aspiramos a una educación que tiene como misión: que contribuya con la formación de todos los niños y niñas sin exclusión, así como de profesores conscientes de sus derechos y sus deberes, con una ética sólida, dispuestos a procurar su bienestar y el de los demás trabajando de forma colaborativa, cuidando el ambiente, investigando sobre el mundo que los rodea, siendo capaces de aprender permanentemente, y dotados con iniciativa y emprendimiento, con la participación de los Padres de Familia.
                </p>
              </div>
            </div>
            
            {/* Vision Card */}
            <div className="bg-white p-12 rounded-3xl border border-black/5 custom-shadow flex flex-col gap-8 group">
              <div className="w-16 h-16 bg-accent-lime/30 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">Nuestra Visión</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                  La IEIP "La Casita de Mami", de conformidad con el nuevo enfoque educativo aspira: Mejorar la calidad educativa a través del desarrollo del pensamiento, de una educación en democracia, para el trabajo basado en una educación en valores, con la finalidad de promover el desarrollo de las actitudes para lograr una identidad personal, comunal, institucional y nacional, que permita formar en los niños y niñas en lo ético, espiritual, cognitivo, afectivo, comunicativo, estético, corporal, ambiental, cultural y sociopolítico, a fin de lograr su formación evolutiva dentro de nuestra sociedad. Comprometida con el cambio social de su entorno a través del desarrollo de actividades productivas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Cimientos del Carácter</span>
              <h2 className="text-4xl font-bold mt-4 text-text-main">Valores que nos Definen</h2>
              <p className="text-text-muted mt-4 text-lg">Nuestros pilares éticos guían cada interacción y cada lección dentro de nuestra comunidad educativa.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border border-black/5 hover:border-primary/30 transition-all custom-shadow group">
                <span className={`material-symbols-outlined text-${value.color} text-4xl mb-4`}>{value.icon}</span>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-text-muted text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transversal Approaches */}
      <section className="py-24 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <h2 className="text-3xl font-bold text-center mb-16 text-text-main">Enfoques Transversales</h2>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {approaches.map((approach, index) => (
              <div key={index} className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-primary custom-shadow group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{approach.icon}</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-tighter">{approach.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exit Profile */}
      <section className="py-24 px-6 mb-20">
        <div className="max-w-4xl mx-auto bg-text-main text-white rounded-[2.5rem] p-10 md:p-20 overflow-hidden relative">
          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-10 text-center">Perfil de Egreso</h2>
            <p className="text-white/70 text-center mb-16 max-w-2xl mx-auto text-lg italic">
              "Un niño que egresa de La Casita de Mami es un ser capaz, consciente y preparado para los retos del mañana."
            </p>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {exitProfile.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">star</span>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
