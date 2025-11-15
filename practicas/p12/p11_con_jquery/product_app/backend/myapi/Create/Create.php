<?php
namespace TECWEB\MYAPI\Create; 

use TECWEB\MYAPI\Core\DataBase; 

class Creater extends DataBase { 
 
    private $response = array();

    public function __construct($db, $user='root', $pass='') {
        parent::__construct($user, $pass, $db);
    }
    
    /**
     * Lógica de product-add.php
     */
    public function add($jsonString) {
        $data = [ 
            'status'  => 'error',
            'message' => 'Ya existe un producto con ese nombre'
        ];
        if(!empty($jsonString)) {
            $jsonOBJ = json_decode($jsonString);
            
            $sql_check = "SELECT * FROM productos WHERE nombre = '{$jsonOBJ->nombre}' AND eliminado = 0";
            $result = $this->conexion->query($sql_check);
            
            if ($result->num_rows == 0) {
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
    
    public function getData() {
        return json_encode($this->response, JSON_PRETTY_PRINT);
    }
}