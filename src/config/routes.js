// Constantes de rutas
export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/resetPassword/:token",
};

export const DASHBOARD_ROUTES = {
  DASHBOARD: "/dashboard",
  PLANNING: "/dashboard/planning",
  PRE_OPERATION: "/dashboard/preOperation",
  PRODUCTION: "/dashboard/production",
  INVENTORY: "/dashboard/inventory",
  COMMERCIAL: "/dashboard/commercial",
  SETTINGS: "/dashboard/settings",
};

export const ADMIN_DASHBOARD_ROUTES = {
  ADMIN_HOME: "/admin",
  ADMIN_GROUPS: "/admin/groups",
  ADMIN_USERS: "/admin/users",
  ADMIN_UNIVERSITY: "/admin/university",
};

export const TEACHER_DASHBOARD_ROUTES = {
  TEACHER_HOME: "/teacher",
  TEACHER_PLANNING: "/teacher/planning",
};

export const DEFAULT_ROUTE = AUTH_ROUTES.LOGIN;

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
  {
    path: AUTH_ROUTES.RESET_PASSWORD,
    component: "resetPasswordPage",
  },
];

// Rutas de dashboard
export const dashboardRoutes = [
  {
    path: DASHBOARD_ROUTES.DASHBOARD,
    component: "dashboardPage",
  },
  {
    path: DASHBOARD_ROUTES.PLANNING,
    component: "planningPage",
  },
  {
    path: DASHBOARD_ROUTES.PRE_OPERATION,
    component: "preOperationPage",
  },
  {
    path: DASHBOARD_ROUTES.PRODUCTION,
    component: "productionPage",
  },
  {
    path: DASHBOARD_ROUTES.INVENTORY,
    component: "inventoryPage",
  },
  {
    path: DASHBOARD_ROUTES.COMMERCIAL,
    component: "commercialPage",
  },
  {
    path: DASHBOARD_ROUTES.SETTINGS,
    component: "settingsPage",
  },
];

export const adminDashboardRoutes = [
  {
    path: ADMIN_DASHBOARD_ROUTES.ADMIN_HOME,
    component: "adminDashboard",
  },
  {
    path: ADMIN_DASHBOARD_ROUTES.ADMIN_GROUPS,
    component: "adminGrousPage",
  },
  {
    path: ADMIN_DASHBOARD_ROUTES.ADMIN_USERS,
    component: "adminUsersPage",
  },
  {
    path: ADMIN_DASHBOARD_ROUTES.ADMIN_UNIVERSITY,
    component: "adminUniversityPage",
  },
];

export const teacherDashboardRoutes = [
  {
    path: TEACHER_DASHBOARD_ROUTES.TEACHER_HOME,
    component: "TeacherPlanningIntro",
  },
  {
    path: TEACHER_DASHBOARD_ROUTES.TEACHER_PLANNING,
    component: "GeneralDataView",
  },
];
