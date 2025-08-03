import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'
import { PanelAdmin } from './admin/PanelAdmin.jsx'
import { StudentsTabla } from './admin/components/StudentsTabla.jsx'
import { useState } from 'react'
import { Matriculas } from './admin/components/Matriculas.jsx'

export const App = () => {

  const [ students, setStudents ] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@mail.com", telefono: "123456789", rol: "estudiante" },
    { id: 2, nombre: "Ana López", correo: "ana@mail.com", telefono: "987654321", rol: "estudiante" }
  ]);

  return (
    
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/register" element={<Register  />} />

        
        <Route path="/admin" element={<PanelAdmin />} >
          <Route path="estudiantes" element={<StudentsTabla students={ students } /> } />
          <Route path="matriculas" element={<Matriculas students={ students } />} />
        </Route>

      </Routes>
    </BrowserRouter>

  )
}
