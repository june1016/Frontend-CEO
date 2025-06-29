// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import {
  ADMIN_DASHBOARD_ROUTES,
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  DEFAULT_ROUTE,
  TEACHER_DASHBOARD_ROUTES,
} from "./config/routes";
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
import PreOperationPage from "./pages/dashboard/preOperationPage";

// Admin Pages
import AdminDashboard from "./pages/admin/adminDashboardPage";
import AdminGrousPage from "./pages/admin/adminGroupsPage";
import AdminUsersPage from "./pages/admin/adminUsersPage";
import AdminUniversityPage from "./pages/admin/adminUniversityPage";

// Teacher Pages
import TeacherPlanning from "./pages/teacher/teacherPlanningPage";
import TeacherPlanningIntro from "./pages/teacher/teacherDashboardPage";
import GeneralDataView from "./pages/teacher/GeneralDataView";

import ProductionPage from "./pages/dashboard/productionPage";

// Componente PrivateRoute para proteger rutas del dashboard
const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const authToken = Cookies.get("authToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.rol_id;

  const isAuthenticated = !!authToken;

  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirigir según el rol si intenta acceder a una ruta no permitida
    if (role === 1) return <Navigate to={ADMIN_DASHBOARD_ROUTES.ADMIN_HOME} replace />;
    if (role === 2) return <Navigate to={TEACHER_DASHBOARD_ROUTES.TEACHER_HOME} replace />;
    return <Navigate to={DASHBOARD_ROUTES.DASHBOARD} replace />;
  }

  return children;
};

// Componente PublicRoute para redirigir usuarios autenticados
const PublicRoute = ({ children }) => {
  const authToken = Cookies.get("authToken");
  const isAuthenticated = !!authToken;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.rol_id;

  if (isAuthenticated) {
    if (role === 1) return <Navigate to={ADMIN_DASHBOARD_ROUTES.ADMIN_HOME} replace />;
    if (role === 2) return <Navigate to={TEACHER_DASHBOARD_ROUTES.TEACHER_HOME} replace />;
    return <Navigate to={DASHBOARD_ROUTES.DASHBOARD} replace />;
  }

  return children;
};

// Componente temporal para páginas en desarrollo
const PlaceholderPage = ({ title, description }) => (
  <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
    <h2 style={{ marginBottom: "1rem", color: "#1C4384" }}>{title}</h2>
    <p style={{ color: "#6B7280", marginBottom: "2rem" }}>{description}</p>
  </div>
);

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
            <Route path={AUTH_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={AUTH_ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
          </Route>

          {/* Rutas protegidas para usuarios regulares (rol 3) */}
          <Route
            element={
              <PrivateRoute allowedRoles={[3]}>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path={DASHBOARD_ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={DASHBOARD_ROUTES.PLANNING} element={<PlanningPage />} />
            <Route path={DASHBOARD_ROUTES.PRE_OPERATION} element={<PreOperationPage />} />
            <Route
              path={DASHBOARD_ROUTES.DASHBOARD}
              element={<DashboardPage />}
            />

            <Route
              path={DASHBOARD_ROUTES.PLANNING}
              element={<PlanningPage />}
            />
            <Route
              path={DASHBOARD_ROUTES.PRE_OPERATION}
              element={<PreOperationPage />}
            />
            {/* CORRECCIÓN: Esta ruta estaba duplicada y mal configurada */}
            <Route
              path={DASHBOARD_ROUTES.PRODUCTION}
              element={<ProductionPage />}
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

          {/* Rutas protegidas para administrador (rol 1) */}
          <Route
            element={
              <PrivateRoute allowedRoles={[1]}>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path={ADMIN_DASHBOARD_ROUTES.ADMIN_HOME} element={<AdminDashboard />} />
            <Route path={ADMIN_DASHBOARD_ROUTES.ADMIN_GROUPS} element={<AdminGrousPage />} />
            <Route path={ADMIN_DASHBOARD_ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
            <Route path={ADMIN_DASHBOARD_ROUTES.ADMIN_UNIVERSITY} element={<AdminUniversityPage />} />
          </Route>

          {/* Rutas protegidas para docentes (rol 2) */}
          <Route
            element={
              <PrivateRoute allowedRoles={[2]}>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path={TEACHER_DASHBOARD_ROUTES.TEACHER_HOME} element={<TeacherPlanningIntro />} />
            <Route path={TEACHER_DASHBOARD_ROUTES.TEACHER_PLANNING} element={<GeneralDataView />} />
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

