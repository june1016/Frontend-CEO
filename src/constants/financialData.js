import {
  Wallet,
  Receipt,
  Apartment,
  Inventory,
  Computer,
  MenuBook,
  Build,
  EmojiEvents,
  CreditCard,
  Description,
  AccountBalance,
  Work,
  Savings,
  AttachMoney,
} from "@mui/icons-material";

// Mapeo de iconos para categorías financieras
export const iconMapping = {
  Wallet,
  Receipt,
  Apartment,
  Inventory,
  Computer,
  MenuBook,
  Build,
  EmojiEvents,
  CreditCard,
  Description,
  AccountBalance,
  Work,
  Savings,
  AttachMoney,
};

// Configuración de colores por categoría
export const categoryColors = {
  Activos: {
    bg: "#e6f7ee",
    text: "#0f766e",
    light: "#d1fae5",
    avatar: "#10b981",
  },
  Pasivos: {
    bg: "#fee2e2",
    text: "#b91c1c",
    light: "#fecaca",
    avatar: "#ef4444",
  },
  Patrimonio: {
    bg: "#dbeafe",
    text: "#1e40af",
    light: "#bfdbfe",
    avatar: "#3b82f6",
  },
  Otros: {
    bg: "#f3f4f6",
    text: "#4b5563",
    light: "#e5e7eb",
    avatar: "#6b7280",
  },
};

// Datos predeterminados para estado de resultados
export const defaultIncomeStatement = {
  sales: {
    alfaros: "850000000",
    betacos: "650000000",
    gamaroles: "450000000",
  },
  costs: {
    alfaros: "535500000",
    betacos: "396500000",
    gamaroles: "265500000",
  },
  expenses: {
    administration: "175500000",
    sales: "195000000",
    other: "97500000",
  },
  otherItems: {
    financialExpenses: "78000000",
    depreciationAmortization: "97500000",
  },
  taxes: "27250000",
};

// Datos predeterminados para inventario de materias primas
export const defaultRawMaterials = [
  {
    code: "A1",
    description: "Material A1",
    quantity: "2500",
    unit: "LIBRAS",
    costPerUnit: "8000",
    totalValue: 20000000,
  },
  {
    code: "A2",
    description: "Material A2",
    quantity: "1500",
    unit: "LITROS",
    costPerUnit: "12000",
    totalValue: 18000000,
  },
  {
    code: "A3",
    description: "Material A3",
    quantity: "1800",
    unit: "KILOS",
    costPerUnit: "9500",
    totalValue: 17100000,
  },
  {
    code: "A4",
    description: "Material A4",
    quantity: "2200",
    unit: "UNIDADES",
    costPerUnit: "7500",
    totalValue: 16500000,
  },
  {
    code: "A5",
    description: "Material A5",
    quantity: "1200",
    unit: "UNIDADES",
    costPerUnit: "11000",
    totalValue: 13200000,
  },
];

// Datos predeterminados para inventario de productos terminados
export const defaultFinishedProducts = [
  {
    product: "Alfaros",
    quantity: "320",
    costPerUnit: "139500",
    totalValue: 44640000,
  },
  {
    product: "Betacos",
    quantity: "250",
    costPerUnit: "132000",
    totalValue: 33000000,
  },
  {
    product: "Gamaroles",
    quantity: "180",
    costPerUnit: "123000",
    totalValue: 22140000,
  },
];
