// src/services/auth/authService.js

import axiosInstance from "../api/axiosConfig";
import Cookies from "js-cookie";

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);

      if (response.data.ok && response.data.token && response.data.user) {
        // 1️⃣ Guardar el token
        Cookies.set("authToken", response.data.token);

        // 2️⃣ Mapear a camelCase y guardar en localStorage
        const u = response.data.user;
        const userToStore = {
          id: u.id,
          name: u.name,
          lastName: u.lastName,
          email: u.email,
          rolId: u.rolId,
          nameRol: u.nameRol,
          groupId: u.groupId   || null,
          groupName: u.groupName || "",
          teacherId: u.teacherId  || null,
          teacherName: u.teacherName || "",
        };
        localStorage.setItem("userData", JSON.stringify(userToStore));
      }

      return response.data;
    } catch (error) {
      console.error("Error en authService.login:", error);
      if (error.response) {
        throw new Error(error.message);
      } else {
        throw new Error("Error al conectar con el servicio. Intente nuevamente.");
      }
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);

      if (response.data.ok && response.data.token && response.data.user) {
        // 1️⃣ Guardar token
        Cookies.set("authToken", response.data.token);

        // 2️⃣ Mapear a camelCase y guardar en localStorage
        const u = response.data.user;
        const userToStore = {
          id: u.id,
          name: u.name,
          lastName: u.lastName,
          email: u.email,
          rolId: u.rolId,
          nameRol: u.nameRol,
          // no tendrás group aún en registro, pero lo dejamos por consistencia
          groupId: u.groupId,
          groupName: u.groupName,
          teacherId: u.teacherId,
          teacherName: u.teacherName,
        };
        localStorage.setItem("userData", JSON.stringify(userToStore));
      }

      return response.data;
    } catch (error) {
      console.error("Error en authService.register:", error);
      throw error;
    }
  },

  // Resto sin cambios...
  requestPasswordReset: async (email) => {
    const response = await axiosInstance.post(
      "/auth/reset-password-with-email",
      { email }
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
    localStorage.removeItem("userData");
  },
  isAuthenticated: () => {
    return !!Cookies.get("authToken");
  },
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
