////////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js"; //Importamos __dirname y join apuntando a la ruta del archivo index.js
import session from "express-session"; // Aca importamos el modulo session que instalamos con npm i express-session y se encuentra adentro de node_modules
const { port, session_key } = environments;

////////////////////
// Config
const app = express();
const PORT = port;
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views")); // res.render("index") -> Internamente sabe que tiene que agarrar index.ejs en la carpeta src/views


////////////////////
// Middlewares
// Los middlewares de aplicacion se ejecutan en TODAS las solicitudes
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

app.use(loggerURL); // Middleware logger para poder ver en consola toda la actividad de nuestro servidor

// Middleware para parsear el JSON de las peticiones POST y PUT con la api fetch
app.use(express.json()); 

// Middleware para parsear info enviada con <forms>
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Estoy diciendole a la app la ruta de donde va a servir archivos estaticos
// Podremos servir directamente archivos estaticos apuntando a /css/styles.css o /assets/img/pumpernic.png -> localhost:3000/css/styles.css

/*
    Paso 1: Al hacer un login exitoso, creo una sesion

    Paso 2: Con esta sesion creada redirijo a dashboard y ahi ya puedo navegar

    Paso 3: Crearemos el middleware requireLogin para proteger las rutas y en cada llamada chequear si hay una sesion

    Paso 4: Crear el boton para logout y redirigir a login
    keep


    npm i express-session
*/
/////////////////////////
// Middleware de sesion
app.use(session({
    secret: session_key, // Firmamos las cookies para evitar manipulacion (protegemos la sesion con una contraseña)
    resave: false, // Evitamos guardar la sesion si no hubo cambios
    saveUnitialized: true // No guardamos sesiones vacias
}));




////////////////////
// Endpoints

// app.use() es la llamada a un middleware de aplicacion (que se aplica a todas las rutas)
app.use("/api/products", productRoutes); // Todas las peticiones a esta URL se las pasamos a product.routes.js
app.use("/dashboard", viewRoutes); // Rutas de vistas
app.use("/login", authRoutes); // Rutas de autenticacion
app.use("/api/users", userRoutes) // Rutas de usuario

// Gracias a las rutas evitamos escribir lo de abajo e invocar middlewares y controladores
// app.get("/api/products", getAllP...)
// app.get("/api/products/:id", validateId, getAllP...)
// app.post("/api/products", getAllP...)
// app.put("/api/products", getAllP...)
// app.put("/api/products/:id", validateId, getAllP...)



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})