import { describe, it, expect } from 'vitest'
import { getAlbumBySlug, albumDownloadUrl, assetUrl, isAlbumEmpty, photoCount } from './gallery.js'

const manifest = {
  albums: [
    { slug: 'pascua', title: 'Pascua', photos: [{ web: 'a.jpg', orig: 'a.jpg', thumb: 'a.jpg' }] },
    { slug: 'dia-del-padre', title: 'Día del Padre', photos: [] },
  ],
}

describe('getAlbumBySlug', () => {
  it('devuelve el álbum por su slug', () => {
    expect(getAlbumBySlug(manifest, 'pascua').title).toBe('Pascua')
  })
  it('devuelve null si no existe', () => {
    expect(getAlbumBySlug(manifest, 'no-existe')).toBeNull()
  })
  it('tolera manifest vacío/indefinido', () => {
    expect(getAlbumBySlug(null, 'pascua')).toBeNull()
    expect(getAlbumBySlug({}, 'pascua')).toBeNull()
  })
})

describe('albumDownloadUrl', () => {
  it('construye la URL del endpoint ZIP respetando el base', () => {
    expect(albumDownloadUrl('/galeria/', 'dia-del-padre')).toBe('/galeria/download-album.php?album=dia-del-padre')
  })
})

describe('assetUrl', () => {
  it('antepone el base y normaliza la barra inicial', () => {
    expect(assetUrl('/galeria/', 'media/pascua/web/01.jpeg')).toBe('/galeria/media/pascua/web/01.jpeg')
    expect(assetUrl('/galeria/', '/media/pascua/web/01.jpeg')).toBe('/galeria/media/pascua/web/01.jpeg')
  })
})

describe('isAlbumEmpty / photoCount', () => {
  it('detecta álbum vacío', () => {
    expect(isAlbumEmpty({ photos: [] })).toBe(true)
    expect(isAlbumEmpty({ photos: [{ web: 'a' }] })).toBe(false)
    expect(isAlbumEmpty({})).toBe(true)
  })
  it('cuenta fotos', () => {
    expect(photoCount({ photos: [{}, {}] })).toBe(2)
    expect(photoCount({})).toBe(0)
  })
})
