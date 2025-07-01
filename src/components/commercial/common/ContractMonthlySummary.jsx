// src/components/commercial/contracts/ContractMonthlySummary.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Alert,
  Button,
  Divider,
  Card,
  CardContent,
  useTheme,
  Chip,
} from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import EngineeringIcon from "@mui/icons-material/Engineering";

const ContractMonthlySummary = ({ contracts }) => {
  const theme = useTheme();

  const totalSales = contracts.reduce((acc, c) => {
    const total = c.products.reduce((sum, p) => sum + p.qty * p.price, 0);
    return acc + total;
  }, 0);

  const contract = contracts[0];

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, mt: 4 }}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          gap={1}
          sx={{ color: theme.palette.primary.main }}
        >
          <EngineeringIcon />
          <Typography variant="h6" fontWeight={700}>
            Resumen Mensual del Contrato
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="body2" gutterBottom>
                <strong>Ventas Totales:</strong>{" "}
                <Chip
                  label={`$${totalSales.toLocaleString()}`}
                  color="success"
                  size="small"
                />
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Máquina DLT45:</strong>{" "}
                <Chip label="Disponible" color="info" size="small" />
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Inicio:</strong> {contract.startDate}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Finalización:</strong> {contract.endDate}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" gutterBottom>
              <strong>Multa por Incumplimiento:</strong>{" "}
              <Chip
                label={`$${contract.penalty.toLocaleString()}`}
                color="error"
                size="small"
              />
            </Typography>
            <Button size="small" variant="outlined" sx={{ mt: 2 }}>
              Ver ejemplo
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Alert
          severity="warning"
          icon={<GavelIcon />}
          sx={{
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            • Requiere máquina DLT45 para producción<br />
            • Entrega mensual obligatoria<br />
            • El incumplimiento resulta en multa de $
            {contract.penalty.toLocaleString()}<br />
            • El contrato no puede cancelarse antes de su finalización
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ContractMonthlySummary;
