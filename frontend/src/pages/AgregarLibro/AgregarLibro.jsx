import React, { useState } from "react";
import { toast } from "react-toastify";
import { getLibros } from "../../services/libros";
import { librosAPI, API_KEY } from "../../utils/environment";

export function AgregarLibro() {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    resumen: "",
    anio_publicacion: "",
    editorial: "",
    imagen: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const libros = await getLibros();
  
      if (!formData.titulo || !formData.autor || !formData.anio_publicacion) {
        toast.error("Por favor, completa todos los campos requeridos.");
        return;
      }
  
      const nuevoLibro = {
        id: libros.length ? libros[libros.length - 1].id + 1 : 1,
        titulo: formData.titulo,
        autor: formData.autor,
        resumen: formData.resumen,
        anio_publicacion: formData.anio_publicacion,
        editorial: formData.editorial,
        imagen: formData.imagen,
      };
  
      const response = await fetch(librosAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY, 
        },
        body: JSON.stringify({ libros: [...libros, nuevoLibro] }),
      });
  
      if (!response.ok) {
        toast.error("Hubo un problema al agregar el libro.");
        return;
      }
  
      toast.success("Libro agregado exitosamente.");
  
      setFormData({
        titulo: "",
        autor: "",
        resumen: "",
        anio_publicacion: "",
        editorial: "",
        imagen: "",
      });
    } catch (error) {
      console.error("Error al agregar libro:", error);
      toast.error("Hubo un problema al registrar el libro.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Agregar Nuevo Libro
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="titulo">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Título del libro"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="autor">
              Autor
            </label>
            <input
              type="text"
              id="autor"
              name="autor"
              placeholder="Autor del libro"
              value={formData.autor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="resumen">
              Resumen
            </label>
            <textarea
              id="resumen"
              name="resumen"
              placeholder="Escribe un resumen del libro"
              value={formData.resumen}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="anio_publicacion">
              Año de Publicación
            </label>
            <input
              type="number"
              id="anio_publicacion"
              name="anio_publicacion"
              placeholder="Ejemplo: 2023"
              value={formData.anio_publicacion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="editorial">
              Editorial
            </label>
            <input
              type="text"
              id="editorial"
              name="editorial"
              placeholder="Nombre de la editorial"
              value={formData.editorial}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="imagen">
              URL de la Imagen
            </label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              placeholder="URL de la portada del libro"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition border border-gray-900"
          >
            Agregar Libro
          </button>
        </form>
      </div>
    </div>
  );
}
