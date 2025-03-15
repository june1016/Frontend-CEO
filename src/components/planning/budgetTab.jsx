// src/components/planning/budgetTab.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function BudgetTab() {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Presupuestos
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Esta sección está en desarrollo. Pronto podrás gestionar tus
        presupuestos.
      </Typography>
    </Paper>
  );
}
