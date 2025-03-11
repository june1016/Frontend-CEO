import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../components/dashboard/sidebar";
import Navbar from "../components/dashboard/navbar";
import dashboardTheme from "../theme/dashboardTheme";
import { Outlet } from "react-router-dom";

const dashboardLayout = () => {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              mt: "64px", // Height of navbar
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default dashboardLayout;
