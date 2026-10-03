<?php require __DIR__ . '/bootstrap.php'; requireLoginApi(); checkCsrf();
// Sube UNA foto. El admin manda varias en paralelo (3 a la vez) y ya reducidas
// en el navegador. Los errores vuelven con un mensaje corto para mostrarlo en
// la miniatura.
function fail(int $code, string $msg) { http_response_code($code); exit(json_encode(['error' => $msg])); }

$f = $_FILES['file'] ?? null;
if (!$f) fail(400, 'No llegó el archivo');
if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE) fail(413, 'Archivo muy pesado');
if ($f['error'] === UPLOAD_ERR_PARTIAL) fail(400, 'Se cortó la conexión');
if ($f['error'] !== UPLOAD_ERR_OK) fail(400, 'No se pudo subir');

$albumId = (int)($_POST['album_id'] ?? 0);
$pdo = db();
$a = $pdo->prepare('SELECT * FROM albums WHERE id=?'); $a->execute([$albumId]); $album = $a->fetch();
if (!$album) fail(404, 'El álbum ya no existe');

try {
  [$name, $ext, $w, $h] = processUpload($f['tmp_name'], $album['slug']);
} catch (RuntimeException $e) {
  fail(422, 'Formato no permitido');
} catch (Throwable $e) {
  fail(422, 'Archivo dañado');
}

$pos = $pdo->prepare('SELECT COALESCE(MAX(position),0)+1 p FROM photos WHERE album_id=?');
$pos->execute([$albumId]);
$st = $pdo->prepare('INSERT INTO photos (album_id,filename,orig_ext,w,h,position) VALUES (?,?,?,?,?,?)');
$st->execute([$albumId, $name, $ext, $w, $h, (int)$pos->fetch()['p']]);
$id = (int)$pdo->lastInsertId();
// primera foto del álbum: queda de portada
if (!$album['cover_photo_id']) $pdo->prepare('UPDATE albums SET cover_photo_id=? WHERE id=?')->execute([$id, $albumId]);
regenerateManifest();
echo json_encode(['ok' => true, 'id' => $id, 'thumb' => "/galeria/media/{$album['slug']}/thumb/$name.jpg", 'w' => $w, 'h' => $h]);
