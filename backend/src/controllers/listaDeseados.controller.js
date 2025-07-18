import { ListaDeseadosService } from "../services/listaDeseados.service.js";

export class ListaDeseadosController {
    static async agregar(req, res) {
        const { id_libro } = req.body;
        const id_usuario = req.user.id;

        try {
            const libroAgregado = await ListaDeseadosService.addLibro({
                id_usuario,
                id_libro,
            });
            res.status(201).json({ libroAgregado });
        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ error: "Este libro ya está en tu lista de deseados" });
            }
            console.error("Error en controller:", error);
            console.log("Body recibido:", req.body);
            console.log("ID del usuario:", req.user);

            res.status(400).json({ error: "Error al agregar libro a la lista de deseados" });
        }
    }

    static async quitar(req, res) {
        const { id_libro } = req.body;
        const id_usuario = req.user.id;

        try {
            await ListaDeseadosService.quitarLibro({
                id_usuario,
                id_libro, //capaz después voy a tener que agregar un parseInt (ver)
            });
            res.status(200).json({ message: "Libro eliminado de la lista de deseados" });
        } catch (error) {
            res.status(400).json({ error: "Error al eliminar libro de la lista de deseados" });
        }
    }

    static async obtenerDeseados(req, res) {
        const id_usuario = req.user.id;

        try {
            const listaDeseados = await ListaDeseadosService.getListaDeseados({
            id_usuario,
        });

        res.status(200).json({ listaDeseados });
        } catch (error) {
            res.status(400).json({ error: "Error al obtener lista de deseados" });
        }
    }
}