<?php
require_once ($_SERVER['DOCUMENT_ROOT'] . '/src/config.php');

class PromotionModel {
    private $db;

    public function __construct() {
        $this->db = new mysqli(DB_SERVERNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);
        if ($this->db->connect_error) {
            die('Error de conexión: ' . $this->db->connect_error);
        }
    }

    /**
     * ? (Read) Obtiene todas las promociones.
     * @return array Un arreglo de arreglos asociativos con todas las promociones.
     */
    public function getAllPromotions() {
        $query = "SELECT promotion_id, img_path, finish_date FROM promotions ORDER BY promotion_id ASC";
        $result = $this->db->query($query);
        
        $promotions = [];
        while ($row = $result->fetch_assoc()) {
            $promotions[] = $row;
        }
        return $promotions;
    }
    
    /**
     * ? Cierra la conexión a la base de datos al destruir el objeto.
     */
    public function __destruct() {
        if ($this->db) {
            $this->db->close();
        }
    }
}
?>