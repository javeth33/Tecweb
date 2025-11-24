<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require 'vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath("/Tecweb/pruebaslim_v4"); 

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("¡Hola, Mundo desde Slim Framework 4!");
    return $response;
});

$app->get("/hola/{nombre}", function (Request $request, Response $response, $args) {
    $response->getBody()->write("¡Hola, " . $args['nombre']);
    return $response;
});

$app->post("/pruebapost", function (Request $request, Response $response, $args) {
    $reqPost = $request->getParsedBody();
    $val1 = $reqPost['valor1'];
    $val2 = $reqPost['valor2'];

    $response->getBody()->write("valores: " . $val1 . " " . $val2);
    return $response;
});

$app->get('/testjson', function (Request $request, Response $response, $args) {
    $data[0]["nombre"] = "Javeth";
    $data[0]["apellidos"] = "Rojas Balazar";
    $data[1]["nombre"] = "Arantza";
    $data[1]["apellidos"] = "Tenorio Dominguez";
    
    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
?>