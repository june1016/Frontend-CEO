import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/dashboard/sidebar";
import Navbar from "../components/dashboard/navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
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
            mt: "64px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;