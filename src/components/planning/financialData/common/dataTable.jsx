import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import {
  iconMapping,
  categoryColors,
} from "../../../../constants/financialData";
import { formatCurrency } from "../../../../utils/formatters/currencyFormatters";

/**
 * Componente de tabla con ordenamiento
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.data - Datos a mostrar
 * @param {string} props.order - Dirección de ordenamiento ('asc' o 'desc')
 * @param {string} props.orderBy - Campo por el cual ordenar
 * @param {Function} props.onRequestSort - Función para manejar solicitud de ordenamiento
 * @param {Function} props.getSortedData - Función para obtener datos ordenados
 * @param {Object} props.theme - Tema de Material UI
 * @returns {JSX.Element} - Componente renderizado
 */
const DataTable = ({
  data,
  order,
  orderBy,
  onRequestSort,
  getSortedData,
  theme,
}) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>
              <TableSortLabel
                active={orderBy === "title"}
                direction={orderBy === "title" ? order : "asc"}
                onClick={() => onRequestSort("title")}
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
                onClick={() => onRequestSort("category")}
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
                onClick={() => onRequestSort("amount")}
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
          {data.length > 0 ? (
            getSortedData(data).map((item, index) => {
              const IconComponent =
                iconMapping[item.icon] || iconMapping.Computer;
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
                        color: categoryColors[item.category]?.text || "#4b5563",
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
            })
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No hay datos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
