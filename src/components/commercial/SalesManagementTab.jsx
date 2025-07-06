// src/components/commercial/SalesManagementTab.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from "@mui/material";
import InfoCard from "../common/infoCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SalesDashboardView from "./views/SalesDashboardView";
import SalesRecordView from "./views/SalesRecordView";


const SalesManagementTab = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <Box>
      {/* Tarjeta de información */}
      <InfoCard
        title="Gestión de Ventas"
        description="Administra tus ventas a través del panel de control, visualiza métricas clave y registra nuevas transacciones fácilmente para tener control total sobre el desempeño comercial de tu empresa."
      />

      <Card sx={{ mt: 2, boxShadow: 2, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <ShoppingCartIcon />
              <span>Ventas y Transacciones</span>
            </Box>
          }
          subheader="Control y monitoreo de las ventas realizadas"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            p: 2,
          }}
          subheaderTypographyProps={{ color: "white" }}
        />

        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: alpha(theme.palette.primary.light, 0.04),
            }}
          >
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="standard"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-start",
                },
                "& .MuiTab-root": {
                  minWidth: 140,
                  textTransform: "none",
                  fontWeight: 500,
                  px: 3,
                  py: 2,
                  "&.Mui-selected": {
                    fontWeight: 600,
                  },
                },
              }}
            >
              <Tab
                icon={<DashboardIcon />}
                iconPosition="start"
                label="Panel de Control"
              />
              <Tab
                icon={<AddShoppingCartIcon />}
                iconPosition="start"
                label="Registro de Ventas"
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {tab === 0 && <SalesDashboardView />}
            {tab === 1 && <SalesRecordView />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SalesManagementTab;
