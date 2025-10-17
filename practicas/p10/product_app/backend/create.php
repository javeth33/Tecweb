<?php
    include_once __DIR__.'/database.php';

    // SE OBTIENE LA INFORMACIÓN DEL PRODUCTO ENVIADA POR EL CLIENTE
    $producto = file_get_contents('php://input');
    if(!empty($producto)) {
        // SE TRANSFORMA EL STRING DEL JSON A ARRAY ASOCIATIVO
        $jsonOBJ = json_decode($producto, true);

        // Validar datos requeridos
        if (
            !isset($jsonOBJ['nombre'], $jsonOBJ['marca'], $jsonOBJ['modelo'], $jsonOBJ['precio'], $jsonOBJ['unidades'])
        ) {
            echo "Error: Faltan datos obligatorios.";
            exit;
        }

        // Escapar datos para evitar inyección SQL
        $nombre = $conexion->real_escape_string($jsonOBJ['nombre']);
        $marca = $conexion->real_escape_string($jsonOBJ['marca']);
        $modelo = $conexion->real_escape_string($jsonOBJ['modelo']);
        $precio = floatval($jsonOBJ['precio']);
        $unidades = intval($jsonOBJ['unidades']);
        $detalles = isset($jsonOBJ['detalles']) ? $conexion->real_escape_string($jsonOBJ['detalles']) : '';
        $imagen = isset($jsonOBJ['imagen']) ? $conexion->real_escape_string($jsonOBJ['imagen']) : 'img/default.png';

        // Validar si ya existe el producto (no eliminado)
        $sql_check = "SELECT id FROM productos 
            WHERE eliminado=0 AND (
                (nombre='$nombre' AND marca='$marca') OR
                (marca='$marca' AND modelo='$modelo')
            )";
        $result = $conexion->query($sql_check);

        if ($result && $result->num_rows > 0) {
            echo "Error: El producto ya existe.";
            $result->free();
            $conexion->close();
            exit;
        }

        // Insertar producto
        $sql_insert = "INSERT INTO productos (nombre, marca, modelo, precio, detalles, unidades, imagen, eliminado)
            VALUES ('$nombre', '$marca', '$modelo', $precio, '$detalles', $unidades, '$imagen', 0)";

        if ($conexion->query($sql_insert)) {
            echo "Producto agregado correctamente.";
        } else {
            echo "Error al agregar producto: " . $conexion->error;
        }
        $conexion->close();
    } else {
        echo "Error: No se recibió información del producto.";
    }
?>