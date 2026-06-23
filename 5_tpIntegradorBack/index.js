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

// Los middlewares de aplicacion se ejecutan en TODAS las solicitudes
// Middleware CORS basico para permitir todas las solicitudes
app.use(cors());

// Middleware logger para poder ver en consola toda la actividad de nuestro servidor
app.use((req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // next me permite pasar al siguiente middleware o dar paso a la response (res)
});

app.use(express.json()); // middleware para parsear el JSON de las peticiones POST y PUT

// Middleware de ruta: se usara en algunas rutas y en otras no
const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    // Si no es un entero o es inferior a 0
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El ID debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next();
}

// Middleware para validar los campos de un formulario
const categoriasValidas = ["food", "drink"];
const validateProduct = (req, res, next) => {
    
    const { name, image, price, category } = req.body; // Recogemos los datos del body
    const errores = []; // Creamos un array vacio de errores

    // Verificamos los datos de entrada
    if (!name || !image || !category || !price) {
        errores.push("Faltan campos requeridos");
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    // El precio lo parsearemos previamente en el cliente
    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // No validaremos image porque luego usaremos Multer

    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida");
    }

    // Detectamos si existe algun error en la lista y lo devolvemos en un 400
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); // Sin el next, no da paso al siguiente middleware o a procesar la respuesta
}



////////////////////
// Endpoints

// Cuando modularizemos las rutas
// app.use("/api/products", rutasProducto);
app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// GET all products
app.get("/api/products", async (req, res) => {

    // Optimizacion 1: Manejar errores con try catch
    try {

        // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
        // Sacamos SELECT * para evitar traer columnas innecesarias (+ eficiencia en memoria y en red)
        const sql = "SELECT id, name, price, image FROM products";

        // Con el destructuring separamos los resultados (rows) y la metadata (field)
        const [rows, fields] = await connection.query(sql);

        // Optimizacion 4: Devolvemos error 404 si no hay productos
        if (rows.length === 0) {
            return res.status(404).json({
               message: "No se encontraron productos" 
            });
        }
    
        // console.log(rows);
        res.status(200).json({
            payload: rows,
            total: rows.length // Metadata util para el front
        });

    } catch (error) {
        console.log(error);

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: "Error interno del servidor al obtener productos"
        })
    }

});

// GET all users
app.get("/api/users", async (req, res) => {
    const [rows] = await connection.query("SELECT * FROM users");

    res.status(200).json({
        payload: rows
    });
});


// GET product by id
app.get("/api/products/:id", validateId, async (req, res) => {

    // Optimizacion 1: Incorporamos manejo de errores con try catch
    try {
        // Gracias al middleware validateId ya valido este dato y lo recibo en req.id
        // const id = req.params.id; -> este id se encuentra dentro de req.id

        // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
        // Sacamos SELECT * para evitar traer columnas innecesarias (+ eficiencia en memoria y en red)
        // El ? en la consulta es un "placeholder", es una medida de seguridad en consultas SQL para prevenir inyecciones SQL

        const sql = "SELECT id, name, price, image FROM products where id = ?";
        
        const [rows] = await connection.query(sql, [req.id]);

        // Optimizacion 4: Devolvemos error 404 si no hay productos con ese id
        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos con id ${req.id} `
            });
        }
    
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log(error);

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: "Error interno del servidor al obtener productos"
        })
    }

});


// POST product
app.post("/api/products", validateProduct, async (req, res) => {

    // Optimizacion 1: Agregamos manejo de errores con try catch
    try {
        // Gracias al middleware app.use(express.json()) -> Recibimos un objeto JS ya parseado
        // console.log(req.body);
    
        // Extraemos los valores que vienen en el CUERPO (body) de la peticion http (HTTP Request)
        const { name, image, category, price } = req.body;

        // Optimizacion 3: Sanitizamos los strings antes de insertarlos, para normalizar los datos
        const cleanName = name.trim();

    
        // Los placeholders "?" nos permiten realizar consultas SQL mas seguras (evitan inyeccion SQL)
        const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

        const [rows] = await connection.query(sql, [cleanName, image, category, price]);
    
        // Optimizacion 5: En lugar de 200 OK, 201 Created
        res.status(201).json({
            message: `Producto creado con exito con id ${rows.insertId}`,
            productId: rows.insertId // Optimizacion 4: Devolvemos info util como el nuevo id creado
        });

    } catch (error) {
        console.log(error);

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: "Error interno del servidor al crear productos"
        })
    }
});


// PUT product
app.put("/api/products", validateProduct, async (req, res) => {

    // Optimizacion 1: Agregamos manejo de errores con try catch
    try {
        const { id, name, image, price, category } = req.body;

        let sql = `UPDATE products SET name = ?, image = ?, price = ?, category = ? WHERE id = ?`;
        
        const [result] = await connection.query(sql, [name, image, price, category, id]);

        // Optimizacion 2: Verificamos si realmente se actualizo algo
        if (result.changedRows === 0) {
            return res.status(404).json({
                message: `No se actualizo el producto`
            })
        }
        
        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });


    } catch (error) {
        console.log(error);

        // Optimizacion 3: Devolvemos errores 500
        res.status(500).json({
            message: "Error interno del servidor al crear productos"
        });
    }
});



// DELETE product
app.delete("/api/products/:id", validateId, async (req, res) => {
    
    // Optimizacion 1: Incorporamos manejo de errores con try catch
    try {
        // El middleware ya valida y anexa el id en req.id
        //const id = req.params.id;
        
        const sql = "DELETE FROM products WHERE id = ?";
        
        await connection.query(sql, [req.id]);
        
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado correctamente`
        });
        
    } catch (error) {
        console.log(error);
        
        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: "Error interno del servidor al eliminar productos"
        })
    }
})




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})