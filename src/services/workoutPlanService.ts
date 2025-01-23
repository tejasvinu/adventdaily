import { generateAssessmentReview } from '@/utils/ai';
import { TrainingPlan, WorkoutData } from '@/types/workout';
import { workoutTemplate } from '@/data/workoutTemplate';
import { AssessmentDocument } from '@/types/assessment';

const generateWorkoutPlan = async (assessment: AssessmentDocument): Promise<TrainingPlan> => {
  // Get AI-generated review and recommendations
  const aiReview = await generateAssessmentReview(assessment);

  // Generate dates for 8 weeks
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + ((1 + 7 - startDate.getDay()) % 7)); // Start next Monday
  
  const trainingDates: string[] = [];
  for (let i = 0; i < 56; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    trainingDates.push(date.toISOString().split('T')[0]);
  }

  // Map assessment data to workout parameters
  const userLevel = determineUserLevel(assessment);
  const weeklyCapacity = parseInt(assessment.training.weeklyHours);
  const availableDays = assessment.training.availableDays;
  const hasPoolAccess = assessment.training.hasPoolAccess;
  const hasGymAccess = assessment.training.hasGymAccess;

  // Generate base training plan
  const plan: TrainingPlan = {
    id: `plan-${assessment.userId}-${Date.now()}`,
    name: '8-Week Personalized Plan',
    duration: 8,
    weeks: []
  };

  let dateIndex = 0;

  // Generate each week's workouts
  for (let weekNumber = 1; weekNumber <= 8; weekNumber++) {
    const weekPlan = await generateWeekPlan(
      weekNumber,
      trainingDates,
      dateIndex,
      {
        assessment,
        userLevel,
        weeklyCapacity,
        availableDays,
        hasPoolAccess,
        hasGymAccess,
        aiReview
      }
    );

    plan.weeks.push(weekPlan);
    dateIndex += weekPlan.workouts.length;
  }

  return plan;
};

const determineUserLevel = (assessment: AssessmentDocument): 'beginner' | 'intermediate' | 'advanced' => {
  const hasCompeted = assessment.experience.hasCompeted;
  const raceCount = assessment.experience.raceCount;
  
  if (!hasCompeted) return 'beginner';
  if (parseInt(raceCount) > 5) return 'advanced';
  return 'intermediate';
};

const generateWeekPlan = async (
  weekNumber: number,
  dates: string[],
  startIndex: number,
  params: {
    assessment: AssessmentDocument;
    userLevel: string;
    weeklyCapacity: number;
    availableDays: string[];
    hasPoolAccess: boolean;
    hasGymAccess: boolean;
    aiReview: string;
  }
) => {
  // Use AI to generate an appropriate theme and goals based on week number and assessment
  const weekTheme = `Week ${weekNumber} Focus`;
  const weeklyWorkouts: { [key: string]: WorkoutData } = {};

  // Get available workout templates based on facilities and level
  const templates = filterWorkoutTemplates(params);

  // Generate workouts for available days
  params.availableDays.forEach((day, index) => {
    const dateIndex = startIndex + index;
    if (dateIndex < dates.length) {
      const workout = generateWorkoutForDay(
        day,
        weekNumber,
        params.userLevel,
        templates
      );
      weeklyWorkouts[dates[dateIndex]] = workout;
    }
  });

  return {
    weekNumber,
    theme: weekTheme,
    goals: generateWeeklyGoals(weekNumber, params),
    workouts: weeklyWorkouts
  };
};

const filterWorkoutTemplates = (params: any) => {
  const templates = { ...workoutTemplate.workoutTemplates };
  if (!params.hasPoolAccess) delete templates.swim;
  if (!params.hasGymAccess) {
    // Modify strength templates to use bodyweight exercises
  }
  return templates;
};

const generateWorkoutForDay = (
  day: string,
  weekNumber: number,
  userLevel: string,
  templates: any
): WorkoutData => {
  // Implementation would use the template structure to generate appropriate workouts
  // This is a placeholder that would need to be expanded
  return {
    type: '🏃‍♂️ Run',
    description: 'Generated workout for ' + day,
    category: 'Cardio',
    duration: '30 min',
    intensity: 'Moderate',
    notes: 'AI-generated based on user level and week number'
  };
};

const generateWeeklyGoals = (weekNumber: number, params: any): string[] => {
  // Implementation would generate appropriate goals based on week number and user parameters
  return [
    'Establish baseline intensity',
    'Focus on proper form',
    'Build endurance'
  ];
};

export const workoutPlanService = {
  generateWorkoutPlan,
  determineUserLevel,
  generateWeekPlan
};
