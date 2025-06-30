import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoCard from '../../common/infoCard';

const PurchaseManagementTab = () => {
  return (
    <Box sx={{ p: 4 }}>

      <InfoCard
        title="Panel de Compras"
        description="Aquí podrás visualizar, planificar y registrar compras necesarias de materiales e insumos. Posteriormente podrás vincular proveedores, condiciones comerciales y políticas de abastecimiento."
      />

      {/* Contenido futuro: tabla de compras, formularios, filtros, etc. */}
    </Box>
  );
};

export default PurchaseManagementTab;
