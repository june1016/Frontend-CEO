import React, { useState } from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import {
  Inventory as PackageIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

// Componentes
import MonthSelector from "./common/monthSelector";
import ProductInputForm from "./common/productInputForm";
import BudgetResultsTable from "./common/budgetResultsTable";

// Hooks
import useBudgetData from "../../../hooks/useBudgetData";

// Utils
import { calculateTotals } from "../../../utils/budgetCalculations";

/**
 * Componente para el presupuesto de ventas
 * @param {Object} props Propiedades del componente
 * @param {Object} props.budgetConfig Configuración del presupuesto
 * @param {Object} props.theme Tema de Material UI
 * @returns {JSX.Element} Componente renderizado
 */
const SalesBudget = ({ budgetConfig, theme }) => {
  // Productos para el presupuesto de ventas
  const products = [
    { id: "alfaros", name: "Alfaros", defaultValue: 2650 },
    { id: "betacos", name: "Betacos", defaultValue: 1920 },
    { id: "gamaroles", name: "Gamaroles", defaultValue: 1060 },
  ];

  // Hook para manejar los datos del presupuesto
  const budgetData = useBudgetData(products);

  const {
    selectedMonth,
    setSelectedMonth,
    monthlyData,
    handleProductChange,
    calculateDecadeValues,
  } = budgetData;

  // Calcular totales por década
  const totals = calculateTotals(
    products,
    (month, productId) =>
      calculateDecadeValues(
        month,
        productId,
        budgetConfig.decadeDistribution[month - 1]
      ),
    selectedMonth
  );

  // Manejar guardar datos
  const handleSave = () => {
    console.log("Guardando datos de ventas:", {
      month: selectedMonth,
      data: monthlyData[selectedMonth],
    });
    // Aquí se implementaría la lógica para guardar los datos
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Selector de Mes */}
      <MonthSelector
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        theme={theme}
      />

      {/* Mensaje Informativo */}
      <Alert
        severity="info"
        icon={<InfoIcon />}
        sx={{
          bgcolor: "#EBF5FF",
          color: theme.palette.primary.main,
          border: "1px solid rgba(28, 67, 132, 0.2)",
          "& .MuiAlert-icon": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <AlertTitle sx={{ fontWeight: "bold" }}>
          Configuración de Ventas Iniciales
        </AlertTitle>
        Establece las unidades a vender de cada producto para el Mes{" "}
        {selectedMonth}. Los meses siguientes se calcularán automáticamente
        según el crecimiento configurado.
      </Alert>

      {/* Formulario de Entrada de Productos */}
      <ProductInputForm
        products={products}
        selectedMonth={selectedMonth}
        handleProductChange={handleProductChange}
        monthlyData={monthlyData}
        decadeDistribution={budgetConfig.decadeDistribution}
        growthRates={budgetConfig.growthRates}
        theme={theme}
        onSave={handleSave}
        title="Datos del Mes"
        inputLabel="Unidades Totales"
        icon={PackageIcon}
      />

      {/* Tabla de Resultados */}
      <BudgetResultsTable
        products={products}
        calculateValues={(month, productId) =>
          calculateDecadeValues(
            month,
            productId,
            budgetConfig.decadeDistribution[month - 1]
          )
        }
        selectedMonth={selectedMonth}
        theme={theme}
        totals={totals}
        title="Resultados Calculados"
        columnTitle="Producto"
        itemTitle="name"
      />
    </Box>
  );
};

export default SalesBudget;
