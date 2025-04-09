import { useState } from "react";
import {
  getComparator,
  stableSort,
} from "../../utils/financialData/sortHelpers";

/**
 * Hook personalizado para ordenar datos en tablas
 * @param {Array} initialData - Datos iniciales a ordenar
 * @param {string} initialOrderBy - Campo inicial para ordenar
 * @param {string} initialOrder - Dirección inicial del ordenamiento ('asc' o 'desc')
 * @returns {Object} Estado y métodos para ordenar datos
 */
export default function useSortableData(
  initialData = [],
  initialOrderBy = "title",
  initialOrder = "asc"
) {
  const [order, setOrder] = useState(initialOrder);
  const [orderBy, setOrderBy] = useState(initialOrderBy);

  /**
   * Manejador para solicitar ordenamiento por un campo específico
   * @param {string} property - Campo por el cual ordenar
   */
  const handleRequestSort = (property) => {
    try {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    } catch (error) {
      console.error("Error al ordenar datos:", error);
    }
  };

  /**
   * Obtiene los datos ordenados
   * @param {Array} data - Datos a ordenar
   * @returns {Array} Datos ordenados
   */
  const getSortedData = (data) => {
    try {
      return stableSort(data, getComparator(order, orderBy));
    } catch (error) {
      console.error("Error al obtener datos ordenados:", error);
      return [];
    }
  };

  return {
    order,
    orderBy,
    handleRequestSort,
    getSortedData,
  };
}
