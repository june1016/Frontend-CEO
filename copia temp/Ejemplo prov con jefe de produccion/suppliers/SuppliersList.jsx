// src/components/preOperation/suppliers/SuppliersList.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Skeleton,
  Rating
} from "@mui/material";
import {
  LocalShipping as ShippingIcon,
  Discount as DiscountIcon,
  Payments as PaymentsIcon,
  Star as StarIcon
} from "@mui/icons-material";
import SupplierCard from "./common/SupplierCard";

const SuppliersList = ({ suppliers, hasProductionManager, loading }) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} md={6} key={item}>
            <Card>
              <CardHeader
                title={<Skeleton width="60%" />}
                subheader={<Skeleton width="40%" />}
                avatar={<Skeleton variant="circular" width={40} height={40} />}
              />
              <CardContent>
                <Skeleton variant="rectangular" height={120} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!suppliers || suppliers.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No hay proveedores disponibles en este momento.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {suppliers.map((supplier) => (
        <Grid item xs={12} md={6} key={supplier.id}>
          <SupplierCard supplier={supplier} hasProductionManager={hasProductionManager} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SuppliersList;