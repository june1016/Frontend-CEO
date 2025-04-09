import { useState } from "react";

/**
 * Hook personalizado para manejar los datos de los presupuestos
 * @param {Object} initialProducts Lista de productos con valores por defecto
 * @returns {Object} Estado y funciones para gestionar los datos de presupuestos
 */
export default function useBudgetData(initialProducts) {
  // Estado para el mes seleccionado
  const [selectedMonth, setSelectedMonth] = useState(1);

  // Estado para los datos mensuales de productos
  const [monthlyData, setMonthlyData] = useState(() => {
    // Inicializar el primer mes con los valores por defecto
    const initialData = {};
    initialProducts.forEach((product) => {
      if (!initialData[1]) initialData[1] = {};
      initialData[1][product.id] = product.defaultValue;
    });
    return initialData;
  });

  // Manejar cambio en los datos de un producto
  const handleProductChange = (month, productId, value) => {
    setMonthlyData((prev) => ({
      ...prev,
      [month]: {
        ...(prev[month] || {}),
        [productId]: Number.parseFloat(value) || 0,
      },
    }));
  };

  // Calcular valores por década basados en la distribución
  const calculateDecadeValues = (month, productId, distribution) => {
    const total = monthlyData[month]?.[productId] || 0;

    return {
      d1: Math.round((total * distribution.d1) / 100),
      d2: Math.round((total * distribution.d2) / 100),
      d3: Math.round((total * distribution.d3) / 100),
      total,
    };
  };

  return {
    selectedMonth,
    setSelectedMonth,
    monthlyData,
    handleProductChange,
    calculateDecadeValues,
  };
}
