import { useState } from 'react';
import { WorkoutData, WorkoutProgress } from '@/types/workout';

interface Props {
  workout: WorkoutData;
  date: string;
  onSave: (progress: WorkoutProgress) => void;
  existingProgress?: WorkoutProgress;
}

export default function WorkoutProgressForm({ workout, date, onSave, existingProgress }: Props) {
  const [progress, setProgress] = useState<WorkoutProgress>(() => {
    return existingProgress || {
      id: `${workout.type}-${date}`,
      workoutId: workout.type + date,
      date,
      completed: false,
      perceivedEffort: 3 as const,
      feelingScore: 3 as const,
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(progress as WorkoutProgress);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={progress.completed}
          onChange={(e) => setProgress({ ...progress, completed: e.target.checked })}
          className="rounded"
          id="completed"
        />
        <label htmlFor="completed" className="text-sm font-medium">
          Mark as Completed
        </label>
      </div>

      {progress.completed && (
        <>
          {workout.duration && (
            <div>
              <label className="block text-sm font-medium mb-1">Actual Duration</label>
              <input
                type="text"
                value={progress.actualDuration || ''}
                onChange={(e) => setProgress({ ...progress, actualDuration: e.target.value })}
                className="w-full rounded-lg border p-2 dark:bg-gray-700"
                placeholder={workout.duration}
              />
            </div>
          )}

          {workout.sets && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Actual Sets</label>
                <input
                  type="number"
                  value={progress.actualSets || ''}
                  onChange={(e) => setProgress({ ...progress, actualSets: e.target.value })}
                  className="w-full rounded-lg border p-2 dark:bg-gray-700"
                  placeholder={workout.sets.toString()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Actual Reps</label>
                <input
                  type="text"
                  value={progress.actualReps || ''}
                  onChange={(e) => setProgress({ ...progress, actualReps: e.target.value })}
                  className="w-full rounded-lg border p-2 dark:bg-gray-700"
                  placeholder={workout.reps?.toString()}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Perceived Effort (1-5)</label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setProgress({ ...progress, perceivedEffort: score as 1|2|3|4|5 })}
                  className={`w-10 h-10 rounded-full ${
                    progress.perceivedEffort === score
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">How did you feel? (1-5)</label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setProgress({ ...progress, feelingScore: score as 1|2|3|4|5 })}
                  className={`w-10 h-10 rounded-full ${
                    progress.feelingScore === score
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={progress.notes || ''}
              onChange={(e) => setProgress({ ...progress, notes: e.target.value })}
              className="w-full rounded-lg border p-2 dark:bg-gray-700"
              rows={3}
              placeholder="Any additional notes about the workout..."
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Save Progress
      </button>
    </form>
  );
}
