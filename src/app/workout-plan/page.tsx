'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eightWeekPlan } from '@/data/trainingPlan';
import { WorkoutData } from '@/types/workout';

export default function WorkoutPlan() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutData | null>(null);
  const [programStartDate, setProgramStartDate] = useState(new Date());

  useEffect(() => {
    // Set program start date to next Monday if it's in the past
    const today = new Date();
    const nextMonday = new Date();
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
    
    if (programStartDate < today) {
      setProgramStartDate(nextMonday);
    }
  }, []);

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

  // Helper function to get program day number
  const getProgramDay = (date: Date) => {
    const diffTime = Math.abs(date.getTime() - programStartDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Update the workout lookup function to match dates correctly
  const getWorkoutForDate = (date: Date) => {
    const dateStr = formatDateString(date);
    
    // Search through all weeks for the workout
    for (const week of eightWeekPlan.weeks) {
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
    eightWeekPlan.weeks.forEach(week => {
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

  const handleDateClick = (workout: WorkoutData | undefined) => {
    if (workout) {
      setSelectedWorkout(workout);
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

  // Update the calendar cell rendering function
  const renderCalendarDay = (date: Date, i: number) => {
    const workout = getWorkoutForDate(date);
    const isToday = new Date().toDateString() === date.toDateString();

    return (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        onClick={() => workout && handleDateClick(workout)}
        className={`
          aspect-square p-2 rounded-lg
          ${workout ? getWorkoutColor(workout.category) + ' cursor-pointer' : 
            isToday ? 'bg-blue-50 dark:bg-blue-900' :
            'bg-gray-50 dark:bg-gray-700'
          }
          relative
        `}
      >
        <div className={`text-sm mb-1 ${isToday ? 'font-bold' : ''}`}>
          {date.getDate()}
          {isToday && <span className="ml-1 text-xs">Today</span>}
        </div>
        {workout && (
          <div className="text-xs">
            <div className="font-medium">{workout.type}</div>
            <div className="truncate">
              {workout.duration || (workout.sets && `${workout.sets}×${workout.reps}`)}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 pt-20 pb-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Program Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{eightWeekPlan.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {eightWeekPlan.weeks.map((week, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold">Week {week.weekNumber}: {week.theme}</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {week.goals.map((goal, i) => (
                    <li key={i}>• {goal}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Training Calendar
              </h1>
              <div className="flex gap-4">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  ←
                </button>
                <h2 className="text-xl font-semibold">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[...Array(firstDayOfMonth)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}
              {[...Array(daysInMonth)].map((_, i) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                return renderCalendarDay(date, i);
              })}
            </div>
          </div>

          {/* Upcoming Workouts Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Workouts</h2>
            <div className="space-y-4">
              {getUpcomingWorkouts().map(([date, workout]) => (
                workout && (
                  <motion.div
                    key={date}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleDateClick(workout)}
                    className={`${getWorkoutColor(workout.category)} p-4 rounded-lg cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{workout.type}</span>
                      <span className="text-sm">
                        {new Date(date).toLocaleDateString(undefined, { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm">{workout.description}</p>
                    {(workout.duration || workout.reps) && (
                      <p className="text-sm mt-1 font-medium">
                        {workout.duration || `${workout.sets}×${workout.reps}`}
                      </p>
                    )}
                  </motion.div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Workout Details */}
        {selectedWorkout && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
          >
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Workout Details</h3>
                <p>{selectedWorkout.description}</p>
                {selectedWorkout.sets && (
                  <p className="mt-2">Sets: {selectedWorkout.sets} × {selectedWorkout.reps}</p>
                )}
                {selectedWorkout.duration && (
                  <p className="mt-2">Duration: {selectedWorkout.duration}</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedWorkout.notes}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
