import mongoose, { Schema, Document } from 'mongoose';
import { AssessmentDocument } from '@/types/assessment';

export interface IAssessment extends Document, AssessmentDocument {
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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
  }
}, {
  timestamps: true
});

export default mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema);
