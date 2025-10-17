// JSON BASE A MOSTRAR EN FORMULARIO
var baseJSON = {
    "precio": 0.0,
    "unidades": 1,
    "modelo": "XX-000",
    "marca": "NA",
    "detalles": "NA",
    "imagen": "img/default.png"
  };

// FUNCIÓN CALLBACK DE BOTÓN "Buscar"
function buscarID(e) {
    /**
     * Revisar la siguiente información para entender porqué usar event.preventDefault();
     * http://qbit.com.mx/blog/2013/01/07/la-diferencia-entre-return-false-preventdefault-y-stoppropagation-en-jquery/#:~:text=PreventDefault()%20se%20utiliza%20para,escuche%20a%20trav%C3%A9s%20del%20DOM
     * https://www.geeksforgeeks.org/when-to-use-preventdefault-vs-return-false-in-javascript/
     */
    e.preventDefault();

    // SE OBTIENE EL ID A BUSCAR
    var id = document.getElementById('search').value;

    // SE CREA EL OBJETO DE CONEXIÓN ASÍNCRONA AL SERVIDOR
    var client = getXMLHttpRequest();
    client.open('POST', './backend/read.php', true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.onreadystatechange = function () {
        // SE VERIFICA SI LA RESPUESTA ESTÁ LISTA Y FUE SATISFACTORIA
        if (client.readyState == 4 && client.status == 200) {
            console.log('[CLIENTE]\n'+client.responseText);
            
            // SE OBTIENE EL OBJETO DE DATOS A PARTIR DE UN STRING JSON
            let productos = JSON.parse(client.responseText);    // similar a eval('('+client.responseText+')');
            
            // SE VERIFICA SI EL OBJETO JSON TIENE DATOS
            if(Object.keys(productos).length > 0) {
                // SE CREA UNA LISTA HTML CON LA DESCRIPCIÓN DEL PRODUCTO
                let descripcion = '';
                    descripcion += '<li>precio: '+productos.precio+'</li>';
                    descripcion += '<li>unidades: '+productos.unidades+'</li>';
                    descripcion += '<li>modelo: '+productos.modelo+'</li>';
                    descripcion += '<li>marca: '+productos.marca+'</li>';
                    descripcion += '<li>detalles: '+productos.detalles+'</li>';
                
                // SE CREA UNA PLANTILLA PARA CREAR LA(S) FILA(S) A INSERTAR EN EL DOCUMENTO HTML
                let template = '';
                    template += `
                        <tr>
                            <td>${productos.id}</td>
                            <td>${productos.nombre}</td>
                            <td><ul>${descripcion}</ul></td>
                        </tr>
                    `;

                // SE INSERTA LA PLANTILLA EN EL ELEMENTO CON ID "productos"
                document.getElementById("productos").innerHTML = template;
            }
        }
    };
    client.send("id="+id);
}

// FUNCIÓN CALLBACK DE BÚSQUEDA GENERAL
function buscarProducto(e) {
    e.preventDefault();
    var search = document.getElementById('search').value;
    var client = getXMLHttpRequest();
    client.open('POST', './backend/read.php', true);
    client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            let productos = JSON.parse(client.responseText);
            let template = '';
            productos.forEach(function(producto) {
                let descripcion = '';
                descripcion += '<li>precio: '+producto.precio+'</li>';
                descripcion += '<li>unidades: '+producto.unidades+'</li>';
                descripcion += '<li>modelo: '+producto.modelo+'</li>';
                descripcion += '<li>marca: '+producto.marca+'</li>';
                descripcion += '<li>detalles: '+producto.detalles+'</li>';
                template += `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td><ul>${descripcion}</ul></td>
                    </tr>
                `;
            });
            document.getElementById("productos").innerHTML = template;
        }
    };
    client.send("id="+encodeURIComponent(search));
}

// FUNCIÓN CALLBACK DE BOTÓN "Agregar Producto"
function agregarProducto(e) {
    e.preventDefault();

    let nombre = document.getElementById('name').value.trim();
    let productoJsonString = document.getElementById('description').value;
    let finalJSON;
    try {
        finalJSON = JSON.parse(productoJsonString);
    } catch (err) {
        window.alert("El JSON no es válido.");
        return;
    }

    // a. Nombre requerido y <= 100 caracteres
    if (!nombre || nombre.length > 100) {
        window.alert("El nombre es obligatorio y debe tener 100 caracteres o menos.");
        return;
    }

    // b. Marca requerida y seleccionada de una lista (simulación: debe existir y no ser vacía)
    if (!finalJSON.marca || typeof finalJSON.marca !== "string" || finalJSON.marca.trim() === "") {
        window.alert("La marca es obligatoria y debe seleccionarse de la lista.");
        return;
    }

    // c. Modelo requerido, alfanumérico y <= 25 caracteres
    if (!finalJSON.modelo || !/^[a-zA-Z0-9\-]+$/.test(finalJSON.modelo) || finalJSON.modelo.length > 25) {
        window.alert("El modelo es obligatorio, alfanumérico y debe tener 25 caracteres o menos.");
        return;
    }

    // d. Precio requerido y > 99.99
    if (finalJSON.precio === undefined || isNaN(finalJSON.precio) || Number(finalJSON.precio) <= 99.99) {
        window.alert("El precio es obligatorio y debe ser mayor a 99.99.");
        return;
    }

    // e. Detalles opcionales y <= 250 caracteres
    if (finalJSON.detalles && finalJSON.detalles.length > 250) {
        window.alert("Los detalles deben tener 250 caracteres o menos.");
        return;
    }

    // f. Unidades requeridas y >= 0
    if (finalJSON.unidades === undefined || isNaN(finalJSON.unidades) || Number(finalJSON.unidades) < 0) {
        window.alert("Las unidades son obligatorias y deben ser 0 o más.");
        return;
    }

    // g. Imagen opcional, si no se registra usar default
    if (!finalJSON.imagen || finalJSON.imagen.trim() === "") {
        finalJSON.imagen = "img/default.png";
    }

    finalJSON['nombre'] = nombre;
    productoJsonString = JSON.stringify(finalJSON, null, 2);

    var client = getXMLHttpRequest();
    client.open('POST', './backend/create.php', true);
    client.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            window.alert(client.responseText);
        }
    };
    client.send(productoJsonString);
}

// SE CREA EL OBJETO DE CONEXIÓN COMPATIBLE CON EL NAVEGADOR
function getXMLHttpRequest() {
    var objetoAjax;

    try{
        objetoAjax = new XMLHttpRequest();
    }catch(err1){
        /**
         * NOTA: Las siguientes formas de crear el objeto ya son obsoletas
         *       pero se comparten por motivos historico-académicos.
         */
        try{
            // IE7 y IE8
            objetoAjax = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err2){
            try{
                // IE5 y IE6
                objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(err3){
                objetoAjax = false;
            }
        }
    }
    return objetoAjax;
}

function init() {
    /**
     * Convierte el JSON a string para poder mostrarlo
     * ver: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
     */
    var JsonString = JSON.stringify(baseJSON,null,2);
    document.getElementById("description").value = JsonString;
}