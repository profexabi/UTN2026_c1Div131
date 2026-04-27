# [JavaScript](https://www.w3schools.com/js/default.asp)
## [Wikipedia JavaScript](https://es.wikipedia.org/wiki/JavaScript)



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