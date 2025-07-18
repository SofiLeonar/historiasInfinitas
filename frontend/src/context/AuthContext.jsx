import React, { createContext, useContext, useState, useEffect } from "react";

// Función para decodificar token JWT sin librerías externas
function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al decodificar token:", error);
    return null;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Traemos el token guardado en localStorage, si existe
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    console.log("useEffect token:", token);
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        // Seteamos user con los datos que vienen en el token
        setUser({
          id: decoded.id,
          role: decoded.rol || decoded.role,    // según cómo venga el token
          name: decoded.nombre || decoded.name || "",
        });
        console.log("Usuario seteado desde token:", decoded);
      } else {
        setUser(null);
      }
    } else {
      console.log("No hay token, usuario seteado como null.");
      setUser(null);
    }
  }, [token]);

  // Función para login: recibe email y password, llama al backend y guarda token
  const login = async (email, password) => {
    try {
      console.log("Intentando login con:", email);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        console.error("Login fallido, status:", res.status);
        return false;
      }

      const data = await res.json();
      console.log("Respuesta login backend:", data);

      // Validamos que el token venga dentro de data.usuario.token
      if (!data.usuario?.token) {
        console.error(
          "No se recibió token dentro del usuario en la respuesta del backend"
        );
        return false;
      }

      // Guardamos token en localStorage y en estado para actualizar contexto
      localStorage.setItem("token", data.usuario.token);
      setToken(data.usuario.token);

      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  // Función para logout: limpia token y user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar AuthContext fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
