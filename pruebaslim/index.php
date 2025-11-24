<?php
require 'vendor/autoload.php';

$app = new Slim\App();

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

$app->run();
?>