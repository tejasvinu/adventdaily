import { FormStepProps } from '@/types/assessment';

export default function TrainingStep({ formData, updateFormData }: FormStepProps) {
  const weeklyHourOptions = ['3-5', '6-8', '9-12', '12+'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timePreferences = ['Morning', 'Afternoon', 'Evening', 'Flexible'];
  const trainingPreferences = ['Alone', 'With Partner', 'Group', 'Mix'];

  const toggleDay = (day: string) => {
    const newDays = formData.training.availableDays.includes(day)
      ? formData.training.availableDays.filter(d => d !== day)
      : [...formData.training.availableDays, day];
    
    updateFormData({
      training: { ...formData.training, availableDays: newDays }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Training Preferences</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Weekly Training Hours</label>
        <select
          value={formData.training.weeklyHours}
          onChange={(e) => updateFormData({
            training: { ...formData.training, weeklyHours: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
          aria-label="Select weekly training hours"
        >
          <option value="">Select Hours</option>
          {weeklyHourOptions.map(hours => (
            <option key={hours} value={hours}>{hours} hours</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Available Training Days</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {daysOfWeek.map(day => (
            <label key={day} className="inline-flex items-center p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.training.availableDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="mr-2"
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Preferred Training Time</label>
        <select
          value={formData.training.preferredTime}
          onChange={(e) => updateFormData({
            training: { ...formData.training, preferredTime: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
          aria-label="Select preferred training time"
        >
          <option value="">Select Time Preference</option>
          {timePreferences.map(time => (
            <option key={time} value={time.toLowerCase()}>{time}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Pool Access</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={formData.training.hasPoolAccess}
                onChange={() => updateFormData({
                  training: { ...formData.training, hasPoolAccess: true }
                })}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={!formData.training.hasPoolAccess}
                onChange={() => updateFormData({
                  training: { ...formData.training, hasPoolAccess: false }
                })}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gym Access</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={formData.training.hasGymAccess}
                onChange={() => updateFormData({
                  training: { ...formData.training, hasGymAccess: true }
                })}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={!formData.training.hasGymAccess}
                onChange={() => updateFormData({
                  training: { ...formData.training, hasGymAccess: false }
                })}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Training Preference</label>
        <select
          value={formData.training.trainingPreference}
          onChange={(e) => updateFormData({
            training: { ...formData.training, trainingPreference: e.target.value }
          })}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
          aria-label="Select training preference"
        >
          <option value="">Select Preference</option>
          {trainingPreferences.map(preference => (
            <option key={preference} value={preference.toLowerCase()}>{preference}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
