import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Chip,
  useTheme,
  Paper,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const ContractCard = ({ contract }) => {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardHeader
        avatar={<Inventory2OutlinedIcon sx={{ color: "#ffffff" }} />}
        title={
          <Typography variant="h6" fontWeight={700} color="common.white">
            {contract.code}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="common.white">
            Válido hasta {contract.validUntil}
          </Typography>
        }
        action={<Chip label="Inversión Activa" color="success" size="small" />}
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          "& .MuiCardHeader-avatar": {
            marginRight: 1.5,
          },
          "& .MuiCardHeader-action": {
            alignSelf: "center",
            marginTop: 0,
          },
        }}
      />

      <CardContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          {contract.products.map((p, i) => (
            <Grid item xs={12} sm={6} key={p.name}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  height: "100%",
                  backgroundColor: i % 2 === 0
                    ? theme.palette.grey[50]
                    : theme.palette.background.default,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ color: theme.palette.primary.main, mb: 1 }}
                >
                  {p.name}
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Cantidad Mensual:</strong>{" "}
                  {p.qty.toLocaleString()} unidades
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Precio Fijo:</strong> $
                  {p.price.toLocaleString()} por unidad
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Ingreso Mensual:</strong> $
                  {(p.qty * p.price).toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContractCard;
