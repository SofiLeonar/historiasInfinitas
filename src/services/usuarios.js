import { API_KEY, usuariosAPI } from "../utils/environment";

const headers = {
    "Content-Type": "application/json",
    "X-Master-Key": API_KEY,
};


export async function getUsuarios() {

    const response = await fetch(usuariosAPI, { headers });
    const data = await response.json(); 
    return data.record.usuarios; 
    
}

