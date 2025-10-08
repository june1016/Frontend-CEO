// src/components/planning/balanceSheet/FinancialTable.jsx
import React from 'react';
import {
  Card,
  CardHeader,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Box,
  Typography,
  InputAdornment,
  useTheme
} from '@mui/material';
import { formatCurrency } from '../../../utils/shared/formatters/currencyFormatters';

const FinancialTable = ({ 
  title, 
  icon, 
  values, 
  onChange, 
  section, 
  total, 
  totalLabel, 
  totalColor,
  bgColor
}) => {
  const theme = useTheme();
  
  // Determinar la descripción de ayuda para ciertos campos específicos
  const getHelperText = (account) => {
    if (account === 'Obligaciones laborales') {
      return 'Incluya el valor de un mes de nómina y cargas sociales (aprox. 19.000.000 COP)';
    } else if (account === 'Impuestos por pagar') {
      return 'Incluya la provisión mensual de impuestos (aprox. 2.500.000 COP)';
    }
    return '';
  };

  return (
    <Card sx={{ boxShadow: 1, borderRadius: 1 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon}
            <Typography variant="subtitle1" fontWeight="bold">
              {title}
            </Typography>
          </Box>
        }
        sx={{
          bgcolor: bgColor || theme.palette.primary.main,
          color: 'white',
          p: 1.5,
        }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F3F4F6' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Cuenta</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(values).map(([account, amount], index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ fontWeight: 'medium' }}>{account}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={amount}
                    onChange={(e) => onChange(section, account, e.target.value)}
                    placeholder="0.00"
                    helperText={getHelperText(account)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography sx={{ color: 'text.secondary' }}>$</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                bgcolor: '#EBF5FF',
                '& td': { fontWeight: 'bold' },
              }}
            >
              <TableCell sx={{ color: theme.palette.primary.dark }}>
                {totalLabel}
              </TableCell>
              <TableCell sx={{ color: totalColor || theme.palette.success.main }}>
                {formatCurrency(total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default FinancialTable;