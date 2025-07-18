import { Router } from "express";
import { LibroController } from "../controllers/libro.controller.js";
import { libroSchema } from "../schemas/libro.schema.js";
import { validarLibro } from "../middlewares/validarLibro.js";

const libroRouter = Router();

libroRouter.get("/", LibroController.getAll);
libroRouter.get("/:id", LibroController.getById);
libroRouter.post("/", validarLibro(libroSchema), LibroController.create);
libroRouter.put("/:id", LibroController.update);
libroRouter.delete("/:id", LibroController.delete);

export { libroRouter };