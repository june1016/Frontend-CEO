// src/components/preOperation/suppliers/SupplierComparison.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Skeleton,
} from "@mui/material";
import ComparisonTable from "./common/ComparisonTable";

const SupplierComparison = ({ suppliers, materials, hasProductionManager, loading }) => {
  const [compareBy, setCompareBy] = useState("price");

  const handleChange = (event) => {
    setCompareBy(event.target.value);
  };

  if (loading) {
    return <Box sx={{ p: 2 }}><Skeleton variant="rectangular" height={400} /></Box>;
  }

  if (!suppliers || suppliers.length === 0 || !materials || materials.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No hay datos disponibles para comparar.
      </Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Comparativa de Materiales por Proveedor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Compare precios y condiciones de cada material entre los diferentes proveedores.
            {hasProductionManager && " El Jefe de Producción ha resaltado las mejores opciones para cada material."}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="compare-by-label">Comparar por</InputLabel>
            <Select
              labelId="compare-by-label"
              id="compare-by"
              value={compareBy}
              label="Comparar por"
              onChange={handleChange}
            >
              <MenuItem value="price">Precio</MenuItem>
              <MenuItem value="delivery">Tiempo de entrega</MenuItem>
              <MenuItem value="discount">Descuento por volumen</MenuItem>
              <MenuItem value="payment">Condiciones de pago</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Card sx={{ boxShadow: 1 }}>
        <CardContent sx={{ p: 0 }}>
          <ComparisonTable 
            suppliers={suppliers} 
            materials={materials} 
            compareBy={compareBy}
            hasProductionManager={hasProductionManager}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SupplierComparison;