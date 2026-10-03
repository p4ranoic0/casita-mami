<?php require __DIR__ . '/bootstrap.php'; require __DIR__ . '/layout.php'; requireLoginRedirect();
// Entra directo al primer álbum. Si no hay ninguno, invita a crear uno.
$albums = adminAlbums(db());
if ($albums) { header('Location: /admin/album.php?id=' . (int)$albums[0]['id']); exit; }
adminHead('Álbumes');
?>
<body data-csrf="<?=h(csrfToken())?>">
<div class="ad">
  <?php adminBar(null); ?>
  <div class="ad-shell">
    <?php adminSide([], 0); ?>
    <main class="ad-main">
      <div class="ad-drop big"><div><h3>Todavía no hay álbumes</h3><p>Crea el primero con "+ Nuevo álbum" y arrastra ahí las fotos del evento.</p></div></div>
    </main>
  </div>
</div>
<script src="/admin/assets/admin.js?v=<?=@filemtime(__DIR__.'/assets/admin.js')?>"></script>
</body>
</html>
