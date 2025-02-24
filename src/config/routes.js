// Constantes de rutas
export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/resetPassword/:token",
};

export const DEFAULT_ROUTE = AUTH_ROUTES.LOGIN;

// Rutas de autenticación
export const authRoutes = [
  {
    path: AUTH_ROUTES.LOGIN,
    component: "LoginPage",
  },
  {
    path: AUTH_ROUTES.SIGNUP,
    component: "SignupPage",
  },
  {
    path: AUTH_ROUTES.FORGOT_PASSWORD,
    component: "ForgotPasswordPage",
  },
  {
    path: AUTH_ROUTES.RESET_PASSWORD,
    component: "ResetPasswordPage",
  },
];
