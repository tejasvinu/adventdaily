import { WorkoutProgress } from '@/types/workout';

// Helper to check if we're on the client side
const isClient = typeof window !== 'undefined';

// This would normally interact with your backend
// For now, we'll use localStorage for demo purposes
export const progressService = {
  saveProgress: (progress: WorkoutProgress) => {
    if (!isClient) return null;
    const key = `workout-progress-${progress.workoutId}-${progress.date}`;
    localStorage.setItem(key, JSON.stringify(progress));
    return progress;
  },

  getProgress: (workoutId: string, date: string) => {
    if (!isClient) return null;
    const key = `workout-progress-${workoutId}-${date}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as WorkoutProgress : null;
  },

  getAllProgress: () => {
    if (!isClient) return [];
    const progress: WorkoutProgress[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('workout-progress-')) {
        const value = localStorage.getItem(key);
        if (value) {
          progress.push(JSON.parse(value));
        }
      }
    }
    return progress;
  },

  initializeProgress: (workoutId: string, date: string) => {
    if (!isClient) return null;
    const key = `workout-progress-${workoutId}-${date}`;
    if (!localStorage.getItem(key)) {
      const initialProgress: WorkoutProgress = {
        workoutId,
        date,
        completed: false,
        perceivedEffort: 3,
        feelingScore: 3,
      };
      localStorage.setItem(key, JSON.stringify(initialProgress));
      return initialProgress;
    }
    return null;
  },

  getOrInitProgress: (workoutId: string, date: string) => {
    if (!isClient) return null;
    const existing = progressService.getProgress(workoutId, date);
    if (!existing) {
      return progressService.initializeProgress(workoutId, date);
    }
    return existing;
  }
};
