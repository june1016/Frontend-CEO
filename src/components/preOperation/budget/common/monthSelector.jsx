import React from "react";
import { Box, Typography, Button, Paper, Badge } from "@mui/material";
import { CalendarToday as CalendarIcon, Check as CheckIcon } from "@mui/icons-material";

/**
 * Componente para seleccionar el mes en la vista operativa
 * @param {Object} props Propiedades del componente
 * @param {number} props.selectedMonth Mes seleccionado
 * @param {Function} props.onSelectMonth Función para manejar la selección de mes
 * @param {Object} props.theme Tema de Material UI
 * @param {Object} props.configuredMonths Objeto que indica qué meses están configurados
 * @returns {JSX.Element} Componente renderizado
 */
const MonthSelector = ({ selectedMonth, onSelectMonth, theme, configuredMonths = {} }) => {
  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "#EBF5FF",
        border: "1px solid rgba(28, 67, 132, 0.2)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <CalendarIcon sx={{ color: theme.palette.primary.main }} />
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color={theme.palette.primary.main}
        >
          Seleccione un mes
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => {
          const month = index + 1;
          const isConfigured = configuredMonths[month] === true;
          
          return (
            <Badge
              key={month}
              badgeContent={isConfigured ? <CheckIcon fontSize="small" /> : null}
              color="success"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  width: 18,
                  height: 18,
                  padding: 0,
                  minWidth: 18,
                }
              }}
            >
              <Button
                key={month}
                variant={selectedMonth === month ? "contained" : "outlined"}
                onClick={() => onSelectMonth(month)}
                sx={{
                  minWidth: "auto",
                  bgcolor:
                    selectedMonth === month
                      ? theme.palette.primary.main
                      : "transparent",
                  color:
                    selectedMonth === month
                      ? "white"
                      : theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor:
                      selectedMonth === month
                        ? theme.palette.primary.dark
                        : "rgba(28, 67, 132, 0.1)",
                  },
                }}
              >
                Mes {month}
              </Button>
            </Badge>
          );
        })}
      </Box>
    </Paper>
  );
};

export default MonthSelector;