// src/App.jsx
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./theme";
import { AUTH_ROUTES, DEFAULT_ROUTE } from "./config/routes";

// Importación de páginas
import LoginPage from "./pages/auth/loginPage";
import SignupPage from "./pages/auth/signupPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import ResetPasswordPage from "./pages/auth/resetPasswordPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Rutas de autenticación */}
          <Route path={AUTH_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={AUTH_ROUTES.SIGNUP} element={<SignupPage />} />
          <Route
            path={AUTH_ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={AUTH_ROUTES.RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
