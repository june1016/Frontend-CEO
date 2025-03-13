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
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  NotificationsOutlined,
  QuestionAnswerOutlined,
  KeyboardArrowDown,
  PlayArrowOutlined,
} from "@mui/icons-material";
import MonthProgress from "./monthProgress";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth/authService";

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

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ gap: 2 }}>
        <MonthProgress />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<PlayArrowOutlined />}
            sx={{
              bgcolor: "#1C4384",
              "&:hover": {
                bgcolor: "#153265",
              },
              fontSize: "0.95rem",
              px: 3,
              py: 1,
              borderRadius: 1.5,
            }}
          >
            Iniciar Operaciones
          </Button>

          <IconButton
            size="large"
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: alpha("#000", 0.04),
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.75rem",
                  height: 18,
                  minWidth: 18,
                },
              }}
            >
              <NotificationsOutlined />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: alpha("#000", 0.04),
              },
            }}
          >
            <QuestionAnswerOutlined />
          </IconButton>

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
                Estudiante
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
