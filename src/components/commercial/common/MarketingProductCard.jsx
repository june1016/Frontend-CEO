import React from "react";
import {
  Box,
  Typography,
  Slider,
  Paper,
  Button,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";

const MarketingProductCard = ({ product, baseSuggested, onChange, onSave }) => {
  const theme = useTheme();

  const calcCost = (percent) =>
    Math.round((baseSuggested.cost / baseSuggested.percent) * percent);

  const calcImpact = (percent) =>
    percent
      ? `Hasta ${percent}% de incremento en ventas`
      : "0% de incremento en ventas";

  const impactColor =
    product.investmentPercent > 0
      ? theme.palette.success.main
      : theme.palette.warning.main;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        backgroundColor: alpha(theme.palette.primary.light, 0.04),
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
      }}
    >
      <Box>
        {/* Título */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {product.name}
        </Typography>

        {/* Estado actual */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Inversión actual:{" "}
          <strong>{product.investmentPercent}%</strong> de incremento potencial
        </Typography>

        {/* Slider */}
        <Box mt={3} mb={2}>
          <Typography variant="body2" fontWeight={500} gutterBottom>
            Incremento Deseado (%)
          </Typography>
          <Slider
            value={product.investmentPercent}
            onChange={(_, v) => onChange(v)}
            step={1}
            min={0}
            max={baseSuggested.percent * 2}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Detalles de inversión */}
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Base sugerida ({baseSuggested.percent}%)</strong>: $
            {baseSuggested.cost.toLocaleString()}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Costo Total:</strong>{" "}
            ${calcCost(product.investmentPercent).toLocaleString()}
          </Typography>
        </Box>

        {/* Impacto Potencial destacado */}
        <Box mt={3} mb={2}>
          <Chip
            label={calcImpact(product.investmentPercent)}
            sx={{
              fontWeight: 600,
              backgroundColor: impactColor,
              color: "#fff",
              px: 2,
              py: 1,
              fontSize: "0.85rem",
            }}
          />
        </Box>
      </Box>

      {/* Botón */}
      <Box mt={4}>
        <Button
          variant="contained"
          fullWidth
          onClick={onSave}
          sx={{
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primary.dark },
            textTransform: "none",
            fontWeight: 600,
            py: 1.2,
            borderRadius: 1.5,
          }}
        >
          Guardar Cambios
        </Button>
      </Box>
    </Paper>
  );
};

export default MarketingProductCard;
