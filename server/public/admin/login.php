<?php require __DIR__ . '/bootstrap.php';
$err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (attemptLogin((string)($_POST['user'] ?? ''), (string)($_POST['pass'] ?? ''))) { header('Location: /admin/'); exit; }
  $err = loginThrottled() ? 'Demasiados intentos. Espera unos minutos.' : 'Usuario o contraseña incorrectos.';
}
if (isLoggedIn()) { header('Location: /admin/'); exit; }
?><!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin · La Casita</title><link rel="stylesheet" href="/admin/assets/admin.css"></head>
<body class="login"><form method="post" class="card">
<h1>Galería · Admin</h1>
<?php if ($err): ?><p class="err"><?=htmlspecialchars($err)?></p><?php endif; ?>
<input name="user" placeholder="Usuario" autofocus required>
<input name="pass" type="password" placeholder="Contraseña" required>
<button>Entrar</button></form></body></html>
