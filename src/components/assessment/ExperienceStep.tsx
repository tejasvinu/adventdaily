import { FormStepProps } from '@/types/assessment';

export default function ExperienceStep({ formData, updateFormData }: FormStepProps) {
  const distances = ['Sprint', 'Olympic', 'Half-Ironman', 'Ironman'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Triathlon Experience</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Have you competed in a triathlon before?</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.experience.hasCompeted}
              onChange={() => updateFormData({
                experience: { ...formData.experience, hasCompeted: true }
              })}
              className="mr-2"
              aria-label="Yes, I have competed in a triathlon"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={!formData.experience.hasCompeted}
              onChange={() => updateFormData({
                experience: { ...formData.experience, hasCompeted: false }
              })}
              className="mr-2"
              aria-label="No, I have not competed in a triathlon"
            />
            No
          </label>
        </div>
      </div>

      {formData.experience.hasCompeted && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Completed Distances</label>
            <div className="space-y-2">
              {distances.map((distance) => (
                <label key={distance} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.experience.completedDistances.includes(distance)}
                    onChange={(e) => {
                      const newDistances = e.target.checked
                        ? [...formData.experience.completedDistances, distance]
                        : formData.experience.completedDistances.filter(d => d !== distance);
                      updateFormData({
                        experience: { ...formData.experience, completedDistances: newDistances }
                      });
                    }}
                    className="mr-2"
                    aria-label={`${distance} distance completed`}
                  />
                  {distance}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" id="raceCount">Number of Races Completed</label>
            <input
              type="number"
              value={formData.experience.raceCount}
              onChange={(e) => updateFormData({
                experience: { ...formData.experience, raceCount: e.target.value }
              })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              aria-labelledby="raceCount"
              title="Enter the number of races you have completed"
              placeholder="Enter number of races"
              min="0"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium mb-2" id="primaryGoal">Primary Goal</label>
        <select
          value={formData.experience.primaryGoal}
          onChange={(e) => updateFormData({
            experience: { ...formData.experience, primaryGoal: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
          aria-labelledby="primaryGoal"
          title="Select your primary triathlon goal"
        >
          <option value="">Select Goal</option>
          <option value="complete-first">Complete First Triathlon</option>
          <option value="improve-time">Improve Time</option>
          <option value="longer-distance">Move to Longer Distance</option>
          <option value="podium">Achieve Podium</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" id="targetDate">Target Race Date</label>
        <input
          type="date"
          value={formData.experience.targetRaceDate}
          onChange={(e) => updateFormData({
            experience: { ...formData.experience, targetRaceDate: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
          aria-labelledby="targetDate"
          title="Select your target race date"
        />
      </div>
    </div>
  );
}
