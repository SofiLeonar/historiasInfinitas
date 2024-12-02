import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export function Login() {
  const { isLoggedIn, login } = useAuth(); 
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setCredentials((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(credentials.email, credentials.password);
    console.log("Intentando iniciar sesión con:", credentials.email, credentials.password);


    if (success) {
      navigate("/"); 
    } else {
      toast.error("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  if (isLoggedIn) {
    return null; 
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-libros-biblioteca_883148-1060.jpg?w=1060')`,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Iniciar sesión
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition border border-gray-900"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
