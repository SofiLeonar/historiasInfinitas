import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { validarDatos } from "../middlewares/validarDatos.js";
import { usuarioSchema } from "../schemas/usuario.schema.js";

const usuarioRouter = Router();

usuarioRouter.get("/", UsuarioController.getAll);
usuarioRouter.get("/:id", UsuarioController.getById);
usuarioRouter.post("/",validarDatos(usuarioSchema), UsuarioController.create);
usuarioRouter.put("/:id",validarDatos(usuarioSchema), UsuarioController.update);
usuarioRouter.delete("/:id", UsuarioController.delete);

export { usuarioRouter };