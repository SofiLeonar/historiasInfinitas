import { createContext, useContext, useState } from "react";
import { loginUsuario } from "../services/usuarios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser); // directo sin cambios
    }
    return null;
  });

  const login = async (email, password) => {
    try {
      const data = await loginUsuario(email, password);

      const usuario = data.usuario; // directo

      setIsLoggedIn(true);
      setUser(usuario);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(usuario));

      toast.success("Inicio de sesión exitoso.");
      return true;
    } catch (error) {
      toast.error("Credenciales incorrectas o error en el servidor.");
      setIsLoggedIn(false);
      setUser(null);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Cierre de sesión exitoso.");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
