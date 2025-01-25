import { Document } from 'mongoose';

export interface AssessmentFormData {
  personalInfo: {
    age: string;  // Keep as string for form handling
    gender: string;
    location: string;
  };
  experience: {
    hasCompeted: boolean;
    completedDistances: string[];
    raceCount: string;  // Changed from number to string for form handling
    recentRaceTimes: string[];
    previousChallenges: string[];
    primaryGoal: string;
    targetRaceDate: string;
  };
  currentFitness: {
    swim: {
      comfortLevel: string;
      maxDistance: string;
      technique: string;
      timeFor400m: string;
    };
    bike: {
      frequency: string;
      maxDistance: string;
      averageSpeed: string;
      timeFor20k: string;
    };
    run: {
      frequency: string;
      maxDistance: string;
      averagePace: string;
      timeFor5k: string;
    };
  };
  medical: {
    hasInjuries: boolean;
    injuries: string;
    medications: string[];
    allergies: string[];
    hasActivityRestrictions: boolean;
    activityRestrictions: string;
  };
  training: {
    weeklyHours: string;
    availableDays: string[];
    preferredTime: string;
    hasPoolAccess: boolean;
    hasGymAccess: boolean;
    trainingPreference: string;
    additionalNotes: string;
  };
  physicalMetrics: {
    height: string;
    weight: string;
    bodyFat: string;
    restingHeartRate: string;
    maxHeartRate: string;
  };
  nutrition: {
    dailyCalories: string;
    dietaryRestrictions: string[];
    mealFrequency: string;
    hydrationHabits: string;
  };
  wellbeing: {
    averageSleepHours: string;
    sleepQuality: string;
    stressLevel: string;
    energyLevel: string;
  };
  facilities: {
    hasOpenWaterAccess: boolean;
    openWaterDetails: string;
    hasBikeTrainer: boolean;
    hasTreadmill: boolean;
    weatherConstraints: string;
  };
  recovery: {
    warmupRoutine: string;
    cooldownRoutine: string;
    mobilityWork: string[];
    therapyFrequency: string;
  };
  metrics: {
    usesWearableDevice: boolean;
    deviceType: string;
    trackedMetrics: string[];
    preferredRPEScale: string;
  };
  goals: {
    targetFinishTime: string;
    secondaryGoals: string[];
    paceGoals: {
      swim: string;
      bike: string;
      run: string;
    };
  };
  social: {
    needsGroupTraining: boolean;
    hasTrainingPartner: boolean;
    partnerFitnessLevel: string;
    onlineCommunities: string[];
  };
}

// Base interface without userId
export interface BaseAssessment extends Omit<AssessmentFormData, 'personalInfo' | 'physicalMetrics'> {
  personalInfo: {
    age: number;
    gender: string;
    location: string;
  };
  physicalMetrics: {
    height: number;
    weight: number;
    bodyFat: number;
    restingHeartRate: number;
    maxHeartRate: number;
  };
  review: string;
}

// Frontend/API version with string userId
export interface AssessmentDocument extends BaseAssessment {
  userId: string;
}

// Database version with ObjectId userId
export interface IAssessment extends Document, BaseAssessment {
  userId: Document['_id'];
  createdAt: Date;
  updatedAt: Date;
}

export type FormStepProps = {
  formData: AssessmentFormData;
  updateFormData: (newData: Partial<AssessmentFormData>) => void;
};

export interface UserMetrics {
  age: number;
  weight: number;
  height: number;
  gender: string;
  restingHeartRate: number;
  maxHeartRate?: number;
}

export interface FitnessLevel {
  swim: {
    canSwim: boolean;
    level: 'beginner' | 'intermediate' | 'advanced';
    preferredStyle: string;
    maxDistance: number;
    pace?: string;
  };
  bike: {
    hasBike: boolean;
    type: string;
    weeklyDistance: number;
    avgSpeed?: number;
    ftp?: number;
  };
  run: {
    experience: string;
    weeklyDistance: number;
    preferredTerrain: string;
    recent5kTime?: string;
  };
  strength: {
    experience: string;
    currentRoutine?: string;
    limitations?: string[];
  };
}

export interface TrainingPreferences {
  weeklyAvailability: number;
  preferredDays: string[];
  timePerSession: number;
  indoorOptions: boolean;
  specificGoals: string[];
  targetEvent?: {
    type: string;
    date: string;
    distance: string;
  };
}

export interface MedicalHistory {
  injuries: string[];
  conditions: string[];
  medications: string[];
  limitations: string[];
}

export interface UserAssessment {
  userId: string;
  metrics: UserMetrics;
  fitnessLevel: FitnessLevel;
  preferences: TrainingPreferences;
  medicalHistory: MedicalHistory;
  lastUpdated: string;
}
