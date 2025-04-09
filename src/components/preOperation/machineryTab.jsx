import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

export default function MachineryTab() {
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
        <PrecisionManufacturingIcon
          sx={{ fontSize: 60, color: "primary.main", opacity: 0.7, mb: 2 }}
        />
        <Typography variant="h5" fontWeight={600} color="primary.main" mb={2}>
          Gestión de Maquinaria
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="600px">
          Administra tu maquinaria, programa mantenimientos, monitorea el
          rendimiento y planifica adquisiciones para optimizar tu producción.
        </Typography>
      </Box>
    </Paper>
  );
}
