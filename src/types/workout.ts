export type Intensity = 'High' | 'Moderate' | 'Low';

export interface WorkoutData {
  type: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Recovery';
  duration?: string;
  sets?: number;
  reps?: number;
  intensity?: Intensity;
  notes: string;
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

export interface WorkoutProgress {
  id: string;
  workoutId: string;
  date: string;
  completed: boolean;
  actualDuration?: string;
  actualSets?: string;
  actualReps?: string;
  perceivedEffort: 1 | 2 | 3 | 4 | 5;
  feelingScore: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface WorkoutWithProgress extends WorkoutData {
  progress?: WorkoutProgress;
}

export interface WorkoutTemplate {
  warmup: string;
  mainSet: string;
  cooldown: string;
  progression?: {
    volumeIncrease: string;
    intensityIncrease: string;
    recoveryWeeks: number[];
  };
}

export interface ProgressionRule {
  baseVolume: number;
  weeklyIncrease: number;
  maxVolume: number;
  deloadWeeks: number[];
}

export interface WorkoutParameters {
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  fitnessScore: number;
  weeklyCapacity: number;
  availableDays: string[];
  hasPoolAccess: boolean;
  hasGymAccess: boolean;
  injuries: string[];
  goals: string[];
}

export interface WeekPlan {
  weekNumber: number;
  theme: string;
  workouts: {
    [date: string]: WorkoutData;
  };
}

export interface WorkoutPlan {
  weeks: WeekPlan[];
  duration: number;
}
