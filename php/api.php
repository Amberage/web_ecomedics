<?php
// 1. PREPARAR LOS DATOS
// (En un caso real, esto vendría de una base de datos)
$datos = [
    "id" => 101,
    "nombre" => "Ana López",
    "email" => "ana.lopez@ejemplo.com",
    "activa" => true,
    "cursos" => [
        "PHP Moderno",
        "JavaScript Avanzado"
    ]
];


// 2. ESTABLECER LA CABECERA DE CONTENIDO
// Esto es crucial. Le dice al navegador que la respuesta es JSON.
header('Content-Type: application/json');


// 3. CODIFICAR Y ENVIAR
// json_encode() convierte un array asociativo de PHP en un string JSON.
echo json_encode($datos);
?>