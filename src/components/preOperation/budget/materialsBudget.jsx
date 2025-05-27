import React, { useState, useEffect } from "react";
import { Box, Alert, AlertTitle, Typography, Chip, Card, CardContent, CardHeader } from "@mui/material";
import MonthSelector from "./common/monthSelector";
import axiosInstance from "../../../services/api/axiosConfig.js";
import InfoCard from "../../common/infoCard.jsx";
import MaterialsTable from "./common/materialsTable.jsx";

// Definimos el componente
const MaterialsBudget = ({ theme, budgetConfig, budgetType }) => {
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [projectedSales, setProjectedSales] = useState([]);

    // Estado para las políticas de inventario
    const [inventoryPolicies, setInventoryPolicies] = useState({});

    // Estado para rastrear qué meses han sido configurados
    const [configuredMonths, setConfiguredMonths] = useState(() => {
        const initialConfigured = {};
        for (let i = 1; i <= 12; i++) {
            initialConfigured[i] = false;
        }
        return initialConfigured;
    });

    // Estado para el diálogo de confirmación
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const userData = JSON.parse(localStorage.getItem("userData")) || null;

    const userId = userData.id;

    useEffect(() => {
        const fetchProjectedSales = async () => {
            try {
                const response = await axiosInstance.get(`/salesbudget/getProjectSales/${userId}`);
                if (response.data.ok) {
                    setProjectedSales(response.data.data);
                } else {
                    console.error("Error al obtener las proyecciones de ventas.");
                }
            } catch (error) {
                console.error("Error en la llamada a la API de proyecciones:", error);
            }
        };
    
        if (userId) {
            fetchProjectedSales();
        }
    }, [userId]);

    // Llamada a la API para obtener las políticas de inventario
    useEffect(() => {
        const fetchInventoryPolicies = async () => {
            try {
                const response = await axiosInstance.get(`/inventorypolice/getinventorypolice/${userId}`);
                if (response.data.ok) {
                    // Asumiendo que la respuesta tiene la forma de un objeto con las políticas por mes
                    const policies = response.data.inventoryPolicies.reduce((acc, policy) => {
                        acc[policy.month_id] = policy.value;
                        return acc;
                    }, {});

                    setInventoryPolicies(policies);
                } else {
                    console.error("Error al obtener las políticas de inventario.");
                }
            } catch (error) {
                console.error("Error en la llamada a la API:", error);
            }
        };

        if (userId) {
            fetchInventoryPolicies();
        }
    }, []);

    // Marcar el mes como configurado
    const markMonthAsConfigured = () => {
        setConfiguredMonths(prev => ({
            ...prev,
            [selectedMonth]: true
        }));
    };

    // Verificar si el mes actual ha sido configurado
    const isCurrentMonthConfigured = configuredMonths[selectedMonth];

    // Obtener la política de inventario heredada según el mes seleccionado
    const inventoryPolicyForMonth = inventoryPolicies[selectedMonth] || 10;  // Si no existe la política, por defecto 10%

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Selector de Mes */}
            <MonthSelector
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
                theme={theme}
                configuredMonths={configuredMonths}
            />

            {/* InfoCard con la política de inventario */}
            <InfoCard
                title={`Política de Inventario Final - Mes ${selectedMonth}`}
                description={`Política de Inventario Final (heredada): ${inventoryPolicyForMonth}%`}
            />

            <MaterialsTable userId={userId} projectedSales={projectedSales}/>


        </Box>
    );
};

export default MaterialsBudget;
