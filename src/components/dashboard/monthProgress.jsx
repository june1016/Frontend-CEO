import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import {
  OPERATION_STATUS_KEY,
  PROGRESS_MONTH_KEY,
  upsertProgressInBackend,
} from "../../utils/shared/operationTime.js";
import { getSimulatedTime } from "../../utils/shared/operationTime.js";

const MonthProgress = () => {
  const theme = useTheme();
  const [currentProgress, setCurrentProgress] = useState(0);

  const [progressData, setProgressData] = useState({
    currentMonth: 1,
    currentDecade: 1,
    isDecember: false,
    elapsedMinutes: 0,
  });

  const [operationStatus, setOperationStatus] = useState({
    completedTabs: 0,
    totalTabs: 5,
    isSetupComplete: false,
    operationStarted: false,
  });

  const [previousDecade, setPreviousDecade] = useState(null);
  const [previousMonth, setPreviousMonth] = useState(null);

  useEffect(() => {
    const rawStatus = localStorage.getItem("operationStatus");
    if (!rawStatus) return;

    const status = JSON.parse(rawStatus);

    if (status.operationStarted) return;

    const { completedTabs, totalTabs } = status;
    const progressPercent = Math.round((completedTabs / totalTabs) * 100);

    setCurrentProgress(progressPercent);
  }, [operationStatus]);

  useEffect(() => {
    const initializeSimulatedTime = async () => {
      const simulated = await getSimulatedTime();

      if (simulated) {
        const updatedProgress = {
          currentMonth: simulated.currentMonth,
          currentDecade: simulated.currentDecade,
          isDecember: simulated.isDecember,
          elapsedMinutes: simulated.elapsedMinutes,
        };

        setProgressData(updatedProgress);

        const status = {
          completedTabs: 5,
          totalTabs: 5,
          isSetupComplete: true,
          operationStarted: true,
        };

        setOperationStatus(status);
        localStorage.setItem(OPERATION_STATUS_KEY, JSON.stringify(status));
      }
    };

    initializeSimulatedTime();
  }, []);

  useEffect(() => {
    const updateData = () => {
      const status = JSON.parse(localStorage.getItem(OPERATION_STATUS_KEY)) || {
        completedTabs: 0,
        totalTabs: 5,
        isSetupComplete: false,
        operationStarted: false,
      };
      const progress = JSON.parse(localStorage.getItem(PROGRESS_MONTH_KEY)) || {
        currentMonth: 1,
        currentDecade: 1,
        isDecember: false,
        elapsedMinutes: 0,
      };

      setOperationStatus(status);
      setProgressData(progress);
    };

    window.addEventListener("operationUpdated", updateData);
    window.addEventListener("progressUpdated", updateData);

    updateData();

    return () => {
      window.removeEventListener("operationUpdated", updateData);
      window.removeEventListener("progressUpdated", updateData);
    };
  }, []);

  useEffect(() => {
    const setupStatus = JSON.parse(localStorage.getItem("operationStatus"));

    if (setupStatus?.isSetupComplete &&
      (progressData.currentMonth !== previousMonth || progressData.currentDecade !== previousDecade)) {
      upsertProgressInBackend({
        currentMonth: progressData.currentMonth,
        currentDecade: progressData.currentDecade,
        isDecember: progressData.isDecember,
      });
    }
  }, [progressData.currentMonth, progressData.currentDecade]);


  useEffect(() => {
    const calculateSetupProgress = () => {
      return operationStatus.totalTabs > 0
        ? (operationStatus.completedTabs / operationStatus.totalTabs) * 100
        : 0;
    };

    const calculateOperationProgress = (monthData) => {
      const { currentDecade, isDecember } = monthData;
      if (isDecember && currentDecade === 3) return 100;
      const decadeProgress = (currentDecade - 1) * 33.33;
      return Math.min(decadeProgress, 100);
    };

    const update = () => {
      const progress = operationStatus.operationStarted
        ? calculateOperationProgress(progressData)
        : calculateSetupProgress();

      setCurrentProgress(progress);
    };

    if (
      progressData.currentDecade !== previousDecade ||
      progressData.currentMonth !== previousMonth
    ) {
      update();
      setPreviousDecade(progressData.currentDecade);
      setPreviousMonth(progressData.currentMonth);
    }

    const interval = setInterval(() => {
      const newStoredTime =
        JSON.parse(localStorage.getItem(PROGRESS_MONTH_KEY)) || {
          currentMonth: 1,
          currentDecade: 1,
          isDecember: false,
          elapsedMinutes: 0,
        };

      setProgressData(newStoredTime);

      if (
        newStoredTime.currentDecade !== previousDecade ||
        newStoredTime.currentMonth !== previousMonth
      ) {
        update();
        setPreviousDecade(newStoredTime.currentDecade);
        setPreviousMonth(newStoredTime.currentMonth);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [operationStatus, progressData, previousDecade, previousMonth]);

  const getProgressColor = () => {
    if (currentProgress >= 100) return theme.palette.success.main;
    return operationStatus.operationStarted
      ? theme.palette.primary.main
      : theme.palette.primary.main;
  };

  const getProgressText = () => {
    if (operationStatus.operationStarted) {
      return `Mes ${progressData.currentMonth}/12 - Década ${progressData.currentDecade}/3`;
    }

    return operationStatus.isSetupComplete
      ? "¡Configuración completada!"
      : `Mes 0 - Configuración (${operationStatus.completedTabs}/${operationStatus.totalTabs} pasos)`;
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
          {!operationStatus.operationStarted && (
            currentProgress >= 100 ? (
              <CheckCircleOutline sx={{ color: "success.main", fontSize: 22 }} />
            ) : (
              <Typography variant="caption" component="div" fontWeight={600}>
                {`${Math.round(currentProgress)}%`}
              </Typography>
            )
          )}
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {getProgressText()}
      </Typography>
    </Box>
  );
};

export default MonthProgress;
