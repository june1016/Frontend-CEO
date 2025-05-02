import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(import.meta.env.VITE_API_URL);
// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response interceptor error:", error);

    // Personalizar mensajes de error según el código de estado
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message =
            "Credenciales incorrectas. Por favor, verifique sus datos.";
          break;
        case 401:
          error.message = "No autorizado. Por favor, inicie sesión nuevamente.";
          Cookies.remove("authToken");
          break;
        case 404:
          error.message = "Usuario no encontrado.";
          break;
        case 500:
          error.message = "Error en el servidor. Por favor, intente más tarde.";
          break;
        default:
          error.message = "Ocurrió un error. Por favor, intente nuevamente.";
      }
    } else if (error.request) {
      error.message =
        "No se pudo conectar con el servidor. Verifique su conexión.";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
