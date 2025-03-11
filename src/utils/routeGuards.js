// src/utils/routeGuards.js
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "../config/routes";

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} Estado de autenticación
 */
export const isAuthenticated = () => {
  return Cookies.get("authToken") !== undefined;
};

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props - Propiedades del componente
 * @param {JSX.Element} props.children - Elementos hijos a renderizar si está autenticado
 * @returns {JSX.Element} Componente renderizado
 */
export const PrivateRouteGuard = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirigir al login si no está autenticado
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />;
  }

  return children;
};

/**
 * Componente para rutas públicas (redirige a dashboard si ya está autenticado)
 * @param {Object} props - Propiedades del componente
 * @param {JSX.Element} props.children - Elementos hijos a renderizar si no está autenticado
 * @returns {JSX.Element} Componente renderizado
 */
export const PublicRouteGuard = ({ children }) => {
  if (isAuthenticated()) {
    // Redirigir al dashboard si ya está autenticado
    return <Navigate to={DASHBOARD_ROUTES.DASHBOARD} replace />;
  }

  return children;
};
