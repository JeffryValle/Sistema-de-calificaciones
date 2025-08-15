import { Link, useNavigate } from "react-router-dom";
import imagenLogin from "../../assets/login-img.webp";
import { Input } from "./Input";
import { email_validation, password_validation } from "../utils/inputValidations";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from '../auth/auth.js'

export const Login = ({ onLogin /* opcional: función externa para hacer la petición */ }) => {
  // modo onTouched valida al tocar el campo -> mejor UX
  const methods = useForm({ mode: "onTouched", defaultValues: { user: "", password: "" } });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // función que maneja el submit validado por RHF
  const onSubmit = handleSubmit(async (data) => {
    setError("");
    setSuccess(false);

try {
      const resp = await loginUser(data);

      if (resp.mustChangePassword) {
        // Guardamos token temporal en sessionStorage y vamos a /set-password
        // recibiste tempToken del backend
        sessionStorage.setItem("temp_token", resp.tempToken);
        navigate("/redirecting", {
          state: { to: "/set-password", message: "Redirigiendo para cambiar contraseña...", delay: 700 },
          replace: true
        });

      }

      // Login normal: guarda token (ej. localStorage) y redirige al dashboard
      if ( resp.token ) {
        // Guarda token donde prefieras (localStorage/sessionStorage/estado global)
        localStorage.setItem("auth_token", resp.token);
        // opcional: guarda info del usuario
        localStorage.setItem("auth_user", JSON.stringify(resp.data || {}));

        setSuccess(true);
        // redirige a dashboard u otra ruta
        // después de recibir token y guardarlo

        const rol = resp.data?.rol_nombre;
        
        if ( rol === "admin" ) {
            navigate("/redirecting", {
            state: { to: "/admin", message: "Iniciando sesión...", delay: 2000 },
            replace: true
          });  
        } else if ( rol === "estudiante" ) {
            navigate("/redirecting", {
            state: { to: "/estudiante", message: "Iniciando sesión...", delay: 2000 },
            replace: true
          });  
        } else if ( rol === "docente" ) {
            navigate("/redirecting", {
            state: { to: "/docente", message: "Iniciando sesión...", delay: 2000 },
            replace: true
          });  
        } else {
          navigate("/redirecting", {
              state: { to: "/", message: "Iniciando sesión...", delay: 2000 },
              replace: true
            }); 
        }

        
        return;
      }

      // Si aquí, sin token y sin mustChangePassword -> tratamos como éxito general
      setSuccess(true);
      navigate("/", { replace: true });

    } catch (err) {
      setError(err?.message || "Error al iniciar sesión");
      setSuccess(false);
      console.error("Login error:", err);
    }
  });

  return (
    <>
      <div className="flex min-h-screen">
        {/* Imagen a la izquierda */}
        <div className="hidden md:flex w-1/1 items-center justify-center bg-gray-100">
          <img src={imagenLogin} alt="Login" className="object-cover h-full w-full" loading="lazy" />
        </div>

        {/* Login a la derecha */}
        <div className="flex w-full md:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-2 mb-16 text-center text-6xl/8 font-bold tracking-tight text-gray-900">
              Login
            </h1>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <FormProvider {...methods}>
              <form onSubmit={onSubmit} noValidate autoComplete="off" className="space-y-6">
                <Input {...email_validation} />
                <Input {...password_validation} />

                {/* Mensaje de error o éxito */}
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                {success && <div className="text-green-600 text-sm text-center">Inicio de sesión correcto</div>}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex w-full justify-center rounded-md px-3 py-2 text-l/6 font-semibold text-white shadow-xs
                      ${isSubmitting ? "bg-indigo-400 cursor-wait" : "bg-indigo-600 hover:bg-indigo-500"}
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
                  </button>
                </div>
              </form>
            </FormProvider>

            <p className="mt-10 text-center text-l/6 text-gray-500">
              ¿No tienes cuenta aún?{" "}
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
