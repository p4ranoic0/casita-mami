// Datos reales de La Casita de Mami: contacto, servicios, fotos.
// Una sola fuente para Header, Footer y páginas.
import logo from '../assets/logo.jpg'
import puerta from '../assets/contact/contacto-galeria-04.jpeg'

const real = import.meta.glob('../assets/real/*.jpg', { eager: true, import: 'default' })
export const r = (name) => real[`../assets/real/${name}.jpg`]

const WA = '51908880326'
export const wa = (text) =>
  'https://api.whatsapp.com/send?phone=' + WA + (text ? '&text=' + encodeURIComponent(text) : '')

export const CM = {
  logo,
  logoPublico: '/logo.webp',
  imagenSocial: '/og-image.jpg',
  puerta,
  tel: '908 880 326',
  telHref: 'tel:+51908880326',
  mail: 'lacasitademamisurco@gmail.com',
  dir: 'Calle Morropón 105',
  distrito: 'Santiago de Surco, Lima',
  maps: 'https://www.google.com/maps/search/?api=1&query=Calle+Morropon+105+Santiago+de+Surco',
  mapEmbed: 'https://www.google.com/maps?q=Calle+Morropon+105,+Santiago+de+Surco,+Lima&output=embed',
  galeria: '/galeria/',
  horario: 'Lunes a viernes, 8:00 a.m. – 6:00 p.m.',
  horarioDatos: { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '08:00', cierra: '18:00' },
  sabado: 'Sábados con cita previa',
  redes: [
    { l: 'Instagram', h: 'https://www.instagram.com/lacasitademami_/' },
    { l: 'Facebook', h: 'https://www.facebook.com/profile.php?id=61572934474798' },
    { l: 'TikTok', h: 'https://www.tiktok.com/@lacasitademamisur' },
  ],
  talleres: ['Psicomotricidad', 'Arte', 'Música', 'Inglés', 'Cuentos', 'Juego libre'],
  equipo1: r('portada-01'),
  equipo2: r('portada-02'),
  directora: r('miss-04'),
  espacios: [
    ['espacio-01', 'Patio principal'],
    ['espacio-02', 'Psicomotricidad'],
    ['espacio-03', 'Área de juegos'],
    ['espacio-04', 'Cuarto de cunas'],
    ['espacio-05', 'Arenero'],
    ['espacio-06', 'Baños'],
  ].map(([f, cap]) => ({ src: r(f), cap })),
  aulas: [1, 2, 3, 4, 5, 6, 7].map((n) => r('aula-0' + n)),
  // 7 misses de turquesa (grupo 1) y 6 de verde (grupo 2), en el orden de las fotos
  misses: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((n) => r('miss-' + String(n).padStart(2, '0'))),
}

// Rutas absolutas del dominio. Lo comparten el sitio y la galería (que vive en
// /galeria/ con su propio router), así que cada app indica en `routes` qué
// páginas maneja su router; el resto va como enlace normal.
export const PAGES = [
  { id: 'inicio', l: 'Inicio', href: '/' },
  { id: 'servicios', l: 'Servicios', href: '/servicios' },
  { id: 'galeria', l: 'Galería', href: '/galeria/' },
  { id: 'contacto', l: 'Contacto', href: '/contacto' },
]

// Orden de las pestañas/tarjetas. Precios "Consultar" y el horario de la tarde
// están pendientes de confirmar con dirección.
export const SERVICIOS = [
  {
    id: 'nido', n: 'Nido', edad: '3 a 5 años', hora: '8:00 a.m. – 1:00 p.m.', precio: 'S/ 690', per: 'al mes',
    img: r('aula-04'), cap: 'trabajando en mesa', color: 'var(--pk)',
    intro: 'Educación inicial por edades, con juego, lenguaje y autonomía todos los días.',
    incluye: ['Aulas por nivel, 12 niños por aula', 'Psicomotricidad e inglés', 'Material y talleres regulares', 'Comunicación constante con la familia'],
  },
  {
    id: 'guarderia', n: 'Guardería', edad: 'desde 3 meses', hora: '8:00 a.m. – 6:00 p.m.', precio: 'S/ 1 150', per: 'plan completo',
    img: r('espacio-04'), cap: 'el cuarto de cunas', color: 'var(--sk)',
    intro: 'Cuidado por grupos de edad, con sala de cunas y espacios de estimulación.',
    incluye: ['Sala de cunas', 'Atención personalizada', 'Cámaras de seguridad', 'Almuerzo opcional'],
  },
  {
    id: 'tarde', n: 'Guardería tarde', edad: 'desde 3 meses', hora: '1:00 p.m. – 6:00 p.m.', precio: 'Consultar', per: 'turno tarde',
    img: r('espacio-03'), cap: 'el área de juegos', color: 'var(--li)',
    intro: 'Para familias que necesitan la tarde. Almuerzo, siesta y juego tranquilo hasta las 6.',
    incluye: ['Continúa después del nido de la mañana', 'Almuerzo opcional', 'Siesta en sala de descanso', 'Juego guiado y talleres'],
  },
  {
    id: 'bienestar', n: 'Bienestar', edad: 'complementario', hora: 'según calendario', precio: 'Incluido', per: 'en el programa',
    img: r('espacio-02'), cap: 'sala de psicomotricidad', color: 'var(--bu)',
    intro: 'Acompañamiento emocional y del desarrollo, para el niño y para la familia.',
    incluye: ['Orientación psicopedagógica', 'Seguimiento del desarrollo', 'Talleres de hábitos saludables', 'Recomendaciones para casa'],
  },
  {
    id: 'alquiler', n: 'Alquiler de espacios', edad: 'para eventos', hora: 'fines de semana', precio: 'Consultar', per: 'por evento',
    img: r('espacio-01'), cap: 'el patio principal', color: '#FFD6C2',
    intro: 'Celebra el cumpleaños de tu peque en nuestro patio y salones, pensados y seguros para niños.',
    incluye: ['Patio y salón de juegos', 'Mobiliario infantil', 'Baños para niños', 'Coordinación previa con dirección'],
  },
]
