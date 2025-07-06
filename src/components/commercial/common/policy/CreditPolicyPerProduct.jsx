import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Slider,
  useTheme,
  alpha
} from "@mui/material";

const creditProducts = [
  {
    name: "Alfaros",
    basePrice: 50000,
    credit30: 10,
    credit60: 18
  },
  {
    name: "Betacos",
    basePrice: 43000,
    credit30: 8,
    credit60: 15
  },
  {
    name: "Gamaroles",
    basePrice: 37000,
    credit30: 12,
    credit60: 20
  }
];

const getCreditPrice = (base, percentage) => {
  return Math.round(base + (base * percentage) / 100);
};

const CreditPolicyPerProduct = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {creditProducts.map((product) => (
        <Grid item xs={12} md={4} key={product.name}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              backgroundColor: alpha(theme.palette.primary.light, 0.04)
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Precio base: ${product.basePrice.toLocaleString()}
            </Typography>

            <Box mt={2}>
              <Typography variant="body2" fontWeight={500}>
                Crédito a 30 días ({product.credit30}%):
              </Typography>
              <Typography variant="body2" color="primary">
                ${getCreditPrice(product.basePrice, product.credit30).toLocaleString()}
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2" fontWeight={500}>
                Crédito a 60 días ({product.credit60}%):
              </Typography>
              <Typography variant="body2" color="primary">
                ${getCreditPrice(product.basePrice, product.credit60).toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CreditPolicyPerProduct;
