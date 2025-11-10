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


    public function list() {

        $this ->response = array();

        if ($result = $this->conexion->query("SELECT * FROM productos WHERE eliminado = 0")) {
            
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            if(!is_null($rows)){

                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $this->response[$num][$key] = $value; 
                    }
                }
            }
            $result->free();
        } else {
            die('Query Error: ' .mysqli_error($this->conexion));
        }
        $this->conexion->close();
    }

    
    public function singleByName($name) {
        $this->response = array(); 
        
        $stmt = $this->conexion->prepare("SELECT * FROM productos WHERE nombre = ? AND eliminado = 0");
        $stmt->bind_param("s", $name); 
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            if(!is_null($rows)) {
              
                $this->response = $rows;
            }
            $result->free();
        } else {
            die('Query Error: ' . $stmt->error);
        }
        $stmt->close();
        $this->conexion->close();
    }
    
    
    public function getData() {
        return json_encode($this->response, JSON_PRETTY_PRINT);
    }
}
?>