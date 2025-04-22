// src/components/preOperation/suppliersTab.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  useTheme,
} from "@mui/material";
import {
  StorefrontOutlined as StorefrontIcon,
  CompareArrows as CompareIcon,
  CheckCircleOutline as SelectionIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

// Componentes de pestañas
import SuppliersList from "./suppliers/SuppliersList";
import SupplierComparison from "./suppliers/SupplierComparison";
import SupplierSelections from "./suppliers/SupplierSelections";

// Hook personalizado (a implementar)
import useSuppliers from "../../hooks/suppliers/useSuppliers";

export default function SuppliersTab() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const { 
    suppliers, 
    materials, 
    selections, 
    updateSelection, 
    saveSelections,
    hasStaffMember,
    isOperationalMonth,
    currentDecade,
    loading, 
    error 
  } = useSuppliers();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Detectar si estamos en Mes 0 o en Meses 1-12 (primera década)
  const canChangeSelections = !isOperationalMonth || (isOperationalMonth && currentDecade === 1);

  return (
    <Box>
      {/* Alerta informativa */}
      <Card
        sx={{
          mb: 4,
          bgcolor: "primary.light",
          color: "white",
          background:
            "linear-gradient(to right, rgba(28, 67, 132, 0.05), rgba(28, 67, 132, 0.1))",
          border: "none",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <StorefrontIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main }}
            />
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 0.5, color: "primary.main" }}
              >
                Gestión de Proveedores
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {isOperationalMonth 
                  ? "Administre sus relaciones con proveedores. Recuerde que solo puede cambiar de proveedor en la primera década de cada mes."
                  : "Seleccione los proveedores para cada material. Compare precios, condiciones de pago y descuentos para tomar la mejor decisión estratégica."
                }
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tarjeta principal */}
      <Card sx={{ boxShadow: 2, mb: 4, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StorefrontIcon sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Proveedores
              </Typography>
            </Box>
          }
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            p: 2,
          }}
        />

        <CardContent sx={{ p: 0 }}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="proveedores tabs"
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    minWidth: 0,
                    px: 3,
                    py: 2,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    fontFamily: '"Nunito Sans", sans-serif',
                    "&.Mui-selected": {
                      fontWeight: 600,
                      color: "primary.main",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    height: 3,
                  },
                }}
              >
                <Tab 
                  icon={<StorefrontIcon sx={{ fontSize: 20 }} />} 
                  iconPosition="start" 
                  label="Proveedores" 
                />
                <Tab 
                  icon={<CompareIcon sx={{ fontSize: 20 }} />} 
                  iconPosition="start" 
                  label="Comparativa" 
                />
                <Tab 
                  icon={<SelectionIcon sx={{ fontSize: 20 }} />} 
                  iconPosition="start" 
                  label="Mis Selecciones" 
                />
              </Tabs>
            </Box>

            {/* Contenido de las pestañas */}
            <Box sx={{ p: 3 }}>
              {/* Si estamos en mes operativo (1-12) y fuera de la primera década, mostrar alerta */}
              {isOperationalMonth && currentDecade > 1 && (
                <Alert 
                  severity="warning" 
                  icon={<InfoIcon />}
                  sx={{ mb: 3 }}
                >
                  <AlertTitle>Cambios no disponibles</AlertTitle>
                  Solo puede cambiar de proveedor durante la primera década del mes.
                  {hasStaffMember('secretaria') && 
                    " Su secretaria le recuerda que la próxima oportunidad será al inicio del siguiente mes."}
                </Alert>
              )}

              {/* Panel de Proveedores */}
              {activeTab === 0 && (
                <SuppliersList 
                  suppliers={suppliers} 
                  hasProductionManager={hasStaffMember('jefe_produccion')}
                  loading={loading}
                />
              )}

              {/* Panel de Comparativa */}
              {activeTab === 1 && (
                <SupplierComparison 
                  suppliers={suppliers} 
                  materials={materials}
                  hasProductionManager={hasStaffMember('jefe_produccion')}
                  loading={loading}
                />
              )}

              {/* Panel de Selecciones */}
              {activeTab === 2 && (
                <SupplierSelections 
                  suppliers={suppliers}
                  materials={materials}
                  selections={selections}
                  updateSelection={updateSelection}
                  saveSelections={saveSelections}
                  readonly={!canChangeSelections}
                  hasProductionManager={hasStaffMember('jefe_produccion')}
                  loading={loading}
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}