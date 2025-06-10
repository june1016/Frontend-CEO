import React, { useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    CardContent,
    Card
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';

// Nuevos datos iniciales
const initialOperatingExpenses = [
    { id: 1, type: "Gastos de Administración", value_cop: 198000000 },
    { id: 2, type: "Gastos de Ventas", value_cop: 162000000 },
    { id: 3, type: "Otros Gastos Operativos", value_cop: 90000000 }
];

const initialOtherExpenses = [
    { id: 1, concept: "Gastos Financieros", value_cop: 72000000  },
    { id: 2, concept: "Depreciación y Amortización", value_cop: 48000000 },
    { id: 3, concept: "Impuestos", value_cop: 30000000 }
];


const initialProducts = [
    { id: 1, name: "Alfaros" },
    { id: 2, name: "Betacos" },
    { id: 3, name: "Gamaroles" }
];

const initialSales = [
    { id: 1, product_id: 1, value_cop: 792000000 },
    { id: 2, product_id: 2, value_cop: 648000000 },
    { id: 3, product_id: 3, value_cop: 360000000 }
];

const initialSalesCosts = [
    { id: 1, product_id: 1, value_cop: 467280000 },
    { id: 2, product_id: 2, value_cop: 382320000 },
    { id: 3, product_id: 3, value_cop: 212400000 }
];

export default function FinancialStatements() {
    const theme = useTheme();
    const [sales, setSales] = useState(initialSales);
    const [salesCosts, setSalesCosts] = useState(initialSalesCosts);

    const [editItem, setEditItem] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editType, setEditType] = useState("");

    const [operatingExpenses, setOperatingExpenses] = useState(initialOperatingExpenses);
    const [otherExpenses, setOtherExpenses] = useState(initialOtherExpenses);

    const handleEdit = (item, type) => {
        setEditItem(item);
        setEditValue(item.value_cop);
        setEditType(type);
    };

    const handleClose = () => {
        setEditItem(null);
        setEditValue("");
        setEditType("");
    };

    const handleSave = () => {
        if (editType === "sale") {
            setSales((prev) =>
                prev.map((s) =>
                    s.id === editItem.id ? { ...s, value_cop: Number(editValue) } : s
                )
            );
        } else if (editType === "cost") {
            setSalesCosts((prev) =>
                prev.map((c) =>
                    c.id === editItem.id ? { ...c, value_cop: Number(editValue) } : c
                )
            );
        } else if (editType === "operating") {
            setOperatingExpenses((prev) =>
                prev.map((item) =>
                    item.id === editItem.id ? { ...item, value_cop: Number(editValue) } : item
                )
            );
        } else if (editType === "other") {
            setOtherExpenses((prev) =>
                prev.map((item) =>
                    item.id === editItem.id ? { ...item, value_cop: Number(editValue) } : item
                )
            );
        }
        handleClose();
    };

    const getProductName = (id) => {
        const product = initialProducts.find((p) => p.id === id);
        return product ? product.name : "Desconocido";
    };

    const handleSaveChanges = async () => {
        Swal.fire({
            icon: "success",
            title: "Cambios guardados",
            text: "Los datos fueron enviados correctamente.",
            timer: 2000,
            showConfirmButton: false,
        });
    };

    return (
        <Box display="flex" flexDirection="column" gap={4}>

            <Card>
                <CardContent>
                    {/* Ventas */}
                    <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                        Ventas
                    </Typography>

                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Producto</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Valor Venta</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sales.map((sale) => (
                                    <TableRow key={`sale-${sale.id}`}>
                                        <TableCell>{getProductName(sale.product_id)}</TableCell>
                                        <TableCell>${sale.value_cop.toLocaleString("es-CO")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleEdit(sale, "sale")} color="primary" size="small">
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

            <Card>
                <CardContent>

                    {/* Costos de Venta */}
                    <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                        Costos de Venta
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Producto</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Costo</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {salesCosts.map((cost) => (
                                    <TableRow key={`cost-${cost.id}`}>
                                        <TableCell>{getProductName(cost.product_id)}</TableCell>
                                        <TableCell>${cost.value_cop.toLocaleString("es-CO")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleEdit(cost, "cost")} color="primary" size="small">
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

            <Card>
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center" >
                        Gastos Operativos
                    </Typography>

                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Valor</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {operatingExpenses.map((item) => (
                                    <TableRow key={`op-${item.id}`}>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>${item.value_cop.toLocaleString("es-CO")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleEdit(item, "operating")} color="primary" size="small">
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

            <Card>
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                        Otros Gastos
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Concepto</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Valor</TableCell>
                                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {otherExpenses.map((item) => (
                                    <TableRow key={`other-${item.id}`}>
                                        <TableCell>{item.concept}</TableCell>
                                        <TableCell>${item.value_cop.toLocaleString("es-CO")}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleEdit(item, "other")} color="primary" size="small">
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

            <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveChanges}
                >
                    Guardar cambios
                </Button>
            </Box>

            {/* Modal de Edición */}
            <Dialog open={!!editItem} onClose={handleClose}>
                <DialogTitle>Editar valor</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nuevo valor"
                        type="number"
                        fullWidth
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">Guardar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
