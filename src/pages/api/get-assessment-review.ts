import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Assessment from '@/models/Assessment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string };
    await connectToDatabase();

    const assessment = await Assessment.findOne({ userId: decoded.userId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.status(200).json({ review: assessment.review });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Failed to fetch review' });
  }
}