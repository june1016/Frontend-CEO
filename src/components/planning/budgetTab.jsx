import React, { useState } from "react";
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
  Tab,
  Tabs,
  Paper,
  Alert,
  AlertTitle,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  SaveAlt as SaveIcon,
  Factory as FactoryIcon,
  Inventory as PackageIcon,
  Info as InfoIcon,
  FileDownload as DownloadIcon,
  ArrowDropDown as ArrowDownIcon,
  BarChart as BarChartIcon,
  CalendarToday as CalendarIcon,
  Percent as PercentIcon,
  KeyboardArrowUp as ChevronUpIcon,
  KeyboardArrowDown as ChevronDownIcon,
} from "@mui/icons-material";

// Budget types
const budgetTypes = [
  {
    id: "sales",
    title: "Presupuesto de Ventas",
    description: "Proyección de ventas esperadas en unidades y valor monetario",
    icon: BarChartIcon,
    color: "#1C4384",
  },
  {
    id: "production",
    title: "Presupuesto de Producción",
    description:
      "Planificación de unidades a producir para cumplir ventas proyectadas",
    icon: FactoryIcon,
    color: "#2D5AA3",
  },
  {
    id: "materials",
    title: "Presupuesto de Materia Prima",
    description:
      "Estimación de necesidades de materia prima para la producción",
    icon: PackageIcon,
    color: "#3A6BC5",
  },
];

// Products
const products = [
  { id: "alfaros", name: "Alfaros", defaultValue: 2650 },
  { id: "betacos", name: "Betacos", defaultValue: 1920 },
  { id: "gamaroles", name: "Gamaroles", defaultValue: 1060 },
];

export default function PresupuestosTab() {
  const theme = useTheme();

  const [selectedBudget, setSelectedBudget] = useState(null);
  const [activeView, setActiveView] = useState("config");
  const [selectedMonth, setSelectedMonth] = useState(1);

  // Configuration state
  const [growthRates, setGrowthRates] = useState(Array(12).fill(0));
  const [decadeDistribution, setDecadeDistribution] = useState(
    Array(12).fill({ d1: 40, d2: 33, d3: 27 })
  );

  // Monthly data state
  const [monthlyData, setMonthlyData] = useState({
    1: {
      alfaros: 2650,
      betacos: 1920,
      gamaroles: 1060,
    },
  });

  // Handle growth rate change
  const handleGrowthChange = (month, value) => {
    const newGrowthRates = [...growthRates];
    newGrowthRates[month - 1] = Number.parseFloat(value) || 0;
    setGrowthRates(newGrowthRates);
  };

  // Handle decade distribution change
  const handleDecadeChange = (month, decade, value) => {
    const newDistribution = [...decadeDistribution];
    newDistribution[month - 1] = {
      ...newDistribution[month - 1],
      [decade]: Number.parseFloat(value) || 0,
    };
    setDecadeDistribution(newDistribution);
  };

  // Handle product units change
  const handleProductChange = (month, product, value) => {
    setMonthlyData((prev) => ({
      ...prev,
      [month]: {
        ...(prev[month] || {}),
        [product]: Number.parseFloat(value) || 0,
      },
    }));
  };

  // Calculate decade values based on total units and distribution
  const calculateDecadeValues = (month, product) => {
    const total = monthlyData[month]?.[product] || 0;
    const distribution = decadeDistribution[month - 1];

    return {
      d1: Math.round((total * distribution.d1) / 100),
      d2: Math.round((total * distribution.d2) / 100),
      d3: Math.round((total * distribution.d3) / 100),
      total,
    };
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat("es-ES").format(num);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveView(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ boxShadow: 2, mb: 4, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Presupuestos
              </Typography>
            </Box>
          }
          sx={{
            bgcolor: theme.palette.primary.main,
            background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            color: "white",
            p: 2,
          }}
        />

        <CardContent sx={{ p: 4, bgcolor: "#F8F9FC" }}>
          {/* Budget Type Selection */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {budgetTypes.map((budget) => {
              const isSelected = selectedBudget === budget.id;
              return (
                <Grid item xs={12} md={4} key={budget.id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      border: isSelected
                        ? `1px solid ${theme.palette.primary.main}`
                        : "1px solid #E5E7EB",
                      boxShadow: isSelected ? 2 : 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: 2,
                      },
                    }}
                    onClick={() =>
                      setSelectedBudget(isSelected ? null : budget.id)
                    }
                  >
                    <CardContent
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "50%",
                          bgcolor: isSelected
                            ? theme.palette.primary.main
                            : theme.palette.primary.lighter ||
                              "rgba(28, 67, 132, 0.1)",
                          color: isSelected
                            ? "white"
                            : theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <budget.icon fontSize="medium" />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {budget.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {budget.description}
                        </Typography>
                      </Box>
                      {isSelected && (
                        <ArrowDownIcon
                          sx={{ color: theme.palette.primary.main }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Selected Budget Content */}
          {selectedBudget && (
            <Box
              sx={{
                transition: "all 0.3s ease",
                maxHeight: selectedBudget ? "2000px" : 0,
                opacity: selectedBudget ? 1 : 0,
                overflow: "hidden",
              }}
            >
              <Card sx={{ boxShadow: 2, overflow: "hidden", mb: 4 }}>
                <CardHeader
                  title={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          p: 0.75,
                          borderRadius: "50%",
                          bgcolor: "rgba(28, 67, 132, 0.1)",
                          display: "flex",
                        }}
                      >
                        {(() => {
                          const BudgetIcon = budgetTypes.find(
                            (b) => b.id === selectedBudget
                          )?.icon;
                          return BudgetIcon ? (
                            <BudgetIcon
                              fontSize="small"
                              sx={{ color: theme.palette.primary.main }}
                            />
                          ) : null;
                        })()}
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color={theme.palette.primary.dark}
                      >
                        {
                          budgetTypes.find((b) => b.id === selectedBudget)
                            ?.title
                        }
                      </Typography>
                    </Box>
                  }
                  action={
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      size="small"
                      sx={{
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      }}
                    >
                      Exportar PDF
                    </Button>
                  }
                  sx={{
                    bgcolor: "#EBF5FF",
                    py: 1.5,
                    px: 3,
                  }}
                />

                <Box>
                  <Tabs
                    value={activeView}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      "& .MuiTab-root": {
                        textTransform: "none",
                        minWidth: 100,
                        fontWeight: "medium",
                        transition: "all 0.3s ease",
                      },
                      "& .Mui-selected": {
                        color: `${theme.palette.primary.main} !important`,
                        fontWeight: "bold",
                      },
                      "& .MuiTabs-indicator": {
                        backgroundColor: theme.palette.primary.main,
                        height: 3,
                      },
                    }}
                  >
                    <Tab
                      label="Configuración Inicial"
                      value="config"
                      sx={{
                        color:
                          activeView === "config"
                            ? theme.palette.primary.main
                            : "text.secondary",
                      }}
                    />
                    <Tab
                      label="Vista operativa"
                      value="operational"
                      sx={{
                        color:
                          activeView === "operational"
                            ? theme.palette.primary.main
                            : "text.secondary",
                      }}
                    />
                  </Tabs>

                  <Box sx={{ p: 3 }}>
                    {/* Configuration View */}
                    {activeView === "config" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <Alert
                          severity="info"
                          icon={<InfoIcon />}
                          sx={{
                            bgcolor: "#EBF5FF",
                            color: theme.palette.primary.main,
                            border: "1px solid rgba(28, 67, 132, 0.2)",
                            "& .MuiAlert-icon": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <AlertTitle sx={{ fontWeight: "bold" }}>
                            Configuración del{" "}
                            {
                              budgetTypes.find((b) => b.id === selectedBudget)
                                ?.title
                            }
                          </AlertTitle>
                          Define el crecimiento mensual y la distribución por
                          décadas para todo el año. Estos valores no podrán
                          modificarse durante la operación.
                        </Alert>

                        <TableContainer
                          component={Paper}
                          elevation={0}
                          sx={{ border: "1px solid #E5E7EB" }}
                        >
                          <Table>
                            <TableHead sx={{ bgcolor: "#EBF5FF" }}>
                              <TableRow>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.dark,
                                  }}
                                >
                                  Mes
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.dark,
                                  }}
                                >
                                  % Crecimiento
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.dark,
                                  }}
                                >
                                  Década 1 (%)
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.dark,
                                  }}
                                >
                                  Década 2 (%)
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.dark,
                                  }}
                                >
                                  Década 3 (%)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Array.from({ length: 12 }).map((_, index) => {
                                const month = index + 1;
                                const distribution = decadeDistribution[index];
                                const total =
                                  distribution.d1 +
                                  distribution.d2 +
                                  distribution.d3;
                                const isInvalid = total !== 100;

                                return (
                                  <TableRow
                                    key={month}
                                    hover
                                    sx={{ "&:hover": { bgcolor: "#F3F4F6" } }}
                                  >
                                    <TableCell sx={{ fontWeight: "medium" }}>
                                      Mes {month}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <TextField
                                          type="number"
                                          value={growthRates[index]}
                                          onChange={(e) =>
                                            handleGrowthChange(
                                              month,
                                              e.target.value
                                            )
                                          }
                                          variant="outlined"
                                          size="small"
                                          sx={{ width: "100px" }}
                                          InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <PercentIcon
                                                  sx={{
                                                    fontSize: 18,
                                                    color: "text.secondary",
                                                  }}
                                                />
                                              </InputAdornment>
                                            ),
                                            endAdornment: (
                                              <InputAdornment position="end">
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                  }}
                                                >
                                                  <IconButton
                                                    size="small"
                                                    sx={{ p: 0 }}
                                                    onClick={() =>
                                                      handleGrowthChange(
                                                        month,
                                                        String(
                                                          growthRates[index] + 1
                                                        )
                                                      )
                                                    }
                                                  >
                                                    <ChevronUpIcon fontSize="small" />
                                                  </IconButton>
                                                  <IconButton
                                                    size="small"
                                                    sx={{ p: 0 }}
                                                    onClick={() =>
                                                      handleGrowthChange(
                                                        month,
                                                        String(
                                                          growthRates[index] - 1
                                                        )
                                                      )
                                                    }
                                                  >
                                                    <ChevronDownIcon fontSize="small" />
                                                  </IconButton>
                                                </Box>
                                              </InputAdornment>
                                            ),
                                          }}
                                        />
                                      </Box>
                                    </TableCell>
                                    {["d1", "d2", "d3"].map((decade) => (
                                      <TableCell key={decade} align="center">
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <TextField
                                            type="number"
                                            value={distribution[decade]}
                                            onChange={(e) =>
                                              handleDecadeChange(
                                                month,
                                                decade,
                                                e.target.value
                                              )
                                            }
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                              width: "100px",
                                              "& .MuiOutlinedInput-root": {
                                                borderColor: isInvalid
                                                  ? "error.main"
                                                  : undefined,
                                              },
                                            }}
                                            error={isInvalid}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment position="start">
                                                  <PercentIcon
                                                    sx={{
                                                      fontSize: 18,
                                                      color: "text.secondary",
                                                    }}
                                                  />
                                                </InputAdornment>
                                              ),
                                              endAdornment: (
                                                <InputAdornment position="end">
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                    }}
                                                  >
                                                    <IconButton
                                                      size="small"
                                                      sx={{ p: 0 }}
                                                      onClick={() =>
                                                        handleDecadeChange(
                                                          month,
                                                          decade,
                                                          String(
                                                            distribution[
                                                              decade
                                                            ] + 1
                                                          )
                                                        )
                                                      }
                                                    >
                                                      <ChevronUpIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                      size="small"
                                                      sx={{ p: 0 }}
                                                      onClick={() =>
                                                        handleDecadeChange(
                                                          month,
                                                          decade,
                                                          String(
                                                            distribution[
                                                              decade
                                                            ] - 1
                                                          )
                                                        )
                                                      }
                                                    >
                                                      <ChevronDownIcon fontSize="small" />
                                                    </IconButton>
                                                  </Box>
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                        </Box>
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Box
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => setActiveView("operational")}
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              "&:hover": {
                                bgcolor: theme.palette.primary.dark,
                              },
                            }}
                          >
                            Guardar y Continuar
                          </Button>
                        </Box>
                      </Box>
                    )}

                    {/* Operational View */}
                    {activeView === "operational" && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        {/* Month selector */}
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor: "#EBF5FF",
                            border: "1px solid rgba(28, 67, 132, 0.2)",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            <CalendarIcon
                              sx={{ color: theme.palette.primary.main }}
                            />
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              color={theme.palette.primary.main}
                            >
                              Seleccione un mes
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              overflowX: "auto",
                              pb: 1,
                            }}
                          >
                            {Array.from({ length: 12 }).map((_, index) => {
                              const month = index + 1;
                              return (
                                <Button
                                  key={month}
                                  variant={
                                    selectedMonth === month
                                      ? "contained"
                                      : "outlined"
                                  }
                                  onClick={() => setSelectedMonth(month)}
                                  sx={{
                                    minWidth: "auto",
                                    bgcolor:
                                      selectedMonth === month
                                        ? theme.palette.primary.main
                                        : "transparent",
                                    color:
                                      selectedMonth === month
                                        ? "white"
                                        : theme.palette.primary.main,
                                    borderColor: theme.palette.primary.main,
                                    "&:hover": {
                                      bgcolor:
                                        selectedMonth === month
                                          ? theme.palette.primary.dark
                                          : "rgba(28, 67, 132, 0.1)",
                                    },
                                  }}
                                >
                                  Mes {month}
                                </Button>
                              );
                            })}
                          </Box>
                        </Paper>

                        <Alert
                          severity="info"
                          icon={<InfoIcon />}
                          sx={{
                            bgcolor: "#EBF5FF",
                            color: theme.palette.primary.main,
                            border: "1px solid rgba(28, 67, 132, 0.2)",
                            "& .MuiAlert-icon": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <AlertTitle sx={{ fontWeight: "bold" }}>
                            Configuración de Ventas Iniciales
                          </AlertTitle>
                          Establece las unidades a vender de cada producto para
                          el Mes {selectedMonth}. Los meses siguientes se
                          calcularán automáticamente según el crecimiento
                          configurado.
                        </Alert>

                        <Card
                          sx={{ boxShadow: 1, border: "1px solid #E5E7EB" }}
                        >
                          <CardHeader
                            title={
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                color={theme.palette.primary.dark}
                              >
                                Datos del Mes {selectedMonth}
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
                                Crecimiento: {growthRates[selectedMonth - 1]}% |
                                D1: {decadeDistribution[selectedMonth - 1].d1}%
                                | D2: {decadeDistribution[selectedMonth - 1].d2}
                                % | D3:{" "}
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
                                    <Typography
                                      variant="subtitle1"
                                      fontWeight="medium"
                                    >
                                      {product.name}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      Unidades Totales
                                    </Typography>
                                    <TextField
                                      type="number"
                                      value={
                                        monthlyData[selectedMonth]?.[
                                          product.id
                                        ] || product.defaultValue
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
                                            <PackageIcon
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

                        <Card
                          sx={{ boxShadow: 2, border: "1px solid #E5E7EB" }}
                        >
                          <CardHeader
                            title={
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                color={theme.palette.primary.dark}
                              >
                                Resultados Calculados
                              </Typography>
                            }
                            action={
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DownloadIcon />}
                                sx={{
                                  color: theme.palette.primary.main,
                                  borderColor: "rgba(28, 67, 132, 0.3)",
                                  "&:hover": {
                                    bgcolor: "rgba(28, 67, 132, 0.1)",
                                    borderColor: theme.palette.primary.main,
                                  },
                                }}
                              >
                                Exportar PDF
                              </Button>
                            }
                            sx={{
                              bgcolor: "#EBF5FF",
                              py: 1.5,
                              px: 2,
                            }}
                          />
                          <TableContainer>
                            <Table>
                              <TableHead sx={{ bgcolor: "#F3F4F6" }}>
                                <TableRow>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.dark,
                                      width: "200px",
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
                                    Década 1
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.dark,
                                    }}
                                  >
                                    Década 2
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.dark,
                                    }}
                                  >
                                    Década 3
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.dark,
                                    }}
                                  >
                                    Total
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {products.map((product) => {
                                  const values = calculateDecadeValues(
                                    selectedMonth,
                                    product.id
                                  );
                                  return (
                                    <TableRow key={product.id} hover>
                                      <TableCell sx={{ fontWeight: "medium" }}>
                                        {product.name}
                                      </TableCell>
                                      <TableCell>
                                        {formatNumber(values.d1)}
                                      </TableCell>
                                      <TableCell>
                                        {formatNumber(values.d2)}
                                      </TableCell>
                                      <TableCell>
                                        {formatNumber(values.d3)}
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        sx={{
                                          fontWeight: "medium",
                                          color: theme.palette.primary.main,
                                        }}
                                      >
                                        {formatNumber(values.total)}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                                <TableRow
                                  sx={{
                                    bgcolor: "#EBF5FF",
                                    fontWeight: "bold",
                                    borderTop:
                                      "2px solid rgba(28, 67, 132, 0.2)",
                                  }}
                                >
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.dark,
                                    }}
                                  >
                                    Total
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.main,
                                    }}
                                  >
                                    {formatNumber(
                                      products.reduce(
                                        (sum, product) =>
                                          sum +
                                          calculateDecadeValues(
                                            selectedMonth,
                                            product.id
                                          ).d1,
                                        0
                                      )
                                    )}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.main,
                                    }}
                                  >
                                    {formatNumber(
                                      products.reduce(
                                        (sum, product) =>
                                          sum +
                                          calculateDecadeValues(
                                            selectedMonth,
                                            product.id
                                          ).d2,
                                        0
                                      )
                                    )}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.main,
                                    }}
                                  >
                                    {formatNumber(
                                      products.reduce(
                                        (sum, product) =>
                                          sum +
                                          calculateDecadeValues(
                                            selectedMonth,
                                            product.id
                                          ).d3,
                                        0
                                      )
                                    )}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{
                                      fontWeight: "bold",
                                      color: theme.palette.primary.main,
                                    }}
                                  >
                                    {formatNumber(
                                      products.reduce(
                                        (sum, product) =>
                                          sum +
                                          calculateDecadeValues(
                                            selectedMonth,
                                            product.id
                                          ).total,
                                        0
                                      )
                                    )}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Card>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Card>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
