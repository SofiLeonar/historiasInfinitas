import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLibros } from "../../hooks/useLibros";
import { librosAPI, API_KEY } from "../../utils/environment";

export function EditarLibro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    resumen: "",
    anio_publicacion: "",
    editorial: "",
    imagen: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        setLoading(true);
        const [libros] = await useLibros();
        const libroEncontrado = libros.find((libro) => libro.id === parseInt(id, 10));

        if (!libroEncontrado) {
          throw new Error("Libro no encontrado");
        }

        setFormData(libroEncontrado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLibro();
  }, [id]);

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
      const [libros] = await useLibros();

      const updatedLibros = libros.map((libro) =>
        libro.id === parseInt(id, 10) ? { ...formData } : libro
      );

      const response = await fetch(librosAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ libros: updatedLibros }),
      });

      if (!response.ok) {
        toast.error("Hubo un problema al actualizar el libro.");
        return;
      }

      toast.success("Libro actualizado exitosamente.");
      navigate(`/verlibro/${id}`);
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
      toast.error("Hubo un problema al actualizar el libro.");
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Editar Libro
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
              value={formData.titulo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
              value={formData.autor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="resumen">
              Resumen
            </label>
            <textarea
              id="resumen"
              name="resumen"
              value={formData.resumen}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
              value={formData.anio_publicacion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
              value={formData.editorial}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
              value={formData.imagen}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
