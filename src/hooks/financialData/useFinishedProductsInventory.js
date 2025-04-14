import { useState, useEffect } from "react";
import axiosInstance from "../../services/api/axiosConfig";

export const useFinishedProductsInventory = () => {
  const [finishedProducts, setFinishedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinishedProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "/inventoryproducts/getInitialInventoryProducts"
        );

        const data = response?.data?.inventory ?? [];

        const formatted = data.map((item) => {
          const quantity = Number(item.quantity);
          const unitCost = Number(item.unit_cost);
          const totalValue = quantity * unitCost;

          return {
            product: item.product ?? "",
            quantity: quantity.toString(),
            costPerUnit: unitCost.toString(),
            totalValue,
          };
        });

        setFinishedProducts(formatted);
      } catch (err) {
        console.error("Error al obtener inventario de productos terminados:", err);
        setError("No se pudo cargar el inventario de productos terminados");
        setFinishedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedProducts();
  }, []);

  return { finishedProducts, loading, error };
};
