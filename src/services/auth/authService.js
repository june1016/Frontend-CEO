import axiosInstance from "../api/axiosConfig";
import Cookies from "js-cookie";

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      console.log("Respuesta del servidor:", response.data);

      if (response.data.ok && response.data.token) {
        // Guardar el token en cookies
        Cookies.set("authToken", response.data.token);

        // Guardar datos del usuario en localStorage si están disponibles
        if (response.data.user) {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        }

        return response.data;
      } else {
        throw new Error(
          "No se pudo iniciar sesión. Verifique sus credenciales."
        );
      }
    } catch (error) {
      console.error("Error en authService.login:", error);

      // Si es un error de la API, usamos el mensaje personalizado del interceptor
      if (error.response) {
        throw new Error(error.message);
      } else {
        throw new Error(
          "Error al conectar con el servicio. Intente nuevamente."
        );
      }
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      if (response.data.ok && response.data.token) {
        // Guardar token en cookies
        Cookies.set("authToken", response.data.token);

        // Guardar datos del usuario en localStorage
        const userToSave = {
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
        };
        localStorage.setItem("userData", JSON.stringify(userToSave));
      }
      return response.data;
    } catch (error) {
      console.error("Error en authService.register:", error);
      throw error;
    }
  },

  // Solicitar reseteo de contraseña
  requestPasswordReset: async (email) => {
    const response = await axiosInstance.post(
      "/auth/reset-password-with-email",
      { email }
    );
    return response.data;
  },

  // Resetear contraseña
  resetPassword: async (token, password) => {
    const response = await axiosInstance.post(
      `/auth/reset-password?token=${token}`,
      { password }
    );
    return response.data;
  },

  // Cerrar sesión
  logout: () => {
    // Eliminar el token de cookies
    Cookies.remove("authToken");

    // Eliminar datos del usuario del localStorage
    localStorage.removeItem("userData");

    // Opcionalmente, eliminar otros datos de sesión
    sessionStorage.clear();
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return Cookies.get("authToken") !== undefined;
  },

  // Obtener datos del usuario actual
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      return null;
    }
  },
};
