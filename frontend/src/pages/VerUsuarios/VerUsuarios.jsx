import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import ItemUser from "../../components/ItemUser/ItemUser";

export function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const usuariosSimulados = [
          { id: "1", nombre: "Ana Pérez", usuario: "ana123", email: "ana@example.com", rol: "usuario" },
          { id: "2", nombre: "Juan López", usuario: "juanl", email: "juan@example.com", rol: "admin" },
        ];
        setUsuarios(usuariosSimulados);
      } catch {
        setError("Error cargando usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading)
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
        }}
      >
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="loading" />
      </div>
    );

  if (error) return <p className="text-white text-center mt-8">{error}</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-12"
      style={{
        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
      }}
    >
      <h1
        className="text-5xl md:text-6xl text-white mb-8 mt-12 font-[Arizonia] text-center" style={{ textShadow: "2px 2px 4px black" }}>
        Lista de Usuarios
      </h1>

      <div className="max-w-5xl mx-auto space-y-4">
        {usuarios.length === 0 ? (
          <p className="text-white text-center text-xl">No hay usuarios para mostrar.</p>
        ) : (
          usuarios.map((usuario) => <ItemUser key={usuario.id} usuario={usuario} />)
        )}
      </div>
    </div>
  );
}
