/*================================
    Controladores de productos
*================================*/

import ProductModels from "../models/product.models.js";


////////////////////
// Get all products
export const getAllProducts = async (req, res) => {

    // Optimizacion 1: Manejar errores con try catch
    try {

        /* Aca el controlador le delega al modelo product.models.js TODA la comunicacion con la BBDD (que lo importa como ProductModels)

            ////////////////////
            // Seleccionar todos los productos
            const selectAllProducts = () => {
                // Optimizacion 3: Extraemos la sentencia en una variable y la optimizamos
                // Sacamos SELECT * para evitar traer columnas innecesarias (+ eficiencia en memoria y en red)
                const sql = "SELECT id, name, price, image FROM products";

                // Con el destructuring separamos los resultados (rows) y la metadata (field)
                return connection.query(sql);
            }
        */
        const [rows, fields] = await ProductModels.selectAllProducts();

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
        console.log(error); // La consola del servidor nos mostrara cual fue el error cuando nos comunicamos con la BBDD

        // Optimizacion 2: Devolvemos errores 500
        res.status(500).json({
            message: "Error interno del servidor al obtener productos"
        })
    }
}



////////////////////
// Get product by id
export const getProductById = async (req, res) => {

    // Optimizacion 1: Incorporamos manejo de errores con try catch
    try {
        // Gracias al middleware validateId ya valido este dato y lo recibo en req.id
        // const id = req.params.id; -> este id se encuentra dentro de req.id

        
        const [rows] = await ProductModels.selectProductById(req.id);

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
}


////////////////////
// Create product
export const createProduct = async (req, res) => {

    // Optimizacion 1: Agregamos manejo de errores con try catch
    try {
        // Gracias al middleware router.use(express.json()) -> Recibimos un objeto JS ya parseado
        // console.log(req.body);
    
        // Extraemos los valores que vienen en el CUERPO (body) de la peticion http (HTTP Request)

        console.log(req.body);
        /*
            {
            name: 'Desinfectante Cif concentrado',
            image: 'https://higiton.com.br/cif-desinfetante-concentrado-floral-5l-unilever/',
            category: 'drink',
            price: 5000
            }

        // Gracias al destructuring en una linea resolvemos lo que aca hacemos en 4
        let nombre = req.body.name;
        let imagen = req.body.imagen;
        let categoria = req.body.categoria;
        let precio = req.body.precio;

        const { name, image, category, price } = req.body;
        */
        console.table(req.body);

        const { name, image, category, price } = req.body;

        // Optimizacion 3: Sanitizamos los strings antes de insertarlos, para normalizar los datos
        const cleanName = name.trim();


        const [rows] = await ProductModels.insertProduct(cleanName, image, category, price);
    
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
}




////////////////////
// Modify product
export const modifyProduct = async (req, res) => {

    // Optimizacion 1: Agregamos manejo de errores con try catch
    try {
        const { id, name, image, price, category } = req.body;

        const [result] = await ProductModels.updateProduct(name, image, price, category, id);

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
}



////////////////////
// Remove product
export const removeProduct = async (req, res) => {
    
    // Optimizacion 1: Incorporamos manejo de errores con try catch
    try {
        // El middleware ya valida y anexa el id en req.id
        //const id = req.params.id;
        
        await ProductModels.deleteProduct(req.id);
        
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
}