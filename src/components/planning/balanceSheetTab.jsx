// Balance general inicial
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Paper,
  InputAdornment,
  Divider,
  Alert,
  AlertTitle,
  useTheme,
} from "@mui/material";
import {
  Save as SaveIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Business as BusinessIcon,
  AttachMoney as AttachMoneyIcon,
  Savings as SavingsIcon,
  Info as InfoIcon,
  BarChart as BarChartIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  Calculate as CalculateIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import axiosInstance from "../../services/api/axiosConfig";
import showAlert from "../../utils/alerts/alertHelpers";
import { updateProgress } from "../dashboard/monthProgress";

export default function BalanceSheetTab({ handleTab }) {
  const theme = useTheme();

  // Estado para cada sección del balance
  const [activosCorrientes, setActivosCorrientes] = useState({
    "Dinero en caja": "",
    "Dinero en banco": "",
    "Cuentas por cobrar": "",
    Inventario: "",
  });

  const [pasivosCorrientes, setPasivosCorrientes] = useState({
    "Cuentas por pagar": "",
    "Letras por pagar": "",
    "Costos operativos": "",
  });

  const [ppe, setPpe] = useState({
    "Muebles y enseres": "",
    Patentes: "",
    "Maquinaria y equipo": "",
    "Equipos de oficina": "",
  });

  const [pasivosLP, setPasivosLP] = useState({
    "Deuda a largo plazo": "",
  });

  const [patrimonio, setPatrimonio] = useState({
    "Capital social": "",
    "Utilidades retenidas": "",
  });

  const [formattedDataTitles, setFormattedDataTitles] = useState({});

  // Estados para las proyecciones
  const [ventasProyectadas, setVentasProyectadas] = useState({
    alfaros: { unidades: "", precioUnitario: "", total: 0 },
    betacos: { unidades: "", precioUnitario: "", total: 0 },
    gamaroles: { unidades: "", precioUnitario: "", total: 0 },
  });

  const [costosProyectados, setCostosProyectados] = useState({
    costoMateriaPrima: "",
    costoManoObra: "",
    costosIndirectos: "",
    total: 0,
  });

  const [gastosProyectados, setGastosProyectados] = useState({
    gastosAdministrativos: "",
    gastosVentas: "",
    otrosGastos: "",
    depreciacion: "",
    total: 0,
  });

  const [parametrosFinancieros, setParametrosFinancieros] = useState({
    tasaImpuestos: "30", // Valor predeterminado 30%
  });

  // Calcular totales del balance
  const [totals, setTotals] = useState({
    activosCorrientes: 0,
    ppe: 0,
    totalActivos: 0,
    pasivosCorrientes: 0,
    pasivosLP: 0,
    totalPasivos: 0,
    patrimonio: 0,
    balance: 0,
  });

  // Calcular totales de proyecciones
  const [projectionTotals, setProjectionTotals] = useState({
    ventasTotal: 0,
    costosTotal: 0,
    utilidadBruta: 0,
    gastosTotal: 0,
    utilidadOperacional: 0,
    impuestos: 0,
    utilidadNeta: 0,
  });

  // Calcular todos los totales del balance cuando cambia cualquier entrada
  useEffect(() => {
    const calculateTotal = (items) => {
      return Object.values(items).reduce((sum, value) => {
        const numValue = Number.parseFloat(value) || 0;
        return sum + numValue;
      }, 0);
    };

    const activosCorrientesTotal = calculateTotal(activosCorrientes);
    const ppeTotal = calculateTotal(ppe);
    const pasivosCorrientesTotal = calculateTotal(pasivosCorrientes);
    const pasivosLPTotal = calculateTotal(pasivosLP);
    const patrimonioTotal = calculateTotal(patrimonio);

    const totalActivos = activosCorrientesTotal + ppeTotal;
    const totalPasivos = pasivosCorrientesTotal + pasivosLPTotal;
    const balance = totalActivos - totalPasivos - patrimonioTotal;

    setTotals({
      activosCorrientes: activosCorrientesTotal,
      ppe: ppeTotal,
      totalActivos,
      pasivosCorrientes: pasivosCorrientesTotal,
      pasivosLP: pasivosLPTotal,
      totalPasivos,
      patrimonio: patrimonioTotal,
      balance,
    });
  }, [activosCorrientes, pasivosCorrientes, ppe, pasivosLP, patrimonio]);

  useEffect(() => {
    const getFinancialTitle = async () => {
      try {
        const response = await axiosInstance.get(
          "/financialdata/getDatatitles"
        );

        const financialTitles = response.data.financialTitles;

        const formattedData = financialTitles.reduce((acc, title) => {
          acc[title.name] = {
            title_id: title.id,
            literal_id: title.FinancialData[0]?.literal_id || null,
          };
          return acc;
        }, {});

        setFormattedDataTitles(formattedData);
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
      }
    };

    getFinancialTitle();
  }, []);

  // Calcular totales de ventas cuando cambian los campos de ventas proyectadas
  useEffect(() => {
    // Calcular total para cada producto
    let newVentasProyectadas = { ...ventasProyectadas };
    let ventasTotal = 0;

    Object.keys(ventasProyectadas).forEach((producto) => {
      const unidades = Number(ventasProyectadas[producto].unidades) || 0;
      const precioUnitario =
        Number(ventasProyectadas[producto].precioUnitario) || 0;
      const total = unidades * precioUnitario;

      newVentasProyectadas[producto].total = total;
      ventasTotal += total;
    });

    setVentasProyectadas(newVentasProyectadas);

    // Actualizar totales de proyección
    updateProjectionTotals({ ventasTotal });
  }, [
    ventasProyectadas.alfaros.unidades,
    ventasProyectadas.alfaros.precioUnitario,
    ventasProyectadas.betacos.unidades,
    ventasProyectadas.betacos.precioUnitario,
    ventasProyectadas.gamaroles.unidades,
    ventasProyectadas.gamaroles.precioUnitario,
  ]);

  // Calcular total de costos cuando cambian los campos de costos
  useEffect(() => {
    const costoMateriaPrima = Number(costosProyectados.costoMateriaPrima) || 0;
    const costoManoObra = Number(costosProyectados.costoManoObra) || 0;
    const costosIndirectos = Number(costosProyectados.costosIndirectos) || 0;
    const costosTotal = costoMateriaPrima + costoManoObra + costosIndirectos;

    setCostosProyectados((prev) => ({ ...prev, total: costosTotal }));

    // Actualizar totales de proyección
    updateProjectionTotals({ costosTotal });
  }, [
    costosProyectados.costoMateriaPrima,
    costosProyectados.costoManoObra,
    costosProyectados.costosIndirectos,
  ]);

  // Calcular total de gastos cuando cambian los campos de gastos
  useEffect(() => {
    const gastosAdministrativos =
      Number(gastosProyectados.gastosAdministrativos) || 0;
    const gastosVentas = Number(gastosProyectados.gastosVentas) || 0;
    const otrosGastos = Number(gastosProyectados.otrosGastos) || 0;
    const depreciacion = Number(gastosProyectados.depreciacion) || 0;
    const gastosTotal =
      gastosAdministrativos + gastosVentas + otrosGastos + depreciacion;

    setGastosProyectados((prev) => ({ ...prev, total: gastosTotal }));

    // Actualizar totales de proyección
    updateProjectionTotals({ gastosTotal });
  }, [
    gastosProyectados.gastosAdministrativos,
    gastosProyectados.gastosVentas,
    gastosProyectados.otrosGastos,
    gastosProyectados.depreciacion,
  ]);

  // Función para actualizar los totales de proyección
  const updateProjectionTotals = (updatedValues) => {
    setProjectionTotals((prev) => {
      // Obtener valores actuales o actualizados
      const ventasTotal =
        updatedValues.ventasTotal !== undefined
          ? updatedValues.ventasTotal
          : prev.ventasTotal;

      const costosTotal =
        updatedValues.costosTotal !== undefined
          ? updatedValues.costosTotal
          : prev.costosTotal;

      const gastosTotal =
        updatedValues.gastosTotal !== undefined
          ? updatedValues.gastosTotal
          : prev.gastosTotal;

      // Calcular valores derivados
      const utilidadBruta = ventasTotal - costosTotal;
      const utilidadOperacional = utilidadBruta - gastosTotal;

      const tasaImpuestos =
        Number(parametrosFinancieros.tasaImpuestos) / 100 || 0.3;
      const impuestos = Math.max(0, utilidadOperacional * tasaImpuestos);

      const utilidadNeta = utilidadOperacional - impuestos;

      return {
        ventasTotal,
        costosTotal,
        utilidadBruta,
        gastosTotal,
        utilidadOperacional,
        impuestos,
        utilidadNeta,
      };
    });
  };

  // Actualizar valores de entrada del balance
  const handleInputChange = (section, account, value) => {
    // Permitir solo números y punto decimal
    const numericValue = value.replace(/[^0-9.]/g, "");

    switch (section) {
      case "activosCorrientes":
        setActivosCorrientes({ ...activosCorrientes, [account]: numericValue });
        break;
      case "pasivosCorrientes":
        setPasivosCorrientes({ ...pasivosCorrientes, [account]: numericValue });
        break;
      case "ppe":
        setPpe({ ...ppe, [account]: numericValue });
        break;
      case "pasivosLP":
        setPasivosLP({ ...pasivosLP, [account]: numericValue });
        break;
      case "patrimonio":
        setPatrimonio({ ...patrimonio, [account]: numericValue });
        break;
    }
  };

  // Manejar cambios en los campos de ventas proyectadas
  const handleVentasChange = (producto, campo, valor) => {
    // Permitir solo números y punto decimal
    const numericValue = valor.replace(/[^0-9.]/g, "");

    setVentasProyectadas((prev) => ({
      ...prev,
      [producto]: {
        ...prev[producto],
        [campo]: numericValue,
      },
    }));
  };

  // Manejar cambios en los campos de costos proyectados
  const handleCostosChange = (campo, valor) => {
    // Permitir solo números y punto decimal
    const numericValue = valor.replace(/[^0-9.]/g, "");

    setCostosProyectados((prev) => ({
      ...prev,
      [campo]: numericValue,
    }));
  };

  // Manejar cambios en los campos de gastos proyectados
  const handleGastosChange = (campo, valor) => {
    // Permitir solo números y punto decimal
    const numericValue = valor.replace(/[^0-9.]/g, "");

    setGastosProyectados((prev) => ({
      ...prev,
      [campo]: numericValue,
    }));
  };

  // Manejar cambios en los parámetros financieros
  const handleParametrosChange = (campo, valor) => {
    // Permitir solo números y punto decimal
    const numericValue = valor.replace(/[^0-9.]/g, "");

    setParametrosFinancieros((prev) => ({
      ...prev,
      [campo]: numericValue,
    }));

    // Actualizar cálculos que dependen de la tasa de impuestos
    if (campo === "tasaImpuestos") {
      const tasaImpuestos = Number(numericValue) / 100 || 0.3;
      const impuestos = Math.max(
        0,
        projectionTotals.utilidadOperacional * tasaImpuestos
      );
      const utilidadNeta = projectionTotals.utilidadOperacional - impuestos;

      setProjectionTotals((prev) => ({
        ...prev,
        impuestos,
        utilidadNeta,
      }));
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const formatData = () => {
    const allStates = {
      activosCorrientes,
      pasivosCorrientes,
      ppe,
      pasivosLP,
      patrimonio,
    };

    const formattedData = Object.values(allStates).flatMap((category) =>
      Object.entries(category).map(([name, value]) => {
        const DataTitles = formattedDataTitles[name];

        return {
          title_id: DataTitles?.title_id || null,
          literal_id: DataTitles?.literal_id || null,
          amount: parseFloat(value) || 0,
          created_by: userData.id,
        };
      })
    );

    return { financialData: formattedData };
  };

  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const sendFinancialData = async (financialData) => {
    try {
      if (!Array.isArray(financialData) || financialData.length === 0) {
        console.error("El array de datos financieros es requerido.");
        return;
      }

      const response = await axiosInstance.post(
        "/financialdata/createfinancialdata",
        {
          financialData,
        }
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;

      showAlert(
        "Balance general inicial",
        JSON.stringify(message, null, 2),
        "error",
        "#1C4384"
      );
      console.error(
        "Error al registrar datos financieros:",
        error.response?.data || error.message
      );
    }
  };

  // Función para el presupuesto
  const handleSave = async () => {
    // Verificar si el balance está cuadrado
    if (Math.abs(totals.balance) >= 0.01) {
      // Si no está cuadrado, mostrar un mensaje de error
      showAlert(
        "Balance general inicial",
        "El balance no cuadra. Por favor, revise los valores ingresados",
        "error",
        "#1C4384"
      );
      return;
    }

    const { financialData } = formatData();

    const responseFinancialData = await sendFinancialData(financialData);

    if (responseFinancialData?.ok) {
      updateProgress(1); 
      showAlert(
        "Balance general inicial",
        "Datos financieros registrados exitosamente",
        "success",
        "#1C4384",
        () => handleTab(null, 2)
      );
    }
  };

  // Pasos del formulario de proyecciones
  const steps = [
    "Proyección de Ventas",
    "Estructura de Costos",
    "Gastos Operativos",
    "Resumen Financiero",
  ];

  // Función para avanzar al siguiente paso
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Función para retroceder al paso anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Función para cerrar el diálogo de proyecciones
  const handleCloseProjection = () => {
    setOpenProjectionDialog(false);
    setActiveStep(0);
  };

  // Contenido por paso del diálogo de proyecciones
  const getStepContent = (step) => {
    switch (step) {
      case 0: // Proyección de Ventas
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Proyecte sus ventas mensuales
            </Typography>

            <Grid container spacing={3}>
              {["alfaros", "betacos", "gamaroles"].map((producto) => (
                <Grid item xs={12} key={producto}>
                  <Card>
                    <CardHeader
                      title={
                        <Typography
                          variant="subtitle1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {producto}
                        </Typography>
                      }
                      sx={{ bgcolor: "primary.light", color: "white", py: 1 }}
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Unidades Mensuales
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            value={ventasProyectadas[producto].unidades}
                            onChange={(e) =>
                              handleVentasChange(
                                producto,
                                "unidades",
                                e.target.value
                              )
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  u
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Precio Unitario
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            value={ventasProyectadas[producto].precioUnitario}
                            onChange={(e) =>
                              handleVentasChange(
                                producto,
                                "precioUnitario",
                                e.target.value
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Total Mensual
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            value={formatCurrency(
                              ventasProyectadas[producto].total
                            )}
                            disabled
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "primary.light",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">
                Total Ventas Mensuales: $
                {formatCurrency(projectionTotals.ventasTotal)}
              </Typography>
            </Box>
          </Box>
        );

      case 1: // Estructura de Costos
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Defina su estructura de costos mensual
            </Typography>

            <Card>
              <CardHeader
                title={
                  <Typography variant="subtitle1">
                    Costos de Producción
                  </Typography>
                }
                sx={{ bgcolor: "error.light", color: "white", py: 1 }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Materia Prima
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={costosProyectados.costoMateriaPrima}
                      onChange={(e) =>
                        handleCostosChange("costoMateriaPrima", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Mano de Obra
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={costosProyectados.costoManoObra}
                      onChange={(e) =>
                        handleCostosChange("costoManoObra", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Costos Indirectos
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={costosProyectados.costosIndirectos}
                      onChange={(e) =>
                        handleCostosChange("costosIndirectos", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "error.light",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">
                Total Costos Mensuales: $
                {formatCurrency(costosProyectados.total)}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "success.light",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">
                Utilidad Bruta Mensual: $
                {formatCurrency(projectionTotals.utilidadBruta)}
              </Typography>
              <Typography variant="body2">
                Margen Bruto:{" "}
                {projectionTotals.ventasTotal
                  ? (
                      (projectionTotals.utilidadBruta /
                        projectionTotals.ventasTotal) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </Typography>
            </Box>
          </Box>
        );

      case 2: // Gastos Operativos
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Defina sus gastos operativos mensuales
            </Typography>

            <Card>
              <CardHeader
                title={
                  <Typography variant="subtitle1">Gastos Operativos</Typography>
                }
                sx={{ bgcolor: "secondary.light", color: "white", py: 1 }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Gastos Administrativos
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={gastosProyectados.gastosAdministrativos}
                      onChange={(e) =>
                        handleGastosChange(
                          "gastosAdministrativos",
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Gastos de Ventas
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={gastosProyectados.gastosVentas}
                      onChange={(e) =>
                        handleGastosChange("gastosVentas", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Otros Gastos
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={gastosProyectados.otrosGastos}
                      onChange={(e) =>
                        handleGastosChange("otrosGastos", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Depreciación Mensual
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={gastosProyectados.depreciacion}
                      onChange={(e) =>
                        handleGastosChange("depreciacion", e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "secondary.light",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">
                Total Gastos Mensuales: $
                {formatCurrency(gastosProyectados.total)}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "info.light",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle1">
                Utilidad Operacional Mensual: $
                {formatCurrency(projectionTotals.utilidadOperacional)}
              </Typography>
              <Typography variant="body2">
                Margen Operacional:{" "}
                {projectionTotals.ventasTotal
                  ? (
                      (projectionTotals.utilidadOperacional /
                        projectionTotals.ventasTotal) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </Typography>
            </Box>
          </Box>
        );

      case 3: // Resumen Financiero
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Resumen de Proyecciones Financieras
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardHeader
                    title={
                      <Typography variant="subtitle1">
                        Parámetros Financieros
                      </Typography>
                    }
                    sx={{ bgcolor: "info.light", color: "white", py: 1 }}
                  />
                  <CardContent>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Tasa de Impuestos (%)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={parametrosFinancieros.tasaImpuestos}
                        onChange={(e) =>
                          handleParametrosChange(
                            "tasaImpuestos",
                            e.target.value
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Alert severity="info" sx={{ mt: 2 }}>
                      La tasa de impuestos promedio en Colombia es del 30%.
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardHeader
                    title={
                      <Typography variant="subtitle1">
                        Estado de Resultados Proyectado
                      </Typography>
                    }
                    sx={{ bgcolor: "primary.main", color: "white", py: 1 }}
                  />
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell>Ventas Totales</TableCell>
                            <TableCell align="right">
                              ${formatCurrency(projectionTotals.ventasTotal)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>(-) Costos Totales</TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "error.main" }}
                            >
                              ${formatCurrency(projectionTotals.costosTotal)}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "& td": {
                                fontWeight: "bold",
                                borderTop: "2px solid #ddd",
                              },
                            }}
                          >
                            <TableCell>Utilidad Bruta</TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "success.main" }}
                            >
                              ${formatCurrency(projectionTotals.utilidadBruta)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>(-) Gastos Operativos</TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "error.main" }}
                            >
                              ${formatCurrency(projectionTotals.gastosTotal)}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "& td": {
                                fontWeight: "bold",
                                borderTop: "1px solid #ddd",
                              },
                            }}
                          >
                            <TableCell>Utilidad Operacional</TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "primary.main" }}
                            >
                              $
                              {formatCurrency(
                                projectionTotals.utilidadOperacional
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              (-) Impuestos (
                              {parametrosFinancieros.tasaImpuestos}%)
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "error.main" }}
                            >
                              ${formatCurrency(projectionTotals.impuestos)}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "& td": {
                                fontWeight: "bold",
                                fontSize: "1.1em",
                                borderTop: "2px solid #ddd",
                              },
                            }}
                          >
                            <TableCell>Utilidad Neta</TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "success.dark" }}
                            >
                              ${formatCurrency(projectionTotals.utilidadNeta)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                      <Typography variant="subtitle2">
                        Indicadores de Rentabilidad:
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          Margen Neto:{" "}
                          {projectionTotals.ventasTotal
                            ? (
                                (projectionTotals.utilidadNeta /
                                  projectionTotals.ventasTotal) *
                                100
                              ).toFixed(2)
                            : 0}
                          %
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Alert severity="success" icon={<CheckIcon />}>
                <AlertTitle>Cálculos Completados</AlertTitle>
                Al finalizar, estos datos serán utilizados para calcular los
                Indicadores Financieros Iniciales.
              </Alert>
            </Box>
          </Box>
        );

      default:
        return "Paso desconocido";
    }
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
                Balance General Inicial
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                En esta sección debe ingresar la información detallada del
                Balance General Inicial de su empresa. Complete todos los campos
                correspondientes a Activos, Pasivos y Patrimonio. Recuerde que
                un balance correctamente cuadrado debe cumplir la fórmula:{" "}
                <strong>Activos = Pasivos + Patrimonio</strong>.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Container principal del Balance */}
      <Card sx={{ boxShadow: 2, mb: 4, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Balance General Inicial
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
              Guardar Presupuesto
            </Button>
          }
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            p: 2,
          }}
        />

        <CardContent sx={{ p: 4, bgcolor: "#F8F9FC" }}>
          {/* Tarjetas de resumen */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  boxShadow: 2,
                }}
              >
                <CardContent
                  sx={{ p: 3, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <AttachMoneyIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Activos
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      ${formatCurrency(totals.totalActivos)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  bgcolor: theme.palette.error.main,
                  color: "white",
                  boxShadow: 2,
                }}
              >
                <CardContent
                  sx={{ p: 3, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <TrendingDownIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Pasivos
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      ${formatCurrency(totals.totalPasivos)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: "white",
                  boxShadow: 2,
                }}
              >
                <CardContent
                  sx={{ p: 3, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <SavingsIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Patrimonio
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      ${formatCurrency(totals.patrimonio)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Columna izquierda - Activos */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Activos Corrientes */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TrendingUpIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Activos Corrientes
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
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(activosCorrientes).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "activosCorrientes",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total activos corrientes
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.success.main }}>
                            ${formatCurrency(totals.activosCorrientes)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>

                {/* P.P.E */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BusinessIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          P.P.E (Propiedades, Planta y Equipo)
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
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(ppe).map(([account, amount], index) => (
                          <TableRow key={index} hover>
                            <TableCell sx={{ fontWeight: "medium" }}>
                              {account}
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={amount}
                                onChange={(e) =>
                                  handleInputChange(
                                    "ppe",
                                    account,
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography
                                        sx={{ color: "text.secondary" }}
                                      >
                                        $
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total PPE
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.success.main }}>
                            ${formatCurrency(totals.ppe)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            </Grid>

            {/* Columna derecha - Pasivos y Patrimonio */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Pasivos Corrientes */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TrendingDownIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Pasivos Corrientes
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
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(pasivosCorrientes).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "pasivosCorrientes",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total pasivos corrientes
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.error.main }}>
                            ${formatCurrency(totals.pasivosCorrientes)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>

                {/* Pasivos Largo Plazo */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TrendingDownIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Pasivos Largo Plazo
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
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(pasivosLP).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "pasivosLP",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total Pasivos LP
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.error.main }}>
                            ${formatCurrency(totals.pasivosLP)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>

                {/* Patrimonio */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <SavingsIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Patrimonio
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
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(patrimonio).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "patrimonio",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total Patrimonio
                          </TableCell>
                          <TableCell
                            sx={{ color: theme.palette.secondary.main }}
                          >
                            ${formatCurrency(totals.patrimonio)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Tarjeta de Resumen Total */}
          <Card
            sx={{
              mt: 4,
              boxShadow: 3,
              borderRadius: 1,
              bgcolor:
                Math.abs(totals.balance) < 0.01
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              color: "white",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                p: 3,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Balance Total
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  {Math.abs(totals.balance) < 0.01
                    ? "El balance está cuadrado correctamente"
                    : "El balance no está cuadrado"}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mt: { xs: 2, md: 0 } }}
              >
                ${formatCurrency(Math.abs(totals.balance))}
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
}
