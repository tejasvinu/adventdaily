import { generateAssessmentReview } from '@/utils/ai';
import { 
  TrainingPlan, 
  WorkoutData, 
  WorkoutTemplates,  
  WorkoutTemplateStructure,
  SwimSubCategory,
  BikeSubCategory,
  RunSubCategory,
  Intensity
} from '@/types/workout';
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
    dateIndex += weekPlan.daysAssigned;
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
  const weekTheme = getWeekTheme(weekNumber, params.aiReview);
  const weeklyWorkouts: { [key: string]: WorkoutData } = {};

  // Get available workout templates based on facilities and level
  const availableTemplates = filterWorkoutTemplates(params);

  // Track number of workouts created
  let daysAssigned = 0;

  // Generate workouts for available days
  params.availableDays.forEach((day, index) => {
    const dateIndex = startIndex + index;
    if (dateIndex < dates.length) {
      const workout = generateWorkoutForDay(
        day,
        weekNumber,
        params.userLevel,
        availableTemplates,
        params.weeklyCapacity / params.availableDays.length
      );
      weeklyWorkouts[dates[dateIndex]] = workout;
      daysAssigned++;
    }
  });

  return {
    weekNumber,
    theme: weekTheme,
    goals: generateWeeklyGoals(weekNumber, params),
    workouts: weeklyWorkouts,
    daysAssigned  // Return this for the parent function to use
  };
};

const filterWorkoutTemplates = (params: {
  hasPoolAccess: boolean;
  hasGymAccess: boolean;
}): Partial<WorkoutTemplates> => {
  const templates = {} as Partial<WorkoutTemplates>;
  
  // Only include swim if pool access is available
  if (params.hasPoolAccess) {
    templates.swim = workoutTemplate.workoutTemplates.swim;
  }
  
  // Always include run
  templates.run = workoutTemplate.workoutTemplates.run;
  
  // Include bike if gym access (assuming gym has bikes)
  if (params.hasGymAccess) {
    templates.bike = workoutTemplate.workoutTemplates.bike;
  }
  
  return templates;
};

const getWeekTheme = (weekNumber: number, aiReview: string): string => {
  // Implementation needed
  return `Week ${weekNumber} Focus: ${aiReview.slice(0, 50)}...`;
};

function generateWorkoutForDay(
  day: string,
  weekNumber: number,
  userLevel: string,
  templates: Partial<WorkoutTemplates>,
  targetDuration: number
): WorkoutData {
  const workoutTypes = Object.keys(templates);
  const selectedType = workoutTypes[weekNumber % workoutTypes.length];

  return {
    type: selectedType,
    description: `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} workout for ${day}`,
    category: 'Cardio',
    duration: `${Math.floor(targetDuration)} min`,
    intensity: determineIntensity(weekNumber, userLevel) as Intensity,
    notes: `Week ${weekNumber} ${userLevel}-level workout`
  };
}

function determineIntensity(weekNumber: number, userLevel: string): Intensity {
  // Use weekNumber to progressively increase intensity
  const baseIntensity: Intensity = userLevel === 'beginner' ? 'Low' :
                                 userLevel === 'intermediate' ? 'Moderate' : 'High';
  return baseIntensity;
}

const generateWeeklyGoals = (weekNumber: number, params: { userLevel: string, aiReview: string }): string[] => {
  return [
    `Week ${weekNumber} ${params.userLevel} level focus`,
    'Progressive overload application',
    `Based on AI review: ${params.aiReview.slice(0, 30)}...`
  ];
};

export const workoutPlanService = {
  generateWorkoutPlan,
  determineUserLevel,
  generateWeekPlan
};
