import React, { useEffect, useState } from "react";
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
import { formatCurrency } from "../../utils/formatters/currencyFormatters";
import { getUserId } from "../../utils/timeManagement/operationTime";
import axiosInstance from "../../services/api/axiosConfig";
import ToastNotification, { showToast } from "../../components/alerts/ToastNotification";
import FormDialog from "../../components/admin/formDialog";
import { productInventorySchema, rawMaterialSchema } from "../../utils/validations/amountSchema";
import { fieldsProductInventoryEdit, fieldsRawMaterialEdit } from "../../data/fieldsForm";

export default function InitialInventoryView() {
    const theme = useTheme();

    const [rawMaterials, setRawMaterials] = useState([]);
    const [productInventory, setProductInventory] = useState([]);
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        const loadInventoryData = async () => {
            const userId = getUserId();

            try {
                const [
                    userRawMaterialsRes,
                    userProductInventoryRes,
                    userProductsRes
                ] = await Promise.all([
                    axiosInstance.get("/rawmaterialsinventory/getRawMaterialsInventoryByCreatedBy", {
                        params: { created_by: userId }
                    }),
                    axiosInstance.get("/productsInventory/getProductInventoryByCreatedBy", {
                        params: { created_by: userId }
                    }),
                    axiosInstance.get("/products/getProductsByCreatedBy", {
                        params: { created_by: userId }
                    })
                ]);

                const hasRawMaterials = userRawMaterialsRes.data.rawMaterialsInventory.length > 0;
                const hasProductInventory = userProductInventoryRes.data.inventories.length > 0;
                const hasProducts = userProductsRes.data.products.length > 0;

                const [
                    defaultRawMaterialsRes,
                    defaultProductInventoryRes,
                    defaultProductsRes
                ] = await Promise.all([
                    hasRawMaterials ? null : axiosInstance.get("/rawmaterialsinventory/getRawMaterialsInventoryByCreatedBy", {
                        params: { created_by: 1 }
                    }),
                    hasProductInventory ? null : axiosInstance.get("/productsInventory/getProductInventoryByCreatedBy", {
                        params: { created_by: 1 }
                    }),
                    hasProducts ? null : axiosInstance.get("/products/getProductsByCreatedBy",
                        { params: { created_by: 1 } })
                ]);

                setRawMaterials(
                    hasRawMaterials
                        ? userRawMaterialsRes.data.rawMaterialsInventory
                        : defaultRawMaterialsRes?.data.rawMaterialsInventory || []
                );

                setProductInventory(
                    hasProductInventory
                        ? userProductInventoryRes.data.inventories
                        : defaultProductInventoryRes?.data.inventories || []
                );

                setProducts(
                    hasProducts
                        ? userProductsRes.data.products
                        : defaultProductsRes?.data.products || []
                );
            } catch (error) {
                console.error("Error al cargar datos de inventario:", error);
            }
        };

        loadInventoryData();
    }, []);

    const getProductName = (id) => {
        const product = products.find((p) => p.id === id);
        return product ? product.name : "Desconocido";
    };


    const handleOpenEdit = (item, type, index) => {
        setEditingItem({ ...item, editType: type, index });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingItem(null);
    };

    const handleSave = (data) => {
        const updateList = (list, setList) => {
            const updated = [...list];
            updated[editingItem.index] = { ...updated[editingItem.index], ...data };
            setList(updated);
        };

        if (editingItem?.editType === "raw") {
            updateList(rawMaterials, setRawMaterials);
        } else {
            updateList(productInventory, setProductInventory);
        }

        handleCloseDialog();
    };

    const handleSaveChanges = async () => {
        try {
            const userId = getUserId();

            console.log(rawMaterials);

            const rawMaterialsWithUser = rawMaterials.map(item => ({
                ...item,
                created_by: userId
            }));

            const productInventoryWithUser = productInventory.map(item => ({
                product_id: item.product_id ?? item.Product?.id,
                unit_cost: item.unit_cost,
                quantity: item.quantity,
                created_by: userId
            }));

            await Promise.all([
                axiosInstance.post("/productsInventory/createProductInventory", {
                    inventories: productInventoryWithUser
                }),
                axiosInstance.post("/rawmaterialsinventory/createRawMaterialsInventory", {
                    rawMaterialsInventory: rawMaterialsWithUser
                })
            ]);

            showToast("Cambios guardados correctamente", "success");
        } catch (error) {
            console.error("Error al guardar inventario:", error);
            showToast("Error al guardar los cambios", "error");
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={4}>

            <ToastNotification />

            <CardContent>
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
                                    <TableCell align="right">{formatCurrency(item.unit_cost)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenEdit(item, "raw", index)} color="primary" size="small">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

            <CardContent>
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
                                <TableRow key={product.id}>
                                    <TableCell>{getProductName(product.product_id)}</TableCell>
                                    <TableCell align="center">{product.quantity}</TableCell>
                                    <TableCell align="right">{formatCurrency(product.unit_cost)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenEdit(product, "product", index)} color="primary" size="small">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

            <FormDialog
                open={openDialog}
                onClose={handleCloseDialog}
                title={`Editar ${editingItem?.editType === "raw" ? "Materia Prima" : "Producto Terminado"}`}
                schema={editingItem?.editType === "raw" ? rawMaterialSchema : productInventorySchema}
                fields={editingItem?.editType === "raw" ? fieldsRawMaterialEdit : fieldsProductInventoryEdit}
                defaultValues={{
                    quantity: editingItem?.quantity || 0,
                    unit_cost: editingItem?.unit_cost || 0,
                }}
                onSave={handleSave}
            />

            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveChanges}>
                    Guardar cambios
                </Button>
            </Box>
        </Box>
    );
}
