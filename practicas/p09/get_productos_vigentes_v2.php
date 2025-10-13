<?php
/**
 * get_productos_vigentes_v2.php
 * Muestra en un documento XHTML todos los productos que no estén "eliminados" (eliminado = 0),
 * agregando una columna para la acción de modificar.
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">
	<?php
    $data = array();

	// Configuración de conexión (Asegúrate de que 'root' y la contraseña sean correctas)
	@$link = new mysqli('localhost', 'root', '', 'marketzone');
	if ($link->connect_errno)
	{
		die('Falló la conexión: '.$link->connect_error.'<br/>');
	}
	
	// Consulta modificada: SELECCIONA TODOS LOS PRODUCTOS DONDE 'eliminado' ES IGUAL A 0
	$sql = "SELECT * FROM productos WHERE eliminado = 0";

	if ( $result = $link->query($sql) )
	{
		$row = $result->fetch_all(MYSQLI_ASSOC);

		// Manejo de codificación de detalles
        foreach($row as $num => $registro) {           
            foreach($registro as $key => $value) {      
                $data[$num][$key] = ($key === 'detalles') ? utf8_encode($value) : $value;
            }
        }

		$result->free();
	}

	$link->close();
	?>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Productos Vigentes</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
	</head>
	<body>
		<div class="container">
			<h3>PRODUCTOS VIGENTES (eliminado = 0)</h3>

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
                        <th scope="col">Acción</th>
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
								<td><a href="formulario_productos_v2.php?id=<?= $producto['id'] ?>" class="btn btn-sm btn-info">Editar</a></td>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>

			<?php else : ?>

				<div class="alert alert-warning" role="alert">
					No se encontraron productos vigentes.
				</div>

			<?php endif; ?>
		</div>
	</body>
</html>