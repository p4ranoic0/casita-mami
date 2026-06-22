<?php require __DIR__ . '/bootstrap.php'; requireLoginApi(); checkCsrf();
$in = json_decode(file_get_contents('php://input'), true) ?: [];
$pdo = db(); $pos = 0;
foreach (($in['order'] ?? []) as $photoId) { $pos++; $pdo->prepare('UPDATE photos SET position=? WHERE id=?')->execute([$pos, (int)$photoId]); }
regenerateManifest();
echo json_encode(['ok'=>true]);
