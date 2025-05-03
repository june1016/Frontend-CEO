// src/components/preOperation/machinery/common/SpecificationSection.jsx
import React from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import DetailItem from './DetailItem';

const SpecificationSection = ({ title, items, icon }) => {
  const theme = useTheme();
  
  return (
    <Box mb={4}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        p: 1.5,
        borderRadius: 1,
        mb: 2
      }}>
        {icon && (
          <Box sx={{ mr: 1, color: '#ffffff' }}>
            {icon}
          </Box>
        )}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="#ffffff"
        >
          {title}
        </Typography>
      </Box>
      <Box 
        sx={{ 
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          overflow: 'hidden'
        }}
      >
        <Stack spacing={0}>
          {items.map((item, index) => (
            <DetailItem 
              key={index} 
              label={item.label} 
              value={item.value} 
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SpecificationSection;