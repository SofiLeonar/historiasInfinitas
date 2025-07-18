import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center space-x-6 mb-6">
                <div className="flex space-x-6">
                        <a href="#sobre-nosotros" className="hover:text-gray-300 transition-colors">Sobre nosotros</a>
                        <a href="#soporte" className="hover:text-gray-300 transition-colors">Soporte</a>
                        <a href="#preguntas-frecuentes" className="hover:text-gray-300 transition-colors">Preguntas frecuentes</a>
                        <a href="#politica-de-privacidad" className="hover:text-gray-300 transition-colors">Política de privacidad</a>
                        <a href="#contacto"className="hover:text-gray-300 transition-colors">Contacto</a>
                    </div>

                </div>
                <div className="flex justify-center space-x-6 mb-6">
                    {[
                        { icon: <Facebook />, url: "#" },
                        { icon: <Instagram />, url: "#" },
                        { icon: <Twitter />, url: "#" },
                        { icon: <Youtube />, url: "#" },
                    ].map(({ icon, url }, index) => (
                        <a
                            key={index}
                            href={url}
                            className="hover:text-gray-300 transition-colors"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
                <p className="text-center text-sm">
                     2024 Leonardelli y Sosa &copy; todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
