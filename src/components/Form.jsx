import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input.jsx";
import {
  email_validation,
  name_validation,
  num_validation,
  password_validation
} from "../utils/inputValidations.js";

export const Form = ({ handleSubmit: parentHandleSubmit, error }) => {
  const methods = useForm();
  const { register } = methods;

  // Cuando RHF valide correctamente, llamamos a la función del padre
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      // Llamada al padre (Register.jsx). parentHandleSubmit debe aceptar `data`.
      await parentHandleSubmit(data);

      // Si el padre resolvió bien:
      methods.reset();
    } catch (err) {
      // Si el padre lanza, lo dejamos propagar para que el padre lo maneje.
      // Pero podemos hacer un log local también:
      console.error("Error en submit compuesto:", err);
      // No setSuccess(true) aquí
      throw err;
    }
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={onSubmit} noValidate autoComplete="off">
        <Input {...name_validation} />
        <Input {...email_validation} />
        <Input {...password_validation} />
        <Input {...num_validation} />

        <div>
          <label htmlFor="role" className="block text-l/6 font-medium text-gray-900">
            Rol
          </label>
          <div className="mt-2">
            {/* Registramos el select en RHF para que 'rol' esté en `data` */}
            <select
              id="role"
              {...register("role", { required: "Selecciona un rol" })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value=""> -- Seleccione -- </option>
              <option value="admin">Administrador</option>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
            </select>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-l/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Registrarse
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
