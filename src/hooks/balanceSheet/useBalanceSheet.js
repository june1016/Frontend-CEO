import { useState, useEffect } from 'react';
import axiosInstance from '../../services/api/axiosConfig';
import showAlert from '../../utils/alerts/alertHelpers';
import { updateProgress } from '../../components/dashboard/MonthProgress';

export const useBalanceSheet = (handleTab) => {
  // Estado para cada sección del balance
  const [activosCorrientes, setActivosCorrientes] = useState({
    "Dinero en caja": "",
    "Dinero en banco": "",
    "Cuentas por cobrar": "",
    "Inventario": "",
  });

  const [pasivosCorrientes, setPasivosCorrientes] = useState({
    "Cuentas por pagar": "",
    "Letras por pagar": "",
    "Obligaciones laborales": "",
    "Impuestos por pagar": "",
  });

  const [ppe, setPpe] = useState({
    "Muebles y enseres": "",
    "Patentes": "",
    "Maquinaria y equipo": "",
    "Equipos de cómputo": "",
  });

  const [pasivosLP, setPasivosLP] = useState({
    "Deuda a largo plazo": "",
  });

  const [patrimonio, setPatrimonio] = useState({
    "Capital social": "",
    "Utilidades retenidas": "",
  });

  const [formattedDataTitles, setFormattedDataTitles] = useState({});

  // Calcular totales del balance
  const [totals, setTotals] = useState({
    activosCorrientes: 0,
    ppe: 0,
    totalActivos: 0,
    pasivosCorrientes: 0,
    pasivosLP: 0,
    totalPasivos: 0,
    patrimonio: 0,
    balance: 0,
  });

  // Calcular todos los totales del balance cuando cambia cualquier entrada
  useEffect(() => {
    const calculateTotal = (items) => {
      return Object.values(items).reduce((sum, value) => {
        const numValue = Number.parseFloat(value) || 0;
        return sum + numValue;
      }, 0);
    };

    const activosCorrientesTotal = calculateTotal(activosCorrientes);
    const ppeTotal = calculateTotal(ppe);
    const pasivosCorrientesTotal = calculateTotal(pasivosCorrientes);
    const pasivosLPTotal = calculateTotal(pasivosLP);
    const patrimonioTotal = calculateTotal(patrimonio);

    const totalActivos = activosCorrientesTotal + ppeTotal;
    const totalPasivos = pasivosCorrientesTotal + pasivosLPTotal;
    const balance = totalActivos - totalPasivos - patrimonioTotal;

    setTotals({
      activosCorrientes: activosCorrientesTotal,
      ppe: ppeTotal,
      totalActivos,
      pasivosCorrientes: pasivosCorrientesTotal,
      pasivosLP: pasivosLPTotal,
      totalPasivos,
      patrimonio: patrimonioTotal,
      balance,
    });
  }, [activosCorrientes, pasivosCorrientes, ppe, pasivosLP, patrimonio]);

  useEffect(() => {
    const getFinancialTitle = async () => {
      try {
        const response = await axiosInstance.get("/financialdata/getDatatitles");
        const financialTitles = response.data.financialTitles;

        const formattedData = financialTitles.reduce((acc, title) => {
          acc[title.name] = {
            title_id: title.id,
            literal_id: title.FinancialData[0]?.literal_id || null,
          };
          return acc;
        }, {});

        setFormattedDataTitles(formattedData);
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
      }
    };

    getFinancialTitle();
  }, []);

  // Actualizar valores de entrada del balance
  const handleInputChange = (section, account, value) => {
    // Permitir solo números y punto decimal
    const numericValue = value.replace(/[^0-9.]/g, "");

    switch (section) {
      case "activosCorrientes":
        setActivosCorrientes({ ...activosCorrientes, [account]: numericValue });
        break;
      case "pasivosCorrientes":
        setPasivosCorrientes({ ...pasivosCorrientes, [account]: numericValue });
        break;
      case "ppe":
        setPpe({ ...ppe, [account]: numericValue });
        break;
      case "pasivosLP":
        setPasivosLP({ ...pasivosLP, [account]: numericValue });
        break;
      case "patrimonio":
        setPatrimonio({ ...patrimonio, [account]: numericValue });
        break;
      default:
        break;
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const formatData = () => {
    const allStates = {
      activosCorrientes,
      pasivosCorrientes,
      ppe,
      pasivosLP,
      patrimonio,
    };

    const formattedData = Object.values(allStates).flatMap((category) =>
      Object.entries(category).map(([name, value]) => {
        const DataTitles = formattedDataTitles[name];

        return {
          title_id: DataTitles?.title_id || null,
          literal_id: DataTitles?.literal_id || null,
          amount: parseFloat(value) || 0,
          created_by: userData?.id,
        };
      })
    );

    return { financialData: formattedData };
  };

  const sendFinancialData = async (financialData) => {
    try {
      if (!Array.isArray(financialData) || financialData.length === 0) {
        console.error("El array de datos financieros es requerido.");
        return;
      }

      const response = await axiosInstance.post(
        "/financialdata/createfinancialdata",
        {
          financialData,
        }
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;

      showAlert(
        "Balance general inicial",
        JSON.stringify(message, null, 2),
        "error",
        "#1C4384"
      );
      console.error(
        "Error al registrar datos financieros:",
        error.response?.data || error.message
      );
    }
  };

  // Función para guardar el balance
  const handleSave = async () => {
    // Verificar si el balance está cuadrado
    if (Math.abs(totals.balance) >= 0.01) {
      // Si no está cuadrado, mostrar un mensaje de error
      showAlert(
        "Balance general inicial",
        "El balance no cuadra. Por favor, revise los valores ingresados",
        "error",
        "#1C4384"
      );
      return;
    }

    const { financialData } = formatData();

    const responseFinancialData = await sendFinancialData(financialData);

    if (responseFinancialData?.ok) {
      updateProgress(1); 
      showAlert(
        "Balance general inicial",
        "Datos financieros registrados exitosamente",
        "success",
        "#1C4384",
        () => handleTab(null, 2)
      );
    }
  };

  return {
    activosCorrientes,
    pasivosCorrientes,
    ppe,
    pasivosLP,
    patrimonio,
    totals,
    handleInputChange,
    handleSave
  };
};