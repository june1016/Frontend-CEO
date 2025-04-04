/**
 * Formatea un número con separadores de miles
 * @param {number} num Número a formatear
 * @returns {string} Número formateado
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat("es-ES").format(num);
};

/**
 * Formatea un número como moneda (COP)
 * @param {number} amount Cantidad a formatear
 * @returns {string} Cantidad formateada como moneda
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
