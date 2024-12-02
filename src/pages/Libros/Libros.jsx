import { useEffect, useState } from "react";
import { useLibros } from "../../hooks/useLibros";
import { CardBook } from "../../components/CardBook/CardBook";

export function Libros() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    useLibros().then(([libros]) => {
      console.log(libros);
      setLibros(libros);
    });
  }, []);

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
        {libros.map((libro) => (
          <CardBook libro={libro} key={libro.id} />
        ))}
      </section>
    </div>
  );
}
