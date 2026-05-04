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