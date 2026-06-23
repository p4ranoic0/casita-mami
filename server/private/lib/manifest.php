<?php
require_once __DIR__ . '/db.php';

function photoPaths(string $slug, array $p): array {
  return [
    'thumb' => "media/$slug/thumb/{$p['filename']}.jpg",
    'web'   => "media/$slug/web/{$p['filename']}.jpg",
    'orig'  => "media/$slug/orig/{$p['filename']}.{$p['orig_ext']}",
    'w' => (int)$p['w'], 'h' => (int)$p['h'],
  ];
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
  file_put_contents(MANIFEST_PATH, json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
  file_put_contents(GALERIA_DIR . '/albums.json', json_encode(['albums' => $index], JSON_UNESCAPED_UNICODE));

  // sitemap.xml del subsitio /galeria (solo álbumes activos; siempre al día)
  $home = 'https://lacasitademami.edu.pe/galeria';
  $today = gmdate('Y-m-d');
  $sm  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
  $sm .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
  $sm .= "  <url><loc>$home</loc><lastmod>$today</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n";
  foreach ($albums as $a) {
    $loc = $home . '/' . rawurlencode($a['slug']);
    $sm .= "  <url><loc>$loc</loc><lastmod>$today</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n";
  }
  $sm .= '</urlset>' . "\n";
  file_put_contents(GALERIA_DIR . '/sitemap.xml', $sm);
}
