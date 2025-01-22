import { FormStepProps } from '@/types/assessment';

export default function GoalsStep({ formData, updateFormData }: FormStepProps) {
  const handleSecondaryGoalChange = (goal: string) => {
    const current = formData.goals.secondaryGoals;
    const updated = current.includes(goal)
      ? current.filter(g => g !== goal)
      : [...current, goal];
    
    updateFormData({
      goals: { ...formData.goals, secondaryGoals: updated }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Race Goals & Performance Targets</h2>
      
      <div>
        <label className="block text-sm font-medium">Target Finish Time</label>
        <input
          type="text"
          value={formData.goals.targetFinishTime}
          onChange={(e) => updateFormData({
            goals: { ...formData.goals, targetFinishTime: e.target.value }
          })}
          placeholder="HH:MM:SS"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Secondary Goals</label>
        {[
          'Improve Technique',
          'Weight Loss',
          'Build Endurance',
          'Increase Strength',
          'Better Recovery',
          'Mental Toughness',
          'Injury Prevention'
        ].map((goal) => (
          <label key={goal} className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={formData.goals.secondaryGoals.includes(goal)}
              onChange={() => handleSecondaryGoalChange(goal)}
              className="rounded border-gray-300"
            />
            <span>{goal}</span>
          </label>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Discipline-Specific Pace Goals</h3>
        
        <div>
          <label className="block text-sm font-medium">Swim Pace Goal</label>
          <input
            type="text"
            value={formData.goals.paceGoals.swim}
            onChange={(e) => updateFormData({
              goals: {
                ...formData.goals,
                paceGoals: { ...formData.goals.paceGoals, swim: e.target.value }
              }
            })}
            placeholder="min/100m"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bike Pace Goal</label>
          <input
            type="text"
            value={formData.goals.paceGoals.bike}
            onChange={(e) => updateFormData({
              goals: {
                ...formData.goals,
                paceGoals: { ...formData.goals.paceGoals, bike: e.target.value }
              }
            })}
            placeholder="km/h"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Run Pace Goal</label>
          <input
            type="text"
            value={formData.goals.paceGoals.run}
            onChange={(e) => updateFormData({
              goals: {
                ...formData.goals,
                paceGoals: { ...formData.goals.paceGoals, run: e.target.value }
              }
            })}
            placeholder="min/km"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
