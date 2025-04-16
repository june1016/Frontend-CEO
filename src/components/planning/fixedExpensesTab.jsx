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
} from "@mui/material";
import {
  Payments as PaymentsIcon,
  AccountBalance as AccountBalanceIcon,
  Group as GroupIcon,
  LocalAtm as LocalAtmIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import InfoCard from "./financialData/common/infoCard";
import { formatCurrency } from "../../utils/formatters/currencyFormatters";
import { useMonthlyExpenses } from "../../hooks/monthlyFixedExpenses/useMonthlyExpenses";



const FixedExpensesTab = ({ theme }) => {

  const { monthlyData, monthlyTotals, loading, error } = useMonthlyExpenses();
  
  if (loading) return <p>Cargando gastos mensuales...</p>;
  if (error) return <p>{error}</p>;

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
        icon={<PaymentsIcon />}
      />

      <Grid container spacing={3}>
        {/* Gastos Operativos */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3, boxShadow: 1, height: "100%" }}>
            <CardContent
              sx={{
                py: 2,
                px: 2,
                bgcolor: theme?.palette.primary.main || "#1C4384",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PaymentsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Gastos Operativos</Typography>
              </Box>
            </CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Gasto</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Valor (COP)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operationalExpenses.map((item, index) => (
                    <TableRow key={`op-${index}`} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.value_cop)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                    <TableCell
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
                      {formatCurrency(monthlyTotals.totalOperatingCosts)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Obligaciones Financieras */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3, boxShadow: 1, height: "100%" }}>
            <CardContent
              sx={{
                py: 2,
                px: 2,
                bgcolor: theme?.palette.primary.main || "#1C4384",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountBalanceIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Obligaciones Financieras</Typography>
              </Box>
            </CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Gasto</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Valor (COP)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {financialObligations.map((item, index) => (
                    <TableRow key={`fin-${index}`} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.value_cop)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                    <TableCell
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
                      {formatCurrency(monthlyTotals.totalFinancialObligations)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Gastos de Personal */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3, boxShadow: 1, height: "100%" }}>
            <CardContent
              sx={{
                py: 2,
                px: 2,
                bgcolor: theme?.palette.primary.main || "#1C4384",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <GroupIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Gastos de Personal</Typography>
              </Box>
            </CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Gasto</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Valor (COP)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {personnelExpenses.map((item, index) => (
                    <TableRow key={`per-${index}`} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.value_cop)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                    <TableCell
                      colSpan={2}
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
                      {formatCurrency(monthlyTotals.totalpersonnelExpenses)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{ p: 2, bgcolor: "#FFFBEB", borderTop: "1px solid #FEF3C7" }}
            >
              <Typography variant="subtitle2" color="warning.dark">
                <strong>Nota importante:</strong> Los demás cargos son
                opcionales y serán decisiones que el CEO podrá tomar durante la
                configuración de la nómina y personal.
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Cargas Sociales */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3, boxShadow: 1, height: "100%" }}>
            <CardContent
              sx={{
                py: 2,
                px: 2,
                bgcolor: theme?.palette.primary.main || "#1C4384",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalAtmIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Cargas Sociales</Typography>
              </Box>
            </CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Gasto</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Valor (COP)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {socialCharges.map((item, index) => (
                    <TableRow key={`soc-${index}`} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.value_cop)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                    <TableCell
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
                      {formatCurrency(monthlyTotals.totalSocialCharges)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
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
