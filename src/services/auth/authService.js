import axiosInstance from "../api/axiosConfig";
import Cookies from "js-cookie";

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      console.log("Respuesta del servidor:", response.data);

      if (response.data.ok && response.data.token) {
        Cookies.set("authToken", response.data.token);
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

  // Los demás métodos permanecen igual...
  register: async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },

  requestPasswordReset: async (gmail) => {
    const response = await axiosInstance.post(
      "/auth/reset-password-with-gmail",
      { gmail }
    );
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await axiosInstance.post(
      `/auth/reset-password?token=${token}`,
      { password }
    );
    return response.data;
  },

  logout: () => {
    Cookies.remove("authToken");
  },
};
