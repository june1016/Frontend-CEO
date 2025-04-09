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
  Chip,
} from "@mui/material";
import {
  Inventory as PackageIcon,
  Save as SaveIcon,
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

/**
 * Componente para mostrar el formulario de entrada de datos de productos
 * @param {Object} props Propiedades del componente
 * @param {Array} props.products Lista de productos
 * @param {number} props.selectedMonth Mes seleccionado
 * @param {Function} props.handleProductChange Función para manejar cambios en productos
 * @param {Function} props.getCalculatedValue Función para obtener el valor calculado de un producto
 * @param {Object} props.decadeDistribution Distribución por décadas
 * @param {Array} props.growthRates Tasas de crecimiento
 * @param {Object} props.theme Tema de Material UI
 * @param {Function} props.onSave Función para guardar los datos
 * @param {boolean} props.readOnly Indica si los campos son de solo lectura
 * @param {number} props.accumulatedGrowth Crecimiento acumulado para el mes seleccionado
 * @param {boolean} props.showSaveButton Mostrar el botón de guardar
 * @returns {JSX.Element} Componente renderizado
 */
const ProductInputForm = ({
  products,
  selectedMonth,
  handleProductChange,
  getCalculatedValue,
  decadeDistribution,
  growthRates,
  theme,
  onSave,
  title = "Datos del Mes",
  inputLabel = "Unidades Totales",
  icon = PackageIcon,
  readOnly = false,
  accumulatedGrowth = 0,
  showSaveButton = true,
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
            {title}
          </Typography>
        }
        action={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {readOnly && (
              <Chip
                icon={<TrendingUpIcon />}
                label={`Crecimiento: +${accumulatedGrowth}%`}
                color="primary"
                variant="outlined"
                sx={{
                  borderColor: "rgba(28, 67, 132, 0.2)",
                  bgcolor: "#EBF5FF",
                }}
              />
            )}
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
              D1: {decadeDistribution[selectedMonth - 1].d1}% | D2:{" "}
              {decadeDistribution[selectedMonth - 1].d2}% | D3:{" "}
              {decadeDistribution[selectedMonth - 1].d3}%
            </Box>
          </Box>
        }
        sx={{
          bgcolor: readOnly ? "#F8FAFC" : "#EBF5FF",
          py: 1.5,
          px: 2,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {products.map((product) => {
            // Obtener el valor a mostrar (ingresado o calculado)
            const value = getCalculatedValue(selectedMonth, product.id);

            return (
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
                    value={value}
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
                      readOnly: readOnly,
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
                      sx: {
                        bgcolor: readOnly ? "#F8FAFC" : "white",
                      },
                    }}
                  />
                  {readOnly && (
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ mt: 0.5, fontSize: "0.7rem" }}
                    >
                      Calculado automáticamente
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {showSaveButton && (
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
        )}
      </CardContent>
    </Card>
  );
};

export default ProductInputForm;
