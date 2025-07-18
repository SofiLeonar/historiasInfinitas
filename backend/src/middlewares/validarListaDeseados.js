import { listaDeseadosSchema } from "../schemas/listaDeseados.schema.js";

export function validarListaDeseados(req, res, next) {
    const { error } = listaDeseadosSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
