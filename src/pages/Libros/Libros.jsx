import { useEffect, useState } from "react";
import { useLibros } from "../../hooks/useLibros";
import { CardBook } from "../../components/CardBook/CardBook";
import { FallingLines } from "react-loader-spinner";

export function Libros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    useLibros().then(([libros]) => {
      console.log(libros);
      setLibros(libros);
    })
    .catch((error)=>console.log(error))
    .finally(() => setLoading(false));
  }, []);

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
      
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
      }}
    >
      <h1 className="text-5xl md:text-6xl text-white mb-8 mt-12 font-[Arizonia]" style={{ textShadow: "2px 2px 4px black" }}>
        Libros
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 pb-12">
        {libros.length === 0 ? (
          <p>No se encontraron libros</p>
        ) : (
          libros.map((libro) => <CardBook key={libro.id} libro={libro} />)
        )}
      </section>
    </div>
  );
}
