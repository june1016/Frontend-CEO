import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  useTheme
} from "@mui/material";
import ToastNotification, { showToast } from "../../components/alerts/ToastNotification";
import axiosInstance from "../../services/api/axiosConfig";
import { getUserId } from "../../utils/timeManagement/operationTime";

const MarketingConfigurationView = () => {
  const theme = useTheme();
  const [config, setConfig] = useState({ percent: 0, cost: 0 });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketingConfig = async () => {
      const realUserId = getUserId();
      setUserId(realUserId);

      try {
        const { data } = await axiosInstance.get("/marketing/getMarketingConfigurationByUser", {
          params: { user_id: realUserId },
        });

        if (data.ok && data.config) {
          setConfig({
            percent: data.config.percent,
            cost: data.config.cost,
          });
        } else {
          // fallback a configuración por defecto (usuario 1)
          const fallback = await axiosInstance.get("/marketing/getMarketingConfigurationInicial", {
            params: { user_id: 1 },
          });

          if (fallback.data.ok && fallback.data.configuration) {
            setConfig({
              percent: fallback.data.configuration.percent,
              cost: fallback.data.configuration.cost,
            });
          } else {
            showToast("No se encontró configuración por defecto", "warning");
          }
        }
      } catch (error) {
        console.error("Error cargando configuración de marketing:", error.message);
        showToast("Error al cargar configuración", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketingConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        user_id: userId,
        percent: config.percent,
        cost: config.cost,
      };

      const { data } = await axiosInstance.post("marketing/upsertMarketingConfiguration", payload);

      if (data.ok) {
        showToast("Configuración guardada correctamente", "success");
      } else {
        showToast("No se pudo guardar la configuración", "error");
      }
    } catch (error) {
      console.error("Error al guardar configuración:", error.message);
      showToast("Error al guardar configuración", "error");
    }
  };

  if (loading) {
    return <Typography>Cargando configuración...</Typography>;
  }

  return (
    <Box>
      <ToastNotification />

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Configuración de Marketing
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Define el porcentaje de incremento y el costo estimado para campañas de marketing.
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Porcentaje de incremento (%)"
              name="percent"
              value={config.percent}
              onChange={handleChange}
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Costo estimado (COP)"
              name="cost"
              value={config.cost}
              onChange={handleChange}
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave}>
            Guardar configuración
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MarketingConfigurationView;
