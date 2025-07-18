import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { eliminarUsuario } from "../../services/usuarios";

export function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("Usuario en Navbar:", user);

  return (
    <nav className="bg-gray-900 text-gray-400 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/src/assets/logo.ico" alt="Logo" className="w-8 h-8" />
          <Link
            to="/"
            className="text-xl text-white font-semibold"
            style={{ fontFamily: "'Uncial Antiqua', cursive" }}
          >
            Alejandría
          </Link>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/libros" className="hover:text-white transition-colors">
            Libros
          </Link>
          <Link to="/listadedeseados" className="hover:text-white transition-colors">
            Lista de deseados
          </Link>
          {isAdmin && (
            <>
              <Link to="/agregarlibro" className="hover:text-white transition-colors">
                Agregar libro
              </Link>
              <Link to="/usuarios" className="hover:text-white transition-colors">
                Lista de usuarios
              </Link>
            </>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          {!isLoggedIn ? (
            <div className="flex space-x-4">
              <Link to="/login" className="hover:text-white transition-colors">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="hover:text-white transition-colors">
                Registro
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-white font-semibold focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="Menú usuario"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <span>{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20 text-gray-900">
                  <Link
                    to="/editarusuario"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Editar usuario
                  </Link>
                  <button
                    onClick={async () => {
                      setDropdownOpen(false);
                      const confirmacion = window.confirm(
                        "¿Estás seguro que querés eliminar tu usuario?"
                      );
                      if (!confirmacion) return;

                      try {
                        await eliminarUsuario(user.id);
                        logout();
                        navigate("/login");
                      } catch (error) {
                        alert("Ocurrió un error al eliminar el usuario.");
                        console.error(error);
                      }
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Eliminar usuario
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
