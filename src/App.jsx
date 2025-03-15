// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { AUTH_ROUTES, DASHBOARD_ROUTES, DEFAULT_ROUTE } from "./config/routes";
import Cookies from "js-cookie";

// Layouts
import AuthLayout from "./layout/authLayout";
import DashboardLayout from "./layout/dashboardLayout";

// Auth Pages
import LoginPage from "./pages/auth/loginPage";
import SignupPage from "./pages/auth/signupPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import ResetPasswordPage from "./pages/auth/resetPasswordPage";

// Dashboard Pages
import DashboardPage from "./pages/dashboard/dashboardPage";
import PlanningPage from "./pages/dashboard/planningPage";

// Componente PrivateRoute para proteger rutas del dashboard
const PrivateRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("authToken") !== undefined;

  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />;
  }

  return children;
};

// Componente PublicRoute para redirigir usuarios autenticados
const PublicRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("authToken") !== undefined;

  if (isAuthenticated) {
    return <Navigate to={DASHBOARD_ROUTES.DASHBOARD} replace />;
  }

  return children;
};

// Componente temporal para páginas en desarrollo
const PlaceholderPage = ({ title, description }) => {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#1C4384" }}>{title}</h2>
      <p style={{ color: "#6B7280", marginBottom: "2rem" }}>{description}</p>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas de autenticación */}
          <Route element={<AuthLayout />}>
            <Route
              path={AUTH_ROUTES.LOGIN}
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path={AUTH_ROUTES.SIGNUP}
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />
            <Route
              path={AUTH_ROUTES.FORGOT_PASSWORD}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={AUTH_ROUTES.RESET_PASSWORD}
              element={<ResetPasswordPage />}
            />
          </Route>

          {/* Rutas protegidas del dashboard */}
          <Route
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route
              path={DASHBOARD_ROUTES.DASHBOARD}
              element={<DashboardPage />}
            />

            {/* Página de Planificación reemplazada con componente real */}
            <Route
              path={DASHBOARD_ROUTES.PLANNING}
              element={<PlanningPage />}
            />
            <Route
              path={DASHBOARD_ROUTES.PRE_OPERATION}
              element={
                <PlaceholderPage
                  title="Pre-Operación"
                  description="Configura todos los aspectos operativos de tu empresa: gastos fijos, maquinaria, proveedores y personal."
                />
              }
            />
            <Route
              path={DASHBOARD_ROUTES.PRODUCTION}
              element={
                <PlaceholderPage
                  title="Producción y Operaciones"
                  description="Administra los procesos productivos y controla tus capacidades operativas para optimizar recursos."
                />
              }
            />
            <Route
              path={DASHBOARD_ROUTES.INVENTORY}
              element={
                <PlaceholderPage
                  title="Inventarios y Compras"
                  description="Gestiona tus inventarios y compras de manera eficiente para mantener el flujo de materiales según tus necesidades."
                />
              }
            />
            <Route
              path={DASHBOARD_ROUTES.COMMERCIAL}
              element={
                <PlaceholderPage
                  title="Gestión Comercial"
                  description="Implementa y gestiona tus estrategias comerciales para alcanzar los objetivos de venta establecidos."
                />
              }
            />
            <Route
              path={DASHBOARD_ROUTES.SETTINGS}
              element={
                <PlaceholderPage
                  title="Ajustes"
                  description="Configura tus preferencias y ajustes personales en la plataforma."
                />
              }
            />
          </Route>

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />

          {/* Captura de rutas no encontradas */}
          <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
