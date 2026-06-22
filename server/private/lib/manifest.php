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
  }
  file_put_contents(MANIFEST_PATH, json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}
