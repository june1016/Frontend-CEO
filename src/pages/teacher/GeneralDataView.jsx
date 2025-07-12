import React, { useState } from "react";
import { Tabs, Tab, Box, Paper, Typography } from "@mui/material";
import TeacherPlanning from "./teacherPlanningPage";
import FinancialStatements from "./FinancialStatements";
import InitialInventoryView from "./InitialInventoryView";
import FixedExpensesView from "./fixedExpensesView";
import MarketingConfigurationView from "./marketingConfigurationView";

export default function GeneralDataView() {
    const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Gestión de planificación
      </Typography>

      {/* Tabs de navegación */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Tabs de información financiera"
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
          <Tab label="Gastos Fijos Mensuales" />
           <Tab label="Configuración Marketing" />
        </Tabs>
      </Box>

      {/* Contenido del tab seleccionado */}
      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && <TeacherPlanning />}
        {tabIndex === 1 && <FinancialStatements />}
        {tabIndex === 2 && <InitialInventoryView />}
        {tabIndex === 3 && <FixedExpensesView />}
        {tabIndex === 4 && <MarketingConfigurationView />}
      </Box>
    </Box>
  );
}
