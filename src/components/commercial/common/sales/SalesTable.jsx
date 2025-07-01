import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Chip,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

const mockData = [
  {
    id: "V2025-0301",
    date: "2025-01-03 09:30",
    product: "Alfaros",
    quantity: 350,
    total: "$22.750.000",
    client: "Distribuidora XYZ",
    type: "Mayorista",
    payment: "Crédito 30 días",
    seller: "Juan Pérez",
    status: "Entregado",
  },
  {
    id: "V2025-0302",
    date: "2025-01-03 11:15",
    product: "Betacos",
    quantity: 45,
    total: "$2.250.000",
    client: "Comercial ABC",
    type: "Minorista",
    payment: "Contado",
    seller: "María López",
    status: "Entregado",
  },
];

const getTypeColor = (type) =>
  type === "Mayorista" ? "info" : type === "Minorista" ? "warning" : "default";

const SalesTable = ({ filters }) => {
  const theme = useTheme();

  const filtered = mockData.filter((item) => {
    const matchVendor =
      filters.vendor === "Todos" || item.seller === filters.vendor;
    const matchType = filters.type === "Todos" || item.type === filters.type;
    const matchSearch =
      filters.search === "" ||
      item.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.client.toLowerCase().includes(filters.search.toLowerCase());

    return matchVendor && matchType && matchSearch;
  });

  return (
    <Box mt={3}>
      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.primary.main,
              }}
            >
              {[
                "ID Venta",
                "Producto",
                "Cantidad",
                "Valor Total",
                "Cliente",
                "Tipo",
                "Pago",
                "Vendedor",
                "Estado",
                "Fecha",
              ].map((header, idx) => (
                <TableCell key={idx}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="common.white"
                  >
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography fontWeight={500}>
                    {row.id.replace(/^V\d+-/, "")}
                  </Typography>
                </TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{row.total}</Typography>
                </TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>
                  <Chip
                    label={row.type}
                    size="small"
                    color={getTypeColor(row.type)}
                  />
                </TableCell>
                <TableCell>{row.payment}</TableCell>
                <TableCell>{row.seller}</TableCell>
                <TableCell>
                  <Chip label={row.status} color="success" size="small" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {row.date}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesTable;
