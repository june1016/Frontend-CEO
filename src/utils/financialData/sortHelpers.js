/**
 * Función para comparar valores para ordenamiento descendente
 * @param {Object} a - Primer objeto a comparar
 * @param {Object} b - Segundo objeto a comparar
 * @param {string} orderBy - Campo por el cual ordenar
 * @returns {number} - Resultado de la comparación (-1, 0, 1)
 */
export function descendingComparator(a, b, orderBy) {
  if (!a || !b) return 0;

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Obtiene el comparador adecuado según la dirección de ordenamiento
 * @param {string} order - Dirección de ordenamiento ('asc' o 'desc')
 * @param {string} orderBy - Campo por el cual ordenar
 * @returns {Function} - Función comparadora
 */
export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Ordena un array de manera estable
 * @param {Array} array - Array a ordenar
 * @param {Function} comparator - Función comparadora
 * @returns {Array} - Array ordenado
 */
export function stableSort(array, comparator) {
  if (!Array.isArray(array) || array.length === 0) return [];

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
