import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";

import InfoCard from "../../common/infoCard";
import PriceAdjustCard from "../common/price/priceAdjustCard";
import MarketStudyModal from "../common/price/MarketStudyModal";
import useProductInventory from "../hooks/useProductInventory";

const PricesView = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { products, loading, error } = useProductInventory();

  return (
    <Box>
      {/* Título + Botón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Ajuste de Precios por Producto
        </Typography>

        <Button onClick={() => setModalOpen(true)}>Ver Estudio de Mercado</Button>
      </Box>

      <MarketStudyModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* InfoCard */}
      <InfoCard
        title="Información de Mercado"
        description="Los precios sugeridos se basan en un estudio de mercado actualizado. Puede establecer precios fuera del rango sugerido, considerando el impacto en la demanda y competitividad."
      />

      {/* Estado de carga o error */}
      {loading && <CircularProgress />}
      {error && <Alert severity="warning">{error}</Alert>}

      {/* Lista de productos */}
      <Grid container spacing={2} mt={2}>
        {products.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <PriceAdjustCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricesView;
