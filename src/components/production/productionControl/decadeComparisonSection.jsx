// src/components/production/common/decadeComparisonSection.jsx
import React from 'react';
import { 
  Card, CardHeader, CardContent, Typography, Box, Grid, useTheme,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  Paper
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatNumber } from '../../../utils/shared/formatters/numberFormatters';

const DecadeComparisonSection = ({ decadeAnalysis, totals, chartData }) => {
  const theme = useTheme();

  // Obtener estilo basado en variación
  const getVariationStyle = (variation) => {
    const numVariation = parseFloat(variation);
    
    if (numVariation > 0) {
      return {
        icon: <TrendingUpIcon fontSize="small" />,
        color: theme.palette.success.main,
        bgColor: theme.palette.success.light
      };
    } else if (numVariation < 0) {
      return {
        icon: <TrendingDownIcon fontSize="small" />,
        color: theme.palette.error.main,
        bgColor: theme.palette.error.light
      };
    } else {
      return {
        icon: <CheckIcon fontSize="small" />,
        color: theme.palette.info.main,
        bgColor: theme.palette.info.light
      };
    }
  };

  // Obtener estado basado en variación
  const getStatusStyle = (status) => {
    if (status === 'warning') {
      return {
        icon: <WarningIcon fontSize="small" />,
        text: 'Requiere Atención',
        color: theme.palette.warning.main,
        bgColor: theme.palette.warning.light
      };
    } else {
      return {
        icon: <CheckIcon fontSize="small" />,
        text: 'En Meta',
        color: theme.palette.success.main,
        bgColor: theme.palette.success.light
      };
    }
  };

  return (
    <>
      {/* Tarjetas resumen por década */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {decadeAnalysis.map((decade, index) => {
          const variationStyle = getVariationStyle(decade.variation);

          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {decade.decade}
                    </Typography>
                    <Chip
                      icon={variationStyle.icon}
                      label={`${decade.variation}%`}
                      size="small"
                      sx={{ 
                        bgcolor: variationStyle.bgColor,
                        color: variationStyle.color,
                        '& .MuiChip-icon': {
                          color: variationStyle.color
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                    {formatNumber(decade.actual)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Meta: {formatNumber(decade.budget)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        {/* Total */}
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            variant="outlined" 
            sx={{ 
              height: '100%', 
              bgcolor: theme.palette.primary.light,
              color: 'white' 
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Total
                </Typography>
                <Chip
                  icon={getVariationStyle(totals.variation).icon}
                  label={`${totals.variation}%`}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '& .MuiChip-icon': {
                      color: 'white'
                    }
                  }}
                />
              </Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 1, color: 'white' }}>
                {formatNumber(totals.actual)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5, color: 'rgba(255, 255, 255, 0.8)' }}>
                Meta: {formatNumber(totals.budget)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráfico de comparativa */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardHeader 
          title={
            <Typography variant="h6">Análisis de Producción por Década</Typography>
          } 
          sx={{ 
            bgcolor: theme.palette.grey[50],
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        />
        <CardContent>
          <Box sx={{ height: 400, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Presupuesto" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Real" 
                  stroke={theme.palette.success.main} 
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Tabla detallada */}
      <Card variant="outlined">
        <CardHeader 
          title={
            <Typography variant="h6">Detalle por Década</Typography>
          } 
          sx={{ 
            bgcolor: theme.palette.grey[50],
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        />
        <CardContent>
          <TableContainer component={Paper} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Década</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Presupuesto</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Real</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Variación</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {decadeAnalysis.map((decade, index) => {
                  const variationStyle = getVariationStyle(decade.variation);
                  const statusStyle = getStatusStyle(decade.status);

                  return (
                    <TableRow key={index} hover>
                      <TableCell component="th" scope="row">
                        {decade.decade}
                      </TableCell>
                      <TableCell align="center">{formatNumber(decade.budget)}</TableCell>
                      <TableCell align="center">{formatNumber(decade.actual)}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                          {variationStyle.icon}
                          <Typography 
                            sx={{ 
                              color: variationStyle.color,
                              fontWeight: 500
                            }}
                          >
                            {decade.variation}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={statusStyle.icon}
                          label={statusStyle.text}
                          size="small"
                          sx={{ 
                            bgcolor: statusStyle.bgColor,
                            color: statusStyle.color,
                            '& .MuiChip-icon': {
                              color: statusStyle.color
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {/* Fila de total */}
                <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
                  <TableCell 
                    component="th" 
                    scope="row" 
                    sx={{ fontWeight: 'bold' }}
                  >
                    Total
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    {formatNumber(totals.budget)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    {formatNumber(totals.actual)}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      {getVariationStyle(totals.variation).icon}
                      <Typography 
                        sx={{ 
                          color: getVariationStyle(totals.variation).color,
                          fontWeight: 'bold'
                        }}
                      >
                        {totals.variation}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={getStatusStyle(totals.status).icon}
                      label={getStatusStyle(totals.status).text}
                      size="small"
                      sx={{ 
                        bgcolor: getStatusStyle(totals.status).bgColor,
                        color: getStatusStyle(totals.status).color,
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: getStatusStyle(totals.status).color
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default DecadeComparisonSection;