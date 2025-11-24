<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require 'vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath("/Tecweb/pruebaslim_v4"); 


$app->get('/', function ($request, $response, $args) {
    $response->write("¡Hola, Mundo desde Slim Framework!");
    return $response;
});

$app->get("/hola/{nombre}", function ($request, $response, $args) {
    $response->write("¡Hola, " . $args['nombre']);
    return $response;
});

$app->post("/pruebapost", function ($request, $response, $args) {
    $reqPost = $request->getParsedBody();
    $val1 = $reqPost['valor1'];
    $val2 = $reqPost['valor2'];

    $response->write("valores: " . $val1 . " " . $val2);
    return $response;
});

$app->get('/testjson', function ($request, $response, $args) {
    $data[0]["nombre"] = "Javeth";
    $data[0]["apellidos"] = "Rojas Balazar";
    $data[1]["nombre"] = "Arantza";
    $data[1]["apellidos"] = "Tenorio Dominguez";
    $response->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response;
});

$app->run();
?>