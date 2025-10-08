import { useState, useEffect } from "react";
import axiosInstance from "../../../services/api/axiosConfig";
import { getUserId } from "../../../utils/shared/operationTime";

export const useFinishedProductsInventory = () => {
  const [finishedProducts, setFinishedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinishedProducts = async () => {
      setLoading(true);
      setError(null);

      const realUserId = getUserId();

      try {
        const teacherRes = await axiosInstance.get("/groupstudents/get-teacher-id", {
          params: { student_id: realUserId },
        });

        const teacherId = teacherRes.data.teacher_id;

        if (!teacherId) {
          setError("No estás asignado a ningún grupo. Pide a tu docente que te agregue.");
          setFinishedProducts([]);
          return;
        }

        const response = await axiosInstance.get(
          "/productsInventory/getProductInventoryByCreatedBy",
          {
            params: { created_by: teacherId },
          }
        );

        const data = response?.data?.inventories ?? [];

        const formatted = data.map((item) => {
          const quantity = Number(item.quantity);
          const unitCost = Number(item.unit_cost);
          const totalValue = quantity * unitCost;

          return {
            product: item.Product.name ?? "",
            quantity: quantity.toString(),
            costPerUnit: unitCost.toString(),
            totalValue,
          };
        });

        setFinishedProducts(formatted);
      } catch (err) {
        console.error("Error al obtener inventario de productos terminados:", err);

        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("No se pudo cargar el inventario de productos terminados.");
        }

        setFinishedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedProducts();
  }, []);


  return { finishedProducts, loading, error };
};
