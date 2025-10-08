/**
 * Formatea un número con separadores de miles
 * @param {number|string} num Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (num) => {
  try {
    // Asegurarse de que num sea un número válido
    const validNum = Number(num);
    if (isNaN(validNum)) return "0";

    return new Intl.NumberFormat("es-ES").format(validNum);
  } catch (error) {
    console.error("Error al formatear número:", error);
    return "0";
  }
};

/**
 * Formatea un número como porcentaje
 * @param {number|string} value - Valor a formatear como porcentaje
 * @param {number} [decimals=1] - Número de decimales a mostrar
 * @returns {string} - Valor formateado como porcentaje
 */
export const formatPercentage = (value, decimals = 1) => {
  try {
    const validValue = Number(value);
    if (isNaN(validValue)) return "0%";

    return new Intl.NumberFormat("es-ES", {
      style: "percent",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(validValue / 100);
  } catch (error) {
    console.error("Error al formatear porcentaje:", error);
    return "0%";
  }
};
