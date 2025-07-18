export async function getLibros() {
  const response = await fetch("http://localhost:5000/api/libros");
  if (!response.ok) throw new Error("Error al obtener libros");
  const data = await response.json();
  return data.libros;
}
