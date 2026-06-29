////////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";


////////////////////
// Config
const app = express();
const PORT = environments.port;
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views"));


////////////////////
// Middlewares
// Los middlewares de aplicacion se ejecutan en TODAS las solicitudes
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

app.use(loggerURL); // Middleware logger para poder ver en consola toda la actividad de nuestro servidor

app.use(express.json()); // middleware para parsear el JSON de las peticiones POST y PUT

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Estoy diciendole a la app la ruta de donde va a servir archivos estaticos



////////////////////
// Endpoints

app.use("/api/products", productRoutes); // Todas las peticiones a esta URL se las pasamos a product.routes.js

// Gracias a las rutas evitamos escribir lo de abajo e invocar middlewares y controladores
// app.get("/api/products", getAllP...)
// app.get("/api/products/:id", validateId, getAllP...)
// app.post("/api/products", getAllP...)
// app.put("/api/products", getAllP...)
// app.put("/api/products/:id", validateId, getAllP...)


app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Rutas de vistas
app.use("/dashboard", viewRoutes);




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})