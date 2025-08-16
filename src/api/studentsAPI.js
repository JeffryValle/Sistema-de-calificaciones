

export const getStudents = async ( token ) => {

  if ( !token ) throw new Error("Token no proporcionado.");
    
  const resp = await fetch(`${import.meta.env.VITE_API_URL}/usuarios`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!resp.ok) throw new Error("Error al obtener estudiantes");

  const json = await resp.json().catch(() => null);
  if (!resp.ok) {
    const msg = (json && json.message) || `Error al obtener estudiantes: HTTP ${resp.status}`;
    throw new Error(msg);
  }

  return json; // { success: true, message: 'Contraseña actualizada correctamente' }
}

export const getCursos = async ( ) => {

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos/`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Error al obtener cursos");

  const json = await response.json().catch(() => null);
  if ( !response.ok ) {
    const msg = (json && json.message) || `Error al obtener estudiantes: HTTP ${response.status}`;
    throw new Error(msg);
  }

  console.log(json);
  return json; // { success: true, message: 'Contraseña actualizada correctamente' }

}

export const getAllMatriculas = async ( token ) => {

  if ( !token ) throw new Error("Token no proporcionado.");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/matriculas/`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) throw new Error("Error al obtener matriculas");

  const json = await response.json().catch(() => null);
  if ( !response.ok ) {
    const msg = (json && json.message) || `Error al obtener matriculas: HTTP ${ response.status }`;
    throw new Error(msg);
  }

  console.log(json);
  return json; // { success: true, message: 'Contraseña actualizada correctamente' }

}