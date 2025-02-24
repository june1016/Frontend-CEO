// Constantes de rutas
export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgotPassword",
};

// Rutas de autenticación
export const authRoutes = [
  {
    path: AUTH_ROUTES.LOGIN,
    component: "loginPage",
  },
  {
    path: AUTH_ROUTES.SIGNUP,
    component: "signupPage",
  },
  {
    path: AUTH_ROUTES.FORGOT_PASSWORD,
    component: "forgotPasswordPage",
  },
];

// Rutas protegidas (para cuando implementes el dashboard)
export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
  // Aquí puedes agregar más rutas protegidas
};

// Ruta por defecto
export const DEFAULT_ROUTE = AUTH_ROUTES.LOGIN;
