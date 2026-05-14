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





/*====================
    Web APIs
======================

*/
