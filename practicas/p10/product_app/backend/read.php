<?php
    include_once __DIR__.'/database.php';

    // SE CREA EL ARREGLO QUE SE VA A DEVOLVER EN FORMA DE JSON
    $data = array();
    // SE VERIFICA HABER RECIBIDO EL ID
    if( isset($_POST['id']) ) {
        $search = $conexion->real_escape_string($_POST['id']);
        // Busca coincidencias en nombre, marca o detalles usando LIKE
        $sql = "SELECT * FROM productos 
                WHERE nombre LIKE '%{$search}%' 
                   OR marca LIKE '%{$search}%' 
                   OR detalles LIKE '%{$search}%'";
        if ($result = $conexion->query($sql)) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $data[] = $row;
            }
            $result->free();
        } else {
            die('Query Error: '.mysqli_error($conexion));
        }
        $conexion->close();
    } 
    
    // SE HACE LA CONVERSIÓN DE ARRAY A JSON
    echo json_encode($data, JSON_PRETTY_PRINT);
?>