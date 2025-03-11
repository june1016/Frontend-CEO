import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: 100,
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  "& .MuiLinearProgress-bar": {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const monthProgress = () => {
  // Simulamos el mes actual (0-11)
  const currentMonth = 0;
  const totalMonths = 12;
  const progress = ((currentMonth + 1) / totalMonths) * 100;

  return (
    <ProgressContainer>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        Mes {currentMonth + 1}
      </Typography>
      <StyledLinearProgress variant="determinate" value={progress} />
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        {progress.toFixed(0)}%
      </Typography>
    </ProgressContainer>
  );
};

export default monthProgress;
