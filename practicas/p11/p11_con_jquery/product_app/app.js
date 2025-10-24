// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
};

// Variable global para almacenar los productos listados
var globalProductos = [];

/**
 * Bloque de inicialización de jQuery.
 * Se ejecuta una vez que el DOM está completamente cargado.
 */
$(document).ready(function() {
    init();
    $('#search-form').on('submit', buscarProducto); 
    $('#product-form').on('submit', agregarProducto);

    // Listeners delegados para botones en la tabla
    $("#products").on('click', '.product-delete', eliminarProducto);
    $("#products").on('click', '.product-edit', editarProducto); // NUEVO: Listener para editar

    // NUEVO: Listener para el botón de cancelar edición
    $('#product-form').on('click', '#cancel-edit', resetForm);

    // Búsqueda en tiempo real al teclear
    $('#search').on('input', function() {
        buscarProducto();
    });
});

// FUNCIÓN CALLBACK AL CARGAR LA PÁGINA
function init() {
    resetForm(); // Usamos resetForm para inicializar el formulario
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
                globalProductos = productos; // NUEVO: Guardar productos en variable global
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
                            <td class="text-right"> <button class="product-edit btn btn-info btn-sm mr-2">
                                    Editar
                                </button>
                                <button class="product-delete btn btn-danger btn-sm">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });
                // Uso de jQuery para insertar la plantilla
                $("#products").html(template);
            } else {
                globalProductos = []; // Limpiar si no hay productos
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
        $("#product-result").attr("class", "card my-4 d-none"); // Ocultar si está vacío
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
                            <td class="text-right">
                                <button class="product-edit btn btn-info btn-sm mr-2">
                                    Editar
                                </button>
                                <button class="product-delete btn btn-danger btn-sm">
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

// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto" O "MODIFICAR PRODUCTO"
function agregarProducto(e) {
    e.preventDefault();

    // ----- INICIO DE LÓGICA DE EDICIÓN -----
    let id = $('#productId').val();
    let isEdit = id ? true : false;
    let url = isEdit ? './backend/product-edit.php' : './backend/product-add.php';
    // ----- FIN DE LÓGICA DE EDICIÓN -----

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

    // ----- INICIO DE LÓGICA DE EDICIÓN -----
    if (isEdit) {
        finalJSON['id'] = id; // Agregar el ID al JSON si estamos editando
    }
    // ----- FIN DE LÓGICA DE EDICIÓN -----


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
        url: url, // URL dinámica (agregar o editar)
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

            resetForm(); // NUEVO: Resetear formulario en éxito
            listarProductos();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al agregar/editar producto: " + textStatus, errorThrown);
        }
    });
}

// FUNCIÓN CALLBACK DE BOTÓN "Eliminar" (Manejada por delegación)
function eliminarProducto(e) {
    e.preventDefault(); 

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

// NUEVA FUNCIÓN: Se activa al presionar el botón "Editar"
function editarProducto(e) {
    e.preventDefault();
    let id = $(this).closest('tr').attr("productId");
    // Buscar el producto en nuestro almacén global
    let producto = globalProductos.find(p => p.id == id);

    if (producto) {
        // Llenar el campo oculto con el ID
        $('#productId').val(producto.id);
        // Llenar el nombre
        $('#name').val(producto.nombre);

        // Recrear el JSON para el textarea, excluyendo datos que están en otros campos
        let detailsJSON = {
            "precio": parseFloat(producto.precio), // Asegurar que sea número
            "unidades": parseInt(producto.unidades), // Asegurar que sea número
            "modelo": producto.modelo,
            "marca": producto.marca,
            "detalles": producto.detalles,
            "imagen": producto.imagen
        };

        $('#description').val(JSON.stringify(detailsJSON, null, 2));

        // Cambiar UI del formulario
        $('#product-form button[type="submit"]').text('Modificar Producto');
        
        // Agregar botón de cancelar si no existe
        if ($('#cancel-edit').length === 0) {
            $('#product-form button[type="submit"]').after(
                '<button type="button" id="cancel-edit" class="btn btn-secondary btn-block mt-2">Cancelar Edición</button>'
            );
        }
        
        // Mover el scroll de la página hacia arriba
        window.scrollTo(0, 0);
    }
}

// NUEVA FUNCIÓN: Restablece el formulario al estado inicial
function resetForm() {
    // Restablecer el formulario (limpia name y description)
    $('#product-form').trigger('reset');
    
    // Limpiar el ID oculto
    $('#productId').val('');

    // Restaurar el JSON base en el textarea
    var JsonString = JSON.stringify(baseJSON, null, 2);
    $("#description").val(JsonString);

    // Cambiar el texto del botón principal
    $('#product-form button[type="submit"]').text('Agregar Producto');

    // Eliminar el botón de cancelar
    $('#cancel-edit').remove();
}