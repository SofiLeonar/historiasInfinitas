import React from "react";
import creaImg from "/src/assets/crea.png";
import listaImg from "/src/assets/lista.png";
import descubreImg from "/src/assets/descubre.png";
import simpleImg from "/src/assets/simpleyorganizado.png";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div>
            <section>
                <div
                    className="relative bg-cover bg-center text-white"
                    style={{
                        backgroundImage: `url('https://img.freepik.com/fotos-premium/estanteria-borrosa-muchos-libros-antiguos-libreria-o-biblioteca_327072-7345.jpg')`,
                        height: "70vh",
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                    <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center text-center">
                        <p className="mt-6 text-lg md:text-s">
                            "Un lector vive mil vidas antes de morir." <br />
                            — George R.R. Martin —
                        </p>
                        <h1 className="text-5xl md:text-7xl font-[Arizonia]">
                            ¿Qué historia es la siguiente?
                        </h1>
                        <p className="mt-6 text-lg md:text-xl">
                            Tu colección personal de libros, siempre contigo.
                        </p>
                        <div className="mt-8 flex space-x-4">
                            <Link to="/mislibros">
                                <button className="px-6 py-3 bg-white text-black font-semibold rounded shadow-md hover:bg-gray-900 hover:text-white">
                                    Empieza ahora
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                        Todo lo que necesitas para tus lecturas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-110">
                            <img
                                src={creaImg}
                                alt="Crea tu biblioteca personal"
                                className="w-20 h-20 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">Crea tu biblioteca personal</h3>
                            <p className="text-gray-600 mt-2">
                                Registra los libros que has leído y construye tu colección personal.
                            </p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-110">
                            <img
                                src={listaImg}
                                alt="Lista de deseos"
                                className="w-20 h-20 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">Lista de deseos</h3>
                            <p className="text-gray-600 mt-2">
                                Guarda todos los libros que planeas leer próximamente.
                            </p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-110">
                            <img
                                src={descubreImg}
                                alt="Descubre nuevos títulos"
                                className="w-20 h-20 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">Descubre nuevos títulos</h3>
                            <p className="text-gray-600 mt-2">
                                Encuentra nuevas historias y libros populares.
                            </p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-110">
                            <img
                                src={simpleImg}
                                alt="Simple y organizado"
                                className="w-20 h-20 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">Simple y organizado</h3>
                            <p className="text-gray-600 mt-2">
                                Accede fácilmente a tu colección desde cualquier dispositivo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-blue-50 py-12">
                <div className="max-w-7xl mx-auto px-6 md:flex items-center justify-between relative">
                <div className="md:w-1/2 relative">
                        <img
                            src="https://img.freepik.com/foto-gratis/arreglo-libros-taza_23-2148917232.jpg?t=st=1733120672~exp=1733124272~hmac=f05e776b85594ac7d9d42458aebc40dc07094c9a6b73cfa51d1d122d47db4014&w=360"
                            alt="Biblioteca personal"
                            className="w-full h-80 object-cover rounded-lg shadow-lg relative z-0"
                        />
                    </div>
                    <div className="md:w-1/2 text-center px-6">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">
                            Organiza tus historias con estilo
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Una biblioteca digital que te entiende:<br />tus lecturas pasadas, presentes y futuras en un solo lugar.
                        </p>
                        <Link to="/mislibros">
                                <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded shadow-md hover:bg-white hover:text-black">
                                    Crea tu colección
                                </button>
                            </Link>
                    </div>
                    
                </div>
            </section>
        </div>
    );
}
