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
let miArray = [1, 2, 3]
// Accede a la posicion 1, modifica 1 elemento y lo reemplaza por el caracter a
miArray.splice(1, 1, "a"); // [1, "a", 3]
console.log(miArray); // [1, 'a', 3]


// 10. indexOf(element): Devuelve la PRIMERA posicion del elemento, si no existe, devuelve -1
console.log([1,2,3].indexOf(2)); // 1


// 11. lastIndexOf(element): Devuelve la ULTIMA posicion del elemento, si no existe, devuelve -1


// 12. includes(element): Devuelve true si el elemento existe
console.log([1,2,3].includes(2)); // true