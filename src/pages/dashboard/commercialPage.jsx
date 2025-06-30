// src/pages/dashboard/commercialPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SalesManagementTab from "../../components/commercial/SalesManagementTab";
import CommercialStrategiesTab from "../../components/commercial/CommercialStrategiesTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`commercial-tabpanel-${index}`}
      aria-labelledby={`commercial-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `commercial-tab-${index}`,
    "aria-controls": `commercial-tabpanel-${index}`,
  };
}

export default function CommercialPage() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Encabezado Principal */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Gestión Comercial y Estratégica
        </Typography>
        <Tooltip title="Gestiona la estrategia de ventas y toma decisiones para mejorar el rendimiento comercial.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="commercial tabs"
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
          <Tab label="Estrategias Comerciales" {...a11yProps(0)} />
          <Tab label="Gestión de Ventas" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <CommercialStrategiesTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SalesManagementTab />
      </TabPanel>
    </Box>
  );
}
