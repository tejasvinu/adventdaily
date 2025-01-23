import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import WorkoutPlan from '@/models/WorkoutPlan';

interface WorkoutPlanDocument {
  userId: string;
  plan: any; // Replace 'any' with your actual plan type structure
  createdAt: Date;
  __v: number;
  _id: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  console.log('GET /api/workout-plan');
  try {
    await connectToDatabase();
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verify(token.value, JWT_SECRET) as { userId: string };
    
    const workoutPlan = await WorkoutPlan.findOne({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean() as WorkoutPlanDocument | null;

    if (!workoutPlan) {
      return NextResponse.json(
        { message: 'No workout plan found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ plan: workoutPlan.plan });
  } catch (error) {
    console.error('Error in workout plan route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
