import { Link } from 'react-router-dom'

/**
 * MobileActionBar
 * ----------------------------------------------------------------------------
 * Barra sticky inferior con las 3 acciones principales: Llamar, WhatsApp,
 * Agendar. Solo aparece en móvil (<880px).
 *
 * Acordarse de agregar padding-bottom al <body> o al <Layout> para que el
 * footer no quede tapado: `pb-[84px] md:pb-0`.
 */
export default function MobileActionBar() {
  return (
    <div className="md:hidden fixed inset-x-3 bottom-3 z-40 flex gap-1.5 p-1.5 rounded-2xl bg-white border border-primary/15 shadow-[0_12px_36px_-8px_rgba(42,31,58,0.25)]">
      <a
        href="tel:+51908880326"
        className="flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl bg-primary/10 text-primary"
      >
        <span className="material-symbols-outlined text-[22px]">call</span>
        <span className="text-[11px] font-bold">Llamar</span>
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=51908880326"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl bg-[#25D366]/15 text-[#1c8b48]"
      >
        <span className="material-symbols-outlined text-[22px]">chat</span>
        <span className="text-[11px] font-bold">WhatsApp</span>
      </a>
      <Link
        to="/contacto"
        className="flex-[1.2] flex flex-col items-center gap-0.5 py-2.5 rounded-xl bg-primary text-white"
      >
        <span className="material-symbols-outlined text-[22px]">calendar_month</span>
        <span className="text-[11px] font-bold">Agendar</span>
      </Link>
    </div>
  )
}
