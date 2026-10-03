import { CM, SERVICIOS } from './casita'

const origin = 'https://lacasitademami.edu.pe'
const service = (id) => SERVICIOS.find((item) => item.id === id)

export const SEO = {
  '/': {
    title: 'La Casita de Mami · Nido y guardería en Surco',
    description: 'Nido y guardería en Santiago de Surco, desde los 3 meses hasta los 5 años. Grupos pequeños, mucho juego y un equipo que conoce a cada niño por su nombre.',
    canonical: `${origin}/`,
  },
  '/servicios': {
    title: 'Nido y guardería en Surco: horarios y precios | La Casita de Mami',
    description: `${service('nido').n} de ${service('nido').edad}, ${service('guarderia').n.toLowerCase()} ${service('guarderia').edad} y ${service('tarde').n.toLowerCase()} en Santiago de Surco. Conoce horarios, servicios y precios de La Casita de Mami.`,
    canonical: `${origin}/servicios`,
  },
  '/contacto': {
    title: 'Contacto y ubicación · Nido en Calle Morropón, Surco | La Casita de Mami',
    description: `Visítanos en ${CM.dir}, ${CM.distrito}. ${CM.horario}. Escríbenos por WhatsApp al ${CM.tel} y agenda una visita a La Casita de Mami.`,
    canonical: `${origin}/contacto`,
  },
}

export const socialImage = origin + CM.imagenSocial

export function localBusinessData() {
  const [addressLocality, addressRegion] = CM.distrito.split(',').map((part) => part.trim())
  return {
    '@context': 'https://schema.org',
    '@type': ['Preschool', 'ChildCare'],
    name: 'La Casita de Mami',
    url: SEO['/'].canonical,
    logo: origin + CM.logoPublico,
    image: socialImage,
    telephone: CM.telHref.replace(/^tel:/, ''),
    email: CM.mail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CM.dir,
      addressLocality,
      addressRegion,
      addressCountry: 'PE',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: CM.horarioDatos.dias,
      opens: CM.horarioDatos.abre,
      closes: CM.horarioDatos.cierra,
    },
    sameAs: CM.redes.map((red) => red.h),
    areaServed: addressLocality,
    priceRange: `${service('nido').precio} - S/ ${service('guarderia').precio.replace(/\D/g, '')}`,
  }
}

function setMeta(attribute, key, value) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

export function updateSeoHead(seo) {
  document.title = seo.title
  setMeta('name', 'description', seo.description)
  setMeta('name', 'robots', 'index, follow')
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = seo.canonical
  for (const [key, value] of Object.entries({
    'og:type': 'website',
    'og:site_name': 'La Casita de Mami',
    'og:title': seo.title,
    'og:description': seo.description,
    'og:url': seo.canonical,
    'og:image': socialImage,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:locale': 'es_PE',
  })) setMeta('property', key, value)
  for (const [key, value] of Object.entries({
    'twitter:card': 'summary_large_image',
    'twitter:title': seo.title,
    'twitter:description': seo.description,
    'twitter:image': socialImage,
  })) setMeta('name', key, value)
}
