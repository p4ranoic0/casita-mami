<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache');

$indexPath = __DIR__ . '/index.html';
if (!is_file($indexPath)) {
    http_response_code(500);
    exit('No se encontró la portada de la galería.');
}

$html = file_get_contents($indexPath);
$slug = $_GET['slug'] ?? '';
$album = null;

if (is_string($slug) && preg_match('/^[a-z0-9-]+$/D', $slug)) {
    $manifestPath = __DIR__ . '/manifest.json';
    $manifest = is_file($manifestPath) ? json_decode((string) file_get_contents($manifestPath), true) : null;
    $albums = is_array($manifest['albums'] ?? null) ? $manifest['albums'] : [];
    foreach ($albums as $candidate) {
        if (is_array($candidate) && ($candidate['slug'] ?? null) === $slug) {
            $album = $candidate;
            break;
        }
    }
}

function escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

if ($album === null) {
    http_response_code(404);
    $html = preg_replace_callback('/<meta\b[^>]*\bname="robots"[^>]*>/i', static function (array $match): string {
        return preg_replace('/\bcontent="[^"]*"/i', 'content="noindex"', $match[0], 1);
    }, $html, 1);
    echo $html;
    exit;
}

$origin = 'https://lacasitademami.edu.pe';
$title = (string) ($album['title'] ?? $slug);
$description = trim((string) ($album['description'] ?? ''));
$description = ($description !== '' ? $description . ' ' : '') . 'Fotos de ' . $title . ' en La Casita de Mami, nido en Surco.';
$pageTitle = $title . ' · Galería · La Casita de Mami';
$canonical = $origin . '/galeria/' . $slug;
$image = $origin . '/og-image.jpg';
$cover = $album['cover'] ?? '';
if (is_string($cover) && preg_match('#^media/[a-zA-Z0-9/_-]+\.(?:jpe?g|png|webp|avif)$#iD', $cover)
    && !str_contains($cover, '..') && is_file(__DIR__ . '/' . $cover)) {
    $image = $origin . '/galeria/' . $cover;
}

$meta = [
    'name' => [
        'description' => $description,
        'robots' => 'index, follow',
        'twitter:card' => 'summary_large_image',
        'twitter:title' => $pageTitle,
        'twitter:description' => $description,
        'twitter:image' => $image,
    ],
    'property' => [
        'og:type' => 'website',
        'og:title' => $pageTitle,
        'og:description' => $description,
        'og:url' => $canonical,
        'og:image' => $image,
    ],
];

$html = preg_replace_callback('/<title>.*?<\/title>/is', static fn (array $match): string => '<title>' . escape($pageTitle) . '</title>', $html, 1);
$html = preg_replace_callback('/<link\b[^>]*\brel="canonical"[^>]*>/i', static function (array $match) use ($canonical): string {
    return preg_replace_callback('/\bhref="[^"]*"/i', static fn (array $attribute): string => 'href="' . escape($canonical) . '"', $match[0], 1);
}, $html, 1);
$html = preg_replace_callback('/<meta\b[^>]*>/i', static function (array $match) use ($meta): string {
    $tag = $match[0];
    if (!preg_match('/\b(name|property)="([^"]+)"/i', $tag, $attribute)) return $tag;
    $value = $meta[strtolower($attribute[1])][$attribute[2]] ?? null;
    if ($value === null) return $tag;
    return preg_replace_callback('/\bcontent="[^"]*"/i', static fn (array $content): string => 'content="' . escape($value) . '"', $tag, 1);
}, $html);

$images = [];
foreach (array_slice(is_array($album['photos'] ?? null) ? $album['photos'] : [], 0, 10) as $photo) {
    $web = is_array($photo) ? ($photo['web'] ?? '') : '';
    if (is_string($web) && preg_match('#^media/[a-zA-Z0-9/_-]+\.(?:jpe?g|png|webp|avif)$#iD', $web)
        && !str_contains($web, '..')) {
        $images[] = $origin . '/galeria/' . implode('/', array_map('rawurlencode', explode('/', $web)));
    }
}
$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Inicio', 'item' => $origin . '/'],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Galería', 'item' => $origin . '/galeria/'],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $canonical],
            ],
        ],
        [
            '@type' => 'ImageGallery',
            'name' => $title,
            'description' => (string) ($album['description'] ?? ''),
            'url' => $canonical,
            'image' => $images,
        ],
    ],
];
$json = json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
if ($json !== false) {
    $json = str_replace('</', '<\\/', $json);
    $html = preg_replace_callback('/<\/head>/i', static fn (array $match): string =>
        '<script type="application/ld+json">' . $json . '</script>' . $match[0], $html, 1);
}

echo $html;
