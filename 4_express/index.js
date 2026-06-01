// Ya instalado con npm i express -> Ahora importamos express para poder usarlo

// Importamos Exprss.js
const express = require("express");

// Creamos una aplicacion de Express
const app = express();

// Definimos la ruta principal
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

app.get("/saludos", (req, res) => {
    res.send("Respuesta JSON, HTML, texto plano de la url /saludos")
});

// Escuchamos en el puerto 3000
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor Express corriendo en el puerto ${puerto}`);
});


/*================
    Explicacion
==================

    1. Importamos Express: Traemos el framework express al archivo

    2. Crear una aplicacion: Llamamos a la funcion express() que devuelve una instancia de la aplicacion 

    3. Definimos una ruta: Usamos app.get() para definir que hacer cuando alguien visita la raiz "/" de nuestro servidor. Aca responderemos con un simple "Hola mundo desde Express.js"

    4. Escuchamos en un puerto: Igual que con el servidor Node.js con el modulo http nativo, nuestro servidor esta escuchando en el puerto 3000 y listo para aceptar conexiones
*/