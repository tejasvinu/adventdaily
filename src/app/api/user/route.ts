import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Assessment from '@/models/Assessment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const headerList = await headers();
    
    // Check both cookie and Authorization header
    const cookieToken = cookieStore.get('token');
    const authHeader = headerList.get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    
    const token = cookieToken?.value || bearerToken;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    try {
      const decoded = verify(token, JWT_SECRET) as { userId: string };
      await connectToDatabase();

      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const assessment = await Assessment.findOne({ userId: user._id });

      return NextResponse.json({
        user,
        assessment
      });
    } catch (jwtError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error in user route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
