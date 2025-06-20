import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import {
  School,
} from "@mui/icons-material";


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

const AdminDashboard = () => {
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
        Panel de Administración
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
            ¡Bienvenido, Administrador!
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
            Desde este panel podrás gestionar los usuarios, asignar roles, y organizar los grupos de docentes y estudiantes.
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
              icon={<GroupIcon color="primary" />}
              title="Grupos Académicos"
              description="Organiza grupos asignando fácilmente estudiantes y docentes a cada uno según el plan de pasantía."
            />

            <InfoCard
              icon={<PersonIcon color="primary" />}
              title="Gestión de Usuarios"
              description="Accede al módulo de usuarios para ver todos los registrados y asignar roles como administrador, docente o estudiante."
            />

            <InfoCard
              icon={<School color="primary" />}
              title="Gestión de Universidades"
              description="Administra las universidades disponibles en el sistema antes de asignarlas a grupos o docentes."
            />
          </Box>
        </Box>
      </WelcomePaper>
    </Box>
  );
};

export default AdminDashboard;
