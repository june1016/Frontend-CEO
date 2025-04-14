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