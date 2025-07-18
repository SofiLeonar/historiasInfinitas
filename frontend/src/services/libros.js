/*import { librosAPI, API_KEY } from "../utils/environment";

const headers = {
    "Content-Type": "application/json",
    "X-Master-Key": API_KEY,
};


export async function getLibros() {

    const response = await fetch(librosAPI, { headers });
    const data = await response.json(); 
    return data.record.libros; 
    
}*/

//const API_URL = "http://localhost:5000/api/libros"; // tu endpoint del backend

export async function getLibros() {
  const response = await fetch("http://localhost:5000/api/libros");
  if (!response.ok) throw new Error("Error al obtener libros");
  const data = await response.json();
  return data.libros;
}
