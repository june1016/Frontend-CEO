import React, { useEffect, useMemo, useState } from "react";
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
  Button,
  TextField,
  useTheme,
  Card,
  CardContent,
  Chip,
  Grid
} from "@mui/material";
import {
  Save as SaveIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Business as BusinessIcon,
  AttachMoney as AttachMoneyIcon,
  Savings as SavingsIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../../services/api/axiosConfig";
import { getUserId } from "../../utils/shared/operationTime";
import { categoryColors, iconMapping } from "../../review/financialData";
import { formatCurrency } from "../../utils/formatters/currencyFormatters";
import SummaryCard from "../../components/planning/balanceSheet/summaryCard";
import ToastNotification, { showToast } from "../../components/common/ToastNotification";
import FormDialog from "../../components/admin/formDialog";
import { fieldsAmountEdit } from "../../data/fieldsForm";
import { amountSchema } from "../../utils/validators/amountSchema";
import showAlert from "../../utils/alerts/alertHelpers";

export default function TeacherPlanning() {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [createdBy, setCreatedBy] = useState(1);
  const [formattedDataTitles, setFormattedDataTitles] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchFinancialData = async (userId = createdBy) => {
    try {
      const response = await axiosInstance.get(
        "/financialdata/getfinancialdata/by-user",
        {
          params: { created_by: userId }
        }
      );

      setData(response.data.financialData);
    } catch (error) {
      console.error("Error al cargar datos financieros:", error);
    }
  };

  useEffect(() => {
    const getFinancialTitle = async () => {
      try {
        const response = await axiosInstance.get("/financialdata/getDatatitles");
        const financialTitles = response.data.financialTitles;

        const formattedData = financialTitles.reduce((acc, title) => {
          acc[title.name] = {
            title_id: title.id,
            literal_id: title.FinancialData[0]?.literal_id || null,
          };
          return acc;
        }, {});

        setFormattedDataTitles(formattedData);
      } catch (error) {
        console.error("Error al obtener títulos financieros:", error.message);
      }
    };

    getFinancialTitle();
  }, []);

  useEffect(() => {
    const loadFinancialData = async () => {
      const realUserId = getUserId();

      try {
        const response = await axiosInstance.get(
          "/financialdata/getfinancialdata/by-user",
          {
            params: { created_by: realUserId },
          }
        );

        const financialData = response.data.financialData;

        if (financialData.length > 0) {

          setCreatedBy(realUserId);
          setData(financialData);
        } else {

          const defaultResponse = await axiosInstance.get(
            "/financialdata/getfinancialdata/by-user",
            {
              params: { created_by: 1 },
            }
          );

          setCreatedBy(realUserId);
          setData(defaultResponse.data.financialData);
        }
      } catch (error) {
        console.error("Error al cargar datos financieros:", error);
      }
    };

    loadFinancialData();
  }, []);

  const totals = useMemo(() => {
    if (!Array.isArray(data)) return {};

    const result = data.reduce(
      (acc, item) => {
        const category = item.category || "Otros";
        const amount = parseFloat(item.amount) || 0;

        if (category === "Activos") acc.totalActivos += amount;
        else if (category === "Pasivos") acc.totalPasivos += amount;
        else if (category === "Patrimonio") acc.totalPatrimonio += amount;
        else acc.otros += amount;

        return acc;
      },
      {
        totalActivos: 0,
        totalPasivos: 0,
        totalPatrimonio: 0,
        otros: 0,
      }
    );

    result.balance = (result.totalActivos) - (result.totalPasivos + result.totalPatrimonio);

    return result;
  }, [data]);


  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleSaveAmount = ({ amount }) => {
    const updated = data.map((item) =>
      item.id === editingItem.id ? { ...item, amount: Number(amount) } : item
    );

    setData(updated);
    handleCloseDialog();
  };

  const handleFinalSave = async () => {

    if (Math.abs(totals.balance) >= 0.01) {
      showAlert(
        `Balance es ${totals.balance}`,
        "El balance no cuadra. Por favor, revise los valores ingresados",
        "error",
        "#1C4384"
      );
      return;
    }

    try {
      const realUserId = getUserId();

      const payload = {
        financialData: data.map((item) => {
          const titleKey = item.title;
          const formatted = formattedDataTitles[titleKey];

          return {
            title_id: formatted.title_id,
            literal_id: formatted.literal_id,
            amount: parseFloat(item.amount),
            created_by: realUserId,
          };
        }).filter(Boolean)
      };

      const response = await axiosInstance.post("/financialdata/createfinancialdata", payload);

      if (response.data.ok) {
        showToast("Cambios guardados correctamente", "success");

        setCreatedBy(realUserId);
        fetchFinancialData(realUserId);
      } else {
        showToast("No se pudo guardar la información", "error");
      }
    } catch (error) {
      showToast("Ocurrió un error al guardar los datos", "error");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>

      <ToastNotification />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Total Activos"
            value={totals.totalActivos}
            icon={<AttachMoneyIcon />}
            bgColor={theme.palette.success.main}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Total Pasivos"
            value={totals.totalPasivos}
            icon={<TrendingDownIcon />}
            bgColor={theme.palette.error.main}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Patrimonio"
            value={totals.totalPatrimonio}
            icon={<SavingsIcon />}
            bgColor={theme.palette.primary.main}
          />
        </Grid>
      </Grid>
      <CardContent>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Título</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Categoría</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="right">
                  Valor (COP)
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((item) => {
                const IconComponent = iconMapping[item.icon] || iconMapping["Computer"];
                const categoryColor = categoryColors[item.category] || {
                  light: "#e5e7eb",
                  text: "#4b5563",
                };

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconComponent sx={{ color: "text.secondary", fontSize: 20 }} />
                        <Typography variant="body2">{item.title}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={item.category || "Otros"}
                        size="small"
                        sx={{
                          bgcolor: categoryColor.light,
                          color: categoryColor.text,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Typography fontWeight={500}>
                        {formatCurrency(item.amount)}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <IconButton onClick={() => handleOpenEdit(item)} color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
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
          amount: editingItem?.amount || "",
        }}
        onSave={handleSaveAmount}
      />

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalSave}
        >
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  );
}
