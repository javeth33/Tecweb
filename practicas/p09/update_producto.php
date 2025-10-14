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
        .links-section a { display: block; margin-top: 5px; color: #007bff; text-decoration: none; }
        .links-section a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>$titulo</h1>
        $mensaje
        
        <div class="links-section">
            <p><a href="formulario_productos_v2.php">Volver al formulario de registro/edición</a></p>
            
            <p><a href="get_productos_vigentes_v2.php">Ver Listado de Productos Vigentes (Todos)</a></p>
            <p><a href="get_productos_xhtml_v2.php?tope=5">Ver Listado de Productos con Unidades Bajas (Tope=5)</a></p>
            </div>
    </div>
</body>
</html>
XHTML;
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    mostrarRespuesta("Error de Solicitud", '<p class="error">Método de solicitud no permitido. Use el formulario.</p>');
}

if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    mostrarRespuesta("Error de Datos", '<p class="error">❌ No se recibió un ID de producto válido para actualizar.</p>');
}

$id_val   = (int)$_POST['id'];
$nombre   = $_POST['nombre'] ?? '';
$marca    = $_POST['marca'] ?? '';
$modelo   = $_POST['modelo'] ?? '';
$precio   = $_POST['precio'] ?? 0.0;
$detalles = $_POST['detalles'] ?? '';
$unidades = $_POST['unidades'] ?? 0;
$imagen   = $_POST['imagen'] ?? '';

$precio_val   = (float)$precio;
$unidades_val = (int)$unidades;

@$link = new mysqli($db_host, $db_user, $db_pass, $db_name); 	

if ($link->connect_errno) {
    mostrarRespuesta("Error de Conexión a BD", '<p class="error">Falló la conexión: ' . htmlspecialchars($link->connect_error) . '</p>');
}

$sql_update = "UPDATE productos SET
                nombre = '{$nombre}',
                marca = '{$marca}',
                modelo = '{$modelo}',
                precio = {$precio_val},
                detalles = '{$detalles}',
                unidades = {$unidades_val},
                imagen = '{$imagen}'
               WHERE id = {$id_val}";


if ( $link->query($sql_update) ) {
    
    if ($link->affected_rows > 0) {
        $resumen = '
            <p class="success">✅ ¡Producto actualizado con éxito!</p>
            <h2>Datos Actualizados (ID: ' . $id_val . ')</h2>
            <ul>
                <li><strong>Nombre:</strong> ' . htmlspecialchars($nombre) . '</li>
                <li><strong>Marca:</strong> ' . htmlspecialchars($marca) . '</li>
                <li><strong>Modelo:</strong> ' . htmlspecialchars($modelo) . '</li>
                <li><strong>Precio:</strong> $' . number_format($precio_val, 2) . '</li>
            </ul>
        ';
        mostrarRespuesta("Actualización Exitosa", $resumen);
    } else {
        mostrarRespuesta("Sin Cambios", '<p class="error">⚠️ No se realizó ninguna modificación. El registro ya tenía los mismos datos.</p>');
    }
}
else
{
    $error_msg = 'Error de SQL al intentar actualizar: ' . $link->error;
    mostrarRespuesta("Error de Actualización", '<p class="error">❌ El Producto no pudo ser actualizado. **ERROR COMETIDO**: ' . htmlspecialchars($error_msg) . '</p>');
}

$link->close();
?>