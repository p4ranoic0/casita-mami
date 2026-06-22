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
