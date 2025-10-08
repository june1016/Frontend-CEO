import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../../services/api/axiosConfig";
import { getUserId } from "../../../utils/shared/operationTime";

/**
 * Hook personalizado para gestionar datos financieros
 * @returns {Object} Estado y calculadores relacionados con datos financieros
 */
export default function useFinancialData() {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFinancialData = async () => {
      setLoading(true);
      setError(null);

      const realUserId = getUserId();

      try {
        const teacherRes = await axiosInstance.get("/groupstudents/get-teacher-id", {
          params: { student_id: realUserId },
        });

        const teacherId = teacherRes.data.teacher_id;

        const response = await axiosInstance.get("/financialdata/getfinancialdata/by-user", {
          params: { created_by: teacherId },
        });

        const financialData = response.data.financialData;

        if (financialData.length > 0) {
          setFinancialData(financialData);
        } else {
          setError("Tu docente aún no ha creado datos financieros.");
          setFinancialData([]);
        }
      } catch (err) {
        console.error("Error al cargar datos financieros:", err);

        if (err.response?.status === 404 && err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Ocurrió un error al intentar cargar los datos financieros.");
        }

        setFinancialData([]);
      } finally {
        setLoading(false);
      }
    };

    loadFinancialData();
  }, []);

  // Calcular totales por categoría
  const totals = useMemo(() => {
    try {
      if (!Array.isArray(financialData)) return {};

      return financialData.reduce((acc, item) => {
        if (!item || typeof item !== "object") return acc;

        const category = item.category || "Otros";
        // Convertimos a número para asegurarnos de que no se concatene
        const amount = parseFloat(item.amount || 0);

        if (isNaN(amount)) return acc;

        // Si la categoría ya existe, sumamos el amount, si no, la inicializamos
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error al calcular totales por categoría:", error);
      return {};
    }
  }, [financialData]);

  return {
    financialData,
    loading,
    error,
    totals
  };
}
