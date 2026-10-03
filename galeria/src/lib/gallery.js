// Helpers puros para la galería. Sin dependencias de React ni del DOM.

export function getAlbumBySlug(manifest, slug) {
  const albums = manifest?.albums
  if (!Array.isArray(albums)) return null
  return albums.find((a) => a.slug === slug) ?? null
}

// base-aware: base es import.meta.env.BASE_URL (p. ej. '/galeria/').
export function assetUrl(base, path) {
  return base + String(path).replace(/^\/+/, '')
}

export function albumDownloadUrl(base, slug) {
  return `${base}download-album.php?album=${encodeURIComponent(slug)}`
}

export function photoCount(album) {
  if (typeof album?.count === 'number') return album.count
  return Array.isArray(album?.photos) ? album.photos.length : 0
}

export function isAlbumEmpty(album) {
  return photoCount(album) === 0
}
