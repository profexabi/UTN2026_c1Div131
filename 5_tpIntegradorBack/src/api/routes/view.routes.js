/*========================
    Rutas vistas
========================*/

import { Router } from "express";
import { deleteView, getView, indexView, postView, putView } from "../controllers/view.controllers.js";
const router = Router();

router.get("/index", indexView);

router.get("/consultar", getView);

router.get("/crear", postView);

router.get("/modificar", putView);

router.get("/eliminar", deleteView)

export default router;