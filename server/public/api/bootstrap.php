<?php
// lib relativo a ESTE archivo: api/ -> (public_html|public) -> <dominio|server> -> private/lib
// Funciona igual en el repo (server/public/api) y en el servidor (public_html/api).
$L = dirname(dirname(__DIR__)) . '/private/lib';
require_once "$L/db.php"; require_once "$L/auth.php"; require_once "$L/csrf.php";
require_once "$L/images.php"; require_once "$L/manifest.php";
header('Content-Type: application/json; charset=utf-8');
