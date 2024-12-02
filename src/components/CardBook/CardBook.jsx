import React from "react";

export function CardBook({ libro }) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{libro.titulo}</h2>
        <p className="text-gray-600 mb-4">por {libro.autor}</p>
        <p className="text-sm text-gray-500 mb-4">{libro.resumen}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Año: {libro.anio_publicacion}</span>
          <span>Editorial: {libro.editorial}</span>
        </div>
      </div>
      <div className="px-6 pb-4">
        <button className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-600 transition">
          Ver más
        </button>
      </div>
    </div>
  );
}
