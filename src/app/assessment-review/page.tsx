'use client';
import React, { useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function AssessmentReview() {
  const { assessment, loading: assessmentLoading, error: assessmentError, refetch } = useAssessment();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReview = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-assessment-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      await refetch(); // Refresh assessment data after generating review
      
    } catch (err) {
      setError('Failed to generate review');
    } finally {
      setIsGenerating(false);
    }
  };

  if (assessmentLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (assessmentError) {
    return <div className="flex items-center justify-center h-screen text-red-500">{assessmentError}</div>;
  }

  if (!assessment) {
    return (
      <div className="flex flex-col items-center justify-center h-screen mt-8">
        <h1 className="text-xl font-semibold mb-4">Complete Your Assessment First</h1>
        <Link href="/assessment" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Start Assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-8">
      <h1 className="text-2xl font-bold mb-6">Your Personal Training Analysis</h1>
      
      {!assessment.review && (
        <button
          onClick={generateReview}
          disabled={isGenerating}
          className={`w-full mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium ${
            isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition-colors'
          }`}
        >
          {isGenerating ? 'Analyzing Your Profile...' : 'Generate Your Analysis'}
        </button>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      
      {assessment.review && (
        <div className="prose prose-lg prose-slate max-w-none">
          <ReactMarkdown 
            components={{
              h1: ({node, ...props}) => <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />,
              h2: ({node, ...props}) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="my-3 list-disc pl-6" {...props} />,
              li: ({node, ...props}) => <li className="mb-2" {...props} />
            }}
          >
            {assessment.review}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}