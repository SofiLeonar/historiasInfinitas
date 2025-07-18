import { UsuarioService } from "../services/usuario.service.js";
import { hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/hash.js";

export class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;

        const usuario = await UsuarioService.getByEmail({ email });

        if (!usuario) {
            res.status(401).json({ error: "Usuario no encontrado" });
            return;
        }

        const passwordCorrecto = await comparePassword(password, usuario.password);

        if (!passwordCorrecto) {
            res.status(401).json({ error: "Contraseña incorrecta" });
            return;
        }

        console.log("usuario:", usuario);

        const token = createToken({ 
            id: usuario.id,
            rol: usuario.rol,
            nombre: usuario.nombre
        });
        console.log("Token creado:", token);

        res.status(200).json({ 
            message: "Usuario autenticado correctamente", 
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                token
            }
        });
    }

    static async register(req, res) {
        const { nombre, usuario, email, password, rol } = req.body;

        if (!nombre || !usuario || !email || !password || !rol) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const usuarioExistente = await UsuarioService.getByEmail({ email });

        if (usuarioExistente) {
            res.status(409).json({ error: "Email ya registrado" });
            return;
        }

        const passwordHash = await hashPassword(password);

        const usuarioNuevo = await UsuarioService.create({
            nombre, 
            usuario, 
            email, 
            password: passwordHash,
            rol,
    });

        const { password: _, ...userWithoutPassword } = usuarioNuevo;

        const token = createToken({
            id: usuarioNuevo.id,
            rol: usuarioNuevo.rol,
            nombre: usuarioNuevo.nombre,
        });

        res.status(201).json({ 
            message: "Usuario registrado correctamente", 
            usuario: {
                id: usuarioNuevo.id,
                nombre: usuarioNuevo.nombre,
                email: usuarioNuevo.email,
                rol: usuarioNuevo.rol,
                token
            }
        });
    }

    static async logout(req, res) {
        res.status(200).json({ message: "Sesión cerrada correctamente" });
    }

    static async profile(req, res) {
        try {
        const usuario = await UsuarioService.getById({ id: req.user.id });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const { password, ...userWithoutPassword } = usuario;

        res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el perfil del usuario" });
    }
}
}