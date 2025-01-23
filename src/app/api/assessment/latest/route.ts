import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import Assessment from '@/models/Assessment';
import connectToDatabase from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // Get token from request
    const token = request.cookies.get('token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    const assessment = await Assessment.findOne({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!assessment) {
      return NextResponse.json(
        { message: 'No assessment found' },
        { status: 404 }
      );
    }

    return NextResponse.json(assessment);
  } catch (error) {
    console.error('Failed to fetch assessment:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
