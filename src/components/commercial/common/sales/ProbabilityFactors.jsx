import React from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Stack
} from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import TrendingUpIcon from "@mui/icons-material/TrendingUp"; // Icono para la derecha

const factors = [
  { label: "Marketing", value: "+8%" },
  { label: "Vendedores (2)", value: "+6%" },
  { label: "Políticas Crédito", value: "+5%" },
  { label: "Competitividad", value: "+2%" }
];

const getColor = (value, theme) => {
  if (!value) return theme.palette.text.secondary;
  const numeric = parseFloat(value);
  if (isNaN(numeric)) return theme.palette.text.secondary;

  if (numeric > 0) return theme.palette.success.main;
  if (numeric < 0) return theme.palette.error.main;
  return theme.palette.text.secondary;
};

const ProbabilityFactors = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <InsightsIcon color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Factores de Probabilidad
        </Typography>
      </Box>

      <Stack spacing={2}>
        {factors.map((item, i) => (
          <Paper
            key={i}
            elevation={1}
            sx={{
              p: 2,
              borderLeft: `4px solid ${getColor(item.value, theme)}`
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {item.label}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color={getColor(item.value, theme)}
                >
                  {item.value}
                </Typography>
              </Box>

              <TrendingUpIcon
                sx={{ color: getColor(item.value, theme) }}
              />
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default ProbabilityFactors;
