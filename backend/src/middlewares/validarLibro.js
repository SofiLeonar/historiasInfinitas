export const validarLibro = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const mensajes = error.details.map((detail) => detail.message);
        return res.status(400).json({ errores: mensajes });
    }

    next();
};
