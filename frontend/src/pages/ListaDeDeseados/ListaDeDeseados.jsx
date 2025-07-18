import React, { useState, useEffect } from "react";
import { getLibros } from "../../services/libros";
import { useAuth } from "../../context/AuthContext";
import { CardBook } from "../../components/CardBook/CardBook";
import { FallingLines } from "react-loader-spinner";

export function ListaDeDeseados() {
  const [librosDeseados, setLibrosDeseados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth(); 
  
  useEffect(() => {
    const fetchLibrosDeseados = async () => {
      try {
        if (!user || !user.listaDeseados) {
          setLibrosDeseados([]);
          return;
        }

        setLoading(true);
        const libros = await getLibros(); 
        const librosFiltrados = libros.filter((libro) =>
          user.listaDeseados.includes(libro.id)
        );

        setLibrosDeseados(librosFiltrados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrosDeseados();
  }, [user]);

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
}  if (error) return <p>Error: {error}</p>;

  return (
    <div
    className="flex flex-col items-center min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
    }}
  >
    <h1 className="text-5xl md:text-6xl text-white mb-8 mt-12 font-[Arizonia]" style={{ textShadow: "2px 2px 4px black" }}>
      Lista de deseados
    </h1>

    <section className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 pb-12">
      {librosDeseados.length === 0 ? (
        <p className="text-white md:text-6xl font-bold">No tienes libros en tu lista de deseados.</p>
      ) : (
          librosDeseados.map((libro) => <CardBook key={libro.id} libro={libro} />)
      )}
      </section>
    </div>
  );
}

