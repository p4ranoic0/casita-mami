<?php
require_once __DIR__ . '/paths.php';
require_once PRIVATE_DIR . '/config.php';

function sessionStart(): void {
  if (session_status() === PHP_SESSION_ACTIVE) return;
  session_name(SESSION_NAME);
  session_set_cookie_params([
    'lifetime' => 0, 'path' => '/', 'secure' => true,
    'httponly' => true, 'samesite' => 'Lax',
  ]);
  session_start();
}

function throttleFile(): string { return sys_get_temp_dir() . '/casita_login_' . md5($_SERVER['REMOTE_ADDR'] ?? 'cli'); }

function loginThrottled(): bool {
  $f = throttleFile();
  if (!is_file($f)) return false;
  $d = json_decode((string)file_get_contents($f), true) ?: ['n'=>0,'t'=>0];
  if (time() - ($d['t'] ?? 0) > LOGIN_WINDOW) return false;
  return ($d['n'] ?? 0) >= LOGIN_MAX_TRIES;
}

function loginRegisterFail(): void {
  $f = throttleFile();
  $d = (is_file($f) ? json_decode((string)file_get_contents($f), true) : null) ?: ['n'=>0,'t'=>time()];
  if (time() - ($d['t'] ?? 0) > LOGIN_WINDOW) $d = ['n'=>0,'t'=>time()];
  $d['n']++; file_put_contents($f, json_encode($d));
}

function attemptLogin(string $user, string $pass): bool {
  if (loginThrottled()) return false;
  if (hash_equals(ADMIN_USER, $user) && password_verify($pass, ADMIN_HASH)) {
    sessionStart();
    session_regenerate_id(true);
    $_SESSION['uid'] = ADMIN_USER;
    @unlink(throttleFile());
    return true;
  }
  loginRegisterFail();
  return false;
}

function isLoggedIn(): bool { sessionStart(); return !empty($_SESSION['uid']); }
function requireLoginRedirect(): void { if (!isLoggedIn()) { header('Location: /admin/login.php'); exit; } }
function requireLoginApi(): void { if (!isLoggedIn()) { http_response_code(401); echo json_encode(['error'=>'no auth']); exit; } }
function logout(): void { sessionStart(); $_SESSION = []; session_destroy(); }
