<?php
/**
 * make-mid.php — Genera media/<slug>/mid/<name>.webp (≤1080 px) para las fotos que
 * ya existen y regenera manifest.json + sitemap de la galería.
 *
 * Corre EN EL SERVIDOR (PHP 8 + Imagick). Las fotos nuevas ya lo generan al subirse.
 * Uso:
 *   php make-mid.php            (LIB_DIR opcional; por defecto .../lacasitademami.edu.pe/private/lib)
 *
 * Idempotente: salta las mid/ que ya existen.
 */

declare(strict_types=1);
ini_set('memory_limit', '1024M');
set_time_limit(0);

$lib = getenv('LIB_DIR') ?: getenv('HOME') . '/domains/lacasitademami.edu.pe/private/lib';
require_once $lib . '/images.php';
require_once $lib . '/manifest.php';

$rows = db()->query('SELECT a.slug, p.filename FROM photos p JOIN albums a ON a.id = p.album_id ORDER BY a.position, p.position')->fetchAll();
$made = $skipped = $missing = 0;
foreach ($rows as $i => $r) {
  if (is_file(MEDIA_DIR . "/{$r['slug']}/mid/{$r['filename']}.webp")) { $skipped++; continue; }
  try {
    makeMid($r['slug'], $r['filename']) ? $made++ : $missing++;
  } catch (Throwable $e) {
    $missing++;
    fwrite(STDERR, "error {$r['slug']}/{$r['filename']}: {$e->getMessage()}\n");
  }
  if (($i + 1) % 100 === 0) echo ($i + 1) . '/' . count($rows) . "\n";
}
regenerateManifest();
echo "listo: $made generadas, $skipped ya existían, $missing sin web/ o con error. Manifest regenerado.\n";
