<?php
require_once ($_SERVER['DOCUMENT_ROOT'] . '/src/model/campaign_model.php');
require_once ($_SERVER['DOCUMENT_ROOT'] . '/src/model/promotion_model.php');

//? 1. Verificamos si se envió una 'acción' desde un formulario (usando POST)
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $responseData = array();
    
    //? 3. Decidimos qué hacer basándonos en la acción
    switch ($_POST['action']) {
        
        case 'load_promotions':
            $promotionModel = new PromotionModel();
            $promotions = $promotionModel->getAllPromotions();

            if ($promotions) {
                $currentDateTime = new DateTime(); // Fecha actual del servidor
                $activePromotions = array_filter($promotions, function ($promotion) use ($currentDateTime) {
                    $finishDate = new DateTime($promotion['finish_date']);
                    return $finishDate >= $currentDateTime;
                });

                $activePromotions = array_values($activePromotions);

                if (!empty($activePromotions)) {
                    $responseData['request_status'] = [true, 'Se han obtenido las promociones activas'];
                    $responseData['promotions'] = $activePromotions;
                } else {
                    $responseData['request_status'] = [true, 'No hay promociones activas actualmente.'];
                }
            } else {
                $responseData['request_status'] = [false, 'Ocurrió un error al consultar las promociones en la base de datos, póngase en contacto con el desarrollador.'];
                $responseData['promotions'] = null;
            }

            break;

        case 'load_campaigns':
            $campaignModel = new CampaignModel();
            $campaigns = $campaignModel->getAllCampaigns();

            if($campaigns) {
                if (!empty($campaigns)) {
                    $responseData['request_status'] = [true, 'Se han obtenido las campañas.'];
                    $responseData['campaigns'] = $campaigns;
                } else {
                    $responseData['request_status'] = [true, 'No hay campañas registradas actualmente.'];
                }
            } else {
                $responseData['request_status'] = [false, 'No hay campañas activas actualmente u ocurrió un error al consultar las campañas en la base de datos, póngase en contacto con el desarrollador.'];
            }
            
            break;

        
        default:
            $responseData['request_status'] = [false, 'Acción al controlador no reconocida, tome una evidencia de este error y contacte al desarrollador.'];
            break;
    }

    echo json_encode($responseData, JSON_UNESCAPED_UNICODE);
}
?>