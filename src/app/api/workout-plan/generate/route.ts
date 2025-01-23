import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { generateWorkoutPlanAI } from '@/utils/ai';
import connectToDatabase from '@/lib/mongodb';
import Assessment from '@/models/Assessment';
import WorkoutPlan from '@/models/WorkoutPlan';
import { Types, Document } from 'mongoose';

interface AssessmentDocument extends Document {
  _id: Types.ObjectId;
  userId: string;
  createdAt: Date;
  __v: number;
  // add other assessment fields as needed
}

// Update the LeanAssessmentDocument type to preserve _id
type LeanAssessmentDocument = {
  _id: Types.ObjectId;
  userId: string;
  createdAt: Date;
  __v: number;
  // add other assessment fields as needed
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST() {
  try {
    await connectToDatabase();
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token?.value) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verify(token.value, JWT_SECRET) as { userId: string };
    
    const assessment = await Assessment.findOne({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean<LeanAssessmentDocument>();

    if (!assessment) {
      return NextResponse.json(
        { message: 'No assessment found' },
        { status: 404 }
      );
    }

    const plan = await generateWorkoutPlanAI(assessment, 8);
    
    const workoutPlan = new WorkoutPlan({
      userId: decoded.userId,
      assessmentId: assessment._id,
      plan: plan
    });
    await workoutPlan.save();

    return NextResponse.json({ plan });
  } catch (error) {
    console.error('Generate route error:', error);
    return NextResponse.json(
      { message: 'Failed to generate workout plan' },
      { status: 500 }
    );
  }
}
