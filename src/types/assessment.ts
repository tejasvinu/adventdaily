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
}

export interface AssessmentDocument extends Omit<AssessmentFormData, 'personalInfo'> {
  personalInfo: {
    age: number;  // Stored as number in DB
    gender: string;
    location: string;
  };
}

export type FormStepProps = {
  formData: AssessmentFormData;
  updateFormData: (newData: Partial<AssessmentFormData>) => void;
};
