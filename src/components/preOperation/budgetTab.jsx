import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  Factory as FactoryIcon,
  Inventory as PackageIcon,
} from "@mui/icons-material";

// Componentes
import BudgetSelector from "./budget/common/budgetSelector";
import ConfigurationView from "./budget/common/configurationView";
import SalesBudget from "./budget/salesBudget";
import ProductionBudget from "./budget/productionBudget";

// Hooks
import useBudgetConfiguration from "../../hooks/budget/useBudgetConfiguration";
import showAlert from "../../utils/functions";
import axiosInstance from "../../services/api/axiosConfig";
import InfoCard from "../planning/financialData/common/infoCard";
import MaterialsBudget from "./budget/materialsBudget";

/**
 * Componente principal para la gestión de presupuestos
 * @returns {JSX.Element} Componente renderizado
 */
export default function BudgetTab() {
  const theme = useTheme();

  // Estado para selección de presupuesto y vista
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [activeView, setActiveView] = useState("config");
  const [savedBudgets, setSavedBudgets] = useState(() => {
    return JSON.parse(localStorage.getItem("savedBudgets")) || [];
  });

  // Tipos de presupuesto
  const budgetTypes = [
    {
      id: "sales",
      title: "Presupuesto de Ventas",
      description:
        "Proyección de ventas esperadas en unidades y valor monetario",
      icon: BarChartIcon,
      color: "#1C4384",
    },
    {
      id: "production",
      title: "Presupuesto de Producción",
      description:
        "Planificación de unidades a producir para cumplir ventas proyectadas",
      icon: FactoryIcon,
      color: "#2D5AA3",
    },
    {
      id: "materials",
      title: "Presupuesto de Materia Prima",
      description:
        "Estimación de necesidades de materia prima para la producción",
      icon: PackageIcon,
      color: "#3A6BC5",
    },
  ];

  // Hook para la configuración de presupuestos
  const budgetConfig = useBudgetConfiguration();

  // Manejar selección de presupuesto
  const handleSelectBudget = (budgetId) => {
    setSelectedBudget(budgetId);
    // Si cambiamos de presupuesto, reiniciamos a la vista de configuración
    if (budgetId !== selectedBudget) {
      setActiveView("config");
    }
  };

  // Manejar cambio de vista
  const handleTabChange = (e, newValue) => {
    setActiveView(newValue);
  };

  useEffect(() => {
    const storedBudgets = JSON.parse(localStorage.getItem("savedBudgets")) || [];
    setSavedBudgets(storedBudgets);
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem("savedBudgets", JSON.stringify(savedBudgets));
  }, [savedBudgets]);

  const sendSalesBudget = async ({ growthRates, decadeDistribution, createdBy }) => {
    try {
      if (
        !Array.isArray(growthRates) || growthRates.length !== 12 ||
        !Array.isArray(decadeDistribution) || decadeDistribution.length !== 12
      ) {
        console.error("Datos inválidos. Asegúrate de tener 12 meses.");
        return;
      }

      const salesBudget = growthRates.map((growth, index) => {
        const decade = decadeDistribution[index];
        return {
          month_id: index + 1,
          growth,
          decade_1: decade.d1,
          decade_2: decade.d2,
          decade_3: decade.d3,
          created_by: createdBy
        };
      });

      const response = await axiosInstance.post("/salesbudget/createSaleBudget", {
        salesBudget
      });

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;

      showAlert(
        "Presupuesto de ventas",
        JSON.stringify(message, null, 2),
        "error",
        "#1C4384"
      );
      console.error("Error al registrar presupuesto de ventas:", error.response?.data || error.message);
    }
  };

  // Manejar guardar configuración
  const handleSaveConfiguration = async () => {
    // Validar que todas las distribuciones sumen 100%
    if (!budgetConfig.validateAllDistributions()) {
      alert(
        "Algunas distribuciones por década no suman 100%. Por favor, revisa los valores."
      );
      return;
    }

    const growthRates = budgetConfig.growthRates;

    const decadeDistribution = budgetConfig.decadeDistribution;

    const userData = JSON.parse(localStorage.getItem("userData")) || null;

    const createdBy = userData.id;

    const responseSendSalesBudget = await sendSalesBudget({
      growthRates,
      decadeDistribution,
      createdBy
    });

    if (responseSendSalesBudget?.ok) {
      showAlert(
        "Guardado Presupuestos de ventas",
        "Presupuestos de ventas registrados exitosamente",
        "success",
        "#1C4384"
      );

      setSavedBudgets((prev) => [...prev, "config"]);
    }


    // Cambiar a vista operativa
    setActiveView("operational");
  };

  // Obtener el presupuesto seleccionado
  const currentBudgetType = budgetTypes.find((b) => b.id === selectedBudget);

  return (
    <Box sx={{ width: "100%" }}>
      <InfoCard
        title="Configuración del Presupuesto"
        description="Define el crecimiento mensual y la distribución por décadas para todo el año. Estos valores no
        podrán modificarse durante la operación."
      />
      <Card sx={{ boxShadow: 2, mb: 4, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Presupuestos
              </Typography>
            </Box>
          }
          sx={{
            bgcolor: theme.palette.primary.main,
            background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            color: "white",
            p: 2,
          }}
        />

        <CardContent sx={{ p: 4, bgcolor: "#F8F9FC" }}>
          {/* Selector de Tipo de Presupuesto */}
          <BudgetSelector
            budgetTypes={budgetTypes}
            selectedBudget={selectedBudget}
            onSelectBudget={handleSelectBudget}
            theme={theme}
            savedBudgets={savedBudgets}
          />

          {/* Contenido del Presupuesto Seleccionado */}
          {selectedBudget && (
            <Box
              sx={{
                transition: "all 0.3s ease",
                maxHeight: selectedBudget ? "2000px" : 0,
                opacity: selectedBudget ? 1 : 0,
                overflow: "hidden",
                mt: 4,
              }}
            >
              <Card sx={{ boxShadow: 2, overflow: "hidden" }}>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          p: 0.75,
                          borderRadius: "50%",
                          bgcolor: "rgba(28, 67, 132, 0.1)",
                          display: "flex",
                        }}
                      >
                        {currentBudgetType &&
                          React.createElement(currentBudgetType.icon, {
                            fontSize: "small",
                            sx: { color: theme.palette.primary.main },
                          })}
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color={theme.palette.primary.dark}
                      >
                        {currentBudgetType?.title}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    bgcolor: "#EBF5FF",
                    py: 1.5,
                    px: 3,
                  }}
                />

                <Box>
                  {/* Solo mostrar las pestañas para el presupuesto de ventas */}
                  {selectedBudget === "sales" && (
                    <Tabs
                      value={activeView}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        "& .MuiTab-root": {
                          textTransform: "none",
                          minWidth: 100,
                          fontWeight: "medium",
                          transition: "all 0.3s ease",
                        },
                        "& .Mui-selected": {
                          color: `${theme.palette.primary.main} !important`,
                          fontWeight: "bold",
                        },
                        "& .MuiTabs-indicator": {
                          backgroundColor: theme.palette.primary.main,
                          height: 3,
                        },
                      }}
                    >
                      <Tab
                        label="Configuración Inicial"
                        value="config"
                        sx={{
                          color:
                            activeView === "config"
                              ? theme.palette.primary.main
                              : "text.secondary",
                        }}
                      />
                      <Tab
                        label="Vista operativa"
                        value="operational"
                        sx={{
                          color:
                            activeView === "operational"
                              ? theme.palette.primary.main
                              : "text.secondary",
                        }}
                      />
                    </Tabs>
                  )}

                  <Box sx={{ p: 3 }}>
                    {/* Vista de Configuración para Ventas */}
                    {activeView === "config" && selectedBudget === "sales" && (
                      <ConfigurationView
                        budgetConfig={budgetConfig}
                        onSave={handleSaveConfiguration}
                        theme={theme}
                        budgetType={currentBudgetType}
                      />
                    )}

                    {/* Vista Operativa */}
                    {(activeView === "operational" || selectedBudget === "production") && (
                      <Box>
                        {selectedBudget === "sales" && (
                          <SalesBudget
                            budgetConfig={budgetConfig}
                            theme={theme}
                            budgetType={currentBudgetType}
                            onSuccess={() => {
                              setSavedBudgets((prev) => [...prev, "operational"]);
                            }}
                          />
                        )}
                        {/* Presupuesto de Producción con vista única */}
                        {selectedBudget === "production" && (
                          <ProductionBudget
                            budgetConfig={budgetConfig}
                            theme={theme}
                            budgetType={currentBudgetType}
                            onSuccess={() => {
                              setSavedBudgets((prev) => [...prev, "production"]);
                            }}
                          />
                        )}
                      </Box>
                    )}
                    {/* Presupuesto de Materia Prima */}
                    {(selectedBudget === "materials") && (
                      <MaterialsBudget
                        budgetConfig={budgetConfig}
                        theme={theme}
                        budgetType={currentBudgetType}
                      />
                    )}
                  </Box>
                </Box>
              </Card>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}