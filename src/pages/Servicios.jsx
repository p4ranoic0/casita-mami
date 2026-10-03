import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Sticker from '../components/Sticker'
import { SERVICIOS, wa } from '../data/casita'

export default function Servicios() {
  // La pestaña activa vive en el #hash (/servicios#tarde) para que se pueda
  // enlazar desde Inicio y compartir.
  const { hash } = useLocation()
  const navigate = useNavigate()
  const tab = SERVICIOS.some((x) => x.id === hash.slice(1)) ? hash.slice(1) : 'nido'
  const s = SERVICIOS.find((x) => x.id === tab)
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const pick = (id) => navigate({ hash: id }, { replace: true })

  return (
    <main className="wrap">
      <div className="db-ph">
        <div><span className="label">servicios</span><h1 style={{ marginTop: 18 }}>Para cada etapa, un espacio.</h1></div>
        <p>Nido, guardería y un acompañamiento de bienestar que suma a los dos.</p>
      </div>
      <div className="db-tabs" role="tablist">
        {SERVICIOS.map((x) => (
          <button key={x.id} id={'tab-' + x.id} role="tab" aria-selected={tab === x.id} aria-controls="db-panel"
            className={tab === x.id ? 'on' : ''} style={{ background: x.color }} onClick={() => pick(x.id)}>
            {x.n}
          </button>
        ))}
      </div>
      <section id="db-panel" role="tabpanel" aria-labelledby={'tab-' + s.id} className="db-panel" style={{ background: s.color }} key={s.id}>
        <Sticker src={s.img} cap={s.cap} priority sizes="(max-width: 900px) 100vw, 45vw" />
        <div>
          <h2>{s.n}</h2>
          <p className="intro">{s.intro}</p>
          <dl className="db-facts" style={{ margin: 0 }}>
            <div><dt>edad</dt><dd>{s.edad}</dd></div>
            <div><dt>horario</dt><dd>{s.hora}</dd></div>
            <div><dt>{s.per}</dt><dd className="big">{s.precio}</dd></div>
          </dl>
          <ul className="db-inc">{s.incluye.map((x) => <li key={x}>{x}</li>)}</ul>
          <div className="row">
            <a className="btn" href={wa(`Hola, quisiera información sobre ${s.n} y vacantes.`)} target="_blank" rel="noopener noreferrer">Preguntar por vacantes</a>
            <Link className="btn light" to="/contacto">Agendar visita</Link>
          </div>
        </div>
      </section>
      <section className="db-help sc">
        <div><h3 style={{ fontSize: 32 }}>¿No sabes cuál elegir?</h3><p>Cuéntanos la edad de tu peque y el horario de tu familia. Te orientamos.</p></div>
        <a className="btn wa" href={wa('Hola, no sé qué servicio elegir. Mi peque tiene ')} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
      </section>
      <div style={{ height: 80 }} />
    </main>
  )
}
