<?php
// Rutas absolutas del proyecto en el servidor. PRIVATE_DIR = dir de este archivo / ..
define('PRIVATE_DIR', dirname(__DIR__));
define('DOMAIN_DIR', dirname(dirname(PRIVATE_DIR)));         // ~/domains/<dominio>
define('GALERIA_DIR', DOMAIN_DIR . '/public_html/galeria');
define('MEDIA_DIR', GALERIA_DIR . '/media');
define('MANIFEST_PATH', GALERIA_DIR . '/manifest.json');
define('DB_PATH', PRIVATE_DIR . '/gallery.db');
