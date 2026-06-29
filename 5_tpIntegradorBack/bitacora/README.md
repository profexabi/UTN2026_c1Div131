## Comprendiendo las APIs REST
**REST** son las siglas de **Representational State Transfer** (Transferencia de Estado Representacional) y es un **estilo arquitectónico** definido por Roy Fielding en 2000 para diseñar sistemas distribuidos. **RESTful** es el término utilizado para describir una **implementación** o una API que sigue estrictamente los principios de este estilo arquitectónico.

Las API RESTful se caracterizan por:
*   Utilizar el protocolo **HTTP** para las comunicaciones.
*   Ser **sin estado** (stateless), donde cada solicitud contiene toda la información necesaria.
*   Utilizar un **lenguaje uniforme** de métodos (GET, POST, PUT, DELETE) para operar sobre recursos identificados por **URI**.
*   Permitir que los datos se intercambien en formatos como **JSON** o XML.

La diferencia clave es que **REST** es el conjunto de principios teóricos, mientras que **RESTful** denota que un servicio web o API los ha implementado correctamente.


---


### Otra definicion más técnica
Una **API REST** (Interfaz de Programación de Aplicaciones de Transferencia de Estado Representacional) es un conjunto de reglas y convenciones arquitectónicas para crear servicios web que permiten la comunicación entre sistemas informáticos a través de la web.

**Características principales:**

*   **Arquitectura Cliente-Servidor:** Separa la interfaz de usuario (cliente) del almacenamiento de datos (servidor) para mejorar la escalabilidad.
*   **Sin Estado (Stateless):** Cada solicitud del cliente contiene toda la información necesaria para ser procesada; el servidor no guarda datos de sesiones previas.
*   **Interfaz Uniforme:** Utiliza métodos HTTP estándar (**GET**, **POST**, **PUT**, **DELETE**) para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre recursos identificados por **URLs** (URI).
*   **Formato de Datos:** Intercambia información típicamente en formato **JSON** o XML, que es legible por humanos y máquinas.
*   **Capas y Caché:** Permite el uso de intermediarios y permite que las respuestas se almacenen en caché para optimizar el rendimiento.

A diferencia de otras tecnologías como SOAP, las API REST no son un protocolo rígido, sino un estilo arquitectónico que prioriza la **simplicidad**, la **velocidad** y la **flexibilidad**, siendo el estándar predominante en el desarrollo web moderno y arquitecturas de microservicios.

---

## Diferencia entre endpoint y url
La diferencia fundamental radica en que la **URL** (Localizador Uniforme de Recursos) es la dirección completa y técnica para localizar un recurso en internet, mientras que el **endpoint** es la ruta específica dentro de una API que indica qué recurso o acción se va a interactuar.

*   **URL**: Es el identificador completo que incluye el protocolo, el dominio y la ruta (ej. `https://api.ejemplo.com/v1/usuarios`). Define **dónde** se encuentra el servidor.
*   **Endpoint**: Es la parte de la URL que identifica el recurso o servicio específico dentro de la API (ej. `/v1/usuarios`). Define **qué** recurso se va a acceder o la función que se va a ejecutar.

En resumen, la URL es la "dirección postal" completa hacia el edificio (servidor), y el endpoint es la "puerta específica" o "oficina" dentro de ese edificio a la que deseas entrar para interactuar con un recurso particular.

---

## Diferencia entre frameworks y librerias
La diferencia principal radica en el **control del flujo de ejecución**, concepto conocido como **Inversión de Control**.

*   **Librería**: Es un conjunto de funciones reutilizables para tareas específicas. **Tú controlas el flujo** y decides cuándo llamar a la librería desde tu código. Ofrece alta flexibilidad pero requiere que el desarrollador gestione la arquitectura y compatibilidad. Ejemplos: React, jQuery, Lodash.
*   **Framework**: Es un marco de trabajo completo que define la estructura de la aplicación. **El framework controla el flujo** y llama a tu código en momentos específicos. Impone convenciones y patrones, ofreciendo estabilidad y herramientas integradas, pero con menor flexibilidad. Ejemplos: Angular, Django, Laravel.

En resumen, con una librería **tú llamas a la herramienta**, mientras que con un framework **la herramienta llama a tu código**.

