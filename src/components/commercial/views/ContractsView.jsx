import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import InfoCard from "../../common/infoCard";
import ContractMonthlySummary from "../common/ContractMonthlySummary";
import ContractCard from "../common/ContractCard";


const ContractsView = () => {
  const contracts = [
    {
      code: "LIC-2025-001",
      validUntil: "30/12/2025",
      penalty: 30000000,
      startDate: "14/1/2025",
      endDate: "30/12/2025",
      products: [
        { name: "DELTAS", qty: 700, price: 32000 },
        { name: "OMEGRAS", qty: 700, price: 32000 },
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Contratos de Venta Fija Garantizada
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Configuración de créditos por producto
      </Typography>

      <InfoCard
        title="Información de Licitaciones"
        description={
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>
              En esta sección se muestran las licitaciones activas asociadas a tu cuenta. Si no tienes ninguna en este momento, no se mostrará información.
            </li>
            <li>
              Recuerda que las licitaciones solo pueden generarse a partir de eventos registrados en el sistema.
            </li>
            <li>Precios no negociables.</li>
            <li>
              Los productos <strong>Deltas</strong> y <strong>Omegras</strong> requieren una nueva máquina, la <strong>DLT45</strong>, para su producción. Esta máquina se habilitará en la sección de maquinaria únicamente si cuentas con licitaciones activas.
            </li>
          </ul>
        }
      />

      <Grid container spacing={2} mt={1}>
        {contracts.map((contract) => (
          <Grid item xs={12} key={contract.code}>
            <ContractCard contract={contract} />
          </Grid>
        ))}
      </Grid>

      <ContractMonthlySummary contracts={contracts} />
    </Box>
  );
};

export default ContractsView;
