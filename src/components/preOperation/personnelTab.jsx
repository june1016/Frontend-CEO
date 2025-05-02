// src/components/preOperation/personnelTab.jsx
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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoCard from "../planning/financialData/common/infoCard";
import OrganizationalStructureView from "./personnel/organizationalStructureView";
import ShiftAssignmentView from "./personnel/shiftAssignmentView";

const PersonnelTab = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Gestión del Talento Humano"
        description="Gestiona tu personal, define la estructura organizacional, asigna roles, administra turnos y controla los costos asociados a la nómina para optimizar la eficiencia operativa de tu empresa."
        icon={<PeopleAltIcon />}
      />

      <Card sx={{ boxShadow: 2, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PeopleAltIcon sx={{ marginRight: 1 }} />
              <span>Nómina & Personal</span>
            </Box>
          }
          subheader="Gestión de estructura organizacional y costos de personal"
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
              aria-label="tabs de nómina"
              variant="standard"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-start",
                },
                "& .MuiTab-root": {
                  minWidth: 120,
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
              <Tab 
                icon={<PeopleAltIcon />} 
                iconPosition="start" 
                label="Estructura Organizacional" 
              />
              <Tab 
                icon={<ScheduleIcon />} 
                iconPosition="start" 
                label="Asignación de Turnos" 
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {tabValue === 0 && <OrganizationalStructureView />}
            {tabValue === 1 && <ShiftAssignmentView />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PersonnelTab;