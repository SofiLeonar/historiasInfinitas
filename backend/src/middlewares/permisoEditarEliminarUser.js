

export const permisoEditarEliminarUser = (req, res, next) => {
    const usuarioLogueado = req.user; // viene del middleware validarAuth
    const idParametro = req.params.id; // UUID es string

    // Si el usuario es admin o está accediendo/modificando su propio perfil
    if (usuarioLogueado.rol === "admin" || usuarioLogueado.id === idParametro) {
        return next();
    }

    return res.status(403).json({ error: "No tenés permisos para realizar esta acción" });
};