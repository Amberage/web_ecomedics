<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/src/config.php');

class CampaignModel
{
    private $db;

    public function __construct()
    {
        $this->db = new mysqli(DB_SERVERNAME, DB_USERNAME, DB_PASSWORD, DB_NAME);
        if ($this->db->connect_error) {
            die('Error de conexión: ' . $this->db->connect_error);
        }
    }

    /**
     * ? (Read) Obtiene todas las campañas.
     * @return array Un arreglo de arreglos asociativos con todas las campañas.
     */
    public function getAllCampaigns()
    {
        $query = "SELECT campaign_id, img_path, campaign_title, campaign_description, campaign_year 
                    FROM campaigns 
                    ORDER BY campaign_id ASC";
        $result = $this->db->query($query);

        $campaigns = [];
        while ($row = $result->fetch_assoc()) {
            $campaigns[] = $row;
        }
        return $campaigns;
    }


    /**
     * ? Cierra la conexión a la base de datos al destruir el objeto.
     */
    public function __destruct()
    {
        if ($this->db) {
            $this->db->close();
        }
    }
}
