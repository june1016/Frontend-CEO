// src/hooks/personnel/usePersonnel.js
import { useState, useEffect } from 'react';
import axiosInstance from '../../services/api/axiosConfig';
import showAlert from '../../utils/alerts/alertHelpers';
import { updateProgress } from '../../utils/timeManagement/operationTime';


export const usePersonnel = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRequiredHired, setAllRequiredHired] = useState(false);
  const [contractedRoles, setContractedRoles] = useState({
    gerente: true,
    operarios: 0,
    vendedores: 0,
    apoyo: {},
  });

  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  const userId = userData?.id;

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/payrol/payroll-roles");
      if (data.ok) {
        setRoles(data.roleImprovements);
      } else {
        showAlert(
          "Error en la Nómina",
          "No se pudieron cargar los datos de nómina.",
          "error",
          "#1C4384"
        );
      }
    } catch (err) {
      console.error(err);
      showAlert(
        "Error en la Nómina",
        "Error al obtener los datos de nómina.",
        "error",
        "#1C4384"
      );
    } finally {
      setLoading(false);
    }
  };

  // Agrupar roles por categoría
  const groupedByRole = roles.reduce((acc, item) => {
    const roleId = item.PayrollRole.id;
    const roleName = item.PayrollRole.name.toLowerCase();

    if (!acc[roleId]) {
      acc[roleId] = {
        id: roleId,
        name: item.PayrollRole.name,
        salary: item.PayrollRole.base_salary,
        optional: item.PayrollRole.optional,
        improvements: [],
        quantity: 0,
      };
    }

    acc[roleId].improvements.push(item.Improvement);
    return acc;
  }, {});

  // Manejar contratación/despido de personal
  const handleContract = (roleName, change = 1) => {
    const name = roleName.toLowerCase();
    setContractedRoles((prev) => {
      const updated = { ...prev };

      if (name.includes("operario")) {
        updated.operarios = Math.max(0, prev.operarios + change);
      } else if (name.includes("vendedor")) {
        updated.vendedores = Math.max(0, prev.vendedores + change);
      } else {
        const current = prev.apoyo[roleName] || 0;
        const newCount = current + change;
        updated.apoyo = {
          ...prev.apoyo,
          [roleName]: newCount > 1 ? 1 : Math.max(0, newCount),
        };
      }

      return updated;
    });
  };

  // Calcular costo total de nómina
  const calculateTotalPayroll = () => {
    let total = 0;

    Object.entries(groupedByRole).forEach(([_, role]) => {
      const name = role.name.toLowerCase();
      let quantity = 0;

      if (name.includes("gerente")) {
        quantity = 1;
      } else if (name.includes("operario")) {
        quantity = contractedRoles.operarios;
      } else if (name.includes("vendedor")) {
        quantity = contractedRoles.vendedores;
      } else {
        quantity = contractedRoles.apoyo[role.name] || 0;
      }

      total += role.salary * quantity;
    });

    return total;
  };

  // Guardar estructura de personal
  const saveStructure = async () => {
    if (contractedRoles.operarios < 3 || contractedRoles.vendedores < 1) {
      showAlert(
        "Error en la Nómina",
        "Debes contratar al menos 3 operarios y 1 vendedor.",
        "error",
        "#1C4384"
      );
      return false;
    }

    const assignments = [];

    Object.entries(groupedByRole).forEach(([_, role]) => {
      const name = role.name.toLowerCase();
      let quantity = 0;

      if (name.includes("gerente")) {
        quantity = 1;
      } else if (name.includes("operario")) {
        quantity = contractedRoles.operarios;
      } else if (name.includes("vendedor")) {
        quantity = contractedRoles.vendedores;
      } else {
        quantity = contractedRoles.apoyo[role.name] || 0;
      }

      if (quantity > 0) {
        role.improvements.forEach((imp) => {
          assignments.push({
            role_improvement_id: imp.id,
            configuration_id: 1,
            quantity,
            created_by: userId,
          });
        });
      }
    });

    try {
      const { data } = await axiosInstance.post(
        "/payrol-assig/payroll-improvements-assignments",
        assignments
      );

      if (data.message) {
        showAlert(
          "Nómina",
          "Nómina registrada exitosamente",
          "success",
          "#1C4384"
        );
        updateProgress(4);
        return true;
      }
    } catch (err) {
      console.error(err);
      showAlert(
        "Nómina",
        "Error al guardar la nómina",
        "error",
        "#1C4384"
      );
    }
    return false;
  };

  // Verificar si todos los roles requeridos están contratados
  useEffect(() => {
    const allRequiredHired = Object.entries(groupedByRole).every(([_, role]) => {
      if (!role.optional) {
        const name = role.name.toLowerCase();
        if (name.includes("operario")) {
          return contractedRoles.operarios >= 3;
        } else if (name.includes("vendedor")) {
          return contractedRoles.vendedores >= 1;
        }
        return true;
      }
      return true;
    });

    setAllRequiredHired(allRequiredHired);
  }, [contractedRoles, roles]);

  // Separar roles en básicos y opcionales
  const baseRoles = Object.entries(groupedByRole).filter(
    ([_, role]) => !role.optional
  );
  
  const optionalRoles = Object.entries(groupedByRole).filter(
    ([_, role]) => role.optional
  );

  return {
    loading,
    roles,
    baseRoles,
    optionalRoles,
    contractedRoles,
    allRequiredHired,
    groupedByRole,
    fetchRoles,
    handleContract,
    saveStructure,
    calculateTotalPayroll,
    userId
  };
};