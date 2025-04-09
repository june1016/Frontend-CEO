/**
 * Formatea un número como moneda (COP)
 * @param {number|string} amount Cantidad a formatear
 * @returns {string} Cantidad formateada como moneda
 */
export const formatCurrency = (amount) => {
  try {
    // Asegurarse de que amount sea un número válido
    const validAmount = Number(amount);
    if (isNaN(validAmount)) return "$0";

    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(validAmount);
  } catch (error) {
    console.error("Error al formatear moneda:", error);
    return "$0";
  }
};

/**
 * Formatea un valor numérico en millones
 * @param {number|string} amount - Cantidad a formatear
 * @returns {string} - Valor formateado en millones
 */
export const formatMillions = (amount) => {
  try {
    // Asegurarse de que amount sea un número válido
    const validAmount = Number(amount);
    if (isNaN(validAmount)) return "0M";

    return `${Math.round(validAmount / 1000000)}M`;
  } catch (error) {
    console.error("Error al formatear en millones:", error);
    return "0M";
  }
};
