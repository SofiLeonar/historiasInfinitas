import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    email: "",
    password: "",
    rol: "usuario",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/usuarios/${id}`);
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();

        setFormData({
          nombre: data.nombre || "",
          usuario: data.usuario || "",
          email: data.email || "",
          password: "", // No mostrar contraseña actual, dejar vacía para cambio opcional
          rol: data.rol || "usuario",
        });
        setLoading(false);
      } catch (error) {
        toast.error("No se pudo cargar el usuario");
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombre || !formData.usuario || !formData.email) {
      toast.error("Completa los campos obligatorios");
      return;
    }

    try {
      const bodyToSend = {
        nombre: formData.nombre,
        usuario: formData.usuario,
        email: formData.email,
        rol: formData.rol,
      };

      // Solo mandar password si cambió (no vacía)
      if (formData.password) {
        bodyToSend.password = formData.password;
      }

      const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Si usas token para autorización, ponelo aquí:
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bodyToSend),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar usuario");
      }

      toast.success("Usuario actualizado correctamente");
      navigate("/verusuarios"); // O a donde quieras redirigir
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p>Cargando usuario...</p>;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Editar Usuario
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Inputs igual que antes */}
          {/* ... */}
          {/* Repite los inputs con formData y handleChange */}

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="nombre">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="usuario">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Contraseña (dejar vacío para no cambiar)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Nueva contraseña"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="rol">
              Rol
            </label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition border border-gray-900"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
