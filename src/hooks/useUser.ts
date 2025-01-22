import { useState, useEffect } from 'react';
import { IUser } from '@/models/User';
import { IAssessment } from '@/models/Assessment';

interface UserData {
  user: IUser | null;
  assessment: IAssessment | null;
  loading: boolean;
  error: string | null;
}

export function useUser() {
  const [userData, setUserData] = useState<UserData>({
    user: null,
    assessment: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user', {
          credentials: 'include', // Add this line to include cookies
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '', // Include token in header
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData({
          user: data.user,
          assessment: data.assessment,
          loading: false,
          error: null
        });
      } catch (err) {
        setUserData(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'An error occurred'
        }));
      }
    }

    fetchUserData();
  }, []);

  return userData;
}
