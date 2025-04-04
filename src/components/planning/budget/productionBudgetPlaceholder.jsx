import React from "react";
import { Box, Paper, Typography, Alert, AlertTitle } from "@mui/material";
import { Factory as FactoryIcon, Info as InfoIcon } from "@mui/icons-material";

/**
 * Componente placeholder para el presupuesto de producción
 * @param {Object} props Propiedades del componente
 * @param {Object} props.theme Tema de Material UI
 * @returns {JSX.Element} Componente renderizado
 */
const ProductionBudgetPlaceholder = ({ theme }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Alert
        severity="info"
        icon={<InfoIcon />}
        sx={{
          bgcolor: "#EBF5FF",
          color: theme.palette.primary.main,
          border: "1px solid rgba(28, 67, 132, 0.2)",
          "& .MuiAlert-icon": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <AlertTitle sx={{ fontWeight: "bold" }}>
          Presupuesto de Producción
        </AlertTitle>
        <Typography variant="body2">
          Este presupuesto permite planificar la cantidad de unidades a producir
          para satisfacer la demanda proyectada en el Presupuesto de Ventas,
          considerando los inventarios iniciales y la política de inventario
          final establecida.
        </Typography>
      </Alert>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: "1px dashed rgba(28, 67, 132, 0.3)",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
          bgcolor: "rgba(28, 67, 132, 0.05)",
        }}
      >
        <FactoryIcon
          sx={{
            fontSize: 60,
            color: "rgba(28, 67, 132, 0.3)",
            p: 1,
            borderRadius: "50%",
            bgcolor: "rgba(28, 67, 132, 0.1)",
          }}
        />

        <Typography variant="h6" color="primary.main" fontWeight="bold">
          Implementación en Progreso
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 600 }}
        >
          El presupuesto de producción está actualmente en desarrollo. Este
          módulo le permitirá:
        </Typography>

        <Box sx={{ mt: 1 }}>
          <ul
            style={{ textAlign: "left", color: theme.palette.text.secondary }}
          >
            <li>
              Calcular requerimientos de producción basados en las ventas
              proyectadas
            </li>
            <li>Establecer políticas de inventario de productos terminados</li>
            <li>Balancear capacidad productiva con demanda proyectada</li>
            <li>Optimizar la planificación de producción por décadas</li>
          </ul>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Por favor, complete primero el Presupuesto de Ventas, ya que este será
          la base para la planificación de producción.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProductionBudgetPlaceholder;
