import React from "react";
import { useNavigate } from "react-router-dom";

export function CardBook({ libro }) {
    const navigate = useNavigate();
  
    const handleVerMas = () => {
      navigate(`/verlibro/${libro.id}`);
    };
  
    return (
      <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-300">
        <img
        src={libro.imagen}
        alt={`Portada de ${libro.titulo}`}
        className="w-full h-48 object-cover"
      />
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
          <button
            onClick={handleVerMas}
            className="bg-gray-800 text-white w-full py-2 rounded hover:bg-gray-600 transition"
          >
            Ver más
          </button>
        </div>
      </div>
    );
  }
  