import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../services/api/axiosConfig.js";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography
} from "@mui/material";

const MaterialsTable = ({ userId, projectedSales }) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axiosInstance.get(`/provider/getmaterials/${userId}`);

        console.log(response);

        if (response.data.ok) {
          const suppliers = response.data.suppliers;

          const materialsData = suppliers.flatMap((supplier) =>
            supplier.materials.map((material) => ({
              materialId: material.id,
              code: material.code,
              materialName: material.name,
              unit: material.unit,
              quantityRequired: 0,
              quantityToBuy: 0,
              unitCost: material.price,
              totalCost: 0,
            }))
          );

          setMaterials(materialsData);
        }
      } catch (error) {
        console.error("Error al obtener los materiales:", error);
      }
    };

    fetchMaterials();
  }, [userId]);

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Materiales por Proveedor
      </Typography>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Código</strong></TableCell>
              <TableCell><strong>Material</strong></TableCell>
              <TableCell><strong>Unidad</strong></TableCell>
              <TableCell align="right"><strong>Cantidad Requerida</strong></TableCell>
              <TableCell align="right"><strong>Cantidad a Comprar</strong></TableCell>
              <TableCell align="right"><strong>Costo Unitario</strong></TableCell>
              <TableCell align="right"><strong>Costo Total</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.materialId}>
                <TableCell>{material.code}</TableCell>
                <TableCell>{material.materialName}</TableCell>
                <TableCell>{material.unit}</TableCell>
                <TableCell align="right">{material.quantityRequired}</TableCell>
                <TableCell align="right">{material.quantityToBuy}</TableCell>
                <TableCell align="right">{material.unitCost.toFixed(2)}</TableCell>
                <TableCell align="right">
                  {(material.unitCost * material.quantityToBuy).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MaterialsTable;
