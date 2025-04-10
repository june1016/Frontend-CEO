import React from "react";
import { Wallet, Apartment, Work, AttachMoney } from "@mui/icons-material";

/**
 * Obtiene el icono correspondiente para una categoría financiera
 * @param {string} category - Categoría (Activos, Pasivos, Patrimonio, Otros)
 * @returns {JSX.Element} - Icono de React
 */
export const getCategoryIcon = (category) => {
  try {
    switch (category) {
      case "Activos":
        return <Wallet />;
      case "Pasivos":
        return <Apartment />;
      case "Patrimonio":
        return <Work />;
      case "Otros":
        return <AttachMoney />;
      default:
        return <Wallet />;
    }
  } catch (error) {
    console.error("Error al obtener icono de categoría:", error);
    return <Wallet />;
  }
};
