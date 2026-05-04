# [JavaScript](https://www.w3schools.com/js/default.asp)
## [Wikipedia JavaScript](https://es.wikipedia.org/wiki/JavaScript)


## JavaScript IV / Introduccion a arrays y objetos. Metodos de strings y arrays


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