/*=========================================
    Seleccion de elementos en el DOM
===========================================

    getElementById()

- Selecciona un unico elemento por su id (si no se encuentra, devuelve null)
- Solo selecciona el primer elemento que coincida con el id
*/

// Guardamos nuestro elemento <h1> en una variable
let titulo = document.getElementById("titulo");
console.log(titulo); // <h1 id="titulo">JavaScript Div 131</h1>
console.log(titulo.textContent); // JavaScript Div 131

/*
    querySelector() y querySelectorAll()

- querySelector(): Selecciona el PRIMER elemento que coincida con un selector CSS (clase, id, nombre etiqueta)

- querySelectorAll(): Selecciona TODOS los elementos que coincidan con el selector CSS y devuelve algo similar a un array, una lista de nodos o NodeList
*/

let primerParrafo = document.querySelector(".mensaje");
console.log(primerParrafo.textContent); // Primer parrafo

let listaParrafos = document.querySelectorAll(".mensaje");
console.log(listaParrafos);

listaParrafos.forEach(parrafo => console.log(parrafo.textContent)); 
// Primer parrafo 
// Segundo parrafo


/*=====================================
    Modificar contenido y atributos
=======================================

- textContent: Modificar el texto dentro de un elemento
- innerHTML: Mmodifica el contenido HTML dentro de un elemento
- setAttribute(): Modifica los atributos de un elemento
- style: Permite cambiar el estilo CSS en linea de un elemento
*/

// Cambiamos el texto
primerParrafo.textContent = "Nuevo texto desde JavaScript";

// Modificamos el contenido HTML
primerParrafo.innerHTML = `
    <strong>Nuevo texto en negrita</strong>
`;

// Seleccionamos el elemento <button> por su id
let boton = document.getElementById("boton");

// Cambiamos el atributo id
boton.setAttribute("id", "nuevoId");

// Cambiar el estilo
boton.style.color = "white";
boton.style.backgroundColor = "purple";
boton.style.border = "2px solid";
boton.style.borderRadius = "5px";
boton.style.padding = "10px";

// Vamos a inyectarle codigo HTML a el contenedorTabla
let contenedorTabla = document.getElementById("contenedorTabla");

let btn_tabla = document.getElementById("btn-tabla");

btn_tabla.addEventListener("click", function() {
    contenedorTabla.innerHTML = htmlTabla;
});


let htmlTabla = `
<table>
    <tr>
        <th>Company</th>
        <th>Contact</th>
        <th>Country</th>
    </tr>
    <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
    </tr>
    <tr>
        <td>Berglunds snabbköp</td>
        <td>Christina Berglund</td>
        <td>Sweden</td>
    </tr>
    <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
    </tr>
</table>
`;


/*===========================
    Eventos en JavaScript
=============================

Los eventos en JavaSCript permiten a los desarrolladores dectectar interacaciones del usuario con la pagina web, como hacer click en un boton, mover el mouse, escribir en un campo de texto. Los eventos son fundamentalaes para hacer que una pagina web sea interactiva.

Que es un evento?
Un evento es una SEÑAL que se envía cuando ocurre una interaccion o cambio en el documento.
JavaScript permite escuchar estos eventos y ejecutar funciones cuando ocurren


///////////////////////////
// Tipos de eventos

- Eventos de mouse: click, mouseover, mouseout, mousemove
- Eventos de teclado: keydown, keyup
- Eventos de formulario: submit, change, input, focus
- Eventos de ventana: resize, scroll, load, unload
*/

// Vamos a agarrar el elemento boton y le añadimos un escuchador de eventos -> Le asignamos a <button> un proceso en permanente ejecucion
boton.addEventListener("click", function() {
    alert("Me hiciste click, maquina");
});


let input_texto = document.getElementById("input_texto");
// El objeto event me proporciona info sobre el evento que se disparo
input_texto.addEventListener("keydown", event => console.log(`Tecla presionada: ${event.key} / Codigo: ${event.code}`));

// Solo necesitamos incluir event si vamos a usar info sobre el evento


/*=============================
    Propagacion de eventos
===============================

Cuando ocurre un evento, este se propaga a traves del DOM en 2 fases:

- Fase de captura (de arriba hacia abajo)
- Fase de burbuja (de abajo hacia arriba)
*/

let padre = document.getElementById("padre");
let hijo = document.getElementById("hijo");

// Escuchar click en el div padre
padre.addEventListener("click", () => console.log("Se hizo click en el div padre"));

// Escuchar click en el boton hijo
hijo.addEventListener("click", (event) => {
    event.stopPropagation(); // Detengo la propagacion
    console.log("Se hizo click en el boton hijo")
});