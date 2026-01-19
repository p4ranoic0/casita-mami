import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="w-full px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand & Info */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">child_care</span>
              </div>
              <h2 className="text-text-main text-xl font-bold">La Casita de Mami</h2>
            </Link>
            <p className="text-text-muted">
              Educación inicial con corazón. Formando niños felices, seguros y autónomos en el corazón de Surco.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.02C13.78 8.51 13.39 9.28 13.39 10.07V12.06H16.18L15.74 14.96H13.39V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-bold mb-4">Institución</h3>
            <ul className="space-y-3 text-text-muted">
              <li><Link to="/identidad" className="hover:text-primary transition-colors">Identidad</Link></li>
              <li><Link to="/talleres" className="hover:text-primary transition-colors">Talleres</Link></li>
              <li><Link to="/servicios" className="hover:text-primary transition-colors">Servicios</Link></li>
              <li><Link to="/familias" className="hover:text-primary transition-colors">Familias</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="font-bold">Contacto</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-text-muted">
                <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                <span>Calle Bayóvar Sur 234,<br/>Santiago de Surco, Lima</span>
              </li>
              <li className="flex items-center gap-3 text-text-muted">
                <span className="material-symbols-outlined text-primary">call</span>
                <a href="tel:+51987654321" className="hover:text-primary transition-colors">+51 987 654 321</a>
              </li>
              <li className="flex items-center gap-3 text-text-muted">
                <span className="material-symbols-outlined text-primary">mail</span>
                <a href="mailto:hola@lacasitademami.pe" className="hover:text-primary transition-colors">hola@lacasitademami.pe</a>
              </li>
            </ul>
          </div>
          
          {/* Map */}
          <div className="md:col-span-3">
            <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden relative group">
              <img 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx5j8rXBShUB1-6KrUngbrtAtWToX1b6_TRLZ6t2qA42bqEyEDHspw3sC_zapsYde85fS-ftecDHS69NUAPYUlXUpJituqsShfZOd-dKzX2zhyCn68QGAV6xgFBG9p4aN7Lk8GeFe7K4p6esJscq26QihgWnABm1-kaQNiFXXY0B7px-a2M6JeBHLWROci3F1iHibONlkmyb91mE6qvmknFLSqpvFUtzhT_jcy__z5JiZJqm0TcJ1mQdlNgdM6O0Mh5_Ry-gv3cBj1"
                alt="Mapa de ubicación en Surco"
              />
              <Link 
                to="/ubicacion"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">pin_drop</span>
                  <span className="text-xs font-bold text-text-main">Ver en Mapa</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2024 La Casita de Mami. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-text-main">Privacidad</a>
            <a href="#" className="text-sm text-gray-400 hover:text-text-main">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
