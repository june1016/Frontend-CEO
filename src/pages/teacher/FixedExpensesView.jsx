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

const initialPersonnelExpenses = [
  { id: 1, name: "Nómina Gerente (CEO)", quantity: 1, value_cop: 6000000, note: "Obligatorio - El CEO asume rol administrativo" },
  { id: 2, name: "Nómina Vendedor", quantity: 1, value_cop: 2500000, note: "Mínimo requerido (1 × 2.500.000)" },
  { id: 3, name: "Nómina operarios", quantity: 3, value_cop: 5400000, note: "Mínimo requerido (3 × 1.800.000)" },
];

const initialOperatingCosts = [
  { id: 1, name: "Arrendamiento", value_cop: 12000000 },
  { id: 2, name: "Servicios Públicos", value_cop: 8000000 },
  { id: 3, name: "Mantenimiento", value_cop: 7500000 },
  { id: 4, name: "Telefonía móvil", value_cop: 2000000 },
  { id: 5, name: "Cafetería y Papelería", value_cop: 3000000 },
  { id: 6, name: "Otros gastos operativos", value_cop: 5000000 },
];

const initialFinancialObligations = [
  { id: 1, name: "Abono a Cuentas x pagar", value_cop: 1500000 },
  { id: 2, name: "Abono Máquina 1 NRX31", value_cop: 1500000 },
  { id: 3, name: "Abono Máquina 2 XLG77", value_cop: 1200000 },
  { id: 4, name: "Abono Máquina 3 CP23H", value_cop: 1000000 },
  { id: 5, name: "Abono otras inversiones", value_cop: 800000 },
];

const initialSocialCharges = [
  { id: 1, name: "PRESTACIONES-POS", value_cop: 5100000 },
];

export default function FixedExpensesView() {
  const theme = useTheme();

  const [personnelExpenses, setPersonnelExpenses] = useState(initialPersonnelExpenses);
  const [operatingCosts, setOperatingCosts] = useState(initialOperatingCosts);
  const [financialObligations, setFinancialObligations] = useState(initialFinancialObligations);
  const [socialCharges, setSocialCharges] = useState(initialSocialCharges);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formValues, setFormValues] = useState({ quantity: "", value_cop: "" });

  const handleOpenModal = (type, index) => {
    let item;
    switch(type){
      case "personnel": item = personnelExpenses[index]; break;
      case "operating": item = operatingCosts[index]; break;
      case "financial": item = financialObligations[index]; break;
      case "social": item = socialCharges[index]; break;
      default: return;
    }
    setEditing({ type, index });
    setFormValues({
      quantity: item.quantity !== undefined ? item.quantity : "",
      value_cop: item.value_cop.toString(),
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditing(null);
    setFormValues({ quantity: "", value_cop: "" });
  };

  const handleChange = (field, value) => {
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    const valueNum = parseInt(formValues.value_cop, 10);
    const quantityNum = formValues.quantity !== "" ? parseInt(formValues.quantity, 10) : null;

    if (isNaN(valueNum)) {
      Swal.fire("Error", "El valor debe ser un número válido", "error");
      return;
    }
    if (editing.type === "personnel" && (quantityNum === null || isNaN(quantityNum))) {
      Swal.fire("Error", "La cantidad debe ser un número válido", "error");
      return;
    }

    switch(editing.type){
      case "personnel": {
        const updated = [...personnelExpenses];
        updated[editing.index] = {
          ...updated[editing.index],
          quantity: quantityNum,
          value_cop: valueNum,
        };
        setPersonnelExpenses(updated);
        break;
      }
      case "operating": {
        const updated = [...operatingCosts];
        updated[editing.index] = {
          ...updated[editing.index],
          value_cop: valueNum,
        };
        setOperatingCosts(updated);
        break;
      }
      case "financial": {
        const updated = [...financialObligations];
        updated[editing.index] = {
          ...updated[editing.index],
          value_cop: valueNum,
        };
        setFinancialObligations(updated);
        break;
      }
      case "social": {
        const updated = [...socialCharges];
        updated[editing.index] = {
          ...updated[editing.index],
          value_cop: valueNum,
        };
        setSocialCharges(updated);
        break;
      }
      default: break;
    }

    setModalOpen(false);
    setEditing(null);
    setFormValues({ quantity: "", value_cop: "" });
    Swal.fire("Guardado", "Datos actualizados correctamente", "success");
  };

  const saveAllChanges = () => {
    // Aquí iría la llamada a backend para guardar todo
    Swal.fire("Éxito", "Gastos guardados correctamente.", "success");
  };

  const renderTable = (title, data, type, columns) => (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>{title}</Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                {columns.map(({ label, key, align }) => (
                  <TableCell key={key} sx={{ color: "#fff", fontWeight: "bold" }} align={align || "left"}>
                    {label}
                  </TableCell>
                ))}
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  {columns.map(({ key, align }) => (
                    <TableCell key={key} align={align || "left"}>
                      {key === "value_cop" ? `$${row[key].toLocaleString()}` : row[key] || ""}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton color="primary" size="small" onClick={() => handleOpenModal(type, index)}>
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
  );

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {renderTable("Gastos de Personal", personnelExpenses, "personnel", [
        { label: "Nombre", key: "name" },
        { label: "Cantidad", key: "quantity", align: "center" },
        { label: "Valor (COP)", key: "value_cop", align: "right" },
        { label: "Nota", key: "note" },
      ])}

      {renderTable("Costos Operativos", operatingCosts, "operating", [
        { label: "Nombre", key: "name" },
        { label: "Valor (COP)", key: "value_cop", align: "right" },
      ])}

      {renderTable("Obligaciones Financieras", financialObligations, "financial", [
        { label: "Nombre", key: "name" },
        { label: "Valor (COP)", key: "value_cop", align: "right" },
      ])}

      {renderTable("Cargas Sociales", socialCharges, "social", [
        { label: "Nombre", key: "name" },
        { label: "Valor (COP)", key: "value_cop", align: "right" },
      ])}

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={saveAllChanges}>
          Guardar Cambios
        </Button>
      </Box>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Editar Gasto</Typography>
            <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
          </Box>

          {editing && (
            <>
              {editing.type === "personnel" && (
                <TextField
                  fullWidth
                  label="Cantidad"
                  value={formValues.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  margin="normal"
                  type="number"
                />
              )}

              <TextField
                fullWidth
                label="Valor (COP)"
                value={formValues.value_cop}
                onChange={(e) => handleChange("value_cop", e.target.value)}
                margin="normal"
                type="number"
              />

              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleSave}>Guardar</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
