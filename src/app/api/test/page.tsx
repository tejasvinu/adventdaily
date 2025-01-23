'use client';
import { useEffect, useState } from 'react';

export default function TestAPI() {
  const [testResults, setTestResults] = useState<{status: number; data: any} | null>(null);

  useEffect(() => {
    const testAPI = async () => {
      console.log('🧪 Starting API test...');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      console.log('🧪 Token from localStorage:', token?.substring(0, 20) + '...');
      console.log('🧪 Token present:', !!token);
      
      // Get token from cookie
      const cookie = document.cookie.split(';').find(c => c.trim().startsWith('token='));
      console.log('🧪 Cookie present:', !!cookie);

      try {
        const response = await fetch('/api/workout-plan', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });
        
        console.log('🧪 Response status:', response.status);
        const data = await response.json();
        console.log('🧪 Response data:', data);
        
        setTestResults({ 
          status: response.status, 
          data: {
            ...data,
            debug: {
              hasToken: !!token,
              hasCookie: !!cookie,
              headers: Object.fromEntries(response.headers)
            }
          }
        });
      } catch (error) {
        console.error('🧪 Test failed:', error);
        setTestResults({ status: 500, data: { error: 'Test failed' } });
      }
    };

    testAPI();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      <div className="space-y-4">
        <p>Check browser console for detailed logs</p>
        {testResults && (
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-bold">Test Results:</h2>
            <p>Status: {testResults.status}</p>
            <pre className="mt-2 p-2 bg-white rounded">
              {JSON.stringify(testResults.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
