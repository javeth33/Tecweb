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

        function encontrarMultiplo() {
            if (isset($_GET['num_dado']) && is_numeric($_GET['num_dado'])) {
                $dado = $_GET['num_dado'];

                echo "<h3>Resultados del Ejercicio 3 (con while):</h3>";
                $encontrado = false;
                while (!$encontrado) {
                    $numeroAleatorio = rand(1, 100);
                    if ($numeroAleatorio % $dado == 0) {
                        echo "<p>El primer número aleatorio que es múltiplo de {$dado} es: {$numeroAleatorio}</p>";
                        $encontrado = true;
                    }
                }
                
                echo "<h3>Resultados del Ejercicio 3 (con do-while):</h3>";
                do {
                    $numeroAleatorio = rand(1, 100);
                } while ($numeroAleatorio % $dado != 0);
                echo "<p>El primer número aleatorio que es múltiplo de {$dado} es: {$numeroAleatorio}</p>";
                
            } else {
                echo "<h3>Por favor, ingrese un número válido en la URL (Ej. ?num_dado=1).</h3>";
            }
        }

        function crearTablaASCII() {
        $arreglo = [];
            echo "<h3>Resultados del Ejercicio 4:</h3>";

            for ($i = 97; $i <= 122; $i++) {
                $arreglo[$i] = chr($i);
            }
            
            echo "<pre>";
            foreach ($arreglo as $key => $value) {
                echo "[{$key}] => {$value}\n";
            }
            echo "</pre>";
                
        }


        //ej6

        function parqueVehicular() {
            return [
                'UBN6338' => [
                    'Auto' => [
                        'marca' => 'HONDA',
                        'modelo' => 2020,
                        'tipo' => 'camioneta'
                    ],
                    'Propietario' => [
                        'nombre' => 'Alfonzo Esparza',
                        'ciudad' => 'Puebla, Pue.',
                        'direccion' => 'C.U., Jardines de San Manuel'
                    ]
                ],
                // ... Agrega los 14 registros restantes aquí ...
                'HIJ2829' => [
                    'Auto' => [
                        'marca' => 'MERCEDES-BENZ',
                        'modelo' => 2024,
                        'tipo' => 'sedan'
                    ],
                    'Propietario' => [
                        'nombre' => 'Javier Luna',
                        'ciudad' => 'Puebla, Pue.',
                        'direccion' => 'Residencial San José'
                    ]
                ]
            ];
        }
    ?>