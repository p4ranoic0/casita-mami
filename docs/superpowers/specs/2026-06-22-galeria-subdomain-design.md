# Diseño — Galería autogestionable `lacasitademami.edu.pe/galeria`

- **Fecha:** 2026-06-22
- **Estado:** Aprobado (diseño) — pendiente plan de implementación
- **Autor:** Henrry Garcia + Claude

## 1. Objetivo

Crear un sitio de galería de fotos en la ruta **`lacasitademami.edu.pe/galeria`**
(dentro del dominio principal — **sin subdominio**) para mostrar los eventos del nido,
organizados en **5 álbumes**, con URLs limpias (`/galeria/dia-del-padre`, etc.). El
sitio debe ser **autogestionable** desde un panel de administración (login) en el mismo
dominio (`/admin`), **sin depender de ningún servicio externo**: todo vive en el
hosting propio (Hostinger).

> **Decisión 2026-06-22:** se descarta el subdominio `galeria.lacasitademami.edu.pe`.
> La galería se sirve como **ruta `/galeria`** del dominio principal. Mismo origen que
> el sitio y el admin (sin CORS), sin crear nada en hPanel. La carpeta en el servidor
> sigue siendo `public_html/galeria/`. La app React se compila con `base: '/galeria/'`.

Comportamiento de imágenes estilo *Adobe Portfolio*: se ven en versión **comprimida**
(rápida) y se pueden **descargar en tamaño original**.

## 2. Álbumes

| # | Nombre mostrado | Slug (URL) |
|---|---|---|
| 1 | Día del Padre | `dia-del-padre` |
| 2 | Día del Medio Ambiente | `dia-del-medio-ambiente` |
| 3 | Día de la Madre | `dia-de-la-madre` |
| 4 | Pascua | `pascua` |
| 5 | Día de la Educación Inicial | `dia-de-la-educacion-inicial` |

Los álbumes no son una lista fija en código: el admin puede crear, renombrar,
describir, habilitar/deshabilitar y reordenar. Estos 5 son el contenido inicial.

## 3. Entorno verificado (Hostinger, vía SSH — solo lectura)

| Capacidad | Resultado |
|---|---|
| PHP | 8.3.30 |
| Imágenes | extensiones `gd` **y** `imagick` disponibles |
| ZIP | extensión `zip` + clase `ZipArchive` OK (descarga de álbum) |
| Metadatos | extensión `exif` OK (lectura/strip de GPS) |
| BD local | `sqlite3` + `pdo_sqlite` (también `mysqli`/`pdo_mysql`) |
| Subida | `upload_max_filesize` = `post_max_size` = 1536 MB; `memory_limit` 1536 MB; `max_execution_time` 0 |
| Disco | holgado |
| `public_html/galeria/` | no existe aún (se crea) |
| Usuario del sistema | `u128657715` (mismo para los 3 dominios → PHP puede escribir en la carpeta `galeria/`) |
| Dominios en la cuenta | `lacasitademami.edu.pe`, `henrrygarcia.com`, `evolushonsurfexperience.com` |

**Consecuencia:** no se necesita MySQL ni configuración en hPanel para datos.
Se usa **SQLite** (un archivo), creado y administrado por SSH/PHP.

### 3.1 Sobre el `.htaccess` actual del dominio central

La regla SPA existente ya incluye `RewriteCond %{REQUEST_FILENAME} !-f` y `!-d`.
Por lo tanto **`admin/` (directorio) y `api/*.php` (archivos reales) se sirven
directamente** sin que el routing de React los intercepte. No se requiere modificar
el `.htaccess` del dominio central. La carpeta `galeria/` usa su **propio** `.htaccess`.

## 4. Decisiones de arquitectura

| Decisión | Elección | Motivo |
|---|---|---|
| Dónde vive la galería pública | App React+Vite aparte, en `galeria/` dentro de este repo | Reusa marca y `node_modules`; build/deploy propios |
| Dónde vive el admin | `lacasitademami.edu.pe/admin` (dominio central) | Decisión del usuario |
| Backend | **PHP** en `lacasitademami.edu.pe/api` | Nativo en Hostinger, cero servicios externos |
| UI del admin | **PHP plano + JS vanilla** (no segundo React) | Sin segundo pipeline de build, sin conflicto de routing, panel interno |
| Reordenar fotos | **SortableJS auto-alojado** | Sin dependencia de CDN/servicio externo en runtime |
| Metadatos | **SQLite** (`private/gallery.db`) | Simple, sin hPanel, respaldo = copiar 1 archivo |
| Credenciales admin | Hash en `private/config.php` (1 solo usuario) | No hace falta tabla de usuarios |
| Fuente que lee la galería | `manifest.json` (proyección pública) | Desacopla front estático del backend; rápido y cacheable |
| Procesamiento de imágenes | **Imagick** (fallback GD) | Disponible; mejor calidad de reescalado |

## 5. Distribución en el servidor

> Principio rector: **separar código (se redeploya) de datos (jamás se borran)**.

```
~/domains/lacasitademami.edu.pe/
├─ private/                         # FUERA de la raíz web (PHP lo lee por ruta absoluta)
│   ├─ config.php                   # usuario admin + hash de contraseña + rutas + secreto de sesión
│   └─ gallery.db                   # SQLite: tablas de álbumes y fotos (fuente de verdad)
├─ public_html/                     # lacasitademami.edu.pe (sitio actual)
│   ├─ index.html  assets/  ...     # React actual (sin cambios)
│   ├─ .htaccess                    # sin cambios (sirve admin/ y api/ por !-f/!-d)
│   ├─ admin/                       # panel PHP: login, dashboard, álbumes, subir, ordenar
│   │   ├─ index.php  login.php  logout.php
│   │   ├─ lib/  (auth.php  store.php  images.php  manifest.php  csrf.php)
│   │   └─ vendor/  (sortable.min.js auto-alojado)
│   ├─ api/                         # endpoints PHP (JSON)
│   │   ├─ login.php  logout.php
│   │   ├─ albums.php               # crear / editar / borrar / toggle
│   │   ├─ upload.php               # subir 1 foto, generar thumb/web/orig
│   │   ├─ reorder.php              # reordenar fotos y álbumes
│   │   └─ delete-photo.php
│   └─ galeria/                     # lacasitademami.edu.pe/galeria (ruta, NO subdominio)
│       ├─ index.html  assets/ ...  # build React de la galería (CÓDIGO)
│       ├─ .htaccess  404.html      # routing SPA de /galeria (URLs limpias)
│       ├─ download-album.php       # CÓDIGO: arma ZIP de orig/ al vuelo (público, solo lectura)
│       ├─ manifest.json            # ⚠ DATO: solo álbumes habilitados
│       └─ media/<slug>/            # ⚠ DATO: fotos subidas
│           ├─ thumb/   (~480px)
│           ├─ web/     (~2048px, comprimida)
│           └─ orig/    (original, descarga)
```

**Nota ruta:** la galería se sirve como `/galeria` (carpeta `public_html/galeria/`,
mismo origen que el sitio). **No se crea subdominio.** La app se compila con
`base: '/galeria/'`; las rutas de imágenes son base-aware (`import.meta.env.BASE_URL`).
La carpeta `galeria/` lleva su propio `.htaccess` con `RewriteBase /galeria/`, de modo
que `/galeria/dia-del-padre` cae en `/galeria/index.html` (el `.htaccess` de la subcarpeta
no hereda el del padre cuando tiene su propio `RewriteEngine On`).

## 6. Modelo de datos (SQLite)

```sql
CREATE TABLE albums (
  id          INTEGER PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,     -- dia-del-padre
  title       TEXT NOT NULL,            -- "Día del Padre"
  description TEXT DEFAULT '',
  enabled     INTEGER NOT NULL DEFAULT 1,
  cover_photo_id INTEGER,               -- foto usada como portada (opcional)
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL
);

CREATE TABLE photos (
  id        INTEGER PRIMARY KEY,
  album_id  INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  filename  TEXT NOT NULL,              -- nombre aleatorio en disco (sin colisiones)
  orig_w    INTEGER, orig_h INTEGER,
  position  INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
```

### `manifest.json` (proyección pública — solo álbumes habilitados)

```json
{
  "generated_at": "2026-06-22T12:00:00Z",
  "albums": [
    {
      "slug": "dia-del-padre",
      "title": "Día del Padre",
      "description": "…",
      "cover": "media/dia-del-padre/web/abc123.jpg",
      "photos": [
        {
          "thumb": "media/dia-del-padre/thumb/abc123.jpg",
          "web":   "media/dia-del-padre/web/abc123.jpg",
          "orig":  "media/dia-del-padre/orig/abc123.jpg",
          "w": 4000, "h": 3000
        }
      ]
    }
  ]
}
```

Se regenera tras **cada** cambio del admin. La galería pública solo lee este archivo.

## 7. Galería pública (ruta /galeria) — marca y UX

Reusa los tokens de `tailwind.config.js`:
- Tipografías: **Fraunces** (display) + **Plus Jakarta Sans** (sans).
- Color primario turquesa `#25c1e9`, celeste `#7dcfeb`, fondos `#f5fdff` / superficies blancas, texto `#0d2d3a`.
- **Acentos verdes/lima** `#e8ff52` / butter `#f5ffb8` para chispazos de color.
- Bordes redondeados generosos (`rounded-xl/2xl`) y sombras `shadow-card`/`shadow-brand`.

Objetivo de experiencia: una galería **muy vistosa** que invite a explorar y **volver**.
Se logra con motion cuidado, juego de paleta (turquesa + verde) y micro-interacciones.

Páginas y rutas (router con `basename="/galeria"`):
- `/galeria` — **Portada:** grid editorial de tarjetas (portada + título por álbum). Solo álbumes habilitados. Header con logo y enlace de regreso al sitio (`/`); footer consistente. CTA emocional ("Revive cada momento").
- `/galeria/<slug>` — **Álbum:** entrada con animación (ver §7.1), título con efecto, grid de miniaturas (`thumb`) que abren un **lightbox** con la versión `web` (comprimida), navegación (flechas + teclado + swipe) y **descargas** (ver §7.2). Al final del álbum, un carrusel "Más álbumes" para seguir navegando (retención).
- Estado vacío por álbum: "Pronto subiremos las fotos de este evento" (con ilustración/animación sutil).
- 404 / slug inexistente → vuelve a la portada.

URLs limpias: `.htaccess` en `galeria/` con `RewriteBase /galeria/` y rewrite a
`/galeria/index.html` + copia `404.html` que redirige a `/galeria/`, para que un enlace
compartido por WhatsApp abra directo el álbum (mismo patrón SPA del sitio actual).

### 7.1 Dirección visual y motion

Stack de animación: **Framer Motion** (ya es dependencia del repo, `framer-motion@12`) + Tailwind. Todo respeta `prefers-reduced-motion`.

- **Paleta en movimiento:** fondos con degradados/blobs suaves turquesa→celeste y chispazos lima; hover de tarjetas con overlay de color de marca y zoom de imagen.
- **Portada:** título display (Fraunces) con efecto de entrada (revelado por máscara / barrido de degradado turquesa→lima); tarjetas de álbum entran en *stagger* (fade + scale + leve translateY), hover con elevación (`shadow-card-hover`), zoom de portada y subrayado animado del título.
- **Entrada al álbum:**
  - **Animación de carga:** *skeletons* con shimmer en la grilla mientras cargan las imágenes; loader lúdico (blob/puntos en colores de marca).
  - **Título con efecto:** nombre grande en Fraunces que entra con slide-up + barrido de color y una línea/acento lima que se "dibuja".
  - **Grid:** miniaturas entran en *stagger* (fade/scale) a medida que cargan; layout tipo *masonry*.
  - **Lightbox:** apertura con *shared layout transition* (zoom desde la miniatura, `layoutId` de Framer Motion), fondo con blur; navegación suave entre fotos.
- **Retención:** transiciones de página portada↔álbum, micro-interacciones de hover/tap, carrusel "Más álbumes" al final, y CTA de regreso.
- **Rendimiento (que el motion no trabe):** `loading="lazy"` en imágenes, *blur-up* placeholder, animaciones por transform/opacity (GPU), e *intersection observer* para animar solo lo visible.

### 7.2 Descargas (estilo Adobe Portfolio)

- **Foto individual:** botón **Descargar original** en el lightbox → archivo `orig/` vía atributo `download` (same-origin, sin recomprimir). Lo que se *ve* es la versión `web` comprimida; lo que se *descarga* es el original.
- **Álbum completo:** botón **Descargar álbum** → llama a `/galeria/download-album.php?album=<slug>` (URL base-aware con `import.meta.env.BASE_URL`) que arma un **ZIP** de todos los `orig/` del álbum al vuelo con `ZipArchive` y lo transmite (server-side, soporta álbumes grandes, poco consumo en el navegador). Endpoint **público** (solo lectura, no requiere login) y validado contra la lista de slugs del manifiesto. En la UI, botón con estado "Preparando ZIP…" para dar feedback.

## 8. Pipeline de imágenes (al subir, en `upload.php`)

Por cada foto, Imagick genera y guarda:
- `orig/` — **original**, intacto salvo que se **eliminan metadatos de geolocalización (GPS)** por seguridad de los niños. Es lo que se descarga.
- `web/`  — lado largo ~2048px, calidad ~82 → vista del lightbox.
- `thumb/`— lado largo ~480px → grid.

Nombres de archivo aleatorios (evita colisiones y enumeración). Validación de tipo
real (MIME/firma), no solo extensión. Se rechaza cualquier cosa que no sea imagen.

## 9. Panel admin (`/admin`)

- **Login:** un solo usuario. Contraseña verificada con `password_verify` contra el
  hash de `private/config.php`. Sesión PHP con cookie `HttpOnly`, `Secure`,
  `SameSite=Lax`. **Límite de intentos** (throttling) por IP. Solo HTTPS.
- **Dashboard:** lista de álbumes con su estado (habilitado/oculto) y nº de fotos.
- **Álbum:** editar nombre + descripción, habilitar/deshabilitar, elegir portada,
  **subir fotos en masa** (selección múltiple → se suben **una por una** con barra de
  progreso; resiliente y respeta `max_file_uploads`), **arrastrar para reordenar**
  (SortableJS), borrar fotos, reordenar álbumes.
- **CSRF:** token en cada acción mutante. Endpoints `api/*.php` exigen sesión válida.
- Tras cada cambio → regenerar `manifest.json`.

## 10. Las 2 protecciones críticas de deploy

Sin esto, un `rsync --delete` borraría el admin o las fotos subidas.

1. **`deploy.sh` (sitio central)** debe **excluir** `admin/`, `api/` y `galeria/`
   (además de las exclusiones actuales). El build de React (`dist/`) no contiene esas
   carpetas, así que sin la exclusión `--delete` las eliminaría.
2. **`deploy-galeria.sh` (nuevo)** sincroniza `dist-galeria/` → `public_html/galeria/`
   pero **excluye** `media/` y `manifest.json` (los datos subidos por el admin).
3. **`deploy-admin.sh` (nuevo)** sincroniza el código PHP de `admin/` + `api/`.
   `private/` se crea una sola vez por SSH; nunca entra en un `--delete`.

## 11. Configuración del proyecto (este repo)

- Nueva carpeta `galeria/` (app React+Vite) que reusa el `node_modules` raíz.
- `vite.galeria.config.js` con `root: 'galeria'`, `base: '/'`, `build.outDir: '../dist-galeria'`.
- `package.json`: scripts `dev:galeria`, `build:galeria`.
- `tailwind.config.js`: añadir `./galeria/**/*.{js,jsx}` a `content` (no afecta el build actual).
- Código PHP del admin/api versionado en el repo (p. ej. `server/admin/`, `server/api/`)
  y desplegado por `deploy-admin.sh`.

## 12. Seguridad (resumen)

- Contraseña hasheada (`password_hash`), nunca en texto plano ni en el repo.
- Sesiones endurecidas; throttling de login; CSRF en mutaciones.
- Validación real de imágenes; re-encode con Imagick (neutraliza payloads); nombres aleatorios.
- `gallery.db` y `config.php` **fuera** de la raíz web.
- Originales son públicos **por diseño** (se descargan); no hay otra cosa sensible en `media/`.
- Quitar GPS de los originales (privacidad de menores).

## 13. Plan por fases

### Fase 1 — Galería pública (vistosa, sin admin)
App React de `/galeria` que lee `manifest.json`. Se arranca con un manifiesto escrito
a mano: los 5 álbumes con portadas reusando fotos existentes del sitio, y **fotos de
muestra sembradas en 1–2 álbumes** para validar la grilla, el lightbox y las descargas.
Incluye toda la **dirección visual y motion** (§7.1), **descarga individual** y el
endpoint **`download-album.php`** para la descarga del álbum (§7.2).
**Entregable:** galería online vistosa y navegable en `lacasitademami.edu.pe/galeria`
(portada animada + 5 álbumes + lightbox + descarga individual y por álbum), deploy a
la ruta `/galeria` funcionando. Valida front-end, marca, motion, routing, descargas y deploy.

### Fase 2 — Backend admin (PHP)
Login, CRUD de álbumes (nombre/descripción/habilitar), subida masiva con progreso,
reordenar (SortableJS), pipeline Imagick (thumb/web/orig + strip GPS), regeneración de
`manifest.json`, endurecimiento de seguridad, y los scripts de deploy con sus
exclusiones. La galería de Fase 1 pasa a leer el manifiesto dinámico (trabajo
desechado mínimo: ya lee un manifiesto).

## 14. Fuera de alcance (v1)

- Vista previa por-álbum distinta en WhatsApp (imagen OG por evento) → requiere
  prerenderizado; anotado como mejora futura. v1 usa una sola imagen OG general.
- Múltiples usuarios admin / roles.
- Comentarios, "me gusta", o subida por parte de las familias.

## 15. Tareas de infraestructura (una sola vez, por SSH/hPanel)

- **(Ya no se crea subdominio.)** La galería vive como ruta `/galeria` →
  carpeta `public_html/galeria/` (se crea con el primer deploy).
- Crear `private/` con `config.php` (hash de contraseña) y `gallery.db` (esquema).
- Crear estructura `public_html/galeria/media/<slug>/{thumb,web,orig}`.
