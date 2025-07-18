import { request } from "express";

export function validateSchemaJoi(schema) {
    return (request, response, next) => {
        const { error, value } = schema.validate(request.body);
        if (error) {
            return response.status(400).json({ error: error.details[0].message });
        }
        next();
    };
}