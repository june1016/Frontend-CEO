import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Autocomplete,
    Chip,
    InputAdornment,
    CircularProgress,
    Fade,
} from "@mui/material";

import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Group as GroupIcon,
    Person as PersonIcon,
    Add as AddIcon,
    ExpandMore as ExpandMoreIcon,
    Search as SearchIcon,
} from "@mui/icons-material";

import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

import { useTheme } from "@mui/material/styles";
import axiosInstance from "../../services/api/axiosConfig";
import { showAlert, showConfirmation } from "../../utils/alerts/alertHelpers";
import { getFieldsGroups } from "../../data/fieldsForm";
import { groupSchema } from "../../utils/validators/groupsFormSchema";
import FormDialog from "../../components/admin/formDialog";
import ToastNotification, { showToast } from "../../components/common/ToastNotification";

export default function AdminGroupsPage() {
    const theme = useTheme();

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [form, setForm] = useState({ name: "", teacher: "", university: "", students: [] })
    const [open, setOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    const handleOpenModal = (description) => {
        setSelectedDescription(description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setSelectedDescription(''), 300);
    };

    const [openStudentsModal, setOpenStudentsModal] = useState(false);
    const [studentsToShow, setStudentsToShow] = useState([]);

    const [filter, setFilter] = useState("");

    const fetchPrincipalData = async () => {
        setLoading(true);
        try {
            const [studentsRes, teachersRes, universityRes, groupsRes] = await Promise.all([
                axiosInstance.get("/users/by-rol", { params: { rol: "Estudiante" } }),
                axiosInstance.get("/users/by-rol", { params: { rol: "Docente" } }),
                axiosInstance.get("/university/getAll"),
                axiosInstance.get("/groups/getGroupsWithStudents")
            ]);

            if (studentsRes.data.ok) setStudents(studentsRes.data.users);
            if (teachersRes.data.ok) setTeachers(teachersRes.data.users);
            if (universityRes.data.ok) setUniversities(universityRes.data.universities);
            if (groupsRes.data.ok) setGroups(groupsRes.data.groups);

        } catch (error) {
            console.error("Error al obtener datos:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrincipalData();
    }, []);

    const handleOpenDialog = (group = null) => {
        setEditingGroup(group);

        if (group) {
            setForm({
                name: group.name,
                teacher:
                    teachers.find(
                        (t) => `${t.name} ${t.lastName}` === group.teacher
                    )?.id ?? "",
                university:
                    universities.find((u) => u.name === group.university)?.id ?? "",
                students: group.students
            });
        } else {
            setForm({
                name: "",
                teacher: "",
                university: "",
                students: []
            });
        }

        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingGroup(null);
    };

    const handleSaveGroup = async ({
        name,
        description,
        teacher,
        university,
        students,
    }) => {
        const isEditing = Boolean(editingGroup);

        const payload = {
            name,
            description,
            teacher_id: teacher,
            university_id: university,
            student_ids: students.map((s) => s.id),
        };

        const url = isEditing
            ? `/groups/update/${editingGroup.id}`
            : "/groups/create";

        try {
            const response = await axiosInstance.post(url, payload);

            if (!response.data.ok) {
                throw new Error(response.data.message || "Error desconocido");
            }

            const updatedGroup = response.data.group;

            setGroups((prevGroups) =>
                isEditing
                    ? prevGroups.map((group) =>
                        group.id === editingGroup.id ? updatedGroup : group
                    )
                    : [...prevGroups, updatedGroup]
            );

            handleCloseDialog();

            const toastMessage = isEditing
                ? `Grupo "${name}" actualizado exitosamente`
                : `Grupo "${name}" creado exitosamente`;

            showToast(toastMessage, "success");
        } catch (error) {
            const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Ocurrió un error inesperado";

            showToast(backendMessage, "error");
            console.error("Error al guardar el grupo:", backendMessage);
        }
    };


    const handleDeleteGroup = (id, groupName) => {
        showConfirmation(
            `¿Eliminar el grupo "${groupName}"?`,
            "Esta acción no se puede deshacer.",
            async () => {
                try {
                    await axiosInstance.post(`/groups/delete/${id}`);
                    fetchPrincipalData();
                    showToast(`Grupo "${groupName}" eliminado exitosamente`, "success");
                } catch (error) {
                    showToast(`No se pudo eliminar el grupo "${groupName}"`, "error");
                    console.error(error);
                }
            }
        );
    };

    const handleOpenStudentsModal = (studentsList) => {
        setStudentsToShow(studentsList);
        setOpenStudentsModal(true);
    };

    const handleCloseStudentsModal = () => {
        setOpenStudentsModal(false);
        setStudentsToShow([]);
    };

    const filteredGroups = groups.filter((g) =>
        g.name.toLowerCase().includes(filter.toLowerCase()) ||
        g.teacher.toLowerCase().includes(filter.toLowerCase()) ||
        g.university.toLowerCase().includes(filter.toLowerCase())
    );

    const fieldsGroups = getFieldsGroups({ teachers, universities, students });

    const teacherField = fieldsGroups.find((f) => f.name === "teacher");
    const universityField = fieldsGroups.find((f) => f.name === "university");

    return (
        <Box sx={{ p: 4 }}>

            <ToastNotification />

            <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                Gestión de Grupos
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="body1" color="text.primary">
                        Aquí puedes <strong>crear</strong>, <strong>editar</strong> y <strong>eliminar</strong> grupos.
                        Asigna un docente, una universidad y los estudiantes que formarán parte de cada grupo.
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <TextField
                    placeholder="Buscar grupo, docente o universidad"
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
                    Nuevo Grupo
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                            <TableCell sx={{ color: "#fff" }}><GroupIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />Grupo</TableCell>
                            <TableCell sx={{ color: "#fff" }}><PersonIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />Descripcion</TableCell>
                            <TableCell sx={{ color: "#fff" }}><PersonIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />Docente</TableCell>
                            <TableCell sx={{ color: "#fff" }}><SchoolIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />Universidad</TableCell>
                            <TableCell sx={{ color: "#fff" }}><PermContactCalendarIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />Estudiantes</TableCell>
                            <TableCell align="right" sx={{ color: "#fff" }}><SettingsIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Box sx={{ py: 4 }}>
                                        <CircularProgress />
                                        <Typography variant="body2" mt={2}>Cargando grupos...</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredGroups.map((group) => (
                                <TableRow key={group.id}>
                                    <TableCell>{group.name}</TableCell>
                                    <TableCell>
                                        {group?.description?.length > 50 ? (
                                            <>
                                                {group.description.slice(0, 50)}...
                                                <Button
                                                    size="small"
                                                    onClick={() => handleOpenModal(group.description)}
                                                >
                                                    Ver más
                                                </Button>
                                            </>
                                        ) : (
                                            group.description
                                        )}
                                    </TableCell>
                                    <TableCell>{group.teacher}</TableCell>
                                    <TableCell>{group.university}</TableCell>
                                    <TableCell>
                                        {group.students.slice(0, 3).map((s, i) => (
                                            <Chip
                                                key={s.id || i}
                                                label={`${s.name} ${s.lastName}`}
                                                size="small"
                                                sx={{ mr: 0.5, mb: 0.5 }}
                                            />
                                        ))}
                                        {group.students.length > 3 && (
                                            <Button
                                                size="small"
                                                endIcon={<ExpandMoreIcon />}
                                                onClick={() => handleOpenStudentsModal(group.students)}
                                            >
                                                +{group.students.length - 3} más
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleOpenDialog(group)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteGroup(group.id, group.name)} color="error">
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
                title={editingGroup ? "Editar Grupo" : "Nuevo Grupo"}
                schema={groupSchema}
                fields={fieldsGroups}
                defaultValues={{
                    name: editingGroup?.name || "",
                    description: editingGroup?.description || "",
                    teacher:
                        teacherField?.options.find((opt) => opt.label === editingGroup?.teacher)?.value || "",
                    university:
                        universityField?.options.find((opt) => opt.label === editingGroup?.university)?.value || "",
                    students: editingGroup?.students || [],
                }}
                onSave={handleSaveGroup}
            />

            <Dialog open={openStudentsModal} onClose={handleCloseStudentsModal} fullWidth maxWidth="xs">
                <DialogTitle>Estudiantes del Grupo</DialogTitle>
                <DialogContent dividers>
                    {studentsToShow.length === 0 ? (
                        <Typography>No hay estudiantes</Typography>
                    ) : (
                        studentsToShow.map((s, i) => (
                            <Chip key={i} label={s} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStudentsModal}>Cerrar</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                transitionDuration={300}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Descripción completa</DialogTitle>
                <DialogContent dividers>
                    {selectedDescription}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
