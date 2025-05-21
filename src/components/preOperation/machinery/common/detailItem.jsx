// src/components/preOperation/machinery/common/DetailItem.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const DetailItem = ({ label, value }) => (
  <Box sx={{ 
    display: "flex", 
    justifyContent: "space-between", 
    p: 1.5,
    borderBottom: '1px solid #f0f0f0',
    '&:last-child': {
      borderBottom: 'none'
    }
  }}>
    <Typography variant="body2" fontWeight={500} color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight="bold" color="text.primary">
      {value}
    </Typography>
  </Box>
);

export default DetailItem;