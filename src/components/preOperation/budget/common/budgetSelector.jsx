import React from "react";
import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

/**
 * Componente para seleccionar el tipo de presupuesto
 * @param {Object} props Propiedades del componente
 * @param {Array} props.budgetTypes Lista de tipos de presupuesto
 * @param {string} props.selectedBudget Presupuesto seleccionado
 * @param {Function} props.onSelectBudget Función para manejar la selección
 * @returns {JSX.Element} Componente renderizado
 */
const BudgetSelector = ({
  budgetTypes,
  selectedBudget,
  onSelectBudget,
  theme,
  savedBudgets = [],
}) => {

  const hasConfigAndOperational = ['config', 'operational'].every(item =>
    savedBudgets.includes(item)
  );

  const hasAllForMaterials = ['config', 'operational', 'production'].every(item =>
    savedBudgets.includes(item)
  );

  return (
    <Grid container spacing={3}>
      {budgetTypes.map((budget) => {

        const isSelected = selectedBudget === budget.id;
        const isDisabled =
          (budget.id === "production" && !hasConfigAndOperational) ||
          (budget.id === "materials" && !hasAllForMaterials);
        const BudgetIcon = budget.icon;

        return (
          <Grid item xs={12} md={4} key={budget.id}>
            <Card
              sx={{
                cursor: "pointer",
                border: isSelected
                  ? `1px solid ${theme.palette.primary.main}`
                  : "1px solid #E5E7EB",
                boxShadow: isSelected ? 2 : 1,
                transition: "all 0.3s ease",
                height: "100%", // Asegura que todas las tarjetas tengan la misma altura
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
              onClick={() =>
                !isDisabled && onSelectBudget(isSelected ? null : budget.id)
              }
            >
              <CardContent
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "flex-start", // Alinea elementos al inicio para mejor visualización
                  gap: 2,
                  flexGrow: 1, // Permite que el contenido crezca y ocupe todo el espacio disponible
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "50%",
                    bgcolor: isSelected
                      ? theme.palette.primary.main
                      : theme.palette.primary.lighter ||
                      "rgba(28, 67, 132, 0.1)",
                    color: isSelected ? "white" : theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    flexShrink: 0, // Evita que el icono se encoja
                  }}
                >
                  <BudgetIcon fontSize="medium" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {budget.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.3,
                      mt: 0.5,
                    }}
                  >
                    {budget.description}
                  </Typography>

                  {isDisabled && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        color: "error.main",
                        gap: 0.5,
                      }}
                    >
                      <InfoOutlinedIcon fontSize="small" />
                      <Typography variant="caption">
                        Completa los datos anteriores para habilitar esta opción.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BudgetSelector;
