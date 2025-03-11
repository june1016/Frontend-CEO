// src/components/common/placeholderPage.jsx
import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Construction } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const PlaceholderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "calc(100vh - 64px)", // Altura total menos la barra de navegación
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: 800,
  width: "100%",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.common.white,
}));

const PlaceholderPage = ({ title, description }) => {
  return (
    <PlaceholderContainer>
      <StyledPaper elevation={0}>
        <IconWrapper>
          <Construction sx={{ fontSize: 40 }} />
        </IconWrapper>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          {title || "Sección en Desarrollo"}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          {description ||
            "Estamos trabajando para implementar esta sección. Pronto estará disponible con todas sus funcionalidades."}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1.2, borderRadius: 1.5 }}
          onClick={() => window.history.back()}
        >
          Volver
        </Button>
      </StyledPaper>
    </PlaceholderContainer>
  );
};

export default PlaceholderPage;
