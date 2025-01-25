import { TrainingPlan, WorkoutData, ProgressionRule } from '../types/workout';

export const workoutTemplate = {
  metadata: {
    version: "1.0",
    generatedDate: "",
    userLevel: "",
    targetEvent: "",
    weeks: 8,
    sessionsPerWeek: 0,
    totalHours: 0
  },
  adaptations: {
    injuries: [],
    equipment: [],
    weatherAlternatives: true,
    indoorOptions: {},
    injuryModifications: {
      knee: {
        avoid: ['jumping', 'deep squats'],
        substitute: ['swimming', 'upper body focus']
      },
      shoulder: {
        avoid: ['overhead press', 'swimming'],
        substitute: ['leg focus', 'core work']
      },
      back: {
        avoid: ['heavy deadlifts', 'high-impact'],
        substitute: ['bodyweight', 'stability work']
      }
    }
  },
  progressionRules: {
    swimProgression: {
      distanceIncrease: "10%",
      intensityIncrease: "5%",
      recoveryWeeks: [4, 8]
    },
    bikeProgression: {
      distanceIncrease: "15%",
      intensityIncrease: "5%",
      recoveryWeeks: [4, 8]
    },
    runProgression: {
      distanceIncrease: "10%",
      intensityIncrease: "5%",
      recoveryWeeks: [4, 8]
    }
  },
  zones: {
    heartRate: {
      z1: "60-65% max HR",
      z2: "65-75% max HR",
      z3: "75-85% max HR",
      z4: "85-95% max HR",
      z5: ">95% max HR"
    },
    perceizedEffort: {
      z1: "Very Easy",
      z2: "Easy",
      z3: "Moderate",
      z4: "Hard",
      z5: "Very Hard"
    }
  },
  weeklyStructure: {
    monday: { focus: "swim", backup: "strength" },
    tuesday: { focus: "run", backup: "cross-training" },
    wednesday: { focus: "recovery", backup: "technique" },
    thursday: { focus: "bike", backup: "strength" },
    friday: { focus: "brick", backup: "single-discipline" },
    saturday: { focus: "long", backup: "split-session" },
    sunday: { focus: "rest", backup: "light-activity" }
  },
  workoutTemplates: {
    swim: {
      technique: {
        warmup: "10 min easy swim",
        mainSet: "4x100m drill focus",
        cooldown: "5 min easy swim"
      },
      endurance: {
        warmup: "15 min progressive",
        mainSet: "30-45 min steady state",
        cooldown: "10 min easy"
      },
      speed: {
        warmup: "20 min including drills",
        mainSet: "8-12x100m intervals",
        cooldown: "10 min technique focus"
      }
    },
    bike: {
      base: {
        warmup: "15 min spin",
        mainSet: "45-90 min steady state",
        cooldown: "10 min spin"
      },
      intervals: {
        warmup: "20 min progressive",
        mainSet: "6-8x3 min hard efforts",
        cooldown: "15 min easy"
      }
    },
    run: {
      easy: {
        warmup: "10 min walk/jog",
        mainSet: "20-40 min easy pace",
        cooldown: "5 min walk"
      },
      tempo: {
        warmup: "15 min progressive",
        mainSet: "20-30 min at threshold",
        cooldown: "10 min easy jog"
      }
    }
  },
  recoveryProtocols: {
    postWorkout: [
      "10 min cool down",
      "Static stretching",
      "Foam rolling"
    ],
    activeRecovery: [
      "Light walking",
      "Gentle swimming",
      "Yoga"
    ],
    restDay: [
      "Mobility work",
      "Light stretching",
      "Mental preparation"
    ]
  }
};

export const progressionRules: { [key: string]: ProgressionRule } = {
  strength: {
    baseVolume: 12,
    weeklyIncrease: 0.1,
    maxVolume: 25,
    deloadWeeks: [4, 8]
  },
  endurance: {
    baseVolume: 30,
    weeklyIncrease: 0.15,
    maxVolume: 90,
    deloadWeeks: [4, 8]
  },
  hiit: {
    baseVolume: 20,
    weeklyIncrease: 0.12,
    maxVolume: 45,
    deloadWeeks: [4, 8]
  }
};

// Helper function to generate a workout based on assessment and template
export function generateWorkout(
  assessment: any,
  template: any,
  date: string,
  focusArea: string
): WorkoutData {
  // AI would use this to generate personalized workouts
  // This is a placeholder implementation
  return {
    type: "🏃‍♂️ Run",
    description: "Generated workout",
    category: "Cardio",
    duration: "30 min",
    intensity: "Moderate",
    notes: "AI-generated based on user assessment"
  };
}
