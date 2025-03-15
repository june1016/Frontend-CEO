// src/components/planning/targetIndicatorsTab.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function TargetIndicatorsTab() {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Indicadores Objetivo
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Esta sección está en desarrollo. Pronto podrás establecer tus
        indicadores objetivo.
      </Typography>
    </Paper>
  );
}
