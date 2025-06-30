// src/components/inventory/InventoryManagementTab.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoCard from '../../common/infoCard';


const InventoryManagementTab = () => {
  return (
    <Box sx={{ p: 4 }}>

      <InfoCard
        title="Estado del Inventario"
        description="Consulta el inventario actual de materias primas, productos terminados y materiales en proceso. Esta sección te permitirá realizar ajustes de stock y validar consumos de producción."
      />

      {/* Contenido futuro: dashboard de inventario, lista de materiales, etc. */}
    </Box>
  );
};

export default InventoryManagementTab;
