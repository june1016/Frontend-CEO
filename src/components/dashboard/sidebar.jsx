import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
  alpha,
} from "@mui/material";
import {
  DashboardOutlined,
  AssessmentOutlined,
  BusinessOutlined,
  SettingsOutlined,
  LogoutOutlined,
  PlayArrowOutlined,
  ShoppingCartOutlined,
  FactoryOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/auth/authService";
import { DASHBOARD_ROUTES } from "../../config/routes";

const drawerWidth = 260;

const Logo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3),
  height: 64,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: "4px 8px",
  borderRadius: theme.shape.borderRadius,
  padding: "10px 16px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.common.white,
    },
    "& .MuiListItemText-primary": {
      fontWeight: 600,
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 36,
  color: theme.palette.text.secondary,
  transition: "color 0.2s ease-in-out",
  "& svg": {
    fontSize: 22,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: "10px 16px",
  justifyContent: "flex-start",
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease-in-out",
  fontSize: "0.95rem",
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.04),
  },
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(2),
  },
}));

// Definición de secciones del menú con sus rutas e iconos
const menuItems = [
  {
    text: "Panel de control",
    icon: <DashboardOutlined />,
    path: DASHBOARD_ROUTES.DASHBOARD,
  },
  {
    text: "Planificación",
    icon: <AssessmentOutlined />,
    path: DASHBOARD_ROUTES.PLANNING,
  },
  {
    text: "Pre-Operación",
    icon: <PlayArrowOutlined />,
    path: DASHBOARD_ROUTES.PRE_OPERATION,
  },
  {
    text: "Producción y Operaciones",
    icon: <FactoryOutlined />,
    path: DASHBOARD_ROUTES.PRODUCTION,
  },
  {
    text: "Inventarios y Compras",
    icon: <ShoppingCartOutlined />,
    path: DASHBOARD_ROUTES.INVENTORY,
  },
  {
    text: "Gestión Comercial",
    icon: <BusinessOutlined />,
    path: DASHBOARD_ROUTES.COMMERCIAL,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Asegurarse de que el logout limpie correctamente las cookies y localStorage
    authService.logout();
    // Redireccionar al login después de cerrar sesión
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "grey.200",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Logo>
        <Box
          sx={{
            width: 32,
            height: 32,
            marginRight: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            backgroundColor: "primary.main",
            color: "common.white",
            fontSize: "1.2rem",
            fontWeight: 700,
          }}
        >
          P
        </Box>
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.5px",
            color: "primary.main",
            fontSize: "1.3rem",
          }}
        >
          Pasantías.com
        </Typography>
      </Logo>

      <List sx={{ px: 1, py: 1 }}>
        {menuItems.map((item) => (
          <StyledListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              mb: 0.5,
              "&:last-child": { mb: 0 },
            }}
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: location.pathname === item.path ? 600 : 500,
              }}
            />
          </StyledListItemButton>
        ))}
      </List>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: drawerWidth,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "grey.200",
          p: 2,
        }}
      >
        <ActionButton
          fullWidth
          startIcon={<SettingsOutlined />}
          sx={{
            mb: 1,
            color: "text.secondary",
          }}
          onClick={() => navigate(DASHBOARD_ROUTES.SETTINGS)}
        >
          Ajustes
        </ActionButton>
        <ActionButton
          fullWidth
          startIcon={<LogoutOutlined />}
          sx={{
            color: "error.main",
            "&:hover": {
              backgroundColor: alpha("#D32F2F", 0.04),
            },
          }}
          onClick={handleLogout}
        >
          Cierre de sesión
        </ActionButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
