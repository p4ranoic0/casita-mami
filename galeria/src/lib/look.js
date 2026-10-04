import { asset } from './paths.js'
import { r } from '../../../src/data/casita.js'

// Colores de cartulina que rotan entre álbumes (rosa, celeste, amarillo, lila).
export const ALBUM_COLORS = ['var(--pk)', 'var(--sk)', 'var(--bu)', 'var(--li)']
export const albumColor = (i) => ALBUM_COLORS[((i % 4) + 4) % 4]

// Álbum sin fotos: el manifest puede traer una portada que no existe, así que
// usamos una foto de los espacios del nido.
const FALLBACK = ['espacio-01', 'espacio-03', 'espacio-05', 'aula-02', 'espacio-02', 'aula-05'].map(r)
export function albumCover(album, i) {
  if (album.cover && album.photos?.length) return asset(album.cover)
  return FALLBACK[((i % FALLBACK.length) + FALLBACK.length) % FALLBACK.length]
}

export function albumCoverSrcSet(album) {
  const photo = album.photos?.find((entry) => entry.web === album.cover)
  if (!photo?.thumb || !photo.w) return undefined
  const thumbWidth = Math.min(photo.w, 480)
  const webWidth = Math.min(photo.w, 2048)
  const midWidth = Math.min(photo.w, 1080)
  const set = [`${asset(photo.thumb)} ${thumbWidth}w`]
  if (photo.mid && midWidth > thumbWidth && midWidth < webWidth) set.push(`${asset(photo.mid)} ${midWidth}w`)
  if (webWidth > thumbWidth) set.push(`${asset(photo.web)} ${webWidth}w`)
  return set.length > 1 ? set.join(', ') : undefined
}

export const countLabel = (n) => (n === 0 ? 'pronto' : n === 1 ? '1 foto' : `${n} fotos`)

// Proporción ancho/alto. Fotos antiguas pueden venir con w/h = 0.
export const ratio = (p) => (p.w > 0 && p.h > 0 ? p.w / p.h : 1.5)
