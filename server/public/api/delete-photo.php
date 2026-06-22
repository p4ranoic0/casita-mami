<?php require __DIR__ . '/bootstrap.php'; requireLoginApi(); checkCsrf();
$in = json_decode(file_get_contents('php://input'), true) ?: [];
$pdo = db();
$p = $pdo->prepare('SELECT p.*, a.slug FROM photos p JOIN albums a ON a.id=p.album_id WHERE p.id=?');
$p->execute([(int)($in['id'] ?? 0)]); $row = $p->fetch();
if ($row) {
  deletePhotoFiles($row['slug'], $row['filename'], $row['orig_ext']);
  $pdo->prepare('DELETE FROM photos WHERE id=?')->execute([(int)$row['id']]);
  regenerateManifest();
}
echo json_encode(['ok'=>true]);
