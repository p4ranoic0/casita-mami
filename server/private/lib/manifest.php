<?php
require_once __DIR__ . '/db.php';

function photoPaths(string $slug, array $p): array {
  return [
    'thumb' => "media/$slug/thumb/{$p['filename']}.jpg",
    'web'   => "media/$slug/web/{$p['filename']}.jpg",
    'orig'  => "media/$slug/orig/{$p['filename']}.{$p['orig_ext']}",
    'w' => (int)$p['w'], 'h' => (int)$p['h'],
  ] + (is_file(MEDIA_DIR . "/$slug/mid/{$p['filename']}.webp") ? ['mid' => "media/$slug/mid/{$p['filename']}.webp"] : []);
}

// Escritura atómica: con subidas en paralelo dos procesos pueden regenerar a la
// vez; así la galería nunca lee un JSON a medio escribir.
function writeAtomic(string $path, string $data): void {
  $tmp = $path . '.' . bin2hex(random_bytes(4)) . '.tmp';
  file_put_contents($tmp, $data, LOCK_EX);
  rename($tmp, $path);
}

function regenerateManifest(): void {
  $pdo = db();
  $albums = $pdo->query('SELECT * FROM albums WHERE enabled=1 ORDER BY position, id')->fetchAll();
  $out = ['generated_at' => gmdate('c'), 'albums' => []];
  $index = [];   // índice ligero para el Home del sitio principal
  foreach ($albums as $a) {
    $ph = $pdo->prepare('SELECT * FROM photos WHERE album_id=? ORDER BY position, id');
    $ph->execute([$a['id']]);
    $photos = $ph->fetchAll();
    $entries = array_map(fn($p) => photoPaths($a['slug'], $p), $photos);
    // cover: la foto cover_photo_id si existe, si no la primera
    $cover = '';
    foreach ($photos as $p) { if ((int)$p['id'] === (int)$a['cover_photo_id']) { $cover = "media/{$a['slug']}/web/{$p['filename']}.jpg"; break; } }
    if ($cover === '' && $entries) $cover = $entries[0]['web'];
    $out['albums'][] = [
      'slug' => $a['slug'], 'title' => $a['title'], 'description' => $a['description'],
      'cover' => $cover, 'photos' => $entries,
    ];
    // índice ligero (solo álbumes activos): portada en thumb + conteo
    $index[] = [
      'slug' => $a['slug'], 'title' => $a['title'],
      'count' => count($entries),
      'cover' => str_replace('/web/', '/thumb/', $cover),
    ];
  }
  writeAtomic(MANIFEST_PATH, json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
  writeAtomic(GALERIA_DIR . '/albums.json', json_encode(['albums' => $index], JSON_UNESCAPED_UNICODE));

  // sitemap.xml del subsitio /galeria (solo álbumes activos; siempre al día)
  $home = 'https://lacasitademami.edu.pe/galeria';
  $today = gmdate('Y-m-d');
  $sm  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
  $sm .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";
  $sm .= "  <url><loc>$home/</loc><lastmod>$today</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n";
  foreach ($out['albums'] as $album) {
    $loc = htmlspecialchars($home . '/' . rawurlencode($album['slug']), ENT_XML1 | ENT_QUOTES, 'UTF-8');
    $sm .= "  <url><loc>$loc</loc><lastmod>$today</lastmod><changefreq>monthly</changefreq><priority>0.6</priority>\n";
    foreach (array_slice($album['photos'], 0, 1000) as $photo) {
      $imageUrl = $home . '/' . implode('/', array_map('rawurlencode', explode('/', $photo['web'])));
      $imageUrl = htmlspecialchars($imageUrl, ENT_XML1 | ENT_QUOTES, 'UTF-8');
      $sm .= "    <image:image><image:loc>$imageUrl</image:loc></image:image>\n";
    }
    $sm .= "  </url>\n";
  }
  $sm .= '</urlset>' . "\n";
  writeAtomic(GALERIA_DIR . '/sitemap.xml', $sm);
}
