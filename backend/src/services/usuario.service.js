import { prisma } from "../providers/prisma.js";
import { hashPassword } from "../utils/hash.js";

export class UsuarioService {    
    static async getAll({limit}) {
        return prisma.usuario.findMany();
    }

    static async getById({id}) {
        return prisma.usuario.findUnique({
            where: {
                id: id,
            },
        });       
    }

    static async getByEmail({email}) {
    return prisma.usuario.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            nombre: true,
            email: true,
            rol: true,
            password: true,
        },
    });
}


    static async create({nombre, usuario, email, password, rol}) {
        return prisma.usuario.create({
            data: {
                nombre,
                usuario,
                email,
                password,
                rol,
            },
        });
    }

   static async update({ id, nombre, usuario, email, password, rol }) {
    const dataToUpdate = {
      nombre,
      usuario,
      email,
      rol,
    };

    if (password) {
      dataToUpdate.password = password;
    }

    return prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
    });
  }

    static async delete({id}) {
        return prisma.usuario.delete({
            where: {
                id: id,
            },
        });
    }

}