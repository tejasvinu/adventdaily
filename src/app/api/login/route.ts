import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import connectToDatabase from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '1h' }
    );

    // Create the response
    const response = NextResponse.json(
      { message: 'Login successful', token }, // Include token in response body
      { status: 200 }
    );

    // Set cookie as backup
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax', // Changed from strict to lax
      path: '/',
      maxAge: 60 * 60 // 1 hour
    });

    console.log('Setting token cookie:', token.substring(0, 20) + '...'); // Debug log

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Error during login' },
      { status: 500 }
    );
  }
}