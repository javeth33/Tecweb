<?php
/**
 * get_productos_xhtml.php
 * Recibe el parámetro "tope" y muestra en un documento XHTML
 * todos los productos con un número de unidades menor o igual al especificado.
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
	<?php
    $data = array();
    $tope = '';

	if(isset($_GET['tope']))
    {
		$tope = $_GET['tope'];
    }
    else
    {
        die('Parámetro "tope" no detectado...');
    }

	if (!empty($tope))
	{
		
		@$link = new mysqli('localhost', 'root', '', 'marketzone');
		if ($link->connect_errno)
		{
			die('Falló la conexión: '.$link->connect_error.'<br/>');
		}

		if ( $result = $link->query("SELECT * FROM productos WHERE unidades <= $tope") )
		{
			$row = $result->fetch_all(MYSQLI_ASSOC);

            foreach($row as $num => $registro) {           
                foreach($registro as $key => $value) {      
                    $data[$num][$key] = ($key === 'detalles') ? utf8_encode($value) : $value;
                }
            }

			$result->free();
		}

		$link->close();
	}
	?>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Productos con Unidades Menores o Iguales a <?= $tope ?></title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
	</head>
	<body>
		<div class="container">
			<h3>PRODUCTOS con Unidades &lt;= <?= $tope ?></h3>

			<br/>

			<?php if( !empty($data) ) : ?>

				<table class="table table-striped table-hover">
					<thead class="thead-dark">
						<tr>
						<th scope="col">#</th>
						<th scope="col">Nombre</th>
						<th scope="col">Marca</th>
						<th scope="col">Modelo</th>
						<th scope="col">Precio</th>
						<th scope="col">Unidades</th>
						<th scope="col">Detalles</th>
						<th scope="col">Imagen</th>
						</tr>
					</thead>
					<tbody>
						<?php foreach($data as $producto) : ?>
							<tr>
								<th scope="row"><?= $producto['id'] ?></th>
								<td><?= $producto['nombre'] ?></td>
								<td><?= $producto['marca'] ?></td>
								<td><?= $producto['modelo'] ?></td>
								<td><?= $producto['precio'] ?></td>
								<td><?= $producto['unidades'] ?></td>
								<td><?= $producto['detalles'] ?></td>
								<td><img src="<?= $producto['imagen'] ?>" alt="Imagen de <?= $producto['nombre'] ?>" style="max-height: 50px;" /></td>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>

			<?php else : ?>

				<div class="alert alert-warning" role="alert">
					No se encontraron productos con unidades menores o iguales a <?= $tope ?> o el valor proporcionado no es válido.
				</div>

			<?php endif; ?>
		</div>
	</body>
</html>