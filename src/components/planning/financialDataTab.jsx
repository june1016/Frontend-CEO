import React, { useState } from "react";
import { Box, Tabs, Tab, useTheme } from "@mui/material";
import InfoCard from "./financialData/common/infoCard";
import GeneralDataView from "./financialData/generalDataView";
import IncomeStatementView from "./financialData/incomeStatementView";
import InventoryView from "./financialData/inventoryView";

// Hooks personalizados
import useFinancialData from "../../hooks/financialData/useFinancialData";
import useSortableData from "../../hooks/financialData/useSortableData";
import { useRawMaterialsInventory } from "../../hooks/financialData/useRawMaterialsInventory.js";
import { useIncomeStatement } from "../../hooks/financialData/useIncomeStatement.js";

/**
 * Componente principal para la visualización de datos financieros
 * @returns {JSX.Element} - Componente renderizado
 */
export default function FinancialDataTab() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // Obtener datos financieros
  const {
    financialData,
    loading,
    error,
    totals
  } = useFinancialData();

  const {
    incomeStatement,
    incomeStatementTotals,
  } = useIncomeStatement();

  const {
    rawMaterials,
    inventoryTotals,
    finishedProducts
  } = useRawMaterialsInventory();

  // Configuración para ordenamiento de datos
  const sortableData = useSortableData(financialData, "title", "asc");

  // Manejar cambios de pestañas
  const handleTabChange = (event, newValue) => {
    try {
      setTabValue(newValue);
    } catch (error) {
      console.error("Error al cambiar de pestaña:", error);
    }
  };

  // Renderizar el contenido del tab actual
  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        return (
          <GeneralDataView
            financialData={financialData}
            totals={totals}
            sortableData={sortableData}
            theme={theme}
          />
        );
      case 1:
        return (
          <IncomeStatementView
            incomeStatement={incomeStatement}
            incomeStatementTotals={incomeStatementTotals}
            theme={theme}
          />
        );
      case 2:
        return (
          <InventoryView
            rawMaterials={rawMaterials}
            finishedProducts={finishedProducts}
            inventoryTotals={inventoryTotals}
            theme={theme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Alerta informativa */}
      <InfoCard
        title="Datos Financieros"
        description="Esta sección muestra un resumen detallado de los activos, pasivos, patrimonio y otros elementos financieros relevantes para la planificación estratégica. Los valores se expresan en pesos colombianos (COP)."
      />

      {/* Tabs de navegación */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="datos financieros tabs"
          sx={{
            "& .MuiTab-root": {
              minWidth: 120,
              fontWeight: 500,
              textTransform: "none",
            },
            "& .Mui-selected": {
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Datos Generales" />
          <Tab label="Estado de Resultados" />
          <Tab label="Inventario Inicial" />
        </Tabs>
      </Box>

      {/* Mostrar mensaje de carga o error si es necesario */}
      {loading ? (
        <Box sx={{ p: 2, textAlign: "center" }}>
          Cargando datos financieros...
        </Box>
      ) : error ? (
        <Box sx={{ p: 2, color: "error.main" }}>Error: {error}</Box>
      ) : (
        /* Contenido de los tabs */
        renderTabContent()
      )}
    </Box>
  );
}
