import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validarAuth } from "../middlewares/validarAuth.js";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/profile", validarAuth, AuthController.profile);

export { authRouter };