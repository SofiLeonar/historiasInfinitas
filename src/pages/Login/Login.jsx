import React from "react";

export function Login() {
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
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
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
              placeholder="Ingresa tu contraseña"
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
