import { Link, useNavigate } from 'react-router-dom';
import imagenLogin from '../../assets/login-img.webp';
import { useState } from 'react';
import { registerUser } from '../auth/auth';

export const Register = () => {

    const [ form, setForm ] = useState({
        nombre: "",
        correo: "",
        password: "",
        telefono: "",
        rol: ""
    });

//     {
//     "nombre": "Jeffry Espinal Valle",
//     "correo": "jeffry.espinal@unah.hn",
//     "telefono": "98899889",
//     "password": "123456789",
//     "rol": "admin"     
// }


    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async event => {

        event.preventDefault();
        
        setError("");

        try {
            const resp = await registerUser(form);

            console.log( resp )

            navigate("/"); // Redirige al login tras registro exitoso
        
        } catch ( err ) {
        
            setError("Error al registrarse", err.message);
        }
    };


  return (
    <>
      <div className="flex min-h-screen">
        {/* Registro a la izquierda */}
        <div className="flex w-full md:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-2 mb-16 text-center text-6xl/8 font-bold tracking-tight text-gray-900">
              Registro
            </h1>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={ handleSubmit }>
              <div>
                <label htmlFor="name" className="block text-l/6 font-medium text-gray-900">
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={ handleChange }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-l/6 font-medium text-gray-900">
                  Correo
                </label>
                <div className="mt-2">
                  <input
                    id="correo"
                    name="correo"
                    type="correo"
                    required
                    value={form.correo}
                    onChange={ handleChange }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-l/6 font-medium text-gray-900">
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={ form.password }
                    onChange={ handleChange }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-l/6 font-medium text-gray-900">
                  Teléfono
                </label>
                <div className="mt-2">
                  <input
                    id="telefono"
                    name="telefono"
                    type="text"
                    required
                    value={ form.telefono }
                    onChange={ handleChange }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="rol" className="block text-l/6 font-medium text-gray-900">
                  Rol
                </label>
                <div className="mt-2">
                  <select
                    id="rol"
                    name="rol"
                    required
                    value={ form.rol }
                    onChange={ handleChange }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value=""> -- Seleccione -- </option>
                    <option value="admin">Administrador</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="docente">Docente</option>
                  </select>
                </div>
              </div>

              { error && (
                <div className="text-red-500 text-sm text-center">{ error }</div>
              )}


              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-l/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Registrarse
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-l/6 text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
        {/* Imagen a la derecha */}
        <div className="hidden md:flex w-1/1 items-center justify-center bg-gray-100">
          <img src={ imagenLogin } alt="Login" className="object-cover h-full w-full" loading="lazy" />
        </div>
      </div>
    </>
  );
}