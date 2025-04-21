import React from "react";
import { Box, Typography, Card, CardContent, CardHeader, Alert, AlertTitle } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const CustomInfoCard = ({ title, subtitle, icon, description, alertSeverity = "warning" }) => {
  return (
    <Alert
      severity={alertSeverity}
      icon={icon || <WarningIcon sx={{ color: "#FF9800" }} />}
      sx={{
        backgroundColor: "#FFF9C4",
        border: "1px solid #FF9800",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AlertTitle>
        {icon && <Box sx={{ marginRight: 1 }}>{icon}</Box>}
        {title}
      </AlertTitle>
      <Typography variant="body2">{description}</Typography>
    </Alert>
  );
};

export default CustomInfoCard;
