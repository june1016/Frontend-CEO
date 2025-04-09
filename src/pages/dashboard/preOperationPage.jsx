import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SuppliersTab from "../../components/preOperation/suppliersTab";
import BudgetTab from "../../components/preOperation/budgetTab";
import MachineryTab from "../../components/preOperation/machineryTab";
import PersonnelTab from "../../components/preOperation/personnelTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pre-operation-tabpanel-${index}`}
      aria-labelledby={`pre-operation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `pre-operation-tab-${index}`,
    "aria-controls": `pre-operation-tabpanel-${index}`,
  };
}

export default function PreOperationPage() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Pre-Operación
        </Typography>
        <Tooltip title="Configura todos los aspectos operativos de tu empresa: proveedores, presupuestos, maquinaria y personal.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="pre-operation tabs"
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
          <Tab label="Proveedores" {...a11yProps(0)} />
          <Tab label="Presupuestos" {...a11yProps(1)} />
          <Tab label="Maquinaria" {...a11yProps(2)} />
          <Tab label="Nómina & Personal" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <SuppliersTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BudgetTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MachineryTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PersonnelTab />
      </TabPanel>
    </Box>
  );
}
