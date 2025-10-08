import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Alert,
} from "@mui/material";
import {
  Payments as PaymentsIcon,
  AccountBalance as AccountBalanceIcon,
  Group as GroupIcon,
  LocalAtm as LocalAtmIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import InfoCard from ".././common/infoCard";
import { formatCurrency } from "../../utils/shared/formatters/currencyFormatters";
import { useMonthlyExpenses } from "../../hooks/planning/monthlyFixedExpenses/useMonthlyExpenses";

// Componente reutilizable para tablas de gastos
const ExpenseTable = ({ title, icon, data, total, theme, columns = 2, note }) => {
  const hasQuantity = columns === 3;
  
  return (
    <Card sx={{ boxShadow: 1, height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{
          py: 2,
          px: 2,
          bgcolor: theme?.palette.primary.main || "#1C4384",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
      </CardContent>
      
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F3F4F6" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Gasto</TableCell>
              {hasQuantity && <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>}
              <TableCell sx={{ fontWeight: "bold" }}>Valor (COP)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={`item-${index}`} hover>
                <TableCell>{item.name}</TableCell>
                {hasQuantity && <TableCell>{item.quantity}</TableCell>}
                <TableCell>
                  <Typography sx={{ fontWeight: 500 }}>
                    {formatCurrency(item.value_cop)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            
            {/* Fila de total siempre al final de la tabla */}
            <TableRow sx={{ bgcolor: "#EBF5FF" }}>
              <TableCell
                colSpan={hasQuantity ? 2 : 1}
                sx={{
                  fontWeight: "bold",
                  color: theme?.palette.primary.dark || "#153265",
                }}
              >
                Total mensual
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme?.palette.success.main || "#2E7D32",
                }}
              >
                {formatCurrency(total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      {note && (
        <Box sx={{ p: 2, bgcolor: "#FFFBEB", borderTop: "1px solid #FEF3C7" }}>
          <Typography variant="subtitle2" color="warning.dark">
            {note}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

const FixedExpensesTab = ({ theme }) => {
  const { monthlyData, monthlyTotals, loading, error } = useMonthlyExpenses();
  
  if (loading) return <p>Cargando gastos mensuales...</p>;
  if (error) return <Alert severity="error">{error}</Alert>;

  const {
    financialObligations,
    operationalExpenses,
    socialCharges,
    personnelExpenses,
  } = monthlyData;

  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Gastos Fijos Mensuales"
        description="En esta sección podrás revisar los gastos fijos mensuales de tu empresa, incluyendo gastos operativos, obligaciones financieras, gastos de personal y cargas sociales. Estos valores son utilizados para el cálculo de presupuestos y proyecciones financieras."
      />

      <Grid container spacing={3}>
        {/* Gastos Operativos */}
        <Grid item xs={12} md={6}>
          <ExpenseTable
            title="Gastos Operativos"
            icon={<PaymentsIcon sx={{ mr: 1 }} />}
            data={operationalExpenses}
            total={monthlyTotals.totalOperatingCosts}
            theme={theme}
          />
        </Grid>

        {/* Obligaciones Financieras */}
        <Grid item xs={12} md={6}>
          <ExpenseTable
            title="Obligaciones Financieras"
            icon={<AccountBalanceIcon sx={{ mr: 1 }} />}
            data={financialObligations}
            total={monthlyTotals.totalFinancialObligations}
            theme={theme}
          />
        </Grid>

        {/* Gastos de Personal */}
        <Grid item xs={12} md={6}>
          <ExpenseTable
            title="Gastos de Personal"
            icon={<GroupIcon sx={{ mr: 1 }} />}
            data={personnelExpenses}
            total={monthlyTotals.totalpersonnelExpenses}
            theme={theme}
            columns={3}
            note={
              <>
                <strong>Nota importante:</strong> Los demás cargos son
                opcionales y serán decisiones que el CEO podrá tomar durante la
                configuración de la nómina y personal. 
              </>
            }
          />
        </Grid>

        {/* Cargas Sociales */}
        <Grid item xs={12} md={6}>
          <ExpenseTable
            title="Cargas Sociales"
            icon={<LocalAtmIcon sx={{ mr: 1 }} />}
            data={socialCharges}
            total={monthlyTotals.totalSocialCharges}
            theme={theme}
          />
        </Grid>

        {/* Resumen de Gastos Fijos */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 1 }}>
            <CardContent
              sx={{
                py: 2,
                px: 2,
                bgcolor: theme?.palette.primary.main || "#1C4384",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AssessmentIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Total Gastos Fijos Mensuales
                </Typography>
              </Box>
            </CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Valor (COP)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell>Gastos Operativos</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatCurrency(monthlyTotals.totalOperatingCosts)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Obligaciones Financieras</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatCurrency(monthlyTotals.totalFinancialObligations)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Gastos de Personal</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatCurrency(monthlyTotals.totalpersonnelExpenses)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Cargas Sociales</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatCurrency(monthlyTotals.totalSocialCharges)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme?.palette.primary.dark || "#153265",
                      }}
                    >
                      TOTAL
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: theme?.palette.success.main || "#2E7D32",
                      }}
                    >
                      {formatCurrency(monthlyTotals.grandTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FixedExpensesTab;