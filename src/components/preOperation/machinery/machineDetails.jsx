// src/components/preOperation/machinery/MachineDetails.jsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
import SpecificationSection from './common/specificationSection';

const MachineDetails = ({ machine }) => {
  const theme = useTheme();

  if (!machine?.Specification) return null;

  const spec = machine.Specification;

  // Datos para la sección de capacidad y tiempos
  const capacityItems = [
    { label: 'Capacidad Base', value: `${spec.base_capacity} min/mes` },
    { label: 'Tiempo Preparación', value: `${spec.setup_time} min` },
    { label: 'Tiempo Producción', value: `${spec.production_time} min/unidad` },
    { label: 'Tiempo Mantenimiento', value: `${spec.maintenance_time} horas` }
  ];

  // Datos para la sección de capacidad productiva
  const productivityItems = [
    { label: 'Producción Diaria Estándar', value: `${spec.daily_standard_output} unidades/día` },
    { label: 'Capacidad Mensual Máxima', value: `${spec.max_monthly_capacity} unidades/mes` }
  ];

  // Datos adicionales (mantenimiento próximo)
  const maintenanceItems = [
    { label: 'Próximo Mantenimiento', value: 'En 14 días' },
    { label: 'Eficiencia Actual', value: '95%' }
  ];

  return (
    <Card 
      sx={{ 
        mt: 4, 
        border: `1px solid ${theme.palette.divider}`, 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        borderRadius: 2
      }}
    >
      <CardHeader
        avatar={<BuildIcon sx={{ color: theme.palette.primary.main }} />}
        title={
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            Especificaciones Técnicas: {machine.name}
          </Typography>
        }
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <SpecificationSection 
          title="Capacidad y Tiempos" 
          items={capacityItems}
          icon={<TimerIcon />}
        />
        
        <SpecificationSection 
          title="Capacidad Productiva Estándar" 
          items={productivityItems}
          icon={<SpeedIcon />}
        />
        
        <SpecificationSection 
          title="Estado y Mantenimiento" 
          items={maintenanceItems}
          icon={<BuildIcon />}
        />
      </CardContent>
    </Card>
  );
};

export default MachineDetails;