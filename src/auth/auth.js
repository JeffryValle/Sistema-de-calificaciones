const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "";

export const registerUser = async ( data ) => {

    console.log( data );

  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });


  console.log( response.ok);

  if ( !response.ok ) {

      const error = await response.json();
      
      console.log(error);
        
      throw new Error(error.message || "Error al registrar usuario");
  }

  return response.json();
}

export const getUrl = (path) => {
  if (!API_BASE) {
    console.warn("[auth] VITE_API_URL no está definida. URL construida probablemente será incorrecta.");
  }
  return `${API_BASE.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * loginUser
 * @param {{ correo: string, password: string }} credentials
 * @returns {Promise<object>} objeto normalizado:
 *  - { mustChangePassword: true, tempToken, message }  --> si backend exige cambio
 *  - { token, data, message } --> login normal
 */
export const loginUser = async (credentials) => {

  const url = getUrl("/auth/login");

  // backend espera { user, password } según tu controller
  const body = {
    user: credentials.email,
    password: credentials.password,
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await resp.json().catch(() => null);

  if (!resp.ok) {
    const msg = (json && json.message) || `HTTP ${resp.status}`;
    throw new Error(msg);
  }

  // Si backend devuelve token temporal dentro de data.token cuando requiere cambio
  if (json?.data?.token) {
    return {
      mustChangePassword: true,
      tempToken: json.data.token,
      message: json.message || "Debe cambiar su contraseña",
    };
  }

  // Login normal
  return {
    mustChangePassword: false,
    token: json?.token,
    data: json?.data,
    message: json?.message || "Autenticado correctamente",
  };
}
