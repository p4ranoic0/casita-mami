import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CM, PAGES } from '../data/casita'

export function PageLink({ id, routes, className, onClick, children }) {
  const p = PAGES.find((x) => x.id === id)
  if (routes && routes[id]) return <Link to={routes[id]} className={className} onClick={onClick}>{children}</Link>
  return <a href={p.href} className={className} onClick={onClick}>{children}</a>
}

export function Brand() {
  return (
    <>
      <span className="lg"><img src={CM.logo} alt="" /></span>
      <div><b>La Casita de Mami</b><span>nido y guardería · Surco</span></div>
    </>
  )
}

export default function Header({ current, routes }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [current])
  const close = () => setOpen(false)
  return (
    <header className="db-head">
      <div className="wrap">
        <PageLink id="inicio" routes={routes} className="db-brand"><Brand /></PageLink>
        <nav className="db-nav" aria-label="Principal">
          {PAGES.map((p) => (
            <PageLink key={p.id} id={p.id} routes={routes} className={current === p.id ? 'on' : ''}>{p.l}</PageLink>
          ))}
        </nav>
        <a className="db-tel" href={CM.telHref}>{CM.tel}</a>
        <PageLink id="contacto" routes={routes} className="btn">Agenda una visita</PageLink>
        <button className="db-burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="db-mob">
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>
      <div id="db-mob" className={'db-mob' + (open ? ' open' : '')}>
        {PAGES.map((p) => (
          <PageLink key={p.id} id={p.id} routes={routes} onClick={close}>{p.l}</PageLink>
        ))}
        <a href={CM.telHref}>Llamar al {CM.tel}</a>
        <PageLink id="contacto" routes={routes} className="btn" onClick={close}>Agenda una visita</PageLink>
      </div>
    </header>
  )
}
