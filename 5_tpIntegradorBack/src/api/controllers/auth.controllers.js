/*================================
    Controladores de autenticacion
*================================*/

// Importamos el modelo de usuarios para poder usar las consultas para el login
import UserModels from "../models/user.models.js"

////////////////
// Vista login
export const loginView = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduzca sus credenciales"
    })
}

//////////////////////
// Funcionalidad login
export const loginUser = async (req, res) => {

    try {

        // Obtenemos el email y el password del formulario
        const { email, password } = req.body;

        // Evitamos consulta innecesaria
        if (!email || !password) {
            return res.render("login", {
                title: "Login",
                about: "Introduzca sus credenciales",
                error: "Todos los campos son obligatorios"
            })
        }

        const [rows] = await UserModels.selectAdminUsers(email, password);

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

        // Guardar la sesion
        req.session.user = {
            id: user.id,
            nombre: user.name,
            email: user.email
        }

        // Redirigir a dashboard
        res.redirect("/dashboard/index");

    } catch (error) {
        console.log(error);
    }
}

