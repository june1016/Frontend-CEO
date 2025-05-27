import axiosInstance from "../../services/api/axiosConfig";

export const OPERATION_STATUS_KEY = 'operationStatus';
export const PROGRESS_MONTH_KEY = 'monthProgress';

export const getUserId = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  return userData?.id;
};

export const startOperation = async () => {
  try {
    const userId = getUserId();

    if (!userId) {
      throw new Error('El usuario no está autenticado.');
    }

    const response = await axiosInstance.post('/progress/operation-progress/start', {
      user_id: userId
    });

    if (!response.data.ok) {
      throw new Error(response.data.message || 'Error al iniciar la operación.');
    }

    const { 
      month_id: currentMonth, 
      current_decade: currentDecade, 
      is_december: isDecember
    } = response.data.progress;

    const operationStatus = {
      completedTabs: 0,
      totalTabs: 5,
      isSetupComplete: true,
      operationStarted: true
    };
    localStorage.setItem(OPERATION_STATUS_KEY, JSON.stringify(operationStatus));

    // Guardar el progreso del mes simulado en localStorage (separado)
    const progressMonth = {
      currentMonth,
      currentDecade,
      isDecember,
      elapsedMinutes: 0
    };
    localStorage.setItem(PROGRESS_MONTH_KEY, JSON.stringify(progressMonth));

    // Disparar eventos de actualización
    window.dispatchEvent(new CustomEvent('operationUpdated'));
    window.dispatchEvent(new CustomEvent('progressUpdated'));

    return { operationStatus, progressMonth };
  } catch (error) {
    console.error('Error al iniciar la operación:', error);
    return null;
  }
};

export const resetOperation = () => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('El usuario no está autenticado.');
    }

    // Limpiar la información de la operación y progreso en localStorage
    localStorage.removeItem(OPERATION_STATUS_KEY); // Eliminar la operación
    const allProgress = JSON.parse(localStorage.getItem(PROGRESS_MONTH_KEY)) || {};
    delete allProgress[userId]; // Eliminar el progreso del usuario
    localStorage.setItem(PROGRESS_MONTH_KEY, JSON.stringify(allProgress));

    // Disparar eventos de restablecimiento
    window.dispatchEvent(new CustomEvent('operationReset'));
    window.dispatchEvent(new CustomEvent('progressReset'));

    return true;
  } catch (error) {
    console.error('Error al restablecer la operación:', error);
    return false;
  }
};

export const updateProgress = (completedTabs) => {
  const currentProgress = JSON.parse(localStorage.getItem(OPERATION_STATUS_KEY)) || {
    completedTabs: 0,
    totalTabs: 5,
    isSetupComplete: false,
    operationStarted: false
  };


  const validatedTabs = Math.min(completedTabs, currentProgress.totalTabs);
  
  const newProgress = {
    ...currentProgress,
    completedTabs: validatedTabs,
    isSetupComplete: validatedTabs >= currentProgress.totalTabs
  };

  localStorage.setItem(OPERATION_STATUS_KEY, JSON.stringify(newProgress));

  window.dispatchEvent(new CustomEvent('progressUpdated', {
    detail: newProgress
  }));

  return newProgress;
};

const updateProgressInStorage = (newProgress) => {
  localStorage.setItem(PROGRESS_MONTH_KEY, JSON.stringify(newProgress));
};

export const updateOperationProgress = (updatedProgress) => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('El usuario no está autenticado.');
    }

    const allProgress = JSON.parse(localStorage.getItem(PROGRESS_MONTH_KEY)) || {};
    const currentProgress = allProgress[userId] || {};

    const newProgress = {
      ...currentProgress,
      ...updatedProgress,
    };

    allProgress[userId] = newProgress;

    localStorage.setItem(PROGRESS_MONTH_KEY, JSON.stringify(allProgress));

    // Disparar el evento de actualización
    window.dispatchEvent(new CustomEvent('progressUpdated'));

    return newProgress;
  } catch (error) {
    console.error('Error al actualizar el progreso de la operación:', error);
    return null;
  }
};

export const getOperationStatus = () => {
  try {
    const storedOperationStatus = JSON.parse(localStorage.getItem(PROGRESS_MONTH_KEY)) || {};

    const userId = getUserId();
    if (!userId || !storedOperationStatus[userId]) {
      console.error('No se ha encontrado el estado de la operación del usuario.');
      return null;
    }

    return storedOperationStatus[userId];
  } catch (error) {
    console.error('Error al obtener el estado de la operación:', error);
    return null;
  }
};

export const getSimulatedTime = async () => {
  try {
    const userId = getUserId();
    if (!userId) {
      console.error('No se ha encontrado el ID de usuario.');
      return null;
    }

    const response = await axiosInstance.get(`progress/operation-progress/time/${userId}`);

    if (!response.data.ok) {
      return null;
    }

    const {
      currentMonth,
      currentDecade,
      isDecember,
      elapsedMinutes,
      startedAt,
    } = response.data.data;

    const storedProgress = {
      currentMonth,
      currentDecade,
      isDecember,
      startTime: startedAt,
      elapsedMinutes,
    };

    updateProgressInStorage(storedProgress);

    return {
      currentMonth,
      currentDecade,
      isDecember,
      elapsedMinutes,
    };

  } catch (error) {
    console.error('Error al obtener tiempo simulado desde backend:', error);
    return null;
  }
};

export const upsertProgressInBackend = async ({
  currentMonth,
  currentDecade,
  isDecember,
}) => {
  try {
    await axiosInstance.post("progress/operation-progress/upsert", {
      user_id: getUserId(),
      month_id: currentMonth,
      current_decade: currentDecade,
      is_december: isDecember,
    });
  } catch (error) {
    console.error("Error actualizando el progreso:", error);
  }
};