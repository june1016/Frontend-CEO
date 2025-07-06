import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Box,
  Typography,
  useTheme,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsightsIcon from "@mui/icons-material/Insights";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import MarketSummary from "../price/MarketSummary";
import ProductAnalysis from "../price/ProductAnalysis";
import KeyConsiderations from "../price/KeyConsiderations";

const MarketStudyModal = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: 2, boxShadow: theme.shadows[10] } }}
    >
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: "#fff", borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box display="flex" alignItems="center" gap={1}>
          <InsightsIcon />
          <Typography variant="h6" fontWeight={600}>Estudio de Mercado</Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 3, px: 4 }}>
        <MarketSummary />
        <Divider sx={{ my: 2 }} />
        <ProductAnalysis />
        <Divider sx={{ my: 2 }} />
        <KeyConsiderations />
      </DialogContent>

      <DialogActions sx={{
        px: 4, py: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        justifyContent: "flex-end",
      }}>
        <Button variant="contained" onClick={onClose}>
          Cerrar Estudio
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarketStudyModal;
