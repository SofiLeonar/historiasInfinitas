import { LibroService } from "../services/libro.service.js";

export class LibroController {
    static async getAll(req, res) {
        const { limit } = req.query;
        const libros = await LibroService.getAll({ limit });
        res.status(200).json({ libros });
    }

    static async getById(req, res) {
        const { id } = req.params;
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
        const { id } = req.params;
        const libro = await LibroService.getById({ id });

        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
            return;
        }

        const { titulo, autor, resumen, anio_publicacion, imagen } = req.body;

        libro.titulo = titulo ?? libro.titulo;
        libro.autor = autor ?? libro.autor;
        libro.resumen = resumen ?? libro.resumen;
        libro.anio_publicacion = anio_publicacion ?? libro.anio_publicacion;
        libro.imagen = imagen ?? libro.imagen;

        const updatedLibro = await LibroService.update({ 
            id, 
            titulo, 
            autor, 
            resumen, 
            anio_publicacion, 
            imagen 
        });

        res.status(200).json({ 
            message: "Libro actualizado correctamente", 
            updatedLibro });
    }

    static async delete(req, res) {
        const { id } = req.params;
        const libro = await LibroService.getById({ id });

        if (!libro) {
            res.status(404).json({ error: "Libro no encontrado" });
            return;
        }

        await LibroService.delete({ id });

        res.status(200).json({ 
            message: "Libro eliminado correctamente", 
            libro });
    }

}