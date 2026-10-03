<?php require __DIR__ . '/bootstrap.php'; requireLoginApi(); checkCsrf();
// Borra una foto ({id}) o varias ({ids:[...]}). Acepta JSON o form-data (el
// admin usa sendBeacon si se cierra la página con un borrado pendiente).
$in = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$ids = array_map('intval', (array)($in['ids'] ?? [$in['id'] ?? 0]));
$pdo = db();
$sel = $pdo->prepare('SELECT p.*, a.slug, a.cover_photo_id FROM photos p JOIN albums a ON a.id=p.album_id WHERE p.id=?');
$n = 0;
foreach ($ids as $id) {
  $sel->execute([$id]); $row = $sel->fetch();
  if (!$row) continue;
  deletePhotoFiles($row['slug'], $row['filename'], $row['orig_ext']);
  $pdo->prepare('DELETE FROM photos WHERE id=?')->execute([$id]);
  if ((int)$row['cover_photo_id'] === $id) $pdo->prepare('UPDATE albums SET cover_photo_id=NULL WHERE id=?')->execute([$row['album_id']]);
  $n++;
}
if ($n) regenerateManifest();
echo json_encode(['ok' => true, 'deleted' => $n]);
