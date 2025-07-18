import { prisma } from "../providers/prisma.js";

export class LibroService {
    static getAll({limit}) {
        return prisma.libro.findMany({
            take: limit? Number (limit) : undefined,
            orderBy: {
                id: "asc",
            },
        });
    }

    static getById({id}) {
        return prisma.libro.findUnique({
            where: {
                id: Number(id),
            },
        });
    }

    static create({titulo, autor, resumen, anio_publicacion, imagen}) {
        return prisma.libro.create({
            data: {
                titulo: titulo,
                autor: autor,
                resumen: resumen,
                anio_publicacion: anio_publicacion,
                imagen: imagen,
            },
        });
    }

    static update({ id, titulo, autor, resumen, anio_publicacion, imagen }) {
        return prisma.libro.update({
            where: {
                id: Number(id),
            },
            data: {
                titulo,
                autor,
                resumen,
                anio_publicacion,
                imagen
            }
        });
    }

    static delete({id}) {
        console.log("Service ID:", id, typeof id);
        return prisma.libro.delete({
            where: {
                id: Number(id),
            },
        });
    } 
}
    
