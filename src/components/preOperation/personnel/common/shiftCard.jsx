// src/components/preOperation/personnel/common/ShiftCard.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ShiftCard = ({ 
  shift, 
  isSelected, 
  onToggle,
  formatTimeRange 
}) => {
  const theme = useTheme();
  
  return (
    <Box
      flex={1}
      minWidth={160}
      borderRadius={2}
      p={2}
      sx={{
        border: isSelected
          ? `2px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.grey[300]}`,
          backgroundColor: isSelected 
          ? `${theme.palette.primary.main}14` // 0.08 opacidad (hex 14)
          : theme.palette.background.paper,
        transition: 'all 0.2s ease',
        boxShadow: isSelected
          ? `0px 0px 10px ${theme.palette.primary.main}3F` // 0.25 opacidad (hex 3F)
          : 'none',
        '&:hover': {
          boxShadow: `0px 2px 8px ${theme.palette.grey[500]}33`,  // 0.2 opacidad (hex 33)
        }
      }}
    >
      <Typography variant="subtitle2" fontWeight={600} color={isSelected ? 'primary.main' : 'text.primary'}>
        {shift.shift_name}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 2, color: 'text.secondary' }}>
        <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="caption">
          {formatTimeRange(shift.start_time, shift.end_time)}
        </Typography>
      </Box>
      
      <Button
        fullWidth
        size="small"
        variant={isSelected ? "contained" : "outlined"}
        color="primary"
        onClick={onToggle}
        sx={{ 
          mt: 'auto', 
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: isSelected ? 1 : 0
        }}
      >
        {isSelected ? "Quitar" : "Asignar"}
      </Button>
    </Box>
  );
};

export default ShiftCard;