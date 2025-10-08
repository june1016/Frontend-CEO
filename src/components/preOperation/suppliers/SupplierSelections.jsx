// src/components/preOperation/suppliers/SupplierSelections.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Skeleton,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";
import { Save as SaveIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import SelectionCard from "./common/SelectionCard";
import { updateProgress } from "../../../utils/shared/operationTime";


const SupplierSelections = ({ 
  suppliers, 
  materials, 
  selections, 
  updateSelection, 
  saveSelections,
  readonly,
  hasProductionManager,
  loading 
}) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSave = async () => {
    try {
      await saveSelections();
      updateProgress(3); 
      setSuccessMessage("Selecciones guardadas correctamente");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error al guardar selecciones:", error);
    }
  };

  // Verificar si todos los materiales tienen un proveedor asignado
  const allMaterialsSelected = materials?.every(material => 
    selections?.some(selection => selection.materialId === material.id)
  );

  if (loading) {
    return <Box sx={{ p: 2 }}><Skeleton variant="rectangular" height={400} /></Box>;
  }

  if (!suppliers || suppliers.length === 0 || !materials || materials.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No hay datos disponibles para realizar selecciones.
      </Typography>
    );
  }

  return (
    <Box>
      {successMessage && (
        <Alert 
          severity="success" 
          icon={<CheckCircleIcon />}
          sx={{ mb: 3 }}
        >
          <AlertTitle>Éxito</AlertTitle>
          {successMessage}
        </Alert>
      )}

      {readonly && (
        <Alert 
          severity="info" 
          sx={{ mb: 3 }}
        >
          <AlertTitle>Modo Solo Lectura</AlertTitle>
          En este momento solo puede visualizar sus selecciones. Los cambios solo están permitidos en la primera década de cada mes.
        </Alert>
      )}

      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Mis Selecciones de Proveedores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Asigne un proveedor a cada material. {!readonly && "Considere precio, tiempo de entrega y condiciones de pago."}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={readonly || !allMaterialsSelected}
            sx={{ mt: { xs: 2, md: 0 } }}
          >
            Guardar Selecciones
          </Button>
        </Grid>
      </Grid>

      {!allMaterialsSelected && !readonly && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
        >
          <AlertTitle>Selección Incompleta</AlertTitle>
          Debe seleccionar un proveedor para cada material antes de guardar.
        </Alert>
      )}

      <Grid container spacing={3}>
        {materials.map((material) => (
          <Grid item xs={12} md={6} key={material.id}>
            <SelectionCard 
              material={material}
              suppliers={suppliers}
              selection={selections?.find(s => s.materialId === material.id)}
              updateSelection={updateSelection}
              readonly={readonly}
              hasProductionManager={hasProductionManager}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SupplierSelections;