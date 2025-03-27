import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FinancialDataTab from "../../components/planning/financialDataTab";
import BalanceSheetTab from "../../components/planning/balanceSheetTab";
import InitialIndicatorsTab from "../../components/planning/initialIndicatorsTab";
import TargetIndicatorsTab from "../../components/planning/targetIndicatorsTab";
import BudgetTab from "../../components/planning/budgetTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`planning-tabpanel-${index}`}
      aria-labelledby={`planning-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `planning-tab-${index}`,
    "aria-controls": `planning-tabpanel-${index}`,
  };
}

export default function PlanningPage() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Planificación
        </Typography>
        <Tooltip title="En esta sección podrás gestionar la planificación financiera y operativa de tu empresa, configurando presupuestos e indicadores para lograr tus objetivos.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Solo tabs sin meter todo en una Card */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="planning tabs"
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
          <Tab label="Datos Financieros" {...a11yProps(0)} />
          <Tab label="Balance General" {...a11yProps(1)} />
          <Tab label="Indicadores Financieros Iniciales" {...a11yProps(2)} />
          <Tab label="Indicadores Objs" {...a11yProps(3)} />
          <Tab label="Presupuestos" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <FinancialDataTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BalanceSheetTab handleTab={handleChange}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InitialIndicatorsTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TargetIndicatorsTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <BudgetTab />
      </TabPanel>
    </Box>
  );
}
