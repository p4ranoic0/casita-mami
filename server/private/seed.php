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
