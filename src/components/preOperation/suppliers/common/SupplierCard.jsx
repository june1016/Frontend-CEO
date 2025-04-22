// src/components/preOperation/suppliers/common/SupplierCard.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  Discount as DiscountIcon,
  Payments as PaymentsIcon,
} from "@mui/icons-material";

// Importar los logos de los proveedores
import ElSurtidorLogo from "../../../../assets/images/El surtidor.png";
import TopAlmacenLogo from "../../../../assets/images/Top almacen.png";
import PadillaLogo from "../../../../assets/images/Padilla.png";
import CostaMaterLogo from "../../../../assets/images/CostaMater.png";

const SupplierCard = ({ supplier, hasProductionManager }) => {
  // Función para obtener el logo del proveedor
  const getProviderLogo = (providerName) => {
    switch(providerName) {
      case "Surtidor": return ElSurtidorLogo;
      case "Top Almacén": return TopAlmacenLogo;
      case "Padilla": return PadillaLogo;
      case "CostaMater": return CostaMaterLogo;
      default: return null;
    }
  };

  const logoSrc = getProviderLogo(supplier.name);

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
          logoSrc ? 
            <Avatar 
              src={logoSrc} 
              variant="rounded"
              sx={{ 
                width: 48, 
                height: 48, 
                bgcolor: 'white',
                '& img': { objectFit: 'contain' }
              }} 
            /> : 
            <Avatar sx={{ bgcolor: "#4361EE", width: 48, height: 48 }}>
              {supplier.name.charAt(0)}
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
              </Typography>
            </Box>
          </Grid>
          
          {/* Descuentos por volumen */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DiscountIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Typography variant="body2">
                Descuento por volumen: <strong>{supplier.volumeDiscount}%</strong>
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