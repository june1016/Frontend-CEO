// src/components/preOperation/personnel/common/MachineGroup.jsx
import React from 'react';
import {
  Card,
  Typography,
  Box,
  Divider,
  useTheme,
} from '@mui/material';
import ShiftCard from './shiftCard';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const MachineGroup = ({
  machine,
  assignedCount,
  isSelected,
  toggleSelection,
  formatTimeRange
}) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        mb: 2,
        overflow: 'visible',
        border: `1px solid ${theme.palette.primary.main}33`,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: `1px solid ${theme.palette.primary.main}1A`,
          backgroundColor: `${theme.palette.grey[100]}80`,
        }}
      >
        <PrecisionManufacturingIcon 
          sx={{ 
            mr: 1.5, 
            color: theme.palette.primary.main,
            fontSize: 22
          }} 
        />
        <Typography 
          variant="subtitle1" 
          fontWeight={600}
          color="text.primary"
        >
          {machine.machine_name}
        </Typography>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: { xs: 'wrap', sm: 'nowrap' } 
          }}
        >
          {machine.shifts.map((shift) => (
            <ShiftCard
              key={shift.shift_id}
              shift={shift}
              isSelected={isSelected(machine.machine_id, shift.shift_id)}
              onToggle={() => toggleSelection(machine.machine_id, shift.shift_id)}
              formatTimeRange={formatTimeRange}
            />
          ))}
        </Box>
        
        <Divider sx={{ mt: 2, mb: 1.5 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: assignedCount === 3 
                ? theme.palette.success.main 
                : assignedCount > 0 
                  ? theme.palette.warning.main 
                  : theme.palette.error.main,
              fontWeight: 500
            }}
          >
            Turnos asignados: {assignedCount}/3
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default MachineGroup;