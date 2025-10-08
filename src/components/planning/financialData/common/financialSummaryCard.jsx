import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { formatMillions } from "../../../../utils/formatters/currencyFormatters";
import { getCategoryIcon } from "./iconHelper";
import { categoryColors } from "../../../../review/financialData";

/**
 * Componente para mostrar una tarjeta de resumen financiero
 * @param {Object} props - Propiedades del componente
 * @param {string} props.category - Categoría financiera (Activos, Pasivos, Patrimonio, etc.)
 * @param {number} props.total - Valor total
 * @returns {JSX.Element} - Componente renderizado
 */
const FinancialSummaryCard = ({ category, total }) => {
  return (
    <Card
      sx={{
        bgcolor: categoryColors[category]?.bg || "#f0f7ff",
        boxShadow: "none",
        border: "1px solid",
        borderColor: categoryColors[category]?.light || "#e5e7eb",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {category}
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
              {formatMillions(total)}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: categoryColors[category]?.avatar || "#6b7280",
              color: "white",
              width: 48,
              height: 48,
            }}
          >
            {getCategoryIcon(category)}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryCard;
