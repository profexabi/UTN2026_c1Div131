/*========================
    Asincronia en JS
==========================

La asincronia es la capacidad de un programa de ejecutar tareas que toman tiempo (como acceder a una API o esperar un temporizador) sin bloquear la ejecucion del resto del codigo.

En JavaScript, esto es especialmente importante porque es un lenguaje single-threaded (de un solo hilo), lo que significa que solo puede ejecutar una tarea a la vez. Por eso, para evitar que el hilo principal se bloquee, se introducen mecanismos asincronicos que permiten "delegar" operaciones que tomaran tiempo y continuar ejecutando el resto del codigo mientras esas tareas se completan.


============================================
    Herramientas en JS para asincronia
============================================

///////////////////
// 1. Callbacks
Funcion que se pasa como argumentoo para ejecutarse despues de completar una operacion

    - Ventajas: Flexibilidad
    - Desventajas: Callback hell y manejo dificil de errores


/////////////////
// 2. Promises
Objeto que representa un valor que puede estar disponible ahora, mas adelante o nunca. Sus estados son
    - pending (pendiente)
    - fulfilled (completada)
    - rejected (rechazada)

fetch() no es una promesa, es una Web API que retorna una promesa


///////////////////////
// 3. async / await
"Sintactic sugar", es decir, una manera mas simple de escribir algo. 
Concretamente es una manera mas sencilla de escribir promesas. Permite escribir codigo asincronoo de forma mas legible, como si fuera sincrono. Nos prorciona

    - Codigo mas claro
    - Manejo de errores mas facil con try/catch
    - Evita el callback hell


La asincronia es un pilar fundamental de JavaScript que nos permitira realizar operaciones como

    - llamadas a APIs externas
    - acceso a archivos
    - animaciones
    - eventos de usuario
*/


/*==================================
    Renderizando con localStorage
====================================

JSON.stringify() para transformar a texto plano JSON un array de objetos

JSON.parse() para transformar a objetos JavaScript un string JSON
*/

// Solucion mas rapida let listaAlumnos = JSON.parse(localStorage.getItem("alumnosIFTS"));

// Traemos el array de objetos JSON de mi almacenamiento local
let listaAlumnos = localStorage.getItem("alumnosIFTS");
console.log(listaAlumnos); // [{"id":1,"nombre":"Derek"},{"id":2,"nombre":"Melani"},{"id":3,"nombre":"Leonardo"},{"id":4,"nombre":"Luciano"},{"id":5,"nombre":"Marcela"},{"id":6,"nombre":"Edgar"},{"id":7,"nombre":"Adam"},{"id":8,"nombre":"Cheri"}]

// Para poder trabajar con este string JSON tengo que 
let alumnosObj = JSON.parse(listaAlumnos);
console.log(alumnosObj); // Ahora ya obtengo un array de objeto que puedo iterar
/*
[
    {
        "id": 1,
        "nombre": "Derek"
    },
    {
        "id": 2,
        "nombre": "Melani"
    },
]
*/

let contenedorLocal = document.getElementById("contenedorLocal");
let htmlAlumno = "<ul>"; // Con este string, vamos a ir armando una lista llenandola de nombre de alumnos <ul><li>Elemento 1</li><li>Elemento 2</li></ul>

// Vamos a iterar este array de objetos y vamos a imprimir una nueva lista para volcar sus nombres
alumnosObj.forEach(alumno => {
    // Aca estamos llenando dinamicamente el HTML
    htmlAlumno += `<li>El alumno ${alumno.nombre} tiene el id: ${alumno.id}</li>`;
});

// Al termino de este bucle, termine de armar mi <ul> con todos los <li>
htmlAlumno += "</ul>";
console.log(htmlAlumno); // <ul><li>Derek</li><li>Melani</li><li>Leonardo</li><li>Luciano</li><li>Marcela</li><li>Edgar</li><li>Adam</li><li>Cheri</li></ul>

// A innerHTML le vamos a pegar un choclo string con etiquetas HTML que este metodo renderizara en la pagina
contenedorLocal.innerHTML = htmlAlumno;





/*==================
    fetch
====================
fetch() es una funcion incorporada en los navegadores modernos que permite realizar peticiones HTTP de forma asincronica usando promesas

Forma parte de las Web APIs proporcionadas por el navegador (no del lenguaje JS en si). Fue introducida como parte del Fetch API para reemplazar al viejo y complejo XMLHttpRequest

    - Devuelve un objeto Promise que se resuelve con un objeto Response
    - Usa el estandar HTTP: metodos como GET, POST, PUT y DELETE
    - Funciona muy bien con asnyc/await
    - Es mas limpio y moderno que XMLHttpRequest
    - Soporta CORS, headers, envio de JSON y mas


//////////////////////
// Sintaxis basica
- url: string, la URL a la que queremos hacer una solicitud
- options: parametro opcional, es un objeto que especifica configuracion adicional como metodo, cabeceras, cuerpo, etc

    fetch(url, options)
        .then(response => {
            // Respuesta cruda del servidor    
        })
        .catch(error => {
            // error de red o fallo total    
        });


///////////////////////
// El objeto Response

La promesa devuelta por fetch() se resuelve con un objeto Response que tiene:

    .ok             Booleano(true si status esta entre 200 y 299)
    .status         Codigo HTTP (200, 404)
    .statusText     texto del estado HTTP ("OK", "Not Found") 
    .headers        cabeceras HTTP de la respuesta
    .json()         para leer el contenido de la respuesta



///////////////////////////////////
// Manejo de errores en .catch()
    
    - fetch() solo rechaza la promesa en errores de red reales (sin internet, servidor caido)
    - No rechaza codigos de error HTTP (404 o 500), por eso pondremos if(response.ok) { }


/////////////////////////////////////
// Casos de usos comunes de fetch

    - Consumir APIs REST para obtener datos de usuarios, productos, ble
    - Enviar formularios con POST
    - Cargar contenido dinamico en una SPA (Single Page Application)
*/


// Realizamos una solicitud GET con fetch a esta API Rest https://jsonplaceholder.typicode.com/users
// Usaremos la API Rest publica https://jsonplaceholder.typicode.com/
let contenedorInfo = document.getElementById("contenedorInfo");

fetch("https://jsonplaceholder.typicode.com/users") // Quiero traer la info en JSON de esta URL

    .then(response => { // Una vez que se termino de procesar mi solicitud, traigo la respuesta cruda del servidor
        console.log(response);
        return response.json(); // Transformamos el choclo JSON a objeto JS
        // es el equivalente a JSON.parse(dataServidor)

    }) // Una vez que termino de procesar estos datos, los veo por consola
    .then(data => {
        console.table(data); // Data ahora es un array de objetos en lugar de un string JSON

        // Vamos a crear una lista que diga <li>Usuario: nombreUsuario, Email: direccionEmail</li>
        let htmlUsers = "<ul>";

        // usuario es el parametro con el que nos referimos a CADA ELEMENTO de la iteracion (un objeto)
        data.forEach(usuario => {
            htmlUsers += `<li>Usuario: ${usuario.name}, email: ${usuario.email}</li>`;
        });
        htmlUsers += "</ul>";

        console.log(htmlUsers); // <ul><li>Usuario: Leanne Graham, email: Sincere@april.biz</li><li>Usuario: Ervin Howell, email: Shanna@melissa.tv</li><li>Usuario: Clementine Bauch, email: Nathan@yesenia.net</li><li>Usuario: Patricia Lebsack, email: Julianne.OConner@kory.org</li><li>Usuario: Chelsey Dietrich, email: Lucio_Hettinger@annie.ca</li><li>Usuario: Mrs. Dennis Schulist, email: Karley_Dach@jasper.info</li><li>Usuario: Kurtis Weissnat, email: Telly.Hoeger@billy.biz</li><li>Usuario: Nicholas Runolfsdottir V, email: Sherwood@rosamond.me</li><li>Usuario: Glenna Reichert, email: Chaim_McDermott@dana.io</li><li>Usuario: Clementina DuBuque, email: Rey.Padberg@karina.biz</li></ul>


        contenedorInfo.innerHTML = htmlUsers;

        
    })

    .catch(error => { // En el caso de que haya habido error de red o fallo total, me imprimira un mensaje de erro
        console.error("Error al obtener los datos:", error);
    });



/*=======================
    async/await
=========================

asyn/await es "syntactic sugar", la definicion de libro es 
    El azúcar sintáctico (syntactic sugar) se refiere a características de la sintaxis de un lenguaje de programación diseñadas para hacer que el código sea más fácil de leer, escribir o expresar, sin agregar nuevas funcionalidades al lenguaje

async/await es la manera mas sencilla que tenemos de trabajar con promesas, nos permiten escribir codigo asincrono con una sintaxis muy similar al codigo sincrono. Esto nos permite hacer el manejo de la asincronia mas legible, mas estructurado y sencillo de manener

/////////////////////////
// La keyword/palabra clave asnyc

La palabra clave asnyc DECLARA una funcion asincrona, la cual siempre devuelve una Promesa

La palabra clave await PAUSA la ejecucion de la funcion async hasta que una promesa sea
    - resuelta (fulfilled)
    - rechazada (rejected)


/////////////////////////////////////
// Que pasa internamente con await?

    1. Evalua la expresion que devuelve una promesa
    2. Suspende la ejecucion de la funcioon hasta que la promesa se resuelva o se rechaza
    3. Si se resuelve, se continua con el valor
    4. Si se rechaza, lanza un error que puede ser atrapado por try...catch


///////////////
// Resumen
- async     declara una funcion asincrona que devuelve una promesa
- await     pausa la funcion hasta que la promesa se resuelva
- try/catch maneja errores de promesas rechazadas

Ventajas: Codigo mas limpio, legible y facil de mantener
Solo se puede usar await dentro de funciones async
*/

/*============================================
    Con promesas usabamos esta sintaxis
 =============================================

fetch("https://jsonplaceholder.typicode.com/users") 
    .then(response => {
        return response.json();
    }) 
    .then(data => {
        console.table(data);
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });
*/

// Indicamos con async que esta funcion va a ser asincronica
async function obtenerPosts() {

    try {
        // A partir de await NO SE EJECUTA NADA hasta que esto termine
        // await detiene todo hasta que traiga la info con fetch
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts"); // 1. Solicito informacion a la URL

        // await detiene todo hasta que parsee esta informacion que trajo la respuesta del servidor
        const datos = await respuesta.json(); // 2. Parseo a array de objetos la respuesta JSON

        console.table(datos); // 3. La muestro por consola

    // Si hubo algun error general o error de red real, me lo mostrara aca por consola
    } catch(error) {
        // el catch captura errores de cualquier promesa esperada con await
        console.error("Error al obtener los datos:", error); 
    }
}

obtenerPosts();

/*=====================
    try...catch
======================

try...catch es una estructura de control utilizada para catpurar y manejar errores que ocurren durante la ejecucion de bloques de codigo.
Esta tecnica forma parte del manejo de excepciones en JavaScript.

Su objetivo es evitar que errores inesperados detengan la ejecucion del programa y en su lugar permitir manejar dichos errores de forma controlada

    try {
        // Bloque de codigo que puede lanzar errores
    } catch (error) {
        // Codigo para manejar el error
    }

Ojo! Opcionalmente tambien podemos añadir un bloque finally

    try {
        // Bloque de codigo que puede lanzar errores

    } catch (error) {
        // Codigo para manejar el error
    } finally {
        // Codigo que se ejecuta siempre (con o sin error)
    }
*/

// Ejemplo basico de division entre 0 -> error matematico
try {
    const resultado = 10 / 0; // ejemplo aleatorio para generar un error mas abajo
    console.log(resultado); // Este error matematico JavaScript lo interpreta como Infinity
    throw new Error ("No se puede dividir por 0!"); // Aca es el error que creamos

} catch (e) {
    console.log("Ocurrio un error", e.message);

} finally {
    console.log("Esto se va a ejecutar siempre");
}

// Infinity
// Ocurrio un error No se puede dividir por 0!
// Esto se va a ejecutar siempre


/*================================
    Que errores puede capturar?
==================================

try...catch captura errores en tiempo de ejecucion (runtime) como

    - Acceso a variables no definidas
    - Llamadas a funciones inexistentes
    - Errores lanzados con throw
    - Problemas en funciones como JSON.parse()
    - NO captura errores de sintaxis, porque estos evitan que el codigo siquiera se ejecute


==================================
    Como funciona internamente?
==================================

    1. El bloque try se ejecuta normalmente
    2. Si ocurre un error dentro del try se detiene inmediatamente la ejecucion y pasa al bloque catch
    3. El objeto de error (por convencion llamamos error o e) contiene informacion como

        - .name: tipo de error (TypeError, ReferenceError, etc)
        - .message: mensaje descriptivo
        - .stack: pila de llamadas

    4. El bloque finally si existe, se ejecuta siempre ocurra o no un error



========================================
    throw: lanzar manualmente errores
========================================

Podemos lanzar nustros propios errores con throw, util para validaciones o control de flujo



============================================
    por que no usar try...catch en exceso?
============================================

    - Puede ocultar errores reales si no se maneja correctamente
    - Tiene costo de rendimiento, especialmente en bucles
    - Es mejor usarlo donde hay riesgo real de error (I/O, parsing, red, etc)



================================
    Buenas practicas
================================

    - No atrapemos errores que no podemos manejar
    - Usemos try...catch solo donde esperemos errores (parsear datos o hacer llamadas a APIs)
    - Usemos finally para cerrar recursos, limpiar o terminar tareas (conexiones, indicadores de carga, etc)
    - Siempre proporcionemos informacion util en el error
*/