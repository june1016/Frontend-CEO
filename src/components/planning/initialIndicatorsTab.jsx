import React, { useState, useRef, useEffect } from "react";
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
  Button,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Paper,
  Avatar,
  useTheme,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart as BarChartIcon,
  Assessment as AssessmentIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as MoneyIcon,
  Business as BusinessIcon,
  ShowChart as ShowChartIcon,
  Help as HelpIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Calculate as CalculateIcon,
  CheckCircle as CheckCircleIcon,
  AccountBalanceWallet as WalletIcon,
  Percent as PercentIcon,
  DonutLarge as DonutLargeIcon,
  Work as WorkIcon,
  StackedBarChart as StackedBarChartIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";

// Financial indicator cards data
const indicatorCards = [
  {
    id: "razon-corriente",
    title: "Razón corriente",
    value: 2.5,
    displayValue: "2.5",
    description: "Óptimo",
    type: "donut",
    color: "#00BFA6",
    secondaryColor: "#E6E6E6",
    legend: [
      { name: "Óptimo", color: "#00BFA6" },
      { name: "Restante", color: "#E6E6E6" },
    ],
    icon: WalletIcon,
    trend: "up",
    trendValue: "+0.3",
    info: "Mide la capacidad de la empresa para pagar sus obligaciones a corto plazo",
  },
  {
    id: "prueba-acida",
    title: "Prueba Ácida",
    value: 3.0,
    displayValue: "3.0",
    description: "Solvencia alta",
    type: "donut",
    color: "#4361EE",
    secondaryColor: "#E6E6E6",
    legend: [
      { name: "Solvencia", color: "#4361EE" },
      { name: "Restante", color: "#E6E6E6" },
    ],
    icon: DonutLargeIcon,
    trend: "up",
    trendValue: "+0.5",
    info: "Mide la capacidad de pago inmediata sin considerar inventarios",
  },
  {
    id: "margen-bruto",
    title: "Margen Bruto",
    value: 45,
    displayValue: "45%",
    description: "Rentabilidad sobre ventas",
    type: "bar",
    color: "#FEC53D",
    icon: TrendingUpIcon,
    trend: "up",
    trendValue: "+2%",
    info: "Porcentaje de ganancia después de descontar costos directos",
  },
  {
    id: "margen-operacional",
    title: "Margen Operacional",
    value: 45,
    displayValue: "45%",
    description: "Rentabilidad sobre ventas",
    type: "bar",
    color: "#FEC53D",
    icon: BarChartIcon,
    trend: "up",
    trendValue: "+5%",
    info: "Porcentaje de ganancia después de descontar costos y gastos operativos",
  },
  {
    id: "margen-neto",
    title: "Margen Neto",
    value: 19,
    displayValue: "19%",
    description: "Rentabilidad neta",
    type: "bar",
    color: "#FEC53D",
    icon: PercentIcon,
    trend: "down",
    trendValue: "-1%",
    info: "Porcentaje de ganancia final después de todos los gastos e impuestos",
  },
  {
    id: "nivel-endeudamiento",
    title: "Nivel de Endeudamiento",
    value: 42,
    displayValue: "42%",
    description: "Nivel moderado",
    type: "donut",
    color: "#FF6B6B",
    secondaryColor: "#E6E6E6",
    legend: [
      { name: "Óptimo", color: "#FF6B6B" },
      { name: "Restante", color: "#E6E6E6" },
    ],
    icon: BusinessIcon,
    trend: "down",
    trendValue: "-3%",
    info: "Porcentaje de activos financiados con deuda",
  },
  {
    id: "rentabilidad-patrimonio",
    title: "Rentabilidad del Patrimonio",
    value: 26,
    displayValue: "26%",
    description: "Retorno sobre patrimonio",
    type: "bar",
    color: "#8280FF",
    icon: ShowChartIcon,
    trend: "up",
    trendValue: "+4%",
    info: "Retorno sobre la inversión de los accionistas",
  },
  {
    id: "rentabilidad-activo",
    title: "Rentabilidad del Activo",
    value: 31,
    displayValue: "31%",
    description: "Retorno sobre activos",
    type: "bar",
    color: "#E13BA3",
    icon: MoneyIcon,
    trend: "up",
    trendValue: "+2%",
    info: "Eficiencia en el uso de los activos para generar ganancias",
  },
];

// Product margin data
const productMarginData = [
  { name: "Alfaros", value: 35, color: "#0AB39C" },
  { name: "Betacos", value: 35, color: "#165BAA" },
  { name: "Gamaroles", value: 35, color: "#F1963A" },
];

// Financial indicators table data
const financialIndicatorsData = [
  {
    indicator: "Ingresos por ventas",
    value: 115000000,
    description: "Total de ingresos generados por la venta de productos",
    icon: MoneyIcon,
    trend: "up",
    trendValue: "+8%",
  },
  {
    indicator: "Costos totales",
    value: 41650000,
    description: "Suma de todos los costos directos de producción",
    icon: AccountBalanceIcon,
    trend: "up",
    trendValue: "+3%",
  },
  {
    indicator: "Utilidad bruta",
    value: 73350000,
    description: "Ingresos menos costos directos",
    icon: TrendingUpIcon,
    trend: "up",
    trendValue: "+12%",
  },
  {
    indicator: "Gastos Generales",
    value: 38560000,
    description: "Gastos administrativos y operativos",
    icon: StackedBarChartIcon,
    trend: "up",
    trendValue: "+5%",
  },
  {
    indicator: "Utilidad operacional",
    value: 34790000,
    description: "Utilidad después de gastos operativos",
    icon: ShowChartIcon,
    trend: "up",
    trendValue: "+15%",
  },
  {
    indicator: "Impuestos",
    value: 11480700,
    description: "Impuestos sobre la renta y complementarios",
    icon: BusinessIcon,
    trend: "up",
    trendValue: "+2%",
  },
  {
    indicator: "Utilidad neta",
    value: 23309300,
    description: "Utilidad final después de todos los gastos e impuestos",
    icon: WalletIcon,
    trend: "up",
    trendValue: "+18%",
  },
  {
    indicator: "EBITDA",
    value: 18000000,
    description:
      "Ganancias antes de intereses, impuestos, depreciación y amortización",
    icon: CalculateIcon,
    trend: "up",
    trendValue: "+7%",
  },
  {
    indicator: "Capital de trabajo",
    value: 8500000,
    description: "Recursos disponibles para operar a corto plazo",
    icon: WorkIcon,
    trend: "up",
    trendValue: "+4%",
  },
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: "white",
          border: "1px solid #eee",
        }}
      >
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="body2" color="text.secondary">
          {`${payload[0].name}: ${payload[0].value}%`}
        </Typography>
      </Paper>
    );
  }

  return null;
};

const InfoTooltip = ({ title }) => (
  <Tooltip
    title={title}
    arrow
    placement="top"
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
  >
    <IconButton size="small">
      <HelpIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

export default function InitialIndicatorsTab() {
  const theme = useTheme();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const carouselRef = useRef(null);

  // Adjust visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setVisibleCards(4);
      } else if (window.innerWidth >= 1280) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (startIndex + visibleCards < indicatorCards.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Estilo para animación fadeIn
  const fadeInAnimation = {
    "@keyframes fadeIn": {
      from: {
        opacity: 0,
        transform: "translateY(5px)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    animation: "fadeIn 0.3s ease-in-out",
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
              <AssessmentIcon />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 0.5, color: "primary.main" }}
              >
                Indicadores Financieros Iniciales
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                Visualice los indicadores financieros clave que reflejan el
                estado inicial de su empresa. Estos valores servirán como punto
                de referencia para establecer sus metas en la sección de
                Indicadores Objetivo.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleChangeTab}
                aria-label="indicadores financieros tabs"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                <Tab
                  label="Indicadores Clave"
                  sx={{
                    textTransform: "none",
                    fontWeight: activeTab === 0 ? 600 : 400,
                    color:
                      activeTab === 0
                        ? theme.palette.primary.main
                        : "text.secondary",
                  }}
                />
                <Tab
                  label="Detalles Financieros"
                  sx={{
                    textTransform: "none",
                    fontWeight: activeTab === 1 ? 600 : 400,
                    color:
                      activeTab === 1
                        ? theme.palette.primary.main
                        : "text.secondary",
                  }}
                />
              </Tabs>

              {activeTab === 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {startIndex + 1}-
                    {Math.min(startIndex + visibleCards, indicatorCards.length)}{" "}
                    de {indicatorCards.length}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={handlePrev}
                      disabled={startIndex === 0}
                      sx={{
                        borderRadius: "50%",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleNext}
                      disabled={
                        startIndex + visibleCards >= indicatorCards.length
                      }
                      sx={{
                        borderRadius: "50%",
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Contenido de Pestañas */}
            <Box sx={{ p: 3 }}>
              {/* Panel de Indicadores Clave */}
              {activeTab === 0 && (
                <Box>
                  {/* Carousel de Indicadores */}
                  <Grid ref={carouselRef} container spacing={3} sx={{ mb: 3 }}>
                    {indicatorCards
                      .slice(startIndex, startIndex + visibleCards)
                      .map((card) => {
                        const Icon = card.icon;
                        return (
                          <Grid item xs={12} md={6} lg={4} xl={3} key={card.id}>
                            <Card
                              sx={{
                                height: "100%",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  boxShadow: 3,
                                  borderColor: "grey.300",
                                },
                              }}
                            >
                              <CardHeader
                                title={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      <Avatar
                                        sx={{
                                          bgcolor: `${card.color}20`,
                                          color: card.color,
                                          width: 38,
                                          height: 38,
                                        }}
                                      >
                                        <Icon fontSize="small" />
                                      </Avatar>
                                      <Box>
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight={500}
                                        >
                                          {card.title}
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          {card.description}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        setSelectedIndicator(
                                          selectedIndicator === card.id
                                            ? null
                                            : card.id
                                        )
                                      }
                                    >
                                      <HelpIcon
                                        fontSize="small"
                                        color="action"
                                      />
                                    </IconButton>
                                  </Box>
                                }
                                sx={{
                                  pb: 0,
                                  "& .MuiCardHeader-action": {
                                    alignSelf: "flex-start",
                                    marginTop: 0,
                                    marginRight: 0,
                                  },
                                }}
                              />

                              {selectedIndicator === card.id && (
                                <Box
                                  sx={{
                                    mx: 2,
                                    mt: 2,
                                    p: 1.5,
                                    bgcolor: "grey.100",
                                    borderRadius: 1,
                                    ...fadeInAnimation,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {card.info}
                                  </Typography>
                                </Box>
                              )}

                              <CardContent>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 180,
                                  }}
                                >
                                  {card.type === "donut" && (
                                    <Box
                                      sx={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Typography
                                          variant="h4"
                                          fontWeight="bold"
                                        >
                                          {card.displayValue}
                                        </Typography>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 0.5,
                                            color:
                                              card.trend === "up"
                                                ? "success.main"
                                                : "error.main",
                                          }}
                                        >
                                          {card.trend === "up" ? (
                                            <TrendingUpIcon fontSize="small" />
                                          ) : (
                                            <TrendingDownIcon fontSize="small" />
                                          )}
                                          <Typography
                                            variant="caption"
                                            fontWeight="medium"
                                          >
                                            {card.trendValue}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box sx={{ width: 180, height: 180 }}>
                                        <ResponsiveContainer>
                                          <PieChart>
                                            <Pie
                                              data={[
                                                {
                                                  name: card.legend[0].name,
                                                  value: card.value,
                                                },
                                                {
                                                  name: card.legend[1].name,
                                                  value: 100 - card.value,
                                                },
                                              ]}
                                              cx="50%"
                                              cy="50%"
                                              innerRadius={60}
                                              outerRadius={80}
                                              startAngle={90}
                                              endAngle={-270}
                                              dataKey="value"
                                              strokeWidth={0}
                                            >
                                              <Cell fill={card.color} />
                                              <Cell
                                                fill={card.secondaryColor}
                                              />
                                            </Pie>
                                          </PieChart>
                                        </ResponsiveContainer>
                                      </Box>
                                    </Box>
                                  )}

                                  {card.type === "bar" && (
                                    <Box
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                          mb: 1,
                                        }}
                                      >
                                        <Typography
                                          variant="h4"
                                          fontWeight="bold"
                                        >
                                          {card.displayValue}
                                        </Typography>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color:
                                              card.trend === "up"
                                                ? "success.main"
                                                : "error.main",
                                          }}
                                        >
                                          {card.trend === "up" ? (
                                            <TrendingUpIcon fontSize="small" />
                                          ) : (
                                            <TrendingDownIcon fontSize="small" />
                                          )}
                                          <Typography
                                            variant="caption"
                                            fontWeight="medium"
                                          >
                                            {card.trendValue}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box sx={{ width: "100%", height: 120 }}>
                                        <ResponsiveContainer>
                                          <BarChart
                                            data={[
                                              {
                                                name: card.title,
                                                value: card.value,
                                              },
                                            ]}
                                            margin={{
                                              top: 10,
                                              right: 10,
                                              left: 10,
                                              bottom: 10,
                                            }}
                                          >
                                            <CartesianGrid
                                              strokeDasharray="3 3"
                                              vertical={false}
                                              stroke="#f0f0f0"
                                            />
                                            <XAxis
                                              dataKey="name"
                                              tick={false}
                                              axisLine={false}
                                            />
                                            <YAxis
                                              domain={[0, 100]}
                                              ticks={[0, 50, 100]}
                                              axisLine={false}
                                              tickLine={false}
                                              tick={{
                                                fontSize: 12,
                                                fill: "#888",
                                              }}
                                            />
                                            <RechartsTooltip
                                              content={<CustomTooltip />}
                                            />
                                            <Bar
                                              dataKey="value"
                                              fill={card.color}
                                              radius={[4, 4, 0, 0]}
                                              animationDuration={1500}
                                              barSize={60}
                                            />
                                            <ReferenceLine
                                              y={50}
                                              stroke="#ddd"
                                              strokeDasharray="3 3"
                                            />
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </Box>
                                    </Box>
                                  )}
                                </Box>

                                {card.type === "donut" && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      mt: 2,
                                      gap: 3,
                                    }}
                                  >
                                    {card.legend.map((item, index) => (
                                      <Box
                                        key={index}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 0.5,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            bgcolor: item.color,
                                          }}
                                        />
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          {item.name}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                  </Grid>

                  {/* Margen de Utilidad sobre Costo Chart */}
                  <Card sx={{ mt: 4 }}>
                    <CardHeader
                      title={
                        <Typography variant="h6" fontWeight={500}>
                          Margen de Utilidad sobre Costo
                        </Typography>
                      }
                      subheader="Por producto"
                      action={
                        <InfoTooltip title="Margen de utilidad por tipo de producto, calculado sobre el costo de producción" />
                      }
                    />
                    <CardContent>
                      <Box sx={{ height: 300, mb: 3 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={productMarginData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 20,
                            }}
                            barGap={30}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: "#666" }}
                            />
                            <YAxis
                              domain={[0, 60]}
                              ticks={[0, 10, 20, 30, 40, 50, 60]}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: "#666" }}
                            />
                            <RechartsTooltip
                              content={<CustomTooltip />}
                              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                            />
                            <Bar
                              dataKey="value"
                              name="Margen (%)"
                              radius={[4, 4, 0, 0]}
                              animationDuration={1500}
                              barSize={60}
                            >
                              {productMarginData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Bar>
                            <ReferenceLine
                              y={30}
                              stroke="#ddd"
                              strokeDasharray="3 3"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 4,
                        }}
                      >
                        {productMarginData.map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: 1,
                                backgroundColor: item.color,
                              }}
                            />
                            <Typography variant="body2" fontWeight={500}>
                              {item.name}: {item.value}%
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Panel de Detalles Financieros */}
              {activeTab === 1 && (
                <Card>
                  <CardHeader
                    title={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CalculateIcon fontSize="small" color="primary" />
                        <Typography variant="h6" fontWeight={500}>
                          Tabla Detallada de Indicadores Financieros
                        </Typography>
                      </Box>
                    }
                    subheader="Resumen de los principales indicadores financieros y su desempeño"
                  />
                  <CardContent>
                    <TableContainer component={Paper} variant="outlined">
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: "grey.100" }}>
                          <TableRow>
                            <TableCell sx={{ width: "50%", fontWeight: 600 }}>
                              Indicador
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                              Tendencia
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="right">
                              Valor (COP)
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {financialIndicatorsData.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <TableRow
                                key={index}
                                hover
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  transition: "background-color 0.2s",
                                }}
                              >
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 2,
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        bgcolor: "grey.100",
                                        width: 36,
                                        height: 36,
                                      }}
                                    >
                                      <Icon
                                        sx={{
                                          color: "text.secondary",
                                          fontSize: 18,
                                        }}
                                      />
                                    </Avatar>
                                    <Box>
                                      <Typography
                                        variant="body2"
                                        fontWeight={500}
                                      >
                                        {item.indicator}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                      >
                                        {item.description}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={
                                      item.trend === "up" ? (
                                        <TrendingUpIcon fontSize="small" />
                                      ) : (
                                        <TrendingDownIcon fontSize="small" />
                                      )
                                    }
                                    label={item.trendValue}
                                    size="small"
                                    sx={{
                                      bgcolor:
                                        item.trend === "up"
                                          ? "success.light"
                                          : "error.light",
                                      color:
                                        item.trend === "up"
                                          ? "success.dark"
                                          : "error.dark",
                                      fontWeight: 500,
                                      borderRadius: 1,
                                      border: "none",
                                      "& .MuiChip-icon": {
                                        color:
                                          item.trend === "up"
                                            ? "success.dark"
                                            : "error.dark",
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body2" fontWeight={500}>
                                    {formatCurrency(item.value)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
