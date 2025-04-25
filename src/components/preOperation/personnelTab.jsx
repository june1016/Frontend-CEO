import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InfoCard from "../planning/financialData/common/infoCard";
import OperationalStructureView from "./personal/OrganizationalStructureView";
import ShiftAssignmentView from "./personal/ShiftAssignmentView";

// import ShiftAssignmentView from "./views/ShiftAssignmentView";

const PersonnelTab = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Estructura Operacional del Personal
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Aquí puedes definir los departamentos, cargos y jerarquía de tu equipo.
            </Typography>
            <OperationalStructureView />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" fontWeight={600} mb={2}>
              Asignación de Turnos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Asigna turnos y horarios de trabajo al personal según sus roles.
            </Typography>
            <ShiftAssignmentView />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Gestión del Talento Humano"
        description="Gestiona tu personal, define la estructura organizacional, asigna roles,
            administra turnos y controla los costos asociados a la nómina."
      />

      <Card sx={{ p: 4 }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PeopleAltIcon sx={{ marginRight: 1 }} />
              Nómina & Personal
            </Box>
          }
          subheader="Gestión de estructura organizacional y costos de personal"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
          subheaderTypographyProps={{ color: "white" }}
        />

        <CardContent>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="tabs de nómina"
            variant="standard"
            sx={{
              alignSelf: "flex-start",
              "& .MuiTabs-flexContainer": {
                justifyContent: "flex-start",
              },
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
            <Tab label="Estructura Organizacional" />
            <Tab label="Asignación de Turnos" />
          </Tabs>

          {renderTabContent()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PersonnelTab;
