import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";

import InfoCard from "../../common/infoCard";
import MarketingProductCard from "../common/market/MarketingProductCard";
import useProductInventory from "../hooks/useProductInventory";
import useMarketingConfiguration from "../hooks/useMarketingConfiguration";
import ToastNotification, { showToast } from "../../alerts/ToastNotification";
import { getUserId } from "../../../utils/timeManagement/operationTime";
import axiosInstance from "../../../services/api/axiosConfig";



const MarketingView = () => {
  const { products, loading: loadingProducts, error: errorProducts } = useProductInventory();
  const {
    configuration: marketingConfig,
    loading: loadingConfig,
    error: errorConfig,
  } = useMarketingConfiguration();

  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLocalProducts(products);
    }
  }, [products]);

  const handleChange = (idx, value) => {
    const updated = [...localProducts];
    updated[idx].investment_percent = value;
    setLocalProducts(updated);
  };

  const handleSave = async (product) => {
    try {
      const realUserId = getUserId();

      const payload = {
        inventories: [
          {
            product_id: product.id,
            investment_percent: product.investment_percent,
            created_by: realUserId,
            updated_by: realUserId
          },
        ],
      };

      const response = await axiosInstance.post(
        "/productsInventory/createProductInventory",
        payload
      );

      if (response.data.ok) {
        showToast("Configuración guardada correctamente", "success");
      } else {
        showToast("Error al guardar configuración", "error");
      }
    } catch (error) {
      console.error("Error al guardar configuración de producto:", error);
      showToast("Hubo un error al guardar", "error");
    }
  };

  const isLoading = loadingProducts || loadingConfig;

  const baseSuggested = marketingConfig
    ? {
      percent: marketingConfig.percent,
      cost: marketingConfig.cost,
    }
    : { percent: 0, cost: 0 };

  return (
    <Box>

      <ToastNotification />

      <Typography variant="h5" fontWeight={700} gutterBottom>
        Inversión en Marketing y Publicidad
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Configuración de inversión por producto
      </Typography>

      {isLoading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && (
        <>
          <InfoCard
            title="Información de Inversión"
            description={
              <>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>
                    La inversión aumenta la probabilidad de alcanzar las ventas proyectadas
                  </li>
                  <li>
                    No invertir puede resultar en hasta 20% menos de las ventas esperadas
                  </li>
                </ul>
              </>
            }
          />

          <Alert
            severity="warning"
            sx={{
              mb: 2,
              borderLeft: "4px solid",
              borderColor: "warning.main",
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
          >
            Riesgo sin inversión: hasta 20% menos en ventas proyectadas
          </Alert>

          <Grid container spacing={2} mt={2}>
            {localProducts.map((product, idx) => (
              <Grid item xs={12} md={4} key={product.id}>
                <MarketingProductCard
                  product={product}
                  baseSuggested={baseSuggested}
                  onChange={(val) => handleChange(idx, val)}
                  onSave={() => handleSave(product)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {errorProducts && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorProducts}
        </Alert>
      )}

      {errorConfig && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorConfig}
        </Alert>
      )}
    </Box>
  );
};

export default MarketingView;
