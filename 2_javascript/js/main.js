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
    console.log("Edad invalida")
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



