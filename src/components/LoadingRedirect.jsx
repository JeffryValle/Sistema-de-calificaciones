// src/components/LoadingRedirect.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoadingRedirect({
  to: propTo = null,
  delay: propDelay = 1800,
  message: propMessage = "Cargando…",
  replace = true,
  forwardState: propForwardState = null,
  onDone = null, // optional callback when redirect happens
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state tiene prioridad cuando se usa como ruta: navigate('/redirecting', { state: {...} })
  const state = location.state || {};

  const to = state.to ?? propTo;
  const delay = state.delay ?? propDelay;
  const message = state.message ?? propMessage;
  const forwardState = state.forwardState ?? propForwardState;
  const shouldReplace = state.replace ?? replace;

  useEffect(() => {
    // Si no hay un destino, enviamos al home (evita quedarnos aquí)
    if (!to) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      // Ejecutar callback si lo pasan
      if (typeof onDone === "function") {
        try { onDone(); } catch (e) { /* ignore */ }
      }

      navigate(to, { replace: shouldReplace, state: forwardState });
    }, Number(delay));

    return () => clearTimeout(timer);
  }, [to, delay, shouldReplace, forwardState, navigate, onDone]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-16 w-16 rounded-full border-4 border-gray-300 border-t-indigo-600 animate-spin"
          aria-hidden="true"
        />
        <p className="text-gray-700 font-medium" aria-live="polite">
          {message}
        </p>
      </div>
    </div>
  );
}
