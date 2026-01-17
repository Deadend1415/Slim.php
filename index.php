<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php'; // loads all Composer packages

$app = AppFactory::create();
//favico 
$app->get('/favicon.ico', function ($request, $response, $args) {
    return $response->withStatus(204); // 204 = No Content
});

//Render html
$app->get('/home', function ($request, $response) {
    $file = __DIR__ . '/index.html';
    if (!file_exists($file)) {
        $response->getBody()->write('File not found');
        return $response->withStatus(404);
    }

    $response->getBody()->write(file_get_contents($file));
    return $response->withHeader('Content-Type', 'text/html');
});

//ROute serve food JSON
$app->get('/api/food', function (Request $request, Response $response) {
    $file = __DIR__ . '/food.json';

    if (!file_exists($file)) {
        $response->getBody()->write(json_encode(['error' => 'File not found']));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    }

    $json = file_get_contents($file);
    $response->getBody()->write($json);
    return $response->withHeader('Content-Type', 'application/json');
});

// A simple GET route
$app->get('/hello/{name}', function (Request $request, Response $response, $args) {
    // Access headers from the request
    $userAgent = $request->getHeaderLine('User-Agent');
    $name = $args['name'];
    $response->getBody()->write("Hello, $name! $userAgent \nWelcome to Slim.");
    return $response;
});
$app->get('/products', function (Request $request, Response $response) {
    $products = [
        ['id' => 101, 'name' => 'Laptop', 'price' => 1200],
        ['id' => 102, 'name' => 'Phone', 'price' => 700],
        ['id' => 103, 'name' => 'Tablet', 'price' => 900],
    ];

    $queryParams = $request->getQueryParams();
    if (isset($queryParams['minPrice']))
        $min_price = (float) $queryParams['minPrice'];
    else
        $min_price = 0;

    $filtered_products = array_filter($products, fn($p) => $p["price"] >= $min_price);
    $payload = json_encode(array_values($filtered_products), JSON_PRETTY_PRINT); // convert PHP array to JSON
    $response->getBody()->write("Min price : $min_price \n$payload"); // write JSON to response body
    return $response->withHeader('Content-Type', 'application/json'); // set correct header
});



$app->run();
