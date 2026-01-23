import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection, { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  staggerItem,
  scaleIn 
} from '../components/AnimatedSection'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full px-4 md:px-10 py-6 md:py-10 max-w-[1280px] mx-auto">
        <motion.div 
          className="relative rounded-2xl overflow-hidden min-h-[560px] flex items-end md:items-center p-6 md:p-16 bg-cover bg-center group"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAU5BP69uyeh6_4Rb7hjvQmah7JIGVXpTiWNpN7Xh5qiDaYpnhZcnLi5H97x4spdflpC3z9uIfDEk9vvqS6cSzg0clnWCPn1tzHEHin73L-cCZ_cil3x24fmofr4RgoeICzn5SUKywu7ZAtEysQZDoPMxUD_DgQ72PcfMBWb10eKZ9X6frmzqoIoGW-bDsud-TzfxDFo7-XV_AhIK_aOXAdTzF86NQtKtUHycqMONJ-uKAPupddDUyLQiYeXKZ1Rbhj01-pBAaUMJ02')" }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          
          <motion.div 
            className="relative z-10 max-w-2xl flex flex-col gap-6 md:gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="flex flex-col gap-3">
              <motion.span 
                variants={staggerItem}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-lime text-xs font-bold uppercase tracking-wider text-text-main w-fit"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                Nido en Surco
              </motion.span>
              <motion.h1 
                variants={staggerItem}
                className="text-white text-4xl md:text-6xl font-black leading-[1.1] tracking-tight"
              >
                Bienvenidos a Nuestro Hogar Educativo
              </motion.h1>
              <motion.p 
                variants={staggerItem}
                className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-lg"
              >
                Educación inicial con amor materno. Un espacio seguro, cálido y lleno de aprendizaje para tus hijos.
              </motion.p>
            </div>
            <motion.div 
              variants={staggerItem}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/formulario"
                  className="bg-primary hover:bg-primary-dark text-text-main font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-colors inline-block"
                >
                  Solicitar Información
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/ubicacion"
                  className="bg-white hover:bg-gray-50 text-text-main font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">calendar_month</span>
                  Agendar Visita
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* About Us Section */}
      <div className="w-full px-4 md:px-10 py-16 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <AnimatedSection className="order-2 md:order-1 relative" variants={fadeInLeft}>
            {/* Decorative background blob */}
            <motion.div 
              className="absolute -left-10 -top-10 w-full h-full bg-accent-lime/30 rounded-[3rem] -rotate-3 z-0"
              animate={{ 
                rotate: [-3, -5, -3],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.img 
              className="relative z-10 w-full rounded-2xl shadow-card aspect-[4/3] object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiFiIAwRyi5qwBRkW2mrLEJSZCEkYNGSNj7CAN5I0_4ht-XbrimzbH49HVIIT8IgFnIOefZRE2J9sbnNt7PS61RlVne03fK2vweZqXi84gTBGEGLdY0BBEj85QPf2L7NrykPRfG3PJ_YnRIbo1TcfyNIhn6rqtEtNxjaDyzwVMXqc0EhdFWfJ69N5WvolQTxL7QcUzIQOs00z67lmg1KQPsBqYfREFW-8w-EnPk4OraFxFpuIRwv9ftLviZei0xohiIub7AFNtKDYh"
              alt="Maestra leyendo un cuento a niños pequeños"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            {/* Floating badge */}
            <motion.div 
              className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-soft flex items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="size-10 bg-accent-coral/20 rounded-full flex items-center justify-center text-accent-coral">
                <span className="material-symbols-outlined filled">favorite</span>
              </div>
              <div>
                <p className="text-xs text-text-muted font-bold uppercase">Filosofía</p>
                <p className="text-text-main font-bold">Amor Materno</p>
              </div>
            </motion.div>
          </AnimatedSection>
          
          <AnimatedSection className="order-1 md:order-2 flex flex-col gap-6" variants={fadeInRight}>
            <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">Amor Materno y Ambiente Familiar</h2>
            <p className="text-text-muted text-lg leading-relaxed">
              En <span className="text-primary font-bold">La Casita de Mami</span>, extendemos el calor del hogar a nuestras aulas. Creemos que el aprendizaje significativo solo ocurre cuando el niño se siente amado y seguro.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              Nuestro enfoque se basa en el cariño, la seguridad emocional y la atención personalizada, permitiendo que tu pequeño explore el mundo con confianza, tal como lo haría en casa.
            </p>
            <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
              <Link to="/identidad" className="text-primary font-bold text-lg inline-flex items-center gap-1 hover:gap-2 transition-all mt-2">
                Conoce Nuestra Historia <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-20">
        <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">¿Por qué elegirnos?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mt-3">Nuestros Pilares Educativos</h2>
            <p className="text-text-muted mt-4 text-lg">Una propuesta diseñada pensando en el bienestar integral de tu hijo.</p>
          </AnimatedSection>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: 'diversity_1', title: 'Atención Personalizada', desc: 'Grupos reducidos que nos permiten conocer y potenciar el talento único de cada niño.' },
              { icon: 'gite', title: 'Infraestructura Segura', desc: 'Espacios diseñados específicamente para la primera infancia, seguros y estimulantes.' },
              { icon: 'palette', title: 'Talleres Creativos', desc: 'Aulas especializadas para Arte, Música y Psicomotricidad que despiertan la imaginación.' },
              { icon: 'medical_services', title: 'Servicios de Salud', desc: 'Soporte preventivo en psicología y odontología pediátrica incluido en nuestra propuesta.' },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-background-light p-8 rounded-2xl border border-transparent hover:border-primary/20 transition-colors group"
                variants={staggerItem}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
                }}
              >
                <motion.div 
                  className="size-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-text-main mb-3">{feature.title}</h3>
                <p className="text-text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 7 Principles */}
      <div className="w-full px-4 md:px-10 py-20 max-w-[1280px] mx-auto" id="propuesta">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main">Nuestros 7 Principios</h2>
            <p className="text-text-muted mt-4 text-lg">Basados en una pedagogía activa donde el niño es el protagonista de su propio aprendizaje.</p>
          </div>
        </AnimatedSection>
        
        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {[
            { icon: 'handshake', color: 'bg-blue-100 text-blue-600', title: 'Respeto', desc: 'Valoramos el ritmo individual y las emociones de cada niño.' },
            { icon: 'security', color: 'bg-green-100 text-green-600', title: 'Seguridad', desc: 'Ambiente físico y emocional protegido para la exploración.' },
            { icon: 'favorite', color: 'bg-red-100 text-red-600', title: 'Salud', desc: 'Promoción de hábitos saludables y bienestar físico.' },
            { icon: 'accessibility_new', color: 'bg-orange-100 text-orange-600', title: 'Autonomía', desc: 'Fomentamos la independencia en actividades cotidianas.' },
            { icon: 'directions_run', color: 'bg-purple-100 text-purple-600', title: 'Movimiento', desc: 'El aprendizaje entra por el cuerpo y la experiencia activa.' },
            { icon: 'forum', color: 'bg-teal-100 text-teal-600', title: 'Comunicación', desc: 'Diversos lenguajes expresivos para manifestar el mundo interior.' },
            { icon: 'toys', color: 'bg-yellow-100 text-yellow-600', title: 'Juego Libre', desc: 'La herramienta más seria y poderosa de aprendizaje infantil.' },
          ].map((principle, index) => (
            <motion.div 
              key={index} 
              className="flex-1 min-w-[280px] md:max-w-[300px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              variants={staggerItem}
              whileHover={{ 
                y: -6,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
              }}
            >
              <motion.div 
                className={`size-10 rounded-full ${principle.color} flex items-center justify-center mb-4`}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <span className="material-symbols-outlined">{principle.icon}</span>
              </motion.div>
              <h4 className="text-lg font-bold mb-2">{principle.title}</h4>
              <p className="text-sm text-text-muted">{principle.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Innovation Banner */}
      <div className="w-full px-4 md:px-10 py-10 max-w-[1280px] mx-auto" id="talleres">
        <AnimatedSection variants={scaleIn}>
          <div className="bg-[#12201e] rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
            {/* Background Pattern */}
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <motion.div 
              className="relative z-10 flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-primary mb-4 border border-primary/20">
                <motion.span 
                  className="material-symbols-outlined text-sm"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  bolt
                </motion.span>
                <span className="text-xs font-bold uppercase tracking-wide">Innovación Educativa</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Proyecto "Gimnasia Motriz"</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                Un programa exclusivo diseñado para desarrollar la coordinación, el equilibrio y la confianza física desde los primeros pasos.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <motion.div 
                  className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <span className="material-symbols-outlined text-accent-lime">schedule</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-400 uppercase font-bold">Horarios</p>
                    <p className="text-white text-sm font-medium">Martes y Jueves</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <span className="material-symbols-outlined text-accent-lime">groups</span>
                  <div className="text-left">
                    <p className="text-xs text-gray-400 uppercase font-bold">Edades</p>
                    <p className="text-white text-sm font-medium">2 a 5 años</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative z-10 w-full md:w-auto flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="relative size-60 md:size-80 bg-primary rounded-full flex items-center justify-center overflow-hidden border-8 border-white/5"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTqUEiaRfUABDLtL4q-hs3roAeYPx3KESBQVAXxmuuGa3VQr3NwnwZuCjS0scomldW-ScQ1W6zpTSc6XlWyVcYKSJalxdosGe1WVuusaj-vEyk3yUn7fS-6u41Rwt9JxSscbRq_yyB4-J0qcVhsR01S6iUoaMhpF4_VfCYC-dRhlso1hyKOjsWgv2zb8qPQovmACuwMuu5DSZxPmyEmP-bdOH8_msrT_Dlorup3TFnIG_IUBH2kDW0unNbR7PSn8I79M4YplibbYdq"
                  alt="Niño escalando estructura de gimnasio"
                />
                <motion.span 
                  className="material-symbols-outlined text-white text-[80px] absolute drop-shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  sports_gymnastics
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>

      {/* Admissions Timeline */}
      <div className="bg-white py-20 mt-10" id="admision">
        <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main">Proceso de Admisión</h2>
            <p className="text-text-muted mt-3 text-lg">Únete a nuestra familia en 4 sencillos pasos.</p>
          </AnimatedSection>
          
          <div className="relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed border-t-2 border-dashed border-gray-200 -z-10 -translate-y-1/2"></div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { num: 1, title: 'Contacto', desc: 'Llena nuestro formulario o llámanos para conocernos.', color: 'bg-primary text-white' },
                { num: 2, title: 'Visita Guiada', desc: 'Conoce nuestras instalaciones y a nuestras maestras.', color: 'bg-accent-lime text-text-main' },
                { num: 3, title: 'Documentación', desc: 'Entrega de DNI, ficha de salud y fotos tamaño carnet.', color: 'bg-gray-200 text-text-main' },
                { num: 4, title: 'Matrícula', desc: '¡Bienvenido! Formalizamos la inscripción de tu pequeño.', color: 'bg-primary/20 text-primary', icon: 'check' },
              ].map((step, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative"
                  variants={staggerItem}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                >
                  <motion.div 
                    className={`size-12 ${step.color} rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-white shadow-sm z-10`}
                    whileHover={{ scale: 1.2 }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                  >
                    {step.icon ? <span className="material-symbols-outlined">{step.icon}</span> : step.num}
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/admision"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-text-main font-bold px-8 py-4 rounded-xl transition-colors"
              >
                Ver Proceso Completo
                <motion.span 
                  className="material-symbols-outlined"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  arrow_forward
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full px-4 md:px-10 py-20 max-w-[1280px] mx-auto">
        <AnimatedSection variants={scaleIn}>
          <div className="bg-accent-lime/20 rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden">
            <motion.span 
              className="material-symbols-outlined text-6xl text-primary/30 absolute top-8 left-8"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              format_quote
            </motion.span>
            <motion.p 
              className="text-2xl md:text-3xl font-bold text-text-main leading-snug max-w-4xl mx-auto relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              "Nunca imaginé encontrar un lugar donde mi hijo se sintiera tan amado. La Casita de Mami es realmente una extensión de nuestro hogar. Las maestras son ángeles."
            </motion.p>
            <motion.div 
              className="mt-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="size-16 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZR-PnoOW_rEVMcKpJpInztvr7dgNCsthQVi3CgzqAAJIp83Kk1mlOH4PPDvVCtWaoYeZS9Xyvk0mE9B0jEXcp2dSJYc0zUeVZWTx2I0P2knqezZ_l9tvL2Y_lkfu_0_2LNFMCudxKXK3a8C4CUHR8pZkTAIDxBk-aQnSbXge3z-Hgrrcv95fYRbSQ6WqWrbDekynAg4QnAnrCxTtjvQ3Zb7b0u4sfaHNeuWrxiMM9HzAHMwtrxuAbmrFTrykbvkeYyn2pMmM-n9qA"
                  alt="Retrato de madre"
                />
              </motion.div>
              <p className="font-bold text-text-main">Carla Mendoza</p>
              <p className="text-sm text-text-muted">Mamá de Santiago (3 años)</p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </>
  )
}
