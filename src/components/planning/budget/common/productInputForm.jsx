import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
import {
  Inventory as PackageIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

/**
 * Componente para mostrar el formulario de entrada de datos de productos
 * @param {Object} props Propiedades del componente
 * @param {Array} props.products Lista de productos
 * @param {number} props.selectedMonth Mes seleccionado
 * @param {Function} props.handleProductChange Función para manejar cambios en productos
 * @param {Object} props.monthlyData Datos mensuales
 * @param {Object} props.decadeDistribution Distribución por décadas
 * @param {Array} props.growthRates Tasas de crecimiento
 * @param {Object} props.theme Tema de Material UI
 * @param {Function} props.onSave Función para guardar los datos
 * @returns {JSX.Element} Componente renderizado
 */
const ProductInputForm = ({
  products,
  selectedMonth,
  handleProductChange,
  monthlyData,
  decadeDistribution,
  growthRates,
  theme,
  onSave,
  title = "Datos del Mes",
  inputLabel = "Unidades Totales",
  icon = PackageIcon,
}) => {
  const Icon = icon;

  return (
    <Card sx={{ boxShadow: 1, border: "1px solid #E5E7EB" }}>
      <CardHeader
        title={
          <Typography
            variant="h6"
            fontWeight="bold"
            color={theme.palette.primary.dark}
          >
            {title} {selectedMonth}
          </Typography>
        }
        action={
          <Box
            sx={{
              bgcolor: "white",
              px: 1.5,
              py: 0.75,
              borderRadius: 10,
              fontSize: "0.875rem",
              border: "1px solid rgba(28, 67, 132, 0.2)",
              color: theme.palette.primary.main,
            }}
          >
            Crecimiento: {growthRates[selectedMonth - 1]}% | D1:{" "}
            {decadeDistribution[selectedMonth - 1].d1}% | D2:{" "}
            {decadeDistribution[selectedMonth - 1].d2}% | D3:{" "}
            {decadeDistribution[selectedMonth - 1].d3}%
          </Box>
        }
        sx={{
          bgcolor: "#EBF5FF",
          py: 1.5,
          px: 2,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} md={4} key={product.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  {product.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {inputLabel}
                </Typography>
                <TextField
                  type="number"
                  value={
                    monthlyData[selectedMonth]?.[product.id] ||
                    product.defaultValue
                  }
                  onChange={(e) =>
                    handleProductChange(
                      selectedMonth,
                      product.id,
                      e.target.value
                    )
                  }
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon
                          sx={{
                            fontSize: 18,
                            color: "text.secondary",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={onSave}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Guardar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductInputForm;
