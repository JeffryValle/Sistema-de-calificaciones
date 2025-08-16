const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "";


export const getScore = async ( token, id ) => {

  if ( !token ) throw new Error("Token no proporcionado.");
    
  const resp = await fetch(`${import.meta.env.VITE_API_URL}/calificaciones/docente/cursos/${ id }`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!resp.ok) throw new Error("Error al obtener calificaciones");

  const json = await resp.json().catch(() => null);
  if (!resp.ok) {
    const msg = (json && json.message) || `Error al obtener estudiantes: HTTP ${resp.status}`;
    throw new Error(msg);
  }

  return json; // { success: true, message: 'Contraseña actualizada correctamente' }
}
