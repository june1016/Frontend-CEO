import React, { useState, useEffect } from "react";
import axiosInstance from '../../services/api/axiosConfig.js';
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
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Search as SearchIcon,
} from "@mui/icons-material";

import SettingsIcon from "@mui/icons-material/Settings";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import showAlert, { showConfirmation } from "../../utils/alerts/alertHelpers.js";
import FormDialog from "../../components/admin/formDialog.jsx";
import { universitySchema } from "../../utils/validations/universitySchema.js";
import { fieldsUniversity } from "../../data/fieldsForm.js";


// Función para formatear la fecha
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}


export default function AdminUniversityPage() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUniversity, setEditingUniversity] = useState(null);
    const [form, setForm] = useState({ name: "", city: "", country: "" });
    const [errors, setErrors] = useState({ name: false, city: false, country: false });


    useEffect(() => {
        setLoading(true);
        const fetchUniversities = async () => {
            try {
                const response = await axiosInstance.get("/university/getAll");
                const data = response.data.universities;

                setUniversities(data);
            } catch (error) {
                console.error("Error al obtener universidades:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    const filteredUniversities = universities.filter(
        (u) =>
            u.name.toLowerCase().includes(filter.toLowerCase()) ||
            u.city.toLowerCase().includes(filter.toLowerCase()) ||
            u.country.toLowerCase().includes(filter.toLowerCase())
    );

    const handleOpenDialog = (university = null) => {
        setEditingUniversity(university);
        setForm(
            university
                ? { name: university.name, city: university.city, country: university.country }
                : { name: "", city: "", country: "" }
        );
        setErrors({ name: false, city: false, country: false });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingUniversity(null);
    };

    const handleUpdateUniversity = async () => {

        try {
            const response = await axiosInstance.post(`/university/update/${editingUniversity.id}`, {
                name: form.name.trim(),
                city: form.city.trim(),
                country: form.country.trim(),
            });

            if (response.data.ok) {
                setUniversities((prev) =>
                    prev.map((u) =>
                        u.id === editingUniversity.id ? response.data.university : u
                    )
                );
                handleCloseDialog();
            }
        } catch (error) {
            console.error("Error al actualizar universidad:", error.message);
        }
    };

    const handleSaveUniversity = async ({ name, city, country }) => {

        const payload = {
            name: name.trim(),
            city: city.trim(),
            country: country.trim(),
        };

        const isEditing = !!editingUniversity;
        const url = isEditing
            ? `/university/update/${editingUniversity.id}`
            : "/university/create";

        try {
            const response = await axiosInstance.post(url, payload);

            if (response.data.ok) {
                const updatedUniversity = response.data.university;

                setUniversities((prev) =>
                    isEditing
                        ? prev.map((u) => (u.id === editingUniversity.id ? updatedUniversity : u))
                        : [...prev, updatedUniversity]
                );

                handleCloseDialog();
            }
        } catch (error) {
            console.error(
                `Error al ${isEditing ? "actualizar" : "crear"} universidad:`,
                error.message
            );
        }
    };


    const handleDeleteUniversity = async (id) => {
        const university = universities.find((u) => u.id === id);

        showConfirmation(
            `¿Eliminar "${university.name}"?`,
            "Esta acción no se puede deshacer.",
            async () => {
                try {
                    const response = await axiosInstance.post(`/university/delete/${id}`);
                    if (response.data.ok) {
                        setUniversities((prev) => prev.filter((u) => u.id !== id));
                        showAlert("Eliminado", `"${university.name}" ha sido eliminada.`, "success");
                    }
                } catch (error) {
                    console.error("Error al eliminar universidad:", error.message);
                    showAlert("Error", "No se pudo eliminar la universidad.", "error");
                }
            }
        );
    };


    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 2 }}>
                Gestión de Universidades
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="body1" color="text.primary">
                        Aquí puedes <strong>crear</strong>, <strong>editar</strong> y <strong>eliminar</strong> universidades.
                        Gestiona su nombre, ciudad, país y otros detalles relevantes.
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <TextField
                    placeholder="Buscar por nombre, ciudad o país"
                    variant="outlined"
                    size="small"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: 200, flex: 1 }}
                />

                <Box sx={{ flexGrow: 1 }} />

                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
                    Nueva Universidad
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell sx={{ color: "#fff" }}>
                                <PermContactCalendarIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                Nombre
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                                <LocationCityIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                Ciudad
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                                <PublicIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                País
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
                                        <Typography variant="body2" mt={2}>Cargando universidades...</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : filteredUniversities.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No se encontraron universidades
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUniversities.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.city}</TableCell>
                                    <TableCell>{u.country}</TableCell>
                                    <TableCell>{formatDate(u.created_at)}</TableCell>
                                    <TableCell>{formatDate(u.updated_at)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleOpenDialog(u)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteUniversity(u.id)}>
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
                title={editingUniversity ? "Editar Universidad" : "Nueva Universidad"}
                schema={universitySchema}
                fields={fieldsUniversity}
                defaultValues={{
                    name: editingUniversity?.name || "",
                    city: editingUniversity?.city || "",
                    country: editingUniversity?.country || ""
                }}
                onSave={(data) => {
                    handleSaveUniversity(data);
                }}
            />
        </Box>
    );
}
