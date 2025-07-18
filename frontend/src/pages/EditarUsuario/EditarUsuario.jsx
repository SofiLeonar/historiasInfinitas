import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del formulario con los campos del usuario
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    email: "",
    password: "",
    rol: "usuario",
  });

  // Estado para mostrar carga mientras trae los datos
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUsuario = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/usuarios/${id}`);
      if (!res.ok) throw new Error("Error al obtener usuario");
      const data = await res.json();

      // Aquí accedés a data.usuario, porque tu backend responde { usuario: {...} }
      setFormData({
        nombre: data.usuario.nombre || "",
        usuario: data.usuario.usuario || "",
        email: data.usuario.email || "",
        password: "",
        rol: data.usuario.rol || "usuario",
      });
      setLoading(false);
    } catch (error) {
      toast.error("No se pudo cargar el usuario");
      setLoading(false);
      console.error(error);
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

    if (formData.password) {
      bodyToSend.password = formData.password;
    }

    console.log("Enviando update:", bodyToSend);

    const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyToSend),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al actualizar usuario");
    }

    toast.success("Usuario actualizado correctamente");
    navigate("/verusuarios");
  } catch (error) {
    toast.error(error.message);
    console.error("Error en update usuario:", error);
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
          <div>
            <label htmlFor="nombre" className="block mb-1 font-medium">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="usuario" className="block mb-1 font-medium">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Contraseña (dejar vacío para no cambiar)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nueva contraseña"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="rol" className="block mb-1 font-medium">
              Rol
            </label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
