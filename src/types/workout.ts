export interface WorkoutData {
  type: string;
  description: string;
  intensity?: string;
  duration?: string;
  sets?: number;
  reps?: string;
  category: 'Strength' | 'Cardio' | 'Recovery';
  notes?: string;
}

export interface WeeklyPlan {
  weekNumber: number;
  theme: string;
  goals: string[];
  workouts: {
    [key: string]: WorkoutData;
  };
}

export interface TrainingPlan {
  id: string;
  name: string;
  duration: number;
  weeks: WeeklyPlan[];
}
