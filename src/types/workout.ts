export type Intensity = 
  | 'Very Low' 
  | 'Low' 
  | 'Light'
  | 'Moderate' 
  | 'Moderate-High'
  | 'High' 
  | 'Very High';

export interface WorkoutData {
  type: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Recovery';
  duration?: string;
  sets?: number;
  reps?: number | string;  // Modified to accept both number and string
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

// Consolidate template interfaces
export interface WorkoutTemplateStructure {
  warmup: string;
  mainSet: string;
  cooldown: string;
}

export type WorkoutTemplate = WorkoutTemplateStructure & {
  progression?: {
    volumeIncrease: string;
    intensityIncrease: string;
    recoveryWeeks: number[];
  };
}

// Change WorkoutTemplateMap back to WorkoutTemplates
export interface WorkoutTemplates {
  swim: {
    [key in SwimSubCategory]: WorkoutTemplateStructure;
  };
  bike: {
    [key in BikeSubCategory]: WorkoutTemplateStructure;
  };
  run: {
    [key in RunSubCategory]: WorkoutTemplateStructure;
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

export type WorkoutCategory = 'swim' | 'bike' | 'run';
export type WorkoutSubCategory = 'technique' | 'endurance' | 'speed';

export type SwimSubCategory = 'technique' | 'endurance' | 'speed';
export type BikeSubCategory = 'base' | 'intervals';
export type RunSubCategory = 'easy' | 'tempo';  // Updated to match actual template structure
