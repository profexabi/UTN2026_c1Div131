// Vamos a crear un servidor basico usando Node.js con su modulo nativo http

// Nuestro servidor Node.js respondera "Hola mundo" cuando alguien visite nuestra pagina

// Importamos el modulo http
const http = require("http");


// Creamos el servidor con las funcionalidades que trae este modulo
const servidor = http.createServer((req, res) => {

    // Configuramos la respuesta
    res.statusCode = 200; // 200 OK, indicamos peticion exitosa

    res.setHeader("Content-Type", "text/plain"); // Indicamos que responderemos con texto

    res.end("Hola mundo desde Node.js"); // Mensaje que enviamos al cliente
});

// Definimos el puerto y arrancamos el servidor
const puerto = 3000;

servidor.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});

/*================
    Explicacion
==================

    1. Importamos el modulo http: Esto nos da acceso a todas las funcionalidades para crear un servidor

    2. Crear un servidor: Usamos el metodo http.createServer() para definir un servidor que escuche las solicitudes de los clientes y les responda

    3. Respuesta del servidor: El servidor siempre respondera con el mensaje "Hola mundo desde Node.js"

    4. Escuchamos en un puerto: El servidor se ejecuta en el puerto 3000 (puede ser cualquier puerto libre) y muestra un mensaje en la consola cuando esta listo
*/