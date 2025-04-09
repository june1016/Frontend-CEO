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
import { Inventory, Category, LocalShipping } from "@mui/icons-material";
import InfoCard from "./common/infoCard";
import { formatCurrency } from "../../../utils/formatters/currencyFormatters";

/**
 * Componente para mostrar la vista de inventario
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.rawMaterials - Datos de materias primas
 * @param {Array} props.finishedProducts - Datos de productos terminados
 * @param {Object} props.inventoryTotals - Totales calculados
 * @param {Object} props.theme - Tema de Material UI
 * @returns {JSX.Element} - Componente renderizado
 */
const InventoryView = ({
  rawMaterials,
  finishedProducts,
  inventoryTotals,
  theme,
}) => {
  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Inventario Inicial"
        description="Aquí se muestra el inventario inicial de materias primas y productos terminados. Esta información es fundamental para la planificación de la producción y la determinación de los recursos disponibles al inicio de la operación."
        icon={<Inventory />}
        bgColor="#f0f7ff"
      />

      <Grid container spacing={4}>
        {/* Materias Primas */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 1 }}>
            <CardContent
              sx={{
                py: 2,
                px: 2,
                bgcolor: theme.palette.primary.main,
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Category sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Inventario Inicial de Materias Primas
                </Typography>
              </Box>
            </CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Descripción
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Unidad</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Costo Unitario
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Valor Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(rawMaterials) &&
                    rawMaterials.map((material, index) => (
                      <TableRow
                        key={`material-${material.code || index}`}
                        hover
                      >
                        <TableCell>{material.code || ""}</TableCell>
                        <TableCell>{material.description || ""}</TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 500 }}>
                            {material.quantity || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell>{material.unit || ""}</TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 500 }}>
                            {formatCurrency(material.costPerUnit || 0)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          {formatCurrency(material.totalValue || 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                    <TableCell
                      colSpan={5}
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.dark,
                      }}
                    >
                      Total Materias Primas
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.success.main,
                      }}
                    >
                      {formatCurrency(inventoryTotals.rawMaterialsTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Productos Terminados */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 1 }}>
            <CardContent
              sx={{
                py: 2,
                px: 2,
                bgcolor: theme.palette.primary.main,
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalShipping sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Inventario Inicial de Productos Terminados
                </Typography>
              </Box>
            </CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Costo Unitario
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Valor Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(finishedProducts) &&
                    finishedProducts.map((product, index) => (
                      <TableRow
                        key={`product-${product.product || index}`}
                        hover
                      >
                        <TableCell>{product.product || ""}</TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 500 }}>
                            {product.quantity || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 500 }}>
                            {formatCurrency(product.costPerUnit || 0)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          {formatCurrency(product.totalValue || 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow sx={{ bgcolor: "#EBF5FF" }}>
                    <TableCell
                      colSpan={3}
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.dark,
                      }}
                    >
                      Total Productos Terminados
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.success.main,
                      }}
                    >
                      {formatCurrency(inventoryTotals.finishedProductsTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Resumen de Inventario */}
      <Card
        sx={{
          mt: 4,
          boxShadow: 2,
          bgcolor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <CardContent
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Valor Total de Inventario
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {formatCurrency(inventoryTotals.inventoryTotal)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InventoryView;
