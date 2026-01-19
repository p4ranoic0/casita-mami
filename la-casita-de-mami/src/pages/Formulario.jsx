import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Formulario() {
  const [formData, setFormData] = useState({
    parentFullName: '',
    parentPhone: '',
    parentEmail: '',
    parentDNI: '',
    parentRelation: '',
    studentFullName: '',
    studentBirthDate: '',
    studentAge: '',
    desiredLevel: '',
    previousSchool: '',
    workshopPreferences: [],
    medicalConditions: '',
    howDidYouHear: '',
    preferredSchedule: '',
    additionalComments: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        workshopPreferences: checked 
          ? [...prev.workshopPreferences, value]
          : prev.workshopPreferences.filter(w => w !== value)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData)
    // Navigate to confirmation page
    window.location.href = '/confirmacion'
  }

  return (
    <main className="max-w-[1280px] mx-auto px-6 lg:px-20 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold mb-4">
          Admisión 2025
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Formulario de Pre-Inscripción</h1>
        <p className="text-lg text-text-muted max-w-xl mx-auto">
          Complete el siguiente formulario para iniciar el proceso de admisión. Un asesor se comunicará con usted en las próximas 24-48 horas.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Form Column */}
        <div className="flex-1 order-2 lg:order-1">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
            {/* Section 1: Parent Info */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                <h2 className="text-xl font-bold">Datos del Padre, Madre o Apoderado</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-text-muted mb-2">Nombres y Apellidos Completos *</label>
                  <input 
                    type="text" 
                    name="parentFullName"
                    value={formData.parentFullName}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese nombres y apellidos"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Teléfono / Celular *</label>
                  <input 
                    type="tel" 
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    required
                    placeholder="999 999 999"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Correo Electrónico *</label>
                  <input 
                    type="email" 
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    required
                    placeholder="correo@ejemplo.com"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">DNI del Apoderado *</label>
                  <input 
                    type="text" 
                    name="parentDNI"
                    value={formData.parentDNI}
                    onChange={handleChange}
                    required
                    maxLength="8"
                    placeholder="12345678"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Relación con el Niño(a) *</label>
                  <select 
                    name="parentRelation"
                    value={formData.parentRelation}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Seleccione...</option>
                    <option value="madre">Madre</option>
                    <option value="padre">Padre</option>
                    <option value="tutor">Tutor Legal</option>
                    <option value="otro">Otro Familiar</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Student Info */}
            <div className="p-8 border-b border-gray-100 bg-background-light/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                <h2 className="text-xl font-bold">Datos del Niño o Niña</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-text-muted mb-2">Nombres y Apellidos del Niño(a) *</label>
                  <input 
                    type="text" 
                    name="studentFullName"
                    value={formData.studentFullName}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese nombres y apellidos"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Fecha de Nacimiento *</label>
                  <input 
                    type="date" 
                    name="studentBirthDate"
                    value={formData.studentBirthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Edad Actual *</label>
                  <select 
                    name="studentAge"
                    value={formData.studentAge}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Seleccione...</option>
                    <option value="1">1 año</option>
                    <option value="2">2 años</option>
                    <option value="3">3 años</option>
                    <option value="4">4 años</option>
                    <option value="5">5 años</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Nivel Deseado *</label>
                  <select 
                    name="desiredLevel"
                    value={formData.desiredLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Seleccione...</option>
                    <option value="cuna-1">Cuna - 1 año</option>
                    <option value="cuna-2">Cuna - 2 años</option>
                    <option value="inicial-3">Inicial - 3 años</option>
                    <option value="inicial-4">Inicial - 4 años</option>
                    <option value="inicial-5">Inicial - 5 años</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Colegio o Nido Anterior (si aplica)</label>
                  <input 
                    type="text" 
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    placeholder="Nombre de la institución"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Preferences */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                <h2 className="text-xl font-bold">Preferencias y Observaciones</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-3">Talleres de Interés (opcional)</label>
                  <div className="flex flex-wrap gap-3">
                    {['Gimnasia Motriz', 'Música y Canto', 'Cocina Creativa', 'Psicomotricidad'].map((workshop) => (
                      <label key={workshop} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          name="workshopPreferences"
                          value={workshop}
                          checked={formData.workshopPreferences.includes(workshop)}
                          onChange={handleChange}
                          className="size-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium group-hover:bg-primary/10 transition-colors">{workshop}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Condiciones Médicas o Alergias Importantes</label>
                  <textarea 
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Indique cualquier condición o alergia que debamos conocer..."
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-muted mb-2">¿Cómo se enteró de nosotros?</label>
                    <select 
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Seleccione...</option>
                      <option value="redes">Redes Sociales</option>
                      <option value="google">Búsqueda en Google</option>
                      <option value="referido">Recomendación</option>
                      <option value="cartel">Cartel/Publicidad</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-muted mb-2">Horario Preferido de Contacto</label>
                    <select 
                      name="preferredSchedule"
                      value={formData.preferredSchedule}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Seleccione...</option>
                      <option value="manana">Mañana (8am - 12pm)</option>
                      <option value="tarde">Tarde (12pm - 5pm)</option>
                      <option value="cualquiera">Cualquier hora</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-muted mb-2">Comentarios Adicionales</label>
                  <textarea 
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleChange}
                    rows="3"
                    placeholder="¿Tiene alguna pregunta o comentario adicional para nosotros?"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="p-8 bg-background-light">
              <div className="flex items-start gap-3 mb-6">
                <input 
                  type="checkbox" 
                  required
                  className="size-5 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                />
                <p className="text-sm text-text-muted">
                  He leído y acepto la <a href="#" className="text-primary underline">Política de Privacidad</a> y el <a href="#" className="text-primary underline">Tratamiento de Datos Personales</a> de La Casita de Mami.
                </p>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 px-8 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">send</span>
                Enviar Pre-Inscripción
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Column */}
        <aside className="lg:w-[360px] order-1 lg:order-2 flex flex-col gap-6">
          {/* Contact Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4">¿Necesitas Ayuda?</h3>
            <p className="text-sm text-text-muted mb-6">
              Si tienes dudas sobre el proceso de admisión, no dudes en contactarnos.
            </p>
            <div className="space-y-3">
              <a 
                href="https://wa.me/51988238378"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl text-green-700 font-semibold hover:bg-green-100 transition-colors"
              >
                <span className="material-symbols-outlined">chat</span>
                WhatsApp: 988 238 378
              </a>
              <a 
                href="tel:+51942694876"
                className="flex items-center gap-3 p-4 bg-background-light rounded-xl text-text-main font-semibold hover:bg-gray-200 transition-colors"
              >
                <span className="material-symbols-outlined">call</span>
                Llamar: 942 694 876
              </a>
            </div>
            <hr className="my-6" />
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span>Atención: Lun - Vie, 8am - 5pm</span>
            </div>
          </div>

          {/* Process Steps Summary */}
          <div className="bg-text-main text-white p-6 rounded-2xl">
            <h4 className="font-bold mb-4">Próximos Pasos</h4>
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <span className="text-white/80">Completa y envía este formulario.</span>
              </li>
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-white/20 text-white/60 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <span className="text-white/60">Recibirás confirmación por email.</span>
              </li>
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-white/20 text-white/60 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <span className="text-white/60">Te contactaremos para agendar visita.</span>
              </li>
              <li className="flex gap-3">
                <span className="size-6 rounded-full bg-white/20 text-white/60 flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <span className="text-white/60">Entrevista y evaluación del niño(a).</span>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </main>
  )
}
