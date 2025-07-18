import React from "react";

export default function ItemUser({ usuario }) {
  const handleEdit = () => alert(`Editar usuario: ${usuario.nombre}`);
  const handleDelete = () => {
    if (!window.confirm(`¿Seguro que querés eliminar al usuario ${usuario.nombre}?`)) return;
    alert(`Usuario ${usuario.nombre} eliminado (simulado)`);
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
          onClick={handleEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Editar
        </button>
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
