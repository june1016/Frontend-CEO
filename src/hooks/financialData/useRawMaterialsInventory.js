import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../services/api/axiosConfig";
import { useFinishedProductsInventory } from "../../hooks/financialData/useFinishedProductsInventory.js";


export const useRawMaterialsInventory = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    finishedProducts
  } = useFinishedProductsInventory();

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axiosInstance.get(
          "/rawmaterialsinventory/getInitialRawMaterialsInventory"
        );

        const data = response?.data?.rawMaterialsInventory ?? [];

        const formatted = data.map((item) => {
          const quantity = Number(item.quantity);
          const unitCost = Number(item.unit_cost);
          const totalValue = quantity * unitCost;

          return {
            code: item.code ?? "",
            description: item.description ?? "",
            quantity: quantity.toString(),
            unit: item.unit ?? "",
            costPerUnit: unitCost.toString(),
            totalValue,
          };
        });

        setRawMaterials(formatted);
      } catch (err) {
        console.error("Error al obtener inventario de materias primas:", err);
        setError("No se pudo cargar el inventario");
        setRawMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRawMaterials();
  }, []);


  const inventoryTotals = useMemo(() => {
    try {
      if (!Array.isArray(rawMaterials) || !Array.isArray(finishedProducts)) {
        return {
          rawMaterialsTotal: 0,
          finishedProductsTotal: 0,
          inventoryTotal: 0,
        };
      }

      const rawMaterialsTotal = rawMaterials.reduce((sum, material) => {
        if (!material || typeof material !== "object") return sum;
        return sum + (parseFloat(material.totalValue) || 0);
      }, 0);

      const finishedProductsTotal = finishedProducts.reduce((sum, product) => {
        if (!product || typeof product !== "object") return sum;
        return sum + (parseFloat(product.totalValue) || 0);
      }, 0);

      return {
        rawMaterialsTotal,
        finishedProductsTotal,
        inventoryTotal: rawMaterialsTotal + finishedProductsTotal,
      };
    } catch (error) {
      console.error("Error al calcular totales del inventario:", error);
      // Retornar valores predeterminados
      return {
        rawMaterialsTotal: 0,
        finishedProductsTotal: 0,
        inventoryTotal: 0,
      };
    }
  }, [rawMaterials, finishedProducts]);

  return { 
    rawMaterials,
    inventoryTotals,
    finishedProducts,
    loading,
    error
   };
};
