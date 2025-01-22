import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Assessment from '@/models/Assessment';
import { AssessmentFormData } from '@/types/assessment';
import { validateAssessment } from '@/utils/validateAssessment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const sanitizeAssessmentData = (data: AssessmentFormData) => {
  // Convert numeric values
  const age = parseInt(data.personalInfo.age);
  const height = parseFloat(data.physicalMetrics.height);
  const weight = parseFloat(data.physicalMetrics.weight);
  const bodyFat = data.physicalMetrics.bodyFat ? parseFloat(data.physicalMetrics.bodyFat) : null;
  const restingHeartRate = data.physicalMetrics.restingHeartRate ? parseInt(data.physicalMetrics.restingHeartRate) : null;
  const maxHeartRate = data.physicalMetrics.maxHeartRate ? parseInt(data.physicalMetrics.maxHeartRate) : null;

  // Validate required numeric values
  if (isNaN(age) || isNaN(height) || isNaN(weight)) {
    throw new Error('Invalid numeric values for age, height, or weight');
  }

  // Ensure all arrays are properly initialized
  const sanitizedData = {
    ...data,
    personalInfo: {
      ...data.personalInfo,
      age
    },
    physicalMetrics: {
      height,
      weight,
      bodyFat,
      restingHeartRate,
      maxHeartRate
    },
    experience: {
      ...data.experience,
      completedDistances: ensureArray(data.experience.completedDistances),
      recentRaceTimes: ensureArray(data.experience.recentRaceTimes),
      previousChallenges: ensureArray(data.experience.previousChallenges)
    },
    medical: {
      ...data.medical,
      medications: ensureArray(data.medical.medications),
      allergies: ensureArray(data.medical.allergies)
    },
    training: {
      ...data.training,
      availableDays: ensureArray(data.training.availableDays)
    },
    nutrition: {
      ...data.nutrition,
      dietaryRestrictions: ensureArray(data.nutrition.dietaryRestrictions)
    },
    recovery: {
      ...data.recovery,
      mobilityWork: ensureArray(data.recovery.mobilityWork)
    },
    metrics: {
      ...data.metrics,
      trackedMetrics: ensureArray(data.metrics.trackedMetrics)
    },
    goals: {
      ...data.goals,
      secondaryGoals: ensureArray(data.goals.secondaryGoals)
    },
    social: {
      ...data.social,
      onlineCommunities: ensureArray(data.social.onlineCommunities)
    }
  };

  return sanitizedData;
};

// Helper function to ensure array values
const ensureArray = (value: any[] | undefined): any[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return [];
};

export async function POST(request: Request) {
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
    const rawAssessmentData = await request.json();

    const validationError = validateAssessment(rawAssessmentData);
    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 }
      );
    }
    
    try {
      const sanitizedData = sanitizeAssessmentData(rawAssessmentData);
      
      // Find the user first
      const user = await User.findById(decoded.userId);
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      // Create or update assessment
      const assessment = await Assessment.findOneAndUpdate(
        { userId: decoded.userId },
        {
          userId: decoded.userId,
          ...sanitizedData
        },
        { 
          new: true, 
          upsert: true,
          runValidators: true 
        }
      );

      // Update user with assessment reference
      await User.findByIdAndUpdate(
        decoded.userId,
        { assessmentId: assessment._id },
        { new: true }
      );

      return NextResponse.json(
        { 
          message: 'Assessment saved successfully',
          assessment: assessment
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { message: 'Error saving to database', error: (dbError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Assessment error:', error);
    return NextResponse.json(
      { message: 'Error processing assessment', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
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
    
    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const queryUserId = searchParams.get('userId');
    
    // Use either query userId or token userId
    const targetUserId = queryUserId || decoded.userId;

    const assessment = await Assessment.findOne({ userId: targetUserId });
    
    if (!assessment) {
      return NextResponse.json(
        { message: 'Assessment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(assessment);

  } catch (error) {
    console.error('Error fetching assessment:', error);
    return NextResponse.json(
      { message: 'Error fetching assessment', error: (error as Error).message },
      { status: 500 }
    );
  }
}
