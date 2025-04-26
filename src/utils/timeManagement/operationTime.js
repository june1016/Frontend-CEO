const STORAGE_KEY = 'operationStatus';
const PROGRESS_KEY = 'month_progress';

const SIMULATION_CONFIG = {
  totalRealMinutes: 120,
  totalSimulatedMonths: 12,
  decadesPerMonth: 3,
};

export const startOperation = () => {
  const now = new Date();
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    startTime: now.toISOString()
  }));
  
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
    completedTabs: 0,
    totalTabs: 5,
    isSetupComplete: false,
    operationStarted: false
  };
  
  const newProgress = {
    ...progress,
    operationStarted: true,
    isSetupComplete: true
  };
  
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
  
  window.dispatchEvent(new CustomEvent('operationUpdated'));
  window.dispatchEvent(new CustomEvent('progressUpdated'));
  
  return newProgress;
};

export const resetOperation = () => {
  localStorage.removeItem(STORAGE_KEY);

  const initialProgress = {
    completedTabs: 0,
    totalTabs: 5,
    isSetupComplete: false,
    operationStarted: false
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(initialProgress));
  
  window.dispatchEvent(new CustomEvent('operationUpdated'));
  window.dispatchEvent(new CustomEvent('progressUpdated'));
  
  return initialProgress;
};

export const updateProgress = (completedTabs) => {
  const currentProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {
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

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));

  window.dispatchEvent(new CustomEvent('progressUpdated', {
    detail: newProgress
  }));

  return newProgress;
};

export const getSimulatedTime = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const { startTime } = JSON.parse(stored);
  const now = new Date();
  const start = new Date(startTime);
  const elapsedMs = now.getTime() - start.getTime();

  const elapsedMinutes = elapsedMs / 60000;
  const simulatedMonths = (elapsedMinutes / SIMULATION_CONFIG.totalRealMinutes) * SIMULATION_CONFIG.totalSimulatedMonths;

  const currentMonth = Math.min(Math.floor(simulatedMonths) + 1, 12);
  const fractionalMonth = simulatedMonths % 1;
  const currentDecade = fractionalMonth < 1 / 3 ? 1 : fractionalMonth < 2 / 3 ? 2 : 3;

  return {
    currentMonth,
    currentDecade,
    isDecember: currentMonth === 12,
    elapsedMinutes,
  };
};