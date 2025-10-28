<?php

//? Parámetros Dev o Prod
if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/.vscode')) {
    //* Entorno de desarrollo
    define("ROOT_PATH", $_SERVER['DOCUMENT_ROOT']);
    define("PREVIEW_IMG_PATH", '');
    define("DB_SERVERNAME", "localhost");
    define("DB_USERNAME", "root");
    define("DB_PASSWORD", "Amberage");
    define("DB_NAME", "ecomedics");
} else {
    //* Entorno de producción
    define("ROOT_PATH", dirname($_SERVER['DOCUMENT_ROOT']) . DIRECTORY_SEPARATOR . 'ecomedic');
    define("PREVIEW_IMG_PATH", 'https://ecomedics.mx');
    define("DB_SERVERNAME", "localhost");
    define("DB_USERNAME", "dccbbmis_root");
    define("DB_PASSWORD", "r@U.z,juNI40j6YjC=v[*PD31O");
    define("DB_NAME", "dccbbmis_ecomedics");
}

//? Directorios
define("UPLOAD_PROMOTIONS_RELATIVE_PATH", '/test_upload/promotions/');
define("UPLOAD_CAMPAIGNS_RELATIVE_PATH", '/test_upload/campaigns/');
define("UPLOAD_PROMOTIONS_PATH", ROOT_PATH . UPLOAD_PROMOTIONS_RELATIVE_PATH);
define("UPLOAD_CAMPAIGNS_PATH", ROOT_PATH. UPLOAD_CAMPAIGNS_RELATIVE_PATH);

//?Resoluciones
define('PROMOTIONS_WIDTH', 1800);
define('PROMOTIONS_HEIGHT', 700);
define('CAMPAIGNS_WIDTH', 1000);
define('CAMPAIGNS_HEIGHT', 1000);

//? Datos default del sistema
date_default_timezone_set('America/Mexico_City');

//? Tablas BBDD
define("TABLE_USERS", 'users');
define("TABLE_PROMOTIONS", 'promotions');
define("TABLE_CAMPAIGNS", 'campaigns');

?>