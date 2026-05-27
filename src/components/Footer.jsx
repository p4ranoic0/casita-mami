import { Link } from 'react-router-dom'

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
)

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
  </svg>
)

const TikTokIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
)

const socials = [
  { href: 'https://www.instagram.com/lacasitademami_/', Icon: InstagramIcon, label: 'Instagram', hover: 'hover:bg-accent-pink hover:text-white' },
  { href: 'https://www.facebook.com/profile.php?id=61572934474798', Icon: FacebookIcon, label: 'Facebook', hover: 'hover:bg-[#1877F2] hover:text-white' },
  { href: 'https://www.tiktok.com/@lacasitademamisur', Icon: TikTokIcon, label: 'TikTok', hover: 'hover:bg-text-main hover:text-white' },
  { href: 'https://api.whatsapp.com/send?phone=51908880326', Icon: WhatsAppIcon, label: 'WhatsApp', hover: 'hover:bg-[#25D366] hover:text-white' },
]

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-primary/10 bg-white">
      <div className="mx-auto w-full max-w-[1240px] px-6 pb-6 pt-12">
        <div className="mb-8 grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="La Casita de Mami"
                className="size-11 rounded-full object-cover shadow-soft"
              />
              <div className="leading-tight">
                <div className="font-display text-lg font-bold text-primary tracking-tight">La Casita de Mami</div>
                <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-text-muted">Nido · Guardería · Surco</div>
              </div>
            </Link>
            <p className="max-w-[360px] text-sm leading-relaxed text-text-muted">
              Educación inicial con corazón. Formando niños felices, seguros y autónomos.
            </p>
            <div className="flex gap-2">
              {socials.map(({ href, Icon, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition ${hover}`}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-text-main">Navegación</div>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-primary">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-text-main">Contacto</div>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li>Calle Morropón 105</li>
              <li>Santiago de Surco, Lima</li>
              <li><a href="tel:+51908880326" className="hover:text-primary">+51 908 880 326</a></li>
              <li><a href="mailto:lacasitademamisurco@gmail.com" className="break-all hover:text-primary">lacasitademamisurco@gmail.com</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-text-main">Horario</div>
            <ul className="flex flex-col gap-2.5 text-sm text-text-muted">
              <li>Lunes a viernes</li>
              <li className="font-semibold text-text-main">8:00 a.m. – 6:00 p.m.</li>
              <li>Sábados con cita previa</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-primary/10 pt-6 text-xs text-text-muted md:flex-row md:items-center">
          <span>© 2026 La Casita de Mami. Todos los derechos reservados.</span>
          <span>lacasitademami.edu.pe</span>
        </div>
      </div>
    </footer>
  )
}
