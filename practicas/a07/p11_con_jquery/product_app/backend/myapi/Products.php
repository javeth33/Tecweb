<?php
namespace TECWEB\MYAPI;

use TECWEB\MYAPI\DataBase as DataBase;
require_once __DIR__ . '/DataBase.php';

class Products extends DataBase {
 
    private $response = NULL;

    public function __construct($db, $user='root', $pass='') {
        $this->response = array();
        parent::__construct($user, $pass, $db);
    }
    
    /**
     * Cierra la conexión al destruir el objeto
     */
    public function __destruct() {
        if ($this->conexion) {
            $this->conexion->close();
        }
    }

    /**
     * Lógica de product-list.php
     */
    public function list() {
        $this ->response = array();
        if ($result = $this->conexion->query("SELECT * FROM productos WHERE eliminado = 0")) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            if(!is_null($rows)){
                $this->response = $rows; // Más eficiente que el bucle anterior
            }
            $result->free();
        } else {
            $this->response = array('status' => 'error', 'message' => 'Query Error: ' . mysqli_error($this->conexion));
        }
    }

    /**
     * Lógica de product-search.php
     */
    public function search($search) {
        $this->response = array();
        $sql = "SELECT * FROM productos WHERE (id = '{$search}' OR nombre LIKE '%{$search}%' OR marca LIKE '%{$search}%' OR detalles LIKE '%{$search}%') AND eliminado = 0";
        
        if ($result = $this->conexion->query($sql)) {
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            if(!is_null($rows)) {
                // Codificar a UTF-8
                foreach($rows as $num => $row) {
                    foreach($row as $key => $value) {
                        $this->response[$num][$key] = utf8_encode($value);
                    }
                }
            }
            $result->free();
        } else {
            $this->response = array('status' => 'error', 'message' => 'Query Error: ' . mysqli_error($this->conexion));
        }
    }

    /**
     * Lógica de product-add.php
     */
    public function add($jsonString) {
        $data = array(
            'status'  => 'error',
            'message' => 'Ya existe un producto con ese nombre'
        );
        if(!empty($jsonString)) {
            $jsonOBJ = json_decode($jsonString);
            
            $sql_check = "SELECT * FROM productos WHERE nombre = '{$jsonOBJ->nombre}' AND eliminado = 0";
            $result = $this->conexion->query($sql_check);
            
            if ($result->num_rows == 0) {
                $this->conexion->set_charset("utf8");
                $sql = "INSERT INTO productos VALUES (null, '{$jsonOBJ->nombre}', '{$jsonOBJ->marca}', '{$jsonOBJ->modelo}', {$jsonOBJ->precio}, '{$jsonOBJ->detalles}', {$jsonOBJ->unidades}, '{$jsonOBJ->imagen}', 0)";
                
                if($this->conexion->query($sql)){
                    $data['status'] =  "success";
                    $data['message'] =  "Producto agregado";
                } else {
                    $data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($this->conexion);
                }
            }
            $result->free();
        }
        $this->response = $data;
    }

    /**
     * Lógica de product-edit.php
     */
    public function update($jsonString) {
        $data = array(
            'status'  => 'error',
            'message' => 'La consulta falló'
        );
        if(!empty($jsonString)) {
            $jsonOBJ = json_decode($jsonString);
            $id = $jsonOBJ->id;
            $this->conexion->set_charset("utf8");
            
            $sql = "UPDATE productos SET 
                        nombre = '{$jsonOBJ->nombre}', 
                        marca = '{$jsonOBJ->marca}', 
                        modelo = '{$jsonOBJ->modelo}', 
                        precio = {$jsonOBJ->precio}, 
                        detalles = '{$jsonOBJ->detalles}', 
                        unidades = {$jsonOBJ->unidades}, 
                        imagen = '{$jsonOBJ->imagen}'
                    WHERE id = {$id}";
            
            if($this->conexion->query($sql)){
                $data['status'] =  "success";
                $data['message'] =  "Producto actualizado";
            } else {
                $data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($this->conexion);
            }
        }
        $this->response = $data;
    }

    /**
     * Lógica de product-delete.php
     */
    public function delete($id) {
        $data = array(
            'status'  => 'error',
            'message' => 'La consulta falló'
        );
        if(isset($id)) {
            $sql = "UPDATE productos SET eliminado=1 WHERE id = {$id}";
            if ($this->conexion->query($sql)) {
                $data['status'] =  "success";
                $data['message'] =  "Producto eliminado";
            } else {
                $data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($this->conexion);
            }
        }
        $this->response = $data;
    }

    /**
     * Lógica de singleByName 
     */
    public function singleByName($name) {
        $this->response = array(); 
        $stmt = $this->conexion->prepare("SELECT * FROM productos WHERE nombre = ? AND eliminado = 0");
        $stmt->bind_param("s", $name); 
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $this->response = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        } else {
            $this->response = array('status' => 'error', 'message' => 'Query Error: ' . $stmt->error);
        }
        $stmt->close();
    }
    
    /**
     * Devuelve la respuesta en JSON; getResponse()
     */
    public function getData() {
        return json_encode($this->response, JSON_PRETTY_PRINT);
    }
}
?>