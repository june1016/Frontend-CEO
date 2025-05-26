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
  Button,
  TextField,
  useTheme,
  Card,
  CardContent
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WalletIcon from "@mui/icons-material/Wallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WorkIcon from "@mui/icons-material/Work";
import SaveIcon from '@mui/icons-material/Save';

// Mapeo dinámico de íconos
const iconMap = {
  Wallet: <WalletIcon sx={{ mr: 1, verticalAlign: "middle" }} />,
  CreditCard: <CreditCardIcon sx={{ mr: 1, verticalAlign: "middle" }} />,
  Work: <WorkIcon sx={{ mr: 1, verticalAlign: "middle" }} />
};

const mockFinancialData = [
  {
    id: 1,
    amount: 25000000,
    icon: "Wallet",
    title: {
      id: 1,
      name: "Dinero en caja",
      category: { id: 1, name: "Activos" }
    }
  },
  {
    id: 9,
    amount: 60000000,
    icon: "CreditCard",
    title: {
      id: 9,
      name: "Cuentas por pagar",
      category: { id: 2, name: "Pasivos" }
    }
  },
  {
    id: 12,
    amount: 300000000,
    icon: "Work",
    title: {
      id: 12,
      name: "Capital social",
      category: { id: 3, name: "Patrimonio" }
    }
  }
];

export default function TeacherPlanning() {
  const theme = useTheme();
  const [data, setData] = useState(mockFinancialData);
  const [editRow, setEditRow] = useState(null);
  const [newAmount, setNewAmount] = useState("");

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
    console.log("Datos a guardar:", payload);
    alert("Cambios guardados (ver consola)");
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom display="flex" alignItems="center">
            Datos financieros
          </Typography>
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
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {iconMap[item.icon]}
                        {item.title.name}
                      </Box>
                    </TableCell>
                    <TableCell>{item.title.category.name}</TableCell>
                    <TableCell align="right">
                      ${item.amount.toLocaleString("es-CO")}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleOpenEdit(item)} color="primary" size="small">
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



      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleFinalSave}>
          Guardar Cambios
        </Button>
      </Box>

      {/* Modal de edición */}
      <Dialog open={!!editRow} onClose={handleClose}>
        <DialogTitle>Editar Monto</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nuevo monto (COP)"
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
