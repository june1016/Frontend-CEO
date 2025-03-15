// src/components/planning/initialIndicatorsTab.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function InitialIndicatorsTab() {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Indicadores Financieros Iniciales
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Esta sección está en desarrollo. Pronto podrás ver los indicadores
        financieros iniciales.
      </Typography>
    </Paper>
  );
}
