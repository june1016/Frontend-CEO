// src/pages/dashboard/productionPage.jsx
import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ProductionControlTab from "../../components/production/productionControlTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`production-tabpanel-${index}`}
      aria-labelledby={`production-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `production-tab-${index}`,
    "aria-controls": `production-tabpanel-${index}`,
  };
}

export default function ProductionPage() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Producción y Operaciones
        </Typography>
        <Tooltip title="Gestiona y supervisa los procesos productivos, asegurando el cumplimiento de los presupuestos establecidos.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="production tabs"
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
          <Tab label="Control de Producción" {...a11yProps(0)} />
          <Tab label="Control de Capacidades" {...a11yProps(1)} disabled />
          <Tab label="Resultados de Producción" {...a11yProps(2)} disabled />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ProductionControlTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Control de Capacidades (Próximamente)
      </TabPanel>
      <TabPanel value={value} index={2}>
        Resultados de Producción (Próximamente)
      </TabPanel>
    </Box>
  );
}