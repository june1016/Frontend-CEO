// src/hooks/machinery/useMachinery.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../../services/api/axiosConfig';
import { showAlert } from '../../../utils/alerts/alertHelpers';

export const useMachinery = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMachines = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/machine/getmachines/details");
      if (response.data?.ok) {
        setMachines(response.data.machines);
        // Seleccionar la primera máquina por defecto si hay máquinas disponibles
        if (response.data.machines.length > 0 && !selectedMachine) {
          setSelectedMachine(response.data.machines[0]);
        }
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al obtener las máquinas.";
      showAlert("Máquinas", message, "error", "#1C4384");
    } finally {
      setLoading(false);
    }
  };

  const selectMachine = (machine) => {
    setSelectedMachine(machine);
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return {
    machines,
    selectedMachine,
    loading,
    selectMachine,
    fetchMachines
  };
};