<?php require __DIR__ . '/bootstrap.php'; requireLoginApi(); checkCsrf();
if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) { http_response_code(400); exit(json_encode(['error'=>'no file'])); }
$albumId = (int)($_POST['album_id'] ?? 0);
$pdo = db();
$a = $pdo->prepare('SELECT * FROM albums WHERE id=?'); $a->execute([$albumId]); $album = $a->fetch();
if (!$album) { http_response_code(404); exit(json_encode(['error'=>'album'])); }

try {
  [$name,$ext,$w,$h] = processUpload($_FILES['file']['tmp_name'], $album['slug']);
} catch (Throwable $e) { http_response_code(422); exit(json_encode(['error'=>$e->getMessage()])); }

$pos = (int)$pdo->query('SELECT COALESCE(MAX(position),0)+1 p FROM photos WHERE album_id='.$albumId)->fetch()['p'];
$st = $pdo->prepare('INSERT INTO photos (album_id,filename,orig_ext,w,h,position) VALUES (?,?,?,?,?,?)');
$st->execute([$albumId, $name, $ext, $w, $h, $pos]);
regenerateManifest();
echo json_encode(['ok'=>true, 'id'=>(int)$pdo->lastInsertId()]);
