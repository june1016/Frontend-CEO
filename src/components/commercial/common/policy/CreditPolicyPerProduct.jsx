import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Slider,
  useTheme,
  alpha,
  Button
} from "@mui/material";

const CreditPolicyPerProduct = ({
  product,
  index,
  onSliderChange,
  onSave,
}) => {
  const theme = useTheme();

  const getCreditPrice = (base, percentage) =>
    Math.round(base + (base * percentage) / 100);

  const renderVariation = (percentage) => {
    const color =
      percentage <= 10
        ? theme.palette.success.main
        : percentage <= 20
        ? theme.palette.warning.main
        : theme.palette.error.main;

    return (
      <Typography variant="body2" fontWeight={500} sx={{ color, mt: 0.5 }}>
        +{percentage}% interés
      </Typography>
    );
  };

  const price30 = getCreditPrice(product.unit_cost, product.credit30);
  const price60 = getCreditPrice(product.unit_cost, product.credit60);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: "100%",
        backgroundColor: alpha(theme.palette.primary.light, 0.04),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Precio base: ${product.unit_cost.toLocaleString()}
        </Typography>

        {/* Crédito 30 */}
        <Box mt={2}>
          <Typography variant="body2" fontWeight={500}>
            Crédito a 30 días:
          </Typography>
          <Slider
            value={product.credit30}
            onChange={(_, value) => onSliderChange(index, "credit30", value)}
            step={1}
            min={0}
            max={30}
            valueLabelDisplay="auto"
          />
          <Typography variant="body2">
            Precio con interés:{" "}
            <strong style={{ color: theme.palette.primary.main }}>
              ${price30.toLocaleString()}
            </strong>
          </Typography>
          {renderVariation(product.credit30)}
        </Box>

        {/* Crédito 60 */}
        <Box mt={3}>
          <Typography variant="body2" fontWeight={500}>
            Crédito a 60 días:
          </Typography>
          <Slider
            value={product.credit60}
            onChange={(_, value) => onSliderChange(index, "credit60", value)}
            step={1}
            min={0}
            max={30}
            valueLabelDisplay="auto"
          />
          <Typography variant="body2">
            Precio con interés:{" "}
            <strong style={{ color: theme.palette.primary.main }}>
              ${price60.toLocaleString()}
            </strong>
          </Typography>
          {renderVariation(product.credit60)}
        </Box>
      </Box>

      {/* Guardar */}
      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onSave(product)}
          sx={{
            bgcolor: theme.palette.primary.main,
            "&:hover": { bgcolor: theme.palette.primary.dark },
            textTransform: "none",
          }}
        >
          Guardar Cambios
        </Button>
      </Box>
    </Paper>
  );
};

export default CreditPolicyPerProduct;
