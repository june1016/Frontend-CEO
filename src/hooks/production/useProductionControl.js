// src/hooks/production/useProductionControl.js
import { useState, useMemo } from 'react';
import { productionData } from '../../constants/productionData';

export const useProductionControl = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('alfaros');

  // Obtener datos del producto seleccionado
  const productData = useMemo(() => {
    return productionData[selectedProduct] || {};
  }, [selectedProduct]);

  // Calcular totales y variaciones por década
  const decadeAnalysis = useMemo(() => {
    if (!productData.budget || !productData.actual) return [];

    return productData.budget.map((budget, index) => {
      const actual = productData.actual[index];
      const variation = ((actual - budget) / budget * 100).toFixed(1);
      const status = Math.abs(parseFloat(variation)) > 5 ? 'warning' : 'normal';

      return {
        decade: `Década ${index + 1}`,
        budget,
        actual,
        variation,
        status
      };
    });
  }, [productData]);

  // Calcular totales generales
  const totals = useMemo(() => {
    if (!productData.budget || !productData.actual) return {};

    const totalBudget = productData.budget.reduce((sum, value) => sum + value, 0);
    const totalActual = productData.actual.reduce((sum, value) => sum + value, 0);
    const variation = ((totalActual - totalBudget) / totalBudget * 100).toFixed(1);
    const status = Math.abs(parseFloat(variation)) > 5 ? 'warning' : 'normal';

    return {
      budget: totalBudget,
      actual: totalActual,
      variation,
      status
    };
  }, [productData]);

  // Datos para gráfico
  const chartData = useMemo(() => {
    if (!productData.budget || !productData.actual) return [];

    return productData.budget.map((budget, index) => ({
      name: `Década ${index + 1}`,
      Presupuesto: budget,
      Real: productData.actual[index]
    }));
  }, [productData]);

  // Análisis de materiales
  const materialsAnalysis = useMemo(() => {
    if (!productData.materials) return [];

    const formula = productData.materials.formula || {};
    const stock = productData.materials.stock || {};

    return Object.keys(formula).map(code => {
      const required = formula[code];
      const currentStock = stock[code];
      const unitsProducible = Math.floor(currentStock.amount / required.amount);
      
      return {
        code,
        required,
        stock: currentStock,
        unitsProducible
      };
    });
  }, [productData]);

  // Análisis de máquinas
  const machinesAnalysis = useMemo(() => {
    return productData.machines || [];
  }, [productData]);

  return {
    selectedMonth,
    setSelectedMonth,
    selectedProduct,
    setSelectedProduct,
    productData,
    decadeAnalysis,
    totals,
    chartData,
    materialsAnalysis,
    machinesAnalysis
  };
};