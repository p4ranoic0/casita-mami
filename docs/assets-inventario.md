# Inventario de assets y renombrado

## Estructura definida

- `src/assets/home`
- `src/assets/services`
- `src/assets/contact`
- `src/assets/gallery` (reservado)
- `public/docs`

## Convención aplicada

- minúsculas
- guiones
- sin espacios ni prefijos de mensajería
- patrón por contexto: `home-*`, `servicios-*`, `contacto-*`

## Cambios principales

- `aula.jpeg` → `src/assets/home/home-hero-aula-01.jpeg`
- `aula1.jpeg` → `src/assets/home/home-ambiente-aula-02.jpeg`
- `WhatsApp Image ...` → `home-galeria-01..08`, `servicios-galeria-01..08`, `contacto-galeria-01..06`
- `PRESENTACION LA CASITA DE MAMI (2).pdf` → `public/docs/presentacion-la-casita-de-mami.pdf`

## Nota

Este inventario prioriza orden y trazabilidad para uso editorial y de mantenimiento.
