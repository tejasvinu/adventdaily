import { ProgressionRule, WorkoutData, Intensity } from '@/types/workout';

export const progressionService = {
  calculateProgression: (
    baseWorkout: WorkoutData,
    weekNumber: number,
    rule: ProgressionRule
  ): WorkoutData => {
    // Skip progression on deload weeks
    if (rule.deloadWeeks.includes(weekNumber)) {
      return {
        ...baseWorkout,
        intensity: 'Light',
        sets: Math.floor(baseWorkout.sets! * 0.6),
        duration: baseWorkout.duration 
          ? `${Math.floor(parseInt(baseWorkout.duration) * 0.7)} min`
          : undefined
      };
    }

    // Calculate progressive overload
    const progressionFactor = 1 + (weekNumber * rule.weeklyIncrease);
    const newVolume = Math.min(
      Math.floor(rule.baseVolume * progressionFactor),
      rule.maxVolume
    );

    return {
      ...baseWorkout,
      sets: baseWorkout.sets ? Math.floor(baseWorkout.sets * progressionFactor) : undefined,
      duration: baseWorkout.duration 
        ? `${Math.floor(parseInt(baseWorkout.duration) * progressionFactor)} min`
        : undefined,
      intensity: calculateNewIntensity(baseWorkout.intensity, weekNumber)
    };
  },

  generateWeeklyVolume: (
    baseVolume: number,
    weekNumber: number,
    userLevel: string
  ): number => {
    const progressionRates = {
      beginner: 0.05,
      intermediate: 0.075,
      advanced: 0.1
    };
    
    const rate = progressionRates[userLevel as keyof typeof progressionRates];
    return Math.floor(baseVolume * (1 + (weekNumber - 1) * rate));
  }
};

function calculateNewIntensity(
  currentIntensity: Intensity | undefined,
  weekNumber: number
): Intensity {
  if (!currentIntensity) return 'Moderate';
  
  const intensityLevels: Intensity[] = [
    'Very Low',
    'Low',
    'Light',
    'Moderate',
    'Moderate-High',
    'High',
    'Very High'
  ];

  const currentIndex = intensityLevels.indexOf(currentIntensity);
  if (currentIndex === -1) return 'Moderate';

  // Progress intensity every 2 weeks
  const progressionSteps = Math.floor((weekNumber - 1) / 2);
  const newIndex = Math.min(
    currentIndex + progressionSteps,
    intensityLevels.length - 1
  );

  return intensityLevels[newIndex];
}
