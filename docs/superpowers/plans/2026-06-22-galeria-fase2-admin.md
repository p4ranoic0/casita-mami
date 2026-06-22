# Galería Fase 2 — Panel admin (PHP) · Plan de implementación

> **For agentic workers:** ejecutar tarea por tarea. El backend es PHP y se valida EN EL SERVIDOR (Hostinger PHP 8.3 + Imagick + SQLite); no hay PHP local. Pasos con checkbox `- [ ]`.

**Goal:** Panel de administración (login único `admin`) en `lacasitademami.edu.pe/admin` + API PHP en `/api` para gestionar la galería ya migrada (renombrar/describir álbumes, habilitar/ocultar, reordenar, subir y borrar fotos), con SQLite como fuente de verdad sembrada desde el `manifest.json` migrado.

**Architecture:** PHP plano + JS vanilla (sin segundo build). SQLite (`private/gallery.db`) fuera del webroot. Librería compartida en `private/lib/` (db, auth, csrf, images=Imagick, manifest). La API muta SQLite y **regenera `manifest.json`** (solo álbumes habilitados) que consume la galería pública de Fase 1. El admin escribe en `public_html/galeria/media/` (mismo usuario del sistema). Reordenar con SortableJS auto-alojado.

**Tech Stack:** PHP 8.3, ext-imagick, ext-pdo_sqlite, SortableJS (vendored), Apache `.htaccess` (ya sirve `admin/` y `api/` por `!-f/!-d`).

**Spec:** [`../specs/2026-06-22-galeria-subdomain-design.md`](../specs/2026-06-22-galeria-subdomain-design.md) (§4,§5,§6,§9,§10,§12)

---

## Distribución (servidor)

```
~/domains/lacasitademami.edu.pe/
├─ private/                       # FUERA del webroot
│   ├─ config.php                 # ADMIN_USER, ADMIN_HASH, rutas, SESSION_NAME
│   ├─ gallery.db                 # SQLite (albums, photos)
│   └─ lib/  db.php auth.php csrf.php images.php manifest.php paths.php
├─ public_html/
│   ├─ admin/                     # UI PHP
│   │   ├─ bootstrap.php          # require lib + requireLogin
│   │   ├─ index.php login.php logout.php album.php
│   │   └─ assets/ admin.css admin.js sortable.min.js
│   ├─ api/                       # endpoints JSON
│   │   ├─ bootstrap.php login.php logout.php
│   │   ├─ albums.php upload.php reorder.php delete-photo.php
│   └─ galeria/ … media/ manifest.json   # (ya existe de la migración)
```

En el **repo**, todo se versiona bajo `server/` y se despliega con `deploy-admin.sh`:
```
server/private/{config.sample.php, lib/*.php, schema.sql, seed.php}
server/public/admin/*    server/public/api/*
```

---

## Modelo de datos (SQLite) — `server/private/schema.sql`

```sql
CREATE TABLE IF NOT EXISTS albums (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  enabled     INTEGER NOT NULL DEFAULT 1,
  cover_photo_id INTEGER,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS photos (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id  INTEGER NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  filename  TEXT NOT NULL,         -- base sin extensión (uuid o id)
  orig_ext  TEXT NOT NULL DEFAULT 'jpg',
  w INTEGER NOT NULL DEFAULT 0,
  h INTEGER NOT NULL DEFAULT 0,
  position  INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_photos_album ON photos(album_id, position);
```

Rutas derivadas (no se guardan): `media/<slug>/{thumb,web}/<filename>.jpg`, `orig/<filename>.<orig_ext>`.

---

## Task 1: Librería base — paths, db, schema, seed desde manifest

**Files (repo):** `server/private/lib/paths.php`, `server/private/lib/db.php`, `server/private/schema.sql`, `server/private/seed.php`

- [ ] **Step 1: `server/private/lib/paths.php`**

```php
<?php
// Rutas absolutas del proyecto en el servidor. PRIVATE_DIR = dir de este archivo / ..
define('PRIVATE_DIR', dirname(__DIR__));                     // .../<dominio>/private
define('DOMAIN_DIR', dirname(PRIVATE_DIR));                  // .../<dominio>
define('GALERIA_DIR', DOMAIN_DIR . '/public_html/galeria');
define('MEDIA_DIR', GALERIA_DIR . '/media');
define('MANIFEST_PATH', GALERIA_DIR . '/manifest.json');
define('DB_PATH', PRIVATE_DIR . '/gallery.db');
```

- [ ] **Step 2: `server/private/lib/db.php`**

```php
<?php
require_once __DIR__ . '/paths.php';

function db(): PDO {
  static $pdo = null;
  if ($pdo === null) {
    $pdo = new PDO('sqlite:' . DB_PATH);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA foreign_keys = ON');
  }
  return $pdo;
}

function dbInit(): void {
  db()->exec(file_get_contents(PRIVATE_DIR . '/schema.sql'));
}
```

- [ ] **Step 3: `server/private/schema.sql`** — el SQL del bloque "Modelo de datos" arriba (cópialo verbatim).

- [ ] **Step 4: `server/private/seed.php`** (siembra SQLite desde el manifest migrado; idempotente)

```php
<?php
// Siembra gallery.db desde el manifest.json ya migrado. Re-ejecutable: si la BD ya
// tiene álbumes, no duplica (borra y recarga para mantener consistencia con el manifest).
require_once __DIR__ . '/lib/db.php';
dbInit();
$pdo = db();

$m = json_decode((string)file_get_contents(MANIFEST_PATH), true);
if (!$m || empty($m['albums'])) { fwrite(STDERR, "manifest vacío\n"); exit(1); }

$pdo->beginTransaction();
$pdo->exec('DELETE FROM photos'); $pdo->exec('DELETE FROM albums');

$aPos = 0;
foreach ($m['albums'] as $a) {
  $aPos++;
  $st = $pdo->prepare('INSERT INTO albums (slug,title,description,enabled,position) VALUES (?,?,?,1,?)');
  $st->execute([$a['slug'], $a['title'], $a['description'] ?? '', $aPos]);
  $albumId = (int)$pdo->lastInsertId();

  $pPos = 0; $coverId = null;
  foreach (($a['photos'] ?? []) as $p) {
    $pPos++;
    // orig path: media/<slug>/orig/<file>.<ext>  -> extraer file + ext
    $orig = basename($p['orig']);                    // <uuid>.<ext>
    $ext  = pathinfo($orig, PATHINFO_EXTENSION) ?: 'jpg';
    $file = pathinfo($orig, PATHINFO_FILENAME);
    $st2 = $pdo->prepare('INSERT INTO photos (album_id,filename,orig_ext,w,h,position) VALUES (?,?,?,?,?,?)');
    $st2->execute([$albumId, $file, $ext, (int)($p['w'] ?? 0), (int)($p['h'] ?? 0), $pPos]);
    if ($coverId === null) $coverId = (int)$pdo->lastInsertId();
  }
  if ($coverId) $pdo->prepare('UPDATE albums SET cover_photo_id=? WHERE id=?')->execute([$coverId, $albumId]);
}
$pdo->commit();

$n = $pdo->query('SELECT COUNT(*) c FROM photos')->fetch()['c'];
$na = $pdo->query('SELECT COUNT(*) c FROM albums')->fetch()['c'];
fwrite(STDOUT, "✅ Sembrado: $na álbumes, $n fotos.\n");
```

- [ ] **Step 5: Commit** `git add server/private/lib/paths.php server/private/lib/db.php server/private/schema.sql server/private/seed.php && git commit -m "feat(admin): librería base SQLite + seed desde manifest"`

---

## Task 2: Config + Auth (sesión, login, throttle) — `server/private/lib/auth.php`, `config.sample.php`

- [ ] **Step 1: `server/private/config.sample.php`** (plantilla; el real `config.php` se crea en el server con el hash)

```php
<?php
// Copiar a private/config.php en el servidor y rellenar ADMIN_HASH con:
//   php -r 'echo password_hash(trim(fgets(STDIN)),PASSWORD_DEFAULT).PHP_EOL;' <<< 'TU_PASSWORD'
define('ADMIN_USER', 'admin');
define('ADMIN_HASH', '');                 // <-- hash bcrypt aquí
define('SESSION_NAME', 'casita_admin');
define('LOGIN_MAX_TRIES', 8);             // por ventana
define('LOGIN_WINDOW', 900);             // 15 min
```

- [ ] **Step 2: `server/private/lib/auth.php`**

```php
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
```

- [ ] **Step 3: Commit** `git add server/private/config.sample.php server/private/lib/auth.php && git commit -m "feat(admin): config + auth (sesión endurecida, throttle, bcrypt)"`

---

## Task 3: CSRF + Imagick + regeneración de manifest

**Files:** `server/private/lib/csrf.php`, `server/private/lib/images.php`, `server/private/lib/manifest.php`

- [ ] **Step 1: `server/private/lib/csrf.php`**

```php
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
```

- [ ] **Step 2: `server/private/lib/images.php`** (mismo pipeline que la migración)

```php
<?php
require_once __DIR__ . '/paths.php';
const WEB_CAP = 2048, THUMB_CAP = 480, WEB_Q = 82, THUMB_Q = 78;

function imgVariant(string $src, int $cap, int $q, string $dest): void {
  $im = new Imagick($src);
  $w = $im->getImageWidth(); $h = $im->getImageHeight();
  if (max($w,$h) > $cap) {
    if ($w >= $h) $im->resizeImage($cap, 0, Imagick::FILTER_LANCZOS, 1);
    else          $im->resizeImage(0, $cap, Imagick::FILTER_LANCZOS, 1);
  }
  $im->setImageFormat('jpeg'); $im->setImageCompressionQuality($q); $im->stripImage();
  $im->writeImage($dest); $im->clear(); $im->destroy();
}

// Procesa un archivo subido para un slug. Devuelve [filename, ext, w, h].
function processUpload(string $tmpPath, string $slug): array {
  $probe = new Imagick($tmpPath);
  $fmt = strtolower($probe->getImageFormat());
  if (!in_array($fmt, ['jpeg','jpg','png'], true)) { $probe->clear(); throw new RuntimeException('formato no permitido'); }
  $W = $probe->getImageWidth(); $H = $probe->getImageHeight(); $probe->clear();

  $ext = $fmt === 'png' ? 'png' : 'jpg';
  $name = bin2hex(random_bytes(12));
  foreach (['orig','web','thumb'] as $k) @mkdir(MEDIA_DIR . "/$slug/$k", 0755, true);
  $orig = MEDIA_DIR . "/$slug/orig/$name.$ext";
  // re-encode el original con Imagick (neutraliza payloads, quita metadatos/GPS)
  $oi = new Imagick($tmpPath); $oi->stripImage();
  if ($ext === 'jpg') { $oi->setImageFormat('jpeg'); $oi->setImageCompressionQuality(92); }
  $oi->writeImage($orig); $oi->clear();
  imgVariant($orig, WEB_CAP, WEB_Q, MEDIA_DIR . "/$slug/web/$name.jpg");
  imgVariant($orig, THUMB_CAP, THUMB_Q, MEDIA_DIR . "/$slug/thumb/$name.jpg");
  return [$name, $ext, $W, $H];
}

function deletePhotoFiles(string $slug, string $filename, string $ext): void {
  @unlink(MEDIA_DIR . "/$slug/orig/$filename.$ext");
  @unlink(MEDIA_DIR . "/$slug/web/$filename.jpg");
  @unlink(MEDIA_DIR . "/$slug/thumb/$filename.jpg");
}
```

- [ ] **Step 3: `server/private/lib/manifest.php`** (regenera manifest desde DB; solo habilitados)

```php
<?php
require_once __DIR__ . '/db.php';

function photoPaths(string $slug, array $p): array {
  return [
    'thumb' => "media/$slug/thumb/{$p['filename']}.jpg",
    'web'   => "media/$slug/web/{$p['filename']}.jpg",
    'orig'  => "media/$slug/orig/{$p['filename']}.{$p['orig_ext']}",
    'w' => (int)$p['w'], 'h' => (int)$p['h'],
  ];
}

function regenerateManifest(): void {
  $pdo = db();
  $albums = $pdo->query('SELECT * FROM albums WHERE enabled=1 ORDER BY position, id')->fetchAll();
  $out = ['generated_at' => gmdate('c'), 'albums' => []];
  foreach ($albums as $a) {
    $ph = $pdo->prepare('SELECT * FROM photos WHERE album_id=? ORDER BY position, id');
    $ph->execute([$a['id']]);
    $photos = $ph->fetchAll();
    $entries = array_map(fn($p) => photoPaths($a['slug'], $p), $photos);
    // cover: la foto cover_photo_id si existe, si no la primera
    $cover = '';
    foreach ($photos as $p) { if ((int)$p['id'] === (int)$a['cover_photo_id']) { $cover = "media/{$a['slug']}/web/{$p['filename']}.jpg"; break; } }
    if ($cover === '' && $entries) $cover = $entries[0]['web'];
    $out['albums'][] = [
      'slug' => $a['slug'], 'title' => $a['title'], 'description' => $a['description'],
      'cover' => $cover, 'photos' => $entries,
    ];
  }
  file_put_contents(MANIFEST_PATH, json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}
```

- [ ] **Step 4: Commit** `git add server/private/lib/csrf.php server/private/lib/images.php server/private/lib/manifest.php && git commit -m "feat(admin): csrf, pipeline Imagick y regeneración de manifest desde DB"`

---

## Task 4: API — bootstrap, login, logout

**Files:** `server/public/api/bootstrap.php`, `login.php`, `logout.php`

- [ ] **Step 1: `server/public/api/bootstrap.php`** (carga lib + cabeceras JSON)

```php
<?php
// lib relativo a ESTE archivo: api/ -> (public_html|public) -> <dominio|server> -> private/lib
// Funciona igual en el repo (server/public/api) y en el servidor (public_html/api).
$L = dirname(dirname(__DIR__)) . '/private/lib';
require_once "$L/db.php"; require_once "$L/auth.php"; require_once "$L/csrf.php";
require_once "$L/images.php"; require_once "$L/manifest.php";
header('Content-Type: application/json; charset=utf-8');
```

> Nota de despliegue: el `bootstrap.php` resuelve la lib vía `DOCUMENT_ROOT/../../private/lib`
> (porque en Hostinger el docroot del dominio es `.../public_html`). Verificar en Task 11.

- [ ] **Step 2: `server/public/api/login.php`**

```php
<?php require __DIR__ . '/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit(json_encode(['error'=>'method'])); }
$in = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$ok = attemptLogin((string)($in['user'] ?? ''), (string)($in['pass'] ?? ''));
echo json_encode($ok ? ['ok'=>true, 'csrf'=>csrfToken()] : ['ok'=>false]);
if (!$ok) http_response_code(401);
```

- [ ] **Step 3: `server/public/api/logout.php`**

```php
<?php require __DIR__ . '/bootstrap.php'; logout(); echo json_encode(['ok'=>true]);
```

- [ ] **Step 4: Commit** `git add server/public/api/bootstrap.php server/public/api/login.php server/public/api/logout.php && git commit -m "feat(admin): API login/logout"`

---

## Task 5: API — álbumes (listar, editar, toggle, portada, reordenar álbumes)

**File:** `server/public/api/albums.php`

- [ ] **Step 1: `server/public/api/albums.php`**

```php
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
```

- [ ] **Step 2: Commit** `git add server/public/api/albums.php && git commit -m "feat(admin): API álbumes (update/toggle/cover/reorder)"`

---

## Task 6: API — subir fotos

**File:** `server/public/api/upload.php`

- [ ] **Step 1: `server/public/api/upload.php`** (una foto por request; el cliente sube secuencial)

```php
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
```

- [ ] **Step 2: Commit** `git add server/public/api/upload.php && git commit -m "feat(admin): API subir foto (Imagick)"`

---

## Task 7: API — reordenar fotos + borrar foto

**Files:** `server/public/api/reorder.php`, `server/public/api/delete-photo.php`

- [ ] **Step 1: `server/public/api/reorder.php`**

```php
<?php require __DIR__ . '/bootstrap.php'; requireLoginApi(); checkCsrf();
$in = json_decode(file_get_contents('php://input'), true) ?: [];
$pdo = db(); $pos = 0;
foreach (($in['order'] ?? []) as $photoId) { $pos++; $pdo->prepare('UPDATE photos SET position=? WHERE id=?')->execute([$pos, (int)$photoId]); }
regenerateManifest();
echo json_encode(['ok'=>true]);
```

- [ ] **Step 2: `server/public/api/delete-photo.php`**

```php
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
```

- [ ] **Step 3: Commit** `git add server/public/api/reorder.php server/public/api/delete-photo.php && git commit -m "feat(admin): API reordenar y borrar fotos"`

---

## Task 8: Admin UI — bootstrap, login, dashboard

**Files:** `server/public/admin/bootstrap.php`, `login.php`, `logout.php`, `index.php`, `assets/admin.css`

- [ ] **Step 1: `server/public/admin/bootstrap.php`**

```php
<?php
// lib relativo a ESTE archivo (admin/ -> public_html -> <dominio> -> private/lib)
$L = dirname(dirname(__DIR__)) . '/private/lib';
require_once "$L/db.php"; require_once "$L/auth.php"; require_once "$L/csrf.php"; require_once "$L/manifest.php";
```

- [ ] **Step 2: `server/public/admin/login.php`**

```php
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
```

- [ ] **Step 3: `server/public/admin/logout.php`**

```php
<?php require __DIR__ . '/bootstrap.php'; logout(); header('Location: /admin/login.php'); exit;
```

- [ ] **Step 4: `server/public/admin/index.php`** (dashboard: lista de álbumes)

```php
<?php require __DIR__ . '/bootstrap.php'; requireLoginRedirect();
$pdo = db();
$albums = $pdo->query('SELECT a.*, (SELECT COUNT(*) FROM photos WHERE album_id=a.id) n FROM albums a ORDER BY position,id')->fetchAll();
$csrf = csrfToken();
?><!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin · Galería</title><link rel="stylesheet" href="/admin/assets/admin.css"></head>
<body data-csrf="<?=$csrf?>"><header class="bar"><b>Galería · Admin</b>
<nav><a href="/galeria/" target="_blank">Ver galería</a> <a href="/admin/logout.php">Salir</a></nav></header>
<main><h1>Álbumes</h1><ul class="albums" id="albums">
<?php foreach ($albums as $a): ?>
<li data-id="<?=$a['id']?>">
  <a class="thumb" href="/admin/album.php?id=<?=$a['id']?>">
    <span><?=htmlspecialchars($a['title'])?></span>
    <small><?=$a['n']?> fotos · <?=$a['enabled']?'visible':'oculto'?></small>
  </a>
  <label class="sw"><input type="checkbox" class="toggle" <?=$a['enabled']?'checked':''?>> <span>Visible</span></label>
</li>
<?php endforeach; ?>
</ul></main><script src="/admin/assets/admin.js"></script></body></html>
```

- [ ] **Step 5: `server/public/admin/assets/admin.css`** (estilo simple, marca turquesa)

```css
:root{--p:#25c1e9;--pd:#1a9dc0;--bg:#f5fdff;--ink:#0d2d3a;--mut:#5a7a85}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--ink)}
.bar{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;background:#fff;border-bottom:1px solid #e0f6fc;position:sticky;top:0}
.bar a{color:var(--pd);text-decoration:none;margin-left:14px;font-weight:600}
main{max-width:920px;margin:0 auto;padding:20px}
h1{font-weight:800}
.albums{list-style:none;padding:0;display:grid;gap:12px}
.albums li{display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid #e0f6fc;border-radius:14px;padding:14px 16px}
.albums .thumb{display:flex;flex-direction:column;text-decoration:none;color:var(--ink)}
.albums small{color:var(--mut)}
.sw{display:flex;align-items:center;gap:8px;color:var(--mut);font-size:.9em}
button,.btn{background:var(--p);color:#fff;border:0;border-radius:999px;padding:10px 18px;font-weight:700;cursor:pointer}
button:hover{background:var(--pd)}
.login{display:grid;place-items:center;min-height:100vh}
.card{background:#fff;border:1px solid #e0f6fc;border-radius:18px;padding:28px;display:grid;gap:12px;width:320px}
.card input{padding:11px 13px;border:1px solid #cfeff8;border-radius:10px;font-size:1em}
.err{color:#c0392b;margin:0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}
.grid figure{margin:0;position:relative;border-radius:10px;overflow:hidden;background:#e0f6fc}
.grid img{width:100%;height:130px;object-fit:cover;display:block}
.grid .del{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.55);color:#fff;border:0;border-radius:999px;width:26px;height:26px;cursor:pointer}
.progress{height:6px;background:#e0f6fc;border-radius:999px;overflow:hidden;margin:10px 0}
.progress > i{display:block;height:100%;width:0;background:var(--p);transition:width .2s}
.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:14px 0}
input[type=text],textarea{width:100%;padding:10px;border:1px solid #cfeff8;border-radius:10px;font:inherit}
</style>
```

(Guardar el CSS sin la etiqueta `</style>` final — es un archivo `.css`.)

- [ ] **Step 6: Commit** `git add server/public/admin/bootstrap.php server/public/admin/login.php server/public/admin/logout.php server/public/admin/index.php server/public/admin/assets/admin.css && git commit -m "feat(admin): UI login + dashboard"`

---

## Task 9: Admin UI — editor de álbum (editar, toggle, subir, reordenar, borrar) + admin.js + SortableJS

**Files:** `server/public/admin/album.php`, `server/public/admin/assets/admin.js`, `server/public/admin/assets/sortable.min.js`

- [ ] **Step 1: Vendorizar SortableJS** — descargar `Sortable.min.js` (v1.15) a `server/public/admin/assets/sortable.min.js`:
`curl -sL https://cdn.jsdelivr.net/npm/sortablejs@1.15.3/Sortable.min.js -o server/public/admin/assets/sortable.min.js`

- [ ] **Step 2: `server/public/admin/album.php`**

```php
<?php require __DIR__ . '/bootstrap.php'; requireLoginRedirect();
$pdo = db(); $id = (int)($_GET['id'] ?? 0);
$a = $pdo->prepare('SELECT * FROM albums WHERE id=?'); $a->execute([$id]); $album = $a->fetch();
if (!$album) { header('Location: /admin/'); exit; }
$ph = $pdo->prepare('SELECT * FROM photos WHERE album_id=? ORDER BY position,id'); $ph->execute([$id]); $photos = $ph->fetchAll();
$csrf = csrfToken();
?><!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin · <?=htmlspecialchars($album['title'])?></title><link rel="stylesheet" href="/admin/assets/admin.css"></head>
<body data-csrf="<?=$csrf?>" data-album="<?=$album['id']?>" data-slug="<?=htmlspecialchars($album['slug'])?>">
<header class="bar"><a href="/admin/">← Álbumes</a><nav><a href="/galeria/<?=$album['slug']?>" target="_blank">Ver</a> <a href="/admin/logout.php">Salir</a></nav></header>
<main>
  <input type="text" id="title" value="<?=htmlspecialchars($album['title'])?>">
  <div class="row"><textarea id="desc" rows="2" placeholder="Descripción"><?=htmlspecialchars($album['description'])?></textarea></div>
  <div class="row"><button id="save">Guardar texto</button>
    <label class="sw"><input type="checkbox" id="enabled" <?=$album['enabled']?'checked':''?>> Visible</label></div>
  <div class="row"><label class="btn" for="files">+ Subir fotos</label><input id="files" type="file" accept="image/*" multiple hidden>
    <span id="upinfo"></span></div>
  <div class="progress"><i id="bar"></i></div>
  <p class="mut">Arrastra para reordenar · ✕ para borrar</p>
  <div class="grid" id="grid">
  <?php foreach ($photos as $p): ?>
    <figure data-id="<?=$p['id']?>"><img loading="lazy" src="/galeria/media/<?=$album['slug']?>/thumb/<?=$p['filename']?>.jpg">
      <button class="del" title="Borrar">✕</button></figure>
  <?php endforeach; ?>
  </div>
</main>
<script src="/admin/assets/sortable.min.js"></script><script src="/admin/assets/admin.js"></script>
</body></html>
```

- [ ] **Step 3: `server/public/admin/assets/admin.js`**

```js
const csrf = document.body.dataset.csrf
const J = (url, body) => fetch(url, {method:'POST', headers:{'Content-Type':'application/json','X-CSRF':csrf}, body:JSON.stringify(body)}).then(r=>r.json())

// Dashboard: toggles de visibilidad
document.querySelectorAll('#albums .toggle').forEach(t => t.addEventListener('change', e => {
  const id = e.target.closest('li').dataset.id
  J('/api/albums.php', {action:'toggle', id, enabled: e.target.checked ? 1 : 0})
}))

// Editor de álbum
const album = document.body.dataset.album
if (album) {
  const slug = document.body.dataset.slug
  document.getElementById('save').onclick = () =>
    J('/api/albums.php', {action:'update', id:album, title:title.value, description:desc.value}).then(()=>save.textContent='Guardado ✓')
  document.getElementById('enabled').onchange = e =>
    J('/api/albums.php', {action:'toggle', id:album, enabled:e.target.checked?1:0})

  // Subida secuencial con barra
  const files = document.getElementById('files'), bar = document.getElementById('bar'), upinfo = document.getElementById('upinfo'), grid = document.getElementById('grid')
  files.onchange = async () => {
    const list = [...files.files]; let done = 0
    for (const f of list) {
      const fd = new FormData(); fd.append('file', f); fd.append('album_id', album)
      const r = await fetch('/api/upload.php', {method:'POST', headers:{'X-CSRF':csrf}, body:fd}).then(r=>r.json()).catch(()=>({}))
      done++; bar.style.width = (done/list.length*100)+'%'; upinfo.textContent = `${done}/${list.length}`
      if (r && r.id) {
        const fig = document.createElement('figure'); fig.dataset.id = r.id
        fig.innerHTML = `<img src="/galeria/media/${slug}/thumb/?reload"><button class="del">✕</button>`
        grid.appendChild(fig)
      }
    }
    upinfo.textContent = '✓ subido'; setTimeout(()=>{ bar.style.width='0'; location.reload() }, 800)
  }

  // Reordenar
  new Sortable(grid, {animation:150, onEnd: () => {
    const order = [...grid.children].map(f => f.dataset.id)
    J('/api/reorder.php', {order})
  }})

  // Borrar (delegado)
  grid.addEventListener('click', e => {
    if (!e.target.classList.contains('del')) return
    const fig = e.target.closest('figure')
    if (!confirm('¿Borrar esta foto?')) return
    J('/api/delete-photo.php', {id: fig.dataset.id}).then(()=> fig.remove())
  })
}
```

- [ ] **Step 4: Commit** `git add server/public/admin/album.php server/public/admin/assets/admin.js server/public/admin/assets/sortable.min.js && git commit -m "feat(admin): editor de álbum (subir/reordenar/borrar) + SortableJS"`

---

## Task 10: Deploy admin + setup `private/`

**Files:** `deploy-admin.sh`

- [ ] **Step 1: `deploy-admin.sh`**

```bash
#!/bin/bash
# Deploy del admin/api PHP → lacasitademami.edu.pe  (no borra datos)
set -euo pipefail
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"; cd "$PROJECT_DIR"
H="hostinger:~/domains/lacasitademami.edu.pe"
DRY="${1:-}"; [[ "$DRY" == "--dry-run" ]] && DRY="--dry-run" || DRY=""
echo "🚀 admin/ + api/ → public_html ..."
rsync -avz $DRY --delete server/public/admin/  "$H/public_html/admin/"
rsync -avz $DRY --delete server/public/api/    "$H/public_html/api/"
echo "🔒 lib/ + schema + seed → private/ (config.php NO se toca) ..."
rsync -avz $DRY server/private/lib/   "$H/private/lib/"
rsync -avz $DRY server/private/schema.sql server/private/seed.php "$H/private/"
echo "✅ Deploy admin listo."
```
`chmod +x deploy-admin.sh`

- [ ] **Step 2: Commit** `git add deploy-admin.sh && git commit -m "chore(admin): script de deploy admin/api/lib"`

---

## Task 11: Setup en servidor + verificación (PROD — requiere autorización del usuario)

- [ ] **Step 1: Crear `private/` y el hash de la contraseña** (en el server, password por stdin):
```bash
ssh hostinger 'mkdir -p ~/domains/lacasitademami.edu.pe/private/lib'
# hash de la contraseña sin que aparezca en argv:
HASH=$(ssh hostinger 'php -r "echo password_hash(trim(fgets(STDIN)),PASSWORD_DEFAULT);"' <<< 'casita')
# escribir config.php con ADMIN_USER=admin y ese hash (heredoc por ssh)
```
- [ ] **Step 2:** `./deploy-admin.sh --dry-run` → revisar; luego `./deploy-admin.sh`.
- [ ] **Step 3: Sembrar SQLite** desde el manifest migrado:
```bash
ssh hostinger 'php ~/domains/lacasitademami.edu.pe/private/seed.php'   # ✅ 5 álbumes, 1020 fotos
```
- [ ] **Step 4: `php -l`** de cada PHP en el server (lib, api, admin) para detectar errores de sintaxis.
- [ ] **Step 5: Verificación funcional** (curl + navegador):
  - `GET /admin/` sin sesión → redirige a `/admin/login.php`.
  - Login con admin/casita → dashboard con 5 álbumes y conteos.
  - Toggle de visibilidad de un álbum → desaparece/aparece en `/galeria` (manifest regenerado).
  - Editor: subir 1 foto → aparece; reordenar; borrar.
  - Confirmar que `/galeria` (Fase 1) sigue mostrando todo bien.
- [ ] **Step 6: Verificar deploy del sitio principal** no borra admin/api: `./deploy.sh --dry-run` (ya excluye `admin/ api/ galeria/`).

---

## Self-review (cobertura del spec)
- Login 1 admin + sesión endurecida + throttle + CSRF → Tasks 2,3,4. ✓
- SQLite store sembrado desde manifest → Task 1. ✓
- Editar nombre/descr, habilitar/ocultar, portada, reordenar álbumes → Task 5. ✓
- Subir (secuencial + progreso) + Imagick thumb/web/orig + strip metadatos → Tasks 6,9,3. ✓
- Reordenar fotos (SortableJS) + borrar → Tasks 7,9. ✓
- Regenerar manifest en cada cambio → Tasks 3,5,6,7. ✓
- Datos fuera del webroot (gallery.db, config.php) → Task 1,2,10. ✓
- Deploy seguro (no borra datos; admin/api preservados) → Tasks 10,11. ✓

## Pendiente / mejoras futuras
- Cambiar contraseña desde el panel (recomendado dado que `casita` es débil).
- Crear álbumes nuevos desde el panel (hoy se gestionan los 5 migrados).
- OG por-álbum para WhatsApp (prerender).
