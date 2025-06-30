// src/pages/dashboard/inventoryPage.jsx
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
import PurchaseManagementTab from "../../components/inventories/purcharse/PurchaseManagementTab";
import InventoryManagementTab from "../../components/inventories/inventory/InventoryManagementTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `inventory-tab-${index}`,
    "aria-controls": `inventory-tabpanel-${index}`,
  };
}

export default function InventoryPage() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Gestión de Inventarios y Compras
        </Typography>
        <Tooltip title="Supervisa el estado del inventario y gestiona el proceso de adquisición de materiales y productos.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="inventory tabs"
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
          <Tab label="Gestión de Inventarios" {...a11yProps(0)} />
          <Tab label="Gestión de Compras" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <InventoryManagementTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PurchaseManagementTab />
      </TabPanel>
    </Box>
  );
}
