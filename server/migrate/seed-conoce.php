<?php
/**
 * seed-conoce.php — Crea (o recrea) el álbum "Conoce nuestra Casita de Mami"
 * como PRIMER álbum, con las fotos del slider "Galería real del espacio" del Home.
 *
 * Corre EN EL SERVIDOR (PHP 8 + Imagick). Las fotos se suben antes a SRC_DIR.
 * Uso:
 *   SRC_DIR=~/migrate/conoce php seed-conoce.php
 *   (LIB_DIR opcional; por defecto .../lacasitademami.edu.pe/private/lib)
 *
 * Re-ejecutable: si el álbum existe, borra sus fotos+archivos y lo recrea.
 */

declare(strict_types=1);
ini_set('memory_limit', '1536M');
set_time_limit(0);

$lib = getenv('LIB_DIR') ?: (getenv('HOME') . '/domains/lacasitademami.edu.pe/private/lib');
require_once "$lib/db.php";        // PDO + paths (GALERIA_DIR, MEDIA_DIR, ...)
require_once "$lib/images.php";    // processUpload(), deletePhotoFiles()
require_once "$lib/manifest.php";  // regenerateManifest()

$SRC = getenv('SRC_DIR') ?: '';
$SRC = $SRC ? rtrim(str_replace('~', getenv('HOME'), $SRC), '/') : '';
if ($SRC === '' || !is_dir($SRC)) { fwrite(STDERR, "ERROR: SRC_DIR inválido: $SRC\n"); exit(1); }

const SLUG  = 'conoce-la-casita';
const TITLE = 'Conoce nuestra Casita de Mami';
const DESC  = 'Un recorrido por nuestros ambientes: aulas, juegos y los espacios donde tus hijos crecen felices.';

$pdo = db();

// Borrar álbum previo (idempotente)
$ex = $pdo->prepare('SELECT id FROM albums WHERE slug=?'); $ex->execute([SLUG]); $old = $ex->fetch();
if ($old) {
  $ps = $pdo->prepare('SELECT filename, orig_ext FROM photos WHERE album_id=?'); $ps->execute([$old['id']]);
  foreach ($ps->fetchAll() as $p) deletePhotoFiles(SLUG, $p['filename'], $p['orig_ext']);
  $pdo->prepare('DELETE FROM photos WHERE album_id=?')->execute([$old['id']]);
  $pdo->prepare('DELETE FROM albums WHERE id=?')->execute([$old['id']]);
  fwrite(STDOUT, "(álbum previo borrado)\n");
}

// Crear álbum (posición temporal 0)
$pdo->prepare('INSERT INTO albums (slug,title,description,enabled,position) VALUES (?,?,?,1,0)')
    ->execute([SLUG, TITLE, DESC]);
$albumId = (int)$pdo->lastInsertId();

// Procesar fotos en orden alfabético del nombre de archivo
$files = glob("$SRC/*.{jpg,jpeg,png,JPG,JPEG,PNG}", GLOB_BRACE) ?: [];
sort($files, SORT_STRING);
$pos = 0; $coverId = null;
foreach ($files as $f) {
  try {
    [$name, $ext, $w, $h] = processUpload($f, SLUG);
    $pos++;
    $pdo->prepare('INSERT INTO photos (album_id,filename,orig_ext,w,h,position) VALUES (?,?,?,?,?,?)')
        ->execute([$albumId, $name, $ext, $w, $h, $pos]);
    if ($coverId === null) $coverId = (int)$pdo->lastInsertId();
    fwrite(STDOUT, "  +$pos  $name.$ext  ({$w}x{$h})\n");
  } catch (Throwable $e) {
    fwrite(STDERR, "  ! " . basename($f) . ": " . $e->getMessage() . "\n");
  }
}
if ($coverId) $pdo->prepare('UPDATE albums SET cover_photo_id=? WHERE id=?')->execute([$coverId, $albumId]);

// Renumerar: 'conoce-la-casita' primero, el resto por su posición actual
$rows = $pdo->query("SELECT id FROM albums ORDER BY (slug='" . SLUG . "') DESC, position, id")->fetchAll();
$p = 0; foreach ($rows as $r) { $p++; $pdo->prepare('UPDATE albums SET position=? WHERE id=?')->execute([$p, (int)$r['id']]); }

regenerateManifest();
fwrite(STDOUT, "✅ '" . TITLE . "' creado como PRIMER álbum con $pos fotos.\n");
