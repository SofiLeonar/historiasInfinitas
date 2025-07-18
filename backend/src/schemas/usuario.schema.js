import Joi from "joi";

const usuarioSchema = Joi.object({
    nombre: Joi.string().min(3).max(255).required().messages({
        "string.empty": "El nombre del usuario no puede estar vacío",
        "string.base": "El nombre del usuario debe tener entre 3 y 255 caracteres",
        "any.required": "El nombre del usuario es obligatorio",
    }),
    usuario: Joi.string().min(3).max(255).required().messages({
        "string.empty": "El nombre de usuario no puede estar vacío",
        "string.base": "El nombre de usuario debe tener entre 3 y 255 caracteres",
        "any.required": "El nombre de usuario es obligatorio",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "El correo electrónico no puede estar vacío",
        "string.email": "El correo electrónico debe tener entre 3 y 255 caracteres",
        "any.required": "El correo electrónico es obligatorio",
    }),
    password: Joi.string().min(6).max(255).required().messages({
        "string.empty": "La contraseña no puede estar vacía",
        "string.base": "La contraseña debe tener entre 6 y 255 caracteres",
        "any.required": "La contraseña es obligatoria",
    }),
    rol: Joi.string().valid("usuario", "admin").required().messages({
        "string.empty": "El rol no puede estar vacío",
        "any.required": "El rol es obligatorio",
    }),
});

export { usuarioSchema };