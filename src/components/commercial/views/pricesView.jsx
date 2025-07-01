import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Stack
} from "@mui/material";
import InfoCard from "../../common/infoCard";
import PriceAdjustCard from "../common/priceAdjustCard";
import MarketStudyModal from "../common/MarketStudyModal";


const PricesView = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const mockProducts = [
    {
      id: "alfaros",
      name: "Alfaros",
      suggestedMin: 100,
      suggestedMax: 120,
      currentPrice: 110
    },
    {
      id: "betacos",
      name: "Betacos",
      suggestedMin: 150,
      suggestedMax: 170,
      currentPrice: 155
    },
    {
      id: "gamaroles",
      name: "Gamaroles",
      suggestedMin: 150,
      suggestedMax: 170,
      currentPrice: 155
    }
  ];

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

      {/* Lista de productos con componente reutilizable */}
      <Grid container spacing={2} mt={2}>
        {mockProducts.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <PriceAdjustCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricesView;
