// src/components/planning/balanceSheetTab.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function BalanceSheetTab() {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Balance General
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Esta sección está en desarrollo. Pronto estará disponible el balance
        general inicial.
      </Typography>
    </Paper>
  );
}
