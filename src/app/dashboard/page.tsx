'use client';
import React from 'react';
import { useUser } from '@/hooks/useUser';

const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{value}</span>
  </div>
);

const StatCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
      {title}
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

export default function Dashboard() {
  const { user, assessment, loading, error } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-xl text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="max-w-6xl mx-auto space-y-8 bg-white dark:bg-gray-900 p-10 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500 mb-8">
          Welcome, {user?.username}! 🏃‍♂️
        </h1>
        
        {assessment ? (
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard title="Personal Information">
              <DetailItem label="Age" value={assessment.personalInfo.age} />
              <DetailItem label="Gender" value={assessment.personalInfo.gender} />
              <DetailItem label="Location" value={assessment.personalInfo.location} />
            </StatCard>

            <StatCard title="Experience">
              <DetailItem 
                label="Race Experience" 
                value={assessment.experience.hasCompeted ? '✅ Yes' : '❌ No'} 
              />
              <DetailItem 
                label="Race Count" 
                value={`${assessment.experience.raceCount} races`} 
              />
              <DetailItem label="Primary Goal" value={assessment.experience.primaryGoal} />
              <DetailItem label="Target Race" value={assessment.experience.targetRaceDate} />
            </StatCard>

            <StatCard title="Swimming Profile 🏊‍♂️">
              <DetailItem label="Comfort Level" value={assessment.currentFitness.swim.comfortLevel} />
              <DetailItem 
                label="Max Distance" 
                value={`${assessment.currentFitness.swim.maxDistance}m`} 
              />
              <DetailItem label="400m Time" value={assessment.currentFitness.swim.timeFor400m} />
              <DetailItem label="Technique" value={assessment.currentFitness.swim.technique} />
            </StatCard>

            <StatCard title="Cycling Profile 🚴‍♂️">
              <DetailItem 
                label="Weekly Rides" 
                value={`${assessment.currentFitness.bike.frequency}x`} 
              />
              <DetailItem 
                label="Max Distance" 
                value={`${assessment.currentFitness.bike.maxDistance}km`} 
              />
              <DetailItem 
                label="Average Speed" 
                value={`${assessment.currentFitness.bike.averageSpeed}km/h`} 
              />
              <DetailItem label="20K Time" value={assessment.currentFitness.bike.timeFor20k} />
            </StatCard>

            <StatCard title="Running Profile 🏃‍♂️">
              <DetailItem 
                label="Weekly Runs" 
                value={`${assessment.currentFitness.run.frequency}x`} 
              />
              <DetailItem 
                label="Max Distance" 
                value={`${assessment.currentFitness.run.maxDistance}km`} 
              />
              <DetailItem 
                label="Average Pace" 
                value={`${assessment.currentFitness.run.averagePace}/km`} 
              />
              <DetailItem label="5K Time" value={assessment.currentFitness.run.timeFor5k} />
            </StatCard>

            <StatCard title="Training Preferences ⚙️">
              <DetailItem 
                label="Weekly Hours" 
                value={`${assessment.training.weeklyHours}h`} 
              />
              <DetailItem label="Preferred Time" value={assessment.training.preferredTime} />
              <DetailItem 
                label="Pool Access" 
                value={assessment.training.hasPoolAccess ? '✅ Yes' : '❌ No'} 
              />
              <DetailItem 
                label="Gym Access" 
                value={assessment.training.hasGymAccess ? '✅ Yes' : '❌ No'} 
              />
            </StatCard>
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              No assessment data available. Please complete your assessment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}