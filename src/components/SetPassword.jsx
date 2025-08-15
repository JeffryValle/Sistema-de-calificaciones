import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import imagenLogin from "../../assets/login-img.webp";
import { setPasswordAPI } from "../auth/setPassword.js";

/**
 * SetPassword
 *
 * Campos:
 * - old_password
 * - new_password
 * - confirm_password
 *
 * Recupera el token temporal desde:
 * 1) sessionStorage.getItem('temp_token')
 * 2) location.state?.token (fallback)
 *
 * Envía Authorization: Bearer <token>
 */
export const SetPassword = () => {
  const methods = useForm({ mode: "onTouched", defaultValues: { old_password: "", new_password: "", confirm_password: "" } });

  const { register, handleSubmit, watch, getValues, formState: { errors, isSubmitting } } = methods;

  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener token temporal
  const getToken = () => {
    return sessionStorage.getItem("temp_token") || location.state?.token || null;
  };

  useEffect(() => {
    // Si no hay token temporal, redirigimos al login
    const t = getToken();
    if (!t) {
      navigate("/", { replace: true });
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setServerError("");
    setServerSuccess("");

    const token = getToken();
    if (!token) {
      setServerError("Token temporal no disponible. Inicia sesión de nuevo.");
      return;
    }

    // Validación adicional: new_password vs confirm_password (ya se valida en RHF, pero no está de más)
    if (data.new_password !== data.confirm_password) {
      setServerError("Las contraseñas nuevas no coinciden.");
      return;
    }

    try {
      // Llamada a tu cliente API (ver siguiente sección para setPassword)
      const resp = await setPasswordAPI({
        old_password: data.old_password,
        new_password: data.new_password,
        confirm_password: data.confirm_password
      }, token);

      // éxito
      setServerSuccess(resp.message || "Contraseña actualizada correctamente.");

      // limpiar token temporal y redirigir al login (o dashboard)
      sessionStorage.removeItem("temp_token");

      // Dar tiempo a que el usuario vea el mensaje y redirigir
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);

    } catch (err) {
      // Manejo de errores (fetch, 401, expirado, etc.)
      const msg = err?.message || "Error al actualizar la contraseña";
      setServerError(msg);
      console.error("setPassword error:", err);
      // Si es token expirado o no autorizado: borrar token y redirigir a login si quieres
      if (msg.toLowerCase().includes("token") || msg.toLowerCase().includes("iniciar sesión")) {
        sessionStorage.removeItem("temp_token");
        // opcional: redirect inmediateo:
        // navigate('/', { replace: true });
      }
    }
  });

  return (
    <div className="flex min-h-screen">
      {/* Imagen a la izquierda (igual estilo que login) */}
      <div className="hidden md:flex w-1/1 items-center justify-center bg-gray-100">
        <img src={imagenLogin} alt="SetPassword" className="object-cover h-full w-full" loading="lazy" />
      </div>

      {/* Formulario a la derecha */}
      <div className="flex w-full md:w-1/2 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-2 mb-16 text-center text-6xl/8 font-bold tracking-tight text-gray-900">
            SetPassword
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormProvider {...methods}>
            <form onSubmit={onSubmit} noValidate autoComplete="off" className="space-y-6">

              {/* Antigua contraseña */}
              <div>
                <label htmlFor="old_password" className="block text-l/6 font-medium text-gray-900">Contraseña anterior</label>
                <div className="mt-2">
                  <input
                    id="old_password"
                    type="password"
                    {...register("old_password", { required: "Ingresa tu contraseña anterior" })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.old_password && <p className="mt-2 text-sm text-red-500">{errors.old_password.message}</p>}
                </div>
              </div>

              {/* Nueva contraseña */}
              <div>
                <label htmlFor="new_password" className="block text-l/6 font-medium text-gray-900">Nueva contraseña</label>
                <div className="mt-2">
                  <input
                    id="new_password"
                    type="password"
                    {...register("new_password", {
                      required: "Ingresa una contraseña nueva",
                      minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                      // opcional: reglas extra (mayúscula, número) aquí
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.new_password && <p className="mt-2 text-sm text-red-500">{errors.new_password.message}</p>}
                </div>
              </div>

              {/* Confirmar nueva contraseña */}
              <div>
                <label htmlFor="confirm_password" className="block text-l/6 font-medium text-gray-900">Confirmar nueva contraseña</label>
                <div className="mt-2">
                  <input
                    id="confirm_password"
                    type="password"
                    {...register("confirm_password", {
                      required: "Confirma la nueva contraseña",
                      validate: value => value === getValues().new_password || "Las contraseñas no coinciden"
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.confirm_password && <p className="mt-2 text-sm text-red-500">{errors.confirm_password.message}</p>}
                </div>
              </div>

              {/* mensajes server */}
              {serverError && <div className="text-red-500 text-sm text-center">{serverError}</div>}
              {serverSuccess && <div className="text-green-600 text-sm text-center">{serverSuccess}</div>}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full justify-center rounded-md px-3 py-2 text-l/6 font-semibold text-white shadow-xs
                    ${isSubmitting ? "bg-indigo-400 cursor-wait" : "bg-indigo-600 hover:bg-indigo-500"}
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {isSubmitting ? "Guardando..." : "Actualizar contraseña"}
                </button>
              </div>

            </form>
          </FormProvider>

          <p className="mt-10 text-center text-l/6 text-gray-500">
            Volver a{' '}
            <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
