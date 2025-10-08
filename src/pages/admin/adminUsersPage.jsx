import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  PeopleAlt,
  SupervisorAccount,
  School,
  VisibilityOff,
  Visibility,
  AlternateEmail,
} from "@mui/icons-material";

import SettingsIcon from "@mui/icons-material/Settings";
import DateRangeIcon from '@mui/icons-material/DateRange';
import BadgeIcon from '@mui/icons-material/Badge';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

import axiosInstance from "../../services/api/axiosConfig";
import { showAlert, showConfirmation } from "../../utils/alerts/alertHelpers";
import ToastNotification, { showToast } from "../../components/common/ToastNotification";
import FormDialog from "../../components/admin/formDialog";
import { userSchema } from "../../utils/validators/userSchema";
import { getFieldsUsers } from "../../data/fieldsForm";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [rols, setRols] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    rol: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", lastName: "", email: "", password: "", rol: rols[0] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userResponse, rolResponse] = await Promise.all([
          axiosInstance.get("/users/"),
          axiosInstance.get("/rol/"),
        ]);

        const usersData = userResponse.data.data.users;
        const rolsData = rolResponse.data.data;

        setUsers(usersData);
        setRols(rolsData);
      } catch (error) {
        console.error("Error al cargar usuarios o rols:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    setForm(user ? { name: user.name, lastName: user.lastName, email: user.email, rol: user.name_rol } : { name: "", rol: rols[0] });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleSaveUser = async ({
    name,
    lastName,
    email,
    password,
    rol,
  }) => {
    const isEditing = Boolean(editingUser);

    const payload = {
      name: name.trim(),
      lastName,
      email,
      password,
      rol: rol?.id || rol,
    };

    try {
      const response = isEditing
        ? await axiosInstance.post(`/users/${editingUser.id}`, payload)
        : await axiosInstance.post(`/users/create`, payload);

      const savedUser = response.data.user;

      setUsers((prev) =>
        isEditing
          ? prev.map((u) => (u.id === savedUser.id ? savedUser : u))
          : [
            ...prev,
            {
              ...savedUser,
              createdAt: new Date().toISOString().split("T")[0],
            },
          ]
      );

      showToast(
        `"${savedUser.name}" ha sido ${isEditing ? "actualizado" : "creado"} exitosamente.`,
        "success"
      );

      handleCloseDialog();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Ocurrió un error al guardar el usuario.";

      console.error("Error al guardar el usuario:", error);
      showToast(errorMessage, "error");
      handleCloseDialog();
    }
  };


  const handleDeleteUser = async (id) => {
    const userToDelete = users.find((u) => u.id === id);

    showConfirmation(
      `¿Eliminar a "${userToDelete.name}"?`,
      "Esta acción no se puede deshacer.",
      async () => {
        try {
          await axiosInstance.post("/users/delete-user", { id });

          setUsers((prev) => prev.filter((u) => u.id !== id));

          showToast(
            `"${userToDelete.name}" ha sido eliminado exitosamente.`,
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar usuario:", error.message);

          showToast(
            `No se pudo eliminar a "${userToDelete.name}".`,
            "error"
          );
        }
      }
    );
  };


  const filteredUsers = users.filter((user) => {
    const term = filters.search?.toLowerCase() || "";

    const matchesSearch =
      user.name.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term);

    const matchesRol = filters.rol === "" || user.rol === filters.rol;

    return matchesSearch && matchesRol;
  });

  const countByrol = (rol) => users?.filter((u) => u.rol === rol).length;

  // Contadores
  const totalUsers = users?.length;
  const totalDocentes = countByrol("Docente");
  const totalAdmins = countByrol("Administrador");
  const totalEstudiantes = countByrol("Estudiante");

  const isEditing = !!editingUser;


  return (
    <Box sx={{ p: 4 }}>

      <ToastNotification />

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
          placeholder="Buscar por nombre, apellido o email"
          variant="outlined"
          size="small"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
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
            value={filters.rol}
            onChange={(e) => setFilters({ ...filters, rol: e.target.value })}
          >
            <MenuItem value="">Todos</MenuItem>
            {rols.map((r) => (
              <MenuItem key={r.id} value={r.name_rol}>
                {r.name_rol}
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
                <PermContactCalendarIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Apellido
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                <AlternateEmail fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                <BadgeIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Rol
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                <DateRangeIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Creado
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                <DateRangeIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Actualizado
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align="right">
                <SettingsIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box sx={{ py: 4 }}>
                    <CircularProgress />
                    <Typography variant="body2" mt={2}>Cargando usuarios...</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) :
              filteredUsers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.rol}
                        color={
                          user.rol === "Administrador"
                            ? "secondary"
                            : user.rol === "Docente"
                              ? "primary"
                              : "success"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.updatedAt}</TableCell>
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

      <FormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={editingUser ? "Editar Usuario" : "Nuevo Usuario"}
        schema={userSchema}
        fields={getFieldsUsers({ rols, showPassword, setShowPassword, isEditing })}
        defaultValues={{
          name: editingUser?.name || "",
          lastName: editingUser?.lastName || "",
          email: editingUser?.email || "",
          password: "",
          rol: editingUser?.rol || "",
          isEditing,
        }}
        onSave={handleSaveUser}
      />
    </Box>
  );
}
