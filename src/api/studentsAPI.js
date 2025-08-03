

export const fetchStudents= async () => {
    
  const res = await fetch(`${ process.env.API_URL }/api/students`);

  if (!res.ok) throw new Error("Error al obtener estudiantes");

  return res.json();
}
