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
*/

// Guardar datos
localStorage.setItem("nombre", "Kevin");

// Leer datos
let datosNombre= localStorage.getItem("nombre");
console.log(datosNombre);

// Eliminamos datos
localStorage.removeItem("idioma");

// Borrar todo el local
localStorage.clear();


/* Ahora vamos a guardar nuestra lista de personas dentro del local

let personas = [
    { nombre: "Ignacio", edad: 20, ocupacion: "pintor" },
    { nombre: "Kevin", edad: 25, ocupacion: "boxeador" },
    { nombre: "Santiago", edad: 22, ocupacion: "almacenero" },
];

Pero localStorage y sessionStorage solo almacenan texto plano! no arrays de objetos u otro tipo de info

Que hacer?
*/