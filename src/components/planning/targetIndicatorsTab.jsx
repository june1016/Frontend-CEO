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
import axiosInstance from "../../services/api/axiosConfig";
import { showAlert } from "../../utils/alerts/alertHelpers";
import InfoCard from ".././common/infoCard";
import { updateProgress } from "../../utils/shared/operationTime";

export default function TargetIndicatorsTab({ handleTab }) {
  const theme = useTheme();

  // State de Margen de Utilidad sobre Costo
  const [margenUtilidad, setMargenUtilidad] = useState({
    Alfaros: "35",
    Betacos: "35",
    Gamaroles: "35",
  });

  // State de Indicadores Objetivo
  const [indicadoresObjetivo, setIndicadoresObjetivo] = useState({
    "Ingreso por ventas": "",
    "Costos totales": "",
    "Utilidad bruta": "",
    "Gastos generales": "",
    "Utilidad operacional": "",
    Impuestos: "",
    "Utilidad neta": "",
  });

  // State de Indicadores de Liquidez y Rentabilidad
  const [indicadoresLiquidez, setIndicadoresLiquidez] = useState({
    "Razon corriente": "",
    "Margen bruto": "",
    "Prueba acida": "",
    "Margen operacional": "",
    "Margen neto": "",
    EBITDA: "",
    "Nivel de endeudamiento": "",
    "Rentabilidad del patrimonio": "",
    "Rentabilidad del activo": "",
    "Capital de trabajo": "",
  });

  const [formattedDataTitles, setFormattedDataTitles] = useState({});

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
      Number.parseFloat(indicadoresObjetivo["Ingreso por ventas"]) || 0;
    const costos =
      Number.parseFloat(indicadoresObjetivo["Costos totales"]) || 0;

    if (ingresos > 0 && costos > 0) {
      const utilidadBruta = ingresos - costos;
      setIndicadoresObjetivo((prev) => ({
        ...prev,
        "Utilidad bruta": utilidadBruta.toString(),
      }));
    }

    // Aquí podrían añadirse más cálculos
  }, [
    indicadoresObjetivo["Ingreso por ventas"],
    indicadoresObjetivo["Costos totales"],
  ]);

  useEffect(() => {
    const getIndicatorTitles = async () => {
      try {
        const response = await axiosInstance.get(
          "/indicatordata/getIndicatortitles"
        );

        const indicatorTitles = response.data.indicatorTitles;

        const formattedData = indicatorTitles.reduce((acc, title) => {
          acc[title.name] = {
            title_id: title.id,
            literal_id:
              title.AnnualObjectiveIndicators?.[0]?.literal_id || null,
            unit_id: title.AnnualObjectiveIndicators?.[0]?.unit_id || null,
          };
          return acc;
        }, {});

        setFormattedDataTitles(formattedData);
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
      }
    };

    getIndicatorTitles();
  }, []);

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

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const formatData = () => {
    const allIndicators = {
      margenUtilidad,
      indicadoresObjetivo,
      indicadoresLiquidez,
    };

    const formattedData = Object.values(allIndicators).flatMap((category) =>
      Object.entries(category)
        .filter(([name]) => formattedDataTitles[name]) // solo los que existan
        .map(([name, value]) => {
          const DataTitles = formattedDataTitles[name];
          return {
            title_id: DataTitles.title_id,
            literal_id: DataTitles.literal_id,
            unit_id: DataTitles.unit_id,
            value: parseFloat(value) || 0,
            created_by: userData.id,
          };
        })
    );

    return { indicators: formattedData };
  };

  const sendObjetiveIndicators = async (indicators) => {
    try {

      if (!Array.isArray(indicators) || indicators.length === 0) {
        console.error("El array de indicadores es requerido.");
        return;
      }

      const response = await axiosInstance.post(
        "/indicatordata/createindicators",
        {
          indicators,
        }
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;

      showAlert(
        "Indicadores objetivos anuales",
        JSON.stringify(message, null, 2),
        "error",
        "#1C4384"
      );
      console.error(
        "Error al registrar indicadores objetivos anuales:",
        error.response?.data || error.message
      );
    }
  };

  // Función de guardar indicadores
  const handleSave = async () => {
    const { indicators } = formatData();

    const responseIndicator = await sendObjetiveIndicators(indicators);

    if (responseIndicator?.ok) {
      updateProgress(2); 
      showAlert(
        "Indicadores objetivos anuales",
        "Indicadores objetivos anuales registrados exitosamente",
        "success",
        "#1C4384",
        () => handleTab(null, 4)
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Indicadores Objetivos Anuales"
        description="En esta sección puede establecer los objetivos financieros anuales para su empresa. Estos indicadores servirán como metas a alcanzar durante la operación y serán el punto de referencia para evaluar el desempeño de su gestión."
      />

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
              <Card sx={{ boxShadow: 1, borderRadius: 1, height: "73.5%" }}>
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
                          const isCalculated = indicador === "Utilidad bruta";

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
