import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  NotificationsOutlined,
  QuestionAnswerOutlined,
  KeyboardArrowDown,
  PlayArrowOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth/authService";
import { resetOperation, startOperation } from "../../utils/timeManagement/operationTime";
import StartOperationModal from "../common/startOperationModal";
import showAlert from "../../utils/functions";
import MonthProgress from "./MonthProgress";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));


const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    name_rol: "",
    group_name: "",
    rol_id: ""
  });

  // Recuperar datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error("Error al recuperar datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  // Generar iniciales del usuario
  const getUserInitials = () => {
    if (userData.name && userData.lastName) {
      return `${userData.name.charAt(0)}${userData.lastName.charAt(
        0
      )}`.toUpperCase();
    }
    return "U"; // "User" si no hay datos
  };

  // Obtener nombre completo formateado
  const getFullName = () => {
    if (userData.name && userData.lastName) {
      return `${userData.name} ${userData.lastName}`;
    }
    return "Usuario";
  };

  const getUserRoleName = () => {
    return userData.name_rol || "Sin rol";
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
    handleClose();
  };

  const handleStartOperation = async () => {
    try {
      await startOperation();

      window.dispatchEvent(new CustomEvent('operationUpdated'));
      window.dispatchEvent(new CustomEvent('progressUpdated'));

    } catch (error) {
      console.error("Error al iniciar operación:", error);
      showAlert(
        "Error",
        "No se pudo iniciar la simulación",
        "error"
      );
    }
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ ml: '280px' }}>
          {userData.rol_id !== 1 && userData.rol_id !== 2 && (
            <MonthProgress />
          )}
        </Box>


        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {userData.rol_id !== 1 && userData.rol_id !== 2 &&  (
            <StartOperationModal onConfirm={handleStartOperation} />
          )}

          {userData.rol_id !== 1 && userData.group_name && (
            <Chip
              label={userData.group_name}
              color="primary"
              variant="outlined"
              sx={{
                fontWeight: 500,
                bgcolor: "background.paper",
                borderColor: "primary.main",
              }}
            />
          )}

          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: alpha("#1C4384", 0.1),
                color: "primary.main",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {getUserInitials()}
            </Avatar>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "flex-start",
                ml: 1.5,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "text.primary",
                }}
              >
                {getFullName()}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.85rem",
                  color: "text.secondary",
                  lineHeight: 1.2,
                }}
              >
                {getUserRoleName()}
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{
                ml: 0.5,
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: alpha("#000", 0.04),
                },
              }}
              onClick={handleMenu}
            >
              <KeyboardArrowDown />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: 1.5,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  mt: 1,
                },
              }}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Configuración</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
