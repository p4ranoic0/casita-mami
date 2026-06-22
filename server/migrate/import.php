<?php
/**
 * import.php — Migra los álbumes de Adobe Portfolio (galeria.lacasitademami.edu.pe)
 * a la galería propia en /galeria.
 *
 * Corre EN EL SERVIDOR (Hostinger) — requiere PHP 8 + ext-imagick.
 * El server baja las imágenes directo del CDN de Adobe y las procesa con Imagick.
 *
 * Uso:
 *   GALERIA_DIR=~/domains/lacasitademami.edu.pe/public_html/galeria php import.php
 *   ... php import.php <slug>            # solo un álbum
 *   ... php import.php <slug> <limite>   # solo N fotos de ese álbum (prueba)
 *
 * Genera por foto: orig/ (máx resolución de Adobe), web/ (≤2048px), thumb/ (≤480px).
 * Acumula estado en manifest.json (re-ejecutable / idempotente: salta orig ya descargado).
 */

declare(strict_types=1);

ini_set('memory_limit', '1536M');
set_time_limit(0);
error_reporting(E_ALL & ~E_DEPRECATED);

const SRC_BASE   = 'https://galeria.lacasitademami.edu.pe';
const WEB_CAP    = 2048;   // lado largo de la versión "web"
const THUMB_CAP  = 480;    // lado largo de la miniatura
const WEB_Q      = 82;
const THUMB_Q    = 78;

// Orden de visualización + títulos/descripciones (los mismos del diseño Fase 1).
$ALBUMS = [
  ['slug' => 'dia-del-padre',             'title' => 'Día del Padre',             'description' => 'Celebramos a los papás de La Casita con cariño y juegos.'],
  ['slug' => 'dia-del-medio-ambiente',    'title' => 'Día del Medio Ambiente',    'description' => 'Aprendimos a cuidar nuestro planeta sembrando y jugando.'],
  ['slug' => 'dia-de-la-madre',           'title' => 'Día de la Madre',           'description' => 'Un día lleno de abrazos para nuestras mamás.'],
  ['slug' => 'pascua',                    'title' => 'Pascua',                    'description' => 'Búsqueda de huevitos y mucha alegría en familia.'],
  ['slug' => 'dia-de-la-educacion-inicial','title' => 'Día de la Educación Inicial','description' => 'Festejamos el aprendizaje y el juego de nuestros niños.'],
];

// ─── Resolución de rutas ──────────────────────────────────────────────────
$galeriaDir = getenv('GALERIA_DIR') ?: '';
if ($galeriaDir === '') {
  fwrite(STDERR, "ERROR: define GALERIA_DIR (dir público de /galeria en el servidor).\n");
  exit(1);
}
$galeriaDir = rtrim($galeriaDir, '/');
$mediaDir    = "$galeriaDir/media";
$manifestPath = "$galeriaDir/manifest.json";

if (!extension_loaded('imagick')) {
  fwrite(STDERR, "ERROR: falta la extensión imagick.\n");
  exit(1);
}
if (!is_dir($galeriaDir)) {
  fwrite(STDERR, "ERROR: no existe GALERIA_DIR: $galeriaDir\n");
  exit(1);
}

$onlySlug = $argv[1] ?? null;
$limit    = isset($argv[2]) ? max(0, (int)$argv[2]) : 0;

// ─── HTTP GET con cURL ─────────────────────────────────────────────────────
function httpGet(string $url, int $tries = 3): string {
  $last = '';
  for ($i = 0; $i < $tries; $i++) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_TIMEOUT        => 60,
      CURLOPT_CONNECTTIMEOUT => 20,
      CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; CasitaGalleryMigrator/1.0)',
      CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch);
    curl_close($ch);
    if ($body !== false && $code >= 200 && $code < 300 && strlen($body) > 0) {
      return $body;
    }
    $last = "HTTP $code $err";
    usleep(400000);
  }
  throw new RuntimeException("GET falló ($last): $url");
}

// ─── Scrape: extrae fotos (máx resolución, en orden) de la página del álbum ──
function scrapeAlbum(string $slug): array {
  $html = httpGet(SRC_BASE . '/' . $slug);
  // cdn.myportfolio.com/<site>/<uuid>_rw_<size>.<ext>?h=<hash>
  $re = '#https://cdn\.myportfolio\.com/[a-f0-9-]+/([a-f0-9-]{36})_rw_(\d+)\.(jpe?g|png)\?h=[a-f0-9]+#i';
  preg_match_all($re, $html, $matches, PREG_SET_ORDER);

  $best  = [];  // uuid => ['size'=>int, 'url'=>string, 'ext'=>string]
  $order = [];  // uuids en orden de primera aparición
  foreach ($matches as $set) {
    $url  = $set[0];
    $uuid = strtolower($set[1]);
    $size = (int)$set[2];
    $ext  = strtolower($set[3]) === 'jpeg' ? 'jpg' : strtolower($set[3]);
    if (!isset($best[$uuid])) { $order[] = $uuid; $best[$uuid] = ['size' => -1, 'url' => '', 'ext' => 'jpg']; }
    if ($size > $best[$uuid]['size']) { $best[$uuid] = ['size' => $size, 'url' => $url, 'ext' => $ext]; }
  }

  $photos = [];
  foreach ($order as $uuid) {
    $photos[] = ['uuid' => $uuid, 'url' => $best[$uuid]['url'], 'ext' => $best[$uuid]['ext']];
  }
  return $photos;
}

// ─── Imagick: genera una variante con tope de lado largo (sin agrandar) ─────
function makeVariant(string $srcPath, int $cap, int $quality, string $destPath): array {
  $im = new Imagick($srcPath);
  $w = $im->getImageWidth();
  $h = $im->getImageHeight();
  if (max($w, $h) > $cap) {
    if ($w >= $h) { $im->resizeImage($cap, 0, Imagick::FILTER_LANCZOS, 1); }
    else          { $im->resizeImage(0, $cap, Imagick::FILTER_LANCZOS, 1); }
  }
  $im->setImageFormat('jpeg');
  $im->setImageCompressionQuality($quality);
  $im->stripImage();
  $im->writeImage($destPath);
  $ow = $im->getImageWidth(); $oh = $im->getImageHeight();
  $im->clear(); $im->destroy();
  return [$ow, $oh];
}

function ensureDir(string $d): void { if (!is_dir($d)) mkdir($d, 0755, true); }
function relpath(string $slug, string $kind, string $file): string { return "media/$slug/$kind/$file"; }

// ─── Cargar manifest existente (estado acumulado) ──────────────────────────
$existing = [];
if (is_file($manifestPath)) {
  $j = json_decode((string)file_get_contents($manifestPath), true);
  foreach (($j['albums'] ?? []) as $a) { $existing[$a['slug']] = $a; }
}

// ─── Procesar álbumes solicitados ──────────────────────────────────────────
$processed = $existing; // arranca de lo ya existente; sobre-escribe lo que migremos

foreach ($ALBUMS as $album) {
  $slug = $album['slug'];
  if ($onlySlug !== null && $slug !== $onlySlug) continue;

  fwrite(STDOUT, "\n=== $slug : scraping ===\n");
  $photos = scrapeAlbum($slug);
  if ($limit > 0) $photos = array_slice($photos, 0, $limit);
  fwrite(STDOUT, "  " . count($photos) . " fotos a procesar\n");

  ensureDir("$mediaDir/$slug/orig");
  ensureDir("$mediaDir/$slug/web");
  ensureDir("$mediaDir/$slug/thumb");

  $entries = [];
  $n = 0;
  foreach ($photos as $p) {
    $n++;
    $uuid = $p['uuid'];
    $ext  = $p['ext'];
    $origPath  = "$mediaDir/$slug/orig/$uuid.$ext";
    $webPath   = "$mediaDir/$slug/web/$uuid.jpg";
    $thumbPath = "$mediaDir/$slug/thumb/$uuid.jpg";

    try {
      if (!is_file($origPath) || filesize($origPath) === 0) {
        file_put_contents($origPath, httpGet($p['url']));
      }
      [$ow, $oh] = makeVariant($origPath, WEB_CAP,   WEB_Q,   $webPath);
      makeVariant($origPath, THUMB_CAP, THUMB_Q, $thumbPath);
      // dimensiones reales del original
      $oi = new Imagick($origPath); $W = $oi->getImageWidth(); $H = $oi->getImageHeight(); $oi->clear();

      $entries[] = [
        'thumb' => relpath($slug, 'thumb', "$uuid.jpg"),
        'web'   => relpath($slug, 'web',   "$uuid.jpg"),
        'orig'  => relpath($slug, 'orig',  "$uuid.$ext"),
        'w' => $W, 'h' => $H,
      ];
      if ($n % 25 === 0 || $n === count($photos)) {
        fwrite(STDOUT, "  $n/" . count($photos) . " ok\n");
      }
    } catch (Throwable $e) {
      fwrite(STDERR, "  ! foto $uuid: " . $e->getMessage() . "\n");
    }
  }

  $processed[$slug] = [
    'slug'        => $slug,
    'title'       => $album['title'],
    'description' => $album['description'],
    'cover'       => $entries[0]['web'] ?? '',
    'photos'      => $entries,
  ];
  fwrite(STDOUT, "  $slug listo: " . count($entries) . " fotos\n");
}

// ─── Escribir manifest.json en orden de config ─────────────────────────────
$out = ['generated_at' => gmdate('c'), 'albums' => []];
foreach ($ALBUMS as $album) {
  $slug = $album['slug'];
  if (isset($processed[$slug])) {
    $out['albums'][] = $processed[$slug];
  } else {
    // álbum aún no migrado: entrada vacía (portada vacía) para que aparezca
    $out['albums'][] = [
      'slug' => $slug, 'title' => $album['title'], 'description' => $album['description'],
      'cover' => '', 'photos' => [],
    ];
  }
}
file_put_contents($manifestPath, json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

$total = array_sum(array_map(fn($a) => count($a['photos']), $out['albums']));
fwrite(STDOUT, "\n✅ manifest.json escrito ($total fotos en total).\n");
