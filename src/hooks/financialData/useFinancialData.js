import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../services/api/axiosConfig";

/**
 * Hook personalizado para gestionar datos financieros
 * @returns {Object} Estado y calculadores relacionados con datos financieros
 */
export default function useFinancialData() {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFinancialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/financialdata/initialdata");

        // Verificar que la respuesta tenga la estructura esperada
        if (
          response &&
          response.data &&
          Array.isArray(response.data.financialData)
        ) {
          setFinancialData(response.data.financialData);
        } else {
          // Crear un array vacío si no hay datos o la estructura es incorrecta
          console.warn(
            "La estructura de datos recibida no es la esperada:",
            response.data
          );
          setFinancialData([]);
        }
      } catch (error) {
        console.error("Error al obtener datos financieros:", error);
        setError(error.message || "Error al cargar los datos financieros");
        setFinancialData([]);
      } finally {
        setLoading(false);
      }
    };

    getFinancialData();
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
