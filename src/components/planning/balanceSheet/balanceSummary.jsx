// src/components/planning/balanceSheet/BalanceSummary.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { formatCurrency } from '../../../utils/shared/formatters/currencyFormatters';

const BalanceSummary = ({ balance }) => {
  const theme = useTheme();
  const isBalanced = Math.abs(balance) < 0.01;
  
  return (
    <Card
      sx={{
        mt: 4,
        boxShadow: 3,
        borderRadius: 1,
        bgcolor: isBalanced
          ? theme.palette.success.main
          : theme.palette.error.main,
        color: 'white',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          p: 3,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Balance Total
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            {isBalanced
              ? 'El balance está cuadrado correctamente'
              : 'El balance no está cuadrado'}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          {formatCurrency(Math.abs(balance))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BalanceSummary;