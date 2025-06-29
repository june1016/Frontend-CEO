// src/components/production/common/operativeSummaryCard.jsx
import React from 'react';
import { 
  Card, CardHeader, CardContent, Typography, Box, Grid, Chip, 
  Avatar, useTheme
} from '@mui/material';
import { 
  Settings as SettingsIcon, 
  People as PeopleIcon, 
  Business as BusinessIcon, 
  Warning as WarningIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const OperativeSummaryCard = ({ productData, productName }) => {
  const theme = useTheme();
  const summary = productData.summary || {};
  
  // Determinar el icono y color del estado general
  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical':
        return <WarningIcon sx={{ color: theme.palette.error.main }} />;
      case 'warning':
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      case 'normal':
      default:
        return <CheckIcon sx={{ color: theme.palette.success.main }} />;
    }
  };

  // Determinar el texto del estado general
  const getStatusText = (status) => {
    switch (status) {
      case 'critical':
        return "Requiere Atención Urgente";
      case 'warning':
        return "Requiere Atención";
      case 'normal':
      default:
        return "En Meta";
    }
  };

  // Determinar el color de fondo del chip de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return {
          bgcolor: theme.palette.error.light,
          color: theme.palette.error.main
        };
      case 'warning':
        return {
          bgcolor: theme.palette.warning.light,
          color: theme.palette.warning.main
        };
      case 'normal':
      default:
        return {
          bgcolor: theme.palette.success.light,
          color: theme.palette.success.main
        };
    }
  };

  const statusColor = getStatusColor(summary.productionStatus);

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon fontSize="small" />
            Resumen Operativo - {productName.toUpperCase()}
          </Typography>
        }
        sx={{ 
          bgcolor: theme.palette.grey[50],
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          {/* Eficiencia Promedio */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              bgcolor: theme.palette.grey[50],
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Eficiencia Promedio
                </Typography>
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.light }}>
                  <SettingsIcon fontSize="small" sx={{ color: 'white' }} />
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 'auto' }}>
                {summary.averageEfficiency}%
              </Typography>
            </Box>
          </Grid>

          {/* Operarios Activos */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              bgcolor: theme.palette.grey[50],
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Operarios Activos
                </Typography>
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.light }}>
                  <PeopleIcon fontSize="small" sx={{ color: 'white' }} />
                </Avatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 'auto' }}>
                {summary.activeOperators}/{summary.totalOperators}
              </Typography>
            </Box>
          </Grid>

          {/* Proveedor Actual */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              bgcolor: theme.palette.grey[50],
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Proveedor Actual
                </Typography>
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.light }}>
                  <BusinessIcon fontSize="small" sx={{ color: 'white' }} />
                </Avatar>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 500, mt: 'auto' }}>
                {productData.supplier || "No establecido"}
              </Typography>
            </Box>
          </Grid>

          {/* Estado General */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1, 
              bgcolor: theme.palette.grey[50],
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Estado General
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Chip
                  icon={getStatusIcon(summary.productionStatus)}
                  label={getStatusText(summary.productionStatus)}
                  sx={{
                    bgcolor: statusColor.bgcolor,
                    color: statusColor.color,
                    fontWeight: 500,
                    '& .MuiChip-icon': {
                      color: statusColor.color
                    }
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OperativeSummaryCard;