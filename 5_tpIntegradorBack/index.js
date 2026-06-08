////////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";



////////////////////
// Config
const app = express();
const PORT = environments.port;



////////////////////
// Middlewares

// Middleware CORS basico para permitir todas las solicitudes
app.use(cors());

// Middleware logger para poder ver en consola toda la actividad de nuestro servidor
app.use((req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // next me permite pasar al siguiente middleware o dar paso a la response (res)
});





////////////////////
// Endpoints
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// GET all products
app.get("/api/products", async (req, res) => {

    // Con el destructuring separamos los resultados (rows) y la metadata (field)
    const [rows, fields] = await connection.query("SELECT * FROM products");

    // console.log(rows);
    res.status(200).json({
        payload: rows
    });
});

// GET all users
app.get("/api/users", async (req, res) => {
    const [rows] = await connection.query("SELECT * FROM users");

    res.status(200).json({
        payload: rows
    });
});


// GET product by id
app.get("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    
    // El ? en la consulta es un "placeholder", es una medida de seguridad en consultas SQL para prevenir inyecciones SQL
    const [rows] = await connection.query("SELECT * FROM products where products.id = ?", [id]);
    // console.log(rows);

    res.status(200).json({
        payload: rows
    })

})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})