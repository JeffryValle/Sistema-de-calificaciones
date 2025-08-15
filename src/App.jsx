import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'
import { PanelAdmin } from './admin/PanelAdmin.jsx'
import { StudentsTabla } from './admin/components/StudentsTabla.jsx'
import { useState } from 'react'
import { Matriculas } from './admin/components/Matriculas.jsx'
import LoadingRedirect from './components/LoadingRedirect.jsx'
import { SetPassword } from './components/SetPassword.jsx'
import { PanelEstudiante } from './estudiante/PanelEstudiante.jsx'
import { PanelDocente } from './docente/PanelDocente.jsx'
import { CursosTable } from './estudiante/components/CursosTable.jsx'

export const App = () => {

  const [ students, setStudents ] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@mail.com", telefono: "123456789", rol: "estudiante" },
    { id: 2, nombre: "Ana López", correo: "ana@mail.com", telefono: "987654321", rol: "estudiante" }
  ]);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/redirecting" element={<LoadingRedirect  />} />
        <Route path="/set-password" element={<SetPassword  />} />

        
        <Route path="/admin" element={<PanelAdmin />} >
          <Route path="estudiantes" element={<StudentsTabla students={ students } /> } />
          <Route path="matriculas" element={<Matriculas students={ students } />} />
        </Route>

        <Route path="/estudiante" element={<PanelEstudiante />} >
          <Route path="/estudiante/estudiantes" element={<CursosTable /> } />
          <Route path="/estudiante/matriculas" element={<Matriculas students={ students } />} />
          <Route path="/estudiante/cursos" element={<Matriculas students={ students } />} />
        </Route>

        <Route path="/docente" element={<PanelDocente />} >
          <Route path="estudiantes" element={<StudentsTabla students={ students } /> } />
          <Route path="matriculas" element={<Matriculas students={ students } />} />
        </Route>

      </Routes>
    </BrowserRouter>

  )
}
