// src/components/preOperation/personnel/common/StatsPanel.jsx
import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Box,
  useTheme
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const StatItem = ({ title, value, icon, color }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        {icon}
        <Typography variant="body1" fontWeight={500} sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" fontWeight={700} color={color}>
        {value}
      </Typography>
    </Box>
  );
};

const StatsPanel = ({ 
  operatorCount, 
  assignedTurnsTotal, 
  operatorsAvailable, 
  totalTurnsCovered, 
  totalTurnsNeeded 
}) => {
  const theme = useTheme();
  
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: `${theme.palette.primary.light}0D`, // 0.05 opacidad (hex 0D)
          border: `1px solid ${theme.palette.primary.main}26`, // 0.15 opacidad
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Información de Operarios
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <StatItem 
          title="Operarios contratados" 
          value={operatorCount}
          icon={<AccountCircleIcon sx={{ color: theme.palette.primary.main }} />}
          color="primary.main"
        />

        <StatItem 
          title="Turnos seleccionados" 
          value={assignedTurnsTotal}
          icon={<EventBusyIcon sx={{ color: theme.palette.secondary.main }} />}
          color="secondary.main"
        />

        <StatItem 
          title="Operarios disponibles" 
          value={operatorsAvailable}
          icon={<AccountCircleIcon sx={{ color: operatorsAvailable > 0 ? theme.palette.success.main : theme.palette.error.main }} />}
          color={operatorsAvailable > 0 ? "success.main" : "error.main"}
        />
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: `${theme.palette.primary.light}0D`,
          border: `1px solid ${theme.palette.primary.main}26`,
          mt: 3
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Resumen de Turnos
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <StatItem 
          title="Turnos cubiertos" 
          value={totalTurnsCovered}
          icon={<AssignmentTurnedInIcon sx={{ color: theme.palette.success.main }} />}
          color="success.main"
        />

        <StatItem 
          title="Turnos necesarios" 
          value={totalTurnsNeeded}
          icon={<EventBusyIcon sx={{ color: theme.palette.secondary.main }} />}
          color="secondary.main"
        />
        
        <Box sx={{ mt: 2, p: 1.5, borderRadius: 1, backgroundColor: `${theme.palette.warning.light}33` }}>
          <Typography variant="caption" sx={{ color: theme.palette.warning.dark, fontWeight: 500 }}>
            Cada máquina debe tener sus tres turnos cubiertos para operar al máximo de eficiencia.
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default StatsPanel;