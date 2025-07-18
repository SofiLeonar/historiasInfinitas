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

        const token = createToken({ 
            id: usuario.id, 
            nombre: usuario.nombre, 
            email: usuario.email, 
            rol: usuario.rol
        });

        res.status(200).json({ 
            message: "Usuario autenticado correctamente", 
            token});
    }

    static async register(req, res) {
        const { nombre, usuario, email, password, rol } = req.body;

        const usuarioExistente = await UsuarioService.getByEmail({ email });

        if (usuarioExistente) {
            res.status(409).json({ error: "Email ya registrado" });
            return;
        }

        const passwordHash = await hashPassword(password);

        const usuarioNuevo = await UsuarioService.create(
            nombre, 
            usuario, 
            email, 
            passwordHash,
            rol,
        );

        const { password: _, ...userWithoutPassword } = usuarioNuevo;

        const token = createToken({
            id: usuarioNuevo.id,
            nombre: usuarioNuevo.nombre,
            email: usuarioNuevo.email,
            rol: usuarioNuevo.rol
        });

        res.status(201).json({ 
            user: userWithoutPassword,
            token
        });
    }

    static async logout(req, res) {
        res.status(200).json({ message: "Sesión cerrada correctamente" });
    }

    static async profile(req, res) {
        res.status(200).json({
            message: "Perfil de usuario",
            user: req.user,
        });
    }
}