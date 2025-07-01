// src/components/sales/SalesDashboardView.jsx
import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PercentIcon from '@mui/icons-material/Percent';

import SalesIndicatorCard from "../common/sales/SalesIndicatorCard";
import SalesBarChart from "../common/sales/SalesBarChart";
import ProbabilityFactors from "../common/sales/ProbabilityFactors";
import SalesProductSummary from "../common/sales/SalesProductSummary";
import AccountsReceivableSummary from "../common/sales/AccountsReceivableSummary";
import InfoCard from "../../common/infoCard";

// Array actualizado
const indicators = [
  {
    title: "Ventas Actuales",
    value: "$96.450.000",
    subtitle: "+32% de la meta",
    icon: <MonetizationOnIcon fontSize="large" />,
    colorKey: "green"
  },
  {
    title: "Vendedores",
    value: "2",
    subtitle: "+6% probabilidad",
    icon: <PeopleIcon fontSize="large" />,
    colorKey: "blue"
  },
  {
    title: "Por Cobrar",
    value: "$77.000.000",
    subtitle: "$45.000.000",
    icon: <ReceiptIcon fontSize="large" />,
    colorKey: "orange"
  },
  {
    title: "Comisiones",
    value: "$1.250.000",
    subtitle: "+1% por venta",
    icon: <PercentIcon fontSize="large" />,
    colorKey: "purple"
  }
];

const productData = [
  {
    name: "Alfaros",
    unitPrice: 65000,
    monthlyGoal: 2650,
    soldD1: 1650,
    stock: 250,
    coverage: 9,
    baseProbability: 70,
    priceFactor: -2
  },
  {
    name: "Betacos",
    unitPrice: 50000,
    monthlyGoal: 2650,
    soldD1: 2300,
    stock: 250,
    coverage: 9,
    baseProbability: 70,
    priceFactor: -2
  },
  {
    name: "Gamaroles",
    unitPrice: 65000,
    monthlyGoal: 2650,
    soldD1: 850,
    stock: 250,
    coverage: 9,
    baseProbability: 70,
    priceFactor: -2
  }
];

const receivableData = [
  {
    term: 30,
    amount: 32000000,
    dueDate: "2025-02-15"
  },
  {
    term: 60,
    amount: 45000000,
    dueDate: "2025-03-15"
  }
];

const SalesDashboardView = () => {
  const [receivables, setReceivables] = useState(receivableData);

  const handleCollect = (credit) => {
    console.log("Cobrado:", credit);
    // Aquí puedes simular eliminarlo de la lista
    setReceivables((prev) =>
      prev.filter((item) => item.dueDate !== credit.dueDate)
    );
  };

  return (
    <Box>
      {/* Indicadores */}
      <Grid container spacing={2} mt={1}>
        {indicators.map((indicator, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <SalesIndicatorCard {...indicator} />
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <SalesBarChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProbabilityFactors />
          </Grid>
        </Grid>
      </Box>

      <Box mt={5}>
        <SalesProductSummary products={productData} />
      </Box>

      <Box mt={5}>
        <AccountsReceivableSummary receivables={receivables} onCollect={handleCollect} />
      </Box>
    </Box>
  );
};

export default SalesDashboardView;
