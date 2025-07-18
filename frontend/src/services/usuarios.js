export async function loginUsuario(email, password) {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al iniciar sesión");
  }

  return response.json(); // Devuelve { usuario: {...}, token: "..." }
}

export async function getUsuarios() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/usuarios", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener usuarios");
  const data = await response.json();
  return data.usuarios;
}

export async function updateUser(userId, updateData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ listaDeseados: updateData }),
  });

  if (!response.ok) throw new Error("Error al actualizar usuario");
  return await response.json();
}

export async function eliminarUsuario(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
  return await res.json();
}
