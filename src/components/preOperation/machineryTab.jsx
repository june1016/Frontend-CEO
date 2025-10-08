// src/components/preOperation/machineryTab.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Alert,
  AlertTitle,
  useTheme,
} from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import WarningIcon from '@mui/icons-material/Warning';
import InfoCard from "../common/infoCard";
import MachineList from "./machinery/machineList";
import MachineDetails from "./machinery/machineDetails";
import { useMachinery } from "../../hooks/preOperation/machinery/useMachinery";

export default function MachineryTab() {
  const theme = useTheme();
  const { machines, selectedMachine, loading, selectMachine } = useMachinery();
  
  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Información de Maquinaria Disponible"
        description="Revise las especificaciones técnicas de cada máquina. Todas las máquinas están certificadas y listas para operar. El mantenimiento preventivo está programado automáticamente según los estándares del fabricante."
      />
      
      <Card sx={{ boxShadow: 2, overflow: "hidden", mb: 4 }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EngineeringIcon sx={{ marginRight: 1 }} />
              <span>Gestión de Maquinaria</span>
            </Box>
          }
          subheader="Control y monitoreo de máquinas"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            p: 2,
          }}
          subheaderTypographyProps={{ color: "white" }}
        />
        
        <CardContent sx={{ p: 3 }}>
          <MachineList 
            machines={machines} 
            selectedMachine={selectedMachine}
            onSelectMachine={selectMachine}
            loading={loading}
          />
          
          {selectedMachine && <MachineDetails machine={selectedMachine} />}
          
          {/* Alerta de Material UI en lugar de CustomInfoCard */}
          <Alert 
            severity="warning" 
            icon={<WarningIcon />}
            sx={{ 
              mt: 4,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <AlertTitle>Advertencia de Mantenimiento</AlertTitle>
            <Box>
              Asegúrese de revisar las máquinas periódicamente para evitar fallos operativos.
              El mantenimiento preventivo está programado automáticamente según los estándares
              del fabricante, pero se recomienda vigilar las condiciones de funcionamiento.
            </Box>
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
}