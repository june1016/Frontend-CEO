// src/components/preOperation/personnel/OrganizationalStructureView.jsx
import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Alert,
  AlertTitle,
  Button,
  Typography,
  Divider,
  CircularProgress,
  useTheme
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import RoleCard from "./common/roleCard";
import { usePersonnel } from "../../../hooks/preOperation/personnel/usePersonnel";
import { formatCurrency } from "../../../utils/formatters/currencyFormatters";

const OrganizationalStructureView = () => {
  const theme = useTheme();
  const {
    loading,
    baseRoles,
    optionalRoles,
    contractedRoles,
    allRequiredHired,
    handleContract,
    fetchRoles,
    saveStructure,
    calculateTotalPayroll
  } = usePersonnel();

  useEffect(() => {
    fetchRoles();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress size={50} />
        <Typography variant="body1" sx={{ mt: 2 }}>Cargando estructura operacional...</Typography>
      </Box>
    );
  }

  const renderRoleSection = (title, icon, rolesArray) => (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        {React.cloneElement(icon, { fontSize: 'medium' })}
        <Typography variant="h6" fontWeight={600} ml={1}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {rolesArray.map(([roleId, role]) => {
          const isGerente = role.name.toLowerCase().includes("gerente");
          const isOperario = role.name.toLowerCase().includes("operario");
          const isVendedor = role.name.toLowerCase().includes("vendedor");
          
          const contractedCount = isGerente 
            ? 1 
            : isOperario 
              ? contractedRoles.operarios 
              : isVendedor 
                ? contractedRoles.vendedores 
                : contractedRoles.apoyo[role.name] || 0;

          return (
            <Grid item xs={12} md={6} key={roleId}>
              <RoleCard
                role={role}
                contractedCount={contractedCount}
                onContract={handleContract}
                isGerente={isGerente}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ mt: 3 }}>
      {allRequiredHired ? (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 4,
            '& .MuiAlert-icon': {
              fontSize: 22
            }
          }}
        >
          <AlertTitle>¡Personal Mínimo Requerido Contratado!</AlertTitle>
          Has completado los requisitos mínimos de personal. Puedes continuar con la operación o contratar personal adicional para mejorar la eficiencia.
        </Alert>
      ) : (
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 4,
            '& .MuiAlert-icon': {
              fontSize: 22
            }
          }}
        >
          <AlertTitle>Requisitos de Personal</AlertTitle>
          Para iniciar operaciones, necesitas contratar al menos 3 operarios y 1 vendedor.
        </Alert>
      )}

      {renderRoleSection("Personal Base", <GroupsIcon color="primary" />, baseRoles)}
      {renderRoleSection("Personal de Apoyo", <VolunteerActivismIcon color="secondary" />, optionalRoles)}

      <Box
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          backgroundColor: theme.palette.grey[50],
          p: 3,
          borderRadius: 2,
          border: `1px solid ${theme.palette.grey[200]}`
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Resumen de Nómina
          </Typography>
          <Typography 
            variant="h5" 
            fontWeight={600} 
            color="primary.main"
          >
            {formatCurrency(calculateTotalPayroll())}
            <Typography 
              component="span" 
              variant="body2" 
              color="text.secondary" 
              sx={{ ml: 1 }}
            >
              /mes
            </Typography>
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveStructure}
          disabled={loading}
          sx={{ 
            height: "fit-content", 
            px: 3,
            py: 1.2
          }}
        >
          Guardar Estructura
        </Button>
      </Box>

      <Alert 
        severity="info" 
        icon={<InfoIcon fontSize="inherit" />}
        sx={{ mt: 4 }}
      >
        <AlertTitle>Consideraciones de Nómina</AlertTitle>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>El personal no contratado requerirá atención manual.</li>
          <li>Los costos de nómina afectan el flujo de caja mensual.</li>
          <li>Los vendedores generan comisiones adicionales del 1% sobre las ventas.</li>
          <li>El personal de apoyo mejora la eficiencia operativa.</li>
        </ul>
      </Alert>
    </Box>
  );
};

export default OrganizationalStructureView;