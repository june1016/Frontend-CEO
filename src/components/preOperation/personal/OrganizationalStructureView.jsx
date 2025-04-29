import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EngineeringIcon from "@mui/icons-material/Engineering";
import axiosInstance from "../../../services/api/axiosConfig";
import CustomInfoCard from "../../../utils/alerts/customInfoCard";
import showAlert from "../../../utils/alerts/alertHelpers";

const OperationalStructureView = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allOptionalHired, setAllOptionalHired] = useState(false);

  const [contractedRoles, setContractedRoles] = useState({
    gerente: true,
    operarios: 0,
    vendedores: 0,
    apoyo: {},
  });

  const fetchOperationalData = async () => {
    try {
      const { data } = await axiosInstance.get("/payrol/payroll-roles");
      if (data.ok) {
        setRoles(data.roleImprovements);
      } else {
        showAlert(
          "Error en la Nómina",
          "No se pudieron cargar los datos de nómina.",
          "error",
          "#1C4384"
        );
      }
    } catch (err) {
      console.error(err);
      showAlert(
        "Error en la Nómina",
        "Error al obtener los datos de nómina.",
        "error",
        "#1C4384"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperationalData();
  }, []);

  const groupedByRole = roles.reduce((acc, item) => {
    const roleId = item.PayrollRole.id;
    const roleName = item.PayrollRole.name.toLowerCase();

    if (!acc[roleId]) {
      acc[roleId] = {
        name: item.PayrollRole.name,
        salary: item.PayrollRole.base_salary,
        optional: item.PayrollRole.optional,
        improvements: [],
        quantity: 0,
      };
    }

    acc[roleId].improvements.push(item.Improvement);
    return acc;
  }, {});

  const handleContract = (roleName, change = 1) => {
    const name = roleName.toLowerCase();
    setContractedRoles((prev) => {
      const updated = { ...prev };

      if (name.includes("operario")) {
        updated.operarios = Math.max(0, prev.operarios + change);
      } else if (name.includes("vendedor")) {
        updated.vendedores = Math.max(0, prev.vendedores + change);
      } else {
        const current = prev.apoyo[roleName] || 0;
        const newCount = current + change;
        updated.apoyo = {
          ...prev.apoyo,
          [roleName]: newCount > 1 ? 1 : Math.max(0, newCount),
        };
      }

      return updated;
    });
  };

  const calculateTotalPayroll = () => {
    let total = 0;

    Object.entries(groupedByRole).forEach(([_, role]) => {
      const name = role.name.toLowerCase();
      let quantity = 0;

      if (name.includes("gerente")) {
        quantity = 1;
      } else if (name.includes("operario")) {
        quantity = contractedRoles.operarios;
      } else if (name.includes("vendedor")) {
        quantity = contractedRoles.vendedores;
      } else {
        quantity = contractedRoles.apoyo[role.name] || 0;
      }

      total += role.salary * quantity;
    });

    return total;
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const userId = userData.id;

  useEffect(() => {
    const allRequiredHired = Object.entries(groupedByRole).every(([_, role]) => {
      if (!role.optional) {
        const name = role.name.toLowerCase();
        if (name.includes("operario")) {
          return contractedRoles.operarios >= 3;
        } else if (name.includes("vendedor")) {
          return contractedRoles.vendedores >= 1;
        }
        return true;
      }
      return true;
    });

    setAllOptionalHired(allRequiredHired);
  }, [contractedRoles, roles]);

  const handleSaveStructure = async () => {
    if (contractedRoles.operarios < 3 || contractedRoles.vendedores < 1) {
      showAlert(
        "Error en la Nómina",
        "Debes contratar al menos 3 operarios y 1 vendedor.",
        "error",
        "#1C4384"
      );
      return;
    }

    const assignments = [];

    Object.entries(groupedByRole).forEach(([_, role]) => {
      const name = role.name.toLowerCase();
      let quantity = 0;

      if (name.includes("gerente")) {
        quantity = 1;
      } else if (name.includes("operario")) {
        quantity = contractedRoles.operarios;
      } else if (name.includes("vendedor")) {
        quantity = contractedRoles.vendedores;
      } else {
        quantity = contractedRoles.apoyo[role.name] || 0;
      }

      if (quantity > 0) {
        role.improvements.forEach((imp) => {
          assignments.push({
            role_improvement_id: imp.id,
            configuration_id: 1,
            quantity,
            created_by: userId,
          });
        });
      }
    });

    try {
      const { data } = await axiosInstance.post(
        "/payrol-assig/payroll-improvements-assignments",
        assignments
      );

      if (data.message) {
        showAlert(
          "Nómina",
          "Nómina registrada exitosamente",
          "success",
          "#1C4384"
        );

      }
    } catch (err) {
      console.error(err);
      showAlert(
        "Nómina",
        JSON.stringify(message, null, 2),
        "error",
        "#1C4384"
      );
    }
  };


  if (loading) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <CircularProgress />
        <Typography>Cargando estructura operacional...</Typography>
      </Box>
    );
  }

  const renderSection = (title, icon, rolesArray) => (
    <>
      <Box display="flex" alignItems="center" mt={4} mb={2}>
        {icon}
        <Typography variant="h6" fontWeight={600} ml={1}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {rolesArray.map(([roleId, role]) => {
          const { name, improvements, optional, salary } = role;
          const isGerente = name.toLowerCase().includes("gerente");
          const isOperario = name.toLowerCase().includes("operario");
          const isVendedor = name.toLowerCase().includes("vendedor");

          const contractedCount = isOperario
            ? contractedRoles.operarios
            : isVendedor
              ? contractedRoles.vendedores
              : contractedRoles.apoyo[name] || 0;

          const maxReached =
            (isOperario && contractedCount >= 3) ||
            (isVendedor && contractedCount >= 1) ||
            (!isOperario && !isVendedor && contractedCount >= 1);

          const yaContratado = isGerente || contractedCount > 0;

          return (
            <Grid item xs={12} md={6} key={roleId}>
              <Card
                sx={{
                  backgroundColor: yaContratado ? "#e3f2fd" : "#f9f9f9",
                  border: "1px solid #ddd",
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  avatar={<EngineeringIcon color="primary" />}
                  title={`${name} ${contractedCount > 0 ? `(${contractedCount})` : ""}`}
                  titleTypographyProps={{ fontWeight: 600 }}
                  subheader={yaContratado ? "Asignado" : ""}
                />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="body1" fontWeight={600}>
                      Salario Base:
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight={600}>
                      ${salary?.toLocaleString("es-CO")}
                    </Typography>
                  </Box>

                  <Chip
                    label={optional ? "Opcional" : "Obligatorio"}
                    color={optional ? "default" : "error"}
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  {improvements.map((imp) => (
                    <Box key={imp.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {imp.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {imp.description}
                      </Typography>
                    </Box>
                  ))}

                  {!isGerente && (
                    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                      <Typography variant="body2" fontWeight={500}>
                        Contratados: {contractedCount}
                      </Typography>
                      <Box>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleContract(name, -1)}
                          disabled={contractedCount === 0}
                          sx={{ minWidth: 30, mx: 0.5 }}
                        >
                          -
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleContract(name, 1)}
                          disabled={
                            (!isOperario && !isVendedor && contractedCount >= 1) ||
                            (isOperario && contractedCount >= 20) ||
                            (isVendedor && contractedCount >= 10)
                          }
                          sx={{ minWidth: 30, mx: 0.5 }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  const baseRoles = Object.entries(groupedByRole).filter(
    ([_, role]) => !role.optional
  );
  const optionalRoles = Object.entries(groupedByRole).filter(
    ([_, role]) => role.optional
  );

  return (
    <Box>
      {allOptionalHired && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Todos los roles obligatorios han sido contratados.
        </Alert>
      )}

      {renderSection("Personal Base", <GroupsIcon color="primary" />, baseRoles)}
      {renderSection("Personal de Apoyo", <VolunteerActivismIcon color="secondary" />, optionalRoles)}

      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Resumen de Nómina
          </Typography>
          <Alert severity="info" sx={{ maxWidth: 400 }}>
            Costo total mensual de nómina:{" "}
            <strong>${calculateTotalPayroll().toLocaleString("es-CO")}</strong>
          </Alert>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveStructure}
          disabled={loading}
          sx={{ height: "fit-content", whiteSpace: "nowrap" }}
        >
          Guardar Estructura
        </Button>
      </Box>

      <Box mt={4}>
        <CustomInfoCard
          title="Consideraciones de Nómina"
          subtitle="Aspectos importantes a tener en cuenta"
          description={
            <>
              <ul>
                <li>El personal no contratado requerirá atención manual.</li>
                <li>Los costos de nómina afectan el flujo de caja mensual.</li>
                <li>Vendedores generan comisiones adicionales del 1% sobre ventas.</li>
              </ul>
            </>
          }
          alertSeverity="warning"
        />
      </Box>
    </Box>
  );
};

export default OperationalStructureView;
