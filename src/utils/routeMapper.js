// src/utils/routeMapper.js
import { lazy, Suspense } from "react";
import PlaceholderPage from "../components/common/placeholderPage";

/**
 * Carga dinámica de componentes para rutas con estado de implementación
 * @param {string} componentPath - Ruta del componente relativa a src/pages
 * @param {Object} placeholderProps - Propiedades para el placeholder si el componente no está implementado
 * @param {boolean} isImplemented - Indica si el componente ya está implementado
 * @returns {JSX.Element} Componente cargado o placeholder
 */
export const loadComponent = (
  componentPath,
  placeholderProps = {},
  isImplemented = false
) => {
  // Si el componente no está implementado, mostramos el placeholder
  if (!isImplemented) {
    return () => <PlaceholderPage {...placeholderProps} />;
  }

  // Carga dinámica del componente
  const Component = lazy(() => import(`../pages/${componentPath}`));

  // Wrapper con Suspense para mostrar fallback mientras carga
  return () => (
    <Suspense fallback={<div>Cargando...</div>}>
      <Component />
    </Suspense>
  );
};

// Estado de implementación de las páginas del dashboard
export const implementationStatus = {
  dashboard: true,
  planning: false,
  preOperation: false,
  production: true, // Cambiado a true ya que ahora está implementado
  inventory: false,
  commercial: false,
  settings: false,
};

// Propiedades de placeholder para las secciones en desarrollo
export const placeholderProps = {
  planning: {
    title: "Planificación Empresarial",
    description:
      "En esta sección podrás gestionar la planificación financiera y operativa de tu empresa, configurando presupuestos e indicadores para lograr tus objetivos.",
  },
  preOperation: {
    title: "Pre-Operación",
    description:
      "Configura todos los aspectos operativos de tu empresa: gastos fijos, maquinaria, proveedores y personal.",
  },
  production: {
    title: "Producción y Operaciones",
    description:
      "Administra los procesos productivos y controla tus capacidades operativas para optimizar recursos.",
  },
  inventory: {
    title: "Inventarios y Compras",
    description:
      "Gestiona tus inventarios y compras de manera eficiente para mantener el flujo de materiales según tus necesidades.",
  },
  commercial: {
    title: "Gestión Comercial",
    description:
      "Implementa y gestiona tus estrategias comerciales para alcanzar los objetivos de venta establecidos.",
  },
  settings: {
    title: "Ajustes",
    description:
      "Configura tus preferencias y ajustes personales en la plataforma.",
  },
};