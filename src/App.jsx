import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar/Navbar'
import {Footer} from "./components/Footer/Footer"
import { Home } from './pages/Home/Home'
import { Libros } from './pages/Libros/Libros'
import { MisLibros } from './pages/MisLibros/MisLibros'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ListaDeDeseados } from './pages/ListaDeDeseados/ListaDeDeseados'
import { AgregarLibro } from './pages/AgregarLibro/AgregarLibro';
import { VerLibro } from './pages/VerLibro/VerLibro';
import { EditarLibro} from './pages/EditarLibro/EditarLibro';


const routes = [
  { path: "/", name: "Home", component: <Home /> },
  { path: "/libros", name: "Libros", component: <Libros /> },
  { path: "/misLibros", name: "Mis Libros", component: <MisLibros /> },
  { path: "/listadedeseados", name: "Lista De Deseados", component: <ListaDeDeseados /> },
  { path: "/login", name: "Login", component: <Login /> },
  { path: "/register", name: "Register", component: <Register /> },
  { path: "/agregarlibro", name: "Agregar Libro", component: <AgregarLibro /> },
  { path: "/verlibro/:id", name: "Ver Libro", component: <VerLibro /> },
  { path: "/editarlibro/:id", name: "Editar Libro", component: <EditarLibro /> },
];

function App() {
  

  return (
    
    <AuthProvider >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        theme="dark"
      />

      <BrowserRouter>
      <Navbar />
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Routes>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    
  );
}
export default App;
