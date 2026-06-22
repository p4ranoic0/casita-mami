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
