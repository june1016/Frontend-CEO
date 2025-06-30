// src/components/production/productionControlTab.jsx
import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import InfoCard from '../common/infoCard';
import ProductSelector from './productionControl/productSelector';
import OperativeSummaryCard from './productionControl/operativeSummaryCard';
import MachineStatusCard from './productionControl/machineStatusCard';
import MaterialStatusCard from './productionControl/materialStatusCard';
import DecadeComparisonSection from './productionControl/decadeComparisonSection';
import { useProductionControl } from '../../hooks/production/useProductionControl';

const ProductionControlTab = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedProduct,
    setSelectedProduct,
    productData,
    decadeAnalysis,
    totals,
    chartData,
    materialsAnalysis,
    machinesAnalysis
  } = useProductionControl();

  // Función para formatear nombre de producto
  const formatProductName = (productId) => {
    const names = {
      alfaros: 'Alfaros',
      betacos: 'Betacos',
      gamaroles: 'Gamaroles'
    };
    return names[productId] || productId;
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Encabezado */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Control de Producción
        </Typography>
        <Tooltip title="Monitorea el desempeño de la producción, identifica desviaciones y detecta áreas que requieran ajustes.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Tarjeta de información */}
      <InfoCard
        title="Monitoreo de Producción"
        description="Esta sección es exclusivamente de monitoreo. Aquí podrás revisar el desempeño productivo, detectar desviaciones del presupuesto, verificar el estado de las máquinas y comprobar el stock de materiales. Cualquier ajuste necesario deberá realizarse en las secciones correspondientes de Maquinaria, Personal o Presupuestos."
      />

      {/* Selector de Producto */}
      <ProductSelector
        selectedProduct={selectedProduct}
        onProductChange={setSelectedProduct}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      {/* Resumen Operativo */}
      <OperativeSummaryCard 
        productData={productData} 
        productName={formatProductName(selectedProduct)} 
      />

      {/* Estado de Máquinas */}
      <MachineStatusCard machines={machinesAnalysis} />

      {/* Estado de Materiales */}
      <MaterialStatusCard materialsAnalysis={materialsAnalysis} />

      {/* Control por Décadas */}
      <DecadeComparisonSection
        decadeAnalysis={decadeAnalysis}
        totals={totals}
        chartData={chartData}
      />
    </Box>
  );
};

export default ProductionControlTab;