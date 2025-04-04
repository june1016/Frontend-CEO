import React from "react";
import {
  Box,
  Alert,
  AlertTitle,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Save as SaveIcon,
  Info as InfoIcon,
  Percent as PercentIcon,
} from "@mui/icons-material";

/**
 * Componente para la vista de configuración de presupuestos
 * @param {Object} props Propiedades del componente
 * @param {Object} props.budgetConfig Configuración del presupuesto
 * @param {Function} props.onSave Función para guardar la configuración
 * @param {Object} props.theme Tema de Material UI
 * @returns {JSX.Element} Componente renderizado
 */
const ConfigurationView = ({
  budgetConfig,
  onSave,
  theme,
  budgetType,
  alertMessage,
}) => {
  const {
    growthRates,
    decadeDistribution,
    handleGrowthChange,
    handleDecadeChange,
    validateDistribution,
  } = budgetConfig;

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
          Configuración de {budgetType?.title || "Presupuesto"}
        </AlertTitle>
        {alertMessage ||
          "Define el crecimiento mensual y la distribución por décadas para todo el año. Estos valores no podrán modificarse durante la operación."}
      </Alert>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #E5E7EB" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#EBF5FF" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.dark,
                }}
              >
                Mes
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.dark,
                }}
              >
                % Crecimiento
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.dark,
                }}
              >
                Década 1 (%)
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.dark,
                }}
              >
                Década 2 (%)
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.dark,
                }}
              >
                Década 3 (%)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 12 }).map((_, index) => {
              const month = index + 1;
              const distribution = decadeDistribution[index];
              const total = distribution.d1 + distribution.d2 + distribution.d3;
              const isInvalid = total !== 100;

              return (
                <TableRow
                  key={month}
                  hover
                  sx={{ "&:hover": { bgcolor: "#F3F4F6" } }}
                >
                  <TableCell sx={{ fontWeight: "medium" }}>
                    Mes {month}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <TextField
                        type="number"
                        value={growthRates[index]}
                        onChange={(e) =>
                          handleGrowthChange(month, e.target.value)
                        }
                        variant="outlined"
                        size="small"
                        sx={{ width: "100px" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PercentIcon
                                sx={{
                                  fontSize: 18,
                                  color: "text.secondary",
                                }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <IconButton
                                  size="small"
                                  sx={{ p: 0 }}
                                  onClick={() =>
                                    handleGrowthChange(
                                      month,
                                      String(growthRates[index] + 1)
                                    )
                                  }
                                ></IconButton>
                                <IconButton
                                  size="small"
                                  sx={{ p: 0 }}
                                  onClick={() =>
                                    handleGrowthChange(
                                      month,
                                      String(growthRates[index] - 1)
                                    )
                                  }
                                ></IconButton>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </TableCell>
                  {["d1", "d2", "d3"].map((decade) => (
                    <TableCell key={decade} align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <TextField
                          type="number"
                          value={distribution[decade]}
                          onChange={(e) =>
                            handleDecadeChange(month, decade, e.target.value)
                          }
                          variant="outlined"
                          size="small"
                          sx={{
                            width: "100px",
                            "& .MuiOutlinedInput-root": {
                              borderColor: isInvalid ? "error.main" : undefined,
                            },
                          }}
                          error={isInvalid}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PercentIcon
                                  sx={{
                                    fontSize: 18,
                                    color: "text.secondary",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
          sx={{
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Guardar y Continuar
        </Button>
      </Box>
    </Box>
  );
};

export default ConfigurationView;
