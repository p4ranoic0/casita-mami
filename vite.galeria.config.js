import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build independiente de la galería. root apunta a galeria/, base '/galeria/'
// porque la app se sirve en lacasitademami.edu.pe/galeria (ruta, no subdominio).
export default defineConfig({
  plugins: [react()],
  root: 'galeria',
  base: '/galeria/',
  build: {
    outDir: '../dist-galeria',
    emptyOutDir: true,
  },
})
