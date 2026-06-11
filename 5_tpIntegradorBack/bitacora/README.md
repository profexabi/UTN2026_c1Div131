## 1 / Que es FormData en JavaScript?

**FormData** es una interfaz nativa de JavaScript que permite construir y gestionar conjuntos de pares clave-valor para representar datos de formularios HTML. Su función principal es facilitar el envío de información, **incluyendo archivos y binarios**, mediante solicitudes AJAX o fetch sin recargar la página.

A diferencia de los objetos JSON, FormData utiliza el formato **multipart/form-data**, lo que permite adjuntar archivos nativamente y configurar automáticamente los encabezados HTTP necesarios (como el boundary). Esto simplifica el manejo de formularios complejos, ya que puede capturar automáticamente todos los campos de un elemento `<form>` o construirse manualmente mediante métodos como `append()`.

### Características clave:
*   **Envío de archivos:** Soporta tipos `File`, `Blob` y cadenas, ideal para cargas de imágenes o documentos.
*   **Integración con Fetch/XMLHttpRequest:** Se pasa directamente como cuerpo (`body`) de la petición, permitiendo que el navegador gestione la codificación correcta.
*   **Manipulación dinámica:** Permite agregar, eliminar o modificar campos antes del envío usando métodos como `formData.append()`, `formData.get()` y `formData.delete()`.

### Ejemplo básico de uso:

```javascript
// Crear FormData desde un formulario HTML existente
const formElement = document.querySelector('form');
const formData = new FormData(formElement);

// O crear uno manualmente y agregar datos
const manualData = new FormData();
manualData.append('nombre', 'Juan');
manualData.append('archivo', fileInput.files[0]);

// Enviar con fetch
fetch('/endpoint', {
  method: 'POST',
  body: formData
  // No configurar 'Content-Type' manualmente; el navegador lo hace automáticamente
})
.then(response => response.json())
.then(data => console.log(data));
```


---



## 2/ El HTML envia FormData?
No necesariamente. Cuando envías un formulario HTML de manera tradicional (usando un botón `<button type="submit">` o `<input type="submit">` sin interceptar el evento con JavaScript), el navegador recopila y envía los datos automáticamente utilizando el formato **`multipart/form-data`** o **`application/x-www-form-urlencoded`**, pero **no crea explícitamente un objeto `FormData` de JavaScript** a menos que tú lo hagas mediante código.

El objeto **`FormData`** es una interfaz de JavaScript que permite:

- Capturar los datos de un formulario HTML fácilmente.
- Manipularlos antes de enviarlos.
- Enviarlos de forma asíncrona usando `fetch()` o `XMLHttpRequest`.

### ¿Cuándo se usa `FormData`?

Se usa principalmente en dos casos:

1. **Creación automática desde un formulario existente:**

```javascript
const formulario = document.querySelector('#miFormulario');
const datos = new FormData(formulario);
```

Esto captura automáticamente todos los campos del formulario que tengan el atributo `name`.

2. **Creación manual:**

```javascript
const datos = new FormData();
datos.append('nombre', 'Juan');
datos.append('email', 'juan@example.com');
```

Útil cuando necesitas agregar datos dinámicamente o no hay un formulario HTML involucrado.

### Ejemplo de envío con `fetch` y `FormData`:

```html
<form id="miFormulario">
  <input type="text" name="nombre" value="Ana">
  <input type="email" name="email" value="ana@example.com">
  <button type="submit">Enviar</button>
</form>

<script>
  document.getElementById('miFormulario').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío tradicional

    const formData = new FormData(this);

    fetch('/enviar', {
      method: 'POST',
      body: formData
      // No es necesario establecer Content-Type, el navegador lo hace automáticamente
    })
    .then(resp => resp.text())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  });
</script>
```



En resumen: **el navegador no usa el objeto `FormData` de JavaScript por defecto**, pero sí usa un formato similar (`multipart/form-data`) al enviar formularios. El objeto `FormData` es una herramienta de JavaScript que facilita trabajar con esos datos antes de enviarlos de forma asíncrona.



## 3 / FormData -> Objeto JS -> JSON
Para enviar un formulario HTML como **JSON**, no puedes usar el objeto `FormData` directamente en el cuerpo de la petición, ya que `FormData` está diseñado para codificaciones tipo `multipart/form-data` o `application/x-www-form-urlencoded`.

Debes seguir estos pasos:

1.  **Capturar los datos:** Usa `new FormData(formulario)` para leer los valores fácilmente.
2.  **Convertir a JSON:** Transforma ese objeto `FormData` en un objeto plano de JavaScript y luego a una cadena JSON con `JSON.stringify()`.
3.  **Configurar la petición:** Establece el encabezado `Content-Type` en `application/json`.

### Ejemplo de código:

```javascript
const formulario = document.querySelector('#miFormulario');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  // 1. Capturar datos con FormData
  const formData = new FormData(this);

  // 2. Convertir FormData a Objeto Plano
  const datosObjeto = Object.fromEntries(formData.entries());

  // 3. Enviar como JSON
  fetch('/api/enviar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Importante para que el servidor sepa que es JSON
    },
    body: JSON.stringify(datosObjeto) // Convertir objeto a cadena JSON
  })
  .then(response => response.json())
  .then(data => console.log('Éxito:', data))
  .catch(error => console.error('Error:', error));
});
```

### Puntos clave:
*   **`Object.fromEntries(formData.entries())`**: Es la forma más rápida de convertir los datos del formulario a un objeto estándar de JavaScript.
*   **`Content-Type`**: A diferencia de `FormData`, cuando envías JSON **debes** especificar manualmente el header `Content-Type: application/json`.
*   **Archivos**: Si el formulario contiene archivos (`<input type="file">`), `JSON.stringify()` no los enviará correctamente por sí solo (solo enviará el nombre del archivo). Para enviar archivos junto con datos JSON, generalmente se usa `FormData` tradicional (`multipart/form-data`) o se convierte el archivo a Base64 antes de stringifyar.



---



## Que hace fetch en javascript?

**Fetch** es una API nativa de JavaScript introducida en 2015 que permite realizar **peticiones HTTP asíncronas** a servidores para obtener o enviar datos sin recargar la página. Reemplaza a la antigua `XMLHttpRequest` utilizando **Promesas** para manejar operaciones asíncronas de forma más limpia y legible.

Funciona enviando una solicitud a una URL y devolviendo un objeto `Response` que contiene metadatos HTTP (como el estado y los encabezados) y métodos para extraer el cuerpo de la respuesta. Es fundamental para la comunicación con APIs, permitiendo leer recursos como **JSON**, texto, imágenes o archivos estáticos.

### Características clave y uso:

*   **Sintaxis asíncrona:** Devuelve una promesa que se resuelve con el objeto `Response`. Se maneja mediante `.then()/.catch()` o la sintaxis `async/await`.
*   **Métodos de lectura:** El objeto `Response` incluye métodos como `.json()` para convertir la respuesta a un objeto JavaScript, `.text()` para obtener texto plano, o `.blob()` para archivos binarios.
*   **Configuración flexible:** Acepta un segundo parámetro opcional (`init`) para definir el **método HTTP** (`GET`, `POST`, `PUT`, `DELETE`), **encabezados** (`headers`) y el **cuerpo** (`body`) de la petición.
*   **Manejo de errores:** La promesa solo se rechaza en fallos de red o si la petición no se puede completar; **no** rechaza automáticamente errores HTTP como 404 o 500. Es necesario verificar manualmente la propiedad `response.ok` o el `status` para detectar estos casos.

Ejemplo básico de una petición GET:
```javascript
fetch('https://api.ejemplo.com/datos')
  .then(response => {
    if (!response.ok) throw new Error('Error HTTP: ' + response.status);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```