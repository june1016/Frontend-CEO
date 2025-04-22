// src/components/preOperation/suppliers/common/DiscountExplanation.jsx
import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

const DiscountExplanation = () => {
  return (
    <Card sx={{ p: 2, bgcolor: "#f8f9fa" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <InfoIcon sx={{ mt: 0.5, color: "#1C4384" }} />
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            ¿Cómo funciona el descuento por volumen?
          </Typography>
          <Typography variant="body2">
            El descuento por volumen se aplica automáticamente a pedidos que superan las 100 unidades 
            de un mismo material. El porcentaje de descuento varía según el proveedor y se calcula 
            sobre el precio total de la compra.
          </Typography>
          <Box sx={{ mt: 1, p: 1, bgcolor: "#e9ecef", borderRadius: 1 }}>
            <Typography variant="caption">
              <strong>Ejemplo:</strong> Con un descuento del 5% en un pedido de 200 unidades a 5,000 COP cada una:
              <br />
              • Precio normal: 200 × 5,000 = 1,000,000 COP
              <br />
              • Con descuento: 1,000,000 × 0.95 = 950,000 COP
              <br />
              • Ahorro: 50,000 COP
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default DiscountExplanation;