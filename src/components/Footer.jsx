import { CM, PAGES, wa } from '../data/casita'
import { Brand, PageLink } from './Header'

export default function Footer({ routes }) {
  return (
    <footer className="db-foot">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="db-brand"><Brand /></div>
            <p style={{ marginTop: 16, fontSize: 15, maxWidth: 320, color: '#CFC3DD' }}>
              Educación inicial con corazón, desde los 3 meses hasta los 5 años.
            </p>
          </div>
          <div>
            <h4>páginas</h4>
            <ul>{PAGES.map((p) => <li key={p.id}><PageLink id={p.id} routes={routes}>{p.l}</PageLink></li>)}</ul>
          </div>
          <div>
            <h4>dónde</h4>
            <ul>
              <li>{CM.dir}</li>
              <li>{CM.distrito}</li>
              <li><a href={CM.telHref}>{CM.tel}</a></li>
              <li><a href={'mailto:' + CM.mail} style={{ overflowWrap: 'anywhere' }}>{CM.mail}</a></li>
            </ul>
          </div>
          <div>
            <h4>síguenos</h4>
            <ul>
              {CM.redes.map((x) => <li key={x.l}><a href={x.h} target="_blank" rel="noopener noreferrer">{x.l}</a></li>)}
              <li><a href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="bot"><span>© {new Date().getFullYear()} La Casita de Mami</span><span>lacasitademami.edu.pe</span></div>
      </div>
    </footer>
  )
}
