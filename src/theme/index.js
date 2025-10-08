// src/theme/index.js
import { createTheme } from "@mui/material/styles";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";

// ✅ Theme unificado (basado en dashboardTheme.js que es más completo)
const theme = createTheme({
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  palette: {
    primary: {
      main: "#1C4384",
      light: "#2D5AA3",
      dark: "#153265",
    },
    secondary: {
      main: "#4A90E2",
      light: "#6BA5E9",
      dark: "#3776C2",
    },
    success: {
      main: "#2E7D32",
      light: "#039855",
    },
    warning: {
      main: "#ED6C02",
      light: "#FF9238",
    },
    error: {
      main: "#D32F2F",
      light: "#E46962",
    },
    info: {
      main: "#0288D1",
    },
    grey: {
      100: "#F3F4F6",
      150: "#EEEEEE",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      800: "#1F2937",
    },
    background: {
      default: "#F8F9FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 6,
          padding: "8px 16px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d7d7d7",  // ← Mover desde CSS
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4384",  // ← Mover desde CSS
              borderWidth: "2px",
            },
          },
        },
      },
    },
    
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#1c4384",  // ← Equivalente a accent-color
          "&.Mui-checked": {
            color: "#1c4384",
          },
        },
      },
    },
  },
});

export default theme;