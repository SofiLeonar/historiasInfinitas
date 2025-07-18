import Joi from "joi";

const listaDeseadosSchema = Joi.object({
    id_libro: Joi.number().required().messages({
        "number.empty": "El id del libro no puede estar vacío",
        "any.required": "El id del libro es obligatorio",
    }),
    id_usuario: Joi.number().required().messages({
        "number.empty": "El id del usuario no puede estar vacío",
        "any.required": "El id del usuario es obligatorio",
    }),
});

export { listaDeseadosSchema };