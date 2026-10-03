import Sticker from '../components/Sticker'
import VisitForm from '../components/VisitForm'
import { CM, wa } from '../data/casita'
import Picture from '../components/Picture'

export default function Contacto() {
  return (
    <main className="wrap">
      <div className="db-ph">
        <div><span className="label">contacto</span><h1 style={{ marginTop: 18 }}>Estamos en Surco.</h1></div>
        <p>Escríbenos, llámanos o deja tus datos y coordinamos una visita guiada.</p>
      </div>
      <section className="db-post">
        <div className="l">
          <h2 style={{ fontSize: 36 }}>Agenda tu visita</h2>
          <VisitForm />
        </div>
        <div className="r">
          <div className="stamp"><Picture src={CM.logo} alt="" aria-hidden="true" sizes="160px" /></div>
          <div className="addr">
            <small>whatsapp · te respondemos el mismo día</small>
            <a href={wa('Hola, quisiera información.')} target="_blank" rel="noopener noreferrer">{CM.tel}</a>
            <small>teléfono</small><a href={CM.telHref}>{CM.tel}</a>
            <small>correo</small><a href={'mailto:' + CM.mail}>{CM.mail}</a>
            <small>dirección</small><a href={CM.maps} target="_blank" rel="noopener noreferrer">{CM.dir}, {CM.distrito}</a>
            <small>horario</small><span>{CM.horario}</span>
          </div>
        </div>
      </section>
      <section className="db-mapw">
        <Sticker src={CM.puerta} alt="Fachada de La Casita de Mami en Calle Morropón 105, Surco" cap="la puerta del arcoíris" rot={-3} ratio="4/3.4" priority sizes="(max-width: 900px) 100vw, 48vw" />
        <div>
          <iframe title="Mapa de La Casita de Mami" src={CM.mapEmbed} loading="lazy" />
          <a href={CM.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 14, fontWeight: 800 }}>Abrir en Google Maps →</a>
        </div>
      </section>
    </main>
  )
}
