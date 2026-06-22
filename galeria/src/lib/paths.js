import { assetUrl, albumDownloadUrl } from './gallery.js'

// import.meta.env.BASE_URL = '/galeria/' en build y dev (por la config de Vite).
const BASE = import.meta.env.BASE_URL

// asset('media/x.jpeg') -> '/galeria/media/x.jpeg'
export const asset = (path) => assetUrl(BASE, path)

// albumZip('pascua') -> '/galeria/download-album.php?album=pascua'
export const albumZip = (slug) => albumDownloadUrl(BASE, slug)
