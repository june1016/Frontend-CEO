import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Grid,
  Chip,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  PeopleAlt,
  SupervisorAccount,
  School,
} from "@mui/icons-material";

import SettingsIcon from "@mui/icons-material/Settings";
import DateRangeIcon from '@mui/icons-material/DateRange';
import BadgeIcon from '@mui/icons-material/Badge';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

import { } from "@mui/icons-material";

const roles = ["Docente", "Administrador", "Estudiante"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "María López",
      role: "Docente",
      createdAt: "2024-05-01",
    },
    {
      id: 2,
      name: "Carlos Pérez",
      role: "Administrador",
      createdAt: "2024-04-20",
    },
    {
      id: 3,
      name: "Carlos Pérez",
      role: "Estudiante",
      createdAt: "2024-04-20",
    },
  ]);

  const [filters, setFilters] = useState({
    name: "",
    role: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", role: roles[0] });

  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    setForm(user ? { name: user.name, role: user.role } : { name: "", role: roles[0] });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleSaveUser = () => {
    if (!form.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, name: form.name.trim(), role: form.role } : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name.trim(),
          role: form.role,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    handleCloseDialog();
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (!filters.role || u.role === filters.role)
  );

  // Contadores
  const totalUsers = users.length;
  const totalDocentes = users.filter((u) => u.role === "Docente").length;
  const totalAdmins = users.filter((u) => u.role === "Administrador").length;
  const totalEstudiantes = users.filter((u) => u.role === "Estudiante").length;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
        Gestión de Usuarios
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="body1" color="text.primary">
            Aquí puedes <strong>crear</strong>, <strong>editar</strong> y <strong>eliminar</strong> usuarios.
            Asigna un nombre, un rol y gestiona la información básica de cada usuario de manera sencilla.
          </Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Total Usuarios
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {totalUsers}
              </Typography>
              <PeopleAlt color="primary" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Docentes
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {totalDocentes}
              </Typography>
              <School color="primary" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Administradores
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {totalAdmins}
              </Typography>
              <SupervisorAccount color="primary" />
            </CardContent>
          </Card>
        </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Estudiantes
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {totalEstudiantes}
              </Typography>
              <SupervisorAccount color="primary" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2 }}>
        <TextField
          placeholder="Buscar por nombre"
          variant="outlined"
          size="small"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200, flex: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Rol</InputLabel>
          <Select
            label="Rol"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <MenuItem value="">Todos</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Nuevo Usuario
        </Button>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "#fff" }}>
                <PermContactCalendarIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Nombre
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                <BadgeIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Rol
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                <DateRangeIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Creado
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                <SettingsIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No se encontraron usuarios
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Chip label={user.role} color="primary" size="small" />
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            margin="normal"
            autoFocus
          />
          <TextField
            fullWidth
            select
            label="Rol"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            margin="normal"
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveUser}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
