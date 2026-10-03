import { Link } from 'react-router-dom'
import Sticker from '../components/Sticker'
import { CM, SERVICIOS, wa } from '../data/casita'

const TL_COLORS = ['var(--pk)', 'var(--bu)', 'var(--sk)', 'var(--li)']
const MISS_ROT = [-2, 1.5, -1, 2, -1.5, 1, -2.5]

export default function Home() {
  return (
    <main>
      <section className="db-hero">
        <div className="txt">
          <span className="label" style={{ alignSelf: 'flex-start' }}>desde 3 meses hasta 5 años</span>
          <h1>Un nido donde se sienten en casa.</h1>
          <p className="lead">Nido y guardería en Surco. Grupos pequeños, mucho juego y un equipo que conoce a cada niño por su nombre.</p>
          <div className="row">
            <Link className="btn" to="/contacto">Agenda una visita</Link>
            <a className="btn light" href={wa('Hola, quisiera información sobre La Casita de Mami.')} target="_blank" rel="noopener noreferrer">Escríbenos</a>
          </div>
        </div>
        <div className="img">
          <img src={CM.aulas[0]} alt="Niños trabajando en el aula" />
          <span className="label tag">así empieza la mañana</span>
        </div>
      </section>

      <section className="wrap db-sec">
        <div className="db-ph" style={{ padding: 0 }}>
          <h2>Elige lo que tu familia necesita</h2>
          <p>Horarios claros y precios a la vista, sin letra chica.</p>
        </div>
        <div className="db-sv">
          {SERVICIOS.map((s) => (
            <Link key={s.id} className="db-card sc" style={{ '--c': s.color }} to={'/servicios#' + s.id}>
              <Sticker src={s.img} alt={s.cap} corners={false} />
              <h3>{s.n}</h3>
              <span className="ed">{s.edad} · {s.hora}</span>
              <div className="ft"><div><b>{s.precio}</b><small>{s.per}</small></div><span>Ver más →</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="db-col sc bot">
        <div className="wrap inner">
          <div className="db-ph" style={{ padding: 0 }}>
            <div><span className="label">nuestros espacios</span><h2 style={{ marginTop: 16 }}>Todo pensado para ellos</h2></div>
            <a className="btn light" href={CM.galeria} style={{ justifySelf: 'start' }}>Ver la galería →</a>
          </div>
          <div className="db-grid g3">
            {CM.espacios.map((e, i) => (
              <Sticker key={e.cap} className={i === 0 ? 'g1' : ''} src={e.src} cap={e.cap} rot={[-1, 1.5, -2, 2, -1.5, 1][i]} />
            ))}
          </div>
        </div>
      </section>

      <section className="db-sec db-aulas" style={{ paddingTop: 120 }}>
        <div className="wrap db-ph" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h2>Nuestras aulas</h2>
          <p>Mesas a su altura, material al alcance y grupos pequeños por edad.</p>
        </div>
        <div className="db-strip" tabIndex={0} aria-label="Fotos de las aulas">
          {CM.aulas.map((s, i) => (
            <Sticker key={s} src={s} alt="Niños en el aula" rot={[-1.5, 1, -1, 1.5, -1.2, 1.2, -1][i]} corners={i % 3 === 0} ratio="3/2" />
          ))}
        </div>
      </section>

      <section className="wrap db-sec" style={{ paddingTop: 40 }}>
        <div className="db-team">
          <div>
            <span className="label">quiénes somos</span>
            <h2 style={{ marginTop: 16 }}>Conoce a las misses</h2>
            <p>Docentes y auxiliares que acompañan a tu peque todo el año. Te contamos cómo va su día y conversamos contigo cuando lo necesites.</p>
            <div className="db-tl">
              {CM.talleres.map((t, i) => <span key={t} style={{ background: TL_COLORS[i % 4] }}>{t}</span>)}
            </div>
          </div>
          <div className="db-dir">
            <Sticker src={CM.directora} cap="la directora" rot={2} ratio="4/5" />
            <div className="db-dir-card sc" style={{ '--c': 'var(--bu)' }}>
              <h3>Dirige La Casita y conoce a cada familia</h3>
              <p>Ella te recibe en la visita, te muestra las aulas y está pendiente de cada niño durante todo el año.</p>
            </div>
          </div>
        </div>
        <div className="db-groups">
          {[
            { g: CM.equipo1, m: CM.misses.slice(0, 7), r: -1.5 },
            { g: CM.equipo2, m: CM.misses.slice(7), r: 1.5 },
          ].map((t, k) => (
            <div key={k} className="db-group">
              <Sticker src={t.g} alt="El equipo de La Casita" rot={t.r} ratio="3/2" />
              <div className="db-misses" style={{ '--n': t.m.length }}>
                {t.m.map((s, i) => (
                  <figure key={s} className="db-miss" style={{ transform: `rotate(${MISS_ROT[i % 7]}deg)` }}>
                    <img src={s} alt="Miss de La Casita" loading="lazy" />
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="db-visit sc">
        <div className="wrap inner">
          <div>
            <h2>Ven a conocernos</h2>
            <p>Coordinamos una visita con dirección. Te mostramos las aulas y resolvemos todas tus dudas.</p>
            <dl><dt>dónde</dt><dd>{CM.dir}, Surco</dd><dt>cuándo</dt><dd>{CM.horario}</dd></dl>
            <div className="row">
              <a className="btn bu" href={wa('Hola, quisiera agendar una visita.')} target="_blank" rel="noopener noreferrer">Coordinar por WhatsApp</a>
              <a className="btn light" href={CM.telHref}>Llamar al {CM.tel}</a>
            </div>
          </div>
          <Sticker src={CM.puerta} cap="busca la puerta del arcoíris" rot={3} ratio="4/3.4" />
        </div>
      </section>
    </main>
  )
}
