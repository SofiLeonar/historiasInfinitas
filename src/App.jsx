import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar'
import {Footer} from "./components/Footer/Footer"
import { Home } from './pages/Home/Home'
import { Libros } from './pages/Libros/Libros'
import { MisLibros } from './pages/MisLibros/MisLibros'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = [
  { path: "/", name: "Home", component: <Home /> },
  { path: "/libros", name: "Libros", component: <Libros /> },
  { path: "/misLibros", name: "Mis Libros", component: <MisLibros /> },
  { path: "/login", name: "Login", component: <Login /> },
  { path: "/register", name: "Register", component: <Register /> },
];

function App() {


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
    </>
  )
}
export default App;
