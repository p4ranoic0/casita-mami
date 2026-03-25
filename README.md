# La Casita de Mami · Sitio simplificado

Sitio web optimizado para una interacción simple con **3 páginas clave**:

- Inicio
- Servicios
- Contacto

## Objetivo de esta versión

Reducir fricción y confusión en navegación, concentrando el contenido real disponible y moviendo los pasos secundarios a modales.

## Arquitectura actual

- `/` Inicio
- `/servicios` Servicios
- `/contacto` Contacto

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
- `public/docs/presentacion-la-casita-de-mami.pdf`

Para el detalle de inventario y renombrado, ver `docs/assets-inventario.md`.
