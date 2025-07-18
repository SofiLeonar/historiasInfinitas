import Joi from "joi";

const listaDeseadosSchema = Joi.object({
    id_libro: Joi.number().required().messages({
        "number.empty": "El id del libro no puede estar vacío",
        "any.required": "El id del libro es obligatorio",
    }),
});

export { listaDeseadosSchema };