<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php'; // loads all Composer packages
$pdo = require __DIR__ .'/PDO.php';
$app = AppFactory::create();

//favico 
$app->get('/favicon.ico', function ($request, $response, $args) {
    return $response->withStatus(204); // 204 = No Content
});


//ROute serve food JSON
$app->get('/api', function (Request $request, Response $response) {
    $query = "SELECT `Category`, SUM(`Price`) as Price FROM `reciept` GROUP BY `Category`;";
    global $pdo;
    $stmt = $pdo->query($query);
    $result = $stmt->fetchAll();
    $json = json_encode($result);
    $response->getBody()->write($json);
    return $response->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Content-Type', 'application/json')
                    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
;
});

$app->run();
