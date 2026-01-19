export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/51987654321" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 size-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all z-[100]"
      aria-label="Contactar por WhatsApp"
    >
      <span className="material-symbols-outlined text-4xl">chat</span>
    </a>
  )
}
