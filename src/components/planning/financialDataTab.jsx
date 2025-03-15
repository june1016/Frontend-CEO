import React, { useState, useMemo } from "react";
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
  Alert,
  AlertTitle,
  useTheme,
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
} from "@mui/icons-material";

// Datos financieros de ejemplo
const financialData = [
  {
    title: "Dinero en caja",
    category: "Activos",
    value: 10000000,
    icon: Wallet,
  },
  {
    title: "Dinero en banco",
    category: "Activos",
    value: 50000000,
    icon: AccountBalance,
  },
  {
    title: "Inventario",
    category: "Activos",
    value: 20000000,
    icon: Inventory,
  },
  {
    title: "Cuentas por cobrar",
    category: "Activos",
    value: 15000000,
    icon: Receipt,
  },
  {
    title: "Equipos de computo",
    category: "Activos",
    value: 8000000,
    icon: Computer,
  },
  {
    title: "Muebles y enseres",
    category: "Activos",
    value: 5000000,
    icon: MenuBook,
  },
  {
    title: "Maquinaria y equipo",
    category: "Activos",
    value: 30000000,
    icon: Build,
  },
  {
    title: "Patentes",
    category: "Activos",
    value: 12000000,
    icon: EmojiEvents,
  },
  {
    title: "Cuentas por pagar",
    category: "Pasivos",
    value: 7000000,
    icon: CreditCard,
  },
  {
    title: "Letras por pagar",
    category: "Pasivos",
    value: 4000000,
    icon: Description,
  },
  {
    title: "Deuda a largo plazo",
    category: "Pasivos",
    value: 25000000,
    icon: Apartment,
  },
  {
    title: "Capital social",
    category: "Patrimonio",
    value: 40000000,
    icon: Work,
  },
  {
    title: "Utilidades retenidas",
    category: "Patrimonio",
    value: 10000000,
    icon: Savings,
  },
  {
    title: "Costos operativos",
    category: "Otros",
    value: 30000000,
    icon: AttachMoney,
  },
];

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
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");

  // Handler para solicitar ordenamiento
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Calcular totales por categoría
  const totals = useMemo(() => {
    return financialData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.value;
      return acc;
    }, {});
  }, []);

  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Formatear en millones
  const formatMillions = (value) => {
    return `${Math.round(value / 1000000)}M`;
  };

  // Obtener icono por categoría
  const getCategoryIcon = (category) => {
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

      {/* Tarjetas de KPI */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(totals).map(([category, total]) => (
          <Grid item xs={12} sm={6} md={3} key={category}>
            <Card
              sx={{
                bgcolor: categoryColors[category].bg,
                boxShadow: "none",
                border: "1px solid",
                borderColor: categoryColors[category].light,
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
                      bgcolor: categoryColors[category].avatar,
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
                  active={orderBy === "value"}
                  direction={orderBy === "value" ? order : "asc"}
                  onClick={() => handleRequestSort("value")}
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
                const Icon = item.icon;
                return (
                  <TableRow key={item.title} hover>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Icon sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="body2">{item.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.category}
                        size="small"
                        sx={{
                          bgcolor: categoryColors[item.category].light,
                          color: categoryColors[item.category].text,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={500}>
                        {formatCurrency(item.value)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
