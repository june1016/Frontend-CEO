import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Divider,
  Chip,
  useTheme,
  alpha
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const SalesProductSummary = ({ products }) => {
  const theme = useTheme();

  const getCustomProgressColor = (value) => {
    if (value >= 80) return theme.palette.success.main;      // Azul comercial
    if (value >= 40) return theme.palette.warning.main;      // Amarillo impulso
    return theme.palette.error.main;                         // Rojo alerta
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <TrendingUpIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Resultado: Detalle por Producto
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {products.map((product) => {
            const progress = Math.round((product.soldD1 / product.monthlyGoal) * 100);
            const progressColor = getCustomProgressColor(progress);
            const priceFactorColor = product.priceFactor < 0
              ? theme.palette.error.dark
              : theme.palette.success.dark;

            return (
              <Grid item xs={12} md={4} key={product.name}>
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.light, 0.03),
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <InventoryIcon color="action" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {product.name}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Precio:{" "}
                      <strong>${product.unitPrice.toLocaleString()}/unidad</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Meta Mensual: <strong>{product.monthlyGoal} und</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ventas D1: <strong>{product.soldD1} und</strong>
                    </Typography>

                    <Box mt={1} mb={1}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 8,
                          borderRadius: 1,
                          backgroundColor: alpha(theme.palette.grey[300], 0.3),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: progressColor,
                          }
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {progress}% meta D1
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                      Stock actual: <strong>{product.stock} und</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Cobertura: <strong>{product.coverage}%</strong>
                    </Typography>

                    <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                      <Chip
                        label={`Probabilidad Base: ${product.baseProbability}%`}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                          color: theme.palette.secondary.main,
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label={`Factor precio: ${product.priceFactor}%`}
                        size="small"
                        sx={{
                          backgroundColor: alpha(priceFactorColor, 0.15),
                          color: priceFactorColor,
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SalesProductSummary;
