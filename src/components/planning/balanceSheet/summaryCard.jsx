// src/components/planning/balanceSheet/SummaryCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  useTheme
} from '@mui/material';
import { formatCurrency } from '../../../utils/formatters/currencyFormatters';

const SummaryCard = ({ title, value, icon, bgColor }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        bgcolor: bgColor || theme.palette.primary.main,
        color: 'white',
        boxShadow: 2,
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            mr: 2,
            width: 48,
            height: 48,
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatCurrency(value)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;