<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache');

$templatePath = __DIR__ . '/index.html';
if (!is_file($templatePath)) {
    http_response_code(500);
    exit('No se encontró la portada de la galería.');
}
$html = (string) file_get_contents($templatePath);
$manifestPath = __DIR__ . '/manifest.json';
$manifest = is_file($manifestPath) ? json_decode((string) file_get_contents($manifestPath), true) : null;
$albums = is_array($manifest['albums'] ?? null) ? $manifest['albums'] : [];
$overview = [];

foreach ($albums as $album) {
    if (!is_array($album)) continue;
    $photos = is_array($album['photos'] ?? null) ? $album['photos'] : [];
    $cover = is_string($album['cover'] ?? null) ? $album['cover'] : '';
    $coverPhoto = null;
    foreach ($photos as $photo) {
        if (is_array($photo) && ($photo['web'] ?? null) === $cover) {
            $coverPhoto = $photo;
            break;
        }
    }
    $overview[] = [
        'slug' => (string) ($album['slug'] ?? ''),
        'title' => (string) ($album['title'] ?? ''),
        'description' => (string) ($album['description'] ?? ''),
        'cover' => $cover,
        'count' => count($photos),
        'photos' => $coverPhoto === null ? [] : [$coverPhoto],
    ];
}

if ($overview !== []) {
    $first = $overview[0];
    $cover = $first['cover'];
    if (preg_match('#^media/[a-zA-Z0-9/_-]+\.(?:jpe?g|png|webp|avif)$#iD', $cover)
        && !str_contains($cover, '..') && is_file(__DIR__ . '/' . $cover)) {
        $webUrl = '/galeria/' . $cover;
        $thumb = $first['photos'][0]['thumb'] ?? '';
        $srcset = '';
        if (is_string($thumb) && is_file(__DIR__ . '/' . $thumb)) {
            $width = (int) ($first['photos'][0]['w'] ?? 0);
            if ($width > 480) {
                $srcset = '/galeria/' . $thumb . ' 480w, ' . $webUrl . ' ' . min($width, 2048) . 'w';
            }
        }
        $tag = '<link rel="preload" as="image" href="' . htmlspecialchars($webUrl, ENT_QUOTES, 'UTF-8') . '"';
        if ($srcset !== '') $tag .= ' imagesrcset="' . htmlspecialchars($srcset, ENT_QUOTES, 'UTF-8') . '" imagesizes="(max-width: 560px) 100vw, (max-width: 900px) 90vw, 65vw"';
        $tag .= ' fetchpriority="high" />';
        $html = preg_replace_callback('/<\/head>/i', static fn (array $match): string => $tag . $match[0], $html, 1);
    }
}

$json = json_encode(['albums' => $overview], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
if ($json !== false) {
    $json = str_replace('</', '<\\/', $json);
    $html = str_replace('<div id="root"></div>', '<script id="gallery-overview" type="application/json">' . $json . '</script><div id="root"></div>', $html);
}

echo $html;
