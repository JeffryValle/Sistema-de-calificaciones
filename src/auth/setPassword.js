import { getUrl } from "./auth";


// src/auth/auth.js
const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "";

/**
 * setPassword
 * @param {{ old_password, new_password, confirm_password }} bodyData
 * @param {string} tokenTemporal - el token temporal para Authorization header
 */
export const setPasswordAPI = async (bodyData, tokenTemporal) => {

  if (!tokenTemporal) throw new Error("Token temporal no proporcionado.");

  const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/set-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenTemporal}`,
    },
    body: JSON.stringify(bodyData),
  });

  const json = await resp.json().catch(() => null);
  if (!resp.ok) {
    const msg = (json && json.message) || `HTTP ${resp.status}`;
    throw new Error(msg);
  }

  return json; // { success: true, message: 'Contraseña actualizada correctamente' }
}

