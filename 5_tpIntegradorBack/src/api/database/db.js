// Importamos el modulo mysql2, pero en modo promesas para poder hacer peticiones asincronas a la BBDD
import mysql2 from "mysql2/promise"; // Gracias a promise podremos usar async/await para tirarle sentencias SQL a la BBDD

// Importamos la informacion de la conexion a la BBDD que provee environments
import environments from "../config/environments.js";

const { database } = environments; // Gracias al destructuring, extraemos solo el objeto de la conexion a la BBDD

// Creamos la conexion a la BBDD (Realmente creamos un conjunto o pool de conexiones abiertas a la BBDD)
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection; // Exportamos esta conexion a la BBDD para poder tirarle sentencias en otro modulo

/* Que hicimos aca?

"SELECT * FROM products" -> createConnection, cada vez que tiremos una sentencia SQL crear una conexion y destruira esa conexion por cada consulta

con createPool: La conexion a la BBDD nunca se cierra y podemos tirarle un monton de sentencias sin que se tenga que abrir una conexion y luego cerrar por cada consulta

createPool() es una funcion que crea un grupo (pool) de conexiones a la BBDD

    - Crea un gestor de conexiones automatico
    - Se conecta a la BBDD usando los parametros host, user, password, etc
    - Le pasamos la configuracion desde el objeto database
    - Por defecto, abre hasta 10 conexiones simultaneas
    - Permite usar awat connection.query() para ejecutar SQL
*/