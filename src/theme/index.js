import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1c4384",
      light: "#4B69B9",
      dark: "#153265",
    },
    secondary: {
      main: "#5a8cff",
    },
    text: {
      primary: "#463924",
      secondary: "rgba(32, 34, 36, 0.8)",
    },
  },
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        },
      },
    },
  },
});
