import { AssessmentFormData } from '@/types/assessment';

interface SwimData {
  comfortLevel: string;
  maxDistance: string;
  technique: string;
  timeFor400m: string;
}

interface BikeData {
  frequency: string;
  maxDistance: string;
  averageSpeed: string;
  timeFor20k: string;
}

interface RunData {
  frequency: string;
  maxDistance: string;
  averagePace: string;
  timeFor5k: string;
}

export const validateAssessment = (data: AssessmentFormData): string | null => {
  // Ensure all required objects exist
  if (!data.personalInfo || !data.experience || !data.currentFitness || !data.medical || !data.training) {
    return 'Missing required assessment sections';
  }

  // Validate personal info
  if (!data.personalInfo.age || !data.personalInfo.gender) {
    return 'Missing required personal information';
  }

  // Validate experience
  if (data.experience.primaryGoal === '' || !data.experience.targetRaceDate) {
    return 'Missing required experience information';
  }

  // Validate current fitness
  const requiredFields: Record<string, string[]> = {
    swim: ['comfortLevel', 'maxDistance', 'technique'],
    bike: ['frequency', 'maxDistance', 'averageSpeed'],
    run: ['frequency', 'maxDistance', 'averagePace']
  };

  for (const [discipline, fields] of Object.entries(requiredFields)) {
    const disciplineData = data.currentFitness[discipline as keyof typeof data.currentFitness];
    
    for (const field of fields) {
      if (!(disciplineData as any)[field]) {
        return `Missing required ${discipline} ${field} information`;
      }
    }

    // Validate time formats if provided
    const timeFields: Record<string, string> = {
      swim: 'timeFor400m',
      bike: 'timeFor20k',
      run: 'timeFor5k'
    };

    const timeField = timeFields[discipline];
    const timeValue = (disciplineData as any)[timeField];
    
    if (timeValue && !/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(timeValue)) {
      return `Invalid time format for ${discipline} ${timeField}`;
    }
  }

  // Validate training
  if (!data.training.weeklyHours || data.training.availableDays.length === 0) {
    return 'Missing required training information';
  }

  return null;
};
