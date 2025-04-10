/**
 * Calcula los totales para todos los productos por década
 * @param {Array} products Lista de productos
 * @param {Function} calculateFn Función para calcular los valores por década
 * @param {number} month Mes seleccionado
 * @returns {Object} Totales por década y total general
 */
export const calculateTotals = (products, calculateFn, month) => {
  const d1Total = products.reduce(
    (sum, product) => sum + calculateFn(month, product.id).d1,
    0
  );

  const d2Total = products.reduce(
    (sum, product) => sum + calculateFn(month, product.id).d2,
    0
  );

  const d3Total = products.reduce(
    (sum, product) => sum + calculateFn(month, product.id).d3,
    0
  );

  const grandTotal = products.reduce(
    (sum, product) => sum + calculateFn(month, product.id).total,
    0
  );

  return {
    d1Total,
    d2Total,
    d3Total,
    grandTotal,
  };
};

/**
 * Calcula los requerimientos de producción basados en ventas y política de inventario
 * @param {number} salesQuantity Cantidad de ventas proyectadas
 * @param {number} initialInventory Inventario inicial
 * @param {number} finalInventoryPolicy Política de inventario final (porcentaje)
 * @returns {Object} Cantidades de producción calculadas
 */
export const calculateProductionRequirements = (
  salesQuantity,
  initialInventory,
  finalInventoryPolicy
) => {
  const finalInventory = Math.round(
    salesQuantity * (finalInventoryPolicy / 100)
  );
  const productionNeeded = salesQuantity + finalInventory - initialInventory;

  return {
    salesQuantity,
    initialInventory,
    finalInventory,
    productionNeeded: Math.max(0, productionNeeded),
  };
};

/**
 * Calcula los requerimientos de materia prima basados en producción
 * @param {number} productionQuantity Cantidad a producir
 * @param {Array} materials Lista de materiales con su consumo estándar
 * @param {Object} inventory Inventario actual de materiales
 * @param {number} inventoryPolicy Política de inventario final (porcentaje)
 * @returns {Array} Requerimientos de materiales calculados
 */
export const calculateMaterialRequirements = (
  productionQuantity,
  materials,
  inventory,
  inventoryPolicy
) => {
  return materials.map((material) => {
    const required = productionQuantity * material.standard;
    const finalInventory = Math.round(required * (inventoryPolicy / 100));
    const initialInventory = inventory[material.code] || 0;
    const purchaseNeeded = Math.max(
      0,
      required + finalInventory - initialInventory
    );

    return {
      ...material,
      required,
      initialInventory,
      finalInventory,
      purchaseNeeded,
      totalCost: purchaseNeeded * material.cost,
    };
  });
};
