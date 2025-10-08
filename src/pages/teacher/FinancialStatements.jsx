import React, { useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import axiosInstance from "../../services/api/axiosConfig";
import { getUserId } from "../../utils/shared/operationTime";
import { formatCurrency } from "../../utils/formatters/currencyFormatters";
import ToastNotification, { showToast } from "../../components/common/ToastNotification";
import FormDialog from "../../components/admin/formDialog";
import { amountSchema } from "../../utils/validators/amountSchema";
import { fieldsAmountEdit } from "../../data/fieldsForm";


export default function FinancialStatements() {
    const theme = useTheme();
    const [operatingExpenses, setOperatingExpenses] = useState([]);
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [salesCosts, setSalesCosts] = useState([]);
    const [otherExpenses, setOtherExpenses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

// En FinancialStatements.jsx - reemplaza el useEffect con esta versión mejorada:

useEffect(() => {
    const loadFinancialData = async () => {
        const userId = getUserId();

        try {
            // Función helper para manejar requests que pueden fallar
            const safeRequest = async (url, params) => {
                try {
                    const response = await axiosInstance.get(url, { params });
                    return { success: true, data: response.data };
                } catch (error) {
                    console.warn(`Error en ${url}:`, error.message);
                    return { success: false, data: null };
                }
            };

            // Intentar obtener datos del usuario actual
            const [
                userSalesRes,
                userSalesCostsRes,
                userOperatingExpensesRes,
                userOtherExpensesRes,
                userProductsRes
            ] = await Promise.all([
                safeRequest("/sales/getSalesByCreatedBy", { created_by: userId }),
                safeRequest("/salescosts/getSalesCostsByCreatedBy", { created_by: userId }),
                safeRequest("/operatingexpenses/getOperatingExpensesByCreatedBy", { created_by: userId }),
                safeRequest("/otherexpenses/getOtherExpensesByCreatedBy", { created_by: userId }),
                safeRequest("/products/getProductsByCreatedBy", { created_by: userId })
            ]);

            // Verificar si hay datos del usuario actual
            const hasSales = userSalesRes.success && userSalesRes.data?.sales?.length > 0;
            const hasCosts = userSalesCostsRes.success && userSalesCostsRes.data?.salesCost?.length > 0;
            const hasOperating = userOperatingExpensesRes.success && userOperatingExpensesRes.data?.operatingExpenses?.length > 0;
            const hasOthers = userOtherExpensesRes.success && userOtherExpensesRes.data?.otherExpenses?.length > 0;
            const hasProducts = userProductsRes.success && userProductsRes.data?.products?.length > 0;

            // Si no hay datos del usuario, obtener datos por defecto (administrador)
            const [
                defaultSalesRes,
                defaultSalesCostsRes,
                defaultOperatingExpensesRes,
                defaultOtherExpensesRes,
                defaultProductsRes
            ] = await Promise.all([
                hasSales ? { success: true, data: null } : safeRequest("/sales/getSalesByCreatedBy", { created_by: 1 }),
                hasCosts ? { success: true, data: null } : safeRequest("/salescosts/getSalesCostsByCreatedBy", { created_by: 1 }),
                hasOperating ? { success: true, data: null } : safeRequest("/operatingexpenses/getOperatingExpensesByCreatedBy", { created_by: 1 }),
                hasOthers ? { success: true, data: null } : safeRequest("/otherexpenses/getOtherExpensesByCreatedBy", { created_by: 1 }),
                hasProducts ? { success: true, data: null } : safeRequest("/products/getProductsByCreatedBy", { created_by: 1 })
            ]);

            // Establecer los datos con fallbacks seguros
            setSales(hasSales ? userSalesRes.data.sales : (defaultSalesRes?.data?.sales || []));
            setSalesCosts(hasCosts ? userSalesCostsRes.data.salesCost : (defaultSalesCostsRes?.data?.salesCost || []));
            setOperatingExpenses(hasOperating ? userOperatingExpensesRes.data.operatingExpenses : (defaultOperatingExpensesRes?.data?.operatingExpenses || []));
            setOtherExpenses(hasOthers ? userOtherExpensesRes.data.otherExpenses : (defaultOtherExpensesRes?.data?.otherExpenses || []));
            setProducts(hasProducts ? userProductsRes.data.products : (defaultProductsRes?.data?.products || []));

        } catch (error) {
            console.error("Error al cargar los datos financieros:", error);
            showToast("Error al cargar algunos datos financieros. Se cargarán datos por defecto.", "warning");
            
            // Cargar solo datos por defecto si todo falla
            try {
                const defaultProductsRes = await axiosInstance.get("/products/getProductsByCreatedBy", { params: { created_by: 1 } });
                setProducts(defaultProductsRes.data?.products || []);
            } catch (fallbackError) {
                console.error("Error al cargar datos por defecto:", fallbackError);
                showToast("Error crítico al cargar datos", "error");
            }
        }
    };

    loadFinancialData();
}, []);



    const handleOpenEdit = (item, type) => {
        setEditingItem({ ...item, editType: type });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingItem(null);
    };

    const handleSaveAmount = ({ amount }) => {
        const updatedValue = Number(amount);

        const updateList = (list, setList) => {
            const updated = list.map((item) =>
                item.id === editingItem.id ? { ...item, value_cop: updatedValue } : item
            );
            setList(updated);
        };

        switch (editingItem?.editType) {
            case "sale":
                updateList(sales, setSales);
                break;
            case "cost":
                updateList(salesCosts, setSalesCosts);
                break;
            case "operating":
                updateList(operatingExpenses, setOperatingExpenses);
                break;
            case "other":
                updateList(otherExpenses, setOtherExpenses);
                break;
            default:
                console.warn("Tipo de edición no reconocido");
        }

        handleCloseDialog();
    };

    const getProductName = (id) => {
        const product = products.find((p) => p.id === id);
        return product ? product.name : "Desconocido";
    };

    const handleSaveChanges = async () => {
        try {
            const userId = getUserId();

            const operatingExpensesWithUser = operatingExpenses.map(item => ({ ...item, created_by: userId }));
            const otherExpensesWithUser = otherExpenses.map(item => ({ ...item, created_by: userId }));

            const salesCostsWithUser = salesCosts.map(item => ({
                product_id: item.product_id ?? item.Product?.id,
                value_cop: item.value_cop,
                created_by: userId
            }));

            
            const salesWithUser = sales.map(item => ({
                product_id: item.product_id ?? item.Product?.id,
                value_cop: item.value_cop,
                created_by: userId
            }));

            await Promise.all([
                axiosInstance.post("/sales/createSales", { salesData: salesWithUser }),
                axiosInstance.post("/salescosts/createSalesCost", { salesCosts: salesCostsWithUser }),
                axiosInstance.post("/operatingexpenses/createOperatingExpenses", { operatingExpenses: operatingExpensesWithUser }),
                axiosInstance.post("/otherexpenses/createOtherExpenses", { otherExpenses: otherExpensesWithUser }),
            ]);

            showToast("Cambios guardados correctamente", "success");
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            showToast("Error al guardar los cambios", "error");
        }
    };


    return (
        <Box display="flex" flexDirection="column" gap={2}>

            <ToastNotification />

            <CardContent>
                <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
                    Ventas
                </Typography>

                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                            <TableRow>
                                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Producto</TableCell>
                                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Valor Venta</TableCell>
                                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales?.map((sale) => (
                                <TableRow key={`sale-${sale.id}`}>
                                    <TableCell>{getProductName(sale.product_id)}</TableCell>
                                    <TableCell>{formatCurrency(sale.value_cop)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenEdit(sale, "sale")} color="primary" size="small">
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
                            {salesCosts?.map((cost) => (
                                <TableRow key={`cost-${cost.id}`}>
                                    <TableCell>{getProductName(cost.product_id)}</TableCell>
                                    <TableCell>{formatCurrency(cost.value_cop)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenEdit(cost, "cost")} color="primary" size="small">
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
                            {operatingExpenses?.map((item) => (
                                <TableRow key={`op-${item.id}`}>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{formatCurrency(item.value_cop)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenEdit(item, "operating")} color="primary" size="small">
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
                            {otherExpenses?.map((item) => (
                                <TableRow key={`other-${item.id}`}>
                                    <TableCell>{item.concept}</TableCell>
                                    <TableCell>{formatCurrency(item.value_cop)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleOpenEdit(item, "other")} color="primary" size="small">
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
                title={`Editar valor de ${editingItem?.title || ""}`}
                schema={amountSchema}
                fields={fieldsAmountEdit}
                defaultValues={{
                    amount: editingItem?.value_cop || "",
                }}
                onSave={handleSaveAmount}
            />

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
        </Box>
    );
}
