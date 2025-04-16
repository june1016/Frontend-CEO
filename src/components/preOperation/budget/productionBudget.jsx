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
  Divider 
} from "@mui/material";
import {
  Inventory as InventoryIcon,
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon
} from "@mui/icons-material";

// Componentes
import MonthSelector from "./common/monthSelector";
import BudgetResultsTable from "./common/budgetResultsTable";

// Utils
import { formatNumber } from "../../../utils/formatters/numberFormatters";
import { calculateTotals } from "../../../utils/budget/budgetCalculations";

/**
 * Componente para el presupuesto de producción
 * @param {Object} props Propiedades del componente
 * @param {Object} props.budgetConfig Configuración del presupuesto
 * @param {Object} props.theme Tema de Material UI
 * @returns {JSX.Element} Componente renderizado
 */
const ProductionBudget = ({ budgetConfig, theme }) => {
  // Estado para el mes seleccionado
  const [selectedMonth, setSelectedMonth] = useState(1);
  
  // Estado para la política de inventario
  const [inventoryPolicy, setInventoryPolicy] = useState(10); // 10% por defecto
  
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
    const finalInventory = Math.round(salesForecast * (inventoryPolicy / 100));
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
  }, [selectedMonth, inventoryPolicy, budgetConfig.decadeDistribution]);
  
  // Manejar cambio en política de inventario (slider)
  const handleSliderChange = (_, newValue) => {
    setInventoryPolicy(newValue);
  };
  
  // Manejar cambio en política de inventario (input)
  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    // Limitar el valor entre 0 y 30
    if (newValue >= 0 && newValue <= 30) {
      setInventoryPolicy(newValue);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Selector de Mes */}
      <MonthSelector
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        theme={theme}
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
          Presupuesto de Producción
        </AlertTitle>
        El presupuesto de producción determina las unidades a fabricar según las ventas proyectadas, 
        manteniendo una política de inventario final y considerando el inventario inicial disponible.
      </Alert>
      
      {/* Panel de Política de Inventario */}
      <Card sx={{ boxShadow: 1, border: "1px solid #E5E7EB" }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <InventoryIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.dark}>
              Política de Inventario Final
            </Typography>
          </Box>
          
          <Box sx={{ px: 2 }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Define qué porcentaje de las ventas proyectadas deseas mantener como inventario final.
              Este valor se aplicará para calcular las unidades a producir de cada producto.
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={inventoryPolicy}
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
                  value={inventoryPolicy}
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
                          Inventario Final ({inventoryPolicy}%)
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
        title="Distribución de Producción por Década"
        columnTitle="Producto"
        itemTitle="name"
      />
    </Box>
  );
};

export default ProductionBudget;