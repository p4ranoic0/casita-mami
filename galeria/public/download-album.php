<?php
// Descarga de un álbum completo como ZIP de sus originales.
// Público y solo lectura. Valida el slug contra el manifest (defensa en profundidad).

$slug = $_GET['album'] ?? '';
if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
  http_response_code(400);
  exit('Solicitud inválida');
}

$manifestPath = __DIR__ . '/manifest.json';
$manifest = json_decode(@file_get_contents($manifestPath), true);
$slugs = array_column($manifest['albums'] ?? [], 'slug');
if (!in_array($slug, $slugs, true)) {
  http_response_code(404);
  exit('Álbum no encontrado');
}

$origDir = __DIR__ . '/media/' . $slug . '/orig';
if (!is_dir($origDir)) {
  http_response_code(404);
  exit('Álbum no encontrado');
}

$files = glob($origDir . '/*.{jpg,jpeg,png,JPG,JPEG,PNG}', GLOB_BRACE);
if (!$files) {
  http_response_code(404);
  exit('Este álbum aún no tiene fotos');
}

$tmp = tempnam(sys_get_temp_dir(), 'galzip');
$zip = new ZipArchive();
if ($zip->open($tmp, ZipArchive::OVERWRITE) !== true) {
  http_response_code(500);
  exit('No se pudo crear el ZIP');
}
foreach ($files as $f) {
  $zip->addFile($f, basename($f));
}
$zip->close();

header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $slug . '.zip"');
header('Content-Length: ' . filesize($tmp));
header('Cache-Control: no-store');
readfile($tmp);
unlink($tmp);
