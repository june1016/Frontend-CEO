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
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Swal from "sweetalert2";
import ToastNotification, { showToast } from "../../components/common/ToastNotification";
import FormDialog from "../../components/admin/formDialog";
import { getUserId } from "../../utils/shared/operationTime";
import axiosInstance from "../../services/api/axiosConfig";
import { formatCurrency } from "../../utils/formatters/currencyFormatters";
import { amountQuantitySchema, amountSchema, valueCopSchema } from "../../utils/validators/amountSchema";
import { fieldsAmountEdit, fieldsAmountQuantityEdit, fieldsValueCopEdit } from "../../data/fieldsForm";

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

export default function FixedExpensesView() {
  const theme = useTheme();

  const [personnelExpenses, setPersonnelExpenses] = useState([]);
  const [operatingCosts, setOperatingCosts] = useState([]);
  const [financialObligations, setFinancialObligations] = useState([]);
  const [socialCharges, setSocialCharges] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const loadFixedExpensesData = async () => {
      const userId = getUserId();

      try {
        const [
          userPersonnelRes,
          userOperatingRes,
          userFinancialRes,
          userSocialRes,
        ] = await Promise.all([
          axiosInstance.get("/personnelexpenses/getPersonnelExpensesByCreatedBy", {
            params: { created_by: userId },
          }),
          axiosInstance.get("/operatingcosts/getOperatingCostsByCreatedBy", {
            params: { created_by: userId },
          }),
          axiosInstance.get("/financialobligations/getFinancialObligationsByCreatedBy", {
            params: { created_by: userId },
          }),
          axiosInstance.get("/socialcharges/getSocialChargesByCreatedBy", {
            params: { created_by: userId },
          }),
        ])

        const hasPersonnel = userPersonnelRes.data.personnelExpenses.length > 0;
        const hasOperating = userOperatingRes.data.operatingCosts.length > 0;
        const hasFinancial = userFinancialRes.data.financialObligations.length > 0;
        const hasSocial = userSocialRes.data.socialCharges.length > 0;

        const [
          defaultPersonnelRes,
          defaultOperatingRes,
          defaultFinancialRes,
          defaultSocialRes,
        ] = await Promise.all([
          hasPersonnel ? null : axiosInstance.get("/personnelexpenses/getInitialPersonnelExpenses"),
          hasOperating ? null : axiosInstance.get("/operatingcosts/getInitialOperatingCosts"),
          hasFinancial ? null : axiosInstance.get("/financialobligations/getInitialFinancialObligations"),
          hasSocial ? null : axiosInstance.get("/socialcharges/getInitialSocialCharges"),
        ]);

        setPersonnelExpenses(
          hasPersonnel
            ? userPersonnelRes.data.personnelExpenses
            : defaultPersonnelRes?.data.personnelExpenses || []
        );

        setOperatingCosts(
          hasOperating
            ? userOperatingRes.data.operatingCosts
            : defaultOperatingRes?.data.operatingCosts || []
        );

        setFinancialObligations(
          hasFinancial
            ? userFinancialRes.data.financialObligations
            : defaultFinancialRes?.data.financialObligations || []
        );

        setSocialCharges(
          hasSocial
            ? userSocialRes.data.socialCharges
            : defaultSocialRes?.data.socialCharges || []
        );
      } catch (error) {
        console.error("Error al cargar gastos fijos:", error);
      }
    };

    loadFixedExpensesData();
  }, []);

  const editTypeMap = {
    personnel: {
      schema: amountQuantitySchema,
      fields: fieldsAmountQuantityEdit,
      title: "Editar Gasto de Personal",
    },
    operating: {
      schema: valueCopSchema,
      fields: fieldsValueCopEdit,
      title: "Editar Costo Operativo",
    },
    financial: {
      schema: valueCopSchema,
      fields: fieldsValueCopEdit,
      title: "Editar Obligación Financiera",
    },
    social: {
      schema: valueCopSchema,
      fields: fieldsValueCopEdit,
      title: "Editar Carga Social",
    },
  };

  const editTypeStateMap = {
    personnel: [personnelExpenses, setPersonnelExpenses],
    operating: [operatingCosts, setOperatingCosts],
    financial: [financialObligations, setFinancialObligations],
    social: [socialCharges, setSocialCharges],
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
    const [list, setList] = editTypeStateMap[editingItem?.editType] || [];

    if (list && setList) {
      const updated = [...list];
      updated[editingItem.index] = { ...updated[editingItem.index], ...data };
      setList(updated);
    }

    handleCloseDialog();
  };

  const handleSaveChanges = async () => {
    try {
      const userId = getUserId();

      const payloads = {
        personnelExpenses: personnelExpenses.map(item => ({
          ...item,
          created_by: userId,
        })),
        operatingCosts: operatingCosts.map(item => ({
          ...item,
          created_by: userId,
        })),
        financialObligations: financialObligations.map(item => ({
          ...item,
          created_by: userId,
        })),
        socialCharges: socialCharges.map(item => ({
          ...item,
          created_by: userId,
        })),
      };

      await Promise.all([
        axiosInstance.post("/personnelexpenses/createOrUpdatePersonnelExpenses", {
          personnelExpenses: payloads.personnelExpenses,
        }),
        axiosInstance.post("/operatingcosts/createOrUpdateOperatingCosts", {
          operatingCosts: payloads.operatingCosts,
        }),
        axiosInstance.post("/financialobligations/createOrUpdateFinancialObligations", {
          financialObligations: payloads.financialObligations,
        }),
        axiosInstance.post("/socialcharges/createOrUpdateSocialCharges", {
          socialCharges: payloads.socialCharges,
        }),
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
        <Typography variant="h6" mb={2}>
          Gastos de Personal
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 1 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Cantidad</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">Valor (COP)</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personnelExpenses?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{formatCurrency(item.value_cop)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenEdit(item, "personnel", index)} color="primary" size="small">
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
          Costos Operativos
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 1 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">Valor (COP)</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {operatingCosts?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{formatCurrency(item.value_cop)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenEdit(item, "operating", index)} color="primary" size="small">
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
          Obligaciones Financieras
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 1 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">Valor (COP)</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {financialObligations?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{formatCurrency(item.value_cop)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenEdit(item, "financial", index)} color="primary" size="small">
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
          Cargas Sociales
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 1 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">Valor (COP)</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {socialCharges?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{formatCurrency(item.value_cop)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenEdit(item, "social", index)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {editingItem && (
        <FormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          title={editTypeMap[editingItem.editType]?.title || "Editar"}
          schema={editTypeMap[editingItem.editType]?.schema}
          fields={editTypeMap[editingItem.editType]?.fields}
          defaultValues={{
            quantity: editingItem?.quantity || 0,
            value_cop: editingItem?.value_cop || 0,
          }}
          onSave={handleSave}
        />
      )}

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveChanges}>
          Guardar cambios
        </Button>
      </Box>
    </Box>
  );
}
