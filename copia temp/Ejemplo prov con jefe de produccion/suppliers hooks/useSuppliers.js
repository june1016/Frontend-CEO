// src/hooks/suppliers/useSuppliers.js
import { useState, useEffect } from "react";
import axiosInstance from "../../services/api/axiosConfig";
import { showAlert } from "../../utils/alerts/alertHelpers";

// Datos de ejemplo (serán reemplazados con datos reales del backend)
const MOCK_SUPPLIERS = [
  {
    id: 1,
    name: "Surtidor",
    description: "Proveedor con entrega rápida y amplia variedad de materiales industriales.",
    location: "Medellín, Colombia",
    deliveryTime: 2,
    volumeDiscount: 3,
    paymentOptions: ["contado", "30 días", "60 días"],
    analysis: "Recomendado para materiales que necesiten entrega inmediata.",
    materials: [
      { materialId: 1, price: 12500 },
      { materialId: 2, price: 8700 },
      { materialId: 3, price: 18900 },
      { materialId: 4, price: 22300 },
      { materialId: 5, price: 9800 },
      { materialId: 6, price: 15600 },
      { materialId: 7, price: 27500 },
      { materialId: 8, price: 19400 },
      { materialId: 9, price: 5200 },
      { materialId: 10, price: 7600 }
    ]
  },
  {
    id: 2,
    name: "Top Almacén",
    description: "Proveedor con precios competitivos y políticas de descuento atractivas.",
    location: "Bogotá, Colombia",
    deliveryTime: 4,
    volumeDiscount: 5,
    paymentOptions: ["contado", "30 días"],
    analysis: "Buena relación calidad-precio en la mayoría de materiales.",
    materials: [
      { materialId: 1, price: 11800 },
      { materialId: 2, price: 8200 },
      { materialId: 3, price: 19500 },
      { materialId: 4, price: 21500 },
      { materialId: 5, price: 8900 },
      { materialId: 6, price: 16200 },
      { materialId: 7, price: 26800 },
      { materialId: 8, price: 18800 },
      { materialId: 9, price: 4800 },
      { materialId: 10, price: 8100 }
    ]
  },
  {
    id: 3,
    name: "Padilla",
    description: "Especialista en materiales específicos con excelente calidad de producto.",
    location: "Cali, Colombia",
    deliveryTime: 3,
    volumeDiscount: 4,
    paymentOptions: ["contado", "30 días", "60 días"],
    analysis: "Excelentes precios en materiales específicos para Alfaros y Betacos.",
    materials: [
      { materialId: 1, price: 13000 },
      { materialId: 2, price: 7800 },
      { materialId: 3, price: 16500 },
      { materialId: 4, price: 23400 },
      { materialId: 5, price: 9500 },
      { materialId: 6, price: 14800 },
      { materialId: 7, price: 29200 },
      { materialId: 8, price: 21000 },
      { materialId: 9, price: 5700 },
      { materialId: 10, price: 7200 }
    ]
  },
  {
    id: 4,
    name: "Industry",
    description: "Proveedor industrial con fuertes descuentos por volumen y plazos extendidos.",
    location: "Barranquilla, Colombia",
    deliveryTime: 6,
    volumeDiscount: 8,
    paymentOptions: ["contado", "30 días", "60 días"],
    analysis: "Ideal para compras de alto volumen con planificación anticipada.",
    materials: [
      { materialId: 1, price: 12000 },
      { materialId: 2, price: 8500 },
      { materialId: 3, price: 19000 },
      { materialId: 4, price: 21000 },
      { materialId: 5, price: 9000 },
      { materialId: 6, price: 15000 },
      { materialId: 7, price: 27000 },
      { materialId: 8, price: 19000 },
      { materialId: 9, price: 5000 },
      { materialId: 10, price: 7500 }
    ]
  }
];

const MOCK_MATERIALS = [
  { id: 1, code: "A1", name: "Material base para estructura", description: "Material básico usado en todos los productos", unit: "kg" },
  { id: 2, code: "A2", name: "Material de revestimiento", description: "Revestimiento común para todos los productos", unit: "m²" },
  { id: 3, code: "A3", name: "Componente principal Alfaros", description: "Material específico para producto Alfaros", unit: "unidad" },
  { id: 4, code: "A4", name: "Componente secundario Alfaros", description: "Componente complementario para Alfaros", unit: "unidad" },
  { id: 5, code: "A5", name: "Componente principal Betacos", description: "Material específico para producto Betacos", unit: "unidad" },
  { id: 6, code: "A6", name: "Componente secundario Betacos", description: "Componente complementario para Betacos", unit: "unidad" },
  { id: 7, code: "A7", name: "Componente principal Gamaroles", description: "Material específico para producto Gamaroles", unit: "unidad" },
  { id: 8, code: "A8", name: "Componente secundario Gamaroles", description: "Componente complementario para Gamaroles", unit: "unidad" },
  { id: 9, code: "A9", name: "Material de embalaje", description: "Material para empaque de todos los productos", unit: "m" },
  { id: 10, code: "A10", name: "Material de acabado", description: "Material para acabado final de todos los productos", unit: "l" }
];

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar si estamos en un mes operacional y en qué década
  const [isOperationalMonth, setIsOperationalMonth] = useState(false);
  const [currentDecade, setCurrentDecade] = useState(1);

  // Verificar si tenemos personal específico contratado
  const hasStaffMember = (role) => {
    // En una implementación real, esto verificaría si el rol está contratado
    // Por ahora, para simulación, retornamos:
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