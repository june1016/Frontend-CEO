// src/components/production/common/materialStatusCard.jsx
import React from 'react';
import { 
  Card, CardHeader, CardContent, Typography, Box, Chip, Grid, 
  useTheme, Divider, LinearProgress, Avatar
} from '@mui/material';
import { 
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const MaterialStatusCard = ({ materialsAnalysis }) => {
  const theme = useTheme();

  // Función para determinar estado de stock
  const getStockStatus = (status) => {
    switch (status) {
      case 'critical':
        return {
          color: theme.palette.error.main,
          bg: theme.palette.error.light,
          text: 'Stock Crítico',
          icon: <WarningIcon fontSize="small" />
        };
      case 'warning':
        return {
          color: theme.palette.warning.main,
          bg: theme.palette.warning.light,
          text: 'Stock Bajo',
          icon: <WarningIcon fontSize="small" />
        };
      case 'normal':
      default:
        return {
          color: theme.palette.success.main,
          bg: theme.palette.success.light,
          text: 'Stock OK',
          icon: <CheckIcon fontSize="small" />
        };
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InventoryIcon fontSize="small" />
            Estado de Materiales
          </Typography>
        } 
        sx={{ 
          bgcolor: theme.palette.grey[50],
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {materialsAnalysis.map((material, index) => {
            const statusStyle = getStockStatus(material.stock.status);
            const productionCapacity = Math.min(100, (material.unitsProducible / 100) * 100);
            
            return (
              <Card 
                key={material.code} 
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
                        <InventoryIcon fontSize="small" sx={{ color: 'white' }} />
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {material.code}
                      </Typography>
                    </Box>
                    <Chip 
                      icon={statusStyle.icon}
                      label={statusStyle.text} 
                      size="small"
                      sx={{ 
                        bgcolor: statusStyle.bg, 
                        color: statusStyle.color,
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: statusStyle.color
                        }
                      }} 
                    />
                  </Box>
                </Box>
                
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Stock Actual
                        </Typography>
                        <Typography variant="body1" fontWeight="medium" sx={{ mt: 0.5 }}>
                          {material.stock.amount} {material.stock.unit}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Requerido por Unidad
                        </Typography>
                        <Typography variant="body1" fontWeight="medium" sx={{ mt: 0.5 }}>
                          {material.required.amount} {material.required.unit}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Capacidad de Producción
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={productionCapacity} 
                              sx={{ 
                                width: '100%', 
                                height: 8, 
                                borderRadius: 1,
                                bgcolor: theme.palette.grey[200],
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: statusStyle.color
                                }
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Stock para aproximadamente {material.unitsProducible} unidades
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

export default MaterialStatusCard;