// src/components/production/common/productSelector.jsx
import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const ProductSelector = ({ selectedProduct, onProductChange, selectedMonth, onMonthChange }) => {
  const handleProductChange = (event, newProduct) => {
    if (newProduct !== null) {
      onProductChange(newProduct);
    }
  };

  const handleMonthChange = (event) => {
    onMonthChange(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <ToggleButtonGroup
        value={selectedProduct}
        exclusive
        onChange={handleProductChange}
        aria-label="selección de producto"
        size="medium"
        sx={{
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
          },
          '& .Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
              color: 'white',
            }
          }
        }}
      >
        <ToggleButton value="alfaros">Alfaros</ToggleButton>
        <ToggleButton value="betacos">Betacos</ToggleButton>
        <ToggleButton value="gamaroles">Gamaroles</ToggleButton>
      </ToggleButtonGroup>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="month-select-label">Mes</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          value={selectedMonth}
          label="Mes"
          onChange={handleMonthChange}
          size="medium"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              Mes {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductSelector;