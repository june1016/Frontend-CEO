// src/components/commercial/CommercialStrategiesTab.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoCard from '../common/infoCard';

const CommercialStrategiesTab = () => {
  return (
    <Box sx={{ p: 4 }}>

      <InfoCard
        title="Planificación Comercial"
        description="Define las estrategias para posicionar tus productos, establecer precios competitivos, identificar públicos objetivo y aumentar tu participación en el mercado. Esta sección te ayudará a tomar decisiones estratégicas basadas en datos y análisis comercial."
      />

      {/* Aquí puedes agregar inputs para estrategia, segmentación, precios, promociones, etc. */}
    </Box>
  );
};

export default CommercialStrategiesTab;
