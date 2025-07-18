import { LibroService } from "../services/libro.service.js";

export class LibroController {
    static async getAll(req, res) {
        const { limit } = req.query;
        const libros = await LibroService.getAll({ limit });
        res.status(200).json({ libros });
    }

    static async getById(req, res) {
        const id = parseInt(req.params.id);
        const libro = await LibroService.getById({ id });
        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
            return;
        }
        res.status(200).json({ libro });
    }

    static async create(req, res) {
        const { titulo, autor, resumen, anio_publicacion, imagen } = req.body;

        const newLibro = await LibroService.create({ 
            titulo, 
            autor, 
            resumen, 
            anio_publicacion, 
            imagen 
        });

        res.status(201).json({ 
            message: "Libro creado correctamente", 
            newLibro 
        });
    }

    static async update(req, res) {
    const id = Number(req.params.id); 

    try {
        const libro = await LibroService.getById({ id });

        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        const { titulo, autor, resumen, anio_publicacion, imagen } = req.body;

        const dataToUpdate = {
            titulo: titulo ?? libro.titulo,
            autor: autor ?? libro.autor,
            resumen: resumen ?? libro.resumen,
            anio_publicacion: anio_publicacion ?? libro.anio_publicacion,
            imagen: imagen ?? libro.imagen
        };

        const updatedLibro = await LibroService.update({ id, ...dataToUpdate });

        res.status(200).json({ 
            message: "Libro actualizado correctamente", 
            updatedLibro 
        });

        } catch (error) {
            console.error("Error Prisma en update:", error);
            res.status(500).json({ error: "Error interno", detalle: error.message });
        }
    }

    static async delete(req, res) {
    const id = Number(req.params.id);
    console.log("Controller delete id:", id, typeof id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const libro = await LibroService.delete({ id });
        res.status(200).json({
        message: "Libro eliminado correctamente",
        libro,
        });
        } catch (error) {
            console.error("Error en delete:", error);
            res.status(404).json({ error: "Libro no encontrado" });
        }
    }

}