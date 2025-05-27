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
import DateRangeIcon from '@mui/icons-material/DateRange';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

import { useTheme } from "@mui/material/styles";

const fakeTeachers = ["María López", "Carlos Pérez", "Ana Torres"];
const fakeUniversities = ["Universidad Nacional", "Universidad Autónoma", "Instituto Superior"];

const mockStudentsFromDB = [
    "Estudiante A",
    "Estudiante B",
    "Estudiante C",
    "Estudiante D",
    "Estudiante E",
    "Estudiante A1",
    "Estudiante B1",
    "Estudiante C1",
    "Estudiante D1",
    "Estudiante E1",
];

export default function AdminGroupsPage() {
    const theme = useTheme();

    const [groups, setGroups] = useState([
        {
            id: 1,
            name: "Grupo A",
            teacher: "María López",
            university: "Universidad Nacional",
            students: ["Estudiante A", "Estudiante B", "Estudiante C", "Estudiante D", "Estudiante E"],
        },
        {
            id: 2,
            name: "Grupo B",
            teacher: "Carlos Pérez",
            university: "Universidad Autónoma",
            students: ["Estudiante C", "Estudiante D", "Estudiante E"],
        },
    ]);

    const [students, setStudents] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [form, setForm] = useState({ name: "", teacher: "", university: "", students: [] });

    const [openStudentsModal, setOpenStudentsModal] = useState(false);
    const [studentsToShow, setStudentsToShow] = useState([]);

    const [filter, setFilter] = useState("");

    useEffect(() => {
        setStudents(mockStudentsFromDB);
    }, []);

    const handleOpenDialog = (group = null) => {
        setEditingGroup(group);
        setForm(
            group
                ? { ...group }
                : { name: "", teacher: "", university: "", students: [] }
        );
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingGroup(null);
    };

    const handleSaveGroup = () => {
        if (editingGroup) {
            setGroups((prev) =>
                prev.map((g) => (g.id === editingGroup.id ? { ...form, id: g.id } : g))
            );
        } else {
            setGroups((prev) => [...prev, { ...form, id: Date.now() }]);
        }
        handleCloseDialog();
    };

    const handleDeleteGroup = (id) => {
        setGroups((prev) => prev.filter((g) => g.id !== id));
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

    return (
        <Box sx={{ p: 4 }}>
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
                            <TableCell sx={{ color: "#fff" }}>
                                <GroupIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                Grupo
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                                <PersonIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                Docente
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                                <SchoolIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                Universidad
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                                <PermContactCalendarIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                Estudiantes
                            </TableCell>
                            <TableCell align="right" sx={{ color: "#fff" }}>
                                <SettingsIcon fontSize="small" sx={{ color: "#fff", mr: 1 }} />
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredGroups.map((group) => (
                            <TableRow key={group.id}>
                                <TableCell>{group.name}</TableCell>
                                <TableCell>{group.teacher}</TableCell>
                                <TableCell>{group.university}</TableCell>
                                <TableCell>
                                    {group.students.slice(0, 3).map((s, i) => (
                                        <Chip
                                            key={i}
                                            label={s}
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
                                    <IconButton
                                        onClick={() => handleDeleteGroup(group.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>{editingGroup ? "Editar Grupo" : "Nuevo Grupo"}</DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        label="Nombre del Grupo"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        select
                        label="Docente Asignado"
                        value={form.teacher}
                        onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                        margin="normal"
                    >
                        {fakeTeachers.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        select
                        label="Universidad"
                        value={form.university}
                        onChange={(e) => setForm({ ...form, university: e.target.value })}
                        margin="normal"
                    >
                        {fakeUniversities.map((u) => (
                            <MenuItem key={u} value={u}>
                                {u}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Autocomplete
                        multiple
                        options={students}
                        filterSelectedOptions
                        getOptionLabel={(option) => option}
                        value={form.students}
                        onChange={(e, newValue) => setForm({ ...form, students: newValue })}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip key={index} label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Estudiantes"
                                margin="normal"
                                placeholder="Buscar o seleccionar"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSaveGroup} variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openStudentsModal} onClose={handleCloseStudentsModal} fullWidth maxWidth="xs">
                <DialogTitle>Estudiantes del Grupo</DialogTitle>
                <DialogContent dividers>
                    {studentsToShow.length === 0 ? (
                        <Typography>No hay estudiantes</Typography>
                    ) : (
                        studentsToShow.map((s, i) => (
                            <Chip key={i} label={s} size="medium" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStudentsModal} autoFocus>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
