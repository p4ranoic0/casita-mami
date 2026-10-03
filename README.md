# La Casita de Mami · Sitio simplificado

Sitio web con dirección visual **Cartulina** (Fredoka + Nunito + Gochi Hand,
paleta del logo). Páginas: Inicio, Servicios, Contacto y la Galería (app aparte
en `/galeria/`). Los estilos compartidos están en `src/styles/cartulina.css` y
los datos (contacto, servicios, fotos) en `src/data/casita.js`.

## Objetivo de esta versión

Reducir fricción y confusión en navegación, concentrando el contenido real disponible y moviendo los pasos secundarios a modales.

## Arquitectura actual

- `/` Inicio
- `/servicios` Servicios (pestaña enlazable: `/servicios#tarde`)
- `/contacto` Contacto
- `/galeria/` Galería (build aparte: `npm run build:galeria`)
- `/admin/` Admin de la galería (PHP, `deploy-admin.sh`)

Compatibilidad:
- `/ubicacion` redirige a `/contacto`.

## Criterios UX/UI aplicados

- Menú principal reducido a 3 opciones.
- CTAs consistentes: `Agendar visita`, `Hablar con dirección`.
- Contenido extenso trasladado a modales de lectura rápida.
- Datos de contacto unificados.
- Imágenes locales para mejor control de contenido.

## Assets

- `src/assets/home/*`
- `src/assets/services/*`
- `src/assets/contact/*`
- `src/assets/real/*` (fotos de la presentación del nido: espacios, aulas, misses)
- `public/docs/presentacion-la-casita-de-mami.pdf`

Para el detalle de inventario y renombrado, ver `docs/assets-inventario.md`.
