import { Router } from "express";
import { ListaDeseadosController } from "../controllers/listaDeseados.controller.js";
import { validarAuth } from "../middlewares/validarAuth.js";
import { validarListaDeseados } from "../middlewares/validarListaDeseados.js";

const listaDRouter = Router();


listaDRouter.post("/",validarAuth, validarListaDeseados, ListaDeseadosController.agregar);
listaDRouter.delete("/:id_libro",validarAuth, ListaDeseadosController.quitar);
listaDRouter.get("/",validarAuth, ListaDeseadosController.obtenerDeseados);

export { listaDRouter };