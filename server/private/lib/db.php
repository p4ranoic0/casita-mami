<?php
require_once __DIR__ . '/paths.php';

function db(): PDO {
  static $pdo = null;
  if ($pdo === null) {
    $pdo = new PDO('sqlite:' . DB_PATH);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->exec('PRAGMA foreign_keys = ON');
    // el admin sube 3 fotos a la vez: espera el lock en vez de fallar con "database is locked"
    $pdo->exec('PRAGMA busy_timeout = 8000');
  }
  return $pdo;
}

function dbInit(): void {
  db()->exec(file_get_contents(PRIVATE_DIR . '/schema.sql'));
}
