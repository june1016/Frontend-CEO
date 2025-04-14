import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../services/api/axiosConfig";

export const useMonthlyExpenses = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          obligationsRes,
          operatingRes,
          personnelExpensesRes,
          socialChargesRes,
        ] = await Promise.all([
          axiosInstance.get("/financialobligations/getInitialFinancialObligations"),
          axiosInstance.get("/operatingcosts/getInitialOperatingCosts"),
          axiosInstance.get("/personnelexpenses/getInitialPersonnelExpenses"),
          axiosInstance.get("/socialcharges/getInitialSocialCharges"),
        ]);

        const obligations = obligationsRes?.data?.financialObligations ?? [];
        const operating = operatingRes?.data?.operatingCosts ?? [];
        const personnelExpenses = personnelExpensesRes?.data?.personnelExpenses ?? [];
        const socialCharges = socialChargesRes?.data?.socialCharges ?? [];

        setMonthlyData({
          financialObligations: obligations,
          operationalExpenses: operating,
          personnelExpenses,
          socialCharges,
        });
      } catch (err) {
        console.error("Error al cargar gastos mensuales:", err);
        setError("No se pudo cargar los gastos mensuales");
        setMonthlyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyExpenses();
  }, []);

  const monthlyTotals = useMemo(() => {
    try {
      const sumValues = (items) =>
        items.reduce((sum, item) => sum + (parseFloat(item.value_cop) || 0), 0);

      const totalFinancialObligations = sumValues(monthlyData?.financialObligations ?? []);
      const totalOperatingCosts = sumValues(monthlyData?.operationalExpenses ?? []);
      const totalpersonnelExpenses = sumValues(monthlyData?.personnelExpenses ?? []);
      const totalSocialCharges = sumValues(monthlyData?.socialCharges ?? []);
      const grandTotal =
        totalFinancialObligations +
        totalOperatingCosts +
        totalpersonnelExpenses +
        totalSocialCharges;

      return {
        totalFinancialObligations,
        totalOperatingCosts,
        totalpersonnelExpenses,
        totalSocialCharges,
        grandTotal,
      };
    } catch (error) {
      console.error("Error al calcular totales mensuales:", error);
      return {
        totalFinancialObligations: 0,
        totalOperatingCosts: 0,
        totalpersonnelExpenses: 0,
        totalSocialCharges: 0,
        grandTotal: 0,
      };
    }
  }, [monthlyData]);

  return {
    monthlyData,
    monthlyTotals,
    loading,
    error,
  };
};
