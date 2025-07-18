import React from "react";

export default function ItemUser({ usuario }) {
 const handleDelete = async () => {
  if (!window.confirm(`¿Seguro que querés eliminar al usuario ${usuario.nombre}?`)) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:5000/api/usuarios/${usuario.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al eliminar usuario.");
      return;
    }

    alert("Usuario eliminado correctamente.");

    window.location.reload();
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    alert("Ocurrió un error al intentar eliminar el usuario.");
  }
};

  return (
    <div className="bg-white bg-opacity-90 rounded-md p-4 flex justify-between items-center shadow-md">
      <div>
        <p className="font-semibold text-gray-900">{usuario.nombre}</p>
        <p className="text-gray-700">Usuario: {usuario.usuario}</p>
        <p className="text-gray-700">Email: {usuario.email}</p>
        <p className="text-gray-700">Rol: {usuario.rol}</p>
      </div>

      <div className="flex space-x-3">
        
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
