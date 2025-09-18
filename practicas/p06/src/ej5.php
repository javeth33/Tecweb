<?php
    header("Content-Type: application/xhtml+xml; charset=utf-8");
    echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" lang="es">
<head>
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
    <title>Respuesta del Ejercicio 5</title>
</head>
<body>
    <?php
        if (isset($_POST['edad']) && isset($_POST['sexo'])) {
            $edad = $_POST['edad'];
            $sexo = $_POST['sexo'];

            if ($sexo === "femenino" && $edad >= 18 && $edad <= 35) {
                echo '<h1>Bienvenida, usted está en el rango de edad permitido.</h1>';
            } else {
                echo '<h1>Lo sentimos, usted no cumple con los requisitos.</h1>';
            }
        } else {
            echo '<h1>Error: No se recibieron los datos del formulario.</h1>';
            echo '<p>Por favor, regrese y utilice el formulario para ingresar sus datos.</p>';
        }
    ?>
</body>
</html>