// src/components/preOperation/suppliers/common/ComparisonTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { formatCurrency } from "../../../../utils/formatters/currencyFormatters";

const ComparisonTable = ({ suppliers, materials, compareBy, hasProductionManager }) => {

  // Función para encontrar el mejor valor según el criterio de comparación
  const findBestValue = (materialId, criterion) => {
    let bestValue = null;
    let bestSupplierId = null;

    suppliers.forEach(supplier => {
      const materialData = supplier.materials.find(m => m.materialId === materialId);
      if (!materialData) return;

      let value;
      switch (criterion) {
        case 'price':
          value = materialData.price;
          if (bestValue === null || value < bestValue) {
            bestValue = value;
            bestSupplierId = supplier.id;
          }
          break;
        case 'delivery':
          value = supplier.deliveryTime;
          if (bestValue === null || value < bestValue) {
            bestValue = value;
            bestSupplierId = supplier.id;
          }
          break;
        case 'discount':
          value = supplier.volumeDiscount;
          if (bestValue === null || value > bestValue) {
            bestValue = value;
            bestSupplierId = supplier.id;
          }
          break;
        case 'payment':
          // Para pago consideramos mejor al que tiene más opciones
          value = supplier.paymentOptions.length;
          if (bestValue === null || value > bestValue) {
            bestValue = value;
            bestSupplierId = supplier.id;
          }
          break;
        default:
          break;
      }
    });

    return bestSupplierId;
  };

  // Renderizar el valor apropiado según el criterio de comparación
  const renderValue = (supplier, material, criterion) => {
      const materialData = supplier.materials.find(m => m.id === material.id);
    if (!materialData) return "-";

    switch (criterion) {
      case 'price':
        return formatCurrency(materialData.price);
      case 'delivery':
        return `${supplier.deliveryTime} días`;
      case 'discount':
        return `${supplier.volumeDiscount}%`;
      case 'payment':
        return supplier.paymentOptions.join(", ");
      default:
        return "-";
    }
  };

  // Determinar si este es el mejor valor para el criterio actual
  const isBestValue = (supplierId, materialId, criterion) => {
    return hasProductionManager && supplierId === findBestValue(materialId, criterion);
  };

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.100" }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Material</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Unidad</TableCell>
            {suppliers.map((supplier) => (
              <TableCell key={supplier.id} align="center" sx={{ fontWeight: 'bold' }}>
                {supplier.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id} hover>
              <TableCell component="th" scope="row">
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {material.code} - {material.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {material.description}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{material.unit}</TableCell>
              {suppliers.map((supplier) => {
                const bestValue = isBestValue(supplier.id, material.id, compareBy);

                return (
                  <TableCell key={supplier.id} align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Typography 
                        variant="body2" 
                        fontWeight={bestValue ? "bold" : "normal"}
                        color={bestValue ? "primary.main" : "text.primary"}
                      >
                        {renderValue(supplier, material, compareBy)}
                      </Typography>
                      {bestValue && (
                        <Chip 
                          label="Mejor opción" 
                          size="small" 
                          color="success" 
                          sx={{ height: 20, fontSize: '0.7rem' }} 
                        />
                      )}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ComparisonTable;