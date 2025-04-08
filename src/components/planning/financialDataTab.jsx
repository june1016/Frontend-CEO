import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Chip,
  Avatar,
  Paper,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Wallet,
  Receipt,
  Apartment,
  Inventory,
  Computer,
  MenuBook,
  Build,
  EmojiEvents,
  CreditCard,
  Description,
  AccountBalance,
  Work,
  Savings,
  AttachMoney,
  Info as InfoIcon,
  ReceiptLong,
  Assignment,
  Category,
  LocalShipping,
  ShoppingBasket,
} from "@mui/icons-material";
import axiosInstance from "../../services/api/axiosConfig";

const iconMapping = {
  Wallet,
  Receipt,
  Apartment,
  Inventory,
  Computer,
  MenuBook,
  Build,
  EmojiEvents,
  CreditCard,
  Description,
  AccountBalance,
  Work,
  Savings,
  AttachMoney,
};

// Configuración de colores por categoría
const categoryColors = {
  Activos: {
    bg: "#e6f7ee",
    text: "#0f766e",
    light: "#d1fae5",
    avatar: "#10b981",
  },
  Pasivos: {
    bg: "#fee2e2",
    text: "#b91c1c",
    light: "#fecaca",
    avatar: "#ef4444",
  },
  Patrimonio: {
    bg: "#dbeafe",
    text: "#1e40af",
    light: "#bfdbfe",
    avatar: "#3b82f6",
  },
  Otros: {
    bg: "#f3f4f6",
    text: "#4b5563",
    light: "#e5e7eb",
    avatar: "#6b7280",
  },
};

// Función para comparar valores para ordenamiento
function descendingComparator(a, b, orderBy) {
  if (!a || !b) return 0;

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Función para ordenar el array estable
function stableSort(array, comparator) {
  if (!Array.isArray(array) || array.length === 0) return [];

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function FinancialDataTab() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para el Estado de Resultados con valores prellenados
  const [incomeStatement] = useState({
    sales: {
      alfaros: "850000000",
      betacos: "650000000",
      gamaroles: "450000000",
    },
    costs: {
      alfaros: "535500000",
      betacos: "396500000",
      gamaroles: "265500000",
    },
    expenses: {
      administration: "175500000",
      sales: "195000000",
      other: "97500000",
    },
    otherItems: {
      financialExpenses: "78000000",
      depreciationAmortization: "97500000",
    },
    taxes: "27250000",
  });

  // Estados para el Inventario Inicial con valores prellenados
  const [rawMaterials] = useState([
    {
      code: "A1",
      description: "Material A1",
      quantity: "2500",
      unit: "LIBRAS",
      costPerUnit: "8000",
      totalValue: 20000000,
    },
    {
      code: "A2",
      description: "Material A2",
      quantity: "1500",
      unit: "LITROS",
      costPerUnit: "12000",
      totalValue: 18000000,
    },
    {
      code: "A3",
      description: "Material A3",
      quantity: "1800",
      unit: "KILOS",
      costPerUnit: "9500",
      totalValue: 17100000,
    },
    {
      code: "A4",
      description: "Material A4",
      quantity: "2200",
      unit: "UNIDADES",
      costPerUnit: "7500",
      totalValue: 16500000,
    },
    {
      code: "A5",
      description: "Material A5",
      quantity: "1200",
      unit: "UNIDADES",
      costPerUnit: "11000",
      totalValue: 13200000,
    },
  ]);

  const [finishedProducts] = useState([
    {
      product: "Alfaros",
      quantity: "320",
      costPerUnit: "139500",
      totalValue: 44640000,
    },
    {
      product: "Betacos",
      quantity: "250",
      costPerUnit: "132000",
      totalValue: 33000000,
    },
    {
      product: "Gamaroles",
      quantity: "180",
      costPerUnit: "123000",
      totalValue: 22140000,
    },
  ]);

  // Manejar cambios de pestañas
  const handleTabChange = (event, newValue) => {
    try {
      setTabValue(newValue);
    } catch (error) {
      console.error("Error al cambiar de pestaña:", error);
    }
  };

  useEffect(() => {
    const getFinancialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/financialdata/initialdata");

        // Verificar que la respuesta tenga la estructura esperada
        if (
          response &&
          response.data &&
          Array.isArray(response.data.financialData)
        ) {
          setFinancialData(response.data.financialData);
        } else {
          // Crear un array vacío si no hay datos o la estructura es incorrecta
          console.warn(
            "La estructura de datos recibida no es la esperada:",
            response.data
          );
          setFinancialData([]);
        }
      } catch (error) {
        console.error("Error al obtener datos financieros:", error);
        setError(error.message || "Error al cargar los datos financieros");
        setFinancialData([]);
      } finally {
        setLoading(false);
      }
    };

    getFinancialData();
  }, []);

  // Handler para solicitar ordenamiento
  const handleRequestSort = (property) => {
    try {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    } catch (error) {
      console.error("Error al ordenar datos:", error);
    }
  };

  // Calcular totales por categoría
  const totals = useMemo(() => {
    try {
      if (!Array.isArray(financialData)) return {};

      return financialData.reduce((acc, item) => {
        if (!item || typeof item !== "object") return acc;

        const category = item.category || "Otros";
        // Convertimos a número para asegurarnos de que no se concatene
        const amount = parseFloat(item.amount || 0);

        if (isNaN(amount)) return acc;

        // Si la categoría ya existe, sumamos el amount, si no, la inicializamos
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error al calcular totales por categoría:", error);
      return {};
    }
  }, [financialData]);

  // Formatear moneda
  const formatCurrency = (amount) => {
    try {
      // Asegurarse de que amount sea un número válido
      const validAmount = Number(amount);
      if (isNaN(validAmount)) return "$0";

      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(validAmount);
    } catch (error) {
      console.error("Error al formatear moneda:", error);
      return "$0";
    }
  };

  // Formatear en millones
  const formatMillions = (amount) => {
    try {
      // Asegurarse de que amount sea un número válido
      const validAmount = Number(amount);
      if (isNaN(validAmount)) return "0M";

      return `${Math.round(validAmount / 1000000)}M`;
    } catch (error) {
      console.error("Error al formatear en millones:", error);
      return "0M";
    }
  };

  // Obtener icono por categoría
  const getCategoryIcon = (category) => {
    try {
      switch (category) {
        case "Activos":
          return <Wallet />;
        case "Pasivos":
          return <Apartment />;
        case "Patrimonio":
          return <Work />;
        case "Otros":
          return <AttachMoney />;
        default:
          return <Wallet />;
      }
    } catch (error) {
      console.error("Error al obtener icono de categoría:", error);
      return <Wallet />;
    }
  };

  // Calcular totales para el estado de resultados
  const incomeStatementTotals = useMemo(() => {
    try {
      // Asegurarse de que todos los objetos existen
      const sales = incomeStatement.sales || {};
      const costs = incomeStatement.costs || {};
      const expenses = incomeStatement.expenses || {};
      const otherItems = incomeStatement.otherItems || {};

      // Calcular ventas totales
      const totalSales = Object.values(sales).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular costos totales
      const totalCosts = Object.values(costs).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular utilidad bruta
      const grossProfit = totalSales - totalCosts;

      // Calcular gastos operacionales totales
      const totalOperatingExpenses = Object.values(expenses).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular utilidad operacional
      const operatingProfit = grossProfit - totalOperatingExpenses;

      // Calcular otros gastos totales
      const totalOtherExpenses = Object.values(otherItems).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular utilidad antes de impuestos
      const profitBeforeTaxes = operatingProfit - totalOtherExpenses;

      // Calcular impuestos
      const taxes = parseFloat(incomeStatement.taxes) || 0;

      // Calcular utilidad neta
      const netProfit = profitBeforeTaxes - taxes;

      // Calcular EBITDA
      const ebitda =
        operatingProfit +
        (parseFloat(otherItems.depreciationAmortization) || 0);

      return {
        totalSales,
        totalCosts,
        grossProfit,
        totalOperatingExpenses,
        operatingProfit,
        totalOtherExpenses,
        profitBeforeTaxes,
        taxes,
        netProfit,
        ebitda,
      };
    } catch (error) {
      console.error(
        "Error al calcular totales del estado de resultados:",
        error
      );
      // Retornar valores predeterminados
      return {
        totalSales: 0,
        totalCosts: 0,
        grossProfit: 0,
        totalOperatingExpenses: 0,
        operatingProfit: 0,
        totalOtherExpenses: 0,
        profitBeforeTaxes: 0,
        taxes: 0,
        netProfit: 0,
        ebitda: 0,
      };
    }
  }, [incomeStatement]);

  // Calcular totales para el inventario
  const inventoryTotals = useMemo(() => {
    try {
      if (!Array.isArray(rawMaterials) || !Array.isArray(finishedProducts)) {
        return {
          rawMaterialsTotal: 0,
          finishedProductsTotal: 0,
          inventoryTotal: 0,
        };
      }

      const rawMaterialsTotal = rawMaterials.reduce((sum, material) => {
        if (!material || typeof material !== "object") return sum;
        return sum + (parseFloat(material.totalValue) || 0);
      }, 0);

      const finishedProductsTotal = finishedProducts.reduce((sum, product) => {
        if (!product || typeof product !== "object") return sum;
        return sum + (parseFloat(product.totalValue) || 0);
      }, 0);

      return {
        rawMaterialsTotal,
        finishedProductsTotal,
        inventoryTotal: rawMaterialsTotal + finishedProductsTotal,
      };
    } catch (error) {
      console.error("Error al calcular totales del inventario:", error);
      // Retornar valores predeterminados
      return {
        rawMaterialsTotal: 0,
        finishedProductsTotal: 0,
        inventoryTotal: 0,
      };
    }
  }, [rawMaterials, finishedProducts]);

  // Renderizar contenido de tab basado en el valor actual
  const renderTabContent = () => {
    try {
      if (tabValue === 0) {
        return renderGeneralDataTab();
      } else if (tabValue === 1) {
        return renderIncomeStatementTab();
      } else if (tabValue === 2) {
        return renderInventoryTab();
      }
      return null;
    } catch (error) {
      console.error("Error al renderizar contenido del tab:", error);
      return (
        <Card>
          <CardContent>
            <Typography color="error">
              Error al cargar este contenido. Por favor, intente nuevamente.
            </Typography>
          </CardContent>
        </Card>
      );
    }
  };

  // Renderizar tab de datos generales
  const renderGeneralDataTab = () => {
    return (
      <>
        {/* Tarjetas de KPI */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(totals).map(([category, total]) => (
            <Grid item xs={12} sm={6} md={3} key={category}>
              <Card
                sx={{
                  bgcolor: categoryColors[category]?.bg || "#f0f7ff",
                  boxShadow: "none",
                  border: "1px solid",
                  borderColor: categoryColors[category]?.light || "#e5e7eb",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {category}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                        {formatMillions(total)}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: categoryColors[category]?.avatar || "#6b7280",
                        color: "white",
                        width: 48,
                        height: 48,
                      }}
                    >
                      {getCategoryIcon(category)}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tabla Detallada con ordenamiento */}
        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleRequestSort("title")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      color: "white",
                      "&.Mui-active": {
                        color: "white",
                      },
                      fontWeight: 600,
                    }}
                  >
                    Título
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <TableSortLabel
                    active={orderBy === "category"}
                    direction={orderBy === "category" ? order : "asc"}
                    onClick={() => handleRequestSort("category")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      color: "white",
                      "&.Mui-active": {
                        color: "white",
                      },
                      fontWeight: 600,
                    }}
                  >
                    Categoría
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  <TableSortLabel
                    active={orderBy === "amount"}
                    direction={orderBy === "amount" ? order : "asc"}
                    onClick={() => handleRequestSort("amount")}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      color: "white",
                      "&.Mui-active": {
                        color: "white",
                      },
                      fontWeight: 600,
                    }}
                  >
                    Valor (COP)
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(financialData, getComparator(order, orderBy)).map(
                (item, index) => {
                  const IconComponent = iconMapping[item.icon] || Computer;
                  return (
                    <TableRow key={`${item.title || "item"}-${index}`} hover>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <IconComponent
                            sx={{ color: "text.secondary", fontSize: 20 }}
                          />
                          <Typography variant="body2">
                            {item.title || "Sin título"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.category || "Otros"}
                          size="small"
                          sx={{
                            bgcolor:
                              categoryColors[item.category]?.light || "#e5e7eb",
                            color:
                              categoryColors[item.category]?.text || "#4b5563",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={500}>
                          {formatCurrency(item.amount)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
              {financialData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  // Renderizar tab de estado de resultados
  const renderIncomeStatementTab = () => {
    return (
      <Box>
        {/* Tarjeta informativa */}
        <Card sx={{ mb: 4, bgcolor: "#f0f7ff", border: "none" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                }}
              >
                <ReceiptLong />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mb: 0.5, color: theme.palette.primary.main }}
                >
                  Estado de Resultados Inicial
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Aquí se muestra el Estado de Resultados Inicial que establece
                  el punto de partida financiero de la empresa. Esta información
                  es crucial para el cálculo de los indicadores financieros y la
                  definición de objetivos estratégicos.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Tablas de Estado de Resultados */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Ventas */}
            <Card sx={{ mb: 3, boxShadow: 1 }}>
              <CardContent
                sx={{
                  py: 2,
                  px: 2,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AttachMoney sx={{ mr: 1 }} />
                  <Typography variant="h6">Ventas</Typography>
                </Box>
              </CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Producto
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alfaros</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.sales.alfaros)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Betacos</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.sales.betacos)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gamaroles</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.sales.gamaroles)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        Total Ventas
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.success.main,
                        }}
                      >
                        {formatCurrency(incomeStatementTotals.totalSales)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            {/* Costos de Ventas */}
            <Card sx={{ mb: 3, boxShadow: 1 }}>
              <CardContent
                sx={{
                  py: 2,
                  px: 2,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ShoppingBasket sx={{ mr: 1 }} />
                  <Typography variant="h6">Costos de Ventas</Typography>
                </Box>
              </CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Producto
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Alfaros</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.costs.alfaros)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Betacos</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.costs.betacos)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gamaroles</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.costs.gamaroles)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        Total Costos
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.error.main,
                        }}
                      >
                        {formatCurrency(incomeStatementTotals.totalCosts)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Gastos Operacionales */}
            <Card sx={{ mb: 3, boxShadow: 1 }}>
              <CardContent
                sx={{
                  py: 2,
                  px: 2,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Assignment sx={{ mr: 1 }} />
                  <Typography variant="h6">Gastos Operacionales</Typography>
                </Box>
              </CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Tipo de Gasto
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gastos de Administración</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(
                            incomeStatement.expenses.administration
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gastos de Ventas</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.expenses.sales)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Otros Gastos Operativos</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.expenses.other)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        Total Gastos Operacionales
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.error.main,
                        }}
                      >
                        {formatCurrency(
                          incomeStatementTotals.totalOperatingExpenses
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            {/* Otros Ingresos/Gastos e Impuestos */}
            <Card sx={{ mb: 3, boxShadow: 1 }}>
              <CardContent
                sx={{
                  py: 2,
                  px: 2,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Description sx={{ mr: 1 }} />
                  <Typography variant="h6">Otros Gastos e Impuestos</Typography>
                </Box>
              </CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Concepto
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gastos Financieros</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(
                            incomeStatement.otherItems.financialExpenses
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Depreciación y Amortización</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(
                            incomeStatement.otherItems.depreciationAmortization
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Impuestos</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(incomeStatement.taxes)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        Total Otros Gastos
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.error.main,
                        }}
                      >
                        {formatCurrency(
                          incomeStatementTotals.totalOtherExpenses
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Resumen de Estado de Resultados */}
        <Card sx={{ mt: 4, boxShadow: 1 }}>
          <CardContent
            sx={{
              py: 2,
              px: 2,
              bgcolor: theme.palette.primary.main,
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ReceiptLong sx={{ mr: 1 }} />
              <Typography variant="h6">
                Resumen del Estado de Resultados
              </Typography>
            </Box>
          </CardContent>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "60%" }}>
                    Ventas Totales
                  </TableCell>
                  <TableCell>
                    {formatCurrency(incomeStatementTotals.totalSales)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    (-) Costos de Ventas
                  </TableCell>
                  <TableCell>
                    {formatCurrency(incomeStatementTotals.totalCosts)}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    Utilidad Bruta
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.success.main,
                    }}
                  >
                    {formatCurrency(incomeStatementTotals.grossProfit)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    (-) Gastos Operacionales
                  </TableCell>
                  <TableCell>
                    {formatCurrency(
                      incomeStatementTotals.totalOperatingExpenses
                    )}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    Utilidad Operacional
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.success.main,
                    }}
                  >
                    {formatCurrency(incomeStatementTotals.operatingProfit)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    (-) Otros Gastos
                  </TableCell>
                  <TableCell>
                    {formatCurrency(incomeStatementTotals.totalOtherExpenses)}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    Utilidad Antes de Impuestos
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.success.main,
                    }}
                  >
                    {formatCurrency(incomeStatementTotals.profitBeforeTaxes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    (-) Impuestos
                  </TableCell>
                  <TableCell>
                    {formatCurrency(incomeStatementTotals.taxes)}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    Utilidad Neta
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.success.main,
                    }}
                  >
                    {formatCurrency(incomeStatementTotals.netProfit)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>EBITDA</TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {formatCurrency(incomeStatementTotals.ebitda)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    );
  };

  // Renderizar tab de inventario
  const renderInventoryTab = () => {
    return (
      <Box>
        {/* Tarjeta informativa */}
        <Card sx={{ mb: 4, bgcolor: "#f0f7ff", border: "none" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                }}
              >
                <Inventory />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mb: 0.5, color: theme.palette.primary.main }}
                >
                  Inventario Inicial
                </Typography>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Aquí se muestra el inventario inicial de materias primas y
                  productos terminados. Esta información es fundamental para la
                  planificación de la producción y la determinación de los
                  recursos disponibles al inicio de la operación.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Materias Primas */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 1 }}>
              <CardContent
                sx={{
                  py: 2,
                  px: 2,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Category sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Inventario Inicial de Materias Primas
                  </Typography>
                </Box>
              </CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Descripción
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Cantidad
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Unidad</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Costo Unitario
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Valor Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(rawMaterials) &&
                      rawMaterials.map((material, index) => (
                        <TableRow
                          key={`material-${material.code || index}`}
                          hover
                        >
                          <TableCell>{material.code || ""}</TableCell>
                          <TableCell>{material.description || ""}</TableCell>
                          <TableCell>
                            <Typography sx={{ fontWeight: 500 }}>
                              {material.quantity || "0"}
                            </Typography>
                          </TableCell>
                          <TableCell>{material.unit || ""}</TableCell>
                          <TableCell>
                            <Typography sx={{ fontWeight: 500 }}>
                              {formatCurrency(material.costPerUnit || 0)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ fontWeight: "medium" }}>
                            {formatCurrency(material.totalValue || 0)}
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                      <TableCell
                        colSpan={5}
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        Total Materias Primas
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.success.main,
                        }}
                      >
                        {formatCurrency(inventoryTotals.rawMaterialsTotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Productos Terminados */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 1 }}>
              <CardContent
                sx={{
                  py: 2,
                  px: 2,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalShipping sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Inventario Inicial de Productos Terminados
                  </Typography>
                </Box>
              </CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Producto
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Cantidad
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Costo Unitario
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Valor Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(finishedProducts) &&
                      finishedProducts.map((product, index) => (
                        <TableRow
                          key={`product-${product.product || index}`}
                          hover
                        >
                          <TableCell>{product.product || ""}</TableCell>
                          <TableCell>
                            <Typography sx={{ fontWeight: 500 }}>
                              {product.quantity || "0"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{ fontWeight: 500 }}>
                              {formatCurrency(product.costPerUnit || 0)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ fontWeight: "medium" }}>
                            {formatCurrency(product.totalValue || 0)}
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                      <TableCell
                        colSpan={3}
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.primary.dark,
                        }}
                      >
                        Total Productos Terminados
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: theme.palette.success.main,
                        }}
                      >
                        {formatCurrency(inventoryTotals.finishedProductsTotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Resumen de Inventario */}
        <Card
          sx={{
            mt: 4,
            boxShadow: 2,
            bgcolor: theme.palette.primary.main,
            color: "white",
          }}
        >
          <CardContent
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Valor Total de Inventario
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {formatCurrency(inventoryTotals.inventoryTotal)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
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
                Datos Financieros
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                Esta sección muestra un resumen detallado de los activos,
                pasivos, patrimonio y otros elementos financieros relevantes
                para la planificación estratégica. Los valores se expresan en
                pesos colombianos (COP).
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs de navegación - Sin iconos */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="datos financieros tabs"
          sx={{
            "& .MuiTab-root": {
              minWidth: 120,
              fontWeight: 500,
              textTransform: "none",
            },
            "& .Mui-selected": {
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Datos Generales" />
          <Tab label="Estado de Resultados" />
          <Tab label="Inventario Inicial" />
        </Tabs>
      </Box>

      {/* Contenido de los tabs */}
      {renderTabContent()}
    </Box>
  );
}
