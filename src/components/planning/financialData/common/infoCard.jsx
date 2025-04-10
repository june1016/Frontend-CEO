import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";

/**
 * Componente para mostrar una tarjeta informativa
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la tarjeta
 * @param {string} props.description - Descripción de la tarjeta
 * @param {React.ReactNode} props.icon - Icono a mostrar (opcional, por defecto InfoIcon)
 * @param {string} props.bgColor - Color de fondo (opcional)
 * @returns {JSX.Element} - Componente renderizado
 */
const InfoCard = ({
  title,
  description,
  icon = <InfoIcon />,
  bgColor = "linear-gradient(to right, rgba(28, 67, 132, 0.05), rgba(28, 67, 132, 0.1))",
}) => {
  return (
    <Card
      sx={{
        mb: 4,
        bgcolor: "primary.light",
        color: "white",
        background: bgColor,
        border: "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
            {icon}
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mb: 0.5, color: "primary.main" }}
            >
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
