import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function SuppliersTab() {
  return (
    <Paper elevation={0} sx={{ p: 4, border: "1px solid #E5E7EB" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 6,
        }}
      >
        <StorefrontIcon
          sx={{ fontSize: 60, color: "primary.main", opacity: 0.7, mb: 2 }}
        />
        <Typography variant="h5" fontWeight={600} color="primary.main" mb={2}>
          Gestión de Proveedores
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="600px">
          En esta sección podrás administrar tus proveedores de materias primas,
          comparar precios y condiciones, y establecer relaciones comerciales
          estratégicas.
        </Typography>
      </Box>
    </Paper>
  );
}
