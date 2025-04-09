import React from "react";
import { Box, Paper, Typography, Alert, AlertTitle } from "@mui/material";
import {
  Inventory as PackageIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

/**
 * Componente placeholder para el presupuesto de materia prima
 * @param {Object} props Propiedades del componente
 * @param {Object} props.theme Tema de Material UI
 * @returns {JSX.Element} Componente renderizado
 */
const MaterialsBudgetPlaceholder = ({ theme }) => {
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
          Presupuesto de Materia Prima
        </AlertTitle>
        <Typography variant="body2">
          Este presupuesto permite estimar las necesidades de materia prima para
          cumplir con el plan de producción, considerando inventarios iniciales,
          políticas de inventario y eficiencia en el uso de materiales.
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
        <PackageIcon
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
          El presupuesto de materia prima está actualmente en desarrollo. Este
          módulo le permitirá:
        </Typography>

        <Box sx={{ mt: 1 }}>
          <ul
            style={{ textAlign: "left", color: theme.palette.text.secondary }}
          >
            <li>
              Calcular cantidades de materiales necesarios según estándares de
              producción
            </li>
            <li>Gestionar niveles de inventario de materias primas</li>
            <li>Programar compras de materiales de forma eficiente</li>
            <li>
              Estimar costos de materiales para la planificación financiera
            </li>
          </ul>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Es necesario completar primero los Presupuestos de Ventas y
          Producción, ya que son prerrequisitos para la planificación de materia
          prima.
        </Typography>
      </Paper>
    </Box>
  );
};

export default MaterialsBudgetPlaceholder;
