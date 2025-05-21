// src/components/preOperation/machinery/MachineList.jsx
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MachineCard from './common/MachineCard';

const MachineList = ({ machines, selectedMachine, onSelectMachine, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  
  if (!machines || machines.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Paper
          elevation={0}
          sx={{ p: 4, border: "1px solid #E5E7EB", mb: 4 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              py: 6,
            }}
          >
            <PrecisionManufacturingIcon
              sx={{
                fontSize: 60,
                color: "primary.main",
                opacity: 0.7,
                mb: 2,
              }}
            />
            <Typography
              variant="h5"
              fontWeight={600}
              color="primary.main"
              mb={2}
            >
              Gestión de Maquinaria
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              maxWidth="600px"
            >
              Administra tu maquinaria, programa mantenimientos, monitorea el
              rendimiento y planifica adquisiciones para optimizar tu
              producción.
            </Typography>
          </Box>
        </Paper>
        <Typography variant="body1" color="text.secondary">
          No hay máquinas registradas por el momento.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Grid container spacing={3}>
      {machines.map((machine) => (
        <Grid item xs={12} sm={6} md={4} key={machine.id}>
          <MachineCard
            machine={machine}
            isSelected={selectedMachine?.id === machine.id}
            onClick={onSelectMachine}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MachineList;