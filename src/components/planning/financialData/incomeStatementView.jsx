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
  ReceiptLong,
  AttachMoney,
  ShoppingBasket,
  Assignment,
  Description,
} from "@mui/icons-material";
import InfoCard from "../../common/infoCard";
import { formatCurrency } from "../../../utils/formatters/currencyFormatters";

/**
 * Componente para mostrar la vista de estado de resultados
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.incomeStatement - Datos del estado de resultados
 * @param {Object} props.incomeStatementTotals - Totales calculados
 * @param {Object} props.theme - Tema de Material UI
 * @returns {JSX.Element} - Componente renderizado
 */
const IncomeStatementView = ({
  incomeStatement,
  incomeStatementTotals,
  theme,
}) => {
  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Estado de Resultados Inicial"
        description="Aquí se muestra el Estado de Resultados Inicial que establece el punto de partida financiero de la empresa. Esta información es crucial para el cálculo de los indicadores financieros y la definición de objetivos estratégicos."
        icon={<ReceiptLong />}
        bgColor="#f0f7ff"
      />

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
                    <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
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
                    <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
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
                    <TableCell sx={{ fontWeight: "bold" }}>Concepto</TableCell>
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
                        {formatCurrency(incomeStatement.otherItems.taxes)}
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
                      {formatCurrency(incomeStatementTotals.totalOtherExpenses)}
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
                  {formatCurrency(incomeStatementTotals.totalOperatingExpenses)}
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
                <TableCell sx={{ fontWeight: "bold" }}>(-) Impuestos</TableCell>
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

export default IncomeStatementView;
