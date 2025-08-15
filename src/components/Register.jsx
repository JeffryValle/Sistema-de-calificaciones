import { Link, useNavigate } from "react-router-dom";
import imagenLogin from "../../assets/login-img.webp";
import { useState } from "react";
import { registerUser } from "../auth/auth";
import { Form } from "./Form";

export const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Ahora `data` es el objeto con { nombre, correo, password, telefono, rol, ... }
  const handleSubmit = async (data) => {
    
    setError("");
    try {
      // Llamamos al helper que hace la petición
      const resp = await registerUser(data);

      console.log("Respuesta del backend:", resp);

      // Ir a pantalla de "cargando..." y luego al login
      // después de registrar con éxito
      navigate("/redirecting", {
        state: {
          to: "/",                    // destino final (login)
          message: "Cuenta creada",   // texto que se muestra en el loader
          delay: 2000,                // ms antes de redirigir
          forwardState: { from: "register" } // opcional, se pasa al siguiente location.state
        },
        replace: true
      });

    } catch (err) {
      // Aseguramos tomar el mensaje real del error si existe
      const message = err?.message || (err?.response && err.response.data) || "Error desconocido";
      setError(`Error al registrarse: ${message}`);
      console.error("Error al registrarse:", err);
      // No lanzamos el error, ya lo mostramos en UI
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full md:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-2 mb-16 text-center text-6xl/8 font-bold tracking-tight text-gray-900">Registro</h1>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form handleSubmit={handleSubmit} error={error} />

            <p className="mt-10 text-center text-l/6 text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
          <img src={imagenLogin} alt="Login" className="object-cover h-full w-full" loading="lazy" />
        </div>
      </div>
    </>
  );
};
