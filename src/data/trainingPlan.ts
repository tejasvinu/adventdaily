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
          description: 'Full body strength foundation focusing on the six main movement patterns: squat, hinge, push, pull, carry, and core. Emphasize proper form and controlled tempo.',
          category: 'Strength',
          sets: 3,
          reps: 12,
          intensity: 'Low',
          notes: 'Focus exercises: Goblet squats (3x12), Romanian deadlifts (3x10), Push-ups (3x10-12), Assisted pull-ups (3x8-10), Farmers walks (3x30m), Plank holds (3x30s)'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏃‍♂️ Cardio',
          description: 'Zone 2 endurance development run with focus on maintaining consistent heart rate and proper running form. Include dynamic warm-up and form drills.',
          category: 'Cardio',
          duration: '20-30 min',
          intensity: 'Low',
          notes: 'Run form cues: Mid-foot strike, upright posture, relaxed shoulders, arms at 90°. Keep heart rate between 120-140 BPM.'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏊‍♂️ Swim',
          description: 'Technical swim session focusing on stroke efficiency, body position, and breathing patterns. Include drill sets and short distance repeats.',
          category: 'Cardio',
          duration: '30 min',
          intensity: 'Low',
          notes: 'Drills: Catch-up drill (4x50m), Side-kick drill (4x50m), Balance drill (4x25m). Focus on horizontal body position and bilateral breathing.'
        },
        [trainingDates[dateIndex++]]: {
          type: '🚴‍♂️ Cycle',
          description: 'Foundational ride focusing on pedaling efficiency and maintaining consistent cadence. Include seated and standing intervals.',
          category: 'Cardio',
          duration: '45 min',
          intensity: 'Moderate',
          notes: 'Maintain cadence 80-90 rpm. Include 5x2min standing climbs. Focus on smooth pedal stroke and core engagement.'
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
          description: 'Progressive overload session targeting major muscle groups with emphasis on compound movements and time under tension.',
          category: 'Strength',
          sets: 3,
          reps: 10,
          intensity: 'Moderate',
          notes: 'Key exercises: Back squats (4x8), Barbell rows (3x10), Dumbbell bench press (3x8), Walking lunges (3x12/leg), Core circuit (3 rounds)'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏃‍♂️ Speed Work',
          description: 'Introduction to interval training with focus on form maintenance during higher intensity efforts. Include proper warm-up and cool-down.',
          category: 'Cardio',
          duration: '35 min',
          intensity: 'High',
          notes: 'Workout structure: 10min warm-up, 5x(2min @85% effort, 1min easy jog), 10min cool-down. Focus on maintaining form during high-intensity intervals.'
        },
        [trainingDates[dateIndex++]]: {
          type: '🧘‍♂️ Recovery',
          description: 'Active recovery session combining mobility work, light stretching, and nervous system reset. Focus on problem areas and recovery techniques.',
          category: 'Recovery',
          duration: '40 min',
          intensity: 'Low',
          notes: 'Include: Hip mobility routine (10min), thoracic mobility work (10min), foam rolling major muscle groups (15min), breathing exercises (5min)'
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
          intensity: 'High',
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
          reps: 15,
          intensity: 'Low',
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
          intensity: 'High',
          notes: '10x100m sprints with 45 sec rest'
        },
        [trainingDates[dateIndex++]]: {
          type: '🏋️ Strength',
          description: 'Peak Power',
          category: 'Strength',
          sets: 5,
          reps: 5,
          intensity: 'High',
          notes: 'Focus on explosive power, full recovery between sets'
        },
        [trainingDates[dateIndex++]]: {
          type: '🚴‍♂️ Cycle',
          description: 'Hill Repeats',
          category: 'Cardio',
          duration: '75 min',
          intensity: 'High',
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
          reps: 10,
          intensity: 'Low',
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
          intensity: 'Low',
          notes: 'Mobility work and progress evaluation'
        }
      }
    }
  ]
};
