import { useState } from 'react'
import { wa } from '../data/casita'

// Arma el mensaje y lo abre en WhatsApp. No guarda nada en el servidor.
export default function VisitForm() {
  const [f, setF] = useState({ nombre: '', tel: '', edad: '', cuando: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const send = (e) => {
    e.preventDefault()
    const t = `Hola, quisiera agendar una visita a La Casita de Mami.\nNombre: ${f.nombre}\nTeléfono: ${f.tel}\nEdad de mi peque: ${f.edad}\nCuándo me acomoda: ${f.cuando}`
    window.open(wa(t), '_blank', 'noopener')
  }
  return (
    <form className="db-form" onSubmit={send}>
      <label><span>Tu nombre</span><input value={f.nombre} onChange={set('nombre')} required autoComplete="name" placeholder="Ej. Andrea Ríos" /></label>
      <label><span>Teléfono</span><input value={f.tel} onChange={set('tel')} required inputMode="tel" autoComplete="tel" placeholder="9xx xxx xxx" /></label>
      <label><span>Edad de tu peque</span><input value={f.edad} onChange={set('edad')} placeholder="Ej. 2 años" /></label>
      <label><span>¿Qué día te acomoda?</span><input value={f.cuando} onChange={set('cuando')} placeholder="Ej. martes en la mañana" /></label>
      <button type="submit" className="btn wa">Enviar por WhatsApp</button>
    </form>
  )
}
