import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import axiosInstance from "../../../services/api/axiosConfig";
import useProductInventory from "../hooks/useProductInventory";
import CreditPolicyPerProduct from "../common/policy/CreditPolicyPerProduct";
import { getUserId } from "../../../utils/shared/operationTime";
import ToastNotification, { showToast } from "../../common/ToastNotification";


const CreditPolicyView = () => {
  const { products, loading, error } = useProductInventory();
  const [editableProducts, setEditableProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const mapped = products.map((product) => ({
        id: product.id,
        name: product.name || "Producto sin nombre",
        unit_cost: product.unit_cost,
        credit30: product.credit30 || 0,
        credit60: product.credit60 || 0,
        quantity: product.quantity,
      }));
      setEditableProducts(mapped);
    }
  }, [products]);

  const handleSliderChange = (index, field, value) => {
    const updated = [...editableProducts];
    updated[index][field] = value;
    setEditableProducts(updated);
  };

  const handleSave = async (product) => {
    const userId = getUserId();

    const payload = {
      inventories: [
        {
          product_id: product.id,
          unit_cost: product.unit_cost,
          quantity: product.quantity,
          credit30: product.credit30,
          credit60: product.credit60,
          created_by: userId,
        },
      ],
    };

    try {
      const res = await axiosInstance.post("productsInventory/createProductInventory", payload);

      if (res.data.ok) {
        showToast(`Producto "${product.name}" guardado correctamente`, "success");
      } else {
        showToast(res.data.message || "Ocurrió un error al guardar el producto", "warning");
      }
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message || err.message || "Error inesperado al guardar el producto";
      showToast(backendMessage, "error");
      console.error("Error al guardar:", backendMessage);
    }
  };

  if (loading) return <Typography>Cargando productos...</Typography>;
  if (error) return <Typography color="error">Error al cargar productos</Typography>;

  return (
    <Grid container spacing={2}>

      <ToastNotification />
      {editableProducts.map((product, index) => (
        <Grid item xs={12} md={4} key={product.id}>
          <CreditPolicyPerProduct
            product={product}
            index={index}
            onSliderChange={handleSliderChange}
            onSave={handleSave}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CreditPolicyView;
