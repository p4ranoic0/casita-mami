# Migración Adobe Portfolio → /galeria

Script de **un solo uso** para traer las fotos del sitio Adobe Portfolio
(`galeria.lacasitademami.edu.pe`) a la galería propia en `/galeria`.

Corre **en el servidor** (Hostinger, PHP 8 + Imagick): el server baja las imágenes
directo del CDN de Adobe y las procesa ahí mismo (no se suben GBs desde local).

## Qué hace

Por cada álbum (los 5, en orden):
1. Scrapea la página del álbum y extrae cada foto en su **máxima resolución** disponible
   (3840 px; 1920 px en Día de la Madre), preservando el **orden** de Adobe.
2. Descarga el original a `media/<slug>/orig/<uuid>.jpg`.
3. Genera con Imagick `web/` (≤2048 px, q82) y `thumb/` (≤480 px, q78).
4. Acumula todo en `manifest.json` (mismo formato que lee la galería).

Es **idempotente**: re-ejecutarlo salta los `orig/` ya descargados. Acepta modo de
prueba por álbum y límite de fotos.

## Uso (en el servidor, por SSH)

```bash
GAL=~/domains/lacasitademami.edu.pe/public_html/galeria

# Prueba: 5 fotos de un álbum
GALERIA_DIR="$GAL" php import.php pascua 5

# Un álbum completo
GALERIA_DIR="$GAL" php import.php pascua

# Todos los álbumes (migración completa, ~1004 fotos)
GALERIA_DIR="$GAL" php import.php
```

## Notas

- "Original" = la mayor resolución que sirve Adobe (no el archivo de cámara crudo).
- `media/` y `manifest.json` viven en el docroot de `/galeria` y están **excluidos**
  de `deploy-galeria.sh --delete`, así que un redeploy del código no los borra.
- Cuando esté el panel admin (Fase 2), gestionará estas mismas fotos.
