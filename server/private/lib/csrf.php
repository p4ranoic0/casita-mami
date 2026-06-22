<?php
require_once __DIR__ . '/auth.php';
function csrfToken(): string {
  sessionStart();
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
  return $_SESSION['csrf'];
}
function checkCsrf(): void {
  sessionStart();
  $t = $_POST['csrf'] ?? ($_SERVER['HTTP_X_CSRF'] ?? '');
  if (empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], (string)$t)) {
    http_response_code(403); echo json_encode(['error'=>'csrf']); exit;
  }
}
