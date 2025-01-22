import { useState, useEffect } from 'react';
import { AssessmentDocument } from '@/types/assessment';

export function useAssessment() {
  const [assessment, setAssessment] = useState<AssessmentDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessment = async () => {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      setAssessment(data.assessment);
      
    } catch (err) {
      setError('Failed to fetch assessment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessment();
  }, []);

  return { assessment, loading, error, refetch: fetchAssessment };
}
