<?php
// Partes comunes del admin: lista de álbumes y cabecera/lateral.
// Solo define funciones; no imprime nada si se abre directo.

function h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES); }

// Álbumes con conteo y miniatura de portada (la elegida o la primera foto).
function adminAlbums(PDO $pdo): array {
  $rows = $pdo->query('SELECT a.*, (SELECT COUNT(*) FROM photos WHERE album_id=a.id) n FROM albums a ORDER BY position, id')->fetchAll();
  $cov = $pdo->prepare('SELECT filename FROM photos WHERE album_id=? ORDER BY (id = ?) DESC, position, id LIMIT 1');
  foreach ($rows as &$a) {
    $cov->execute([$a['id'], (int)$a['cover_photo_id']]);
    $f = $cov->fetchColumn();
    $a['cover_src'] = $f ? "/galeria/media/{$a['slug']}/thumb/$f.jpg" : null;
  }
  unset($a);
  return $rows;
}

function adminHead(string $title): void { ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title><?=h($title)?> · Admin Galería</title>
  <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/admin/assets/admin.css?v=<?=@filemtime(__DIR__.'/assets/admin.css')?>">
</head>
<?php }

function adminBar(?array $album): void { ?>
  <header class="ad-bar">
    <span class="lg"><img src="/logo.jpg" alt=""></span>
    <b>La Casita <span>· Galería</span></b>
    <nav>
      <?php if ($album): ?><a href="/galeria/<?=h($album['slug'])?>" target="_blank" rel="noopener">Ver álbum publicado</a><?php endif; ?>
      <a href="/galeria/" target="_blank" rel="noopener">Ver galería</a>
      <a href="/admin/logout.php">Salir</a>
    </nav>
  </header>
<?php }

function adminSide(array $albums, int $currentId): void { ?>
  <aside class="ad-side" id="ad-side">
    <h2>Álbumes</h2>
    <?php foreach ($albums as $a): $n = (int)$a['n']; ?>
      <a class="ad-al<?=(int)$a['id'] === $currentId ? ' on' : ''?>" href="/admin/album.php?id=<?=(int)$a['id']?>" data-id="<?=(int)$a['id']?>">
        <?php if ($a['cover_src']): ?><img src="<?=h($a['cover_src'])?>" alt="" loading="lazy"><?php else: ?><span class="ph0"></span><?php endif; ?>
        <span><strong><?=h($a['title'])?></strong><small class="<?=$a['enabled'] ? '' : 'off'?>"><span class="n"><?=$n?> <?=$n === 1 ? 'foto' : 'fotos'?></span> · <span class="v"><?=$a['enabled'] ? 'visible' : 'oculto'?></span></small></span>
      </a>
    <?php endforeach; ?>
    <button class="ad-new" id="ad-new" type="button">+ Nuevo álbum</button>
  </aside>
<?php }
