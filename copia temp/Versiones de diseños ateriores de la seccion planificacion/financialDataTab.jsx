// src/components/planning/financialDataTab.jsx
import React, { useMemo } from "react";
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
  Chip,
  Avatar,
  Paper,
} from "@mui/material";
import {
  Wallet,
  Receipt,
  Apartment,
  Inventory,
  Computer,
  MenuBook,
  // Precision no existe, reemplazamos por un ícono similar
  Build, // o Factory como alternativa
  EmojiEvents,
  CreditCard,
  Description,
  AccountBalance,
  Work,
  Savings,
  AttachMoney,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

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
  // Cambiamos Precision por Build para "Maquinaria y equipo"
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

// Resto del código permanece igual...

export default function FinancialDataTab() {
  const theme = useTheme();
  console.log("Tema actual:", theme);

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

      {/* Tabla Detallada */}
      <TableContainer component={Paper} sx={{ boxShadow: "sm" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "background.subtle" }}>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Valor (COP)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financialData.map((item) => {
              const Icon = item.icon;
              return (
                <TableRow key={item.title} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
