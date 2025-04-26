import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  alpha
} from '@mui/material';
import { PlayArrowOutlined, Warning } from '@mui/icons-material';
import OperationStartAnimation from '../animations/OperationStartAnimation';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

const StartOperationModal = ({ onConfirm }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isOperationStarted, setIsOperationStarted] = useState(
    !!localStorage.getItem("operationStatus")
  );

  const handleOpen = () => {
    if (!isOperationStarted) {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleConfirm = async () => {
    try {
      setShowAnimation(true);
      await onConfirm();
      setIsOperationStarted(true);
      handleClose();
    } catch (error) {
      console.error("Error al iniciar operación:", error);
      setShowAnimation(false);
    }
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <>
      {showAnimation && <OperationStartAnimation onComplete={handleAnimationComplete} />}

      <Button
        variant="contained"
        startIcon={<PlayArrowOutlined />}
        onClick={handleOpen}
        disabled={isOperationStarted}
        sx={{
          bgcolor: isOperationStarted ? "#f5f5f5" : "#1C4384",
          color: isOperationStarted ? "#9e9e9e" : "#ffffff",
          "&:hover": {
            bgcolor: isOperationStarted ? "#f5f5f5" : "#153265",
          },
          fontSize: "0.95rem",
          px: 3,
          py: 1,
          borderRadius: 1.5,
          '&.Mui-disabled': {
            color: '#9e9e9e',
            backgroundColor: '#f5f5f5'
          }
        }}
      >
        {isOperationStarted ? "Operación Iniciada" : "Iniciar Operaciones"}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: theme.shadows[10]
          }
        }}
      >
        <DialogTitle sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white
        }}>
          <Box display="flex" alignItems="center" gap={1}>
            <PlayArrowOutlined />
            <Typography variant="h6" fontWeight={600}>
              Iniciar Operaciones Empresariales
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ py: 3, px: 4 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
          <OutlinedFlagIcon sx={{ m: 2 }} />
            Transición al Mes 1 – Configuración Completada
          </Typography>

          <Alert
            severity="warning"
            icon={<Warning fontSize="inherit" />}
            sx={{ mb: 3, borderLeft: `4px solid ${theme.palette.warning.main}` }}
          >
            <Typography variant="body2" fontWeight={500}>
              Atención: Una vez iniciadas las operaciones, no podrá volver al Mes 0 ni modificar la configuración inicial.
            </Typography>
          </Alert>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Resumen de Configuración
          </Typography>

          <Box display="flex" gap={4} sx={{ mb: 3 }}>
            <Box flex={1}>
              <Typography variant="caption" color="text.secondary" display="block">
                Configuración Financiera
              </Typography>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary="✓ Estados Financieros Iniciales" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary="✓ Indicadores Base Establecidos" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary="✓ Presupuestos Anuales Definidos" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              </List>
            </Box>

            <Box flex={1}>
              <Typography variant="caption" color="text.secondary" display="block">
                Configuración Operativa
              </Typography>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary="✓ Estructura de Personal Definida" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary="✓ Maquinaria Inicial Configurada" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemText primary="✓ Proveedor Seleccionado" primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              </List>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Funcionamiento del Tiempo
          </Typography>

          <List dense>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary="1. Estructura Temporal"
                secondary="El año fiscal se divide en 12 meses, cada mes tiene 3 décadas operativas."
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary="2. Avance Automático"
                secondary="Cada década avanza automáticamente cada ~15 días reales. No hay pausas."
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary="3. Decisiones y Eventos"
                secondary="Las decisiones deben tomarse dentro de cada década. Los eventos requieren respuesta en 24 horas."
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions sx={{
          px: 4,
          py: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between'
        }}>
          <Button
            onClick={handleClose}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.secondary, 0.08)
              }
            }}
          >
            Volver a Revisar
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              bgcolor: theme.palette.primary.main,
              px: 4,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              }
            }}
          >
            Confirmar inicio de Operaciones
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StartOperationModal;