// src/config/dashboardConfig.js
import {
  DashboardOutlined,
  AssessmentOutlined,
  BusinessOutlined,
  SettingsOutlined,
  PlayArrowOutlined,
  ShoppingCartOutlined,
  FactoryOutlined,
} from "@mui/icons-material";
import { DASHBOARD_ROUTES } from "./routes";

/**
 * Configuración de las secciones del dashboard
 * Centraliza información como rutas, nombres, iconos y estado de implementación
 */
export const dashboardSections = [
  {
    id: "dashboard",
    name: "Panel de control",
    route: DASHBOARD_ROUTES.DASHBOARD,
    icon: DashboardOutlined,
    implemented: true,
    componentPath: "dashboard/dashboardPage",
    description:
      "Vista general del panel de control con indicadores clave de desempeño.",
  },
  {
    id: "planning",
    name: "Planificación",
    route: DASHBOARD_ROUTES.PLANNING,
    icon: AssessmentOutlined,
    implemented: false,
    componentPath: "dashboard/planningPage",
    description:
      "Gestión de la planificación financiera y operativa de la empresa.",
  },
  {
    id: "preOperation",
    name: "Pre-Operación",
    route: DASHBOARD_ROUTES.PRE_OPERATION,
    icon: PlayArrowOutlined,
    implemented: false,
    componentPath: "dashboard/preOperationPage",
    description:
      "Configuración de aspectos operativos: gastos fijos, maquinaria, proveedores y personal.",
  },
  {
    id: "production",
    name: "Producción y Operaciones",
    route: DASHBOARD_ROUTES.PRODUCTION,
    icon: FactoryOutlined,
    implemented: false,
    componentPath: "dashboard/productionPage",
    description:
      "Administración de procesos productivos y control de capacidades operativas.",
  },
  {
    id: "inventory",
    name: "Inventarios y Compras",
    route: DASHBOARD_ROUTES.INVENTORY,
    icon: ShoppingCartOutlined,
    implemented: false,
    componentPath: "dashboard/inventoryPage",
    description:
      "Gestión de inventarios y flujo de materiales según necesidades.",
  },
  {
    id: "commercial",
    name: "Gestión Comercial",
    route: DASHBOARD_ROUTES.COMMERCIAL,
    icon: BusinessOutlined,
    implemented: false,
    componentPath: "dashboard/commercialPage",
    description:
      "Implementación de estrategias comerciales para alcanzar objetivos de venta.",
  },
  {
    id: "settings",
    name: "Ajustes",
    route: DASHBOARD_ROUTES.SETTINGS,
    icon: SettingsOutlined,
    implemented: false,
    componentPath: "dashboard/settingsPage",
    description:
      "Configuración de preferencias y ajustes personales en la plataforma.",
  },
];

/**
 * Obtener sección por ID
 * @param {string} id - Identificador de la sección
 * @returns {Object|null} - Configuración de la sección o null si no existe
 */
export const getSectionById = (id) => {
  return dashboardSections.find((section) => section.id === id) || null;
};

/**
 * Obtener sección por ruta
 * @param {string} route - Ruta de la sección
 * @returns {Object|null} - Configuración de la sección o null si no existe
 */
export const getSectionByRoute = (route) => {
  return dashboardSections.find((section) => section.route === route) || null;
};

export default dashboardSections;
