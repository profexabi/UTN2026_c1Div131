# [JavaScript](https://www.w3schools.com/js/default.asp)
## [Wikipedia JavaScript](https://es.wikipedia.org/wiki/JavaScript)


## JavaScript VII / Callbacks, High Order Functions, Funciones anidadas, Destructuring, Spread operator y Web APIs en JavaScript

### Relacion entre objetos globales y APIs web
- JavaScript es el lenguaje
- Web APIs son las herramientas del navegador
- Objetos globales son el lugar donde el entorno de ejecucion expone estas herramientas

```js
setTimeout();
```
- es una Web API en el navegador
- expuesta como funcion global
- accesible desde `window`
- utilizada por JavaScript
- NO es parte del lenguaje ECMAScript

**Las Web APIs** no forman parte del lenguaje JavaScript. **Son funcionalidades que provee el navegador**.

El navegador expone las Web APIs dentro del objeto global
```js
// setTimeout() existe porque el navegador "inyecta" esta funcion en window
window.setTimeout();

// Las Web APIs se acceden a traves de objetos globales!

// Muchas Web APIs estan disponibles como propiedades de window

window.setTimeout();        // API de temporizadores
window.fetch;               // API de peticiones HTTP
window.localStorage();      // API de almacenamiento
window.navigator;           // API del navegador
window.document;            // API del DOM

// En la practica, podemos omitir window
```


### Que es una API en JavaScript?
#### API significa Application Programming Interface (Interfaz de Programacion de Aplicaciones)
- **Una API es un conjunto de funciones y herramientas que podemos usar para interactuar con algo, sea el navegador, un servidor o una libreria**

- En el contexto del navegador, Una Web API, es una funcion o conjunto de fnuciones que el navegador nos proporciona para que las usemos con JavaScript.

- JavaScript por si solo es un lenguaje de programacion muy basico. Pero cuando se ejecuta en un navegador, puede acceder a funcionalidades especiales que el navegador le proporciona

    - Manipular el DOM `document.getElementById()`
    - Esperar un tiempo `setTimeout()`
    - Hacer peticiones HTTP `fetch`
    - Trabajar con audio, video, GPS, etc

#### En resumen
- JavaScript puro es simple
- El navegador le proporciona "superpoderes" con la Web APIs que se exponen a partir de los objetos globales
- Estas APIs permiten que JavaScript haga cosas reales: hablar con servidores, manipular la pagina, guardar datos, usar la camara, etc


```js
/*===============
    Callbacks
=================

Los callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan despues de que ocurra algun evento o se complete alguna operacion

Los callbacks son una manera de poder ordenar la ejecucion en nuestras funciones:
    1. Primero haces todo esto
    2. Luego ejecutas la funciones
*/

// Ejemplo 1 Callback
function saludar(nombre, callback) {
    console.log(`Hola ${nombre}`); // Primero saluda al nombre
    // Luego podemos ejecutar toda la logica que querramos
    
    callback(); // Al final de todo lo de arriba se ejecuta la funcion que se guardo como parametro
}


const despedirse = ()=> console.log(`Chau!`);

saludar("Gonzalo", despedirse);
// Hola Gonzalo
// Chau


// Ejemplo 2 Callback con un temporizador
setTimeout(() => console.log("Esto se ejecuta despues de 2 segundos"), 2000);


/*=======================================
    Caracteristicas principales en JS
=========================================

// 1. Funciones como "Ciudadanas de primer clase"
En JavaScript, las funciones son "ciudadanos de primer clase" (First Class Citizens)
Que significa esto? Que las funciones pueden ser:

    - Asignadas a variables
    - Pasadas como argumentos
    - Retornadas desde otras funciones
*/

// Ejemplo 3 asignar funcion a variable
const miCallback = function() {
    console.log(`Callback ejecutado`);
}

// Pasamos como argumento
function ejecutarCallback(callback) {
    callback();
}

ejecutarCallback(miCallback); // Callback ejecutado


// 2. Sincronia vs Asincronia

// Callback sincrono
/*
function procesoPesado(callback) {
    console.log("Iniciando proceso...");

    // Simulamos un procesamiento pesado
    for (let i = 0; i < 50000; i++) {
        console.log("Iteracion");
    }
    callback(); // Cuando termine este pesado bucle imprime -> "Proceso completado"
}

procesoPesado(function() {
    console.log("Proceso completado");
});

console.log("Esto se ejecuta despues del callback");
*/

// Callback asincrono
function procesoAsincrono(callback) {
    console.log("Iniciando proceso asincrono");

    // Ahora esto lo ejecuto en un hilo paralelo de ejecucion
    setTimeout(function() {
        callback(); // Al pasar 5 segundos -> "Proceso asincrono completado"
    }, 5000);
}

procesoAsincrono(() => console.log("Proceso asincrono completado"));

console.log("Esto se ejecuta inmediatamente");


/*=======================================
    Casos de uso comunes de Callbacks
=======================================*/

//////////////////////////////
// 1. Temporizadores (Timers)

// setTimeout: Se ejecuta una sola vez
setTimeout(function() {
    console.log("Esto se ejecuta despues de 1 segundo")
}, 1000);


// setInterval: Se ejecuta permanentemente
// setInterval(() => console.log("Me ejecuto cada medio segundo!"), 500);

let contador = 0;
const intervalo = setInterval(() => {
    contador++;
    console.log(`Contador: ${contador}`);
    if (contador === 5) {
        clearInterval(intervalo);
    }
}, 1000);



////////////////////
// 2. Eventos del DOM
// Ejemplo 1 DOM boton
let boton = document.getElementById("boton");

boton.addEventListener("click", function(event) {
    console.log(`Boton clickeado: ${event.target}`);
});

// Ejemplo 2 DOM form
let miForm = document.getElementById("miForm");

function manejarSubmit(event) {
    // Evita el comportamiento por defecto de elementos HTML (ej envio de datos por defecto de un formulario)
    event.preventDefault(); 
    
    console.log("Formulario enviado a traves de JavaScript");
}

miForm.addEventListener("submit", manejarSubmit);



///////////////////////////
// 3. Operaciones con arrays
let numeros = [1, 2, 3, 4, 5];

numeros.forEach(function(numero, indice) {
    console.log(`Indice: ${indice}, valor: ${numero}`);
});

const duplicados = numeros.map(function(num) {
    return num * 2;
});
console.log(duplicados);


const pares = numeros.filter(function(num) {
    return num % 2 === 0;
});
console.log(pares);



/////////////////////////
// 4. Peticiones HTTP (en JavaScript VIII)



//////////////////////////
// 5. Lectura de archivos (Node.js)



/*==============================
    Ventajas y Desventajas
================================

Ventajas
    - Simplicidad: Facil de entender para operaciones simples
    - Universalidad: Compatible con todos los navegadores
    - Flexibilidad: Permiten crear codigo reutilizables

Desventajas
    - Callback Hell: Anidamiento excesivo que dificulta la lectura
    - Manejo de errores: Complciado con callbacks anidados
    - Flujo de control: Dificil de seguir con operaciones complejas
*/

// Callback hell (pyramid of doom) 
// https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fb8euo2n7twvgh3dbuatd.jpeg

// Ejemplo Visual: callback hell
function procesoCompleto(callback) {
    paso1(function(error, resultado1) {
        if (error) return callback(error);

        paso2(resultado1, function(error, resultado2) {
            if (error) return callback(error);

            paso3(resultado2, function(error, resultado3) {
                if (error) return callback(error);

                paso4(resultado3, function(error, resultadoFinal) {
                    if (error) return callback(error);

                    callback(null, resultadoFinal);
                });

            });

        });

    });

}

/*============================
    Alternativas modernas
==============================

Para evitar el callback hell, se desarrollaron alternativas como

    - Promesas:     .then().catch()
    - Async/Await:  Sintaxis mas legible y limpia
*/

// Ejemplo Visual: Mismo ejemplo de arriba con asnyc/await
async function procesoCompleto() {
    try {
        const resultado1 = await paso1();
        const resultado2 = await paso2(resultado1);
        const resultado3 = await paso3(resultado2);
        const resultadoFinal = await paso4(resultado3);
        return resultadoFinal;

    } catch(error) {
        console.error(`Error: ${error}`);
    }
}

// Auqnue terminemos usando en la mayoria de los casos promesas y async/await, entender callbacks es esencial para trabajar y comprender JavaScript


/*==================================
    Comparacion Callbacks y HOF
====================================

/////////////////////
// Callbacks
    
    - Un callback es simplemente una funcion que pasamos como argumento a otra funcion. Esta funcion sera llamada en algun momento dentro de esa funcion
    
    - Es el uso concreto de pasar una funcion como parametro


/////////////////////    
// HOF (High Order Functions)

Una High Order Function es una funcion que cumple al menos una de estas dos condiciones:

    1. Recibe una o mas funciones como argumentos

    2. Devuelve una funcion como resultado


/////////////////////    
// En resumen

    - Callback: la funcion pasada como argumento
    
    - HOF: La funcion que recibe (o devuelve) funciones

    - Ambas estan relacionadas pero NO son equivalentes: Un callback es usado dentro de una HOF pero no todas las HOF usan callbacks explicitamente (porque pueden devolver funciones en lugar de recibirlas)

*/

// let numeros = [1, 2, 3, 4, 5];

// Ejemplo HOF 1: Recibe callback como argumento
const cuadrados = numeros.map(n => n * n); // map es una HOF porque recibe un callback como argumento


// Ejemplo HOF 2: Devuelve una funcion

// Aca multiplicador es una HOF porque devuelve otra funcion
function multiplicador(factor) {
    return function(x) {
        return x * factor;
    }
}

const duplicar = multiplicador(2); // Devuelve una funcion
console.log(duplicar(5)); // 10


// Ejemplo HOF 3: Devolviendo una funcion
function crearSaludo(saludo) {
    return function(nombre) {
        console.log(`${saludo} ${nombre}`);
    }
}

// Creamos una funcion saludo
const saludaHola = crearSaludo("Holis");
saludaHola("Juan"); // Holis Juan


// Creamos una funcion despedida
const saludaDespedida = crearSaludo("Chau");
saludaDespedida("troesma"); // Chau troesma


/*=======================
    Por que usar HOF?
=========================

    - Abstraccion: Permiten escribir codigo mas abstracto y reutilizable
    - Composicion: Facilitan combinar funcionalidades pequeñas en logicas mas complejas


Ejemplos de HOF en JavaScript

1. forEach: Recorre todos los elementos de un array y ejecuta una funcion sobre cada uno
2. map:     Crea un nuevo array aplicando una funcion a cada elemento del array original
3. filter:  Crea un nuevo array con los elementos que cumplen una condicion
4. reduce:  Acumula los valores del array en un solo valor, segun una funcion reductora
5. sort:    Ordena los elementos del array segun una funcion de comparacion
6. find:    Devuelve l primer elemento del array que cumple una condicion


Ventajas
    - Reduccion de codigo repetitivo
    - Mayor legibilidad y expresividad
    - Composicion funcional: permite encadenar transformaciones como map().filter().reduce()
*/



/*==========================
    Funciones anidadas
============================

En JavaScript una funcion anidada es simplemente una funcion definida dentro de otra funcion.
Es decir, una funcion interna que vive en el ambito lexico (scope) de una funcion externa.
Una funcion anidada es una funcion que:

    - Se declara dentro de otra funcion
    - Tiene acceso a todas las variables y parametros de su funcion externa
    - Puede ser utilizada para organizar mejor el codigo, modularizar la logica o crear closures


Que son?            Funciones declaradas dentro de otras funciones
Acceso a variables  Acceden a variables de su funcion externa (scope lexico)
Privacidad          Las funciones internas son privadas al bloque donde se definen
Usos comunes        Modularizzacion, privacidad, logica auxiliar interna
*/

// Ejemplo basico de funcion anidada
function saludar(nombre) {

    function construirMensaje() { 
        return `Hola, ${nombre}`
    }

    return construirMensaje();
}

console.log(saludar("Ignacio")); // Hola, Ignacio

/*  Explicacion:

    - construirMensaje esta anidada dentro de saludar
    - Tiene acceso a nombre, aunque esta variable no esta definida dentro de ella
    - Esto es posible gracias al scope lexico de JavaScript

Alcance de funciones anidadas:

    - Las funciones anidadas heredan el entorno lexico (lexical scope) de la funcion que las contiene. Esto significa que pueden acceder a las variables de la funcion externa, pero no al reves
*/

function externa() {
    let mensaje = "Hola desde afuera";

    function interna() {
        console.log(mensaje); // Accede a la variable de externa
    }

    interna();
}

externa(); // Hola desde afuera


/*===========================================
    Usos comunes de las funciones anidadas
=============================================

1. Organizacion del codigo

    En vez de escribir una ggran funcion, se pueden definir sub-funciones internas para modularizar la logica
*/

function procesarTexto(texto) {

    function limpiar(t) {
        return t.trim().toLowerCase();
    }

    function contarPalabras(t) {
        // Ej: En la cadena "Hola mundo", la expresión /\s+/ identificaría los tres espacios entre las palabras como una única coincidencia.
        return t.split(/\s+/).length;
    }

    const limpio = limpiar(texto);
    return contarPalabras(limpio);
}

console.log(procesarTexto("Yo subi y baje TRAMBOLIKO    "));

/*
2. Funciones helper privadas

    Las funciones internas no son accesibles desde fuera, lo cual simula privacidad
*/

function crearUsuario(nombre) {
    function validarNombre(n) {
        return typeof n === "string" && n.length > 2;
    }

    if (!validarNombre(nombre)) {
        throw new Error("Nombre no valido");
    }

    return { nombre }
}

/*=====================
    Consideraciones
=======================

    - Las funciones anidadas no estan disponibles fuera del scope donde se definen, a menos que se retornen o se expongan explicitamente
    - Demasiadas funciones anidadas pueden definicular la legibilidad si no estan bien organizadas
*/



/*==========================
    Destructuring
============================

En JavaScript, el destructuring es una sintaxis que permite extraer valores de arrays o propiedades de objetos y asignarlos a variables de forma concisa.

Que es el Destructuring?

    Es una forma de "descomponer" o "desestructurar" estructuras de datos como arrays y objetos en variables individuales, sin necesidad de acceder manualmente a cada elemento o propiedad


Por que usar Destructuring?

    - Mejora la legibilidad del codigo
    - Facilita el acceso rapido a datos de estructuras complejas
    - Reduce la verbosidad (menos lineas para obtener lo mismo)
*/

// Destructuring en arrays
// Ej sin destructuring
let listaNums = [1, 2, 3];
let uno = listaNums[0];
let dos = listaNums[1];
console.log(uno, dos); // 1 2


// Ej con destructuring
let [primero, segundo] = listaNums;
console.log(primero, segundo); // 1 2


// Destructuring en objetos
// Ej sin destructuring
let persona = { nombre: "Tomas", edad: 27 };
let nombrePersona = persona.nombre;
let edadPersona = persona.edad;

// Ej con destructuring
let { nombre, edad} = persona;
console.log(nombre, edad); // Tomas 25


//////////////////////////////////
// Caracteristicas y usos avanzados

// 1. Asignar a nuevas variables
let { nombre: n, edad: e} = persona;
console.log(n, e); // Tomas 25


// 2. Destructuring con valores por defecto (en el caso de que el objeto no tenga ese valor)
let capo = { apodo: "Maty" };
let { apodo, ciudad = "Desconocida" } = capo;
console.log(apodo, ciudad); // Maty Desconocida


// 3. Destructuring en parametros de funcion
function saludar({nombre, edad}) {
    console.log(`Holis ${nombre} tenes ${edad} años`);
}

// En este ejemplo le pasamos un objeto y hacemos el destructuring adentro del parametro de la funcion
saludar(persona); // Holis Tomas tenes 27 años


// 4. Destructuring de arrays con valores omitidos
let [first, ,third] = [10, 20, 30];
console.log(first, third); // 10 30


// 5. Rest operator con destructuring
let [a, ...resto] = [1, 2, 3, 4];
console.log(a); // 1
console.log(resto); // [2, 3, 4]


let { apellido, ...otros } = { apellido: "Scherneski", edad:23, pais: "El tricampeon mundial, papa"};
console.log(otros); // {edad: 23, pais: 'El tricampeon mundial, papa'}


/*==========================
    Spread Operator
============================

El spread operator o operador de propagacion, denotado por (...) es una sintaxis introducida en ES6 (EcmaScript 2015) que permite descomponer elementos iterables (como arrays, strings y objetos) en elementos individuales.

Su funcion principal es copiar, combinar o expandir estructuras de datos de manera eficiente


Como funciona?

    El Spread opraetor trabaja a nivel de valores individuales, extrayendo cada elemento de un iterable y colocandolos en el contexto donde se usa.
    Su implementacion depende del motor de JS pero conceptualmente realiza lo siguiente

    Cuando el einterprete encuentra ...iterable, automaticamente
        1. Convierte el iterable en una secuencia de valores individuales
        2. Propaga esos valores en el nuevo contexto (array, objeto, llamada a funcion)
        3. No modifica el original (es inmutable por defecto)
*/

////////////////////////////
// 1. Spread operator en Arrays

const original = [1, 2, 3];
const copia = [...original];

console.log(copia); // [1, 2, 3]

/*  Comprendiendo la Copia Supercial o Shallow Copy

    - No es una referencia: Cambios en copia no afectan a original
    - Solo copia un nivel: Si hay objetos anidados, estos si se referencian

Que significa que solo copia un nivel?
    El spread operator copia el array de afuera, pero NO copia lo que hay adentro si son objetos o arrays

    const original = [1, 2, 3];
    const copia = [...original];

    En este ejemplo todo funciona bien porque los numeros son simples

    copia[o] = 999; // El original no cambia


El problema de la Shallow Copy aparece con objetos

    const originalObj = [
        { nombre: "Agustin" }
    ];

    const copiaObj = [...originalObj];


    Esto puede parecer una copia copmleta pero no lo es, el objeto { nombre: "Agustin" } sigue siendo el mismo para ambos arrays

    copiaObj[0] = "Gabriel";

    console.log(originalObj); // Muestra nombre "Gabriel"

    Tambien cambio el original


Solo un nivel significa
- Copia el array externo
- No copia los objetos internos y los arrays internos
*/

////////////////////////////
// 2. Concatenacion de Arrays

let arr1 = [1, 2];
let arr2 = [3, 4];
let combinado = [...arr1, ...arr2];
console.log(combinado); // [1, 2, 3, 4]

// Mas eficiente que contat(), tiene mejor rendimiento en motores modernos


////////////////////////////
// 3. Uso con otros iterables

let str = "Holis";
let caracteres = [...str];
console.log(caracteres); // ['H', 'o', 'l', 'i', 's']

// Convierte strings en arrays sin usar split("")

////////////////////////////
// 4. Copia superficial de objetos

let obj1 = {a: 1, b: 2};
let obj2 = { ...obj1};
console.log(obj2); // {a: 1, b: 2}


////////////////////////////
// 5. Combinacion de objetos

let defaults = { theme: "dark", fontSize: 14 };
let userSettings = { fontSize: 18 };
// Las propiedades posteriores sobreescriben a las anteriores
let finalConfig = {...defaults, ...userSettings};

console.log(finalConfig); // { theme: 'dark', fontSize: 18 }


////////////////////////////
// 6. Pasar argumentos desde un array
let sum = (a, b, c) => a + b + c;
let listaNumeros = [1, 2, 3];
console.log(sum(...listaNumeros)); // 6


////////////////////////////
// 7. Recoger argumentos restantes
function logArgs(first, ...rest) {
    console.log(first);
    console.log(rest);
}

logArgs("a", "b", "c");
// a
// ['b', 'c']

/*================
    Conclusion
==================

    - Manipular arrays (copiar, concatenar)
    - Combinar objetos (inmutabilidad, mezcla de propiedades)
    - Pasar argumentos a funciones
*/
```

---


## JavaScript VI / Manipulacion del DOM y Eventos

### [Que es el DOM?](https://www.w3schools.com/js/js_htmldom.asp)
El DOM HTML o Document Object Model (Modelo de Objetos del Documento) representa un documento HTML como una estructura jerarquica de objetos.

Conocida como arbol DOM (DOM tree), esta estructura permite a los programas, especialmente con JS, acceder, modificar, añadir o eliminar elementos, contenido, estilos y atributos del documento de forma dinamica.

Cada elemento HTML se convierte en un nodo dentro de este arbol y todos los elementos estan relacionados entre si mediante padres, hijos y hermanos, creando una representacion en memoria del documento que el navegador puede manipular.

El DOM actua como una "guia de direcciones" para la pagina web, permitiendo identificar y manipular elementos especificos como elementos de entrada, etiquetas, etc. El DOM permite añadir eventos a estos elementos para crear paginas web interactivas que respondan a acciones del usuario, como clicks o pulsaciones de teclas.

#### En resumen

- DOM (Modelo de Objetos de Documento) es una **representacion en memoria de la estructura de una pagina web**. Transforma el HTML en una estructura de nodos y objetos que puede ser manipulada mediante JavaSCript

- Cada etiqueta HTML es un nodo en el DOM

- El DOM permite que JavaScript modifique el contenido, la estructura y el estilo de una pagina

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Mi pagina</title>
    </head>
    <body>
        <h1>Bienvenida</h1>
        <p>Esto es un parrafo</p>
    </body>
</html>
```

- Este HTML seria representado en el DOM como una estructura en forma de arbol. 
- `document` es el objeto que representa toda la pagina web

#### Diagrama de arbol del DOM
- document
    - html
        - head
            - title
        - body
            - h1
            - p


### Como funciona la manipulacion del DOM?
JavaScript puede acceder y modificar cualquier elemento del DOM utilizando el objeto global `document`, podrá:
- **Modificar el contenido** (texto, atributos, clases)
- **Añadir o eliminar elementos** del DOM
- **Escuchar eventos** del usuario (clicks, pulsaciones de teclas, etc)

```js
/*=========================================
    Seleccion de elementos en el DOM
===========================================

    getElementById()

- Selecciona un unico elemento por su id (si no se encuentra, devuelve null)
- Solo selecciona el primer elemento que coincida con el id
*/

// Guardamos nuestro elemento <h1> en una variable
let titulo = document.getElementById("titulo");
console.log(titulo); // <h1 id="titulo">JavaScript Div 131</h1>
console.log(titulo.textContent); // JavaScript Div 131

/*
    querySelector() y querySelectorAll()

- querySelector(): Selecciona el PRIMER elemento que coincida con un selector CSS (clase, id, nombre etiqueta)

- querySelectorAll(): Selecciona TODOS los elementos que coincidan con el selector CSS y devuelve algo similar a un array, una lista de nodos o NodeList
*/

let primerParrafo = document.querySelector(".mensaje");
console.log(primerParrafo.textContent); // Primer parrafo

let listaParrafos = document.querySelectorAll(".mensaje");
console.log(listaParrafos);

listaParrafos.forEach(parrafo => console.log(parrafo.textContent)); 
// Primer parrafo 
// Segundo parrafo


/*=====================================
    Modificar contenido y atributos
=======================================

- textContent: Modificar el texto dentro de un elemento
- innerHTML: Mmodifica el contenido HTML dentro de un elemento
- setAttribute(): Modifica los atributos de un elemento
- style: Permite cambiar el estilo CSS en linea de un elemento
*/

// Cambiamos el texto
primerParrafo.textContent = "Nuevo texto desde JavaScript";

// Modificamos el contenido HTML
primerParrafo.innerHTML = `
    <strong>Nuevo texto en negrita</strong>
`;

// Seleccionamos el elemento <button> por su id
let boton = document.getElementById("boton");

// Cambiamos el atributo id
boton.setAttribute("id", "nuevoId");

// Cambiar el estilo
boton.style.color = "white";
boton.style.backgroundColor = "purple";
boton.style.border = "2px solid";
boton.style.borderRadius = "5px";
boton.style.padding = "10px";

// Vamos a inyectarle codigo HTML a el contenedorTabla
let contenedorTabla = document.getElementById("contenedorTabla");

let btn_tabla = document.getElementById("btn-tabla");

btn_tabla.addEventListener("click", function() {
    contenedorTabla.innerHTML = htmlTabla;
});


let htmlTabla = `
<table>
    <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
    </tr>
    <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
    </tr>
    <tr>
        <td>Berglunds snabbköp</td>
        <td>Christina Berglund</td>
        <td>Sweden</td>
    </tr>
    <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
    </tr>
</table>
`;


/*===========================
    Eventos en JavaScript
=============================

Los eventos en JavaSCript permiten a los desarrolladores dectectar interacaciones del usuario con la pagina web, como hacer click en un boton, mover el mouse, escribir en un campo de texto. Los eventos son fundamentalaes para hacer que una pagina web sea interactiva.

Que es un evento?
Un evento es una SEÑAL que se envía cuando ocurre una interaccion o cambio en el documento.
JavaScript permite escuchar estos eventos y ejecutar funciones cuando ocurren


///////////////////////////
// Tipos de eventos

- Eventos de mouse: click, mouseover, mouseout, mousemove
- Eventos de teclado: keydown, keyup
- Eventos de formulario: submit, change, input, focus
- Eventos de ventana: resize, scroll, load, unload
*/

// Vamos a agarrar el elemento boton y le añadimos un escuchador de eventos -> Le asignamos a <button> un proceso en permanente ejecucion
boton.addEventListener("click", function() {
    alert("Me hiciste click, maquina");
});


let input_texto = document.getElementById("input_texto");
// El objeto event me proporciona info sobre el evento que se disparo
input_texto.addEventListener("keydown", event => console.log(`Tecla presionada: ${event.key} / Codigo: ${event.code}`));

// Solo necesitamos incluir event si vamos a usar info sobre el evento


/*=============================
    Propagacion de eventos
===============================

Cuando ocurre un evento, este se propaga a traves del DOM en 2 fases:

- Fase de captura (de arriba hacia abajo)
- Fase de burbuja (de abajo hacia arriba)
*/

let padre = document.getElementById("padre");
let hijo = document.getElementById("hijo");

// Escuchar click en el div padre
padre.addEventListener("click", () => console.log("Se hizo click en el div padre"));

// Escuchar click en el boton hijo
hijo.addEventListener("click", (event) => {
    event.stopPropagation(); // Detengo la propagacion
    console.log("Se hizo click en el boton hijo")
});
```

---


## JavaScript V / Objetos globales, almacenamiento persistente. Iteracion en arrays, objetos y arrays de objetos

### Objetos globales
En JavaScript, los objetos globales son aquellos que estan disponibles en todo el entorno de ejecucion sin necesidad de impotarlos o declararlos explicitamente.

Por entorno de ejecucion, nos referimos a donde se esta ejecutando JavaScript, puede ser el Navegador o Node.js. Ambos tienen internamente un motor que ejecuta este lenguaje.

El proposito facilitar el acceso a ciertas funciones y valores predeterminados.

#### Objetos globales en el navegador
En el entorno del navegador, los objetos globales incluyen todos los objetos estandar de JavaScript (`Array`, `String`, `Object`, etc) asi como un conjunto de objetos especificos para la interaccion con la pagina web y su entorno.

El objeto global principal en el entorno del navegador es `window`. Este objeto representa la ventana del navegador y actua como el contenedor global para todas las funciones y objetos globales en una pagina web. Todos los objetos y funciones definidos en el ambito global estan automaticamente disponibles como propiedades del objeto `window`.

#### Objetos y metodos impotantes del objeto `window`

- `document`: Representa el [DOM](https://www.w3schools.com/js/js_htmldom.asp) de la pagina web actual, permitiendo el acceso y la manipulacion de elementos HTML. 
*Trabajaremos con document en JavaScript VI*

```html
<p id="miParrafo">Soy un parrafo</p>
```
```js
// Selecciono el parrafo por su id y lo guardo en una variable
let parrafo = document.getElementById("miParrafo");
```

- `alert()`, `prompt()` y `confirm()`: Son metodos que permiten mostrar dialogos al usuario y recoger input
```js
alert("Holis desde una ventana flotante");
```

- `setTimeout()` y `setInterval()`: Metodos para programar la ejecucion de codigo despues de un tiempo (setTimeout) o en intervalos regulares (setInterval)
```js
setTimeout(() => console.log("Hola despues de 2 segundos"), 2000);
```

- `location`: Proporciona URL sobre la pagina actual y permite redireccionar a otras URL
```js
console.log(window.location.href); //URL actual
```

- `navigator`: Contiene info sobre el navegador, la version, agente de usuario y geolocalizacion
```js
console.log(navigator.userAgent); // Info del navegador
```

- `console`: Proporciona acceso a la consola del navegador para mostrar mensajes de depuracion
```js
console.log("Mensaje por consola");
```

- `localStorage` y `sessionStorage`: Permiten almacenar datos en el navegador de forma persistente o temporal

- `history`: Proporciona acceso al historial de navegacion del navegador


### Por que en JavaScript son todo objetos?
Aunque no todos los tipos de datos en JS son objetos, muchos tipos de datos tienen comportamiento de objeto o estan envueltos en un objeto.

1. **Datos primitivos**: strings, numeros, booleanos, null y undefined son tipos primitivos. Pero JavaScript convierte temporalmente los strings y los numeros y los convierte en un *"objeto envoltorio"* para proporcionarnos acceso a metodos como `toUpperCase()`. A esto se llama "Object Wrappers" o envolvedores de objetos.

```js
let texto = "Holis";
// En que momento el string tiene metodos? Esto es por los object wrappers!
console.log(texto.toUpperCase()); // HOLIS
```

2. **Funciones**: En JavaScript las funciones son objetos de tipo `Function`, lo que permite asignarlas a variables o pasarlas como argumentos.

3. **Arrays**: Los arrays tambien son objetos en JavaScript, aunque tienne un comportamiento especial, ya que es un objeto que organiza sus datos mediante indices numerados

4. **Objetos globales**: Todo el entorno de ejecucion esta basado en objetos globales. `window` en el navegador o `global` en Node.js.

```js
/*==============================================
    Almacenamiento de datos en JavaScript
*===============================================

En JS, almacenar datos implica elegir la estructura adecuada de acuerdo con el tipo de info que se quiere guardar y como se desea manipular. Entre los tipos basicos para almacenar datos tenemos:

- Variables simples: Para valores unicos como strings o numeros

- Objetos: Para representar datos complejos con propiedades

- Arrays: Para almacenar una lista ordenada de elementos del mismo tipo

- Arrays de objetos: Para almacenar listas de elementos complejos que contienen multiples propiedades


=====================
    Objetos
=====================

Un objeto es una coleccion de propiedades, donde cada propiedad tiene una clave y un valor.
Los objetos son ideales para representar una unica entidad o elemento que tiene varias propiedades o atributos.

Cuando usar objetos?

    - Cuando deseamos representar una ENTIDAD UNICA con multiples atributos

    - Cuando sabemos que no habra multiples instancias o copias de estos datos en la aplicacion
    
    - Cuando necesitamos acceder a propiedades especificas mediante sus nombres
*/
let persona = {
    nombre: "Ignacio",
    edad: 20,
    ocupacion: "pintor"
}


/*=======================
    Arrays de objetos
=========================

Si necesitamos almacenar varias instancias del mismo tipo de entidad (lista de preosnasa, productos, pedidos, ble) utilizaremos un array de objetos.

Un array de objetos es una estructura que permite almacenar multiples objetos, donde cada objeto tiene la misma estructura o contiene atributos similares


Cuando usar arrays de objetos?

    - Cuando necesitamos almacenar multiples instancias de una misma entidad o estructura de datos

    - Cuando planeamos realizar operaciones sobre una lista de elementos como iteraciones, filtrados, etc

    - Si necesitamos aplicar metodos de arrays como map, filter, reduce, find, etc


Ejemplos de casos de uso
    - Listado de usuarios registrados en una plataforma
    - Inventario de productos en una tienda
    - Historial de transacciones o registros
    - etc
*/
// personas es un array de objetos que almacena multiples elemnetos, cada elemento representa a una persona con sus propiedades
let personas = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor" },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador" },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero" },
];



/*=====================================
    Almacenamiento persistente en JS
=======================================

El almacenamiento en JavaScript es una parte fundamental para crear aplicaciones web que puedan recordar informacion del usuario entre sesiones o durante la navegacion.

sessionStorage y localStorage son mecanismos del navegador para almacenar datos del lado del cliente.


///////////////////
// localStorage

localStorage nos permite almacenar datos de forma persistente en el navegador.

Los datos almacenados en local no tienen una fecha de expiracion, por lo que estaran disponibles incluso despues de que el usuario cierre el navegador o apague la compu

Uso principal
    - Guardar datos que persistan al cerrar el navegador
    - Almacenar configuraciones de usuario, temas, carrito, etc

Caracteristicas
    - 5-10 MB
    - Persistente (no tiene expiracion)
    - Accesible solo desde JS, no se envia al servidor
    - Sincrono

Metodos
    - Guardar datos:    localStorage.setItem(key, value)
    - Leer datos:       localStorage.getItem(key, value)
    - Borrar datos:     localStorage.removeItem(key)
    - Borrar todo:      localStorage.clear()

/////////////////////
//  sessionStorage

Muy similar a localStorage, pero a diferencia de este, los daots en session solo se mantienen disponibles durante la sesion del navagador. Cuando cerramos la pestaña o ventana dle navegador, los datos se eliminan automaticamente

Uso principal
    - Guardar datos temporales mientras la pestaña del navegador este abierta
    - Informacion de formularios o pasos de navegacion en ua misma sesion

Caracteristicas
    - 5-10 MB
    - Se borra al cerrar la pestaña
    - Accesible solo desde JS, no se envia al servidor
    - Sincrono

Metodos
    - Guardar datos:    sessionStorage.setItem(key, value)
    - Leer datos:       sessionStorage.getItem(key, value)
    - Borrar datos:     sessionStorage.removeItem(key)
    - Borrar todo:      sessionStorage.clear()
*/

// Guardar datos
localStorage.setItem("nombre", "Kevin");

// Leer datos
let datosNombre= localStorage.getItem("nombre");
console.log(datosNombre);

// Eliminamos datos
localStorage.removeItem("idioma");

// Borrar todo el local
// localStorage.clear();


/* Ahora vamos a guardar nuestra lista de personas dentro del local

let personas = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor" },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador" },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero" },
];

Pero localStorage y sessionStorage solo almacenan texto plano! no arrays de objetos u otro tipo de info

Que hacer?
Vamos a tener que CONVERTIR toda nuestra informacion en texto plano, cuando hablamos de texto plano, hablamos de un string

JSON es un formato de texto plano.
Es un formato muy popular para el envio de informacion que se estructura igual que los objetos en JavaScript, mediante clave-valor. 
De ahi el nombre de JavaScript Object Notation

Tenemos dos metodos a diposicion para convertir datos a texto plano y viceversa.
*/

// Vamos a transformar el array de objetos en JSON
let personasJSON = JSON.stringify(personas); // Convertimos a texto plano JSON cualquier dato

console.log(personasJSON); 
/*
[{"nombre":"Ignacio","edad":20,"ocupacion":"pintor"},{"nombre":"Kevin","edad":25,"ocupacion":"boxeador"},{"nombre":"Santiago","edad":22,"ocupacion":"almacenero"}]
*/

// Ahora guardamos este JSON en el localStorage
localStorage.setItem("personas", personasJSON);
/*
let listaComida = [
    { id: 1, nombre: "Huevos revueltos", cantidad: 2 },
    { id: 2, nombre: "Banana", cantidad: 1 },
    { id: 3, nombre: "Pera", cantidad: 1 },
    { id: 4, nombre: "Mandarina", cantidad: 2 },
];

localStorage.setItem("desayuno", JSON.stringify(listaComida));
*/

// Al consultar este dato en el local, lo tengo en JSON
console.log(localStorage.getItem("desayuno"));

// Ahora para poder trabajar con estos datos como array de objetos, no como texto plano tengo que parsearlo (string -> objeto)
let desayunoJSON = localStorage.getItem("desayuno");
let miDesayuno = JSON.parse(desayunoJSON);

console.log(miDesayuno);



/*================================
    Iterando estas estructuras
==================================

///////////////////////
// Metodos clasicos ES5 y anteriores

////////////////////
//  for clasico
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }

- Ventajas: Maximo control, podemos usar break y continue
- Desventajas: Mas verboso! (mas dificil de leer)
*/
let numeros = [1, 2, 3, 4, 5];

// Ejemplo 1: sumar elementos
let numeroSumado = 0;

for (let i = 0; i < numeros.length; i++) {
    numeroSumado += numeros[i];
}

console.log(numeroSumado); // 15


// Ejemplo 2: Buscar elemento que empiece por "ban"
let frutas = ["manzana", "banana", "naranja"];
let frutaEncontrada;

for (let i = 0; i < frutas.length; i++) {
    if (frutas[i].startsWith("ban")) {
        frutaEncontrada = frutas[i];
        break;
    }
}

console.log(frutaEncontrada); // banana


// Ejemplo 3, filtraremos objetos caros > 30 lucas
let productos = [
    { id: 1, nombre: "Laptop", precio: 500000 },
    { id: 2, nombre: "Mouse", precio: 15000 },
    { id: 3, nombre: "Monitor", precio: 100000 },
    { id: 4, nombre: "Teclado", precio: 30000 },
    { id: 5, nombre: "Microfono", precio: 20000 },
];

// Necesito crear un nuevo array con los productos filtrados
let productosCaros = [];

for (let i = 0; i < productos.length; i++) {
    if (productos[i].precio > 30000) {
        productosCaros.push(productos[i]);
    }
}

console.log(productosCaros);
/*[
    {
        "id": 1,
        "nombre": "Laptop",
        "precio": 500000
    },
    {
        "id": 3,
        "nombre": "Monitor",
        "precio": 100000
    }
]*/


/*//////////////////
//  forEach()
    
    array.forEach((elemento, indice) => {
        console.log(elemento, indice)
    })

- Ventajas: Sintaxis limpia, facil de leer y no necesita contador
- Desventajas: No se puede romper el bucle (no break)
*/

// Ejemplo 1: Imprimir elementos
let colores = ["rojo", "verde", "azul"];

// Opcion con funcion declarada
colores.forEach(function(color) {
    console.log(color)
}); // rojo verde azul

// Opcion con funcion flecha
colores.forEach(color => console.log(color)); // rojo verde azul

// Ejemplo 2: Modificar array externo, guardar duplicados en un nuevo array
// let numeros = [1, 2, 3, 4, 5];
let numerosDobles = [];

numeros.forEach(numero => numerosDobles.push(numero * 2));
console.log(numerosDobles);


// Ejemplo 3: Actualizar propiedades 6 o mas -> aprobado: true
let alumnos = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor", nota: 8 },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador", nota: 10 },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero", nota: 4 },
    { nombre: "Tomas", edad: 26, ocupacion: "actor", nota: 5 },
    { nombre: "Maty", edad: 22, ocupacion: "escultor", nota: 7 },
    { nombre: "Ramiro", edad: 30, ocupacion: "peleador de mma", nota: 2 },
];

alumnos.forEach(alumno => {
    // Nos ahorramos un if, poniendo una expresion que devuelve true /false
    alumno.aprobado = alumno.nota >= 6;
});

console.log(alumnos);

// Ejemplos de expresiones booleanas
console.log(5 > 8); // false
console.log(4 > 2); // true


/*/////////////////////
// Metodos funcionales ES5+

///////////////////
//  map()
    
    const nuevosValores = array.map(elemento => elemento * 2)

- Proposito: Transformar cada elemento (realiza una operacion con cada elemento)
- Retorna: Un nuevo array con los resultados
*/

// Ejemplo 1: Crear un array con cuadrados
// let numeros = [1, 2, 3, 4, 5];
let cuadrados = numeros.map(num => num * num);
console.log(cuadrados); // [1, 4, 9, 16, 25]

// Ejemplo 2: Convertir a strings -> Nuevo array con "Tengo x años"
let edades = [18, 25, 42, 27];
let edadesString = edades.map(edad => `Tengo ${edad} años`);
console.log(edadesString); // ['Tengo 18 años', 'Tengo 25 años', 'Tengo 42 años', 'Tengo 27 años']


/* Ejemplo 3: Extraer los nombres

let alumnos = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor", nota: 8 },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador", nota: 10 },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero", nota: 4 },
    { nombre: "Tomas", edad: 26, ocupacion: "actor", nota: 5 },
    { nombre: "Maty", edad: 22, ocupacion: "escultor", nota: 7 },
    { nombre: "Ramiro", edad: 30, ocupacion: "peleador de mma", nota: 2 },
];
*/

// Todas estas opciones hacen lo mismo

// Opcion 1: Funcion flecha en una sola linea
let nombresAlumnos = alumnos.map(alumno => alumno.nombre);

// Opcion 2: Funcion flecha en mas de una linea y con paremetro con parentesis
let nombresAlumnos2 = alumnos.map((alumno) => {
    return alumno.nombre;
});

// Opcion 3: Funcion declarada
let nombresAlumnos3 = alumnos.map(function(alumno) {
    return alumno.nombre;
});

console.log(nombresAlumnos); // ['Ignacio', 'Kevin', 'Santiago', 'Tomas', 'Maty', 'Ramiro']

console.log(nombresAlumnos2); // ['Ignacio', 'Kevin', 'Santiago', 'Tomas', 'Maty', 'Ramiro']
console.log(nombresAlumnos3); // ['Ignacio', 'Kevin', 'Santiago', 'Tomas', 'Maty', 'Ramiro']


/*////////////////
//  filter()
    
    const filtrados = array.filter(elemento => elemento > 10);

- Proposito: Seleccionar los elementos que cumplan una condicion
- Retorna: Un nuevo array con los elementos filtrados
*/
// Ejemplo 1: Filtrar numeros pares
// let numeros = [1, 2, 3, 4, 5];
let numerosPares = numeros.filter(numero => numero % 2 === 0);
console.log(numerosPares); // [2, 4]

/*
if (numero % 2 === 0) {
    // Codigo a ejecutar si la expresion anterior devuelve true
}
*/

// Ejemplo 2: Filtrar strings largos > 4 caracteres
let palabras = ["hola", "holita", "vecinito", "crisol", "ndeah", "lore"];
let stringsLargos = palabras.filter(palabra => palabra.length > 4);
console.log(stringsLargos); // ['holita', 'vecinito', 'crisol', 'ndeah']


/* Ejemplo 3: Filtrar alumnos mayores a 21
let alumnos = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor", nota: 8 },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador", nota: 10 },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero", nota: 4 },
    { nombre: "Tomas", edad: 26, ocupacion: "actor", nota: 5 },
    { nombre: "Maty", edad: 22, ocupacion: "escultor", nota: 7 },
    { nombre: "Ramiro", edad: 30, ocupacion: "peleador de mma", nota: 2 },
];
*/

let alumnosMayores = alumnos.filter(alumno => {
    return alumno.edad >= 25;
});
console.log(alumnosMayores);
/*
[
    {
        "nombre": "Kevin",
        "edad": 25,
        "ocupacion": "boxeador",
        "nota": 10,
        "aprobado": true
    },
    {
        "nombre": "Tomas",
        "edad": 26,
        "ocupacion": "actor",
        "nota": 5,
        "aprobado": false
    },
    {
        "nombre": "Ramiro",
        "edad": 30,
        "ocupacion": "peleador de mma",
        "nota": 2,
        "aprobado": false
    }
]
*/

/*////////////////
//  reduce()
    
    const suma = array.reduce((acumulador, elemento) => acumulador + elemento, 0)

- Proposito: Reducir el array a un unico valor
- Retorna: Valor acumulado
*/

let decenas = [10, 20, 30];
let sumaDecenas = decenas.reduce((acumulador, numero) => acumulador + numero, 0);

// El 0 es el valor inicial, ojo indica que es Number y que es 0
console.log(sumaDecenas); // 60

let ventas = [
    { producto: "Camisa", cantidad: 3, precio: 25 },
    { producto: "Pantalon", cantidad: 2, precio: 40 },
    { producto: "Zapatos", cantidad: 1, precio: 80 },
];

let totalVentas = ventas.reduce((total, producto) => {
    return total + (producto.precio * producto.cantidad)
}, 0); 

// El valor inicial de 0 le indica que el total es un Number y es un 0 y ahora me permitira hacer la suma
console.log(totalVentas); // 235

// Si yo no pongo el valor inicial, que indica valor y tipo, me concatena un objeto con dos valores numeros en un string [object Object]8080


// Recuerden, el primer parametro de estos metodos siempre representa CADA ELEMENTO DE LA ITERACION (numero, objeto, etc)

/*////////////////
//  find() y findIndex()
    
    const encontrado = array.find(elemento => elemento.id=== 123);
    const indice = array.findIndex(elemento => elemento.id === 123);

- Proposito: Buscar el primer elemento que cumpla una condicion
- Retorna: Elemento o indice (o undefined/-1 si no encuentra)
*/

// Ejemplo 1: Buscar numero > 10
const numerosRandom = [5, 12, 8, 130, 44];
const encontrado = numerosRandom.find(num => num > 10);
console.log(encontrado); // 12

/* Recuerden! const encontrado = numerosRandom.find(num => num > 10);

Lo que sucede adentro de find es una funcion

numerosRandom.find(function(num) {
    return num > 10
    }
);
*/

// Ejemplo 2: Buscar objeto por propiedad
let usuariosForo = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor", nota: 8, activo: true, rol: "user" },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador", nota: 10, activo: false, rol: "admin"  },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero", nota: 4, activo: false, rol: "user"  },
    { nombre: "Tomas", edad: 26, ocupacion: "actor", nota: 5, activo: true, rol: "user"  },
    { nombre: "Maty", edad: 22, ocupacion: "escultor", nota: 7, activo: true, rol: "admin"  },
    { nombre: "Ramiro", edad: 30, ocupacion: "peleador de mma", nota: 2, activo: false, rol: "user"  },
];

let usuarioActivo = usuariosForo.find(usuario => usuario.activo);
console.log(usuarioActivo)


// Ejemplo 3: Encontrar el indice del numero > 100
let indiceEncontrado = numerosRandom.findIndex(num => num > 100);
console.log(indiceEncontrado); // 3, que es la posicion del 130 en el array


/*////////////////
//  some() y every()
    
    const algunoCumple = array.some(elemento => elemento > 0);
    const todosCumplen = array.every(elemento => elemento > 0)

- Proposito: Verificar si alguno / todos cumplen una condicion
- Retorna: Booleano
*/

// Ejemplo 1: Verificar si hay numeros pares
let listaNumeros = [1, 3, 5, 7, 8];
let hayPares = listaNumeros.some(num => num % 2 === 0);
console.log(`Hay pares? : ${hayPares}`);


// Ejemplo 2: Verificar si hay usuarios admin
let hayAdmin = usuariosForo.some(user => user.rol === "admin");
console.log(`Hay admin? : ${hayAdmin}`);


// Ejemplo 3: Verificar si todos son positivos
// Vamos a verificar que todos los elementos de listaNumeros cumplan una condicion -> every elemento of listaNumeros
let todosPositivos = listaNumeros.every(num => num > 0);
/* Opciones para escribir esta funcion
// Funcion flecha en una sola linea
    listaNumeros.every(num => num > 0);

// Funcion flecha en mas de una instruccion y con parentesis (opcional)
    listaNumeros.every((num) => {
        return num > 0;
    });

// Funcion declarada
    listaNumeros.every(function(num) {
        return num > 0
    });
*/

console.log(`Todos positivos? : ${todosPositivos}`);


/*////////////////
//  for ... of
    
    for (let elemento of array) {
        console.log(elemento);

        if(elemento === "algo") {
            break; // Podemos usar break
        }
    }


- Ventajas: Sintaxis limpia, permite break y continue
- Desventajas: No provee indice automatico
*/

// Ejemplo 1: Iterar con posibilidad de break
const simbolos = ['€', '$', '¥', '£'];

for (let simbolo of simbolos) {
    if (simbolo === '¥') {
        break;
    }
    console.log(simbolo);
}


// Ejemplo 2: Iterar objetos: Buscaremos el usuario con < 5
/*
let usuariosForo = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor", nota: 8, activo: true, rol: "user" },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador", nota: 10, activo: false, rol: "admin"  },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero", nota: 4, activo: false, rol: "user"  },
    { nombre: "Tomas", edad: 26, ocupacion: "actor", nota: 5, activo: true, rol: "user"  },
    { nombre: "Maty", edad: 22, ocupacion: "escultor", nota: 7, activo: true, rol: "admin"  },
    { nombre: "Ramiro", edad: 30, ocupacion: "peleador de mma", nota: 2, activo: false, rol: "user"  },
];
*/

for (let usuario of usuariosForo) {
    if (usuario.nota < 5) {
        console.log(`El alumno ${usuario.nombre} sacó menos de un 5`);
        break;
    }
}

/*==========================
    Comparacion
============================

1. Bucles clasicos: Son los mas rapidos
    for y while

2. Bucles funcionales: Son mas lentos pero mas faciles de leer
    map, filter, etc

3. for...of: Ofrece un buen equilibrio entre rendimiento y legibilidad



==============================
    Recomendaciones de uso
==============================

Transformar array:      map()
Filtrar elementos:      filter()
Reducir a un valor:     reduce()
Buscar elemento:        find()
Facil de leer:          for...of, forEach()
Permite romper bucle:   for, while, for...of
Verificar condiciones:  some() y every()
*/
```

---

## JavaScript IV / Introduccion a arrays y objetos. Metodos de strings y arrays
```js
/*=========================================
    Introduccion a arrays y objetos
===========================================

En JavaScript, los arrays y objetos son estructuras de datos fundamentales.
    - Los arrays se utilizan para almacenar una lsita ordenada de elementos
    - Los objetos son ideales para almacenar datos con propiedades clave-valor


====================
    Arrays
====================

Un array es una LISTA ORDENADA de elementos, donde cada uno, tiene una posicion o indice.
Los arrays en JavaScripit son muy flexibles: pueden contener cualquier tipo de dato (numeros, strings, booleanos, otros arrays, objetos, funciones, etc) y los elementos no tienen que ser del mismo tipo
*/

let colores = ["rojo", "verde", "azul"];
console.log(colores[0]); // rojo
console.log(colores[2]); // azul


/*==================
    Objetos
====================

Un objeto en JavaScript es una coleccion de pares clave-valor.
Las claves son strings que identifican a cada valor, lo que permite un acceso rapido y estructurado a los datos.

Tenemos varias maneras de acceder a las propiedades de un objeto:

    - Notacion de punto:        persona.nombre
    - Notacion de corchetes:    persona["edad"]
*/

let alumno = {
    nombre: "Gabriel",
    edad: 25,
    ciudad: "Temperley"
};

// Notacion de punto
console.log(alumno.nombre);

// Notacion de corchete
console.log(alumno["ciudad"]);


// Metodos de objetos: Los objetos pueden tener metodos, que son funciones almacenadas en una propiedad

let zorro = {
    nombre: "Marcelo",
    haceSonido: function() {
        console.log("dining ding");
    }
};

zorro.haceSonido();

// Podemos AGREGAR una propiedad
alumno.pais = "Argentina";
console.log(alumno);

// Podemos ELIMINAR una propiedad
delete alumno.edad;
console.log(alumno);


/*===================
    Cual usar?
=====================
    - Usaremos arrays cuando necesitemos almacenar una lista ordenada de elementos (como una lista de nombres)

    - Usaremos objetos cuando tenemos datos estructurados que pueden agruparse en propiedades clave-valor (atributos de una persona, especificaciones de un producto, etc)

Ambas estructuras de datos son fundamentales en JavaSCript y cada una tiene sus casos optimos
*/


////////////////////////////////////
// Metodos de strings en JavaScript

// 1. length: Devuelve la longitud del string
console.log("Hola".length); // 4


// 2. charAt(index): Devuelve el caracter en la posicion especificada
console.log("Hola".charAt(1)); // o


// 3. concat(string1, string2, ...): Concatena strings
console.log("Hola".concat(" ", "mundo!")); // Hola mundo!


// El substring le llamamos a la porcion de un string (una parte de la cadena de caracteres que compone al string)
// 4. includes(substring): Devuelve true si el substring esta en el string
console.log("JavaScript".includes("Script")); // true
// console.log("JavaScript".includes("script")); // false (es case-sensitive!)


// 5. startsWith(substring): Comprueba si el string COMIENZA con el substring


// 6. endsWith(substring): Comprueba si el string TERMINA con el substring


// 7. indexOf(substring): Devuelve el indice de la PRIMERA aparicion del substring
console.log("banana".indexOf("a")); // 1


// 8. lastIndexOf(substring): Devuelve el indice de la ULTIMA aparicion del substring
console.log("banana".lastIndexOf("a")); // 5


// 9. replace(searchValue, newValue): Reemplaza una parte del string
console.log("Hola mundo".replace("mundo", "JavaScript")); // Hola JavaScript


// 10. replaceAll(searchValue, newValue): Reemplaza TODAS las apariciones
console.log("1,2,3,4,5".replaceAll(",", " ")); // 1 2 3 4 5


// 11. toLowerCase(): Convierte a minusculas
console.log("AGUANTE SAN LORENZO!!!".toLowerCase()); // aguante san lorenzo!!!


// 12. toUpperCase(): Convierte a mayusculas
console.log("hola como estas".toUpperCase()); // HOLA COMO ESTAS


// 13. trim(): Elimina espacios en blanco al inicio y al final
console.log("           Hola          ".trim()); // Hola


// 14. trimStart(): Elimina espacios en blanco al inicio


// 15. trimEnd(): Elimina espacios en blanco al final


// 16. slice(start, end): Extrae parte del string (permite numeros negativos)
console.log("JavaScript".slice(0, 4)); // Java
console.log("JavaScript".slice(-6)); // Script


// 17. substring(start, end): Similar a slice, pero NO acepta negativos
console.log("JavaScript".substring(4, 10)); // Script


// 18. split(separator): Dividimos el string en un array
console.log("rojo,verde,azul".split(",")); // ['rojo', 'verde', 'azul']
console.log("1+2+3".split("+")); // ['1', '2', '3']
console.log("04/05/2026".split("/")); // ['04', '05', '2026']
console.log("Hola".split("")); // ['H', 'o', 'l', 'a']


// 19. repeat(count): Repite el string
console.log("ji".repeat(3)); // jijiji


// 20. match(regex): Devuelve coincidencias con una expresion regular (regular expresion / REGEX)
console.log("abc123".match(/\d+/)); // '123'



////////////////////////////////////
// Metodos de arrays en JavaScript

// 1. length: Devuelve la longitud del array: 
console.log([1,2,3].length); // 3


// OPERACIONES AL FINAL DEL ARRAY________

// 2. push(element): Agrega un elemento al final del array
let arr = [1, 2];
arr.push(3);
console.log(arr); // [1, 2, 3]


// 3. pop(): Elimina el ultimo elemento y lo devuelve
console.log(arr.pop()); // 3
console.log(arr);


// OPERACIONES AL PRINCIPIO DEL ARRAY________

// 4. unshift(element): Agrega un elemento al inicio del array
arr.unshift(0);
console.log(arr); // 0, 1, 2]


// 5. shift(): Elmina el primer elemento y lo devuelve
console.log(arr.shift()); // 0
console.log(arr); // [1, 2]


// 6. concat(array): Concatena arrays
console.log([1,2,3].concat([4, 5, 6])); // [1, 2, 3, 4, 5, 6]


// 7. join(separator): Une los elementos en un string
console.log([1, 2, 3].join("-")); // 1-2-3


// 8. slice(start, end): Extrae una copia parcial del array
console.log([1,2,3,4].slice(1, 3)); // [2, 3]



// 9. splice(start, deleteCount, ...items): Modifica el array in situ, puede borrar o agregar
let miArray = [1, 2, 3];

// Accede a la posicion 1, modifica 1 elemento y lo reemplaza por el caracter a
miArray.splice(1, 1, "a"); // [1, "a", 3]
console.log(miArray); // [1, 'a', 3]

// PRACTICA SUGERIDA, practiquen y modifiquen arrays con splice


// 10. indexOf(element): Devuelve la PRIMERA posicion del elemento, si no existe, devuelve -1
console.log([1,2,3].indexOf(2)); // 1


// 11. lastIndexOf(element): Devuelve la ULTIMA posicion del elemento, si no existe, devuelve -1


// 12. includes(element): Devuelve true si el elemento existe
console.log([1,2,3].includes(2)); // true
```

---


## JavaScript III / Scope y ambito funciones y tipos de funciones

### *Como ejecuta las instrucciones JavaScript internamente?*
**JavaScript internamente “lee” el código antes de ejecutarlo**, realizando un proceso en dos fases:

**1. Fase de compilación** (o creación del contexto)

Antes de ejecutar línea por línea, el motor de JavaScript analiza todo el código. En esta etapa:

- Registra variables y funciones.
- Determina el alcance (scope).
- Prepara el entorno de ejecución.

**2. Fase de ejecución**

Recién después ejecuta el código en orden.


---


```js
/*=====================
    Scope o Ambito
=======================

El scope o ambito en JavaScript se refiere al contexto en el cual las variables y funciones son accesibles y pueden ser referenciadas (su alcance).

Tipos de Scope:

    1. Global Scope o Ambito Global

    - Las variables declaradas fuera de cualquier funcion o bloque tienen alcance global y son accesibles desde cualquier parte del codigo.
    - Esto incluye a var, let y const
    - En un navegador, las variables globales se adjuntan al objeto window. Esto afecta solo a las variables var 
*/

var globalVar = "Soy global";

function mostrarGlobal() {
    console.log(globalVar);
}

mostrarGlobal();
console.log(globalVar);


/*    
    2. Local Scope o Function Scope / Ambito local o Ambito de funcion

    - Afectan solamente a var
    - Las variables declaradas dentro de una funcion solo son accesibles dentro de esa funcion. Estas variables tienen un ambito local
*/

function mostrarLocal() {
    var localVar = "Soy local";
    console.log(localVar);
}

mostrarLocal();
// console.log(localVar); // Uncaught ReferenceError: localVar is not defined


/*    
    3. Block Scope o Ambito de bloque

    - Las variables declaradas con let y const tienen alcance de bloque
    - Solo son accesibles dentro del bloque en que se declararon -> {}
    - El bloque incluye un if, un for, etc
*/

if (true) {
    let bloqueLet = "Soy de bloque";
    console.log(bloqueLet);
}

// console.log(bloqueLet); // Uncaught ReferenceError: bloqueLet is not defined


/*==============================
Scope Chain o Cadena de Ambito

Cuando intentamos acceder a una variable, JavaScript busca en la cadena de ambito, comenzando por el ambito mas interno moviendose hacia los ambitos externos hasta encontrar la variable o llegar al ambito global
*/

var varGlobal = "Soy global";

function externa() {
    var varExterna = "Soy externa";

    function interna() {
        var varInterna = "Soy interna";

        console.log(varGlobal); 
        console.log(varExterna);
        console.log(varInterna);
    }

    interna(); // soy global    soy externa     soy interna

    // console.log(varInterna); // Uncaught ReferenceError: varInterna is not defined
}

externa();


/*===============================
    Function vs Block Scope
=================================

Function Scope: Las variables declaradas con var tienen ambito de funcion, pero no estan limitadas por bloques { }

Block Scope: Las variables declaradas con let y const estan limitadas por el bloque en el que se declaran
*/

// Ejemplo de alcance local o de funcion
function scopeFunction() {
    if (true) {
        var funcionVar = "Soy var de funcion";
    }

    console.log(funcionVar);
}

scopeFunction();


// Ejemplo de alcance de bloque
function scopeBlock() {
    if (true) {
        let letBloque = "Soy de bloque";
        const constBloque = "Soy una const de bloque";
    }

    // console.log(letBloque); // Uncaught ReferenceError: letBloque is not defined
    // console.log(constBloque); // Uncaught ReferenceError: constBloque is not defined

}

scopeBlock();


/*===============================
    Hoisting o Elevacion
=================================

Las declaraciones de variables y funciones en JavaScript se "mueven hacia arriba" de su contexto de ejecucion (scope).

Variables con var: Se elevan y se inicializan con undefined

Variables con let y const: Se elevan pero no se inicializan, lo que lleva a un error si se accede antes de la declaracion
*/

console.log(elevadaVar); // undefined
var elevadaVar = "Soy una var elevada";
console.log(elevadaVar);


// console.log(elevadaLet); // Uncaught ReferenceError: Cannot access 'elevadaLet' before initialization
let elevadaLet = "Soy una let elevada";
console.log(elevadaLet);


/*=========================================
    Diferencias entre var, let y const
===========================================

var: Tiene ambito de funcion, permite la redeclaracion y la reasignacion

let: Tiene ambito de bloque {}, NO permite la redeclaracion pero SI la reasignacion

const: TIene ambito de bloque {} NO permite la redeclaracion y tampoco la reasignacion


- Tanto let como const se introdujeron en ES6 para mejorar el ambito de las variables y reducir la probabilidad de anulaciones accidentales de variables

- tanto let como const NO permiten la elevacion mientras que var si

- const asegura que el valor de la variable permanece constante, mientras que let permite la reasignacion, aunque objetos y arrays con const si pueden modificarse


// Algunas recomendaciones!

- Usemos const para variables de solo lectura como constantes u objetos inmutables

- Usemos let para variables que puedan cambiar con el tiempo, pero que NO deban volver a declararse

- Evitemos usar var, debido a su ambito global o de funcion y su hoisting, lo que puede dar lugar a conflictos y bugs
*/

// Let
let x = 10;
x = 20; // Le reasignamos un valor
// let x = 20; // ERROR! No permite redeclarar una variable

// Const
const obj = { nombre: "Santiago" };
obj.nombre = "Gonzalo";

console.log(obj);
// obj = {}; // Uncaught TypeError: Assignment to constant variable.



/*==============================
    Funciones en JavaScript
================================

Una funcion es un bloque de codigo reutilizable que se puede ejecutar cuando se llama por su nombre.
Las funciones son fundamentales para la modularidad y la reutilizacion del codigo

Por que usar funciones?
    - Facilitan la organizacion del codigo
    - Permiten la reutilizacion
    - Mejoran la legibilidad y el mantenimiento


//////////////////////////////////////    
// Sintaxis de una funcion declarada

La forma mas comun de declarar una funcion en JavaScript es usando la palabra clave function

    function nombreFuncion() {
        // Bloque de codigo que se ejecutara cuando se llame a la funcion
    }


Vamos a poder definir "variables" en las funciones que acepten valores cuando se les llame, estos son los parametros*/

// Los PARAMETROS son los nombres de las "variables" que definimos en la declaracion de la funcion
function sumar(a, b) {
    let resultado = a + b;
    console.log(`El resultado es: ${resultado}`);
}

// Los ARGUMENTOS son los valores que pasamos a la funcion cuando la llamamos
sumar(5, 3);


// Las funciones pueden DEVOLVER UN VALOR utilizando la palabra clave return
function multiplicar(a, b) {
    return a * b;
}

// Opcion 1: Guardo el valor retornado en una variable, luego lo consologueo
let resultadoMulti = multiplicar(4, 5);

// Opcion 2: Directamente llamo a la funcion adentro de un console.log
console.log(multiplicar(4, 5));


/*===============================
    Tipos de funciones en JS
=================================

1. Funcion declarada / Named function o Basic function

    Es la declaracion basica de JavaScript, usa la keyword function

    Se recomienda para funciones con nombre o cuando se necesite hoisting.
    Las funciones declaradas con la keyword function, se pueden elevar a la parte superior de su ambito, es decir, del scope que las contiene, lo que permiten llamar a la funcion antes de ser declarada
*/

saludar(); // Hola holiiiiita veciniiiiito

function saludar() {
    console.log("Hola holiiiiita veciniiiiito");
}


/* Funcion expresada / Function expression

    Es la funcion que esta dentro de una variable

    Son utiles para cuando se quiere controlar donde va a estar disponible la funcion (al contrario que el hoisting de las declaradas) o para cuando va a ser usada como argumento para otra funcin
*/

// despedida(); // Uncaught ReferenceError: Cannot access 'despedida' before initialization

const despedida = function() {
    console.log("Chau, nos vimos en Disney");
}

despedida();


/* Function anonima / Anonymous function

    No tiene nombre y se usan como callbacks generalmente

    Esta funcion ya es preexistente, es parte de las funciones que nos provee el entorno de ejecucion del navegador (por eso es que no la declaramos)

    - setTimeout() programa para ejecutar una vez una funcion
    - setInterval() ejecuta una funcion cada x segundos
*/
setTimeout(function() {
    console.log("Hola despues de 1 segundo");
}, 1000);


/* Funcion de flecha / Arrow function

    Especialmente util para escribir funciones de una linea
*/

const sumarDosNums = (a, b) => a + b;
console.log(sumarDosNums(2, 3));


/* Funcion de metodos / Method function

    Son las funciones definidas dentro de un objeto
*/

const profe = {
    nombre: "Kevin",
    saludar() {
        console.log(`Hola! Soy el profe ${this.nombre}`);
    }
}

profe.saludar();


/* Expresion de funcion ejecutada inmediatamente / IIFE - Immediately Invoked Function Expressions

    Las IIFE son funciones que se ejecutan inmediatamente despues de haberse definido
*/

(function() {
    console.log("Esta es una IIFE!");
})(); // Ni bien se termina de definir, se invoca



/* Funcion de orden superior / High order function

    Las high order functions (HOF) nos permiten usar otras funciones como parametros o devolver funciones como resultado.

    Vamos a trabajarlas en JavaScript V
*/



/* Funcion asincronica / Async function

    Las funciones asincronicas se declaran con la keyword async y devuelven un objeto Promise que representa la terminacion o el fracaso de una operacion asincronica

    Se usa el operador await para esperar a la operacion asincronica

    Vamos a trabajarlas en JavaScript VIII
*/



/*===============================
    Tipos de funciones flecha
=================================

La idea de estas funciones es simplificar y ahorrar codigo a la hora de escribir funciones. Cuando son en una sola linea, el return esta implicito y no hacen falta llaves.

Lo ideal es usar funciones flecha en una sola linea, cuando escribimos una funcion sencilla


1. Funcion flecha SIN parametros

    Si la funcion no lleva parametros, se pueden usar parentesis vacias
*/

const saludarFlecha = () => console.log("Hola desde una funcion flecha");
saludarFlecha();


/*
2. Funcion flecha con UN SOLO parametro

    Si hay un solo parametro, las parentesis son opcionales
*/

// SI NECESITARAN ESCRIBIR return, no hace falta, el return esta implicito
const cuadrado = x => x * x; 
console.log(cuadrado(4));


/*
3. Funcion flecha con mas de un parametro
*/

const restar = (a, b) => a - b;
console.log(restar(5, 2));


/*
4. Funcion flecha con MAS DE UNA INSTRUCCION en la funcion

    Si el cuerpo de la funcion tiene mas de una instruccion, necesitamos:
        - { }
        - return (si queremos devolver un valor)
*/

const saludarPersona = nombre => {
    const saludo = `Hola, ${nombre}!`;
    return saludo;
}

console.log(saludarPersona("Santiago"));


/*
5. Funcion flecha para usar HOF

    Las trabajaremos en JavaScript V

    Las funciones flecha son especialmente populares usando HOF
*/

let numeros = [1, 2, 3, 4, 5];

const duplicar = numeros.map(num => num * 2);
console.log(duplicar); // [2, 4, 6, 8, 10]
```

---


## JavaScript II / Control de flujo, Estructuras de control, Condicionales y Bucles I
```js
/*=====================
    Control de flujo
=======================

El control de flujo determina como se ejecutan las instrucciones de un programa.

Al diseñar un programa es importante establecer que partes del codigo se ejecutan y bajo que condiciones. En JS lo logramos mediante estructuras de control que permiten ejecutar sentencias de codigo basadas en decisiones, repeticiones o condiciones especificas.

    1. Condicionales
        - if, else if, else
        - Operadores logicos: &&, ||, !
        - Operadores ternarios

    2. Bucles
        - for, while, do...while

    3. Control de flujo avanzado
        - break
        - continue
        - switch
*/

/*
// Pedimos input al usuario (todo prompt devuelve string, por eso parseamos)
let edad = parseInt(prompt("Introduci tu edad"));
// Usamos las backticks o tildes invertidas ` y concatenamos texto con valores
console.log(`Tenés ${edad} años, dato tipo: ${typeof edad}`);
// console.log("Tenes " + edad + " años, dato tipo: " + edad); 

// Ejemplo 1 if else
if (edad >= 18) {
    console.log("Sos mayor de edad");

} else if (edad < 18 && edad > 0 ) {
    console.log("Sos menor de edad");

} else {
    console.log("Edad invalida");
}

// Ejemplo 2 if else
let tieneLicencia = true;

// Ambas condiciones deben cumplirse
if (edad >= 18 && tieneLicencia) {
    console.log("Podes manejar! Yupiii")
}

// Al menos una condicion debe cumplirse
if (edad < 18 || !tieneLicencia) {
    console.log("No podes manejar! Que cagada!");
}
*/


/*=====================
    Operador !
=======================

El operador "!" NOT invierte el valor booleano de una expresion.
Si la expresion es true, se convierte en false y viceversa

El uso del operador ! es comun para implementar la logica de "toggle" (o alternador) y alternar entre true y false cuando se activa
*/

let estado = true;

// Una funcion es un bloque de codigo reutilizable
function alterarEstado() {
    estado = !estado;
    console.log(`Nuevo estado: ${estado}`);
}

// Invocamos la funcion que acabamos de escribir para usar todo ese bloque de codigo
alterarEstado();    // false
alterarEstado();    // true
alterarEstado();    // false


// Operador ternario: Es simplemente una forma mas compacta de escribir una condicion if else
let edad = 33;

// Despues del "?" escribimos la respuesta si la condicional se cumple, si no se cumple, va despues del ":"
let mensaje = (edad >= 18) ? "Sos mayor de edad!" : "Sos menor de edad";
console.log(mensaje);

let temperatura = 24;
let prediccion;

prediccion = (temperatura >= 23) ? "Hace calor" : "Hace frio";
console.log(prediccion);


/*=================
    Bucle for
===================
Se usa cuando se conoce de antemano el numero de iteraciones

    for (inicializacion; condicion; incremento) {
        // Codigo a ejecutar en cada iteracion
    }
*/

for (let i = 0; i < 5; i++) {
    console.log(`Iteracion: ${i}`);
}

// EJERCICIO SUGERIDO! Crear una tabla de multiplicar del 3
// 1 x 1 = 1
// 1 x 2 = 2
// 1 x 3 = 3
// 2 x 1 = 2

for (let i = 1; i < 4; i++) {

    for (let j = 1; j < 4; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }

}

/* ===================================
    Que pasa en este bucle anidado?
======================================

    i es 1
    arranca a ejecutarse el primer bucle de i
    esta ejecucion dura lo que dure el segundo bucle, que va a loopear 3 veces
    todas las veces que loopea el bucle de abajo, i no se incrementa, porque todavia esta en su primer vuelta

    la primer vuelta del bucle de abajo, j vale 1
    el console log va a tomar 1 (i) x 1 (j) = 1 * 1

    j (el segundo bucle) termino su primer vuelta: j se incrementa en 1
    j vale ahora 2, pero i sigue valiendo 1, porque todavia no termino el bucle de abajo
    el console log va a tomar i = 1 x j = 2 = 1 * 2
    j se incrementa en 1, ahora vale 3. 3 sigue siendo inferior a 4? true
    el console log va a tomar i = 1 x j = 3 = 1 * 3

    que paso ahora? al terminar el bucle de abajo -> SE INCREMENTA EL I porque el bloque de codigo a ejecutar en el loop TERMINOOOOOOOO

    Ahora i vale 1
    arranca a ejecutarse la segunda iteracion del bucle i
    el console log va a tomar i = 2 x j = 1 = 2 * 1

*/
console.log("Fin de la tabla simple del 3");

// EJERCICIO SUGERIDO! Creen de 0, sin mirar el ejercicio anterior, una tabla de multiplicar del 1 al 10 completa



/*=================
    Bucle while
===================
Ejecuta el bloque de codigo mientras la condicion sea verdadera

    while (condicion) {
        // Codigo a ejecutar mientras la condicion sea verdadera
    }
*/

// Vamos a hacer un bucle while mientras la variable contador sea menor que 3
let contador = 0;

while (contador < 3) {
    console.log("Iteracion while: " + contador);
    contador++;
}


/*====================
    Bucle do...while
======================
Es similar al while, pero la condicion se evalua despues de ejecutar el bloque de codigo.
Lo que garantiza que el codigo se ejecutara al menos una vez

    do {
        // Codigo a ejecutar
    } while (condicion)
*/

// Bucle do...while hasta 5
let acumulador = 0;

do {
    console.log(`Iteracion de do...while: ${acumulador}`);
    acumulador++;
} while (acumulador < 6);



/*=================================
    Control de flujo avanzado I
===================================

break: Se usa para salir inmediatamente de un bucle o una estructura de control

continue: Salta a la siguiente iteracion del bucle, omitiendo el codigo restante dentro del bucle para esa iteracion
*/

// Ejemplo break
for (let i = 0; i < 10; i++) {

    if (i === 5) {
        break; // Salgo de un bucle
    }

    console.log(`Iteracion de i: ${i}`);
}

// Ejemplo continue
for (let i  = 0; i < 10; i++) {

    // Saltamos las iteraciones en las que i es par
    if (i % 2 === 0) {
        continue; // Salta a la siguiente iteracion del bucle y omite el resto del codigo
    }

    console.log("Numero impar: " + i);

}


/*=================================
    Control de flujo avanzado II
===================================

// Ejemplo switch

switch: Es otra estructura de control que permite evaluar una expresion y ejecutar el bloque de codigo correspondiente al caso que coincide

switch (expresion) {
    case valor1:
        // Codigo a ejecutar si la expresion es igual a valor1
        break;
        
    case valor2:
        // Codigo a ejecutar si la expresion es igual a valor1
        break;
        
    default:
        // Codigo que se ejecuta si ninguno de los casos coincide                
    }
*/

// Ejercicio: Vamos a pedirle al usuario que ingrese una dia de la semana y devolveremos el nombre de los 5 dias laborales o fin de semana

// Le pedimos input al usuario
let diaSemana = parseInt(prompt("Introduci dia de la semana"));

switch (diaSemana) {
    case 1:
        console.log("Lunes");
        break;

    case 2:
        console.log("Martes");
        break;

    case 3:
        console.log("Miercoles");
        break;

    case 4:
        console.log("Jueves");
        break;

    case 5:
        console.log("Viernes");
        break;

    default:
        console.log("Fin de semana");
}
```

---

## JavaScript I / Conceptos elementales, sintaxis basica, variables, tipos de datos y operadores
```js
// Mostramos mensajes por consola con console.log()

/* La consola de JavaScript es una herramienta de depuracion en nuestro navegador web

Esta disponible en la mayoria de los navegadores modernos, la abrimos con F12 o click derecho + inspeccionar + pestaña consola*/
console.log("Hola mundo!");

/*=================
    Variables
===================

var: NO RECOMENDADO. Historicamente usado para declarar variables

let: Permite declarar variables que pueden cambiar

const: Se usa para declarar variables que no se deben reasignar.
*/

var nombre = "Gonzalo";

let edad = 41;

const pi = 3.1416;

console.log(nombre);
console.log(edad);
console.log(pi);


/*===============================
    Tipos de datos primitivos
=================================

Numeros:            Valores numericos
Cadenas (string):   Texto encerrado entre '' o ""
Booleano:           true o false
null:               Valor intencionalmente vacio
undefined:          Una variable declarada pero que no tiene valor
*/

let numero = 42;
let texto = "Hola";
let verdadero = true;
let vacio = null;
let indefinido;

console.log(numero);
console.log(texto);
console.log(verdadero);
console.log(vacio);
console.log(indefinido);


/*===============================
    Operadores en JavaScript
=================================
https://www.w3schools.com/js/js_operators.asp

Los operadores son simbolos especiales que nos permiten realizar operaciones sobre valores o variables.


    Operadores aritmeticos: Permiten realizar oepraciones matematicas sobre valores numericos


    Operadores de asignacion: Permiten asignar valores a las variables


    Operadores de comparacion: Comparan valores y devuelven un resultado booleano
        "==" Igualdad simple (compara valor y parsea)

        "===" Iguadad estricta (compara valor y tipo)


    Operadores logicos: Se usan para combinar expresiones booleanas


    Operadores de tipo: Permiten verificar el tipo de un valor
*/

let x = 5; // Numero
let y = "5"; // String

// Ej igualdad simple (aca convierte el string "5" en un int)
console.log(x == y); // true (compara solo valor y parseo el string)

// Ej igualdad estricta (no hace parseo y compara int con string)
console.log(x === y); // false (compara valor y tipo)


let a = true;
let b = false;

// Ej operador logico
console.log(a && b);    // false (ambos deben ser true)
console.log(a || b);    // true (al menos uno es true)
console.log(!a);        // false (invierte el valor de a)


// Ej operador de tipo
// typeof devuelve el tipo de dato de una variable
console.log(typeof 41); // number
console.log(typeof "Holis"); // string
```