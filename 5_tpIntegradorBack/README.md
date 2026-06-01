# TP Integrador 2026 c1 Div 131 / Backend


## 1. Arrancando un servidor minimo

### 1.1 Configuracion inicial del proyecto
Antes de nada, vamos a asegurarnos de que nuestro entorno está preparado y crearemos el proyecto

```sh
# Comprobamos la version de Node.js y NPM
node -v
# v20.5.0

npm -v
# 9.8.0

# Creamos un directorio para nueestro proyecto y navegamos a el
mkdir nombreProyecto_Back
cd nombreProyecto_Back

# Inicializamos el proyecto
npm init -y
```

---

### 1.2 Instalacion de dependencias y setup básico con sintaxis ESM

```sh
# Instalamos las dependencias necesarias, que iran a parar a la carpeta node_modules
npm install express ejs mysql2 nodemon dotenv
```
#### Qué estamos instalando?
- **`express`**: Framework web.
- **`ejs`**: Motor de plantillas.
- **`mysql2`**: Cliente MySQL para Node.js.
- **`nodemon`**: Herramienta que reinicia automáticamente la aplicación Node.js cuando detecta cambios en los archivos durante el desarrollo.
- **`dotenv`**: Módulo que carga variables de entorno desde un archivo .env al entorno de ejecución de Node.js.

#### Nuevo script de arranque y sintaxis ESM
- Agregamos type module en el `package.json`
- Agregamos script `dev`

```json
"type": "module",
"scripts": {
    "dev": "nodemon index.js"
}
```

#### Creamos el archivo principal `index.js` como lo indica el `package.json`
```js
import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});
```

Ahora ejecutamos nuestro servidor con nuestro nuevo script
```sh
npm run dev
```

#### Listo!


---




## 2. Conectando a una BBDD


### 2.0 Necesitamos instalar mysql y phpmyadmin
**Para Windows, usar [xampp](https://www.apachefriends.org/es/index.html)**

---

### 2.1 Crear archivos `.gitignore` y `.env` en la raiz del proyecto
- `.gitignore` nos permite NO enviar a git nuestros paquetes de npm y nuestras variables de entorno
- `.env` sirve para almacenar localmente variables sensibles como el usuario y password de la conexion a la BBDD, el puerto, entre otros datos

#### Dentro de `.gitignore` escribimos 
```
node_modules
.env
```

#### Creamos nuestras variables de entorno en `.env`
Previamente instalamos el paquete dotenv, que sirve para cargar las variables de entorno desde un archivo .env, lo cual es especialmente útil para manejar configuraciones de desarrollo, producción, y otras configuraciones específicas.

```
PORT=3000
DB_HOST="localhost"
DB_NAME="nombreDB"
DB_USER="nombreUser"
DB_PASSWORD="passUser"
```

---

# TO DO 
### 2.2 Crear estructura de directorios (carpetas) de nuestro proyecto para almacenar la configuracion de nuestro proyecto y la conexion a la BBDD 