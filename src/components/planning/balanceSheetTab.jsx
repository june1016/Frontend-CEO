// src/components/planning/balanceSheetTab.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Avatar,
  Button,
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
} from "@mui/icons-material";

// Custom hook
import { useBalanceSheet } from "../../hooks/balanceSheet/useBalanceSheet";

// Componentes
import FinancialTable from "./balanceSheet/financialTable";
import SummaryCard from "./balanceSheet/summaryCard";
import BalanceSummary from "./balanceSheet/balanceSummary";

export default function BalanceSheetTab({ handleTab }) {
  const theme = useTheme();
  const {
    activosCorrientes,
    pasivosCorrientes,
    ppe,
    pasivosLP,
    patrimonio,
    totals,
    handleInputChange,
    handleSave
  } = useBalanceSheet(handleTab);

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
              Guardar Balance
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
              <SummaryCard
                title="Total Activos"
                value={totals.totalActivos}
                icon={<AttachMoneyIcon />}
                bgColor={theme.palette.primary.main}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <SummaryCard
                title="Total Pasivos"
                value={totals.totalPasivos}
                icon={<TrendingDownIcon />}
                bgColor={theme.palette.error.main}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <SummaryCard
                title="Patrimonio"
                value={totals.patrimonio}
                icon={<SavingsIcon />}
                bgColor={theme.palette.secondary.main}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Columna izquierda - Activos */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Activos Corrientes */}
                <FinancialTable
                  title="Activos Corrientes"
                  icon={<TrendingUpIcon sx={{ mr: 1 }} />}
                  values={activosCorrientes}
                  onChange={handleInputChange}
                  section="activosCorrientes"
                  total={totals.activosCorrientes}
                  totalLabel="Total activos corrientes"
                  totalColor={theme.palette.success.main}
                  bgColor={theme.palette.primary.main}
                />

                {/* P.P.E */}
                <FinancialTable
                  title="P.P.E (Propiedades, Planta y Equipo)"
                  icon={<BusinessIcon sx={{ mr: 1 }} />}
                  values={ppe}
                  onChange={handleInputChange}
                  section="ppe"
                  total={totals.ppe}
                  totalLabel="Total PPE"
                  totalColor={theme.palette.success.main}
                  bgColor={theme.palette.primary.main}
                />
              </Box>
            </Grid>

            {/* Columna derecha - Pasivos y Patrimonio */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Pasivos Corrientes */}
                <FinancialTable
                  title="Pasivos Corrientes"
                  icon={<TrendingDownIcon sx={{ mr: 1 }} />}
                  values={pasivosCorrientes}
                  onChange={handleInputChange}
                  section="pasivosCorrientes"
                  total={totals.pasivosCorrientes}
                  totalLabel="Total pasivos corrientes"
                  totalColor={theme.palette.error.main}
                  bgColor={theme.palette.primary.main}
                />

                {/* Pasivos Largo Plazo */}
                <FinancialTable
                  title="Pasivos Largo Plazo"
                  icon={<TrendingDownIcon sx={{ mr: 1 }} />}
                  values={pasivosLP}
                  onChange={handleInputChange}
                  section="pasivosLP"
                  total={totals.pasivosLP}
                  totalLabel="Total Pasivos LP"
                  totalColor={theme.palette.error.main}
                  bgColor={theme.palette.primary.main}
                />

                {/* Patrimonio */}
                <FinancialTable
                  title="Patrimonio"
                  icon={<SavingsIcon sx={{ mr: 1 }} />}
                  values={patrimonio}
                  onChange={handleInputChange}
                  section="patrimonio"
                  total={totals.patrimonio}
                  totalLabel="Total Patrimonio"
                  totalColor={theme.palette.secondary.main}
                  bgColor={theme.palette.primary.main}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Tarjeta de Resumen Total */}
          <BalanceSummary balance={totals.balance} />
        </CardContent>
      </Card>
    </Box>
  );
}