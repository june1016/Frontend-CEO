// src/hooks/suppliers/useSuppliers.js
import { useState, useEffect } from "react";
import axiosInstance from "../../services/api/axiosConfig";
import { showAlert } from "../../utils/alerts/alertHelpers";

// Datos de materias primas ajustados con unidades estandarizadas
const MOCK_MATERIALS = [
  { id: 1, code: "A1", name: "Material base", description: "Material básico estructural", unit: "LIBRAS", basePrice: 4000 },
  { id: 2, code: "A2", name: "Material de revestimiento", description: "Revestimiento para todos los productos", unit: "LITROS", basePrice: 6000 },
  { id: 3, code: "A3", name: "Material de refuerzo", description: "Refuerzo estructural para productos", unit: "KILOS", basePrice: 5000 },
  { id: 4, code: "A4", name: "Componente principal Alfaros", description: "Material específico para Alfaros", unit: "UNIDADES", basePrice: 4000 },
  { id: 5, code: "A5", name: "Componente secundario Alfaros", description: "Material complementario para Alfaros", unit: "UNIDADES", basePrice: 5000 },
  { id: 6, code: "A6", name: "Componente principal Betacos", description: "Material específico para Betacos", unit: "METROS", basePrice: 6000 },
  { id: 7, code: "A7", name: "Componente secundario Betacos", description: "Material complementario para Betacos", unit: "UNIDADES", basePrice: 4000 },
  { id: 8, code: "A8", name: "Componente principal Gamaroles", description: "Material básico para Gamaroles", unit: "LIBRAS", basePrice: 10000 },
  { id: 9, code: "A9", name: "Componente secundario Gamaroles", description: "Material complementario para Gamaroles", unit: "UNIDADES", basePrice: 7000 },
  { id: 10, code: "A10", name: "Material de acabado", description: "Acabado final para todos los productos", unit: "LITROS", basePrice: 8000 }
];

// Proveedores actualizados con datos ajustados
const MOCK_SUPPLIERS = [
  {
    id: 1,
    name: "Surtidor",
    logoFilename: "El surtidor.png",
    description: "Proveedor con entrega rápida y amplia variedad de materiales industriales.",
    location: "Medellín, Colombia",
    deliveryTime: 2,
    volumeDiscount: 3,
    paymentOptions: ["contado", "30 días", "60 días"],
    materials: [
      { materialId: 1, price: 4200 },  // +5% sobre precio base
      { materialId: 2, price: 6300 },  // +5% sobre precio base
      { materialId: 3, price: 4950 },  // -1% sobre precio base (buen precio)
      { materialId: 4, price: 4100 },  // +2.5% sobre precio base
      { materialId: 5, price: 4950 },  // -1% sobre precio base (buen precio)
      { materialId: 6, price: 6150 },  // +2.5% sobre precio base
      { materialId: 7, price: 4250 },  // +6.25% sobre precio base
      { materialId: 8, price: 9800 },  // -2% sobre precio base (buen precio)
      { materialId: 9, price: 7200 },  // +2.85% sobre precio base
      { materialId: 10, price: 8400 }  // +5% sobre precio base
    ]
  },
  {
    id: 2,
    name: "Top Almacén",
    logoFilename: "Top almacen.png",
    description: "Proveedor con precios competitivos y políticas de descuento atractivas.",
    location: "Bogotá, Colombia",
    deliveryTime: 4,
    volumeDiscount: 5,
    paymentOptions: ["contado", "30 días"],
    materials: [
      { materialId: 1, price: 3800 },  // -5% sobre precio base (buen precio)
      { materialId: 2, price: 5850 },  // -2.5% sobre precio base (buen precio)
      { materialId: 3, price: 5250 },  // +5% sobre precio base
      { materialId: 4, price: 3900 },  // -2.5% sobre precio base (buen precio)
      { materialId: 5, price: 5200 },  // +4% sobre precio base
      { materialId: 6, price: 5700 },  // -5% sobre precio base (buen precio)
      { materialId: 7, price: 4150 },  // +3.75% sobre precio base
      { materialId: 8, price: 10500 }, // +5% sobre precio base
      { materialId: 9, price: 6800 },  // -2.85% sobre precio base (buen precio)
      { materialId: 10, price: 7600 }  // -5% sobre precio base (buen precio)
    ]
  },
  {
    id: 3,
    name: "Padilla",
    logoFilename: "Padilla.png",
    description: "Especialista en materiales específicos con excelente calidad de producto.",
    location: "Cali, Colombia",
    deliveryTime: 3,
    volumeDiscount: 4,
    paymentOptions: ["contado", "30 días", "60 días"],
    materials: [
      { materialId: 1, price: 4100 },  // +2.5% sobre precio base
      { materialId: 2, price: 6200 },  // +3.33% sobre precio base
      { materialId: 3, price: 4700 },  // -6% sobre precio base (mejor precio)
      { materialId: 4, price: 3800 },  // -5% sobre precio base (mejor precio)
      { materialId: 5, price: 5300 },  // +6% sobre precio base
      { materialId: 6, price: 6400 },  // +6.66% sobre precio base
      { materialId: 7, price: 3850 },  // -3.75% sobre precio base (mejor precio)
      { materialId: 8, price: 10200 }, // +2% sobre precio base
      { materialId: 9, price: 7500 },  // +7.14% sobre precio base
      { materialId: 10, price: 8300 }  // +3.75% sobre precio base
    ]
  },
  {
    id: 4,
    name: "CostaMater",
    logoFilename: "CostaMater.png",
    description: "Proveedor industrial con fuertes descuentos por volumen y plazos extendidos.",
    location: "Barranquilla, Colombia",
    deliveryTime: 6,
    volumeDiscount: 8,
    paymentOptions: ["contado", "30 días", "60 días"],
    materials: [
      { materialId: 1, price: 4050 },  // +1.25% sobre precio base
      { materialId: 2, price: 5950 },  // -0.83% sobre precio base
      { materialId: 3, price: 5100 },  // +2% sobre precio base
      { materialId: 4, price: 4200 },  // +5% sobre precio base
      { materialId: 5, price: 4750 },  // -5% sobre precio base (mejor precio)
      { materialId: 6, price: 5800 },  // -3.33% sobre precio base (buen precio)
      { materialId: 7, price: 4150 },  // +3.75% sobre precio base
      { materialId: 8, price: 9600 },  // -4% sobre precio base (mejor precio)
      { materialId: 9, price: 6900 },  // -1.42% sobre precio base
      { materialId: 10, price: 8100 }  // +1.25% sobre precio base
    ]
  }
];

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
        // En una implementación real, esto haría llamadas a la API
        // Por ahora, simulamos una demora y usamos datos mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular obtener datos del backend
        setSuppliers(MOCK_SUPPLIERS);
        setMaterials(MOCK_MATERIALS);
        
        // Simular selecciones guardadas previamente (si existen)
        // En un caso real, esto vendría del backend
        const savedSelections = localStorage.getItem('supplierSelections');
        if (savedSelections) {
          setSelections(JSON.parse(savedSelections));
        }

        // Verificar si estamos en mes operacional (Mes 1-12)
        // En un caso real, esto vendría del estado global de la aplicación
        const operationalStatus = localStorage.getItem('operationalStatus');
        if (operationalStatus) {
          const { isOperational, decade } = JSON.parse(operationalStatus);
          setIsOperationalMonth(isOperational);
          setCurrentDecade(decade);
        }
        
      } catch (err) {
        console.error("Error fetching suppliers data:", err);
        setError("No se pudo cargar la información de proveedores");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Actualizar una selección de proveedor
  const updateSelection = (materialId, supplierId, paymentOption) => {
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
          paymentOption
        };
        return updatedSelections;
      } else {
        // Crear nueva selección
        return [...prevSelections, { materialId, supplierId, paymentOption }];
      }
    });
  };

  // Guardar todas las selecciones
  const saveSelections = async () => {
    try {
      // En una implementación real, esto enviaría los datos al backend
      // Por ahora, guardamos en localStorage para simulación
      localStorage.setItem('supplierSelections', JSON.stringify(selections));
      
      // Simulamos respuesta exitosa
      return { success: true };
    } catch (err) {
      console.error("Error saving supplier selections:", err);
      showAlert(
        "Error",
        "No se pudieron guardar las selecciones de proveedores",
        "error"
      );
      throw err;
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