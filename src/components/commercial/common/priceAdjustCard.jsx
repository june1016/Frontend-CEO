import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  LinearProgress,
  useTheme,
  Chip,
  Button,
  Fade
} from "@mui/material";

const PriceAdjustCard = ({ product, onSave }) => {
  const theme = useTheme();
  const [price, setPrice] = useState(product.currentPrice);
  const [variation, setVariation] = useState(0);
  const [competitiveness, setCompetitiveness] = useState({
    label: "",
    color: "default",
  });

  const [isEdited, setIsEdited] = useState(false);
  const [saved, setSaved] = useState(false);

  const averageSuggested = (product.suggestedMin + product.suggestedMax) / 2;

  useEffect(() => {
    const diff = price - averageSuggested;
    const percent = (diff / averageSuggested) * 100;
    setVariation(percent);

    // Evaluar competitividad
    if (percent >= -10 && percent <= 10) {
      setCompetitiveness({ label: "Precio competitivo", color: "success" });
    } else if (percent > 10 && percent <= 20) {
      setCompetitiveness({ label: "Precio elevado", color: "warning" });
    } else if (percent < -10) {
      setCompetitiveness({ label: "Precio demasiado bajo", color: "warning" });
    } else if (percent > 20) {
      setCompetitiveness({ label: "Precio poco competitivo", color: "error" });
    } else {
      setCompetitiveness({ label: "Precio fuera de rango", color: "default" });
    }
  }, [price, averageSuggested]);

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPrice(value);
      setIsEdited(true);
      setSaved(false);
    }
  };

  const getProgressColor = () => {
    if (variation < -20 || variation > 20) return "error";
    if (variation >= -10 && variation <= 10) return "success";
    return "warning";
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ productId: product.id, newPrice: price });
    }
    setIsEdited(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500); // Ocultar mensaje luego de 2.5s
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Precio sugerido: ${product.suggestedMin} - ${product.suggestedMax}
        </Typography>

        <Box mt={1}>
          <TextField
            label="Precio definido"
            type="number"
            value={price}
            onChange={handlePriceChange}
            fullWidth
            size="small"
          />
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Variación respecto al promedio: {variation.toFixed(1)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(Math.abs(variation), 100)}
            color={getProgressColor()}
            sx={{ height: 8, borderRadius: 1 }}
          />
        </Box>

        <Box mt={2}>
          <Chip
            label={competitiveness.label}
            color={competitiveness.color}
            variant="outlined"
          />
        </Box>

        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Fade in={saved}>
            <Typography variant="body2" color="success.main">
              ✓ Precio guardado correctamente
            </Typography>
          </Fade>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!isEdited}
            sx={{
              ml: "auto",
              bgcolor: theme.palette.primary.main,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Guardar Cambios
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PriceAdjustCard;
