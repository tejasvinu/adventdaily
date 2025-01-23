'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Remove AnimatePresence
import { WorkoutData, WorkoutProgress, TrainingPlan, WeekPlan } from '@/types/workout'; // Add WorkoutProgress import
import { progressService } from '@/services/progressService';
import { workoutPlanService } from '@/services/workoutPlanService';
import WorkoutProgressForm from '@/components/WorkoutProgressForm';
import { useRouter } from 'next/navigation';
import { useWorkoutPlan } from '@/hooks/useWorkoutPlan';

// Add this helper function before the WorkoutPlan component
const getExistingProgress = (workoutId: string, date: string) => {
  return progressService.getProgress(workoutId, date);
};

export default function WorkoutPlan() {
  const router = useRouter();
  const { plan, loading, error, refetch } = useWorkoutPlan();
  
  // Group all useState hooks at the top
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutData | null>(null);
  const [programStartDate, setProgramStartDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [activeDate, setActiveDate] = useState<string>('');

  // Get active plan from the hook's response
  const activePlan = plan || { weeks: [], duration: 8 };

  // Group all useEffect hooks together
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const today = new Date();
    const nextMonday = new Date();
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
    
    if (programStartDate < today) {
      setProgramStartDate(nextMonday);
    }
  }, []);

  // Remove old fetch logic
  const handleGeneratePlan = async () => {
    try {
      setIsGenerating(true);
      setGenerationError(null);
      
      const response = await fetch('/api/workout-plan/generate', {
        method: 'POST',
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
        throw new Error('Failed to generate workout plan');
      }

      await refetch(); // Use the refetch function from the hook
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'Failed to generate workout plan');
    } finally {
      setIsGenerating(false);
    }
  };

  // Use loading state from hook
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 pt-16 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Update error handling to include auth error
  if (error && !isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {error === 'Unauthorized' ? 'Please Log In' : 'Error Loading Workout Plan'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              type="button"
              onClick={() => error === 'Unauthorized' ? router.push('/login') : refetch()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {error === 'Unauthorized' ? 'Go to Login' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  // Add totalWorkouts calculation
  const totalWorkouts = activePlan.weeks.reduce((total: number, week: WeekPlan) => 
    total + Object.keys(week.workouts).length, 0
  );

  // Add class for progress bar
  const getProgressBarWidth = (count: number) => {
    const percentage = (count / totalWorkouts) * 100;
    return `progress-bar-${Math.round(percentage)}`;
  };

  // Update the workout lookup function to match dates correctly
  const getWorkoutForDate = (date: Date) => {
    const dateStr = formatDateString(date);
    
    // Search through all weeks for the workout
    for (const week of activePlan.weeks) {
      if (week.workouts[dateStr]) {
        return week.workouts[dateStr];
      }
    }
    return null;
  };

  // Update the upcoming workouts function
  const getUpcomingWorkouts = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allWorkouts: Array<[string, WorkoutData]> = [];
    activePlan.weeks.forEach(week => {
      Object.entries(week.workouts).forEach(([date, workout]) => {
        if (new Date(date) >= today) {
          allWorkouts.push([date, workout]);
        }
      });
    });

    return allWorkouts
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .slice(0, 5);
  };

  const handleDateClick = (workout: WorkoutData | undefined, date: Date) => {
    if (workout) {
      setSelectedWorkout(workout);
      setActiveDate(formatDateString(date));
    }
  };

  const handleProgressSave = (progress: WorkoutProgress) => {
    try {
      progressService.saveProgress(progress);
      setSelectedWorkout(null);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const getWorkoutColor = (category: string) => {
    switch (category) {
      case 'Strength': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'Cardio': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Recovery': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Add getWeekNumber function
  const getWeekNumber = (date: Date) => {
    const firstDay = new Date(programStartDate);
    const diff = date.getTime() - firstDay.getTime();
    const daysPassed = Math.floor(diff / (24 * 60 * 60 * 1000));
    return Math.floor(daysPassed / 7) + 1;
  };

  const renderWorkoutDetails = (workout: WorkoutData) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">Intensity:</span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          workout.intensity?.includes('High') ? 'bg-red-100 text-red-800' :
          workout.intensity?.includes('Moderate') ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {workout.intensity}
        </span>
      </div>
      {workout.duration && (
        <div className="flex items-center gap-2">
          <span className="font-medium">Duration:</span>
          <span>{workout.duration}</span>
        </div>
      )}
      {workout.sets && (
        <div className="flex items-center gap-2">
          <span className="font-medium">Volume:</span>
          <span>{workout.sets} sets × {workout.reps}</span>
        </div>
      )}
      {workout.notes && (
        <div className="mt-2">
          <span className="font-medium">Coaching Notes:</span>
          <p className="text-sm mt-1">{workout.notes}</p>
        </div>
      )}
    </div>
  );

  // Add function to handle week change
  const handleWeekChange = (weekNumber: string) => {
    const selectedWeek = activePlan.weeks.find(w => w.weekNumber === parseInt(weekNumber));
    if (selectedWeek) {
      const firstWorkoutDate = Object.keys(selectedWeek.workouts)[0];
      if (firstWorkoutDate) {
        setCurrentMonth(new Date(firstWorkoutDate));
      }
    }
  };

  // Update renderCalendarDay to show incomplete status
  const renderCalendarDay = (date: Date, i: number) => {
    const workout = getWorkoutForDate(date);
    const dateStr = formatDateString(date);
    const progress = workout ? 
      progressService.getOrInitProgress(workout.type + dateStr, dateStr) : 
      null;
    const isToday = new Date().toDateString() === date.toDateString();

    return (
      <motion.div
        key={i}
        whileHover={{ scale: 1.02 }}
        onClick={() => workout && handleDateClick(workout, date)}
        className={`
          aspect-square p-1 sm:p-2 rounded-lg relative min-h-[40px] sm:min-h-[80px]
          ${workout ? getWorkoutColor(workout.category) + ' cursor-pointer' : 
            isToday ? 'bg-blue-50 dark:bg-blue-900' :
            'bg-gray-50 dark:bg-gray-700'
          }
          ${progress?.completed ? 'ring-2 ring-green-500' : workout ? 'ring-2 ring-gray-300 dark:ring-gray-600' : ''}
          flex flex-col justify-between
        `}
      >
        <div className="flex justify-between items-start w-full">
          <span className={`text-xs sm:text-sm ${isToday ? 'font-bold' : ''}`}>
            {date.getDate()}
          </span>
          {workout?.intensity && (
            <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
              workout.intensity.includes('High') ? 'bg-red-500' :
              workout.intensity.includes('Moderate') ? 'bg-yellow-500' :
              'bg-green-500'
            }`} />
          )}
        </div>
        
        {workout && (
          <div className="text-[10px] sm:text-xs mt-auto">
            <div className="font-medium truncate">{workout.type}</div>
            <div className="hidden sm:block truncate">
              {workout.duration || (workout.sets && `${workout.sets}×${workout.reps}`)}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderListView = () => (
    <div className="space-y-4">
      {activePlan.weeks.map((week) => (
        <div key={week.weekNumber} className="border-l-4 border-blue-600 pl-4">
          <h3 className="font-semibold mb-2">Week {week.weekNumber}: {week.theme}</h3>
          <div className="space-y-2">
            {Object.entries(week.workouts).map(([date, workout]) => (
              <motion.div
                key={date}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleDateClick(workout, new Date(date))}
                className={`${getWorkoutColor(workout.category)} p-3 rounded-lg cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <span>{workout.type}</span>
                  <span className="text-sm">
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="text-sm mt-1">{workout.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // Update calendar controls for better mobile layout
  const renderCalendarControls = () => (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
          Training Calendar
        </h1>
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'calendar' ? 'bg-blue-600 text-white' : ''
            }`}
          >
            Calendar
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : ''
            }`}
          >
            List
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2">
        <button 
          type="button"
          onClick={prevMonth} 
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className="text-sm sm:text-base font-semibold min-w-[120px] text-center">
          {currentMonth.toLocaleString('default', { 
            month: 'short',
            year: 'numeric'
          })}
        </h2>
        <button 
          type="button"
          onClick={nextMonth} 
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label="Next month"
        >
          →
        </button>
      </div>
    </div>
  );

  // Update the stats row to be more mobile-friendly and fix desktop layout
  const renderQuickStats = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full">
      {['Strength', 'Cardio', 'Recovery'].map(category => {
        const workouts = activePlan.weeks.flatMap(week => 
          Object.values(week.workouts).filter(w => w.category === category)
        );
        return (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">{category}</div>
            <div className="text-xl sm:text-2xl font-bold">{workouts.length}</div>
            <div className="text-xs">sessions</div>
          </div>
        );
      })}
      {/* Program Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
        <div className="text-xl sm:text-2xl font-bold">Week {getWeekNumber(new Date())}</div>
        <div className="text-xs">of {activePlan.duration}</div>
      </div>
    </div>
  );

  // Update the activity distribution for mobile
  const renderActivityDistribution = () => (
    <div className="space-y-3">
      {['🏃‍♂️ Run', '🏊‍♂️ Swim', '🚴‍♂️ Cycle', '🏋️ Strength'].map(type => {
        const workouts = activePlan.weeks.flatMap(week => 
          Object.values(week.workouts).filter(w => w.type.includes(type))
        );
        return (
          <div key={type} className="flex items-center justify-between">
            <span className="text-sm">{type}</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-blue-600 h-2 rounded-full ${getProgressBarWidth(workouts.length)}`}
                />
              </div>
              <span className="text-sm font-medium">{workouts.length}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Add array of weekday labels with unique identifiers
  const weekDayLabels = [
    { id: 'sun', short: 'Sun', full: 'Sunday', shortMobile: 'S' },
    { id: 'mon', short: 'Mon', full: 'Monday', shortMobile: 'M' },
    { id: 'tue', short: 'Tue', full: 'Tuesday', shortMobile: 'T' },
    { id: 'wed', short: 'Wed', full: 'Wednesday', shortMobile: 'W' },
    { id: 'thu', short: 'Thu', full: 'Thursday', shortMobile: 'T' },
    { id: 'fri', short: 'Fri', full: 'Friday', shortMobile: 'F' },
    { id: 'sat', short: 'Sat', full: 'Saturday', shortMobile: 'S' },
  ];

  // Render placeholder when no plan exists
  if (!plan && !isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Create Your Training Plan</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Generate a personalized 8-week training plan based on your assessment and goals.
            </p>
            
            {generationError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
                {generationError}
              </div>
            )}
            
            <div className="space-y-4">
              <button
                onClick={handleGeneratePlan}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating Plan...' : 'Generate My Plan'}
              </button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Or <a href="/assessment" className="text-blue-600 hover:underline">complete an assessment first</a> if you haven't already.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="font-semibold mb-2">Personalized</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Based on your fitness level, goals, and available time
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="font-semibold mb-2">Progressive</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gradually increases intensity and volume over 8 weeks
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="font-semibold mb-2">Adaptive</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Adjusts based on your progress and feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while generating
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>
            <p className="mt-8 text-gray-600 dark:text-gray-400">
              Generating your personalized training plan...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 pt-16 px-2 sm:px-4 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Week Selection */}
        <div className="lg:hidden sticky top-16 z-10 mb-4 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-sm">
          <select 
            className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            value={getWeekNumber(new Date())}
            onChange={(e) => handleWeekChange(e.target.value)}
            aria-label="Select training week"
          >
            {activePlan.weeks.map(week => (
              <option key={week.weekNumber} value={week.weekNumber}>
                Week {week.weekNumber}: {week.theme}
              </option>
            ))}
          </select>
        </div>

        {/* Stats Overview - Fixed Layout */}
        <div className="mb-4">
          {renderQuickStats()}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Calendar and Stats */}
          <div className="lg:col-span-8 space-y-4">

            {/* Calendar Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-2 sm:p-4 border-b dark:border-gray-700 sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-10">
                {renderCalendarControls()}
              </div>
              <div className="p-2 sm:p-4 overflow-x-hidden">
                {viewMode === 'calendar' ? (
                  <>
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                      {weekDayLabels.map(day => (
                        <div 
                          key={day.id} 
                          className="text-center font-semibold py-1 sm:py-2 text-[10px] sm:text-sm"
                          title={day.full}
                        >
                          <span className="hidden sm:inline">{day.short}</span>
                          <span className="sm:hidden">{day.shortMobile}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      {[...Array(firstDayOfMonth)].map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                      ))}
                      {[...Array(daysInMonth)].map((_, i) => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                        return renderCalendarDay(date, i);
                      })}
                    </div>
                  </>
                ) : (
                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                    {renderListView()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Now with sticky positioning on desktop */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Activity Types Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm overflow-x-hidden">
              <h3 className="font-semibold mb-3 text-sm">Activity Distribution</h3>
              {renderActivityDistribution()}
            </div>

            {/* Upcoming Workouts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-4 border-b dark:border-gray-700 sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <h2 className="font-semibold">Upcoming Workouts</h2>
              </div>
              <div className="p-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                <div className="space-y-3">
                  {getUpcomingWorkouts().map(([date, workout]) => (
                    workout && (
                      <motion.div
                        key={date}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleDateClick(workout, new Date(date))}
                        className={`${getWorkoutColor(workout.category)} p-3 rounded-lg cursor-pointer`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{workout.type}</span>
                          <span className="text-xs">
                            {new Date(date).toLocaleDateString(undefined, { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <p className="text-sm truncate">{workout.description}</p>
                      </motion.div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Details Modal - Updated for better mobile display */}
        {selectedWorkout && activeDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedWorkout(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-gray-800 w-full sm:w-auto sm:max-w-2xl rounded-t-xl sm:rounded-xl shadow-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button for mobile */}
              <button
                type="button"
                onClick={() => setSelectedWorkout(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                ✕
              </button>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{selectedWorkout.type}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedWorkout.category === 'Strength' ? 'bg-purple-100 text-purple-800' :
                  selectedWorkout.category === 'Cardio' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedWorkout.category}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Workout Details</h3>
                    {renderWorkoutDetails(selectedWorkout)}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <p className="text-sm">{selectedWorkout.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Coaching Notes</h3>
                    <p className="text-sm">{selectedWorkout.notes}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Recovery Protocol</h3>
                    <ul className="text-sm space-y-1">
                      {selectedWorkout.intensity?.includes('High') ? [
                        '• 10-15 minute cool down',
                        '• Static stretching for major muscle groups',
                        '• Hydration and protein intake within 30 minutes',
                        '• Consider ice bath or compression',
                      ] : [
                        '• 5-10 minute cool down',
                        '• Light stretching',
                        '• Stay hydrated',
                      ]}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold mb-4">Track Progress</h3>
                <WorkoutProgressForm
                  workout={selectedWorkout}
                  date={activeDate}
                  onSave={handleProgressSave}
                  existingProgress={getExistingProgress(
                    selectedWorkout.type + activeDate,
                    activeDate
                  ) as WorkoutProgress | undefined}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}