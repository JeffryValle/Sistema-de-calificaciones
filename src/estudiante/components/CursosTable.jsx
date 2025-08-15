import { useEffect, useState } from "react";
import { getCursos } from "../../api/studentsAPI.js";

export const CursosTable = () => {

    const [ allCursos, setAllCursos ] = useState([])

    useEffect(() => {
    
        return async() => {
        
        const cursos = await getCursos();
        setAllCursos(cursos);
        }
    }, [])

    console.log( {allCursos} )
  return (
    <div className="overflow-x-auto p-6">
    <h2 className="text-2xl font-bold mb-4">Estudiantes</h2>
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Curso-ID</th>
          <th className="py-2 px-4 border-b">Nombre</th>
          <th className="py-2 px-4 border-b">Cupos</th>
        </tr>
      </thead>
      <tbody>
        {allCursos.map((curso) => (
          <tr key={curso.curso_id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{ curso.curso_id }</td>
            <td className="py-2 px-4 border-b">{ curso.nombre }</td>
            <td className="py-2 px-4 border-b">{ curso.cupos }</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
