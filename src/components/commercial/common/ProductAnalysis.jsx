import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  alpha,
  Chip
} from "@mui/material";

// Datos de prueba
const productData = [
  {
    name: "Alfaros",
    range: [42000, 58000],
    competitors: [68000, 63000, 70000],
  },
  {
    name: "Betacos",
    range: [42000, 58000],
    competitors: [52000, 49000, 53000],
  },
  {
    name: "Gamaroles",
    range: [25000, 35000],
    competitors: [31000, 29500, 32000],
  }
];

// Función para analizar precios
const getPriceAnalysis = (range, competitors) => {
  const avgSuggested = (range[0] + range[1]) / 2;
  const avgCompetitor = competitors.reduce((a, b) => a + b, 0) / competitors.length;
  const diff = avgCompetitor - avgSuggested;
  const percent = (diff / avgSuggested) * 100;

  if (percent >= -10 && percent <= 10) {
    return {
      label: "Precio competitivo",
      description: "Los precios de la competencia están dentro del rango esperado.",
      color: "success"
    };
  } else if (percent > 10 && percent <= 20) {
    return {
      label: "Precio elevado",
      description: "La competencia vende ligeramente por encima del rango sugerido.",
      color: "warning"
    };
  } else if (percent < -10) {
    return {
      label: "Precio demasiado bajo",
      description: "La competencia tiene precios significativamente más bajos.",
      color: "warning"
    };
  } else if (percent > 20) {
    return {
      label: "Precio poco competitivo",
      description: "La competencia está en un rango mucho más alto, podrías ajustar tu estrategia.",
      color: "error"
    };
  }

  return {
    label: "Precio fuera de rango",
    description: "No se puede determinar un análisis claro.",
    color: "default"
  };
};

const ProductAnalysis = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Análisis por Producto
      </Typography>

      <Grid container spacing={2}>
        {productData.map(p => {
          const analysis = getPriceAnalysis(p.range, p.competitors);
          const avgCompetitor = p.competitors.reduce((a, b) => a + b, 0) / p.competitors.length;

          return (
            <Grid item xs={12} md={4} key={p.name}>
              <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                <Typography variant="subtitle2" fontWeight={700} color="primary.main">
                  {p.name}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Rango de Mercado
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ${p.range[0].toLocaleString()} – ${p.range[1].toLocaleString()}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Competencia (Prom: ${Math.round(avgCompetitor).toLocaleString()})
                </Typography>
                {p.competitors.map((c, idx) => (
                  <Typography key={idx} variant="body2" sx={{ ml: 1 }}>
                    Comp {String.fromCharCode(65 + idx)}: ${c.toLocaleString()}
                  </Typography>
                ))}

                <Box
                  mt={2}
                  p={1.5}
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.light, 0.06),
                    borderRadius: 1
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Análisis
                    </Typography>
                    <Chip
                      size="small"
                      label={analysis.label}
                      color={analysis.color}
                      sx={{ fontSize: "0.75rem" }}
                    />
                  </Box>
                  <Typography variant="body2">
                    {analysis.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductAnalysis;
