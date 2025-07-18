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

  return response.json(); // Devuelve { usuario: {...} }
}

export async function getUsuarios() {
  const response = await fetch("http://localhost:5000/api/usuarios");
  if (!response.ok) throw new Error("Error al obtener usuarios");
  const data = await response.json();
  return data.usuarios;
}

export async function updateUser(userId, updateData) {
  const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) throw new Error("Error al actualizar usuario");
  return response.json();
}

export async function eliminarUsuario(userId) {
  const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Error al eliminar usuario");
  return response.json();
}
