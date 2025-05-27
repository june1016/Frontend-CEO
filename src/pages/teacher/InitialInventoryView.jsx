import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Modal,
    TextField,
    IconButton,
    Paper,
    TableContainer,
    useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const initialRawMaterials = [
    { code: "A1", description: "Material base estructural", quantity: 950, unit: "Kilogramo", unit_cost: 4050 },
    { code: "A2", description: "Material de revestimiento", quantity: 570, unit: "Litro", unit_cost: 5950 },
    { code: "A3", description: "Material de refuerzo", quantity: 425, unit: "Kilogramo", unit_cost: 5100 },
    { code: "A4", description: "Componente principal Alfaros", quantity: 1980, unit: "Unidad", unit_cost: 3900 },
    { code: "A5", description: "Componente secundario Alfaros", quantity: 1330, unit: "Unidad", unit_cost: 4950 },
    { code: "A6", description: "Componente principal Betacos", quantity: 625, unit: "Metro", unit_cost: 5800 },
    { code: "A7", description: "Componente secundario Betacos", quantity: 960, unit: "Unidad", unit_cost: 4150 },
    { code: "A8", description: "Componente principal Gamaroles", quantity: 335, unit: "Kilogramo", unit_cost: 9600 },
    { code: "A9", description: "Componente secundario Gamaroles", quantity: 640, unit: "Unidad", unit_cost: 6900 },
    { code: "A10", description: "Material de acabado", quantity: 575, unit: "Litro", unit_cost: 8100 },
];

const initialProductInventory = [
    { name: "Alfaros", quantity: 80, unit_cost: 300000 },
    { name: "Betacos", quantity: 60, unit_cost: 270000 },
    { name: "Gamaroles", quantity: 30, unit_cost: 250000 },
];

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
};

export default function InitialInventoryView() {
    const theme = useTheme();

    const [rawMaterials, setRawMaterials] = useState(initialRawMaterials);
    const [productInventory, setProductInventory] = useState(initialProductInventory);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formValues, setFormValues] = useState({ quantity: "", unit_cost: "" });

    const handleOpenModal = (type, index) => {
        let item = type === "raw" ? rawMaterials[index] : productInventory[index];
        setEditingItem({ type, index });
        setFormValues({
            quantity: item.quantity,
            unit_cost: item.unit_cost,
        });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingItem(null);
        setFormValues({ quantity: "", unit_cost: "" });
    };

    const handleChange = (field, value) => {
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setFormValues((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleSave = () => {
        const quantityNum = parseInt(formValues.quantity, 10);
        const costNum = parseFloat(formValues.unit_cost);

        if (isNaN(quantityNum) || isNaN(costNum)) {
            Swal.fire("Error", "Cantidad y costo deben ser números válidos", "error");
            return;
        }

        if (editingItem.type === "raw") {
            const updated = [...rawMaterials];
            updated[editingItem.index] = {
                ...updated[editingItem.index],
                quantity: quantityNum,
                unit_cost: costNum,
            };
            setRawMaterials(updated);
        } else {
            const updated = [...productInventory];
            updated[editingItem.index] = {
                ...updated[editingItem.index],
                quantity: quantityNum,
                unit_cost: costNum,
            };
            setProductInventory(updated);
        }

        setModalOpen(false);
        setEditingItem(null);
        setFormValues({ quantity: "", unit_cost: "" });
        Swal.fire("Guardado", "Datos actualizados correctamente", "success");
    };

    const saveInitialInventory = () => {
        Swal.fire({
            icon: "success",
            title: "Inventario guardado",
            text: "Los datos del inventario inicial se han guardado correctamente.",
        });
    };

    return (
        <Box display="flex" flexDirection="column" gap={4}>
            {/* Materias Primas */}
            <Card>
                <CardContent>
                    {/* Título fuera de la tabla */}
                    <Typography variant="h6" mb={2}>
                        Inventario Inicial - Materias Primas
                    </Typography>
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Código</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Descripción</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                                        Cantidad
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                                        Unidad
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                                        Costo Unitario
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                                        Acciones
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rawMaterials.map((item, index) => (
                                    <TableRow key={item.code}>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell align="center">{item.quantity}</TableCell>
                                        <TableCell align="center">{item.unit}</TableCell>
                                        <TableCell align="right">{`$${item.unit_cost.toLocaleString()}`}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleOpenModal("raw", index)} color="primary" size="small">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Productos */}
            <Card>
                <CardContent>
                    {/* Título fuera de la tabla */}
                    <Typography variant="h6" mb={2}>
                        Inventario Inicial - Productos Terminados
                    </Typography>
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Producto</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                                        Cantidad
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                                        Costo Unitario
                                    </TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                                        Acciones
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productInventory.map((product, index) => (
                                    <TableRow key={product.name}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell align="center">{product.quantity}</TableCell>
                                        <TableCell align="right">{`$${product.unit_cost.toLocaleString()}`}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleOpenModal("product", index)} color="primary" size="small">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={saveInitialInventory}>
                    Guardar cambios
                </Button>
            </Box>

            {/* Modal para editar */}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>
                        Editar {editingItem?.type === "raw" ? "Materia Prima" : "Producto"}
                    </Typography>
                    <TextField
                        label="Cantidad"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formValues.quantity}
                        onChange={(e) => handleChange("quantity", e.target.value)}
                    />
                    <TextField
                        label="Costo Unitario"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={formValues.unit_cost}
                        onChange={(e) => handleChange("unit_cost", e.target.value)}
                    />
                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button variant="outlined" color="error" startIcon={<CloseIcon />} onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
