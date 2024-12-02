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

export async function updateUser(userId, listaDeseados) {
    try {
      const response = await fetch(usuariosAPI, { headers });
      if (!response.ok) throw new Error("No se pudieron obtener los usuarios.");
  
      const data = await response.json();
      const usuarios = data.record.usuarios;
  
      const usuario = usuarios.find((user) => user.id === userId);
      if (!usuario) throw new Error("Usuario no encontrado.");
  
      const listaLimpia = Array.isArray(listaDeseados)
        ? [...new Set(listaDeseados.flat())]
        : [];
      usuario.listaDeseados = listaLimpia;
  
      const updatedUsuarios = usuarios.map((user) =>
        user.id === userId ? usuario : user
      );
  
      const updateResponse = await fetch(usuariosAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ usuarios: updatedUsuarios }),
      });
  
      if (!updateResponse.ok) throw new Error("Error al actualizar el usuario.");
  
      return true;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return false;
    }
  }
  