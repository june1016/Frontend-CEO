// Frontend/src/hooks/balanceSheet/useBalanceSheet.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/api/axiosConfig';
import { showAlert } from '../../../utils/alerts/alertHelpers';
import { updateProgress } from '../../../utils/shared/operationTime';

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

  // ✅ Mapeo de títulos a literal_id según tu esquema de base de datos
  const getLiteralIdForTitle = (titleName) => {
    // Activos corrientes
    if (["Dinero en caja", "Dinero en banco", "Cuentas por cobrar", "Inventario"].includes(titleName)) {
      return 1; // "Activos corrientes"
    }
    // PPE (Propiedades, Planta y Equipo)
    if (["Maquinaria y equipo", "Equipos de cómputo", "Muebles y enseres", "Patentes"].includes(titleName)) {
      return 3; // "PPE"
    }
    // Pasivos corrientes
    if (["Cuentas por pagar", "Letras por pagar", "Obligaciones laborales", "Impuestos por pagar"].includes(titleName)) {
      return 2; // "Pasivos corrientes"
    }
    // Pasivo Largo Plazo
    if (titleName === "Deuda a largo plazo") {
      return 4; // "Pasivo Largo Plazo"
    }
    // Patrimonio
    if (["Capital social", "Utilidades retenidas"].includes(titleName)) {
      return 5; // "Patrimonio"
    }
    
    console.warn(`literal_id no encontrado para: ${titleName}`);
    return null;
  };

  useEffect(() => {
    const getFinancialTitle = async () => {
      try {
        const response = await axiosInstance.get("/financialdata/getDatatitles");
        const financialTitles = response.data.financialTitles;

        // ✅ Asignar literal_id basado en la lógica de negocio
        const formattedData = financialTitles.reduce((acc, title) => {
          acc[title.name] = {
            title_id: title.id,
            literal_id: getLiteralIdForTitle(title.name), // ✅ Obtener literal_id según el título
          };
          return acc;
        }, {});

        setFormattedDataTitles(formattedData);
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
        showAlert("Balance general", "Error al cargar títulos financieros.", "error");
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

    const formattedData = [];

    Object.values(allStates).forEach(category => {
      Object.entries(category).forEach(([name, value]) => {
        const titleData = formattedDataTitles[name];
        if (!titleData) {
          console.warn(`Título no encontrado: ${name}`);
          return;
        }

        if (!titleData.literal_id) {
          console.warn(`literal_id no encontrado para: ${name}`);
          return;
        }

        formattedData.push({
          title_id: titleData.title_id,
          literal_id: titleData.literal_id,
          amount: parseFloat(value) || 0,
          created_by: userData?.id,
        });
      });
    });

    return { financialData: formattedData };
  };

  const sendFinancialData = async (financialData) => {
    try {
      if (!Array.isArray(financialData) || financialData.length === 0) {
        showAlert("Balance general", "No hay datos para guardar.", "error");
        return { ok: false };
      }

      const response = await axiosInstance.post(
        "/financialdata/createfinancialdata",
        { financialData }
      );

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Error desconocido al guardar.";
      showAlert("Balance general", message, "error");
      console.error("Error al registrar datos financieros:", error);
      return { ok: false };
    }
  };

  // Función para guardar el balance
  const handleSave = async () => {
    // Verificar si el balance está cuadrado
    if (Math.abs(totals.balance) >= 0.01) {
      showAlert(
        "Balance general inicial",
        "El balance no cuadra. Por favor, revise los valores ingresados.",
        "error"
      );
      return;
    }

    const { financialData } = formatData();

    const response = await sendFinancialData(financialData);

    if (response?.ok) {
      updateProgress(1);
      showAlert(
        "Balance general inicial",
        "Datos financieros registrados exitosamente.",
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