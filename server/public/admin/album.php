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
