import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Avatar,
  Paper,
  InputAdornment,
  useTheme,
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

export default function BalanceSheetTab() {
  const theme = useTheme();

  // Estado para cada sección
  const [activosCorrientes, setActivosCorrientes] = useState({
    Caja: "",
    Bancos: "",
    "Cuentas por cobrar": "",
    Inventarios: "",
    "Inversiones temporales": "",
  });

  const [pasivosCorrientes, setPasivosCorrientes] = useState({
    "C X P (Cuentas por Pagar)": "",
    "Letras por pagar": "",
  });

  const [ppe, setPpe] = useState({
    "Muebles y enseres": "",
    Patentes: "",
    Maquinarias: "",
    "Equipos oficina": "",
  });

  const [pasivosLP, setPasivosLP] = useState({
    "Obligaciones Finan. L.P": "",
  });

  const [patrimonio, setPatrimonio] = useState({
    Capital: "",
  });

  // Calcular totales
  const [totals, setTotals] = useState({
    activosCorrientes: 0,
    ppe: 0,
    totalActivos: 0,
    pasivosCorrientes: 0,
    pasivosLP: 0,
    totalPasivos: 0,
    patrimonio: 0,
    balance: 0,
  });

  // Actualizar valores de entrada
  const handleInputChange = (section, account, value) => {
    // Permitir solo números y punto decimal
    const numericValue = value.replace(/[^0-9.]/g, "");

    switch (section) {
      case "activosCorrientes":
        setActivosCorrientes({ ...activosCorrientes, [account]: numericValue });
        break;
      case "pasivosCorrientes":
        setPasivosCorrientes({ ...pasivosCorrientes, [account]: numericValue });
        break;
      case "ppe":
        setPpe({ ...ppe, [account]: numericValue });
        break;
      case "pasivosLP":
        setPasivosLP({ ...pasivosLP, [account]: numericValue });
        break;
      case "patrimonio":
        setPatrimonio({ ...patrimonio, [account]: numericValue });
        break;
    }
  };

  // Calcular todos los totales cuando cambia cualquier entrada
  useEffect(() => {
    const calculateTotal = (items) => {
      return Object.values(items).reduce((sum, value) => {
        const numValue = Number.parseFloat(value) || 0;
        return sum + numValue;
      }, 0);
    };

    const activosCorrientesTotal = calculateTotal(activosCorrientes);
    const ppeTotal = calculateTotal(ppe);
    const pasivosCorrientesTotal = calculateTotal(pasivosCorrientes);
    const pasivosLPTotal = calculateTotal(pasivosLP);
    const patrimonioTotal = calculateTotal(patrimonio);

    const totalActivos = activosCorrientesTotal + ppeTotal;
    const totalPasivos = pasivosCorrientesTotal + pasivosLPTotal;
    const balance = totalActivos - totalPasivos - patrimonioTotal;

    setTotals({
      activosCorrientes: activosCorrientesTotal,
      ppe: ppeTotal,
      totalActivos,
      pasivosCorrientes: pasivosCorrientesTotal,
      pasivosLP: pasivosLPTotal,
      totalPasivos,
      patrimonio: patrimonioTotal,
      balance,
    });
  }, [activosCorrientes, pasivosCorrientes, ppe, pasivosLP, patrimonio]);

  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Función para guardar el presupuesto
  const handleSave = () => {

    alert("Presupuesto guardado con éxito");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Alerta informativa */}
      <Card
        sx={{
          mb: 4,
          bgcolor: "primary.light",
          color: "white",
          background:
            "linear-gradient(to right, rgba(28, 67, 132, 0.05), rgba(28, 67, 132, 0.1))",
          border: "none",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
              <InfoIcon />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 0.5, color: "primary.main" }}
              >
                Balance General Inicial
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                En esta sección puede ingresar la información detallada de su
                Balance General Inicial. Complete todos los campos
                correspondientes a Activos, Pasivos y Patrimonio para establecer
                la situación financiera base de su empresa.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Container principal del Balance */}
      <Card sx={{ boxShadow: 2, mb: 4, overflow: "hidden" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Balance General Inicial
              </Typography>
            </Box>
          }
          action={
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                bgcolor: theme.palette.success.main,
                "&:hover": { bgcolor: theme.palette.success.dark },
              }}
            >
              Guardar Presupuesto
            </Button>
          }
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            p: 2,
          }}
        />

        <CardContent sx={{ p: 4, bgcolor: "#F8F9FC" }}>
          {/* Tarjetas de resumen */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  boxShadow: 2,
                }}
              >
                <CardContent
                  sx={{ p: 3, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <AttachMoneyIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Activos
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      ${formatCurrency(totals.totalActivos)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  bgcolor: theme.palette.error.main,
                  color: "white",
                  boxShadow: 2,
                }}
              >
                <CardContent
                  sx={{ p: 3, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <TrendingDownIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Pasivos
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      ${formatCurrency(totals.totalPasivos)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: "white",
                  boxShadow: 2,
                }}
              >
                <CardContent
                  sx={{ p: 3, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    <SavingsIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Patrimonio
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      ${formatCurrency(totals.patrimonio)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Columna izquierda - Activos */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Activos Corrientes */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TrendingUpIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Activos Corrientes
                        </Typography>
                      </Box>
                    }
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      p: 1.5,
                    }}
                  />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(activosCorrientes).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "activosCorrientes",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total activos corrientes
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.success.main }}>
                            ${formatCurrency(totals.activosCorrientes)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>

                {/* P.P.E */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BusinessIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          P.P.E (Propiedades, Planta y Equipo)
                        </Typography>
                      </Box>
                    }
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      p: 1.5,
                    }}
                  />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(ppe).map(([account, amount], index) => (
                          <TableRow key={index} hover>
                            <TableCell sx={{ fontWeight: "medium" }}>
                              {account}
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={amount}
                                onChange={(e) =>
                                  handleInputChange(
                                    "ppe",
                                    account,
                                    e.target.value
                                  )
                                }
                                placeholder="0.00"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Typography
                                        sx={{ color: "text.secondary" }}
                                      >
                                        $
                                      </Typography>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total PPE
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.success.main }}>
                            ${formatCurrency(totals.ppe)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            </Grid>

            {/* Columna derecha - Pasivos y Patrimonio */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Pasivos Corrientes */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TrendingDownIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Pasivos Corrientes
                        </Typography>
                      </Box>
                    }
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      p: 1.5,
                    }}
                  />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(pasivosCorrientes).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "pasivosCorrientes",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total pasivos corrientes
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.error.main }}>
                            ${formatCurrency(totals.pasivosCorrientes)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>

                {/* Pasivos Largo Plazo */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TrendingDownIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Pasivos Largo Plazo
                        </Typography>
                      </Box>
                    }
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      p: 1.5,
                    }}
                  />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(pasivosLP).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "pasivosLP",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total Pasivos LP
                          </TableCell>
                          <TableCell sx={{ color: theme.palette.error.main }}>
                            ${formatCurrency(totals.pasivosLP)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>

                {/* Patrimonio */}
                <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <SavingsIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          Patrimonio
                        </Typography>
                      </Box>
                    }
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      p: 1.5,
                    }}
                  />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#F3F4F6" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Cuenta
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Monto
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(patrimonio).map(
                          ([account, amount], index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: "medium" }}>
                                {account}
                              </TableCell>
                              <TableCell>
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  value={amount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "patrimonio",
                                      account,
                                      e.target.value
                                    )
                                  }
                                  placeholder="0.00"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Typography
                                          sx={{ color: "text.secondary" }}
                                        >
                                          $
                                        </Typography>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow
                          sx={{
                            bgcolor: "#EBF5FF",
                            "& td": { fontWeight: "bold" },
                          }}
                        >
                          <TableCell sx={{ color: theme.palette.primary.dark }}>
                            Total Patrimonio
                          </TableCell>
                          <TableCell
                            sx={{ color: theme.palette.secondary.main }}
                          >
                            ${formatCurrency(totals.patrimonio)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Tarjeta de Resumen Total */}
          <Card
            sx={{
              mt: 4,
              boxShadow: 3,
              borderRadius: 1,
              bgcolor:
                Math.abs(totals.balance) < 0.01
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              color: "white",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                p: 3,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Balance Total
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  {Math.abs(totals.balance) < 0.01
                    ? "El balance está cuadrado correctamente"
                    : "El balance no está cuadrado"}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mt: { xs: 2, md: 0 } }}
              >
                ${formatCurrency(Math.abs(totals.balance))}
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
}
