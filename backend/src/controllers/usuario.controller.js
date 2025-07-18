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
            console.log("Recibido:", { nombre, usuario, email, passwordHash, rol }); 
            console.log("Creando usuario en DB...");
            const usuarioNuevo = await UsuarioService.create({
                nombre, 
                usuario, 
                email, 
                password: passwordHash,
                rol,
            });
            res.status(201).json({ usuarioNuevo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message || "Error al crear el usuario" }); 
            
        }
    }

   static async update(req, res) {
  const { id } = req.params;
  const { nombre, usuario, email, password, rol } = req.body;

  console.log("Datos recibidos en body:", req.body);

  try {
    let dataToUpdate = {
      nombre,
      usuario,
      email,
      rol,
    };

    if (password && password.trim() !== "") {
      dataToUpdate.password = await hashPassword(password);
    }

    const usuarioActualizado = await UsuarioService.update({
      id,
      ...dataToUpdate,
    });

    res.status(200).json({ usuarioActualizado });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    if (error.code) {
      console.error("Prisma error code:", error.code);
      console.error("Error meta:", error.meta);
    }
    res.status(400).json({ error: error.message || "Error al actualizar usuario" });
  }
}

    static async delete(req, res) {
        const { id } = req.params;

        if (req.user.id !== id && req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado para eliminar este usuario" });
        }

        const usuario = await UsuarioService.getById({ id });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await UsuarioService.delete({ id });

        res.status(200).json({ 
            message: "Usuario eliminado correctamente", 
            usuario 
        });
    }
}