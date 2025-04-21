import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Grid,
  CircularProgress,
  useTheme,
} from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import EngineeringIcon from '@mui/icons-material/Engineering';
import BuildIcon from "@mui/icons-material/Build";
import axiosInstance from "../../services/api/axiosConfig";
import showAlert from "../../utils/functions";
import MachineSpecifications from "./machinery/machineSpecifications";
import InfoCard from "../planning/financialData/common/infoCard";
import CustomInfoCard from "../../utils/alerts/customInfoCard";

export default function MachineryTab() {
  const theme = useTheme();
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMachines = async () => {
    try {
      const response = await axiosInstance.get("/machine/getmachines/details");
      if (response.data?.ok) {
        setMachines(response.data.machines);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al obtener las máquinas.";
      showAlert("Máquinas", message, "error", "#1C4384");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return (
    <Box>
      {/* Tarjeta informativa */}
      <InfoCard
        title="Información de Maquinaria Disponible"
        description="Revise las especificaciones técnicas de cada máquina. Todas las máquinas están certificadas y listas
        para operar. El mantenimiento preventivo está programado automáticamente según los estándares del
        abricante."
      />
      <Card sx={{ p: 4 }}>
        <CardHeader
          title={
            <>
              <EngineeringIcon sx={{ marginRight: 1 }} />
              Gestión de Maquinaria
            </>
          }
          subheader="Control y monitoreo de máquinas"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
          subheaderTypographyProps={{
            color: "white",
          }}
        />
        <CardContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : machines.length > 0 ? (
            <Grid container spacing={3}>
              {machines.map((machine) => (
                <Grid item xs={12} md={6} lg={4} key={machine.id}>
                  <Card
                    variant="outlined"
                    onClick={() => setSelectedMachine(machine)}
                    sx={{
                      cursor: "pointer",
                      borderColor:
                        selectedMachine?.id === machine.id ? "primary.main" : "divider",
                      boxShadow: selectedMachine?.id === machine.id ? 3 : undefined,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: 4,
                        borderColor: "primary.light",
                      },
                    }}
                  >
                    <CardHeader
                      avatar={
                        <PrecisionManufacturingIcon
                          sx={{
                            color:
                              selectedMachine?.id === machine.id
                                ? theme.palette.primary.contrastText
                                : theme.palette.grey[300],
                          }}
                        />
                      }
                      title={
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {machine.name}
                        </Typography>
                      }
                      subheader={
                        machine.status
                          ? `Estado: ${machine.status}`
                          : "Máquina operativa"
                      }
                      sx={{
                        backgroundColor:
                          selectedMachine?.id === machine.id
                            ? theme.palette.primary.main
                            : theme.palette.grey[100],
                        color:
                          selectedMachine?.id === machine.id
                            ? "white"
                            : "text.primary",
                      }}
                      subheaderTypographyProps={{
                        color:
                          selectedMachine?.id === machine.id
                            ? "white"
                            : "text.secondary",
                      }}
                    />
                    <CardContent>
                      {machine.Product && (
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Producto Asociado
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            color="primary.main"
                          >
                            {machine.Product.name}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Paper
                elevation={0}
                sx={{ p: 4, border: "1px solid #E5E7EB", mb: 4 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    py: 6,
                  }}
                >
                  <PrecisionManufacturingIcon
                    sx={{
                      fontSize: 60,
                      color: "primary.main",
                      opacity: 0.7,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color="primary.main"
                    mb={2}
                  >
                    Gestión de Maquinaria
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    maxWidth="600px"
                  >
                    Administra tu maquinaria, programa mantenimientos, monitorea el
                    rendimiento y planifica adquisiciones para optimizar tu
                    producción.
                  </Typography>
                </Box>
              </Paper>
              <Typography variant="body1" color="text.secondary">
                No hay máquinas registradas por el momento.
              </Typography>
            </Box>
          )}

          {/* Mostrar especificaciones si hay máquina seleccionada */}
          {selectedMachine && <MachineSpecifications machine={selectedMachine} />}
        </CardContent>
        <CustomInfoCard
          title="Advertencia de Mantenimiento"
          subtitle="Asegúrese de revisar las máquinas para evitar fallos operativos"
          description="Revise las especificaciones técnicas de cada máquina. Las máquinas están certificadas y listas para operar. El mantenimiento preventivo está programado automáticamente según los estándares del fabricante."
          alertSeverity="warning"
        />

      </Card>
    </Box>
  );
}
