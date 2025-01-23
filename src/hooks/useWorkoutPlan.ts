import { useState, useEffect } from 'react';
import { WorkoutPlan } from '@/types/workout';
import { useRouter } from 'next/navigation';

export function useWorkoutPlan() {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/workout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch workout plan');
      }

      const data = await response.json();
      setPlan(data.plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workout plan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [router]);

  return { plan, loading, error, refetch: fetchPlan };
}
