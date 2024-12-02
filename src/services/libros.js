import { librosAPI, API_KEY } from "../utils/environment";

const headers = {
    "Content-Type": "application/json",
    "X-Master-Key": API_KEY,
};


export async function getLibros() {

    const response = await fetch(librosAPI, { headers });
    const data = await response.json(); 
    return data.record.libros; 
    
}