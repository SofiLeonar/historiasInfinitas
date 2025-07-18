import Joi from "joi";

const libroSchema = Joi.object({
    titulo: Joi.string().min(3).max(255).required().messages({
        "string.empty": "El título del libro no puede estar vacío",
        "string.base": "El título del libro debe tener entre 3 y 255 caracteres",
        "any.required": "El título del libro es obligatorio",
    }),
    autor: Joi.string().min(3).max(255).required().messages({
        "string.empty": "El autor del libro no puede estar vacío",
        "string.base": "El autor del libro debe tener entre 3 y 255 caracteres",
        "any.required": "El autor del libro es obligatorio",
    }),
    resumen: Joi.string().min(3).max(500).required().messages({
        "string.empty": "El resumen del libro no puede estar vacío",
        "string.base": "El resumen del libro debe tener entre 3 y 500 caracteres",
        "any.required": "El resumen del libro es obligatorio",
    }),
    anio_publicacion: Joi.number().integer().min(1000).max(9999).required().messages({
        "number.base": "El año de publicación debe ser un número",
        "number.empty": "El año de publicación no puede estar vacío",
        "any.required": "El año de publicación es obligatorio",
        "number.min": "El año debe tener al menos 4 dígitos",
        "number.max": "El año debe tener como máximo 4 dígitos"
}),
    imagen: Joi.string().required(),
});

export { libroSchema };