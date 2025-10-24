// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
};

/**
 * Bloque de inicialización de jQuery.
 * Se ejecuta una vez que el DOM está completamente cargado.
 */
$(document).ready(function() {
    init();
    $('#search-form').on('submit', buscarProducto); 
    $('#product-form').on('submit', agregarProducto);

    $("#products").on('click', '.product-delete', eliminarProducto);

    // NUEVO: Búsqueda en tiempo real al teclear
    $('#search').on('input', function() {
        buscarProducto();
    });
});

// FUNCIÓN CALLBACK AL CARGAR LA PÁGINA
function init() {
    /**
     * Convierte el JSON a string para poder mostrarlo
     */
    var JsonString = JSON.stringify(baseJSON, null, 2);
    // Uso de jQuery para establecer el valor del textarea
    $("#description").val(JsonString);

    // SE LISTAN TODOS LOS PRODUCTOS
    listarProductos();
}

// FUNCIÓN CALLBACK AL CARGAR LA PÁGINA O AL AGREGAR UN PRODUCTO
function listarProductos() {
    $.ajax({
        url: './backend/product-list.php',
        type: 'GET',
        dataType: 'json', 
        success: function(productos) {
            // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
            if (productos && Object.keys(productos).length > 0) {
                let template = '';

                // Uso de $.each para iterar sobre la colección
                $.each(productos, function(index, producto) {
                    let descripcion = '';
                    descripcion += '<li>precio: ' + producto.precio + '</li>';
                    descripcion += '<li>unidades: ' + producto.unidades + '</li>';
                    descripcion += '<li>modelo: ' + producto.modelo + '</li>';
                    descripcion += '<li>marca: ' + producto.marca + '</li>';
                    descripcion += '<li>detalles: ' + producto.detalles + '</li>';

                    template += `
                        <tr productId="${producto.id}">
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td><ul>${descripcion}</ul></td>
                            <td>
                                <button class="product-delete btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });
                // Uso de jQuery para insertar la plantilla
                $("#products").html(template);
            } else {
                $("#products").html('<tr><td colspan="4">No hay productos para mostrar.</td></tr>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al listar productos: " + textStatus, errorThrown);
        }
    });
}

// FUNCIÓN CALLBACK DE FORMULARIO "Buscar"
function buscarProducto(e) {
    if (e) e.preventDefault();

    var search = $('#search').val();

    if (!search.trim()) {
        $("#product-result").attr("class", "card my-4 d-block");
        $("#container").html('<li>Ingrese un término de búsqueda.</li>');
        // Si el campo está vacío, mostrar todos los productos
        listarProductos();
        return;
    }

    // Uso de $.ajax para la conexión asíncrona GET
    $.ajax({
        url: './backend/product-search.php',
        type: 'GET',
        data: {
            search: search
        }, 
        dataType: 'json',
        success: function(productos) {
            if (productos && Object.keys(productos).length > 0) {
                let template = '';
                let template_bar = '';

                $.each(productos, function(index, producto) {
                    let descripcion = '';
                    descripcion += '<li>precio: ' + producto.precio + '</li>';
                    descripcion += '<li>unidades: ' + producto.unidades + '</li>';
                    descripcion += '<li>modelo: ' + producto.modelo + '</li>';
                    descripcion += '<li>marca: ' + producto.marca + '</li>';
                    descripcion += '<li>detalles: ' + producto.detalles + '</li>';

                    template += `
                        <tr productId="${producto.id}">
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td><ul>${descripcion}</ul></td>
                            <td>
                                <button class="product-delete btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;

                    template_bar += `
                        <li>${producto.nombre}</li>
                    `;
                });
                // Uso de jQuery para manipulación del DOM y clases
                $("#product-result").attr("class", "card my-4 d-block");
                $("#container").html(template_bar);
                $("#products").html(template);
            } else {
                $("#products").html('<tr><td colspan="4">No se encontraron productos.</td></tr>');
                $("#product-result").attr("class", "card my-4 d-block");
                $("#container").html('<li>No se encontraron resultados para la búsqueda.</li>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al buscar productos: " + textStatus, errorThrown);
        }
    });
}

// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto"
function agregarProducto(e) {
    e.preventDefault();

    var productoJsonString = $('#description').val();
    var finalJSON;

    try {
        finalJSON = JSON.parse(productoJsonString);
    } catch (error) {
        let template_bar = `<li style="list-style: none;">Error: El JSON en el campo de detalles es inválido.</li>`;
        $("#product-result").attr("class", "card my-4 d-block");
        $("#container").html(template_bar);
        return;
    }

    finalJSON['nombre'] = $('#name').val();


    let errores = [];

    if (!finalJSON['nombre'] || finalJSON['nombre'].trim() === "") {
        errores.push("El nombre es requerido.");
    } else if (finalJSON['nombre'].length > 100) {
        errores.push("El nombre debe tener 100 caracteres o menos.");
    }

    const marcasValidas = ["Sony", "Samsung", "LG", "Panasonic", "NA"];
    if (!finalJSON['marca'] || !marcasValidas.includes(finalJSON['marca'])) {
        errores.push("La marca es requerida y debe ser una opción válida.");
    }

    if (!finalJSON['modelo'] || finalJSON['modelo'].trim() === "") {
        errores.push("El modelo es requerido.");
    } else if (!/^[a-zA-Z0-9\-]+$/.test(finalJSON['modelo'])) {
        errores.push("El modelo debe ser alfanumérico.");
    } else if (finalJSON['modelo'].length > 25) {
        errores.push("El modelo debe tener 25 caracteres o menos.");
    }

    if (finalJSON['precio'] === undefined || finalJSON['precio'] === null || finalJSON['precio'] === "") {
        errores.push("El precio es requerido.");
    } else if (isNaN(finalJSON['precio']) || Number(finalJSON['precio']) <= 99.99) {
        errores.push("El precio debe ser mayor a 99.99.");
    }

    if (finalJSON['detalles'] && finalJSON['detalles'].length > 250) {
        errores.push("Los detalles deben tener 250 caracteres o menos.");
    }

    if (finalJSON['unidades'] === undefined || finalJSON['unidades'] === null || finalJSON['unidades'] === "") {
        errores.push("Las unidades son requeridas.");
    } else if (isNaN(finalJSON['unidades']) || Number(finalJSON['unidades']) < 0) {
        errores.push("Las unidades deben ser un número mayor o igual a 0.");
    }

    if (!finalJSON['imagen'] || finalJSON['imagen'].trim() === "") {
        finalJSON['imagen'] = "img/default.png";
    }

    if (errores.length > 0) {
        let template_bar = errores.map(e => `<li style="list-style: none;">${e}</li>`).join('');
        $("#product-result").attr("class", "card my-4 d-block");
        $("#container").html(template_bar);
        return; 
    }

    // SE OBTIENE EL STRING DEL JSON FINAL PARA EL ENVÍO POST
    productoJsonString = JSON.stringify(finalJSON);

    $.ajax({
        url: './backend/product-add.php',
        type: 'POST',
        contentType: "application/json;charset=UTF-8", 
        data: productoJsonString,
        dataType: 'json',
        success: function(respuesta) {
            console.log(respuesta);
            let template_bar = `
                <li style="list-style: none;">status: ${respuesta.status}</li>
                <li style="list-style: none;">message: ${respuesta.message}</li>
            `;

            $("#product-result").attr("class", "card my-4 d-block");
            $("#container").html(template_bar);

            listarProductos();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al agregar producto: " + textStatus, errorThrown);
        }
    });
}

// FUNCIÓN CALLBACK DE BOTÓN "Eliminar" (Manejada por delegación)
function eliminarProducto(e) {
    e.preventDefault(); // Previene cualquier acción por defecto del botón

    if (confirm("De verdad deseas eliinar el Producto")) {

        var id = $(this).closest('tr').attr("productId");

        $.ajax({
            url: './backend/product-delete.php',
            type: 'GET',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(respuesta) {
                console.log(respuesta);
                let template_bar = `
                    <li style="list-style: none;">status: ${respuesta.status}</li>
                    <li style="list-style: none;">message: ${respuesta.message}</li>
                `;

                $("#product-result").attr("class", "card my-4 d-block");
                $("#container").html(template_bar);

                listarProductos();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error al eliminar producto: " + textStatus, errorThrown);
            }
        });
    }
}

/* NOTA: La función getXMLHttpRequest() es eliminada ya que su 
funcionalidad es reemplazada completamente por los métodos AJAX de jQuery ($.ajax, $.get).*/