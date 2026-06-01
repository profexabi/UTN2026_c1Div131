# [`Express.js`](https://www.npmjs.com/package/express)

`Express.js` es un framework que funciona sobre Node.js, esta construido sobre el *modulo nativo `http` de Node.js*.
Esta diseñado para facilitar la creacion de servidores web y simplifica el maneejo de rutas, peticiones HTTP, respuestas HTTP y otras tareas comunes en el desarrollo de aplicaciones backend.

Es basicamente un framework minimalista que nos permite crear servidores de manera mas rapida y con menos lineas de codigo que utilizando el modulo http nativo de `Node.js`.

#### Ventajas de usar `Express.js`
- Es ligero y flexible
- Permite manejar rutas facilmente
- Simplifica el manejo de middlewares (funciones que se ejecutan entre la req y la res)
- Cuenta con un gran ecosistema de modulos y herramientas


### Como usar `Express.js`
Para comenzar a usar `Express.js` necesitamos instalalo en nuestro proyecto. Como vamos a trabajar con modulos externos de `npm`, seguiremos los siguientes pasos

#### 1. Creamos un proyecto de Node.js
```sh
npm init -y
```
Esto creara un archivo `package.json` con la configuracion inicial

#### Que es `package.json`?
Este archivo es nuestro librito de instrucciones o mapa de la aplicacion.
Este archivo contiene informacion crucial sobre el proyecto incluyendo dependencias, scripts, metadatos y mas


---

## Tipos de licencias para nuestro codigo

### MIT vs ISC
La Licencia MIT y la Licencia ISC son ambas **licencias permisivas** de código abierto con características casi idénticas.

*   **Licencia MIT**: Creada en el MIT a finales de los 80, es una de las más populares y permisivas. Permite usar, modificar, distribuir y vender el software libremente, incluyendo en software propietario. Su único requisito es incluir el aviso de derechos de autor y la copia de la licencia.
*   **Licencia ISC**: Funcionalmente equivalente a la MIT, fue creada por el Consorcio de Software de Internet. Es una versión más concisa y "despojada" que elimina lenguaje considerado innecesario según el Convenio de Berna. También requiere solo incluir el aviso de copyright y la licencia, permitiendo uso comercial y modificaciones sin compartir el código fuente modificado.

La principal diferencia radica en el **lenguaje**: la MIT es más explícita en sus términos (como el sublicenciamiento), mientras que la ISC es más breve. Ambas permiten uso comercial, modificación y distribución sin la obligación de liberar los cambios realizados (a diferencia de las licencias Copyleft como la GPL).

### Que tipos de licencias existen?
Existen principalmente dos grandes categorías de licencias de software de código abierto, diferenciadas por el nivel de libertad que otorgan sobre el código derivado: **permisivas** y **copyleft**.

#### Licencias Permisivas
Estas licencias ofrecen la máxima flexibilidad. Permiten usar, modificar y distribuir el software (incluso en productos propietarios y cerrados) con restricciones mínimas, generalmente limitadas a mantener el aviso de copyright original. No obligan a liberar el código fuente de las modificaciones realizadas.

*   **MIT**: La más popular y sencilla. Ideal para maximizar la adopción del código sin importar el uso final.
*   **Apache 2.0**: Similar a la MIT pero incluye una cláusula explícita de protección de patentes, lo que la hace preferida en entornos empresariales.
*   **BSD (2 y 3 cláusulas)**: Muy similar a la MIT; la versión de 3 cláusulas añade una restricción sobre el uso del nombre del autor para promocionar productos derivados.
*   **ISC**: Funcionalmente equivalente a la MIT pero con un texto aún más reducido.



#### Licencias Copyleft
Conocidas como licencias "virales", exigen que cualquier obra derivada o modificada se distribuya bajo la **misma licencia** que el original, garantizando que el software y sus mejoras permanezcan siempre abiertos.

*   **GPL (GNU General Public License)**: La más estricta y común (usada por el kernel Linux y WordPress). Cualquier software que integre código GPL debe ser también GPL.
*   **LGPL (GNU Lesser General Public License)**: Una versión "débil" diseñada para librerías. Permite enlazar el código con software propietario sin que este tenga que liberarse, siempre que las modificaciones a la librería en sí sigan siendo abiertas.
*   **AGPL (GNU Affero General Public License)**: Similar a la GPL pero cierra el "vacío de la aplicación web": obliga a liberar el código incluso si el software se ejecuta en un servidor y los usuarios interactúan con él a través de una red (SaaS).
*   **MPL (Mozilla Public License)**: Un punto medio ("copyleft débil a nivel de archivo"). Permite combinar archivos con licencia MPL con archivos propietarios en un mismo proyecto; solo los archivos originales de MPL deben permanecer abiertos.

#### Otras Categorías
*   **Dominio Público**: El autor renuncia a todos sus derechos. Cualquiera puede hacer lo que quiera con el código sin necesidad de atribución (ej. **CC0**, **Unlicense**).
*   **Licencias Duales**: El software se ofrece bajo dos licencias simultáneamente (ej. una GPL para uso abierto y una comercial para uso propietario), permitiendo al usuario elegir la que mejor se adapte a sus necesidades.

