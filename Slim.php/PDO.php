<?php
$db = require __DIR__ . '/config/DB.php';

$dsn = "mysql:host=" . $db['host'] . ";dbname=" . $db['name'];

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

return new PDO($dsn, $db['user'], $db['pass'], $options);
