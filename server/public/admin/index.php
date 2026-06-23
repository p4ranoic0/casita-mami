<?php require __DIR__ . '/bootstrap.php'; requireLoginRedirect();
$pdo = db();
$albums = $pdo->query('SELECT a.*, (SELECT COUNT(*) FROM photos WHERE album_id=a.id) n FROM albums a ORDER BY position,id')->fetchAll();

// Fetch cover thumbnail filename for each album
foreach ($albums as &$a) {
  $covStmt = $pdo->prepare(
    'SELECT filename FROM photos WHERE album_id=? ORDER BY position,id LIMIT 1'
  );
  $covStmt->execute([$a['id']]);
  $a['cover_filename'] = $covStmt->fetchColumn() ?: null;
}
unset($a);

$csrf = csrfToken();
?><!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Admin · Galería</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/admin/assets/admin.css">
</head>
<body data-csrf="<?=htmlspecialchars($csrf)?>">

  <header class="bar">
    <a class="bar-brand" href="/admin/">La Casita <span>·</span> Admin</a>
    <nav>
      <a href="/galeria/" target="_blank" rel="noopener">Ver galería</a>
      <a href="/admin/logout.php">Salir</a>
    </nav>
  </header>

  <main>
    <div class="page-header">
      <h1>Álbumes</h1>
      <button id="btn-nuevo-album" class="btn-primary">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Nuevo álbum
      </button>
    </div>

    <div id="nuevo-album-wrap" class="nuevo-album-wrap">
      <div class="nuevo-album-form">
        <input
          type="text"
          id="nuevo-album-title"
          placeholder="Nombre del álbum"
          maxlength="120"
          aria-label="Nombre del nuevo álbum"
        >
        <button type="button" id="nuevo-album-confirm" class="btn-primary">Crear</button>
        <button type="button" id="nuevo-album-cancel" class="nuevo-album-cancel">Cancelar</button>
      </div>
    </div>

    <ul class="albums" id="albums">
      <?php foreach ($albums as $a): ?>
      <li data-id="<?=(int)$a['id']?>">
        <div class="album-row">
          <a class="row-link" href="/admin/album.php?id=<?=(int)$a['id']?>">
            <?php if ($a['cover_filename']): ?>
              <img
                class="album-thumb"
                src="/galeria/media/<?=htmlspecialchars($a['slug'])?>/thumb/<?=htmlspecialchars($a['cover_filename'])?>.jpg"
                alt=""
                loading="lazy"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
              >
              <span class="album-thumb-placeholder" style="display:none" aria-hidden="true">&#128247;</span>
            <?php else: ?>
              <span class="album-thumb-placeholder" aria-hidden="true">&#128247;</span>
            <?php endif; ?>
            <span class="album-info">
              <span class="album-title"><?=htmlspecialchars($a['title'])?></span>
              <span class="album-meta" data-n="<?=(int)$a['n']?>"><?=(int)$a['n']?> <?=(int)$a['n']===1?'foto':'fotos'?> · <?=$a['enabled']?'visible':'oculto'?></span>
            </span>
          </a>
          <span class="album-toggle-slot">
            <span class="album-toggle-label"><?=$a['enabled']?'Visible':'Oculto'?></span>
            <label class="toggle-switch" title="Cambiar visibilidad">
              <input type="checkbox" class="toggle" <?=$a['enabled']?'checked':''?>>
              <span class="toggle-track"></span>
              <span class="toggle-thumb"></span>
              <span class="sr-only">Visible</span>
            </label>
          </span>
        </div>
      </li>
      <?php endforeach; ?>
    </ul>
  </main>

  <script src="/admin/assets/admin.js"></script>
</body>
</html>
