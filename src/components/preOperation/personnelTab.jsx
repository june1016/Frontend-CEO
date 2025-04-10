import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export default function PersonnelTab() {
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
        <PeopleAltIcon
          sx={{ fontSize: 60, color: "primary.main", opacity: 0.7, mb: 2 }}
        />
        <Typography variant="h5" fontWeight={600} color="primary.main" mb={2}>
          Nómina & Personal
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="600px">
          Gestiona tu personal, define estructura organizacional, asigna roles,
          administra turnos y controla los costos asociados a la nómina.
        </Typography>
      </Box>
    </Paper>
  );
}
