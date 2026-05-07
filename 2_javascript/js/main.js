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


// Continuar desde find()