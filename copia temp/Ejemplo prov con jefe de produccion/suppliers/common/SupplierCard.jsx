// src/components/preOperation/suppliers/common/SupplierCard.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  Discount as DiscountIcon,
  Payments as PaymentsIcon,
} from "@mui/icons-material";

const SupplierCard = ({ supplier, hasProductionManager }) => {
  // Función para obtener el color de avatar basado en el nombre del proveedor
  const getAvatarColor = (name) => {
    const colors = {
      "Surtidor": "#4361EE",
      "Top Almacén": "#3A0CA3",
      "Padilla": "#F72585",
      "Industry": "#4CC9F0"
    };
    return colors[name] || "#1C4384";
  };

  // Función para obtener la primera letra del nombre
  const getInitial = (name) => name.charAt(0);

  return (
    <Card 
      sx={{ 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: getAvatarColor(supplier.name),
              width: 48,
              height: 48,
            }}
          >
            {getInitial(supplier.name)}
          </Avatar>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {supplier.name}
          </Typography>
        }
        subheader={supplier.location}
        sx={{
          bgcolor: "rgba(28, 67, 132, 0.05)",
          "& .MuiCardHeader-subheader": {
            color: "text.secondary",
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {supplier.description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" fontWeight="bold" mb={1}>
          Condiciones Generales
        </Typography>
        
        <Grid container spacing={2}>
          {/* Tiempo de entrega */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShippingIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2">
                Tiempo de entrega: <strong>{supplier.deliveryTime} días</strong>
                {hasProductionManager && supplier.deliveryTime <= 2 && 
                  <Chip 
                    label="Rápido" 
                    size="small" 
                    color="success" 
                    sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                  />
                }
              </Typography>
            </Box>
          </Grid>
          
          {/* Descuentos por volumen */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DiscountIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2">
                Descuento por volumen: <strong>{supplier.volumeDiscount}%</strong>
                {hasProductionManager && supplier.volumeDiscount >= 5 && 
                  <Chip 
                    label="Destacado" 
                    size="small" 
                    color="primary" 
                    sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                  />
                }
              </Typography>
            </Box>
          </Grid>
          
          {/* Opciones de pago */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PaymentsIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2">
                Opciones de pago: <strong>{supplier.paymentOptions.join(", ")}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {hasProductionManager && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" fontWeight="bold" mb={1}>
              Análisis del Jefe de Producción
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {supplier.analysis || "Este proveedor ofrece condiciones estándar de mercado."}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplierCard;