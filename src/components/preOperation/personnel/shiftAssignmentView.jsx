// src/components/preOperation/personnel/ShiftAssignmentView.jsx
import React, { useEffect } from "react";
import {
  Box,
  Alert,
  AlertTitle,
  Typography,
  Button,
  CircularProgress,
  Divider,
  useTheme
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MachineGroup from "./common/machineGroup";
import StatsPanel from "./common/statsPanel";
import { useShiftAssignment } from "../../../hooks/personnel/useShiftAssignment";

const ShiftAssignmentView = () => {
  const theme = useTheme();
  const {
    loading,
    data,
    machineTurnCounts,
    operatorCount,
    assignedTurnsTotal,
    operatorsAvailable,
    totalTurnsCovered,
    totalTurnsNeeded,
    toggleShiftSelection,
    isSelected,
    saveShiftAssignments,
    formatTimeRange
  } = useShiftAssignment();

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress size={50} />
        <Typography variant="body1" sx={{ mt: 2 }}>Cargando información de turnos...</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4} sx={{ mt: 3 }}>
      {/* Contenido principal */}
      <Box flex={3}>
        <Alert 
          severity="info" 
          sx={{ mb: 4 }}
        >
          <AlertTitle>Asignación de Turnos de Trabajo</AlertTitle>
          Cada máquina necesita operarios asignados para los tres turnos diarios. Los turnos sin asignación 
          tendrán un impacto negativo en la productividad.
        </Alert>

        {data.length === 0 ? (
          <Box sx={{ textAlign: "center", p: 4 }}>
            <Typography variant="subtitle1">
              No hay productos o máquinas disponibles para asignar turnos.
            </Typography>
          </Box>
        ) : (
          data.map((product) => (
            <Box key={product.product_id} mb={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScheduleIcon 
                  sx={{ 
                    color: theme.palette.primary.main,
                    mr: 1
                  }} 
                />
                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  color="text.primary"
                >
                  {product.product_name}
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              {product.machines.map((machine) => {
                const assigned = machineTurnCounts[machine.machine_id] || 0;
                
                return (
                  <MachineGroup
                    key={machine.machine_id}
                    machine={machine}
                    assignedCount={assigned}
                    isSelected={isSelected}
                    toggleSelection={toggleShiftSelection}
                    formatTimeRange={formatTimeRange}
                  />
                );
              })}
            </Box>
          ))
        )}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveShiftAssignments}
            sx={{ 
              py: 1.2, 
              px: 4,
              mt: 2 
            }}
            disabled={assignedTurnsTotal < 3 || operatorCount < 3}
          >
            Guardar todas las asignaciones
          </Button>
        </Box>
      </Box>

      {/* Panel lateral */}
      <Box flex={1}>
        <StatsPanel
          operatorCount={operatorCount}
          assignedTurnsTotal={assignedTurnsTotal}
          operatorsAvailable={operatorsAvailable}
          totalTurnsCovered={totalTurnsCovered}
          totalTurnsNeeded={totalTurnsNeeded}
        />
      </Box>
    </Box>
  );
};

export default ShiftAssignmentView;