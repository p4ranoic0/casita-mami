<?php
$L = dirname(dirname(__DIR__)) . '/private/lib';   // public/api -> ../../private/lib  (en repo)
// En el servidor, private/ es hermano de public_html/. Resolvemos por ruta conocida:
$libCandidates = [
  $_SERVER['DOCUMENT_ROOT'] . '/../../private/lib',   // public_html/api -> domains/<d>/private/lib
];
foreach ($libCandidates as $c) { if (is_dir($c)) { $L = $c; break; } }
require_once "$L/db.php"; require_once "$L/auth.php"; require_once "$L/csrf.php";
require_once "$L/images.php"; require_once "$L/manifest.php";
header('Content-Type: application/json; charset=utf-8');
