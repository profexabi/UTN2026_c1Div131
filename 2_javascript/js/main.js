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


/*
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


