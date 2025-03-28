import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Avatar,
  InputAdornment,
  useTheme,
} from "@mui/material";
import {
  Save as SaveIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  ShowChart as LineChartIcon,
  Calculate as CalculateIcon,
  Percent as PercentIcon,
  AttachMoney as DollarSignIcon,
  DonutLarge as PieChartIcon,
  Gavel as TargetIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

export default function TargetIndicatorsTab() {
  const theme = useTheme();

  // State de Margen de Utilidad sobre Costo
  const [margenUtilidad, setMargenUtilidad] = useState({
    Alfaros: "35",
    Betacos: "35",
    Gamaroles: "35",
  });

  // State de Indicadores Objetivo
  const [indicadoresObjetivo, setIndicadoresObjetivo] = useState({
    "Ingreso por Ventas": "",
    "Costos Totales": "",
    "Utilidad Bruta": "",
    "Gastos Generales": "",
    "Utilidad Operacional": "",
    Impuestos: "",
    "Utilidad Neta": "",
  });

  // State de Indicadores de Liquidez y Rentabilidad
  const [indicadoresLiquidez, setIndicadoresLiquidez] = useState({
    "Razón Corriente": "",
    "Margen Bruto": "",
    "Prueba Ácida": "",
    "Margen Operacional": "",
    "Margen Neto": "",
    EBITDA: "",
    "Nivel de Endeudamiento": "",
    "Rentabilidad del Patrimonio": "",
    "Rentabilidad del Activo": "",
    "Capital de Trabajo": "",
  });

  // Gestionar los cambios para Margen de Utilidad
  const handleMargenUtilidadChange = (producto, value) => {
    // Only allow numbers and a single decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    setMargenUtilidad({ ...margenUtilidad, [producto]: numericValue });
  };

  //  Gestionar los cambios para Indicadores Objetivo
  const handleIndicadoresObjetivoChange = (indicador, value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setIndicadoresObjetivo({
      ...indicadoresObjetivo,
      [indicador]: numericValue,
    });
  };

  //  Gestionar los cambios para Indicadores de Liquidez
  const handleIndicadoresLiquidezChange = (indicador, value) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setIndicadoresLiquidez({
      ...indicadoresLiquidez,
      [indicador]: numericValue,
    });
  };

  // Calcular valores derivados
  useEffect(() => {
    // Example: Calculate Utilidad Bruta based on Ingreso por Ventas and Costos Totales
    const ingresos =
      Number.parseFloat(indicadoresObjetivo["Ingreso por Ventas"]) || 0;
    const costos =
      Number.parseFloat(indicadoresObjetivo["Costos Totales"]) || 0;

    if (ingresos > 0 && costos > 0) {
      const utilidadBruta = ingresos - costos;
      setIndicadoresObjetivo((prev) => ({
        ...prev,
        "Utilidad Bruta": utilidadBruta.toString(),
      }));
    }

    // Aquí podrían añadirse más cálculos
  }, [
    indicadoresObjetivo["Ingreso por Ventas"],
    indicadoresObjetivo["Costos Totales"],
  ]);

  // Formateo de modena
  const formatCurrency = (value) => {
    if (!value) return "";
    const numValue = Number.parseFloat(value);
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue);
  };

  // Función de guardar indicadores
  const handleSave = () => {
    console.log({
      margenUtilidad,
      indicadoresObjetivo,
      indicadoresLiquidez,
    });
    alert("Indicadores guardados con éxito");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Alerta informativa */}
      <Card
        sx={{
          mb: 4,
          bgcolor: "primary.light",
          color: "white",
          background:
            "linear-gradient(to right, rgba(28, 67, 132, 0.05), rgba(28, 67, 132, 0.1))",
          border: "none",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
              <InfoIcon />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 0.5, color: "primary.main" }}
              >
                Indicadores Objetivo
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                En esta sección puede establecer los objetivos financieros
                anuales para su empresa. Estos indicadores servirán como metas a
                alcanzar durante la operación y serán el punto de referencia
                para evaluar el desempeño de su gestión.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Container principal */}
      <Card sx={{ boxShadow: 2, mb: 4, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BarChartIcon sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Indicadores objetivos anuales
              </Typography>
            </Box>
          }
          action={
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                bgcolor: theme.palette.success.main,
                "&:hover": { bgcolor: theme.palette.success.dark },
              }}
            >
              Guardar Indicadores
            </Button>
          }
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            p: 2,
          }}
        />

        <CardContent sx={{ p: 4, bgcolor: "#F8F9FC" }}>
          {/* Margen de Utilidad sobre Costo */}
          <Card sx={{ mb: 4, boxShadow: 1, borderRadius: 1 }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PercentIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Margen de Utilidad sobre Costo
                  </Typography>
                </Box>
              }
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                p: 1.5,
              }}
            />
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: "#EBF5FF" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.dark,
                      }}
                    >
                      Producto
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.dark,
                      }}
                    >
                      Tipo
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.dark,
                        textAlign: "center",
                      }}
                    >
                      Unidad
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.dark,
                      }}
                    >
                      Valor
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(margenUtilidad).map(
                    ([producto, valor], index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          {producto}
                        </TableCell>
                        <TableCell>% Margen de Utilidad</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>%</TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={valor}
                            onChange={(e) =>
                              handleMargenUtilidadChange(
                                producto,
                                e.target.value
                              )
                            }
                            placeholder="0.00"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PercentIcon
                                    sx={{
                                      color: "text.secondary",
                                      fontSize: 18,
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Grid container spacing={3}>
            {/* Indicadores Objetivo */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 1, borderRadius: 1, height: "100%" }}>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TargetIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Indicadores Objetivo
                      </Typography>
                    </Box>
                  }
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    p: 1.5,
                  }}
                />
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: "#EBF5FF" }}>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                          }}
                        >
                          Indicador
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                            textAlign: "center",
                          }}
                        >
                          Unidad
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                          }}
                        >
                          Valor
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(indicadoresObjetivo).map(
                        ([indicador, valor], index) => {
                          const unidad = "COP";
                          const isCalculated = indicador === "Utilidad Bruta";

                          return (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {indicador}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {unidad}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={valor}
                                  onChange={(e) =>
                                    handleIndicadoresObjetivoChange(
                                      indicador,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  disabled={isCalculated}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <DollarSignIcon
                                          sx={{
                                            color: "text.secondary",
                                            fontSize: 18,
                                          }}
                                        />
                                      </InputAdornment>
                                    ),
                                    readOnly: isCalculated,
                                  }}
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "#4F46E5",
                                    },
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>

            {/* Indicadores de Liquidez y Rentabilidad */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 1, borderRadius: 1, height: "100%" }}>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LineChartIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Indicadores de Liquidez y Rentabilidad
                      </Typography>
                    </Box>
                  }
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    p: 1.5,
                  }}
                />
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: "#EBF5FF" }}>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                          }}
                        >
                          Indicador
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                            textAlign: "center",
                          }}
                        >
                          Unidad
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.dark,
                          }}
                        >
                          Valor
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(indicadoresLiquidez).map(
                        ([indicador, valor], index) => {
                          // Obtener la unidad adecuada para cada indicador
                          const getUnidad = (ind) => {
                            if (
                              ind === "Razón Corriente" ||
                              ind === "Margen Bruto"
                            )
                              return "Ratio";
                            if (
                              ind === "EBITDA" ||
                              ind === "Capital de Trabajo"
                            )
                              return "COP";
                            return "%";
                          };

                          // Obtener el icono apropiado para cada indicador
                          const getIcon = (ind) => {
                            if (
                              ind === "EBITDA" ||
                              ind === "Capital de Trabajo"
                            )
                              return (
                                <DollarSignIcon
                                  sx={{ color: "text.secondary", fontSize: 18 }}
                                />
                              );
                            if (
                              ind === "Razón Corriente" ||
                              ind === "Prueba Ácida"
                            )
                              return (
                                <CalculateIcon
                                  sx={{ color: "text.secondary", fontSize: 18 }}
                                />
                              );
                            if (ind.includes("Rentabilidad"))
                              return (
                                <TrendingUpIcon
                                  sx={{ color: "text.secondary", fontSize: 18 }}
                                />
                              );
                            if (ind.includes("Margen"))
                              return (
                                <PieChartIcon
                                  sx={{ color: "text.secondary", fontSize: 18 }}
                                />
                              );
                            return (
                              <PercentIcon
                                sx={{ color: "text.secondary", fontSize: 18 }}
                              />
                            );
                          };

                          const unidad = getUnidad(indicador);
                          const icon = getIcon(indicador);

                          return (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {indicador}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                {unidad}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={valor}
                                  onChange={(e) =>
                                    handleIndicadoresLiquidezChange(
                                      indicador,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {icon}
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
