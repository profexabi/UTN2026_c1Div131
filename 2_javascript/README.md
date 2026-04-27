# [JavaScript](https://www.w3schools.com/js/default.asp)
## [Wikipedia JavaScript](https://es.wikipedia.org/wiki/JavaScript)



## JavaScript II / Control de flujo, Estructuras de control, Condicionales y Bucles I
```js

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