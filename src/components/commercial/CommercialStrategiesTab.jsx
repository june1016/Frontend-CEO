import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  useTheme,
  alpha
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GavelIcon from "@mui/icons-material/Gavel";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InfoCard from "../common/infoCard";
import PricesView from "./views/pricesView";
import CreditPoliciesView from "./views/CreditPolicyView";
import MarketingView from "./views/MarketingView";
import ContractsView from "./views/ContractsView";


const CommercialStrategiesTab = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Estrategias Comerciales"
        description="Define estrategias clave para posicionar tus productos en el mercado, establecer políticas de crédito, ajustar precios competitivos, desarrollar campañas de marketing y participar en procesos contractuales."
      />

      <Card sx={{ boxShadow: 2, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CampaignIcon sx={{ marginRight: 1 }} />
              <span>Estrategias Comerciales</span>
            </Box>
          }
          subheader="Gestión de precios, créditos y marketing"
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
              bgcolor: alpha(theme.palette.primary.light, 0.04)
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="tabs de estrategias comerciales"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-start",
                },
                "& .MuiTab-root": {
                  minWidth: 160,
                  fontWeight: 500,
                  textTransform: "none",
                  px: 3,
                  py: 2,
                  "&.Mui-selected": {
                    fontWeight: 600,
                  },
                },
              }}
            >
              <Tab icon={<AttachMoneyIcon />} iconPosition="start" label="Precios" />
              <Tab icon={<GavelIcon />} iconPosition="start" label="Políticas de crédito" />
              <Tab icon={<CampaignIcon />} iconPosition="start" label="Marketing" />
              <Tab icon={<AssignmentIcon />} iconPosition="start" label="Contratos / Licitaciones" />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {tabValue === 0 && <PricesView />}
            {tabValue === 1 && <CreditPoliciesView />}
            {tabValue === 2 && <MarketingView />}
            {tabValue === 3 && <ContractsView />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommercialStrategiesTab;
