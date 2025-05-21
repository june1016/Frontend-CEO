// src/components/preOperation/machinery/common/MachineCard.jsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const MachineCard = ({ machine, isSelected, onClick }) => {
  const theme = useTheme();
  
  return (
    <Card
      variant="outlined"
      onClick={() => onClick(machine)}
      sx={{
        cursor: "pointer",
        borderColor: isSelected ? theme.palette.primary.main : '#e0e0e0',
        boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 1px 4px rgba(0, 0, 0, 0.05)',
        transition: "all 0.3s ease",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        "&:hover": {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
          borderColor: theme.palette.primary.light,
          transform: 'translateY(-2px)'
        },
      }}
    >
      <CardHeader
        avatar={
          <PrecisionManufacturingIcon
            sx={{
              color: isSelected
                ? "#ffffff"
                : theme.palette.grey[400],
            }}
          />
        }
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {machine.name}
          </Typography>
        }
        subheader={
          machine.status
            ? `Estado: ${machine.status}`
            : "Máquina operativa"
        }
        sx={{
          backgroundColor: isSelected
            ? theme.palette.primary.main
            : '#f5f5f5',
          color: isSelected
            ? "#ffffff"
            : "text.primary",
        }}
        subheaderTypographyProps={{
          color: isSelected
            ? "#ffffff"
            : "text.secondary",
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {machine.Product && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Producto Asociado
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color={isSelected ? theme.palette.primary.dark : theme.palette.primary.main}
            >
              {machine.Product.name}
            </Typography>
          </Box>
        )}
        
        {machine.Specification && (
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Capacidad Mensual
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={500}
            >
              {machine.Specification.max_monthly_capacity} unidades/mes
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MachineCard;