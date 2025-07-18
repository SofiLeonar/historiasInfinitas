import { prisma } from "../providers/prisma.js";

export class ListaDeseadosService {
    static async addLibro({id_usuario, id_libro}) {
        return prisma.listaDeseados.create({
            data: {
                id_usuario,
                id_libro,
            },
        });
    }

    static async quitarLibro({id_usuario, id_libro}) {
        return prisma.listaDeseados.delete({
            where: {
                id_libro_id_usuario: {
                    id_usuario,
                    id_libro,
                },
            },
        });
    }

    static async getListaDeseados({id_usuario}) {
        return prisma.listaDeseados.findMany({
            where: {
                id_usuario,
            },
            include: {
                usuario: true,
                libro: true,
            },
        });
    }


}
