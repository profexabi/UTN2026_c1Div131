/*================================
    Controladores de autenticacion
*================================*/

// Importamos el modelo de usuarios para poder usar las consultas para el login
import UserModels from "../models/user.models.js"

import bcrypt from "bcrypt";

////////////////
// Vista login
export const loginView = (req, res) => {
    res.render("login", { // Aca renderizamos la vista login.ejs pasandole las variables title y about
        title: "Login",
        about: "Introduzca sus credenciales"
    })
}



//////////////////////
// Funcionalidad login
export const loginUser = async (req, res) => {

    try {

        // Obtenemos el email y el password del formulario
        const { email, password } = req.body; // action="/login" method="POST"> con POST mandamos los datos en el cuerpo de la petcion HTTP

        // Evitamos consulta innecesaria
        if (!email || !password) {
            return res.render("login", {
                title: "Login",
                about: "Introduzca sus credenciales",
                error: "Todos los campos son obligatorios"
            })
        }

        // Bcrypt 1 -> Solo pedimos el email
        // const [rows] = await UserModels.selectAdminUsers(email, password);
        const [rows] = await UserModels.selectAdminUsers(email);

        // En caso de que no existan los usuarios
        if (rows.length === 0) {
            return res.render("login", {
                title: "Login",
                about: "Introduzca sus credenciales",
                error: "Credenciales incorrectas"
            })
        }

        // Obtenemos el usuario
        const user = rows[0];
        console.table(user);

        // Bcrypt 2 -> Ahora que tenemos el usuario guardado en user, comparamos los hasheos
        const match = await bcrypt.compare(password, user.password);
        console.log(match); // Si coinciden los datos, devuelve true

        // Si hubiera match, continuamos con el login
        if (match) {
            // Guardar la sesion
            req.session.user = {
                id: user.id,
                nombre: user.name,
                email: user.email
            }
    
            // Redirigir a dashboard
            res.redirect("/dashboard/index"); // En lugar de renderizar con res.render("") -> aca redirigimos a una URL

            
        } else {
            // En caso de que no coincidan los hashes
            return res.render("login", {
                title: "Login",
                about: "Introduzca sus credenciales",
                error: "Contraseña invalida"
            })

        }

    } catch (error) {
        console.log(error);
    }
}



//////////////////////
// Destruir la sesion
export const loginDestroy = (req, res) => {

    // Destruimos la sesion
    req.session.destroy((err) => {

        // En caso de error
        if (err) {
            console.log("Error al destruir la sesion: ", err);

            return res.status(500).json({
                message: "Error al destruir la sesion"
            })
        };

        // Destruida la sesion, redirigimos al login 
        res.redirect("/login");
    })
}