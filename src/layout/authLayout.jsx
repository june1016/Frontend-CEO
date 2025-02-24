import React from "react";
import { Box } from "@mui/material";
import loginBg from "../assets/images/login-bg.png";

export default function authLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#4B69B9",
      }}
    >
      {/* Contenedor del fondo con tamaño máximo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "100%",
          maxWidth: "1920px",
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Contenedor del formulario */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
