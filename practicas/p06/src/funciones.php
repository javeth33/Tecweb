    <?php
        if(isset($_GET['numero']))
        {
            $num = $_GET['numero'];
            if ($num%5==0 && $num%7==0)
            {
                echo '<h3>R= El número '.$num.' SÍ es múltiplo de 5 y 7.</h3>';
            }
            else
            {
                echo '<h3>R= El número '.$num.' NO es múltiplo de 5 y 7.</h3>';
            }
        }

        if(isset($_POST["name"]) && isset($_POST["email"]))
        {
            echo $_POST["name"];
            echo '<br>';
            echo $_POST["email"];
        }

        function SecuenciaNumeros() {
                $matriz = [];
                $iteraciones = 0;
                $secuenciaEncontrada = false;

                while (!$secuenciaEncontrada) {
                    $iteraciones++;
                    $num1 = rand(1, 100);
                    $num2 = rand(1, 100);
                    $num3 = rand(1, 100);

                    $matriz[] = [$num1, $num2, $num3];

                    // secuencia: impar, par, impar
                    if ($num1 % 2 != 0 && $num2 % 2 == 0 && $num3 % 2 != 0) {
                        $secuenciaEncontrada = true; // Detiene el ciclo
                    }
                }

                echo "<h3>Resultados del Ejercicio 2:</h3>";
                echo "<p>" . ($iteraciones * 3) . " números obtenidos en " . $iteraciones . " iteraciones.</p>";
                echo "<pre>";
                print_r($matriz);
                echo "</pre>";

        }

       
    ?>