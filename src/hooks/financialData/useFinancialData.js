import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../services/api/axiosConfig";
import {
  defaultIncomeStatement,
  defaultRawMaterials,
  defaultFinishedProducts,
} from "../../constants/financialData";

/**
 * Hook personalizado para gestionar datos financieros
 * @returns {Object} Estado y calculadores relacionados con datos financieros
 */
export default function useFinancialData() {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para datos de ejemplo (que no cambian, pero se podrían hacer editables)
  const [incomeStatement] = useState(defaultIncomeStatement);
  const [rawMaterials] = useState(defaultRawMaterials);
  const [finishedProducts] = useState(defaultFinishedProducts);

  // Obtener datos financieros iniciales
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

  // Calcular totales para el estado de resultados
  const incomeStatementTotals = useMemo(() => {
    try {
      // Asegurarse de que todos los objetos existen
      const sales = incomeStatement.sales || {};
      const costs = incomeStatement.costs || {};
      const expenses = incomeStatement.expenses || {};
      const otherItems = incomeStatement.otherItems || {};

      // Calcular ventas totales
      const totalSales = Object.values(sales).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular costos totales
      const totalCosts = Object.values(costs).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular utilidad bruta
      const grossProfit = totalSales - totalCosts;

      // Calcular gastos operacionales totales
      const totalOperatingExpenses = Object.values(expenses).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular utilidad operacional
      const operatingProfit = grossProfit - totalOperatingExpenses;

      // Calcular otros gastos totales
      const totalOtherExpenses = Object.values(otherItems).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
      );

      // Calcular utilidad antes de impuestos
      const profitBeforeTaxes = operatingProfit - totalOtherExpenses;

      // Calcular impuestos
      const taxes = parseFloat(incomeStatement.taxes) || 0;

      // Calcular utilidad neta
      const netProfit = profitBeforeTaxes - taxes;

      // Calcular EBITDA
      const ebitda =
        operatingProfit +
        (parseFloat(otherItems.depreciationAmortization) || 0);

      return {
        totalSales,
        totalCosts,
        grossProfit,
        totalOperatingExpenses,
        operatingProfit,
        totalOtherExpenses,
        profitBeforeTaxes,
        taxes,
        netProfit,
        ebitda,
      };
    } catch (error) {
      console.error(
        "Error al calcular totales del estado de resultados:",
        error
      );
      // Retornar valores predeterminados
      return {
        totalSales: 0,
        totalCosts: 0,
        grossProfit: 0,
        totalOperatingExpenses: 0,
        operatingProfit: 0,
        totalOtherExpenses: 0,
        profitBeforeTaxes: 0,
        taxes: 0,
        netProfit: 0,
        ebitda: 0,
      };
    }
  }, [incomeStatement]);

  // Calcular totales para el inventario
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
    financialData,
    loading,
    error,
    incomeStatement,
    rawMaterials,
    finishedProducts,
    totals,
    incomeStatementTotals,
    inventoryTotals,
  };
}
