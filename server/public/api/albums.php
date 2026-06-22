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
