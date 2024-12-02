import React, { useState } from "react";

export function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    email: "",
    contraseña: "",
    rol: "usuario",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Regístrate
        </h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="nombre">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="usuario">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Elige un nombre de usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="contraseña">
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              placeholder="Crea una contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition border border-gray-900"
          >
            Registrar
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
