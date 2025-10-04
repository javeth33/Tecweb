<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Práctica 3</title>
</head>
<body>
    <h2>Ejercicio 1</h2>
    <p>Determina cuál de las siguientes variables son válidas y explica por qué:</p>
    <p>$_myvar,  $_7var,  myvar,  $myvar,  $var7,  $_element1, $house*5</p>
    <?php
        //AQUI VA MI CÓDIGO PHP
        $_myvar = 'válida';
        $_7var = 'válida';
        //myvar;, No es valida porque no tiene el signo '$'       // Inválida
        $myvar = 'válida';
        $var7 = 'válida';
        $_element1 = 'válida';
        //$house*5;, No es valida porque tiene un caracter especial no valido      // Invalida
        
        echo '<h4>Respuesta:</h4>';   
    
        echo '<ul>';
        echo '<li>$_myvar es válida porque inicia con guión bajo.</li>';
        echo '<li>$_7var es válida porque inicia con guión bajo.</li>';
        echo '<li>myvar es inválida porque no tiene el signo de dolar ($).</li>';
        echo '<li>$myvar es válida porque inicia con una letra.</li>';
        echo '<li>$var7 es válida porque inicia con una letra.</li>';
        echo '<li>$_element1 es válida porque inicia con guión bajo.</li>';
        echo '<li>$house*5 es inválida porque el símbolo * no está permitido.</li>';
        echo '</ul>';
    ?>
    

    <h2>Ejercicio 2</h2>
    <p>Proporcionar los valores de $a, $b, $c como sigue:</p>
    <p> $a = "ManejadorSQL"; <br /> $b = 'MySQL'; <br /> $c = &amp;$a;</p>
    <?php
        $a = "ManejadorSQL";
        $b = 'MySQL';
        $c = &$a; 

        echo '<h3>a. Contenido de las variables</h3>';
        echo "<p>Variable \$a: " . $a . "</p>";
        echo "<p>Variable \$b: " . $b . "</p>";
        echo "<p>Variable \$c: " . $c . "</p>";

        // b. Nuevas asignaciones
        $a = "PHP server";
        $b = &$a; 

        echo '<h3>c. Contenido después de las nuevas asignaciones</h3>';
        echo "<p>Variable \$a: " . $a . "</p>";
        echo "<p>Variable \$b: " . $b . "</p>";
        echo "<p>Variable \$c: " . $c . "</p>";

        echo '<h3>d. Descripción de lo que ocurrió</h3>';
        echo '<p>En el segundo bloque de asignaciones, <b>$a</b> se reasignó a "PHP server". Dado que <b>$c</b> era una referencia a <b>$a</b>, cualquier cambio en <b>$a</b> afecta también a <b>$c</b>, por lo que su valor se actualiza automáticamente. Por otro lado, la variable <b>$b</b> que inicialmente contenía "MySQL", fue reasignada para ser una referencia a <b>$a</b>. Esto hace que ahora también apunte al valor "PHP server".</p>';

        unset($a, $b, $c);
    ?>

    <h2>Ejercicio 3</h2>
    <p>Muestra el contenido de cada variable inmediatamente después de cada asignación, verificando la evolución del tipo de estas variables (imprime todos los componentes de los arreglos):</p>
    <?php
        $a = "PHP5";
        echo "<h3>1. \$a = 'PHP5'</h3>";
        echo "Tipo y contenido de \$a: ";
        var_dump($a);

        $z[] = &$a;
        echo "<h3>2. \$z[] = &amp;\$a</h3>";
        echo "Tipo y contenido de \$a: ";
        var_dump($a);
        echo "Contenido de \$z: ";
        print_r($z);

        $b = "5a version de PHP";
        echo "<h3>3. \$b = '5a version de PHP'</h3>";
        echo "Tipo y contenido de \$b: ";
        var_dump($b);

        $c = $b * 10;
        echo "<h3>4. \$c = \$b * 10</h3>";
        echo "Tipo y contenido de \$c: ";
        var_dump($c);

        $a .= $b;
        echo "<h3>5. \$a .= \$b</h3>";
        echo "Tipo y contenido de \$a: ";
        var_dump($a);
        echo "Contenido de \$z : ";
        print_r($z);

        $b *= $c;
        echo "<h3>6. \$b *= \$c</h3>";
        echo "Tipo y contenido de \$b: ";
        var_dump($b);

        $z[0] = "MySQL";
        echo "<h3>7. \$z[0] = 'MySQL'</h3>";
        echo "Tipo y contenido de \$a: ";
        var_dump($a);
        echo "Contenido de \$z: ";
        print_r($z);

    ?>

    
    <h2>Ejercicio 4</h2>
    <p>Lee y muestra los valores de las variables del ejercicio anterior, pero ahora con la ayuda de la matriz GLOBALS o del modificador global de PHP.</p>
    <?php
        echo "<h3>Mostrando valores con \$GLOBALS</h3>";
        echo "<p>Valor de \$a: " . $GLOBALS['a'] . "</p>";
        echo "<p>Valor de \$b: " . $GLOBALS['b'] . "</p>";
        echo "<p>Valor de \$c: " . $GLOBALS['c'] . "</p>";
        echo "<p>Valor de \$z: ";
        print_r($GLOBALS['z']);
        echo "</p>";

        unset($a, $b, $c, $z);
    ?>


    <h2>Ejercicio 5</h2>
    <p>Dar el valor de las variables $a, $b, $c al final del siguiente script:</p>
    <p> $a = "7 personas"; <br /> $b = (integer) $a; <br /> $a = "9E3"; <br /> $c = (double) $a;</p>
    <?php
        $a = "7 personas";
        $b = (integer) $a; 
        $a = "9E3";
        $c = (double) $a; 

        echo '<h3>Valores finales de las variables</h3>';
        echo '<p>Valor final de $a: ';
        var_dump($a);
        echo '</p>';

        echo '<p>Valor final de $b: ';
        var_dump($b);
        echo '</p>';
        
        echo '<p>Valor final de $c: ';
        var_dump($c);
        echo '</p>';

        unset($a, $b, $c);
    ?>


    <h2>Ejercicio 6</h2>
    <p>Dar y comprobar el valor booleano de las variables $a, $b, $c, $d, $e y $f y muestralas usando la función var_dump(datos). Después investiga una función de PHP que permita transformar el valor booleano de $c y $e en uno que se pueda mostrar con un echo:</p>
    <?php
        $a = "0";
        $b = "TRUE";
        $c = FALSE;
        $d = ($a OR $b);
        $e = ($a AND $c);
        $f = ($a XOR $b);

        echo "<h3>Valores booleanos (var_dump)</h3>";
        echo "<p>var_dump(\$a): ";
        var_dump((bool)$a);
        echo "</p>";

        echo "<p>var_dump(\$b): ";
        var_dump((bool)$b);
        echo "</p>";

        echo "<p>var_dump(\$c): ";
        var_dump((bool)$c);
        echo "</p>";

        echo "<p>var_dump(\$d): ";
        var_dump((bool)$d);
        echo "</p>";

        echo "<p>var_dump(\$e): ";
        var_dump((bool)$e);
        echo "</p>";

        echo "<p>var_dump(\$f): ";
        var_dump((bool)$f);
        echo "</p>";

        echo "<h3>Valores convertidos para mostrar (echo)</h3>";
        echo "<p><b>\$c: </b>" . ($c ? 'true' : 'false') . "</p>";
        echo "<p><b>\$e: </b>" . ($e ? 'true' : 'false') . "</p>";

        unset($a, $b, $c, $d, $e, $f);
    ?>

    <h2>Ejercicio 7</h2>
    <p>Usando la variable predefinida $_SERVER, determina lo siguiente:</p>
    <?php
        echo "<ul>"; // Añadí un <ul> para que la lista sea semánticamente correcta
        echo "<li><b>a. Versión de Apache y PHP:</b> " . $_SERVER['SERVER_SOFTWARE'] . "</li>";
        echo "<li><b>b. El nombre del sistema operativo (servidor):</b> " . php_uname('s') . "</li>";
        echo "<li><b>c. El idioma del navegador (cliente):</b> " . $_SERVER['HTTP_ACCEPT_LANGUAGE'] . "</li>";
        echo "</ul>";
    ?>

    <p>
    <a href="https://validator.w3.org/check?uri=referer"><img
      src="https://www.w3.org/Icons/valid-xhtml11" alt="XHTML 1.1 válido" altura="31" ancho="88" /></a>
    </p>


</body>
</html>