// src/components/preOperation/suppliers/common/SelectionCard.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  Payments as PaymentsIcon,
  Discount as DiscountIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import { formatCurrency } from "../../../../utils/shared/formatters/currencyFormatters";

const SelectionCard = ({
  material,
  suppliers,
  selection,
  updateSelection,
  readonly,
  hasProductionManager
}) => {

  const [materialData, setMaterialData] = useState(null);

  const selectedSupplier = suppliers.find(s => s.id === selection?.supplierId);

  useEffect(() => {
    if (selectedSupplier) {
      const updatedMaterialData = selectedSupplier.materials.find(m => m.id === material.id);
      setMaterialData(updatedMaterialData);
    }
  }, [selectedSupplier, material.id]); 


  const handleSupplierChange = (event) => {
    const supplierId = event.target.value;

    const updatedSupplier = suppliers.find(s => s.id === supplierId);
    const updatedMaterialData = updatedSupplier?.materials.find(m => m.id === material.id);

    updateSelection(material.id, supplierId, selection?.paymentOption || "contado", updatedMaterialData?.price);
  };

  const handlePaymentChange = (event) => {
    const paymentOption = event.target.value;
    updateSelection(material.id, selection?.supplierId, paymentOption, materialData?.price);
  };

  const getBestPriceSupplier = () => {
    if (!hasProductionManager) return null;

    let bestPrice = Infinity;
    let bestSupplierId = null;

    suppliers.forEach(supplier => {
      const supplierMaterial = supplier.materials.find(m => m.materialId === material.id);
      if (supplierMaterial && supplierMaterial.price < bestPrice) {
        bestPrice = supplierMaterial.price;
        bestSupplierId = supplier.id;
      }
    });

    return bestSupplierId;
  };

  const bestPriceSupplier = getBestPriceSupplier();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: !selection ? "1px dashed #FFC107" : "1px solid #E5E7EB",
        boxShadow: 1
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {material.name}
            </Typography>
            <Chip
              label={material.code}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ ml: 1 }}
            />
          </Box>
        }
        subheader={`${material.description} (${material.unit})`}
        sx={{
          bgcolor: "rgba(28, 67, 132, 0.05)",
          "& .MuiCardHeader-subheader": {
            color: "text.secondary",
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth disabled={readonly}>
              <InputLabel id={`supplier-select-label-${material.id}`}>Proveedor</InputLabel>
              <Select
                labelId={`supplier-select-label-${material.id}`}
                id={`supplier-select-${material.id}`}
                value={selection?.supplierId || ""}
                label="Proveedor"
                onChange={handleSupplierChange}
                size="small"
              >
                {suppliers.map((supplier) => {
                  // Obtener datos del material para este proveedor
                  const supplierMaterial = supplier.materials.find(m => m.materialId === material.id);
                  const isBestPrice = hasProductionManager && supplier.id === bestPriceSupplier;

                  return (
                    <MenuItem key={supplier.id} value={supplier.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography>{supplier.name}</Typography>
                        {supplierMaterial && (
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(supplierMaterial.price)}
                            {isBestPrice && (
                              <Chip
                                label="Mejor precio"
                                size="small"
                                color="success"
                                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                              />
                            )}
                          </Typography>
                        )}
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          {selection?.supplierId && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Opciones de pago
                </Typography>
                <FormControl component="fieldset" disabled={readonly}>
                  <RadioGroup
                    row
                    name={`payment-option-${material.id}`}
                    value={selection?.paymentOption || "contado"}
                    onChange={handlePaymentChange}
                  >
                    {selectedSupplier?.paymentOptions.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio size="small" />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>

              {materialData && (
                <>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Detalles de la selección
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <InfoIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="body2">
                          Precio unitario: <strong>{formatCurrency(materialData.price)}</strong>
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ShippingIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="body2">
                          Tiempo de entrega: <strong>{selectedSupplier.deliveryTime} días</strong>
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DiscountIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="body2">
                          Descuento por volumen: <strong>{selectedSupplier.volumeDiscount}%</strong>
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PaymentsIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="body2">
                          Método de pago: <strong>{selection.paymentOption}</strong>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SelectionCard;