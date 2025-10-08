// src/hooks/suppliers/useSuppliers.js
import { useState, useEffect } from "react";
import axiosInstance from "../../../services/api/axiosConfig";
import { showAlert } from "../../../utils/shared/alerts/alertHelpers";

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // En una implementación real, esto vendría de un estado global
  // Por ahora, asumimos Mes 0 (isOperationalMonth = false)
  const [isOperationalMonth, setIsOperationalMonth] = useState(false);
  const [currentDecade, setCurrentDecade] = useState(1);

  // Verificar si tenemos personal específico contratado
  // En Mes 0, siempre debería devolver false
  const hasStaffMember = (role) => {
    if (!isOperationalMonth) return false; // Mes 0: no hay personal contratado

    // En una implementación real, verificaría el estado de contratación
    // Por ahora, para simulación en Mes 1-12:
    return role === 'jefe_produccion' || role === 'secretaria';
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [suppliersRes, materialsRes] = await Promise.all([
          axiosInstance.get('/provider/getmaterials/1'),
          axiosInstance.get('/material/all'),
        ]);

        if (suppliersRes?.data?.suppliers) {
          setSuppliers(suppliersRes.data.suppliers);
        }

        if (materialsRes?.data?.materials) {
          setMaterials(materialsRes.data.materials);
        }
        // Estado operacional
        const operationalStatus = localStorage.getItem('operationalStatus');
        if (operationalStatus) {
          const { isOperational, decade } = JSON.parse(operationalStatus);
          setIsOperationalMonth(isOperational);
          setCurrentDecade(decade);
        }

      } catch (err) {
        console.error("Error fetching suppliers or materials data:", err);
        setError("No se pudo cargar la información de proveedores y materiales");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Actualizar una selección de proveedor
  const updateSelection = (materialId, supplierId, paymentOption, price) => {
    if (!supplierId) return;

    setSelections(prevSelections => {
      // Buscar si ya existe una selección para este material
      const existingIndex = prevSelections.findIndex(s => s.materialId === materialId);

      if (existingIndex >= 0) {
        // Actualizar selección existente
        const updatedSelections = [...prevSelections];
        updatedSelections[existingIndex] = {
          ...updatedSelections[existingIndex],
          supplierId,
          paymentOption,
          price
        };
        return updatedSelections;
      } else {
        // Crear nueva selección
        return [...prevSelections, { materialId, supplierId, paymentOption, price }];
      }
    });
  };

  // Guardar todas las selecciones
  const saveSelections = async () => {
    try {
      if (selections.length === 0) {
        showAlert("Advertencia", "No hay selecciones para guardar.", "warning");
        return;
      }

      const userData = JSON.parse(localStorage.getItem("userData")) || null;
      const userId = userData.id;

      const response = await axiosInstance.post(`/provider/savematerials/${userId}`, selections);

      if (response.data.ok) {
        showAlert("Éxito", "Secciones guardadas correctamente.", "success");
        // Opcional: limpiar las selecciones si es necesario
        setSelections([]);
      } else {
        showAlert("Error", "Hubo un problema al guardar las selecciones.", "error");
      }
    } catch (err) {
      console.error("Error saving supplier selections:", err);
      showAlert("Error", "No se pudieron guardar las selecciones de proveedores", "error");
    }
  };

  return {
    suppliers,
    materials,
    selections,
    updateSelection,
    saveSelections,
    hasStaffMember,
    isOperationalMonth,
    currentDecade,
    loading,
    error
  };
};

export default useSuppliers;