import React from "react";
import { Alert, Typography, useTheme, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const KeyConsiderations = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
        Consideraciones Importantes
      </Typography>

      {/* Factores de Mercado */}
      <Alert
        severity="warning"
        icon={<WarningIcon fontSize="inherit" />}
        sx={{
          mb: 3,
          borderLeft: `4px solid ${theme.palette.warning.main}`,
          backgroundColor: theme.palette.warning.light + "22"
        }}
      >
        <Typography variant="body2" fontWeight={500}>
          <strong>Factores de Mercado:</strong>
        </Typography>
        <ul style={{ marginTop: 4, paddingLeft: 16 }}>
          <li>Alta sensibilidad al precio en segmento económico</li>
          <li>Competencia estable con jugadores establecidos</li>
          <li>Tendencia de precios con baja volatilidad</li>
          <li>Demanda constante con variaciones estacionales</li>
        </ul>
      </Alert>

      {/* Oportunidades */}
      <Alert
        severity="info"
        icon={<CheckCircleIcon fontSize="inherit" />}
        sx={{
          borderLeft: `4px solid ${theme.palette.success.main}`,
          backgroundColor: theme.palette.success.light + "22"
        }}
      >
        <Typography variant="body2" fontWeight={500}>
          <strong>Oportunidades:</strong>
        </Typography>
        <ul style={{ marginTop: 4, paddingLeft: 16 }}>
          <li>Margen para diferenciación en segmento premium</li>
          <li>Potencial para promociones estratégicas</li>
          <li>Nichos específicos en crecimiento</li>
          <li>Demanda insatisfecha en ciertos segmentos</li>
        </ul>
      </Alert>
    </Box>
  );
};

export default KeyConsiderations;
