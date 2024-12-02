import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useLibros } from "../../hooks/useLibros";
import { FallingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { getLibros } from "../../services/libros";
import { updateUser } from "../../services/usuarios";
import { useAuth } from "../../context/AuthContext"; 

export function VerLibro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  const [isInDeseados, setIsInDeseados] = useState(false);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        setLoading(true);
        const libros = await getLibros();
        const libroEncontrado = libros.find((libro) => libro.id === parseInt(id, 10));
  
        if (!libroEncontrado) throw new Error("Libro no encontrado");
  
        setLibro(libroEncontrado);
  
        const listaLimpia = user?.listaDeseados
          ? [...new Set(user.listaDeseados.flat())]
          : [];
        user.listaDeseados = listaLimpia;
  
        setIsInDeseados(listaLimpia.includes(libroEncontrado.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLibro();
  }, [id, user]);
  
  const handleAgregarQuitarDeseados = async (libroId) => {
    try {
      if (!user) throw new Error("Usuario no encontrado.");
      let nuevaListaDeseados;
      let nuevoEstadoIsInDeseados;

      if (user.listaDeseados.includes(libroId)) {
        nuevaListaDeseados = user.listaDeseados.filter((id) => id !== libroId);
        nuevoEstadoIsInDeseados = false;
        toast.info("Libro eliminado de tu lista de deseados.");
      } else {
        nuevaListaDeseados = [...user.listaDeseados, libroId];
        nuevoEstadoIsInDeseados = true;
        toast.success("Libro agregado a tu lista de deseados.");
      }
  
      nuevaListaDeseados = [...new Set(nuevaListaDeseados.flat())];
  
      user.listaDeseados = nuevaListaDeseados;
      localStorage.setItem("user", JSON.stringify(user));
      setIsInDeseados(nuevoEstadoIsInDeseados);

  
      const response = await updateUser(user.id, nuevaListaDeseados);
      if (!response) {
        toast.error("Hubo un error al actualizar la lista de deseados.");
        setIsInDeseados(!nuevoEstadoIsInDeseados);  
    }
    } catch (error) {
      console.error("Error al manejar lista de deseados:", error);
      toast.error("Hubo un problema al actualizar la lista de deseados.");
    }
  };
  
  
  const handleEdit = () => {
    navigate(`/editarlibro/${libro.id}`);
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
        <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
        />
      </div>
      );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
      }}
    >
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 max-w-4xl flex flex-col md:flex-row">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <img
            src={libro.imagen}
            alt={`Portada de ${libro.titulo}`}
            className="w-48 h-64 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{libro.titulo}</h1>
          <p className="text-gray-600 mb-2">Autor: {libro.autor}</p>
          <p className="text-gray-600 mb-2">Año de publicación: {libro.anio_publicacion}</p>
          <p className="text-gray-600 mb-2">Editorial: {libro.editorial}</p>
          <p className="text-gray-700 mb-4">{libro.resumen}</p>

          <div className="flex space-x-4">
          <button
              onClick={() => handleAgregarQuitarDeseados(libro.id)}
              className={`px-4 py-2 rounded transition ${isInDeseados ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-800'}`}
            >
              {isInDeseados ? 'Eliminar de Deseados' : 'Agregar a Deseados'}
            </button>

            {isAdmin && (
            <div>
                <button onClick={handleEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Editar
              </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
