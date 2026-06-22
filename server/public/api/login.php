<?php require __DIR__ . '/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit(json_encode(['error'=>'method'])); }
$in = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$ok = attemptLogin((string)($in['user'] ?? ''), (string)($in['pass'] ?? ''));
echo json_encode($ok ? ['ok'=>true, 'csrf'=>csrfToken()] : ['ok'=>false]);
if (!$ok) http_response_code(401);
