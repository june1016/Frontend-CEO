import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import axiosInstance from "../../../services/api/axiosConfig";
import showAlert from "../../../utils/alerts/alertHelpers";
import { updateProgress } from "../../dashboard/monthProgress";

const ShiftAssignmentView = () => {
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

  const fetchOperatorCount = async () => {
    try {
      const response = await axiosInstance.get(
        `/payrol-assig/payroll-improvements-assignments/user/${userData.id}`
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
    }
  };

  const fetchUserAssignments = async () => {
    try {
      const response = await axiosInstance.get(
        `/machineassig/machine-shifts/user/${userData.id}`
      );

      const grouped = response.data.data;
      let totalAssignedOperators = 0;
      let totalShiftsCovered = 0;
      let totalShiftSlots = 0;

      Object.values(grouped).forEach((product) => {
        Object.values(product.machines).forEach((machine) => {
          totalShiftSlots += 3; // Cada máquina debe cubrir 3 turnos
          totalShiftsCovered += machine.shifts.length;
          machine.shifts.forEach((s) => {
            totalAssignedOperators += s.operator_count || 0;
          });
        });
      });

      setAssignmentSummary({
        totalAssignedOperators,
        totalShiftsCovered,
        totalShiftSlots,
      });
    } catch (error) {
      console.error("Error fetching assignment summary:", error);
    }
  };

  const handleSaveAssignments = async () => {
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
        return;
      }

      const totalTurnosSeleccionados = Object.keys(selectedShifts).length;

      if (totalTurnosSeleccionados > operatorCount) {
        showAlert(
          "Asignación de turnos",
          "Has asignado más turnos de los permitidos por la cantidad de operarios disponibles.",
          "error",
          "#1C4384"
        );
        return;
      }

      const assignments = Object.keys(selectedShifts).map((key) => {
        const [machine_id, shift_id] = key.split("-");
        const operator_count = Object.keys(selectedShifts).filter(k => k.startsWith(`${machine_id}-`)).length;

        return {
          configuration_id: 1,
          machine_id: Number(machine_id),
          shift_id: Number(shift_id),
          operator_count,
          created_by: userData.id,
        };
      });

      const response = await axiosInstance.post(
        "/machineassig/machine-shifts/create",
        assignments
      );

      if (response.data.ok) {
        await axiosInstance.post(
          "/payrol-assig/payroll-improvements-assignments/available",
          {
            user_id: userData.id,
            available_quantity: operatorsAvailable,
          }
        );
      }
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
    } catch (error) {
      console.error("Error al guardar asignaciones:", error);
      showAlert(
        "Asignación de turnos",
        "Hubo un error al guardar las asignaciones.",
        "error",
        "#1C4384"
      );
    }
  };



  const fetchAssignments = async () => {
    try {
      const response = await axiosInstance.get(
        `/machineassig/machine-shifts/user/${1}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperatorCount();
    fetchAssignments();
  }, []);

  useEffect(() => {
    fetchUserAssignments();
  }, [assignmentSummary]);

  const formatTimeRange = (start, end) =>
    `${start.slice(0, 5)}–${end.slice(0, 5)}`;

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

  const isSelected = (machineId, shiftId) =>
    !!selectedShifts[`${machineId}-${shiftId}`];

  const assignedTurnsTotal = Object.keys(selectedShifts).length;
  const operatorsAvailable = Math.max(operatorCount - assignedTurnsTotal, 0);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
      {/* Contenido principal */}
      <Box flex={3}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Cada máquina de cada producto debe tener operarios asignados en los
          tres turnos diarios.
        </Alert>

        {data.map((product) => (
          <Box key={product.product_id} mb={4}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {product.product_name}
            </Typography>

            {product.machines.map((machine) => {
              const assigned = machineTurnCounts[machine.machine_id] || 0;

              return (
                <Card
                  key={machine.machine_id}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 3,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    {machine.machine_name}
                  </Typography>

                  <Box display="flex" gap={2} flexWrap="wrap">
                    {machine.shifts.map((shift) => {
                      const selected = isSelected(
                        machine.machine_id,
                        shift.shift_id
                      );
                      return (
                        <Box
                          key={shift.shift_id}
                          flex={1}
                          minWidth={140}
                          borderRadius={2}
                          p={2}
                          sx={{
                            border: selected
                              ? "2px solid #1976d2"
                              : "1px solid #bbb",
                            backgroundColor: selected ? "#e3f2fd" : "#ffffff",
                            transition: "all 0.2s ease",
                            boxShadow: selected
                              ? "0px 0px 8px rgba(25, 118, 210, 0.2)"
                              : "none",
                          }}
                        >
                          <Typography fontWeight={600}>
                            {shift.shift_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatTimeRange(shift.start_time, shift.end_time)}
                          </Typography>
                          <Button
                            fullWidth
                            size="small"
                            variant={selected ? "contained" : "outlined"}
                            color="primary"
                            sx={{ mt: 1 }}
                            onClick={() =>
                              toggleShiftSelection(
                                machine.machine_id,
                                shift.shift_id
                              )
                            }
                          >
                            {selected ? "Quitar Operario" : "Asignar Operario"}
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>

                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Typography variant="body2" color="text.secondary">
                      Turnos asignados: {assigned}/3
                    </Typography>
                  </Box>
                </Card>
              );
            })}
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAssignments}
          sx={{ mt: 4 }}
          disabled={Object.keys(selectedShifts).length < 3}
        >
          Guardar todas las asignaciones
        </Button>

      </Box>

      {/* Panel lateral */}
      <Box flex={1}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            backgroundColor: "#f0f4ff",
            border: "1px solid #cdddfd",
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Información de Turnos
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" fontWeight={500} mb={1}>
            Operarios contratados:
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700}>
            {operatorCount}
          </Typography>

          <Typography variant="body1" fontWeight={500} mt={2} mb={1}>
            Turnos seleccionados:
          </Typography>
          <Typography variant="h5" color="secondary" fontWeight={700}>
            {assignedTurnsTotal}
          </Typography>

          <Typography variant="body1" fontWeight={500} mt={2} mb={1}>
            Operarios disponibles:
          </Typography>
          <Typography
            variant="h5"
            color={operatorsAvailable > 0 ? "success.main" : "error"}
            fontWeight={700}
          >
            {operatorsAvailable}
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            backgroundColor: "#f0f4ff",
            border: "1px solid #cdddfd",
            mt: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Resumen de Turnos
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" fontWeight={500} mb={1}>
            Turnos cubiertos:
          </Typography>
          <Typography variant="h5" color="success.main" fontWeight={700}>
            {
              Object.keys(machineTurnCounts).reduce(
                (acc, key) => acc + machineTurnCounts[key],
                0
              )
            }
          </Typography>

          <Typography variant="body1" fontWeight={500} mt={2} mb={1}>
            Turnos necesarios:
          </Typography>
          <Typography variant="h5" color="secondary" fontWeight={700}>
            {
              data.reduce((acc, product) => {
                return acc + product.machines.length * 3;
              }, 0)
            }
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ShiftAssignmentView;
