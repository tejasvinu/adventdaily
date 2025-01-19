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
  // Convert age to number
  const age = parseInt(data.personalInfo.age);
  if (isNaN(age)) {
    throw new Error('Invalid age value');
  }

  // Ensure arrays are properly formatted
  const sanitizedData = {
    ...data,
    personalInfo: {
      ...data.personalInfo,
      age
    },
    experience: {
      ...data.experience,
      completedDistances: Array.isArray(data.experience.completedDistances) 
        ? data.experience.completedDistances 
        : [],
      recentRaceTimes: Array.isArray(data.experience.recentRaceTimes) 
        ? data.experience.recentRaceTimes 
        : [],
      previousChallenges: Array.isArray(data.experience.previousChallenges) 
        ? data.experience.previousChallenges 
        : []
    },
    medical: {
      ...data.medical,
      medications: Array.isArray(data.medical.medications) 
        ? data.medical.medications 
        : [],
      allergies: Array.isArray(data.medical.allergies) 
        ? data.medical.allergies 
        : []
    },
    training: {
      ...data.training,
      availableDays: Array.isArray(data.training.availableDays) 
        ? data.training.availableDays 
        : []
    }
  };

  return sanitizedData;
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
