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
              {assessment.personalInfo && (
                <>
                  <DetailItem label="Age" value={assessment.personalInfo.age || 'N/A'} />
                  <DetailItem label="Gender" value={assessment.personalInfo.gender || 'N/A'} />
                  <DetailItem label="Location" value={assessment.personalInfo.location || 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Experience">
              {assessment.experience && (
                <>
                  <DetailItem 
                    label="Race Experience" 
                    value={assessment.experience.hasCompeted ? '✅ Yes' : '❌ No'} 
                  />
                  <DetailItem 
                    label="Race Count" 
                    value={assessment.experience.raceCount ? `${assessment.experience.raceCount} races` : 'N/A'} 
                  />
                  <DetailItem label="Primary Goal" value={assessment.experience.primaryGoal || 'N/A'} />
                  <DetailItem label="Target Race" value={assessment.experience.targetRaceDate || 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Swimming Profile 🏊‍♂️">
              {assessment.currentFitness?.swim && (
                <>
                  <DetailItem label="Comfort Level" value={assessment.currentFitness.swim.comfortLevel || 'N/A'} />
                  <DetailItem 
                    label="Max Distance" 
                    value={assessment.currentFitness.swim.maxDistance ? `${assessment.currentFitness.swim.maxDistance}m` : 'N/A'} 
                  />
                  <DetailItem label="400m Time" value={assessment.currentFitness.swim.timeFor400m || 'N/A'} />
                  <DetailItem label="Technique" value={assessment.currentFitness.swim.technique || 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Cycling Profile 🚴‍♂️">
              {assessment.currentFitness?.bike && (
                <>
                  <DetailItem 
                    label="Weekly Rides" 
                    value={assessment.currentFitness.bike.frequency ? `${assessment.currentFitness.bike.frequency}x` : 'N/A'} 
                  />
                  <DetailItem 
                    label="Max Distance" 
                    value={assessment.currentFitness.bike.maxDistance ? `${assessment.currentFitness.bike.maxDistance}km` : 'N/A'} 
                  />
                  <DetailItem 
                    label="Average Speed" 
                    value={assessment.currentFitness.bike.averageSpeed ? `${assessment.currentFitness.bike.averageSpeed}km/h` : 'N/A'} 
                  />
                  <DetailItem label="20K Time" value={assessment.currentFitness.bike.timeFor20k || 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Running Profile 🏃‍♂️">
              {assessment.currentFitness?.run && (
                <>
                  <DetailItem 
                    label="Weekly Runs" 
                    value={assessment.currentFitness.run.frequency ? `${assessment.currentFitness.run.frequency}x` : 'N/A'} 
                  />
                  <DetailItem 
                    label="Max Distance" 
                    value={assessment.currentFitness.run.maxDistance ? `${assessment.currentFitness.run.maxDistance}km` : 'N/A'} 
                  />
                  <DetailItem 
                    label="Average Pace" 
                    value={assessment.currentFitness.run.averagePace ? `${assessment.currentFitness.run.averagePace}/km` : 'N/A'} 
                  />
                  <DetailItem label="5K Time" value={assessment.currentFitness.run.timeFor5k || 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Training Preferences ⚙️">
              {assessment.training && (
                <>
                  <DetailItem 
                    label="Weekly Hours" 
                    value={assessment.training.weeklyHours ? `${assessment.training.weeklyHours}h` : 'N/A'} 
                  />
                  <DetailItem label="Preferred Time" value={assessment.training.preferredTime || 'N/A'} />
                  <DetailItem 
                    label="Pool Access" 
                    value={assessment.training.hasPoolAccess ? '✅ Yes' : '❌ No'} 
                  />
                  <DetailItem 
                    label="Gym Access" 
                    value={assessment.training.hasGymAccess ? '✅ Yes' : '❌ No'} 
                  />
                </>
              )}
            </StatCard>

            <StatCard title="Physical Metrics">
              {assessment.physicalMetrics && (
                <>
                  <DetailItem 
                    label="Height" 
                    value={assessment.physicalMetrics.height ? `${assessment.physicalMetrics.height} cm` : 'N/A'} 
                  />
                  <DetailItem 
                    label="Weight" 
                    value={assessment.physicalMetrics.weight ? `${assessment.physicalMetrics.weight} kg` : 'N/A'} 
                  />
                  {assessment.physicalMetrics.bodyFat && (
                    <DetailItem 
                      label="Body Fat" 
                      value={`${assessment.physicalMetrics.bodyFat}%`} 
                    />
                  )}
                  {assessment.physicalMetrics.restingHeartRate && (
                    <DetailItem 
                      label="Resting HR" 
                      value={`${assessment.physicalMetrics.restingHeartRate} bpm`} 
                    />
                  )}
                </>
              )}
            </StatCard>

            <StatCard title="Nutrition & Diet">
              {assessment.nutrition && (
                <>
                  <DetailItem label="Daily Calories" value={assessment.nutrition.dailyCalories ? `${assessment.nutrition.dailyCalories} kcal` : 'N/A'} />
                  <DetailItem label="Meal Frequency" value={assessment.nutrition.mealFrequency || 'N/A'} />
                  <DetailItem 
                    label="Dietary Restrictions" 
                    value={assessment.nutrition.dietaryRestrictions.length > 0 ? assessment.nutrition.dietaryRestrictions.join(', ') : 'None'} 
                  />
                </>
              )}
            </StatCard>

            <StatCard title="Wellbeing">
              {assessment.wellbeing && (
                <>
                  <DetailItem label="Sleep" value={assessment.wellbeing.averageSleepHours ? `${assessment.wellbeing.averageSleepHours} hours` : 'N/A'} />
                  <DetailItem label="Sleep Quality" value={assessment.wellbeing.sleepQuality || 'N/A'} />
                  <DetailItem label="Stress Level" value={assessment.wellbeing.stressLevel ? `${assessment.wellbeing.stressLevel}/10` : 'N/A'} />
                  <DetailItem label="Energy Level" value={assessment.wellbeing.energyLevel ? `${assessment.wellbeing.energyLevel}/10` : 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Training Facilities">
              {assessment.facilities && (
                <>
                  <DetailItem 
                    label="Open Water" 
                    value={assessment.facilities.hasOpenWaterAccess ? '✅ Available' : '❌ No access'} 
                  />
                  <DetailItem 
                    label="Bike Trainer" 
                    value={assessment.facilities.hasBikeTrainer ? '✅ Available' : '❌ No access'} 
                  />
                  <DetailItem 
                    label="Treadmill" 
                    value={assessment.facilities.hasTreadmill ? '✅ Available' : '❌ No access'} 
                  />
                </>
              )}
            </StatCard>

            <StatCard title="Recovery & Mobility">
              {assessment.recovery && (
                <>
                  <DetailItem 
                    label="Mobility Work" 
                    value={assessment.recovery.mobilityWork.length > 0 ? assessment.recovery.mobilityWork.join(', ') : 'None'} 
                  />
                  <DetailItem label="Therapy" value={assessment.recovery.therapyFrequency || 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Training Metrics">
              {assessment.metrics && (
                <>
                  <DetailItem 
                    label="Wearable Device" 
                    value={assessment.metrics.usesWearableDevice ? assessment.metrics.deviceType : 'None'} 
                  />
                  <DetailItem label="RPE Scale" value={assessment.metrics.preferredRPEScale || 'N/A'} />
                  <DetailItem 
                    label="Tracked Metrics" 
                    value={assessment.metrics.trackedMetrics.length > 0 ? assessment.metrics.trackedMetrics.join(', ') : 'None'} 
                  />
                </>
              )}
            </StatCard>

            <StatCard title="Performance Goals">
              {assessment.goals && (
                <>
                  <DetailItem label="Target Time" value={assessment.goals.targetFinishTime || 'N/A'} />
                  <DetailItem 
                    label="Secondary Goals" 
                    value={assessment.goals.secondaryGoals.length > 0 ? assessment.goals.secondaryGoals.join(', ') : 'None'} 
                  />
                  <DetailItem label="Swim Pace" value={assessment.goals.paceGoals?.swim || 'N/A'} />
                  <DetailItem label="Bike Pace" value={assessment.goals.paceGoals?.bike || 'N/A'} />
                  <DetailItem label="Run Pace" value={assessment.goals.paceGoals?.run || 'N/A'} />
                </>
              )}
            </StatCard>

            <StatCard title="Social Support">
              {assessment.social && (
                <>
                  <DetailItem 
                    label="Group Training" 
                    value={assessment.social.needsGroupTraining ? '✅ Preferred' : '❌ Not needed'} 
                  />
                  <DetailItem 
                    label="Training Partner" 
                    value={assessment.social.hasTrainingPartner ? 
                      `✅ Yes (${assessment.social.partnerFitnessLevel})` : 
                      '❌ No'} 
                  />
                  <DetailItem 
                    label="Communities" 
                    value={assessment.social.onlineCommunities.length > 0 ? assessment.social.onlineCommunities.join(', ') : 'None'} 
                  />
                </>
              )}
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