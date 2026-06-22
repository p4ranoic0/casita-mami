<?php
// lib relativo a ESTE archivo (admin/ -> public_html -> <dominio> -> private/lib)
$L = dirname(dirname(__DIR__)) . '/private/lib';
require_once "$L/db.php"; require_once "$L/auth.php"; require_once "$L/csrf.php"; require_once "$L/manifest.php";
