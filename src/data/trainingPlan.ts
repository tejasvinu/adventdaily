import { TrainingPlan } from '../types/workout';

// Helper function to generate dates starting from today
const getTrainingDates = () => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  
  const dates: string[] = [];
  for (let i = 0; i < 56; i++) { // 8 weeks * 7 days
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const trainingDates = getTrainingDates();
let dateIndex = 0;

export const eightWeekPlan: TrainingPlan = {
  id: '8week-basic',
  name: '8-Week Foundation Builder',
  duration: 8,
  weeks: [
    {
      weekNumber: 1,
      theme: 'Foundation',
      goals: [
        'Establish baseline intensity',
        'Focus on proper form and technique',
        'Build basic endurance'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🏋️ Strength',
          description: 'Full Body Basics',
          category: 'Strength',
          sets: 3,
          reps: '10-12',
          intensity: 'Light to Moderate',
          notes: 'Focus on form for squats, lunges, push-ups, planks'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏃‍♂️ Cardio',
          description: 'Easy Pace Run',
          category: 'Cardio',
          duration: '20-30 min',
          intensity: 'Low',
          notes: 'Keep heart rate in zone 2'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏊‍♂️ Swim',
          description: 'Technique Drills',
          category: 'Cardio',
          duration: '30 min',
          intensity: 'Low',
          notes: 'Focus on stroke efficiency and breathing patterns'
        },
        [trainingDates[dateIndex++]]: {
          type: '🚴‍♂️ Cycle',
          description: 'Base Ride',
          category: 'Cardio',
          duration: '45 min',
          intensity: 'Moderate',
          notes: 'Maintain steady cadence 80-90 rpm'
        }
      }
    },
    {
      weekNumber: 2,
      theme: 'Building Consistency',
      goals: [
        'Maintain consistent frequency',
        'Slightly increase tempo or duration',
        'Focus on recovery between sessions'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🏋️ Strength',
          description: 'Progressive Loading',
          category: 'Strength',
          sets: 3,
          reps: '8-10',
          intensity: 'Moderate',
          notes: 'Increase weights by 5-10% from last week'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏃‍♂️ Speed Work',
          description: 'Interval Training',
          category: 'Cardio',
          duration: '35 min',
          intensity: 'High',
          notes: '5x(2 min hard, 1 min easy)'
        },
        [trainingDates[dateIndex++]]: {
          type: '🧘‍♂️ Recovery',
          description: 'Active Recovery',
          category: 'Recovery',
          duration: '40 min',
          intensity: 'Very Low',
          notes: 'Light stretching and foam rolling'
        }
      }
    },
    {
      weekNumber: 3,
      theme: 'Progressive Challenge',
      goals: [
        'Increase cardiovascular capacity',
        'Add complex movements',
        'Introduce brick workouts'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🏊‍♂️ Swim + 🏃‍♂️ Run',
          description: 'Brick Session',
          category: 'Cardio',
          duration: '60 min',
          intensity: 'Moderate-High',
          notes: '30 min swim followed by 30 min run'
        }
      }
    },
    {
      weekNumber: 4,
      theme: 'Volume Adjustment',
      goals: [
        'Evaluate progress',
        'Adjust intensity based on adaptation',
        'Focus on technique refinement'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🏋️ Strength',
          description: 'Deload Week',
          category: 'Strength',
          sets: 2,
          reps: '12-15',
          intensity: 'Light',
          notes: 'Focus on form and recovery'
        }
      }
    },
    {
      weekNumber: 5,
      theme: 'Intensity Uptick',
      goals: [
        'Increase challenge',
        'Enhance endurance',
        'Implement advanced variations'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🚴‍♂️ Hills',
          description: 'Hill Climbing Session',
          category: 'Cardio',
          duration: '75 min',
          intensity: 'High',
          notes: '6x3 min hill climbs with recovery descents'
        }
      }
    },
    {
      weekNumber: 6,
      theme: 'Sustain & Polish',
      goals: [
        'Maintain gains',
        'Refine technique',
        'Focus on weak areas'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🏊‍♂️ Swim',
          description: 'Technique Refinement',
          category: 'Cardio',
          duration: '45 min',
          intensity: 'Moderate',
          notes: 'Focus on bilateral breathing and catch phase'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏋️ Strength',
          description: 'Power Development',
          category: 'Strength',
          sets: 4,
          reps: '6-8',
          intensity: 'High',
          notes: 'Explosive movements with perfect form'
        },
        [trainingDates[dateIndex++]]: {
          type: '🚴‍♂️ Cycle + 🏃‍♂️ Run',
          description: 'Brick Session',
          category: 'Cardio',
          duration: '90 min',
          intensity: 'High',
          notes: '60 min ride followed by 30 min run'
        },
        [trainingDates[dateIndex++]]: {
          type: '🧘‍♂️ Recovery',
          description: 'Active Recovery',
          category: 'Recovery',
          duration: '45 min',
          intensity: 'Low',
          notes: 'Yoga and mobility work'
        }
      }
    },
    {
      weekNumber: 7,
      theme: 'Peak Effort',
      goals: [
        'Push intensity carefully',
        'Maximum sustainable effort',
        'Maintain good form'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🏊‍♂️ Swim',
          description: 'Speed Work',
          category: 'Cardio',
          duration: '60 min',
          intensity: 'Very High',
          notes: '10x100m sprints with 45 sec rest'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏋️ Strength',
          description: 'Peak Power',
          category: 'Strength',
          sets: 5,
          reps: '5',
          intensity: 'Maximum',
          notes: 'Focus on explosive power, full recovery between sets'
        },
        [trainingDates[dateIndex++]]: {
          type: '🚴‍♂️ Cycle',
          description: 'Hill Repeats',
          category: 'Cardio',
          duration: '75 min',
          intensity: 'Very High',
          notes: '8x4 min hill climbs at threshold'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏃‍♂️ Run',
          description: 'Tempo Run',
          category: 'Cardio',
          duration: '50 min',
          intensity: 'High',
          notes: '15 min warmup, 20 min at race pace, 15 min cooldown'
        }
      }
    },
    {
      weekNumber: 8,
      theme: 'Recovery & Assessment',
      goals: [
        'Reduce volume',
        'Maintain movement patterns',
        'Prepare for next phase'
      ],
      workouts: {
        [trainingDates[dateIndex++]]: {
          type: '🏊‍♂️ Swim',
          description: 'Easy Technique',
          category: 'Cardio',
          duration: '30 min',
          intensity: 'Low',
          notes: 'Focus on form and efficiency'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏋️ Light Strength',
          description: 'Maintenance',
          category: 'Strength',
          sets: 2,
          reps: '10',
          intensity: 'Light',
          notes: 'Light weights, perfect form'
        },
        [trainingDates[dateIndex++]]: {
          type: '🚴‍♂️ Cycle',
          description: 'Recovery Ride',
          category: 'Recovery',
          duration: '45 min',
          intensity: 'Low',
          notes: 'Easy spin, no hard efforts'
        },
        [trainingDates[dateIndex++]]: {
          type: '🧘‍♂️ Recovery',
          description: 'Final Assessment',
          category: 'Recovery',
          duration: '60 min',
          intensity: 'Very Low',
          notes: 'Mobility work and progress evaluation'
        }
      }
    }
  ]
};
