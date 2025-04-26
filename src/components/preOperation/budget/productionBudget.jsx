import React, { useState, useMemo } from "react";
import { 
  Box, 
  Alert, 
  AlertTitle, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  TextField, 
  InputAdornment, 
  Slider, 
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Badge,
  Chip
} from "@mui/material";
import {
  Inventory as InventoryIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  Save as SaveIcon,
  Check as CheckIcon,
  DoneAll as DoneAllIcon
} from "@mui/icons-material";
import Swal from "sweetalert2";

// Componentes
import MonthSelector from "./common/monthSelector";
import BudgetResultsTable from "./common/budgetResultsTable";

// Utils
import { formatNumber } from "../../../utils/formatters/numberFormatters";
import { calculateTotals } from "../../../utils/budget/budgetCalculations";
import { showAlert } from "../../../utils/alerts/alertHelpers";
import axiosInstance from "../../../services/api/axiosConfig";
import { updateProgress } from "../../dashboard/monthProgress";

/**
 * Componente para el presupuesto de producción
 * @param {Object} props Propiedades del componente
 * @param {Object} props.budgetConfig Configuración del presupuesto
 * @param {Object} props.theme Tema de Material UI
 * @returns {JSX.Element} Componente renderizado
 */
const ProductionBudget = ({ budgetConfig, theme,  budgetType, onSuccess }) => {
  // Estado para el mes seleccionado
  const [selectedMonth, setSelectedMonth] = useState(1);
  
  // Estado para las políticas de inventario por mes (inicialmente 10% para todos)
  const [inventoryPolicies, setInventoryPolicies] = useState(() => {
    const initialPolicies = {};
    for (let i = 1; i <= 12; i++) {
      initialPolicies[i] = 10;
    }
    return initialPolicies;
  });
  
  // Estado para rastrear qué meses han sido configurados
  const [configuredMonths, setConfiguredMonths] = useState(() => {
    // Inicialmente ningún mes está marcado como configurado
    const initialConfigured = {};
    for (let i = 1; i <= 12; i++) {
      initialConfigured[i] = false;
    }
    return initialConfigured;
  });
  
  // Estado para el diálogo de confirmación
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  
  // Productos y sus inventarios iniciales
  const products = [
    { id: "alfaros", name: "Alfaros", initialInventory: 320 },
    { id: "betacos", name: "Betacos", initialInventory: 250 },
    { id: "gamaroles", name: "Gamaroles", initialInventory: 180 },
  ];
  
  // Datos de ventas (valores ficticios para el mes 1 según requerimientos)
  const salesData = {
    1: {
      alfaros: 2650,
      betacos: 1920,
      gamaroles: 1060,
    }
  };
  
  // Obtener valor proyectado de ventas para un mes y producto
  const getSalesForecast = (month, productId) => {
    // Para el mes 1, usar valores fijos
    if (month === 1) {
      return salesData[1][productId] || 0;
    }
    
    // Para los meses 2-12, calcular basado en el crecimiento acumulativo
    let baseValue = salesData[1][productId] || 0;
    let cumulativeGrowth = 100; // Comenzar con 100% (sin crecimiento)
    
    // Sumar los porcentajes de crecimiento de los meses anteriores
    for (let i = 1; i < month; i++) {
      cumulativeGrowth += Number(budgetConfig.growthRates[i]) || 0;
    }
    
    // Aplicar el crecimiento acumulado
    return Math.round((baseValue * cumulativeGrowth) / 100);
  };
  
  // Calcular valores de producción para un producto
  const calculateProductionValues = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return {};
    
    const salesForecast = getSalesForecast(selectedMonth, productId);
    // Usar la política específica del mes seleccionado
    const finalInventory = Math.round(salesForecast * (inventoryPolicies[selectedMonth] / 100));
    const productionNeeded = salesForecast + finalInventory - product.initialInventory;
    
    return {
      productId,
      salesForecast,
      initialInventory: product.initialInventory,
      finalInventory,
      productionNeeded: Math.max(0, productionNeeded) // No puede ser negativo
    };
  };
  
  // Calcular la distribución por décadas para un producto
  const calculateDecadeValues = (productId) => {
    const { productionNeeded } = calculateProductionValues(productId);
    const distribution = budgetConfig.decadeDistribution[selectedMonth - 1];
    
    return {
      d1: Math.round((productionNeeded * distribution.d1) / 100),
      d2: Math.round((productionNeeded * distribution.d2) / 100),
      d3: Math.round((productionNeeded * distribution.d3) / 100),
      total: productionNeeded
    };
  };
  
  // Calcular totales para la tabla de resultados
  const productionTotals = useMemo(() => {
    return calculateTotals(
      products,
      (_, productId) => calculateDecadeValues(productId),
      selectedMonth
    );
  }, [selectedMonth, inventoryPolicies, budgetConfig.decadeDistribution]);
  
  // Manejar cambio en política de inventario (slider)
  const handleSliderChange = (_, newValue) => {
    setInventoryPolicies(prev => ({
      ...prev,
      [selectedMonth]: newValue
    }));
  };
  
  // Manejar cambio en política de inventario (input)
  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    // Limitar el valor entre 0 y 30
    if (newValue >= 0 && newValue <= 30) {
      setInventoryPolicies(prev => ({
        ...prev,
        [selectedMonth]: newValue
      }));
    }
  };
  
  // Marcar el mes actual como configurado
  const markMonthAsConfigured = () => {
    setConfiguredMonths(prev => ({
      ...prev,
      [selectedMonth]: true
    }));
  };
  
  // Verificar si todos los meses están configurados
  const areAllMonthsConfigured = () => {
    return Object.values(configuredMonths).every(status => status === true);
  };
  
  // Abrir diálogo de confirmación para guardar la política del mes actual
  const handleSaveMonthPolicy = () => {
    markMonthAsConfigured();
  
    Swal.fire({
      title: 'Política Guardada',
      text: `Se ha configurado la política de inventario para el Mes ${selectedMonth} al ${inventoryPolicies[selectedMonth]}%.`,
      icon: 'success',
      confirmButtonColor: theme.palette.primary.main,
    });
  
    if (selectedMonth < 12) {
      setSelectedMonth(selectedMonth + 1);
    }
  };
  
  // Abrir diálogo de confirmación para guardar todo el presupuesto
  const handleSaveFullBudget = () => {
    if (!areAllMonthsConfigured()) {
      // Encontrar qué meses faltan por configurar
      const unconfiguredMonths = Object.entries(configuredMonths)
        .filter(([_, status]) => status === false)
        .map(([month]) => month)
        .join(', ');
      
      showAlert(
        "Configuración Incompleta",
        `Debes configurar la política de inventario para todos los meses. Faltan los meses: ${unconfiguredMonths}.`,
        "warning",
        theme.palette.primary.main
      );
      return;
    }
    
    setOpenConfirmDialog(true);
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const userId = userData.id;

  const sendInventoryPolicies = async (policies, created_by) => {
    try {
      const payload = {
        created_by,
        policies
      };
  
      const response = await axiosInstance.post("/inventorypolice/createinventorypolice", payload);
  
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message;
  
      showAlert(
        "Política de inventario",
        JSON.stringify(message, null, 2),
        "error",
        "#1C4384"
      );
      console.error(
        "Error al registrar política de inventario:",
        error.response?.data || error.message
      );
    }
  };
  
  // Confirmar guardado
  const confirmSave = async () => {

    const response = await sendInventoryPolicies(inventoryPolicies, userId);
  
    if (response?.ok) {
      updateProgress(4); 
      showAlert(
        "¡Guardado Exitoso!",
        "El presupuesto de producción ha sido guardado correctamente.",
        "success",
        theme.palette.primary.main
      );

      setOpenConfirmDialog(false);
      
      if (onSuccess) onSuccess();
    }
  };

  // Verificar si el mes actual ha sido configurado
  const isCurrentMonthConfigured = configuredMonths[selectedMonth];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Selector de Mes */}
      <MonthSelector
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        theme={theme}
        configuredMonths={configuredMonths}
      />
      
      {/* Mensaje Informativo */}
      <Alert
        severity="info"
        icon={<InfoIcon />}
        sx={{
          bgcolor: "#EBF5FF",
          color: theme.palette.primary.main,
          border: "1px solid rgba(28, 67, 132, 0.2)",
          "& .MuiAlert-icon": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <AlertTitle sx={{ fontWeight: "bold" }}>
          Presupuesto de Producción - Mes {selectedMonth}
        </AlertTitle>
        {isCurrentMonthConfigured ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DoneAllIcon color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body2">
              Este mes ya tiene una política de inventario configurada al {inventoryPolicies[selectedMonth]}%. 
              Puedes modificarla y guardar nuevamente.
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2">
            Define la política de inventario para este mes y luego presiona "Guardar Política del Mes". 
            Debes configurar todos los meses antes de guardar el presupuesto completo.
          </Typography>
        )}
      </Alert>
      
      {/* Panel de Política de Inventario */}
      <Card sx={{ boxShadow: 1, border: "1px solid #E5E7EB" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InventoryIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.dark}>
                Política de Inventario Final - Mes {selectedMonth}
              </Typography>
            </Box>
            {isCurrentMonthConfigured && (
              <Chip 
                label="Configurado" 
                color="success" 
                size="small"
                icon={<CheckIcon />}
              />
            )}
          </Box>
          
          <Box sx={{ px: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Define qué porcentaje de las ventas proyectadas deseas mantener como inventario final.
              Este valor se aplicará para calcular las unidades a producir de cada producto.
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={inventoryPolicies[selectedMonth]}
                  onChange={handleSliderChange}
                  aria-labelledby="inventory-policy-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={30}
                  sx={{
                    color: theme.palette.primary.main,
                    '& .MuiSlider-thumb': {
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}20`,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={inventoryPolicies[selectedMonth]}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  sx={{ width: '80px' }}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleSaveMonthPolicy}
                startIcon={<CheckIcon />}
                sx={{
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                }}
              >
                Guardar Política del Mes {selectedMonth}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      {/* Tarjetas de Productos */}
      <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.dark}>
        Cálculo de Unidades a Producir
      </Typography>
      
      <Grid container spacing={3}>
        {products.map((product) => {
          const values = calculateProductionValues(product.id);
          
          return (
            <Grid item xs={12} md={4} key={product.id}>
              <Card sx={{ boxShadow: 1, border: "1px solid #E5E7EB", height: '100%' }}>
                <CardContent sx={{ bgcolor: "#EBF5FF", py: 1.5 }}>
                  <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.dark}>
                    {product.name}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Ventas Proyectadas
                      </Typography>
                      <Typography variant="h6" fontWeight="medium">
                        {formatNumber(values.salesForecast)} unidades
                      </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Inventario Inicial
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatNumber(values.initialInventory)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Inventario Final ({inventoryPolicies[selectedMonth]}%)
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatNumber(values.finalInventory)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: theme.palette.primary.main,
                      borderRadius: 1,
                      mt: 1
                    }}>
                      <Typography variant="caption" color="white" sx={{ opacity: 0.9 }}>
                        Unidades a Producir
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" color="white">
                        {formatNumber(values.productionNeeded)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Tabla de Resultados */}
      <BudgetResultsTable
        products={products}
        calculateValues={(_, productId) => calculateDecadeValues(productId)}
        selectedMonth={selectedMonth}
        theme={theme}
        totals={productionTotals}
        title={budgetType?.title}
        columnTitle="Producto"
        itemTitle="name"
      />
      
      {/* Botón de Guardado */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveFullBudget}
          sx={{
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Guardar Presupuesto de Producción
        </Button>
      </Box>
      
      {/* Diálogo de Confirmación */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CheckIcon /> Confirmar Guardado
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText>
            ¿Estás seguro de que deseas guardar el presupuesto de producción completo? 
            Has configurado las políticas de inventario para los 12 meses.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenConfirmDialog(false)}
            variant="outlined"
            color="inherit"
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmSave}
            variant="contained"
            color="primary"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductionBudget;