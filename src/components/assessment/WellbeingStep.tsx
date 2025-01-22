import { FormStepProps } from '@/types/assessment';

export default function WellbeingStep({ formData, updateFormData }: FormStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sleep & Wellbeing</h2>
      
      <div>
        <label className="block text-sm font-medium">Average Sleep Hours</label>
        <select
          value={formData.wellbeing.averageSleepHours}
          onChange={(e) => updateFormData({
            wellbeing: { ...formData.wellbeing, averageSleepHours: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select average sleep duration</option>
          {['<6', '6-7', '7-8', '8-9', '>9'].map((hours) => (
            <option key={hours} value={hours}>{hours} hours</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Sleep Quality</label>
        <select
          value={formData.wellbeing.sleepQuality}
          onChange={(e) => updateFormData({
            wellbeing: { ...formData.wellbeing, sleepQuality: e.target.value }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Rate your sleep quality</option>
          {['Poor', 'Fair', 'Good', 'Excellent'].map((quality) => (
            <option key={quality} value={quality}>{quality}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Stress Level (1-10)</label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.wellbeing.stressLevel || "5"}
          onChange={(e) => updateFormData({
            wellbeing: { ...formData.wellbeing, stressLevel: e.target.value }
          })}
          className="mt-1 block w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Low Stress</span>
          <span>High Stress</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Energy Level (1-10)</label>
        <input
          type="range"
          min="1"
          max="10"
          value={formData.wellbeing.energyLevel || "5"}
          onChange={(e) => updateFormData({
            wellbeing: { ...formData.wellbeing, energyLevel: e.target.value }
          })}
          className="mt-1 block w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Low Energy</span>
          <span>High Energy</span>
        </div>
      </div>
    </div>
  );
}
