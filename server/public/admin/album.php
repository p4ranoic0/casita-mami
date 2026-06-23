<?php require __DIR__ . '/bootstrap.php'; requireLoginRedirect();
$pdo = db();
$id = (int)($_GET['id'] ?? 0);
$stmt = $pdo->prepare('SELECT * FROM albums WHERE id=?');
$stmt->execute([$id]);
$album = $stmt->fetch();
if (!$album) { header('Location: /admin/'); exit; }

$ph = $pdo->prepare('SELECT * FROM photos WHERE album_id=? ORDER BY position,id');
$ph->execute([$id]);
$photos = $ph->fetchAll();

$csrf = csrfToken();
?><!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Admin · <?=htmlspecialchars($album['title'])?></title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/admin/assets/admin.css?v=<?=@filemtime(__DIR__.'/assets/admin.css')?>">
</head>
<body
  data-csrf="<?=htmlspecialchars($csrf)?>"
  data-album="<?=(int)$album['id']?>"
  data-slug="<?=htmlspecialchars($album['slug'])?>"
>

  <header class="bar">
    <a class="bar-back" href="/admin/">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M9 12L3 7l6-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Álbumes
    </a>
    <nav>
      <a href="/galeria/<?=htmlspecialchars($album['slug'])?>" target="_blank" rel="noopener">Ver álbum</a>
      <a href="/admin/logout.php">Salir</a>
    </nav>
  </header>

  <main>

    <!-- Title / description / visibility -->
    <div class="editor-header">
      <div style="flex:1;min-width:0">
        <div class="field">
          <label for="title">Título del álbum</label>
          <input type="text" id="title" value="<?=htmlspecialchars($album['title'])?>">
        </div>
        <div class="field">
          <label for="desc">Descripción</label>
          <textarea id="desc" rows="2" placeholder="Descripción opcional"><?=htmlspecialchars($album['description'])?></textarea>
        </div>
      </div>
    </div>

    <div class="save-row">
      <button id="save" class="btn-primary">Guardar</button>
      <span id="save-feedback">Guardado</span>
      <span style="flex:1"></span>
      <div class="editor-toggle-row">
        <span class="editor-toggle-label" id="enabled-label"><?=$album['enabled']?'Visible':'Oculto'?></span>
        <label class="toggle-switch" title="Cambiar visibilidad">
          <input type="checkbox" id="enabled" <?=$album['enabled']?'checked':''?>>
          <span class="toggle-track"></span>
          <span class="toggle-thumb"></span>
          <span class="sr-only">Visible</span>
        </label>
      </div>
    </div>

    <!-- Upload -->
    <div class="upload-section">
      <div class="upload-row">
        <label class="btn-file" for="files">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v8M3 5l4-4 4 4M1 11h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Subir fotos
        </label>
        <input id="files" type="file" accept="image/*" multiple hidden>
        <span id="upinfo"></span>
      </div>
      <div class="progress"><i id="bar"></i></div>
    </div>

    <!-- Photo grid -->
    <div class="photos-section">
      <p class="section-label"><?=count($photos)?> <?=count($photos)===1?'foto':'fotos'?> · arrastra para reordenar</p>

      <?php if (empty($photos)): ?>
        <div class="empty-state" id="empty-state">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="4" y="10" width="32" height="24" rx="4" stroke="currentColor" stroke-width="2"/>
            <circle cx="14" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M4 28l8-6 6 5 6-4 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Aun no hay fotos. Usa "Subir fotos" para empezar.</p>
        </div>
      <?php else: ?>
        <div style="display:none" class="empty-state" id="empty-state">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="4" y="10" width="32" height="24" rx="4" stroke="currentColor" stroke-width="2"/>
            <circle cx="14" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M4 28l8-6 6 5 6-4 8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Aun no hay fotos. Usa "Subir fotos" para empezar.</p>
        </div>
      <?php endif; ?>

      <div class="grid" id="grid">
        <?php foreach ($photos as $p): ?>
          <figure data-id="<?=(int)$p['id']?>">
            <img loading="lazy" src="/galeria/media/<?=htmlspecialchars($album['slug'])?>/thumb/<?=htmlspecialchars($p['filename'])?>.jpg" alt="">
            <button class="del" title="Borrar">&#215;</button>
          </figure>
        <?php endforeach; ?>
      </div>
    </div>

  </main>

  <script src="/admin/assets/sortable.min.js"></script>
  <script src="/admin/assets/admin.js?v=<?=@filemtime(__DIR__.'/assets/admin.js')?>"></script>

  <script>
    // Update enabled label on toggle change
    document.getElementById('enabled').addEventListener('change', function() {
      document.getElementById('enabled-label').textContent = this.checked ? 'Visible' : 'Oculto'
    })
  </script>
</body>
</html>
