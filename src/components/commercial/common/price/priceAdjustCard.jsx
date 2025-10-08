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
import { formatCurrency } from "../../../../utils/formatters/currencyFormatters";
import axiosInstance from "../../../../services/api/axiosConfig";
import { getUserId } from "../../../../utils/shared/operationTime";
import ToastNotification, { showToast } from "../../../common/ToastNotification";

const PriceAdjustCard = ({ product, onSave }) => {
  const theme = useTheme();
  const [price, setPrice] = useState(product.currentPrice);
  const [variation, setVariation] = useState(0);
  const [competitiveness, setCompetitiveness] = useState({
    label: "",
    color: "default",
  });

  const [saved, setSaved] = useState(false);

  const averageSuggested = (product.suggestedMin + product.suggestedMax) / 2;

  useEffect(() => {
    const diff = price - averageSuggested;
    const percent = (diff / averageSuggested) * 100;
    setVariation(percent);

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
    const cleaned = cleanInput(e.target.value);
    const value = parseFloat(cleaned);

    if (!isNaN(value)) {
      setPrice(value);
      setSaved(false);
    } else {
      setPrice("");
    }
  };

  const getProgressColor = () => {
    if (variation < -20 || variation > 20) return "error";
    if (variation >= -10 && variation <= 10) return "success";
    return "warning";
  };

  const formatThousands = (value) => {
    if (!value && value !== 0) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const cleanInput = (value) => {
    return value.replace(/[^\d]/g, "");
  };


  const handleSave = async () => {
    const userId = getUserId();

    try {
      const payload = {
        inventories: [
          {
            product_id: product.id,
            quantity: product.quantity || 0,
            unit_cost: price,
            credit30: product.credit30,
            credit60: product.credit60,
            created_by: userId,
          },
        ],
      };

      const response = await axiosInstance.post(
        "productsInventory/createProductInventory",
        payload
      );

      if (response.data.ok) {
        showToast(`Precio del producto "${product.name}" guardado correctamente`, "success");
      } else {
        showToast(response.data.message || "Algo salió mal al guardar", "warning");
      }

      if (onSave) {
        onSave({ productId: product.id, newPrice: price });
      }
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Ocurrió un error inesperado";

      showToast(backendMessage, "error");
      console.error("Error al guardar producto:", backendMessage);
    }
  };


  return (
    <Card>
      <CardContent>

        <ToastNotification />

        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Precio sugerido: {formatCurrency(product.suggestedMin)} - {formatCurrency(product.suggestedMax)}
        </Typography>

        <Box mt={3}>
          <TextField
            label="Precio definido"
            type="text"
            value={formatThousands(price)}
            onChange={handlePriceChange}
            fullWidth
            size="small"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9.]*",
            }}
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
