<?php
    // 1. Usar el autoloader
    require_once __DIR__ . '/vendor/autoload.php';

    // 2. Usar el namespace de la clase Create
    use TECWEB\MYAPI\Create\Create;

    // 3. Crear una instancia de la clase correcta
    $prodObj = new Create('marketzone', 'root', '');

    // 4. Usar el método
    $producto = file_get_contents('php://input');
    $prodObj->add($producto);

    // 5. Obtener respuesta
    echo $prodObj->getData();
?>