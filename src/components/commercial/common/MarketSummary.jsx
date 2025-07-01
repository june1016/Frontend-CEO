import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  alpha
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Datos de entrada dinámicos
const summaryItems = [
  {
    label: "Tamaño de Mercado",
    value: "$120.5 M",
    variation: "+5.2%",
    comment: "último mes"
  },
  {
    label: "Competidores Activos",
    value: "8",
    variation: "0",
    comment: "3 principales"
  },
  {
    label: "Tendencia de Precios",
    value: "Estable",
    variation: "±2%",
    comment: "variación"
  }
];

// Detectar variación visual
const renderVariation = (variation, theme) => {
  if (!variation || variation === "0") {
    return (
      <Typography variant="body2" color="text.secondary">
        Sin cambio
      </Typography>
    );
  }

  const numeric = parseFloat(variation.replace("%", "").replace("±", ""));
  const isPositive = variation.includes("+") || variation.includes("▲");
  const isNegative = variation.includes("-") || variation.includes("▼");

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      {isPositive && (
        <ArrowDropUpIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
      )}
      {isNegative && (
        <ArrowDropDownIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
      )}
      <Typography
        variant="body2"
        color={
          isPositive
            ? "success.main"
            : isNegative
            ? "error.main"
            : "text.secondary"
        }
        fontWeight={500}
      >
        {variation}
      </Typography>
    </Box>
  );
};

const MarketSummary = () => {
  const theme = useTheme();

  return (
    <Box mt={3}>
      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
        Resumen del Mercado
      </Typography>

      <Grid container spacing={2}>
        {summaryItems.map(({ label, value, variation, comment }, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                height: "100%",
                backgroundColor: alpha(theme.palette.primary.light, 0.04)
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                {label}
              </Typography>

              <Typography variant="h6" fontWeight={700} gutterBottom>
                {value}
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                {renderVariation(variation, theme)}
                <Typography variant="caption" color="text.secondary">
                  {comment}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketSummary;
