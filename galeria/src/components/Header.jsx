import { asset } from '../lib/paths.js'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background-light/80 border-b border-primary-soft">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        {/* Logo → portada de la galería (BASE_URL = /galeria/) */}
        <a href={import.meta.env.BASE_URL} className="flex items-center gap-3">
          <img src={asset('logo.jpg')} alt="La Casita de Mami" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display font-semibold text-lg text-text-main">Galería</span>
        </a>
        {/* Volver al sitio principal (raíz del dominio) */}
        <a
          href="/"
          className="text-sm font-semibold text-primary-dark hover:text-primary transition-colors"
        >
          ← Volver al sitio
        </a>
      </div>
    </header>
  )
}
