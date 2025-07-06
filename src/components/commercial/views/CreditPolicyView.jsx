import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Slider,
  Button,
  useTheme,
  alpha,
} from "@mui/material";

const initialProducts = [
  {
    name: "Alfaros",
    basePrice: 50000,
    credit30: 10,
    credit60: 18,
  },
  {
    name: "Betacos",
    basePrice: 43000,
    credit30: 8,
    credit60: 15,
  },
  {
    name: "Gamaroles",
    basePrice: 37000,
    credit30: 12,
    credit60: 20,
  },
];

const getCreditPrice = (base, percentage) =>
  Math.round(base + (base * percentage) / 100);

const CreditPolicyView = () => {
  const theme = useTheme();
  const [products, setProducts] = useState(initialProducts);

  const handleSliderChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleSave = (product) => {
    console.log("Guardando crédito para:", product.name);
    console.log("Datos:", product);
  };

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

  return (
    <Grid container spacing={2}>
      {products.map((product, index) => {
        const price30 = getCreditPrice(product.basePrice, product.credit30);
        const price60 = getCreditPrice(product.basePrice, product.credit60);

        return (
          <Grid item xs={12} md={4} key={product.name}>
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Precio base: ${product.basePrice.toLocaleString()}
                </Typography>

                {/* Crédito a 30 días */}
                <Box mt={2}>
                  <Typography variant="body2" fontWeight={500}>
                    Crédito a 30 días:
                  </Typography>
                  <Slider
                    value={product.credit30}
                    onChange={(_, value) =>
                      handleSliderChange(index, "credit30", value)
                    }
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

                {/* Crédito a 60 días */}
                <Box mt={3}>
                  <Typography variant="body2" fontWeight={500}>
                    Crédito a 60 días:
                  </Typography>
                  <Slider
                    value={product.credit60}
                    onChange={(_, value) =>
                      handleSliderChange(index, "credit60", value)
                    }
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

              {/* Botón Guardar */}
              <Box mt={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSave(product)}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                    textTransform: "none",
                  }}
                >
                  Guardar Cambios
                </Button>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CreditPolicyView;
