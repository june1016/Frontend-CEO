// src/components/production/common/machineStatusCard.jsx
import React from 'react';
import { 
  Card, CardHeader, CardContent, Typography, Box, Chip, Grid, 
  LinearProgress, useTheme, Divider, Avatar
} from '@mui/material';
import { 
  Settings as SettingsIcon,
  Timer as TimerIcon,
  Build as BuildIcon,
  People as PeopleIcon
} from '@mui/icons-material';

const MachineStatusCard = ({ machines }) => {
  const theme = useTheme();

  // Función para determinar el color de estado de la máquina
  const getMachineStatusColor = (status) => {
    switch (status) {
      case 'active':
        return {
          color: theme.palette.success.main,
          bg: theme.palette.success.light,
          text: 'Activa'
        };
      case 'maintenance':
        return {
          color: theme.palette.warning.main,
          bg: theme.palette.warning.light,
          text: 'En Mantenimiento'
        };
      case 'inactive':
        return {
          color: theme.palette.error.main,
          bg: theme.palette.error.light,
          text: 'Inactiva'
        };
      default:
        return {
          color: theme.palette.grey[500],
          bg: theme.palette.grey[200],
          text: 'Desconocido'
        };
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon fontSize="small" />
            Estado de Máquinas
          </Typography>
        } 
        sx={{ 
          bgcolor: theme.palette.grey[50],
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {machines.map((machine, index) => {
            const statusStyle = getMachineStatusColor(machine.status);
            const activeShifts = machine.operators.filter(op => op.assigned).length;
            
            return (
              <Card 
                key={machine.id} 
                variant="outlined" 
                sx={{ 
                  p: 0, 
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <Box sx={{ p: 2, bgcolor: theme.palette.grey[50], borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.light }}>
                        <BuildIcon fontSize="small" sx={{ color: 'white' }} />
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {machine.id}
                      </Typography>
                    </Box>
                    <Chip 
                      label={statusStyle.text} 
                      size="small"
                      sx={{ 
                        bgcolor: statusStyle.bg, 
                        color: statusStyle.color,
                        fontWeight: 500 
                      }} 
                    />
                  </Box>
                </Box>
                
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Eficiencia
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={machine.efficiency} 
                            sx={{ 
                              width: '100%', 
                              height: 8, 
                              borderRadius: 1,
                              bgcolor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                bgcolor: 
                                  machine.efficiency > 80 ? theme.palette.success.main :
                                  machine.efficiency > 60 ? theme.palette.warning.main :
                                  theme.palette.error.main
                              }
                            }}
                          />
                          <Typography variant="body2" fontWeight="medium">
                            {machine.efficiency}%
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Turnos Activos
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <PeopleIcon color="primary" fontSize="small" />
                          <Typography variant="body1" fontWeight="medium">
                            {activeShifts}/3
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Próximo Mantenimiento
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <TimerIcon color="primary" fontSize="small" />
                          <Typography variant="body1" fontWeight="medium">
                            {machine.nextMaintenance}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MachineStatusCard;