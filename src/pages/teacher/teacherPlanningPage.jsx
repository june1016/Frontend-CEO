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
import { getUserId } from "../../utils/timeManagement/operationTime";
import { categoryColors, iconMapping } from "../../constants/financialData";
import { formatCurrency } from "../../utils/formatters/currencyFormatters";
import SummaryCard from "../../components/planning/balanceSheet/summaryCard";

export default function TeacherPlanning() {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await axiosInstance.get(
          "/financialdata/getfinancialdata/by-user",
          {
            params: { created_by: getUserId() }
          }
        )

        console.log(data);

        const rawData = response.data.financialData;

        setData(rawData);
      } catch (error) {
        console.error("Error al cargar datos financieros:", error);
      }
    };

    fetchFinancialData();
  }, []);

  const totals = useMemo(() => {
    if (!Array.isArray(data)) return {};

    const result = data.reduce(
      (acc, item) => {
        const category = item.category || "Otros";
        const amount = parseFloat(item.amount) || 0;

        if (category === "Activos") acc.totalActivos += amount;
        else if (category === "Pasivos") acc.totalPasivos += amount;
        else acc.otros += amount;

        return acc;
      },
      { totalActivos: 0, totalPasivos: 0, otros: 0 }
    );

    result.patrimonio = result.totalActivos - result.totalPasivos;
    return result;
  }, [data]);

  const handleOpenEdit = (item) => {
    setEditRow(item);
    setNewAmount(item.amount);
  };

  const handleClose = () => {
    setEditRow(null);
    setNewAmount("");
  };

  const handleSave = () => {
    const updated = data.map((item) =>
      item.id === editRow.id ? { ...item, amount: Number(newAmount) } : item
    );
    setData(updated);
    handleClose();
  };

  const handleFinalSave = () => {
    const payload = data.map((item) => ({
      id: item.id,
      title_id: item.title.id,
      amount: item.amount,
      updated_by: 1
    }));

    alert("Cambios guardados (ver consola)");
  };


  return (
    <Box display="flex" flexDirection="column" gap={1}>
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
            value={totals.patrimonio}
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
