import { createContext, useState, useContext, useEffect } from "react";
import { getUsuarios } from "../services/usuarios"; 
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") ? true : false
    );
    const [user, setUser] = useState(
        localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null
    );
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getUsuarios()
        .then((data) => {
            setUsers(data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error al cargar usuarios:", error);
            setIsLoading(false);
        });
    }, []);

    const login = (email, password) => {
        if (isLoading) {
        toast.error("Cargando usuarios...");
        return false;
        }

        if (users.length === 0) {
        toast.error("No se pudieron cargar los usuarios.");
        return false;
        }

        const user = users.find((user) => user.email === email && user.password === password);

        if (!user) {
        setIsLoggedIn(false);
        toast.error("Credenciales incorrectas.");
        return false;
        }

        setIsLoggedIn(true);
        setUser({
        id: user.id,
        name: user.nombre,
        username: user.usuario, 
        email: user.email,
        role: user.rol, 
        listaDeseados: user.listaDeseados || []
        });
        

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Inicio de sesión exitoso.");
    return true;
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setUser(null);

        toast.success("Cierre de sesión exitoso.");
    };

    return (
        <AuthContext.Provider
        value={{
            isLoggedIn,
            user,
            login,
            logout,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    }

export const useAuth = () => useContext(AuthContext);
