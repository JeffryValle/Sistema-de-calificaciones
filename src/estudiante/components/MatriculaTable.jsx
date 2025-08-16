import { useEffect, useState } from "react";
import { getAllMatriculas } from "../../api/studentsAPI.js";

export const MatriculasTable = () => {

    const [ allMatriculas, setAllMatriculas ] = useState([])

    const getToken = () => {
    return localStorage.getItem("auth_token") || location.state?.token || null;
  };

  const getId = () => {
    const userStr = localStorage.getItem("auth_user");
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user.cuenta_id || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchMatriculas = async () => {
      const token = await getToken();
      const id = await getId();
      if (!token || !id) return;
      const matriculas = await getAllMatriculas(token, id);
      setAllMatriculas(matriculas);
    };
    fetchMatriculas();
  }, []);
 
  const matriculas = allMatriculas.data || []

  return (
    <div className="overflow-x-auto p-6">
    <h2 className="text-2xl font-bold mb-4">Estudiantes</h2>
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">CodigoCurso</th>
          <th className="py-2 px-4 border-b">CuentaEstudiante</th>
          <th className="py-2 px-4 border-b">Curso</th>
          <th className="py-2 px-4 border-b">Cupos</th>
          <th className="py-2 px-4 border-b">Estudiante</th>
          <th className="py-2 px-4 border-b">FechaInscripcion</th>
        </tr>
      </thead>
      <tbody>
        { matriculas.map(( curso ) => (
          <tr key={curso.CodigoCurso} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{ curso.CodigoCurso }</td>
            <td className="py-2 px-4 border-b">{ curso.Cuenta }</td>
            <td className="py-2 px-4 border-b">{ curso.Curso }</td>
            <td className="py-2 px-4 border-b">{ curso.Cupos }</td>
            <td className="py-2 px-4 border-b">{ curso.Estudiante }</td>
            <td className="py-2 px-4 border-b">{ curso.FechaInscripcion }</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
