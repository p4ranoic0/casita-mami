<?php require __DIR__ . '/bootstrap.php'; require __DIR__ . '/layout.php'; requireLoginRedirect();
$pdo = db();
$id = (int)($_GET['id'] ?? 0);
$stmt = $pdo->prepare('SELECT * FROM albums WHERE id=?');
$stmt->execute([$id]);
$album = $stmt->fetch();
if (!$album) { header('Location: /admin/'); exit; }

$ph = $pdo->prepare('SELECT * FROM photos WHERE album_id=? ORDER BY position, id');
$ph->execute([$id]);
$photos = $ph->fetchAll();
$albums = adminAlbums($pdo);
$cover = (int)$album['cover_photo_id'] ?: (int)($photos[0]['id'] ?? 0);
$n = count($photos);
adminHead($album['title']);
?>
<body data-csrf="<?=h(csrfToken())?>" data-album="<?=(int)$album['id']?>" data-slug="<?=h($album['slug'])?>" data-cover="<?=$cover?>">
<div class="ad">
  <?php adminBar($album); ?>
  <div class="ad-shell">
    <?php adminSide($albums, (int)$album['id']); ?>

    <main class="ad-main" id="ad-main">
      <div class="ad-head">
        <div>
          <input class="ad-title" id="title" value="<?=h($album['title'])?>" maxlength="120" aria-label="Título del álbum">
          <textarea class="ad-desc" id="desc" rows="2" placeholder="Escribe una descripción corta (opcional)" aria-label="Descripción"><?=h($album['description'])?></textarea>
          <div class="ad-saved" id="saved" aria-live="polite"></div>
        </div>
        <button class="ad-vis" id="vis" type="button" aria-pressed="<?=$album['enabled'] ? 'true' : 'false'?>">
          <span class="ad-sw<?=$album['enabled'] ? ' on' : ''?>"></span><span class="t"><?=$album['enabled'] ? 'Visible en la web' : 'Oculto'?></span>
        </button>
      </div>

      <div class="ad-drop<?=$n ? '' : ' big'?>" id="drop">
        <div>
          <h3 id="drop-h"><?=$n ? 'Agregar más fotos' : 'Arrastra aquí las fotos del evento'?></h3>
          <p>JPG o PNG · puedes subir 200 de una vez · se optimizan antes de subir</p>
        </div>
        <div class="acts">
          <button class="ad-btn" id="pick" type="button">Elegir fotos</button>
        </div>
        <input id="files" type="file" accept="image/jpeg,image/png,.heic,.heif" multiple hidden>
      </div>

      <div class="ad-q" id="queue" hidden>
        <div><strong id="q-h"></strong><small id="q-s"></small></div>
        <div class="acts">
          <button class="ad-btn sec" id="q-retry" type="button" hidden>Reintentar fallidas</button>
          <button class="ad-btn sec" id="q-pause" type="button">Pausar</button>
          <button class="ad-btn sec" id="q-cancel" type="button">Cancelar</button>
          <button class="ad-btn sec" id="q-discard" type="button" hidden>Descartar fallidas</button>
        </div>
        <div class="bar"><i id="q-ok"></i><i class="e" id="q-err"></i></div>
      </div>

      <div class="ad-sel" id="selbar" hidden>
        <strong id="sel-n"></strong>
        <button class="ad-btn" id="sel-cover" type="button">Usar de portada</button>
        <button class="ad-btn" id="sel-all" type="button">Seleccionar todas</button>
        <button class="ad-btn bad" id="sel-del" type="button">Borrar</button>
        <button class="ad-btn" id="sel-cancel" type="button">Cancelar</button>
      </div>
      <div class="ad-tools" id="tools"<?=$n ? '' : ' hidden'?>>
        <span class="lbl" id="count"><?=$n?> <?=$n === 1 ? 'foto' : 'fotos'?> · arrastra para cambiar el orden</span>
        <button class="ad-btn ghost" id="reverse" type="button">Invertir orden</button>
        <button class="ad-btn ghost" id="select" type="button">Seleccionar</button>
      </div>

      <div class="ad-grid" id="grid">
        <?php foreach ($photos as $p): ?>
          <div class="ad-t" data-id="<?=(int)$p['id']?>">
            <img src="/galeria/media/<?=h($album['slug'])?>/thumb/<?=h($p['filename'])?>.jpg" alt="" loading="lazy">
          </div>
        <?php endforeach; ?>
      </div>
      <p class="ad-note" id="heic-note" hidden><b>Fotos HEIC de iPhone:</b> este formato no se puede publicar. Pídele a quien tomó las fotos que las comparta como JPG, o en el iPhone activa Ajustes › Cámara › Formatos › <b>Más compatible</b>.</p>
    </main>
  </div>
  <div class="ad-toast" id="toast" hidden><span></span><button type="button">Deshacer</button></div>
</div>
<script src="/admin/assets/sortable.min.js"></script>
<script src="/admin/assets/admin.js?v=<?=@filemtime(__DIR__.'/assets/admin.js')?>"></script>
</body>
</html>
