<?php
// Copiar a private/config.php en el servidor y rellenar ADMIN_HASH con:
//   php -r 'echo password_hash(trim(fgets(STDIN)),PASSWORD_DEFAULT).PHP_EOL;' <<< 'TU_PASSWORD'
define('ADMIN_USER', 'admin');
define('ADMIN_HASH', '');                 // <-- hash bcrypt aquí
define('SESSION_NAME', 'casita_admin');
define('LOGIN_MAX_TRIES', 8);             // por ventana
define('LOGIN_WINDOW', 900);             // 15 min
