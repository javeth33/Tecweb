<?php
    // b. Usar el namespace y la inclusión
    use TECWEB\MYAPI\Products as Products;
    require_once __DIR__ . '/myapi/Products.php';

    // c. Crear una instancia de la clase Products
    $prodObj = new Products('marketzone', 'root', '');

    // d. Usar el método correcto
    if( isset($_GET['id']) ) {
        $id = $_GET['id'];
        $prodObj->delete($id);
    }
    
    // e. Usar getData() para devolver el JSON
    echo $prodObj->getData();
?>