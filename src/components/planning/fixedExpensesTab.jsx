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

const FixedExpensesTab = ({ theme }) => {
  // Datos para las tablas de gastos
  const operationalExpenses = [
    { expense: "Arrendamiento", amount: 12000000 },
    { expense: "Servicios Públicos", amount: 8000000 },
    { expense: "Mantenimiento", amount: 7500000 },
    { expense: "Telefonía móvil", amount: 2000000 },
    { expense: "Cafetería y Papelería", amount: 3000000 },
    { expense: "Otros gastos operativos", amount: 5000000 },
  ];

  const financialObligations = [
    { expense: "Abono a Cuentas x pagar", amount: 1500000 },
    { expense: "Abono Máquina 1 (NRX31 - Alfaros)", amount: 1500000 },
    { expense: "Abono Máquina 2 (XLG77 - Betacos)", amount: 1200000 },
    { expense: "Abono Máquina 3 (CP23H - Gamaroles)", amount: 1000000 },
    { expense: "Abono otras inversiones", amount: 800000 },
  ];

  const personnelExpenses = [
    {
      position: "Nómina Gerente (CEO)",
      quantity: 1,
      amount: 6000000,
    },
    {
      position: "Nómina Vendedor",
      quantity: 1,
      amount: 1500000,
    },
    {
      position: "Nómina operarios",
      quantity: 3,
      amount: 5400000,
    },
  ];

  const socialCharges = [{ expense: "PRESTACIONES-POS", amount: 5100000 }];

  // Calcular totales
  const operationalTotal = operationalExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const financialTotal = financialObligations.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const personnelTotal = personnelExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const socialTotal = socialCharges.reduce((sum, item) => sum + item.amount, 0);
  const grandTotal =
    operationalTotal + financialTotal + personnelTotal + socialTotal;

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
                      <TableCell>{item.expense}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.amount)}
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
                      {formatCurrency(operationalTotal)}
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
                      <TableCell>{item.expense}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.amount)}
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
                      {formatCurrency(financialTotal)}
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
                      <TableCell>{item.position}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.amount)}
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
                      {formatCurrency(personnelTotal)}
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
                      <TableCell>{item.expense}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.amount)}
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
                      {formatCurrency(socialTotal)}
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
                        {formatCurrency(operationalTotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Obligaciones Financieras</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatCurrency(financialTotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Gastos de Personal</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatCurrency(personnelTotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Cargas Sociales</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {formatCurrency(socialTotal)}
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
                      {formatCurrency(grandTotal)}
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
