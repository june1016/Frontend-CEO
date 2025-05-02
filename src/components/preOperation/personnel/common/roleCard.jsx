// src/components/preOperation/personnel/common/RoleCard.jsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { formatCurrency } from '../../../../utils/formatters/currencyFormatters';

const RoleCard = ({ 
  role, 
  contractedCount, 
  onContract, 
  isGerente 
}) => {
  const theme = useTheme();
  const { name, improvements, optional, salary } = role;
  
  const isOperario = name.toLowerCase().includes("operario");
  const isVendedor = name.toLowerCase().includes("vendedor");
  const yaContratado = isGerente || contractedCount > 0;
  
  const maxReached = 
    (isOperario && contractedCount >= 20) ||
    (isVendedor && contractedCount >= 10) ||
    (!isOperario && !isVendedor && !isGerente && contractedCount >= 1);

  return (
    <Card
      sx={{
        backgroundColor: yaContratado 
        ? `${theme.palette.primary.light}1A`  // 0.1 de opacidad (hex 1A)
        : `${theme.palette.grey[100]}B3`,     // 0.7 de opacidad (hex B3)
        border: `1px solid ${yaContratado ? theme.palette.primary.light : theme.palette.grey[300]}`,
        minHeight: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        boxShadow: yaContratado ? 2 : 0,
        '&:hover': {
          boxShadow: 3,
          backgroundColor: yaContratado 
            ? `${theme.palette.primary.light}26`  // 0.15 de opacidad (hex 26)
            : `${theme.palette.grey[100]}E6`      // 0.9 de opacidad (hex E6)
        }
      }}
    >
      <CardHeader
        avatar={<EngineeringIcon color="primary" />}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {name} {contractedCount > 0 && `(${contractedCount})`}
            </Typography>
            <Chip
              label={optional ? "Opcional" : "Obligatorio"}
              color={optional ? "default" : "error"}
              size="small"
              sx={{ ml: 1, height: 22, fontSize: '0.7rem' }}
            />
          </Box>
        }
        subheader={yaContratado ? "Asignado" : ""}
        sx={{
          '& .MuiCardHeader-subheader': {
            color: yaContratado ? theme.palette.primary.main : theme.palette.text.secondary
          }
        }}
      />
      
      <Divider />
      
      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Salario Base:
          </Typography>
          <Typography variant="body1" color="primary.main" fontWeight={600}>
            {formatCurrency(salary)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2, mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
            Mejoras y beneficios:
          </Typography>
          {improvements.map((imp) => (
            <Box key={imp.id} sx={{ pl: 1, borderLeft: `2px solid ${theme.palette.grey[300]}`, mb: 1.5 }}>
              <Typography variant="body2" fontWeight={500} gutterBottom>
                {imp.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {imp.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>

      {!isGerente && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            pt: 0,
            mt: 'auto'
          }}
        >
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Contratados: {contractedCount}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => onContract(name, -1)}
              disabled={contractedCount === 0}
              sx={{ 
                minWidth: 30, 
                mx: 0.5,
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}1A`
                }
              }}
            >
              -
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => onContract(name, 1)}
              disabled={maxReached}
              sx={{ 
                minWidth: 30, 
                mx: 0.5,
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}1A`
                }
              }}
            >
              +
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default RoleCard;