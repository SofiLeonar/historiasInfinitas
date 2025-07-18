import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { validarDatos } from "../middlewares/validarDatos.js";
import { usuarioSchema } from "../schemas/usuario.schema.js";
import { permisoEditarEliminarUser } from "../middlewares/permisoEditarEliminarUser.js";
import { validarAuth } from "../middlewares/validarAuth.js";

const usuarioRouter = Router();

usuarioRouter.get("/", UsuarioController.getAll);
usuarioRouter.get("/:id", UsuarioController.getById);
usuarioRouter.post("/",validarDatos(usuarioSchema), UsuarioController.create);
usuarioRouter.put("/:id",validarDatos(usuarioSchema),validarAuth, permisoEditarEliminarUser, UsuarioController.update);
usuarioRouter.delete("/:id",validarAuth, permisoEditarEliminarUser, UsuarioController.delete);

export { usuarioRouter };