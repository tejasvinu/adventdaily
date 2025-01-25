import { 
  TrainingPlan, 
  WorkoutData, 
  WorkoutTemplates,  // Ensure this matches the exported interface name
  WorkoutTemplateStructure,
  SwimSubCategory,
  BikeSubCategory,
  RunSubCategory 
} from '@/types/workout';
import { AssessmentDocument } from '@/types/assessment';
import { generateAssessmentReview } from '@/utils/ai';
import { workoutTemplate } from '@/data/workoutTemplate';

function createPromptFromAssessment(assessment: AssessmentDocument): string {
  return `Generate a detailed 8-week training plan considering:
    Experience: ${JSON.stringify(assessment.experience)}
    Current Fitness: ${JSON.stringify(assessment.currentFitness)}
    Medical: ${JSON.stringify(assessment.medical)}
    Training: ${JSON.stringify(assessment.training)}
    Goals: ${JSON.stringify(assessment.goals)}
    
    Use this format for each week:
    {weekNumber, theme, goals[], workouts{date: {type, description, category, duration/sets, intensity, notes}}}
    
    Consider:
    1. Progressive overload
    2. Recovery periods
    3. ${assessment.medical.hasInjuries ? 'Injury accommodations' : 'Injury prevention'}
    4. Available equipment: ${assessment.training.hasGymAccess ? 'Full gym' : 'Limited equipment'}
    5. Time constraints: ${assessment.training.weeklyHours} hours available
    6. Primary goal: ${assessment.experience.primaryGoal}`;
}

export const planGeneratorService = {
  generatePlan: async (assessment: AssessmentDocument): Promise<TrainingPlan> => {
    try {
      // Generate the base plan using AI
      const prompt = createPromptFromAssessment(assessment);
      const aiResponse = await generateAssessmentReview(prompt);
      
      // Parse and validate AI response
      const planStructure = JSON.parse(aiResponse);
      
      // Apply templates and standardize workout structures
      const processedPlan = {
        id: `${assessment.userId}-8week-${Date.now()}`,
        name: '8-Week Personalized Plan',
        duration: 8,
        weeks: planStructure.weeks.map((week: any) => ({
          weekNumber: week.weekNumber,
          theme: week.theme,
          goals: week.goals,
          workouts: Object.entries(week.workouts).reduce((acc: any, [date, workout]: [string, any]) => {
            acc[date] = standardizeWorkout(workout as WorkoutData, assessment);
            return acc;
          }, {})
        }))
      };

      return processedPlan;
    } catch (error) {
      console.error('Failed to generate training plan:', error);
      throw new Error('Plan generation failed');
    }
  },
  
  // Helper function to adapt workouts based on assessment
  modifyForInjuries: (workout: WorkoutData, injuries: string): WorkoutData => {
    // Add injury-specific modifications
    const modifiedWorkout = { ...workout };
    if (injuries.toLowerCase().includes('knee')) {
      modifiedWorkout.notes = `${workout.notes || ''}\nLow-impact alternatives: Replace running with swimming or cycling. Modify squats to partial range of motion.`;
    }
    // Add more injury modifications as needed
    return modifiedWorkout;
  }
};

// Helper function to standardize workout data
function standardizeWorkout(workout: WorkoutData, assessment: AssessmentDocument): WorkoutData {
  const [category, rawSubCategory] = workout.type.toLowerCase().split('-');
  const templates = workoutTemplate.workoutTemplates as unknown as WorkoutTemplates;
  
  // Apply any injury modifications
  if (assessment.medical.hasInjuries) {
    workout = planGeneratorService.modifyForInjuries(workout, assessment.medical.injuries);
  }
  
  // Apply template structure if valid category and subCategory exist
  if (category && rawSubCategory) {
    switch (category) {
      case 'swim':
        if (isSwimSubCategory(rawSubCategory)) {
          const template = templates.swim[rawSubCategory];
          workout.description = buildDescription(workout.description, template);
        }
        break;
      case 'bike':
        if (isBikeSubCategory(rawSubCategory)) {
          const template = templates.bike[rawSubCategory];
          workout.description = buildDescription(workout.description, template);
        }
        break;
      case 'run':
        if (isRunSubCategory(rawSubCategory)) {
          const template = templates.run[rawSubCategory];
          workout.description = buildDescription(workout.description, template);
        }
        break;
    }
  }
  
  return {
    ...workout,
    category: workout.category || 'Cardio',
    intensity: workout.intensity || 'Moderate',
    notes: workout.notes || 'Focus on proper form and technique'
  };
}

// Type guard functions
function isSwimSubCategory(value: string): value is SwimSubCategory {
  return ['technique', 'endurance', 'speed'].includes(value);
}

function isBikeSubCategory(value: string): value is BikeSubCategory {
  return ['base', 'intervals'].includes(value);
}

function isRunSubCategory(value: string): value is RunSubCategory {
  return ['easy', 'tempo'].includes(value);  // Updated to match actual template values
}

function buildDescription(description: string, template: WorkoutTemplateStructure): string {
  return `${description}\n\nStructure:\n${template.warmup}\n${template.mainSet}\n${template.cooldown}`;
}
