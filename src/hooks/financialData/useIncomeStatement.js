import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../services/api/axiosConfig";

export const useIncomeStatement = () => {
  const [incomeStatement, setIncomeStatement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncomeStatementData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          salesResponse,
          costsResponse,
          operatingResponse,
          otherExpensesResponse,
        ] = await Promise.all([
          axiosInstance.get("/sales/getInitialSales"),
          axiosInstance.get("/salescosts/getInitialSalesCosts"),
          axiosInstance.get("/operatingexpenses/getInitialOperatingExpenses"),
          axiosInstance.get("/otherexpenses/getInitialOtherExpenses"),
        ]);

        const sales = salesResponse?.data?.sales ?? [];
        const costs = costsResponse?.data?.salesCost ?? [];
        const operating = operatingResponse?.data?.operatingExpenses ?? [];
        const otherExpenses = otherExpensesResponse?.data?.otherExpenses ?? [];

        setIncomeStatement({
          sales: {
            alfaros: sales[0]?.value_cop ?? "0",
            betacos: sales[1]?.value_cop ?? "0",
            gamaroles: sales[2]?.value_cop ?? "0",
          },
          costs: {
            alfaros: costs[0]?.value_cop ?? "0",
            betacos: costs[1]?.value_cop ?? "0",
            gamaroles: costs[2]?.value_cop ?? "0",
          },
          expenses: {
            administration: operating[0]?.value_cop ?? "0",
            sales: operating[1]?.value_cop ?? "0",
            other: operating[2]?.value_cop ?? "0",
          },
          otherItems: {
            financialExpenses: otherExpenses[0]?.value_cop ?? "0",
            depreciationAmortization: otherExpenses[1]?.value_cop ?? "0",
            taxes: otherExpenses[2]?.value_cop ?? "0",
          },
        });
      } catch (err) {
        console.error("Error al cargar income statement:", err);
        setError("No se pudo cargar el estado de resultados");
        setIncomeStatement(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeStatementData();
  }, []);

  const incomeStatementTotals = useMemo(() => {
    try {
      // Asegurarse de que todos los objetos existen
      const sales = incomeStatement?.sales || {};
      const costs = incomeStatement?.costs || {};
      const expenses = incomeStatement?.expenses || {};
      const otherItems = incomeStatement?.otherItems || {};

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
      const taxes = parseFloat(incomeStatement?.otherItems.taxes) || 0;

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


  return {
    incomeStatementTotals,
    incomeStatement,
    loading,
    error,
  };

};
