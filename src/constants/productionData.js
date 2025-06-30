// src/constants/productionData.js
export const productionData = {
    alfaros: {
      // Presupuesto y producción real por década
      budget: [900, 700, 500],
      actual: [850, 720, 480],
      // Máquinas asociadas
      machines: [
        {
          id: 'NRX31-001',
          status: 'active',
          efficiency: 92,
          nextMaintenance: '2025-05-15',
          operators: [
            { shift: 1, assigned: true },
            { shift: 2, assigned: true },
            { shift: 3, assigned: false }
          ]
        },
        {
          id: 'NRX31-002',
          status: 'maintenance',
          efficiency: 85,
          nextMaintenance: '2025-05-10',
          operators: [
            { shift: 1, assigned: true },
            { shift: 2, assigned: false },
            { shift: 3, assigned: false }
          ]
        }
      ],
      summary: {
        activeOperators: 3,
        totalOperators: 6,
        averageEfficiency: 88.5,
        productionStatus: "normal" // 'critical', 'warning', 'normal'
      },
      // Materiales requeridos por unidad
      materials: {
        formula: {
          'A1': { amount: 1.5, unit: 'kg' },
          'A4': { amount: 3, unit: 'unidad' },
          'A5': { amount: 2, unit: 'unidad' },
          'A10': { amount: 0.3, unit: 'litro' }
        },
        // Stock actual
        stock: {
          'A1': { amount: 800, unit: 'kg', status: 'normal' },
          'A4': { amount: 1200, unit: 'unidad', status: 'warning' },
          'A5': { amount: 900, unit: 'unidad', status: 'normal' },
          'A10': { amount: 100, unit: 'litro', status: 'critical' }
        }
      },
      // Proveedor actual
      supplier: 'EL SURTIDOR'
    },
    betacos: {
      budget: [750, 650, 520],
      actual: [720, 680, 500],
      machines: [
        {
          id: 'XLG77-001',
          status: 'active',
          efficiency: 95,
          nextMaintenance: '2025-05-20',
          operators: [
            { shift: 1, assigned: true },
            { shift: 2, assigned: true },
            { shift: 3, assigned: true }
          ]
        }
      ],
      summary: {
        activeOperators: 3,
        totalOperators: 3,
        averageEfficiency: 95,
        productionStatus: "normal"
      },
      materials: {
        formula: {
          'A1': { amount: 1.2, unit: 'kg' },
          'A6': { amount: 2.5, unit: 'metro' },
          'A7': { amount: 4, unit: 'unidad' },
          'A10': { amount: 0.2, unit: 'litro' }
        },
        stock: {
          'A1': { amount: 800, unit: 'kg', status: 'normal' },
          'A6': { amount: 450, unit: 'metro', status: 'normal' },
          'A7': { amount: 850, unit: 'unidad', status: 'normal' },
          'A10': { amount: 100, unit: 'litro', status: 'critical' }
        }
      },
      supplier: 'TOP ALMACÉN'
    },
    gamaroles: {
      budget: [480, 420, 380],
      actual: [450, 410, 400],
      machines: [
        {
          id: 'CP23H-001',
          status: 'active',
          efficiency: 90,
          nextMaintenance: '2025-05-18',
          operators: [
            { shift: 1, assigned: true },
            { shift: 2, assigned: true },
            { shift: 3, assigned: false }
          ]
        }
      ],
      summary: {
        activeOperators: 2,
        totalOperators: 3,
        averageEfficiency: 90,
        productionStatus: "warning"
      },
      materials: {
        formula: {
          'A1': { amount: 0.8, unit: 'kg' },
          'A8': { amount: 1.5, unit: 'kg' },
          'A9': { amount: 2, unit: 'unidad' },
          'A10': { amount: 0.25, unit: 'litro' }
        },
        stock: {
          'A1': { amount: 800, unit: 'kg', status: 'normal' },
          'A8': { amount: 200, unit: 'kg', status: 'warning' },
          'A9': { amount: 300, unit: 'unidad', status: 'warning' },
          'A10': { amount: 100, unit: 'litro', status: 'critical' }
        }
      },
      supplier: 'PADILLA'
    }
  };