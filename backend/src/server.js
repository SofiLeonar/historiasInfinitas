import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { libroRouter } from "./routes/libro.routes.js";
import { usuarioRouter } from "./routes/usuario.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { listaDRouter } from "./routes/listaDeseados.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/libros", libroRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/auth", authRouter);
app.use("/api/listaDeseados", listaDRouter);

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});