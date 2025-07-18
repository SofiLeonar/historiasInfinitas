import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function EditarLibro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    resumen: "",
    anio_publicacion: "",
    imagen: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/libros/${id}`);
        if (!response.ok) {
          throw new Error("Libro no encontrado");
        }
        const data = await response.json();

        setFormData(data.libro);
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
     setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const response = await fetch(`http://localhost:5000/api/libros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          anio_publicacion: Number(formData.anio_publicacion),
        }),
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
