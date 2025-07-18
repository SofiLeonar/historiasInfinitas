import { UsuarioService } from "../services/usuario.service.js";
import { hashPassword } from "../utils/hash.js";

export class UsuarioController {
    static async getAll(req, res) {
        const { limit } = req.query;
        const usuarios = await UsuarioService.getAll({ limit });
        res.status(200).json({ usuarios });
    }

    static async getById(req, res) {
        const { id } = req.params;
        const usuario = await UsuarioService.getById({ id });
        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ usuario });
    }

    static async create(req, res) {
        try {
            const { nombre, usuario, email, password, rol } = req.body;
            const passwordHash = await hashPassword(password);
            const usuarioNuevo = await UsuarioService.create({
                nombre, 
                usuario, 
                email, 
                password: passwordHash,
                rol,
            });
            res.status(201).json({ usuarioNuevo });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el usuario" });
            
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nombre, usuario, email, password, rol } = req.body;
        const passwordHash = await hashPassword(password);
        const usuarioActualizado = await UsuarioService.update({
            id, 
            nombre, 
            usuario, 
            email, 
            password: passwordHash,
            rol,
        });
        res.status(200).json({ usuarioActualizado });
    }

    static async delete(req, res) {
        const { id } = req.params;
        const usuario = await UsuarioService.getById({ id });

        if (!usuario) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }

        await UsuarioService.delete({ id });

        res.status(200).json({ 
            message: "Usuario eliminado correctamente", 
            usuario });
    }
}