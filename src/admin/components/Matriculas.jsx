
export const Matriculas = ({ students }) => (
  <div className="overflow-x-auto p-6">
    <h2 className="text-2xl font-bold mb-4">Matriculas</h2>
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Cuenta</th>
          <th className="py-2 px-4 border-b">Nombre</th>
          <th className="py-2 px-4 border-b">Correo</th>
          <th className="py-2 px-4 border-b">Teléfono</th>
          <th className="py-2 px-4 border-b">Rol</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{student.nombre}</td>
            <td className="py-2 px-4 border-b">{student.correo}</td>
            <td className="py-2 px-4 border-b">{student.telefono}</td>
            <td className="py-2 px-4 border-b capitalize">{student.rol}</td>
            <td className="py-2 px-4 border-b capitalize">{student.rol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);