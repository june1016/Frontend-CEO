// src/hooks/personnel/useShiftAssignment.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/api/axiosConfig';
import { showAlert } from '../../../utils/alerts/alertHelpers';
import { updateProgress } from '../../../utils/shared/operationTime';


export const useShiftAssignment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShifts, setSelectedShifts] = useState({});
  const [operatorCount, setOperatorCount] = useState(0);
  const [machineTurnCounts, setMachineTurnCounts] = useState({});
  const [assignmentSummary, setAssignmentSummary] = useState({
    totalAssignedOperators: 0,
    totalShiftsCovered: 0,
    totalShiftSlots: 0,
  });

  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  const userId = userData?.id;

  // Obtener la cantidad de operarios contratados
  const fetchOperatorCount = async () => {
    try {
      const response = await axiosInstance.get(
        `/payrol-assig/payroll-improvements-assignments/user/${userId || 1}`
      );
      const allAssignments = response.data.data;

      const totalOperarios = allAssignments.reduce((acc, assignment) => {
        const roleName =
          assignment.PayrollRoleImprovement?.PayrollRole?.name || "";
        if (roleName.toLowerCase() === "operario") {
          return acc + Number(assignment.quantity);
        }
        return acc;
      }, 0);

      setOperatorCount(totalOperarios);
    } catch (error) {
      console.error("Error fetching payroll role improvements:", error);
      // En caso de error, establecer un valor por defecto para evitar bloqueo
      setOperatorCount(3);
    }
  };

  // Obtener las asignaciones de turnos actuales
  const fetchUserAssignments = async () => {
    try {
      const response = await axiosInstance.get(
        `/machineassig/machine-shifts/user/${userId || 1}`
      );

      const grouped = response.data.data;
      let totalAssignedOperators = 0;
      let totalShiftsCovered = 0;
      let totalShiftSlots = 0;

      try {
        Object.values(grouped).forEach((product) => {
          Object.values(product.machines).forEach((machine) => {
            totalShiftSlots += 3; // Cada máquina debe cubrir 3 turnos
            totalShiftsCovered += machine.shifts.length;
            machine.shifts.forEach((s) => {
              totalAssignedOperators += s.operator_count || 0;
            });
          });
        });
      } catch (err) {
        console.warn("Error procesando datos de turnos:", err);
      }

      setAssignmentSummary({
        totalAssignedOperators,
        totalShiftsCovered,
        totalShiftSlots,
      });
    } catch (error) {
      console.error("Error fetching assignment summary:", error);
    }
  };

  // Obtener la estructura de máquinas y turnos
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/machineassig/machine-shifts/user/1`);
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar/deseleccionar un turno
  const toggleShiftSelection = (machineId, shiftId) => {
    const key = `${machineId}-${shiftId}`;
    setSelectedShifts((prev) => {
      const updated = { ...prev };
      const updatedTurnCounts = { ...machineTurnCounts };

      if (updated[key]) {
        delete updated[key];
        updatedTurnCounts[machineId] = (updatedTurnCounts[machineId] || 1) - 1;
      } else {
        updated[key] = true;
        updatedTurnCounts[machineId] = (updatedTurnCounts[machineId] || 0) + 1;
      }

      setMachineTurnCounts(updatedTurnCounts);
      return updated;
    });
  };

  // Verificar si un turno está seleccionado
  const isSelected = (machineId, shiftId) => !!selectedShifts[`${machineId}-${shiftId}`];

  // Guardar asignaciones de turnos
  const saveShiftAssignments = async () => {
    try {
      const machinesWithNoTurnos = Object.values(data)
        .flatMap((product) => product.machines)
        .filter((machine) => {
          const count = Object.keys(selectedShifts).reduce((acc, key) => {
            const [machineId] = key.split("-");
            return Number(machineId) === machine.machine_id ? acc + 1 : acc;
          }, 0);
          return count === 0;
        });

      if (machinesWithNoTurnos.length > 0) {
        showAlert(
          "Asignación de turnos",
          "Cada máquina debe tener al menos 1 turno asignado.",
          "error",
          "#1C4384"
        );
        return false;
      }

      const totalTurnosSeleccionados = Object.keys(selectedShifts).length;

      if (totalTurnosSeleccionados > operatorCount) {
        showAlert(
          "Asignación de turnos",
          "Has asignado más turnos de los permitidos por la cantidad de operarios disponibles.",
          "error",
          "#1C4384"
        );
        return false;
      }

      const assignments = Object.keys(selectedShifts).map((key) => {
        const [machine_id, shift_id] = key.split("-");
        const operator_count = Object.keys(selectedShifts).filter(k => k.startsWith(`${machine_id}-`)).length;

        return {
          configuration_id: 1,
          machine_id: Number(machine_id),
          shift_id: Number(shift_id),
          operator_count,
          created_by: userId,
        };
      });

      const response = await axiosInstance.post(
        "/machineassig/machine-shifts/create",
        assignments
      );

      if (response.data.ok) {
        await axiosInstance.post(
          "/payrol-assig/payroll-improvements-assignments/available", // Ruta corregida
          {
            user_id: userId,
            available_quantity: operatorsAvailable,
          }
        );

        updateProgress(5);

        showAlert(
          "Asignación de turnos",
          "Asignaciones guardadas correctamente.",
          "success",
          "#1C4384"
        );

        fetchOperatorCount();
        setSelectedShifts({});
        setMachineTurnCounts({});
        return true;
      }
    } catch (error) {
      console.error("Error al guardar asignaciones:", error);
      showAlert(
        "Asignación de turnos",
        "Hubo un error al guardar las asignaciones.",
        "error",
        "#1C4384"
      );
    }
    return false;
  };

  // Formatear rango de tiempo (HH:MM - HH:MM)
  const formatTimeRange = (start, end) => `${start.slice(0, 5)}–${end.slice(0, 5)}`;

  // Calcular valores derivados
  const assignedTurnsTotal = Object.keys(selectedShifts).length;
  const operatorsAvailable = Math.max(operatorCount - assignedTurnsTotal, 0);
  const totalTurnsCovered = Object.keys(machineTurnCounts).reduce(
    (acc, key) => acc + machineTurnCounts[key], 0
  );
  const totalTurnsNeeded = data.length ? data.reduce((acc, product) => {
    return acc + (product.machines?.length || 0) * 3;
  }, 0) : 0;

  // Cargar datos iniciales
  useEffect(() => {
    fetchOperatorCount();
    fetchAssignments();
  }, []);

  // Actualizar resumen cuando cambien las asignaciones
  useEffect(() => {
    fetchUserAssignments();
  }, []);

  return {
    loading,
    data,
    selectedShifts,
    operatorCount,
    machineTurnCounts,
    assignmentSummary,
    assignedTurnsTotal,
    operatorsAvailable,
    totalTurnsCovered,
    totalTurnsNeeded,
    toggleShiftSelection,
    isSelected,
    saveShiftAssignments,
    formatTimeRange
  };
};