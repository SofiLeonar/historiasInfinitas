import { Link } from "react-router-dom";

export function Navbar() {
  return (
      <nav className="bg-gray-900 text-gray-400 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                  <img
                      src="/src/assets/logo.ico"
                      alt="Logo"
                      className="w-8 h-8"
                  />
                  <Link to="/" className="text-xl text-white font-semibold" style={{fontFamily: "'Uncial Antiqua', cursive",}}>Alejandría</Link>
              </div>
              <div className="flex space-x-6">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                  <Link to="/libros" className="hover:text-white transition-colors">Libros</Link>
                  <Link to="/misLibros" className="hover:text-white transition-colors">Mis Libros</Link>
              </div>
              <div className="flex space-x-4">
                  <Link to="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link>
                  <Link to="/register" className="hover:text-white transition-colors">Registro</Link>
              </div>
          </div>
      </nav>
  );
}
