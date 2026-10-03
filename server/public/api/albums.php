<?php require __DIR__ . '/bootstrap.php'; requireLoginApi();
$method = $_SERVER['REQUEST_METHOD'];
$pdo = db();

if ($method === 'GET') {
  $albums = $pdo->query('SELECT * FROM albums ORDER BY position, id')->fetchAll();
  foreach ($albums as &$a) {
    $c = $pdo->prepare('SELECT COUNT(*) n FROM photos WHERE album_id=?'); $c->execute([$a['id']]);
    $a['photo_count'] = (int)$c->fetch()['n'];
  }
  echo json_encode(['albums'=>$albums]); exit;
}

checkCsrf();
$in = json_decode(file_get_contents('php://input'), true) ?: [];
$action = $in['action'] ?? '';

function slugify(string $t): string {
  $t = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $t) ?: $t;
  $t = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $t));
  return trim($t, '-') ?: 'album';
}
function uniqueSlug(PDO $pdo, string $base): string {
  $slug = $base; $i = 1;
  $st = $pdo->prepare('SELECT 1 FROM albums WHERE slug=?');
  while (true) { $st->execute([$slug]); if (!$st->fetch()) return $slug; $i++; $slug = "$base-$i"; }
}

if ($action === 'create') {                       // nuevo álbum vacío
  $title = trim((string)($in['title'] ?? ''));
  if ($title === '') { http_response_code(400); exit(json_encode(['error'=>'title'])); }
  $slug = uniqueSlug($pdo, slugify($title));
  $pos = (int)$pdo->query('SELECT COALESCE(MAX(position),0)+1 p FROM albums')->fetch()['p'];
  // nace oculto: se publica cuando ya tiene fotos
  $pdo->prepare('INSERT INTO albums (slug,title,description,enabled,position) VALUES (?,?,?,0,?)')
      ->execute([$slug, $title, '', $pos]);
  $id = (int)$pdo->lastInsertId();
  foreach (['orig','web','thumb'] as $k) @mkdir(MEDIA_DIR . "/$slug/$k", 0755, true);
  regenerateManifest();
  echo json_encode(['ok'=>true, 'id'=>$id, 'slug'=>$slug]); exit;
}

if ($action === 'update') {                       // title/description
  $pdo->prepare('UPDATE albums SET title=?, description=? WHERE id=?')
      ->execute([(string)$in['title'], (string)($in['description'] ?? ''), (int)$in['id']]);
} elseif ($action === 'toggle') {                 // enabled 0/1
  $pdo->prepare('UPDATE albums SET enabled=? WHERE id=?')
      ->execute([(int)!!$in['enabled'], (int)$in['id']]);
} elseif ($action === 'cover') {                  // set cover_photo_id
  $pdo->prepare('UPDATE albums SET cover_photo_id=? WHERE id=?')
      ->execute([(int)$in['photo_id'], (int)$in['id']]);
} elseif ($action === 'reorder') {                // order of album ids
  $pos = 0;
  foreach (($in['order'] ?? []) as $id) { $pos++; $pdo->prepare('UPDATE albums SET position=? WHERE id=?')->execute([$pos, (int)$id]); }
} else { http_response_code(400); exit(json_encode(['error'=>'action'])); }

regenerateManifest();
echo json_encode(['ok'=>true]);
