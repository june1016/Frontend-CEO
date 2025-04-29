import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { getSimulatedTime } from "../../utils/timeManagement/operationTime.js";
import {
  resetOperation,
  updateProgress,
  startOperation
} from "../../utils/timeManagement/operationTime.js";

const MonthProgress = () => {
  const theme = useTheme();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [simulatedTime, setSimulatedTime] = useState(null);
  const [progressData, setProgressData] = useState({
    completedTabs: 0,
    totalTabs: 5,
    isSetupComplete: false,
    operationStarted: false
  });

  useEffect(() => {
    const updateData = () => {
      const operationStatus = !!localStorage.getItem("operationStatus");
      const progress = JSON.parse(localStorage.getItem('month_progress')) || {
        completedTabs: 0,
        totalTabs: 5,
        isSetupComplete: false,
        operationStarted: false
      };
      
      setProgressData({
        ...progress,
        operationStarted: operationStatus || progress.operationStarted
      });
    };

    window.addEventListener('operationUpdated', updateData);
    window.addEventListener('progressUpdated', updateData);
    
    updateData();
    
    return () => {
      window.removeEventListener('operationUpdated', updateData);
      window.removeEventListener('progressUpdated', updateData);
    };
  }, []);

  useEffect(() => {
    const calculateSetupProgress = () => {
      return progressData.totalTabs > 0 
        ? (progressData.completedTabs / progressData.totalTabs) * 100 
        : 0;
    };

    const calculateOperationProgress = (time) => {
      if (!time) return 0;
      const decadeProgress = (time.currentDecade - 1) * 33.33;
      if (time.isDecember && time.currentDecade === 3) return 100;
      return Math.min(decadeProgress, 100);
    };

    const update = () => {
      const time = getSimulatedTime();
      setSimulatedTime(time);
      
      const progress = progressData.operationStarted
        ? calculateOperationProgress(time)
        : calculateSetupProgress();
      
      setCurrentProgress(progress);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [progressData]);

  const getProgressColor = () => {
    if (currentProgress >= 100) return theme.palette.success.main;
    return progressData.operationStarted 
      ? theme.palette.primary.main
      : theme.palette.primary.main;
  };

  const getProgressText = () => {
    if (progressData.operationStarted) {
      return simulatedTime
        ? `Mes ${simulatedTime.currentMonth} (Década ${simulatedTime.currentDecade})`
        : "Operación en progreso";
    }
    return progressData.isSetupComplete
      ? "Configuración completada!"
      : `Mes 0 - Configuración  (${progressData.completedTabs}/${progressData.totalTabs} pasos)`;
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={currentProgress}
          thickness={5}
          size={50}
          sx={{
            color: getProgressColor(),
            backgroundColor: "transparent",
          }}  
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {currentProgress >= 100 ? (
            <CheckCircleOutline sx={{ color: "success.main", fontSize: 22 }} />
          ) : (
            <Typography variant="caption" component="div" fontWeight={600}>
              {`${Math.round(currentProgress)}%`}
            </Typography>
          )}
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {getProgressText()}
      </Typography>
    </Box>
  );
};

export { updateProgress, startOperation, resetOperation };
export default MonthProgress;