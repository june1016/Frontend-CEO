import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const WelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.grey[200]}`,
}));

const dashboardContent = () => {
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
        Dashboard
      </Typography>

      <WelcomePaper elevation={0}>
        <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            ¡Bienvenido a Pasantías.com!
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
            Esta es tu plataforma integral para gestionar y optimizar tu
            experiencia de pasantía. Aquí podrás planificar, ejecutar y dar
            seguimiento a todas tus actividades de manera eficiente.
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
            <Paper
              elevation={0}
              sx={{
                p: 3,
                flex: "1 1 200px",
                maxWidth: 250,
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 1,
                }}
              >
                Mes de Configuración
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                Estás en la fase inicial donde configurarás todos los aspectos
                necesarios para comenzar tu pasantía.
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                flex: "1 1 200px",
                maxWidth: 250,
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 1,
                }}
              >
                Próximos Pasos
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                Explora las diferentes secciones y prepárate para iniciar tus
                operaciones cuando estés listo.
              </Typography>
            </Paper>
          </Box>
        </Box>
      </WelcomePaper>
    </Box>
  );
};

export default dashboardContent;
