<?php
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'marketzone';

function mostrarRespuesta($titulo, $mensaje) {
    echo <<<XHTML
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es" xml:lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>$titulo</title>
    <style type="text/css">
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h1 { color: #333; }
        .success { color: #28a745; border: 1px solid #28a745; padding: 10px; background-color: #d4edda; border-radius: 4px; }
        .error { color: #dc3545; border: 1px solid #dc3545; padding: 10px; background-color: #f8d7da; border-radius: 4px; }
        ul { list-style-type: none; padding: 0; }
        ul li { margin-bottom: 5px; padding: 2px 0; border-bottom: 1px dotted #ccc; }
    </style>
</head>
<body>
    <div class="container">
        <h1>$titulo</h1>
        $mensaje
        <p><a href="formulario_productos.html">Volver al formulario</a></p>
    </div>
</body>
</html>
XHTML;
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    mostrarRespuesta("Error de Solicitud", '<p class="error">Método de solicitud no permitido. Use el formulario.</p>');
}

$nombre   = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$marca    = isset($_POST['marca']) ? trim($_POST['marca']) : '';
$modelo   = isset($_POST['modelo']) ? trim($_POST['modelo']) : '';
$precio   = isset($_POST['precio']) ? $_POST['precio'] : null;
$detalles = isset($_POST['detalles']) ? trim($_POST['detalles']) : '';
$unidades = isset($_POST['unidades']) ? $_POST['unidades'] : null;
$imagen   = isset($_POST['imagen']) ? trim($_POST['imagen']) : '';

@$link = new mysqli($db_host, $db_user, $db_pass, $db_name); 	

if ($link->connect_errno) {
    mostrarRespuesta("Error de Conexión a BD", '<p class="error">Falló la conexión: ' . htmlspecialchars($link->connect_error) . '</p>');
}

$nombre_esc   = $link->real_escape_string($nombre);
$marca_esc    = $link->real_escape_string($marca);
$modelo_esc   = $link->real_escape_string($modelo);
$detalles_esc = $link->real_escape_string($detalles);
$imagen_esc   = $link->real_escape_string($imagen);

$precio_val   = (float)$precio;
$unidades_val = (int)$unidades;

if (empty($nombre_esc) || empty($marca_esc) || empty($modelo_esc)) {
    $link->close();
    mostrarRespuesta("Error de Validación", '<p class="error">❌ Los campos **Nombre**, **Marca** y **Modelo** son clave y no pueden estar vacíos para la validación de unicidad.</p>');
}

$sql_check = "SELECT id FROM productos 
              WHERE nombre = '{$nombre_esc}' 
              AND marca = '{$marca_esc}' 
              AND modelo = '{$modelo_esc}' 
              LIMIT 1";

$resultado = $link->query($sql_check);

if ($resultado === FALSE) {
    $error_msg = 'Error al verificar la existencia del producto: ' . $link->error;
    $link->close();
    mostrarRespuesta("Error de BD", '<p class="error">' . htmlspecialchars($error_msg) . '</p>');
}


if ($resultado->num_rows > 0) {
    $link->close();
    mostrarRespuesta("Producto Duplicado", '<p class="error">❌ El producto con Nombre: **' . htmlspecialchars($nombre) . '**, Marca: **' . htmlspecialchars($marca) . '**, y Modelo: **' . htmlspecialchars($modelo) . '** ya está registrado.</p>');
}

// QUERY DE INSERCIÓN ANTERIOR (sin nombres de columna y incluyendo 'eliminado' = 0):
/*
$sql_insert = "INSERT INTO productos 
                (`nombre`, `marca`, `modelo`, `precio`, `detalles`, `unidades`, `imagen`, `eliminado`) 
               VALUES 
                ('{$nombre_esc}', '{$marca_esc}', '{$modelo_esc}', {$precio_val}, '{$detalles_esc}', {$unidades_val}, '{$imagen_esc}', 0)";
*/

// NUEVA QUERY DE INSERCIÓN (Usando nombres de columna, omitiendo 'id' y 'eliminado' para usar sus defaults)
$sql_insert = "INSERT INTO productos 
                (`nombre`, `marca`, `modelo`, `precio`, `detalles`, `unidades`, `imagen`) 
               VALUES 
                ('{$nombre_esc}', '{$marca_esc}', '{$modelo_esc}', {$precio_val}, '{$detalles_esc}', {$unidades_val}, '{$imagen_esc}')";


if ( $link->query($sql_insert) ) {
    $nuevo_id = $link->insert_id;
    
    $resumen = '
        <p class="success">✅ ¡Producto insertado con éxito!</p>
        <h2>Datos Registrados</h2>
        <ul>
            <li><strong>ID:</strong> ' . $nuevo_id . '</li>
            <li><strong>Nombre:</strong> ' . htmlspecialchars($nombre) . '</li>
            <li><strong>Marca:</strong> ' . htmlspecialchars($marca) . '</li>
            <li><strong>Modelo:</strong> ' . htmlspecialchars($modelo) . '</li>
            <li><strong>Precio:</strong> $' . number_format($precio_val, 2) . '</li>
            <li><strong>Unidades:</strong> ' . $unidades_val . '</li>
            <li><strong>Detalles:</strong> ' . nl2br(htmlspecialchars($detalles)) . '</li>
            <li><strong>Ruta de Imagen:</strong> ' . htmlspecialchars($imagen) . '</li>
            <li><strong>Eliminado (Estado):</strong> 0 (No)</li>
        </ul>
    ';
    
    $link->close();
    mostrarRespuesta("Registro Exitoso", $resumen);
}
else
{
    $error_msg = 'Error de SQL al intentar insertar: ' . $link->error;
    $link->close();
    mostrarRespuesta("Error de Inserción", '<p class="error">❌ El Producto no pudo ser insertado. **ERROR COMETIDO**: ' . htmlspecialchars($error_msg) . '</p>');
}

?>