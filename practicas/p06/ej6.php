<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ej6</title>
</head>
<body>

<?php
    include 'src/funciones.php';

    $parqueVehicular = parqueVehicular();

    if (isset($_GET['consulta'])) {
        if ($_GET['consulta'] === 'todos') {
            echo "<h2>Información de Todos los Autos Registrados:</h2>";
            echo "<pre>";
            print_r($parqueVehicular);
            echo "</pre>";
        } elseif (isset($_GET['matricula']) && !empty($_GET['matricula'])) {
            $matricula = strtoupper($_GET['matricula']);
            
            if (array_key_exists($matricula, $parqueVehicular)) {
                echo "<h2>Información del Auto con Matrícula: {$matricula}</h2>";
                echo "<pre>";
                print_r($parqueVehicular[$matricula]);
                echo "</pre>";
            } else {
                echo "<h2>La matrícula {$matricula} no se encontró en el registro.</h2>";
            }
        }
    } else {
?>

    <h2>Ejercicio 6: Consulta de Parque Vehicular</h2>
    <p>Utiliza el formulario para consultar la información.</p>

    <form action="ej6.php" method="get">
        <label for="matricula">Consultar por Matrícula:</label>
        <input type="text" id="matricula" name="matricula" placeholder="Ej. UBN6338" required>
        <input type="hidden" name="consulta" value="matricula">
        <input type="submit" value="Consultar">
    </form>
    <br>

    <a href="ej6.php?consulta=todos">Ver todos los autos registrados</a>

<?php
    }
?>

</body>
</html>