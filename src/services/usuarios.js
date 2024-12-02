import { API_KEY, usuariosAPI } from "../utils/environment";
import { toast } from "react-toastify";

const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY,
};

export async function getUsuarios() {
  const response = await fetch(usuariosAPI, { headers });
  const data = await response.json();
  return data.record.usuarios;
}

export async function updateUser(userId, libroId) {
  try {
    const response = await fetch(usuariosAPI, { headers });

    if (!response.ok) {
      throw new Error("No se pudieron obtener los usuarios.");
    }

    const data = await response.json();
    const usuarios = data.record.usuarios;

    const usuario = usuarios.find((user) => user.id === userId);
    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    const updatedUser = { ...usuario };

    if (!updatedUser.listaDeseados) {
      updatedUser.listaDeseados = [];
    }

    if (updatedUser.listaDeseados.includes(libroId)) {
      toast.info("Este libro ya está en tu lista de deseados.");
      return false;
    }

    updatedUser.listaDeseados.push(libroId);

    console.log("Usuario actualizado:", updatedUser);

    const updatedUsuarios = usuarios.map(user => 
      user.id === userId ? updatedUser : user
    );

    const updateResponse = await fetch(
      `https://api.jsonbin.io/v3/b/674d7c14ad19ca34f8d3ff82`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ usuarios: updatedUsuarios }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Error al actualizar la lista de deseados.");
    }

    //toast.success("Libro agregado a tus deseados!");
    return true;
  } catch (error) {
    toast.error(`Error al actualizar el usuario: ${error.message}`);
    console.error(error);
    return false;
  }
}
