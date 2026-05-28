console.log("Hola mundo desde Node.js");

/*=======================================================
    Trabajando con los modulos nativos de Node.js
=========================================================
Nativos quiere decir que estos modulos ya vienen preinstalados con `Node.js`.
Lo cual quiere decir que no tendremos que instalarlos, por ejemplo con `npm`.

El orden siempre va a ser

1. Instalar un modulo (en caso de que no este instalado)
2. Importarlo en el archivo que lo vayamos a usar
3. Usarlo
*/

// fs (File System): Modulo para interactuar con el sistema de archivos. Podremos leer, escribir, actualizar y borrar archivos de forma sencilla
const fs = require("fs"); // Es el equivalente a "invocar" un objeto global en el navegador

fs.readFile("archivos/texto.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Ocurrio un error: ", err); // En caso de error: no such file or directory
        return; // Con el return termino la ejecucion de esta funcion y todo el codigo de abajo no se leera
    }

    console.log("Contenido del archivo: ", data); // Contenido del archivo:  Hola, soy un archivo de texto de la carpeta "archivos"
});


// os (Operative System): Modulo para obtener informacion del sistema operativo en el que estamos ejecutando NOde.js
const os = require("os");

const memoriaLibre = os.freemem();
const tipoSistema = os.type();

console.log("Memoria disponible: ", memoriaLibre);      // Memoria disponible:  7398686720
console.log("Uso un sistema operativo ", tipoSistema);  // Uso un sistema operativo  Linux


/* path: Modulo para manejar rutas de archivos y carpetas

    Windows usa:                C:\carpeta\archivo.txt
    Unix (Linux, MacOS) usan:   /carpeta/archivo.txt

    path resuelve estas diferencias, y nos brinda metodos como

        join()      para unir rutas
        basename()  obtiene nombre del archivo
        extname()   obtiene extension del archivo
        dirname()   obtiene carpeta
*/
const path = require("path");

const ruta = path.join(__dirname, "archivos", "texto.txt"); // Esto va a crear la ruta ABSOLUTA de mi sistema operativo

console.log(ruta); // /home/xabier/Escritorio/Docencia/2026/UTN2026_c1Div131/3_nodejs/archivos/texto.txt