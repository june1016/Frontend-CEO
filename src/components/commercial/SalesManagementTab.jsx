import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoCard from '../common/infoCard';


const SalesManagementTab = () => {
  return (
    <Box sx={{ p: 4 }}>

      <InfoCard
        title="Panel de Ventas"
        description="Consulta, organiza y analiza las ventas realizadas por producto, período y canal. Aquí podrás visualizar datos clave de ingresos, detectar tendencias y ajustar tus objetivos comerciales."
      />

      {/* Aquí luego puedes agregar una tabla dinámica o gráfica de ventas */}
    </Box>
  );
};

export default SalesManagementTab;
