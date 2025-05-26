import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const WelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.grey[200]}`,
}));

const InfoCard = ({ title, description, icon }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      flex: "1 1 200px",
      maxWidth: 300,
      border: "1px solid",
      borderColor: "grey.200",
      borderRadius: 3,
      bgcolor: "background.paper",
    }}
  >
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      {icon}
      <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
      {description}
    </Typography>
  </Paper>
);

const TeacherPlanningIntro = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "text.primary",
          mb: 4,
          letterSpacing: "-0.5px",
        }}
      >
        Módulo de Planificación
      </Typography>

      <WelcomePaper elevation={0}>
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            ¡Hola, Docente!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Antes de iniciar, por favor completa las plantillas base del módulo de planificación. Esto permitirá guiar al estudiante en su proyecto de simulación con datos financieros realistas y estructurados.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
              mt: 4,
            }}
          >
            <InfoCard
              icon={<ChecklistIcon color="primary" />}
              title="Plantilla de Datos Financieros"
              description="Registra los costos iniciales, fuentes de ingresos estimadas y los recursos necesarios para el arranque del proyecto."
            />

            <InfoCard
              icon={<AssessmentIcon color="primary" />}
              title="Indicadores Financieros"
              description="Establece márgenes de utilidad, retorno de inversión y otros indicadores clave para el análisis del estudiante."
            />

            <InfoCard
              icon={<TipsAndUpdatesIcon color="primary" />}
              title="Consejos Iniciales"
              description="Incluye recomendaciones y buenas prácticas para que los estudiantes comprendan la lógica detrás de la planificación financiera."
            />
          </Box>
        </Box>
      </WelcomePaper>
    </Box>
  );
};

export default TeacherPlanningIntro;
