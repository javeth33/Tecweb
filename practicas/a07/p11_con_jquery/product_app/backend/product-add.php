<?php
    // b. Usar el namespace y la inclusión
    use TECWEB\MYAPI\Products as Products;
    require_once __DIR__ . '/myapi/Products.php';

    // c. Crear una instancia de la clase Products
    $prodObj = new Products('marketzone', 'root', '');

    // d. Usar el método correcto
    $producto = file_get_contents('php://input');
    $prodObj->add($producto);

    // e. Usar getData() para devolver el JSON
    echo $prodObj->getData();
?>