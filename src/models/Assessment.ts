import mongoose, { Schema } from 'mongoose';
import { IAssessment } from '@/types/assessment';

const AssessmentSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    index: true 
  },
  personalInfo: {
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    location: { type: String }
  },
  experience: {
    hasCompeted: { type: Boolean, default: false },
    completedDistances: [String],
    raceCount: { type: String },
    recentRaceTimes: [String],
    previousChallenges: [String],
    primaryGoal: { type: String },
    targetRaceDate: { type: String }
  },
  currentFitness: {
    swim: {
      comfortLevel: { type: String },
      maxDistance: { type: String },
      technique: { type: String },
      timeFor400m: { type: String }
    },
    bike: {
      frequency: { type: String },
      maxDistance: { type: String },
      averageSpeed: { type: String },
      timeFor20k: { type: String }
    },
    run: {
      frequency: { type: String },
      maxDistance: { type: String },
      averagePace: { type: String },
      timeFor5k: { type: String }
    }
  },
  medical: {
    hasInjuries: { type: Boolean, default: false },
    injuries: { type: String },
    medications: [String],
    allergies: [String],
    hasActivityRestrictions: { type: Boolean, default: false },
    activityRestrictions: { type: String }
  },
  training: {
    weeklyHours: { type: String },
    availableDays: [String],
    preferredTime: { type: String },
    hasPoolAccess: { type: Boolean, default: false },
    hasGymAccess: { type: Boolean, default: false },
    trainingPreference: { type: String },
    additionalNotes: { type: String }
  },
  physicalMetrics: {
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bodyFat: { type: Number },
    restingHeartRate: { type: Number },
    maxHeartRate: { type: Number }
  },
  nutrition: {
    dailyCalories: { type: String, required: true },
    dietaryRestrictions: [String],
    mealFrequency: { type: String, required: true },
    hydrationHabits: { type: String, required: true }
  },
  wellbeing: {
    averageSleepHours: { type: String, required: true },
    sleepQuality: { type: String, required: true },
    stressLevel: { type: String, required: true },
    energyLevel: { type: String, required: true }
  },
  facilities: {
    hasOpenWaterAccess: { type: Boolean, default: false },
    openWaterDetails: { type: String },
    hasBikeTrainer: { type: Boolean, default: false },
    hasTreadmill: { type: Boolean, default: false },
    weatherConstraints: { type: String, required: true }
  },
  recovery: {
    warmupRoutine: { type: String, required: true },
    cooldownRoutine: { type: String, required: true },
    mobilityWork: [String],
    therapyFrequency: { type: String, required: true }
  },
  metrics: {
    usesWearableDevice: { type: Boolean, default: false },
    deviceType: { type: String },
    trackedMetrics: [String],
    preferredRPEScale: { type: String }
  },
  goals: {
    targetFinishTime: { type: String, required: true },
    secondaryGoals: [String],
    paceGoals: {
      swim: { type: String },
      bike: { type: String },
      run: { type: String }
    }
  },
  social: {
    needsGroupTraining: { type: Boolean, default: false },
    hasTrainingPartner: { type: Boolean, default: false },
    partnerFitnessLevel: { type: String },
    onlineCommunities: [String]
  },
  review: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model<IAssessment>('Assessment', AssessmentSchema);
