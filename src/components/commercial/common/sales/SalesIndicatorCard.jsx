import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// 🎨 Mapa de colores reutilizable
export const indicatorColorMap = {
  green: { bg: "#E8F5E9", color: "#2E7D32" },       // Ventas
  blue: { bg: "#E3F2FD", color: "#1565C0" },        // Vendedores
  orange: { bg: "#FFF3E0", color: "#EF6C00" },      // Por cobrar
  purple: { bg: "#F3E5F5", color: "#6A1B9A" },      // Comisiones
  gray: { bg: "#ECEFF1", color: "#546E7A" }         // Default
};

const SalesIndicatorCard = ({
  title,
  value,
  subtitle,
  icon,
  colorKey = "gray" // 👈 por defecto usa gris
}) => {
  const theme = useTheme();
  const colors = indicatorColorMap[colorKey] || indicatorColorMap.gray;

  const renderSubtitle = () => {
    if (!subtitle) return null;

    const isPositive = subtitle.includes("+");
    const isNegative = subtitle.includes("-");
    const color = isPositive
      ? theme.palette.success.main
      : isNegative
      ? theme.palette.error.main
      : theme.palette.text.secondary;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: 0.5,
          color,
        }}
      >
        {isPositive && <ArrowUpwardIcon fontSize="inherit" />}
        {isNegative && <ArrowDownwardIcon fontSize="inherit" />}
        <Typography variant="caption" fontWeight={500}>
          {subtitle}
        </Typography>
      </Box>
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        minHeight: 120,
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: 2 },
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: colors.bg,
            color: colors.color,
            width: 48,
            height: 48,
          }}
        >
          {icon}
        </Avatar>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight={700} lineHeight={1.3}>
            {value}
          </Typography>
          {renderSubtitle()}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesIndicatorCard;
