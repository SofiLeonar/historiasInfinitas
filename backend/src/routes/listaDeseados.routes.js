import { Router } from "express";
import { ListaDeseadosController } from "../controllers/listaDeseados.controller.js";
import { validarAuth } from "../middlewares/validarAuth.js";

const listaDRouter = Router();

listaDRouter.use(validarAuth);

listaDRouter.post("/", ListaDeseadosController.agregar);
listaDRouter.delete("/:id_libro", ListaDeseadosController.quitar);
listaDRouter.get("/", ListaDeseadosController.obtenerDeseados);

export { listaDRouter };