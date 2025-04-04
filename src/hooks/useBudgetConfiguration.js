import { useState, useCallback } from "react";

/**
 * Hook personalizado para manejar la configuración de los presupuestos
 * @returns {Object} Estado y funciones para gestionar la configuración de presupuestos
 */
export default function useBudgetConfiguration() {
  // Estado para las tasas de crecimiento por mes (inicializado correctamente)
  const [growthRates, setGrowthRates] = useState(Array(12).fill(0));

  // Estado para la distribución por décadas para cada mes
  // Creamos un array de objetos separados para evitar referencias compartidas
  const [decadeDistribution, setDecadeDistribution] = useState(
    Array(12)
      .fill(0)
      .map(() => ({ d1: 40, d2: 33, d3: 27 }))
  );

  // Manejar cambio en tasa de crecimiento (optimizado con useCallback)
  const handleGrowthChange = useCallback((month, value) => {
    const newValue = Number.parseFloat(value) || 0;
    setGrowthRates((prevRates) => {
      const newRates = [...prevRates];
      newRates[month - 1] = newValue;
      return newRates;
    });
  }, []);

  // Manejar cambio en distribución por década (optimizado con useCallback)
  const handleDecadeChange = useCallback((month, decade, value) => {
    const newValue = Number.parseFloat(value) || 0;
    setDecadeDistribution((prevDistribution) => {
      const newDistribution = [...prevDistribution];
      newDistribution[month - 1] = {
        ...newDistribution[month - 1],
        [decade]: newValue,
      };
      return newDistribution;
    });
  }, []);

  // Validar si la distribución de un mes suma 100%
  const validateDistribution = useCallback(
    (month) => {
      try {
        const distribution = decadeDistribution[month - 1];
        if (!distribution) return false;

        const total = distribution.d1 + distribution.d2 + distribution.d3;
        return Math.abs(total - 100) < 0.001; // Permitimos una pequeña tolerancia para errores de punto flotante
      } catch (error) {
        console.error("Error validando distribución:", error);
        return false;
      }
    },
    [decadeDistribution]
  );

  // Validar todas las distribuciones
  const validateAllDistributions = useCallback(() => {
    try {
      return decadeDistribution.every((_, index) =>
        validateDistribution(index + 1)
      );
    } catch (error) {
      console.error("Error validando todas las distribuciones:", error);
      return false;
    }
  }, [decadeDistribution, validateDistribution]);

  return {
    growthRates,
    decadeDistribution,
    handleGrowthChange,
    handleDecadeChange,
    validateDistribution,
    validateAllDistributions,
  };
}
