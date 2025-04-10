import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { FileDownload as DownloadIcon } from "@mui/icons-material";
import { formatNumber } from "../../../../utils/formatters/numberFormatters";

/**
 * Componente para mostrar los resultados calculados del presupuesto
 * @param {Object} props Propiedades del componente
 * @param {Array} props.products Lista de productos
 * @param {Function} props.calculateValues Función para calcular valores por década
 * @param {number} props.selectedMonth Mes seleccionado
 * @param {Object} props.theme Tema de Material UI
 * @param {Object} props.totals Totales calculados
 * @returns {JSX.Element} Componente renderizado
 */
const BudgetResultsTable = ({
  products,
  calculateValues,
  selectedMonth,
  theme,
  totals,
  title = "Resultados Calculados",
  columnTitle = "Producto",
  itemTitle = "name",
}) => {
  return (
    <Card sx={{ boxShadow: 2, border: "1px solid #E5E7EB" }}>
      <CardHeader
        title={
          <Typography
            variant="h6"
            fontWeight="bold"
            color={theme.palette.primary.dark}
          >
            {title}
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
                {columnTitle}
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
              const values = calculateValues(selectedMonth, product.id);
              return (
                <TableRow key={product.id} hover>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {product[itemTitle]}
                  </TableCell>
                  <TableCell>{formatNumber(values.d1)}</TableCell>
                  <TableCell>{formatNumber(values.d2)}</TableCell>
                  <TableCell>{formatNumber(values.d3)}</TableCell>
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
                borderTop: "2px solid rgba(28, 67, 132, 0.2)",
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
                {formatNumber(totals.d1Total)}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                {formatNumber(totals.d2Total)}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                {formatNumber(totals.d3Total)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                {formatNumber(totals.grandTotal)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default BudgetResultsTable;
