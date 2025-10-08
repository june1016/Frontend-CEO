import { useState, useEffect } from "react";

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
    if (month !== 1) {
      // No permitir cambios manuales para meses > 1
      return;
    }

    setMonthlyData((prev) => {
      const newData = {
        ...prev,
        [month]: {
          ...(prev[month] || {}),
          [productId]: Number.parseFloat(value) || 0,
        },
      };

      return newData;
    });
  };

  // Calcular valores por década basados en la distribución
  const calculateDecadeValues = (month, productId, distribution) => {
    // Obtener el valor total del producto para el mes
    const total = getProductTotal(month, productId);

    return {
      d1: Math.round((total * distribution.d1) / 100),
      d2: Math.round((total * distribution.d2) / 100),
      d3: Math.round((total * distribution.d3) / 100),
      total,
    };
  };

  // Calcular el valor total del producto para un mes específico
  const getProductTotal = (month, productId, growthRates = []) => {
    // Para el mes 1, usar el valor ingresado manualmente
    if (month === 1) {
      return monthlyData[1]?.[productId] || 0;
    }

    // Para los meses 2-12, calcular basado en el crecimiento acumulativo
    let baseValue = monthlyData[1]?.[productId] || 0;
    let totalGrowth = 100; // Base 100%

    // Aplicar crecimiento acumulativo desde el mes 2 hasta el mes actual
    for (let i = 1; i < month; i++) {
      totalGrowth += growthRates[i];
    }

    return Math.round((baseValue * totalGrowth) / 100);
  };

  // Obtener valores calculados para todos los meses
  const getCalculatedMonthlyData = (growthRates) => {
    const calculatedData = { ...monthlyData };

    // Generar datos para los meses 2-12
    initialProducts.forEach((product) => {
      for (let month = 2; month <= 12; month++) {
        if (!calculatedData[month]) calculatedData[month] = {};

        calculatedData[month][product.id] = getProductTotal(
          month,
          product.id,
          growthRates
        );
      }
    });

    return calculatedData;
  };

  return {
    selectedMonth,
    setSelectedMonth,
    monthlyData,
    handleProductChange,
    calculateDecadeValues,
    getProductTotal,
    getCalculatedMonthlyData,
  };
}
