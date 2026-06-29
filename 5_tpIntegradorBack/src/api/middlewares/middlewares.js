/*========================
    Middlewares
========================*/

// Middleware logger para poder ver en consola toda la actividad de nuestro servidor
const loggerURL = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // next me permite pasar al siguiente middleware o dar paso a la response (res)
}


// Middleware de ruta: se usara en algunas rutas y en otras no
const validateId = (req, res, next) => {
    const id = Number(req.params.id); // Si el id lo enviaramos con post, extraeriamos este valor con req.body

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


// Middleware simple de proteccion de rutas
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }

    next();
}


export {
    loggerURL,
    validateId,
    validateProduct,
    requireLogin
}