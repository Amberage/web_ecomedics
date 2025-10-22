<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejemplo Fetch API</title>
</head>
<body>
    <h1>Datos del Usuario</h1>
    
    <pre id="resultado"></pre>

    <script>
        // 1. DEFINIR LA URL DEL RECURSO (EL SCRIPT PHP)
        const urlApi = '/php/api.php';

        // 2. HACER LA SOLICITUD CON FETCH
        // fetch() es la API moderna para hacer solicitudes HTTP.
        // Retorna una "Promesa" (Promise).
        fetch(urlApi)
            .then(respuesta => {
                // response.json() es un método que también retorna una promesa
                // que resuelve el cuerpo de la respuesta como un objeto JSON.
                if (!respuesta.ok) {
                    throw new Error('Error en la red: ' + respuesta.statusText);
                }
                return respuesta.json();
            })
            .then(datos => {
                // 3. PROCESAR LOS DATOS RECIBIDOS
                // 'datos' ya es un objeto JavaScript listo para usarse.
                console.log('Objeto JS recibido:', datos);

                // Mostramos el nombre en la consola
                console.log('Nombre del usuario:', datos.nombre);

                // Mostramos los datos formateados en la página
                const elementoResultado = document.getElementById('resultado');
                // JSON.stringify(..., null, 2) formatea el JSON para que sea legible
                elementoResultado.textContent = JSON.stringify(datos, null, 2);
            })
            .catch(error => {
                // 4. MANEJAR ERRORES
                // Esto captura errores de red o si el 'fetch' falla.
                console.error('¡Hubo un problema con la solicitud fetch!', error);
                document.getElementById('resultado').textContent = 'Error: ' + error.message;
            });
    </script>
</body>
</html>