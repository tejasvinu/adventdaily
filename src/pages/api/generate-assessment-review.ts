import { NextApiRequest, NextApiResponse } from 'next';
import { generateAssessmentReview } from '@/utils/ai';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Assessment from '@/models/Assessment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get token from request
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Verify token
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    // Get user's assessment
    const assessment = await Assessment.findOne({ userId: decoded.userId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Generate review
    const review = await generateAssessmentReview(assessment);
    
    // Store the review
    assessment.review = review;
    await assessment.save();

    res.status(200).json({ review });
  } catch (error) {
    console.error('Error generating review:', error);
    res.status(500).json({ message: 'Failed to generate review' });
  }
}