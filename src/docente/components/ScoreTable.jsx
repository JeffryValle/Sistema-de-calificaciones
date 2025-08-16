import { useEffect, useState } from "react";
import { getScore } from "../../api/docenteAPI.js";

export const ScoreTable = () => {

    const [ score, setScore ] = useState([])

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
    const fetchScore = async () => {
      const token = await getToken();
      const id = await getId();
      if (!token || !id) return;
      const calificaciones = await getScore(token, id);
      setScore( calificaciones );
    };
    fetchScore();
  }, []);
 
  const calific = score.data || []
  console.log( score.data )

  return (
    <div className="overflow-x-auto p-6">
    <h2 className="text-2xl font-bold mb-4">Calificaciones</h2>
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Cuenta</th>
          <th className="py-2 px-4 border-b">Docente</th>
          <th className="py-2 px-4 border-b">Periodo#1</th>
          <th className="py-2 px-4 border-b">Periodo#2</th>
          <th className="py-2 px-4 border-b">Periodo#3</th>
          <th className="py-2 px-4 border-b">Rol</th>
        </tr>
      </thead>
      <tbody>
        { calific.map(( curso ) => (
          <tr key={curso.CodigoCurso} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{ curso.Cuenta }</td>
            <td className="py-2 px-4 border-b">{ curso.Docente }</td>
            <td className="py-2 px-4 border-b">{ curso.Periodo_1 ?? 'N/A'}</td>
            <td className="py-2 px-4 border-b">{ curso.Periodo_2 ?? 'N/A' }</td>
            <td className="py-2 px-4 border-b">{ curso.Periodo_3 ?? 'N/A' }</td>
            <td className="py-2 px-4 border-b">{ curso.Rol }</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
